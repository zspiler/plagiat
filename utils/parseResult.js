const cheerio = require('cheerio');
const request = require('sync-request');

module.exports = function (url) {
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



