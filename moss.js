const fs = require('fs');
const path = require('path');
const net = require('net');
const netlinkwrapper = require('netlinkwrapper');
const cheerio = require('cheerio');
const request = require('sync-request');

class Moss {
    constructor(userID, language) {
        this.server = 'moss.stanford.edu';
        this.port = 7690;
        this.userID = userID;
        this.options = {
            l: 'c',
            m: 10, // ignore limit
            d: 0, // directory
            x: 0, // experimental server
            c: '',
            n: 250, // matching files
        };
        this.languages = [
            'c',
            'cc',
            'java',
            'ml',
            'pascal',
            'ada',
            'lisp',
            'scheme',
            'haskell',
            'fortran',
            'ascii',
            'vhdl',
            'verilog',
            'perl',
            'matlab',
            'python',
            'mips',
            'prolog',
            'spice',
            'vb',
            'csharp',
            'modula2',
            'a8086',
            'javascript',
            'plsql',
        ];
        if (this.languages.includes(language)) {
            this.options.l = language;
        } else
            throw new Error(
                `Language not supported. Supported languages: ${this.languages} `
            );
        this.baseFiles = [];
        this.files = [];
    }

    addBaseFile(filePath, displayName) {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File ${filePath} does not exist.`);
        }
        if (fs.statSync(filePath)['size'] == 0) {
            throw new Error(`File ${filePath} is empty.`);
        }

        // TODO: convert to UTF-8

        this.baseFiles.push({ filePath, displayName: displayName || filePath });
    }

    addFile(filePath, displayName) {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File ${filePath} does not exist.`);
        }
        if (fs.statSync(filePath)['size'] == 0) {
            throw new Error(`File ${filePath} is empty.`);
        }

        this.files.push({ filePath, displayName: displayName || filePath });
    }

    submit() {
        const netlink = new netlinkwrapper();
        netlink.connect(this.port, this.server);
        netlink.blocking(false);

        console.log('MOSS: Connecting to Moss server...');


        // Authenticate and pass options
        netlink.write(`moss ${this.userID}\n`);
        netlink.write(`directory ${this.options.d}\n`);
        netlink.write(`X ${this.options.x}\n`);
        netlink.write(`maxmatches ${this.options.m}\n`);
        netlink.write(`show ${this.options.n}\n`);
        netlink.write(`language ${this.options.l}\n`);

        var res = netlink.read(1024);
        while (!res) {
            try {
                res = netlink.read(1024);
            } catch (err) {
                console.log('Error reading socket.');
                return;
            }
        }

        if (res.trim() == 'no') {
            console.log('Unrecognized language.');
            return;
        }
        console.log('MOSS: Connected to Moss server.');


        console.log('MOSS: Uploading base files...');

        // Upload base-files
        this.baseFiles.forEach(({ filePath, displayName }) => {
            let size = fs.statSync(filePath)['size'];
            let name = displayName.replace(/ /g, '_');
            netlink.write(`file ${0} ${this.options.l} ${size} ${name}\n`);
            let file = fs.readFileSync(filePath);

            netlink.write(file.toString());
        });

        console.log('MOSS: Uploading base files...');


        // Upload files
        var id = 1;
        this.files.forEach(({ filePath, displayName }) => {
            let name = displayName.replace(/ /g, '_');
            let size = fs.statSync(filePath)['size'];
            netlink.write(`file ${id} ${this.options.l} ${size} ${name}\n`);
            let file = fs.readFileSync(filePath);
            netlink.write(file.toString());

            id += 1;
        });
        netlink.write(`query 0 ${this.options.c}\n`);
        console.log('Query submitted.  Waiting for response...');

        res = netlink.read(1024);
        while (!res) {
            res = netlink.read(1024);
        }

        return res.toString();
    }

    parseResult(url) {
        try {
            let res = request('GET', url);
            let html = res.getBody('utf8');

            var pair = {};
            var pairs = [];

            const $ = cheerio.load(html);
            $('body > table > tbody > tr > td').each((index, element) => {
                let str = $(element).text().trim();
                switch (index % 3) {
                    case 0:
                        pair.file1 = str.substr(0, str.indexOf('(') - 1);
                        pair.file1Percentage = parseInt(
                            /\(([^)]+)%\)/.exec(str)[1]
                        );
                        break;
                    case 1:
                        pair.file2 = str.substr(0, str.indexOf('(') - 1);
                        pair.file2Percentage = parseInt(
                            /\(([^)]+)%\)/.exec(str)[1]
                        );
                        break;
                    case 2:
                        pair.linesMatched = parseInt(str);
                        pairs.push(pair);
                        pair = {};
                        break;
                    default:
                        break;
                }
            });
            return pairs;
        } catch (e) {
            console.log(e);
        }
    }
}

// // console.log(moss.parseResult(url));

// const MossClient = require('moss-node-client');

// // Create a client and specify language and moss user id
// const client = new MossClient('python', '113025430');

// // Name the current session
// client.setComment('project1');

// // Add files to compare
// client.addFile('./test_files/test1.py', 'sub1');
// client.addFile('./test_files/test2.py', 'sub2');

// // Call process(), a async/promise that returns the moss url
// client.process().then((url) => {
//     console.log(moss.parseResult(url));
// });

module.exports = Moss