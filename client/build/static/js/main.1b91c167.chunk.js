(this.webpackJsonpclient = this.webpackJsonpclient || []).push([[0], { 39: function (e, t, a) { e.exports = a(77) }, 60: function (e, t, a) { }, 61: function (e, t, a) { }, 62: function (e, t, a) { }, 77: function (e, t, a) { "use strict"; a.r(t); var n = a(0), r = a.n(n), l = a(21), c = a.n(l), s = a(5), o = a(6), i = a(3), u = a.n(i), m = (a(60), a(61), a(62), a(13)), p = a(12), d = a(1), h = a.n(d), f = a(4), b = a(2); function v() { var e = Object(n.useState)({ username: "", password: "", password2: "" }), t = Object(b.a)(e, 2), a = t[0], l = t[1], c = a.username, i = a.password, d = a.password2, v = Object(n.useState)({ username: "", loaded: !1 }), E = Object(b.a)(v, 2), g = E[0], w = E[1], N = Object(n.useState)(!1), O = Object(b.a)(N, 2), j = O[0], y = O[1], k = Object(n.useState)(""), x = Object(b.a)(k, 2), S = x[0], P = x[1], C = function () { var e = Object(f.a)(h.a.mark((function e(t) { var a; return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: if (t.preventDefault(), "" !== c && "" !== i && "" !== d) { e.next = 3; break } return e.abrupt("return", P("Please enter all fields")); case 3: if (i === d) { e.next = 5; break } return e.abrupt("return", P("Passwords don't match")); case 5: if (!(i.length < 6)) { e.next = 7; break } return e.abrupt("return", P("Password must be at least 6 characters long")); case 7: return y(!0), e.prev = 8, e.next = 11, u.a.post("/api/auth/register", { username: c, password: i }); case 11: a = e.sent, w({ username: JSON.stringify(a.data.username), loaded: !0 }), e.next = 18; break; case 15: e.prev = 15, e.t0 = e.catch(8), P(e.t0.response.data); case 18: y(!1); case 19: case "end": return e.stop() } }), e, null, [[8, 15]]) }))); return function (t) { return e.apply(this, arguments) } }(), M = function () { var e = Object(f.a)(h.a.mark((function e(t) { return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: t.preventDefault(), l(Object(p.a)(Object(p.a)({}, a), {}, Object(m.a)({}, t.target.name, t.target.value))); case 2: case "end": return e.stop() } }), e) }))); return function (t) { return e.apply(this, arguments) } }(); return g.loaded && g.username ? r.a.createElement(o.a, { to: "/home" }) : r.a.createElement("div", { className: "form-container" }, r.a.createElement("h2", null, "Sign Up"), r.a.createElement("form", { onSubmit: function (e) { return C(e) } }, r.a.createElement("div", { className: "form-group" }, r.a.createElement("label", null, "Username"), r.a.createElement("input", { type: "text", className: "form-control", name: "username", placeholder: "Enter username", value: c, onChange: function (e) { return M(e) } })), r.a.createElement("div", { className: "form-group" }, r.a.createElement("label", null, "Password"), r.a.createElement("input", { type: "password", className: "form-control", name: "password", placeholder: "Password", value: i, onChange: function (e) { return M(e) } })), r.a.createElement("div", { className: "form-group" }, r.a.createElement("label", null, "Confirm Password"), r.a.createElement("input", { type: "password", className: "form-control", name: "password2", placeholder: "Password", value: d, onChange: function (e) { return M(e) } })), r.a.createElement("button", { type: "submit", className: "btn btn-outline-danger" }, "Submit")), "" !== S && r.a.createElement("div", { className: "error-text" }, " ", S, " "), r.a.createElement("div", { className: "link" }, r.a.createElement("p", null, "Already have an account? ", r.a.createElement(s.b, { to: "/login" }, "Log In"))), j && r.a.createElement("div", null, r.a.createElement("div", { className: "spinner" }, r.a.createElement("div", { className: "bounce1" }), r.a.createElement("div", { className: "bounce2" }), r.a.createElement("div", { className: "bounce3" })))) } function E() { var e = Object(n.useState)({ username: "", password: "" }), t = Object(b.a)(e, 2), a = t[0], l = t[1], c = a.username, i = a.password, d = Object(n.useState)({ username: "", loaded: !1 }), v = Object(b.a)(d, 2), E = v[0], g = v[1], w = Object(n.useState)(!1), N = Object(b.a)(w, 2), O = N[0], j = N[1], y = Object(n.useState)(""), k = Object(b.a)(y, 2), x = k[0], S = k[1], P = Object(n.useState)(""), C = Object(b.a)(P, 2), M = C[0], D = C[1]; Object(n.useEffect)((function () { I() }), []); var F = function () { var e = Object(f.a)(h.a.mark((function e(t) { return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: if (t.preventDefault(), "" !== c && "" !== i) { e.next = 3; break } return e.abrupt("return", D("Please enter all fields")); case 3: return j(!0), e.prev = 4, e.next = 7, u.a.post("/api/auth/login", { username: c, password: i }); case 7: return e.next = 9, I(); case 9: if (e.sent) { e.next = 11; break } S("Wrong username or password"); case 11: j(!1), e.next = 17; break; case 14: e.prev = 14, e.t0 = e.catch(4), S(e.t0.response.data); case 17: j(!1); case 18: case "end": return e.stop() } }), e, null, [[4, 14]]) }))); return function (t) { return e.apply(this, arguments) } }(), L = function () { var e = Object(f.a)(h.a.mark((function e(t) { return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: t.preventDefault(), l(Object(p.a)(Object(p.a)({}, a), {}, Object(m.a)({}, t.target.name, t.target.value))); case 2: case "end": return e.stop() } }), e) }))); return function (t) { return e.apply(this, arguments) } }(), I = function () { var e = Object(f.a)(h.a.mark((function e() { var t; return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: return e.prev = 0, e.next = 3, u.a.get("/api/auth/user"); case 3: t = e.sent, g({ username: JSON.stringify(t.data), loaded: !0 }), e.next = 11; break; case 7: return e.prev = 7, e.t0 = e.catch(0), g({ username: "", loaded: !0 }), e.abrupt("return", !1); case 11: case "end": return e.stop() } }), e, null, [[0, 7]]) }))); return function () { return e.apply(this, arguments) } }(); return E.loaded && E.username ? r.a.createElement(o.a, { to: "/home" }) : r.a.createElement("div", { className: "form-container" }, r.a.createElement("h2", null, "Log In"), r.a.createElement("form", { onSubmit: function (e) { return F(e) } }, r.a.createElement("div", { className: "form-group" }, r.a.createElement("label", null, "Username"), r.a.createElement("input", { type: "text", className: "form-control", name: "username", placeholder: "Enter username", value: a.username, onChange: function (e) { return L(e) } })), r.a.createElement("div", { className: "form-group" }, r.a.createElement("label", null, "Password"), r.a.createElement("input", { type: "password", className: "form-control", name: "password", placeholder: "Password", value: a.password, onChange: function (e) { return L(e) } })), r.a.createElement("button", { type: "submit", className: "btn btn-outline-danger" }, "Submit")), "" !== x && r.a.createElement("div", { className: "error-text" }, " ", x, " "), "" !== M && r.a.createElement("div", { className: "info-text" }, " ", M, " "), r.a.createElement("div", { className: "link" }, r.a.createElement("p", null, "Don't have an account? ", r.a.createElement(s.b, { to: "/register" }, "Register"))), O && r.a.createElement("div", null, r.a.createElement("div", { className: "spinner" }, r.a.createElement("div", { className: "bounce1" }), r.a.createElement("div", { className: "bounce2" }), r.a.createElement("div", { className: "bounce3" })))) } function g(e) { var t = e.username, a = Object(o.g)(), n = function () { var e = Object(f.a)(h.a.mark((function e() { return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: return e.next = 2, u.a.get("/api/auth/logout"); case 2: a.push("/"); case 3: case "end": return e.stop() } }), e) }))); return function () { return e.apply(this, arguments) } }(); return r.a.createElement("nav", null, r.a.createElement("div", { className: "nav-wrapper" }, r.a.createElement(s.b, { to: "/home" }, r.a.createElement("p", { className: "brand-logo" }, "Plagiat")), r.a.createElement("ul", { id: "nav-mobile", className: "right hide-on-med-and-down" }, r.a.createElement("li", { className: "username" }, "Hello, ", t, "!"), r.a.createElement("li", null, r.a.createElement("a", { href: "#!", onClick: function () { a.push("/about") } }, "About Moss")), r.a.createElement("li", null, r.a.createElement("a", { href: "#!", onClick: n }, "Log Out"))))) } function w(e) { var t = e.id, a = e.title, n = e.language, l = e.date; return r.a.createElement("div", { className: "card" }, r.a.createElement("div", { className: "card-body" }, r.a.createElement("h5", { className: "card-title" }, a), r.a.createElement("p", { className: "card-text" }, n), r.a.createElement("p", null, l), r.a.createElement("div", { className: "button-stack" }, r.a.createElement(s.b, { to: "/tests/".concat(t) }, r.a.createElement("div", { className: "btn btn-outline-info inline" }, "Results"))))) } function N() { var e = Object(n.useState)({ username: "", loaded: !1 }), t = Object(b.a)(e, 2), a = t[0], l = t[1], c = Object(n.useState)(!0), i = Object(b.a)(c, 2), m = i[0], p = i[1], d = Object(n.useState)([]), v = Object(b.a)(d, 2), E = v[0], N = v[1]; Object(n.useEffect)((function () { O(), j() }), []); var O = function () { var e = Object(f.a)(h.a.mark((function e() { var t; return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: return e.prev = 0, e.next = 3, u.a.get("/api/auth/user"); case 3: t = e.sent, l({ username: t.data.username, loaded: !0 }), e.next = 10; break; case 7: e.prev = 7, e.t0 = e.catch(0), l({ username: "", loaded: !0 }); case 10: case "end": return e.stop() } }), e, null, [[0, 7]]) }))); return function () { return e.apply(this, arguments) } }(), j = function () { var e = Object(f.a)(h.a.mark((function e() { var t; return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: return e.prev = 0, e.next = 3, u.a.get("/api/tests/"); case 3: t = e.sent, N(t.data.reverse()), e.next = 10; break; case 7: e.prev = 7, e.t0 = e.catch(0), console.log(e.t0); case 10: p(!1); case 11: case "end": return e.stop() } }), e, null, [[0, 7]]) }))); return function () { return e.apply(this, arguments) } }(); return a.loaded && !a.username ? r.a.createElement(o.a, { to: "/" }) : r.a.createElement("div", null, r.a.createElement(g, { username: a.username }), r.a.createElement("div", { className: "center-container" }, r.a.createElement("h4", null, "Your Tests"), r.a.createElement(s.b, { to: "/new-test" }, r.a.createElement("button", { type: "button", className: "btn btn-dark" }, "New test")), m ? r.a.createElement("div", { className: "link" }, r.a.createElement("div", { className: "spinner" }, r.a.createElement("div", { className: "bounce1" }), r.a.createElement("div", { className: "bounce2" }), r.a.createElement("div", { className: "bounce3" }))) : E.map((function (e) { return r.a.createElement(w, { key: e._id, id: e._id, title: e.title, language: e.language, date: e.date }) })))) } function O() { var e = Object(n.useState)({ username: "", loaded: !1 }), t = Object(b.a)(e, 2), a = t[0], l = t[1]; Object(n.useEffect)((function () { c() }), []); var c = function () { var e = Object(f.a)(h.a.mark((function e() { var t; return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: return e.prev = 0, e.next = 3, u.a.get("/api/auth/user"); case 3: t = e.sent, l({ username: t.data.username, loaded: !0 }), e.next = 11; break; case 7: e.prev = 7, e.t0 = e.catch(0), console.log(e.t0), l({ username: "", loaded: !0 }); case 11: case "end": return e.stop() } }), e, null, [[0, 7]]) }))); return function () { return e.apply(this, arguments) } }(); return a.loaded && !a.username ? r.a.createElement(o.a, { to: "/" }) : r.a.createElement("div", null, r.a.createElement(g, { username: a.username }), r.a.createElement("div", { className: "about-container" }, r.a.createElement("h4", null, "What is Moss?"), r.a.createElement("p", null, '"Moss (for a Measure Of Software Similarity) is an automatic system for determining the similarity of programs. To date, the main application of Moss has been in detecting plagiarism in programming classes. Since its development in 1994, Moss has been very effective in this role. The algorithm behind moss is a significant improvement over other cheating detection algorithms (at least, over those known to us)."'), r.a.createElement("h4", null, "What is Moss not?"), r.a.createElement("p", null, '"Moss is not a system for completely automatically detecting plagiarism. Plagiarism is a statement that someone copied code deliberately without attribution, and while Moss automatically detects program similarity, it has no way of knowing why codes are similar. It is still up to a human to go and look at the parts of the code that Moss highlights and make a decision about whether there is plagiarism or not. One way of thinking about what Moss provides is that it saves teachers and teaching staff a lot of time by pointing out the parts of programs that are worth a more detailed examination. But once someone has looked at those portions of the programs, it shouldn\'t matter whether the suspect code was first discovered by Moss or by a human; the case that there was plagiarism should stand on its own. In particular, it is a misuse of Moss to rely solely on the similarity scores. These scores are useful for judging the relative amount of matching between different pairs of programs and for more easily seeing which pairs of programs stick out with unusual amounts of matching. But the scores are certainly not a proof of plagiarism. Someone must still look at the code."'), r.a.createElement("p", null, "Read more at: https://theory.stanford.edu/~aiken/moss/"), r.a.createElement("h4", null, "Getting started"), r.a.createElement("p", null, " Get started by ", r.a.createElement(s.b, { to: "/new-test" }, "creating a new test"), " and uploading some files you'd like to check. You can also supply 'base-files', which contain code that will not be counted when checking for similarities. When adding files, please make sure they all have unique names."), r.a.createElement("h4", null, "Reading the results"), r.a.createElement("p", null, "From the official description:"), r.a.createElement("p", null, ' "Lines Matched is approximately the number of lines of code that matched. Each file is also given a percentage score, which is the the percentage of the code in one file considered to match code in the other file. For both measures, higher numbers mean more code matches."'))) } var j = a(24), y = a(79); function k() { var e = Object(n.useState)({ username: "", loaded: !1 }), t = Object(b.a)(e, 2), a = t[0], l = t[1], c = Object(n.useState)({ title: "", description: "", language: "c", date: (new Date).toLocaleDateString(), files: [], baseFiles: [] }), s = Object(b.a)(c, 2), i = s[0], d = s[1], v = Object(n.useState)(!1), E = Object(b.a)(v, 2), w = E[0], N = E[1], O = Object(n.useState)(!1), k = Object(b.a)(O, 2), x = k[0], S = k[1], P = Object(n.useState)(0), C = Object(b.a)(P, 2), M = C[0], D = C[1], F = Object(n.useState)(""), L = Object(b.a)(F, 2), I = L[0], R = L[1], A = Object(n.useState)([]), T = Object(b.a)(A, 2), W = T[0], B = T[1], J = Object(n.useState)([]), q = Object(b.a)(J, 2), U = q[0], G = q[1], H = Object(n.useState)(""), Y = Object(b.a)(H, 2), _ = Y[0], z = Y[1], $ = i.title, K = i.description, Q = i.language, V = r.a.useRef(null); Object(n.useEffect)((function () { Z() }), []); var X = function () { var e = Object(f.a)(h.a.mark((function e(t) { return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: if (t.preventDefault(), !x && !w) { e.next = 3; break } return e.abrupt("return"); case 3: d(Object(p.a)(Object(p.a)({}, i), {}, Object(m.a)({}, t.target.name, t.target.value))); case 4: case "end": return e.stop() } }), e) }))); return function (t) { return e.apply(this, arguments) } }(), Z = function () { var e = Object(f.a)(h.a.mark((function e() { var t; return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: return e.prev = 0, e.next = 3, u.a.get("/api/auth/user"); case 3: t = e.sent, l({ username: t.data.username, loaded: !0 }), e.next = 10; break; case 7: e.prev = 7, e.t0 = e.catch(0), l({ username: "", loaded: !0 }); case 10: case "end": return e.stop() } }), e, null, [[0, 7]]) }))); return function () { return e.apply(this, arguments) } }(), ee = function () { var e = Object(f.a)(h.a.mark((function e(t) { var a, n, r, l, c, s; return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: if (t.preventDefault(), !x && !w) { e.next = 3; break } return e.abrupt("return"); case 3: if (!(W.length < 2)) { e.next = 5; break } return e.abrupt("return", R("Please select at least 2 files to compare")); case 5: a = Object(j.a)(W); try { for (a.s(); !(n = a.n()).done;)r = n.value, i.files.push(r.name) } catch (o) { a.e(o) } finally { a.f() } for (l = new FormData, i.files = W.map((function (e) { return e.name })), i.baseFiles = U.map((function (e) { return e.name })), l.append("form", JSON.stringify(i)), c = 0; c < U.length; c++)l.append("basefile ".concat(c), U[c]); for (s = 0; s < W.length; s++)l.append("file ".concat(s), W[s]); S(!0), u.a.post("/api/tests/", l, { headers: { "Content-Type": "multipart/form-data" }, onUploadProgress: function (e) { var t = Math.round(100 * e.loaded / e.total); 100 === t && (S(!1), N(!0)), D(t) } }).then((function (e) { z(e.data), S(!1) })).catch((function (e) { R(e.response.data), S(!1), N(!1) })); case 15: case "end": return e.stop() } }), e) }))); return function (t) { return e.apply(this, arguments) } }(); return a.loaded && !a.username ? r.a.createElement(o.a, { to: "/" }) : "" !== _ ? r.a.createElement(o.a, { to: "/tests/".concat(_) }) : r.a.createElement("div", null, r.a.createElement(g, { username: a.username }), r.a.createElement("div", { className: "parent" }, r.a.createElement("div", { className: "div1" }, r.a.createElement("h2", null, "Create test"), r.a.createElement("form", { onSubmit: function (e) { return ee(e) } }, r.a.createElement("div", { className: "form-group" }, r.a.createElement("label", null, "Title"), r.a.createElement("input", { type: "text", className: "form-control", name: "title", placeholder: "Enter title", value: $, onChange: function (e) { return X(e) } })), r.a.createElement("div", { className: "form-group" }, r.a.createElement("label", null, "Description"), r.a.createElement("textarea", { className: "form-control", name: "description", placeholder: "Enter description", value: K, onChange: function (e) { return X(e) } })), r.a.createElement("div", { className: "form-group" }, r.a.createElement("label", null, "Language"), r.a.createElement("select", { className: "form-control", name: "language", value: Q, onChange: function (e) { return X(e) } }, r.a.createElement("option", { value: "c" }, "c"), r.a.createElement("option", { value: "cc" }, "cc"), r.a.createElement("option", { value: "java" }, "java"), r.a.createElement("option", { value: "ml" }, "ml"), r.a.createElement("option", { value: "pascal" }, "pascal"), r.a.createElement("option", { value: "ada" }, "ada"), r.a.createElement("option", { value: "lisp" }, "lisp"), r.a.createElement("option", { value: "scheme" }, "scheme"), r.a.createElement("option", { value: "haskell" }, "haskell"), r.a.createElement("option", { value: "fortran" }, "fortran"), r.a.createElement("option", { value: "ascii" }, "ascii"), r.a.createElement("option", { value: "vhdl" }, "vhdl"), r.a.createElement("option", { value: "verilog" }, "verilog"), r.a.createElement("option", { value: "perl" }, "perl"), r.a.createElement("option", { value: "matlab" }, "matlab"), r.a.createElement("option", { value: "python" }, "python"), r.a.createElement("option", { value: "mips" }, "mips"), r.a.createElement("option", { value: "prolog" }, "prolog"), r.a.createElement("option", { value: "spice" }, "spice"), r.a.createElement("option", { value: "vb" }, "vb"), r.a.createElement("option", { value: "csharp" }, "csharp"), r.a.createElement("option", { value: "modula2" }, "modula2"), r.a.createElement("option", { value: "a8086" }, "a8086"), r.a.createElement("option", { value: "javascript" }, "javascript"), r.a.createElement("option", { value: "plsql" }, "plsql"))), r.a.createElement("div", { className: "button-labels" + (x || w ? " fadeOut" : "") }, r.a.createElement("label", { className: "btn btn-outline-info" }, "Add files ", r.a.createElement("input", { type: "file", ref: V, onChange: function (e) { for (var t = [], a = 0; a < e.target.files.length; a++) { var n, r = Object(j.a)(W); try { for (r.s(); !(n = r.n()).done;) { if (n.value.name === e.target.files[a].name) return console.log("Please make sure all uploaded files have unique names.") } } catch (l) { r.e(l) } finally { r.f() } t.push(e.target.files[a]) } B(W.concat(t)) }, hidden: !0, multiple: !0 })), r.a.createElement("label", { className: "btn btn-outline-info" }, "Add base-files ", r.a.createElement("input", { type: "file", ref: V, onChange: function (e) { for (var t = [], a = 0; a < e.target.files.length; a++)t.push(e.target.files[a]); G(U.concat(t)) }, hidden: !0, multiple: !0 })), r.a.createElement("label", { className: "btn btn-outline-danger" }, "Submit ", r.a.createElement("input", { type: "submit", hidden: !0 })), "" !== I && r.a.createElement("div", { className: "error-text" }, " ", I, " ")))), r.a.createElement("div", { className: "div2" }, r.a.createElement("div", { className: "files" }, W.length + U.length > 0 && r.a.createElement("div", { className: x || w ? "fadeOut" : "" }, r.a.createElement("h5", null, "selected files"), r.a.createElement("ul", { className: "list-group" }, W.map((function (e, t) { return r.a.createElement("li", { key: t, className: "list-group-item" }, e.name) })))))), r.a.createElement("div", { className: "div3" }, r.a.createElement("div", { className: "base-files" }, W.length + U.length > 0 && r.a.createElement("div", { className: x || w ? "fadeOut" : "" }, r.a.createElement("h5", null, "selected base-files"), r.a.createElement("ul", { className: "list-group" }, U.map((function (e, t) { return r.a.createElement("li", { key: t, className: "list-group-item" }, e.name) })))))), x && r.a.createElement("div", { className: "div4" }, r.a.createElement("h5", null, "uploading files..."), r.a.createElement(y.a, { variant: "info", now: M })), w && r.a.createElement("div", { className: "div4" }, r.a.createElement("div", { className: "spinner" }, r.a.createElement("div", { className: "bounce1" }), r.a.createElement("div", { className: "bounce2" }), r.a.createElement("div", { className: "bounce3" }))))) } function x() { return r.a.createElement("div", { className: "App" }, r.a.createElement("header", { className: "App-header" }, r.a.createElement("h1", null, "Plagiat"), r.a.createElement("div", { className: "btn-group-vertical" }, r.a.createElement(s.b, { to: "/login" }, r.a.createElement("button", { type: "button", className: "btn btn-dark" }, "Log In"))), r.a.createElement("div", { className: "btn-group-vertical" }, r.a.createElement(s.b, { to: "/register" }, r.a.createElement("button", { type: "button", className: "btn btn-dark" }, "Register"))))) } var S = a(38), P = a.n(S); function C(e) { var t = e.match, a = Object(o.g)(), l = Object(n.useState)({ username: "", loaded: !1 }), c = Object(b.a)(l, 2), s = c[0], i = c[1], m = Object(n.useState)(!0), p = Object(b.a)(m, 2), d = p[0], v = p[1], E = Object(n.useState)({}), w = Object(b.a)(E, 2), N = w[0], O = w[1], j = Object(n.useState)([]), y = Object(b.a)(j, 2), k = y[0], x = y[1], S = Object(n.useState)([]), C = Object(b.a)(S, 2), M = C[0], D = C[1]; Object(n.useEffect)((function () { F(), L() }), []); var F = function () { var e = Object(f.a)(h.a.mark((function e() { var t; return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: return e.prev = 0, e.next = 3, u.a.get("/api/auth/user"); case 3: t = e.sent, i({ username: t.data.username, loaded: !0 }), e.next = 10; break; case 7: e.prev = 7, e.t0 = e.catch(0), i({ username: "", loaded: !0 }); case 10: case "end": return e.stop() } }), e, null, [[0, 7]]) }))); return function () { return e.apply(this, arguments) } }(), L = function () { var e = Object(f.a)(h.a.mark((function e() { var a, n, r, l, c; return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: return e.prev = 0, e.next = 3, u.a.get("/api/tests/".concat(t.params.testID)); case 3: if (a = e.sent, O(a.data), x(a.data.results), a.data.results.length > 0) { for (n = [], r = 0; r < a.data.files.length; r++)n.push({ data: { id: a.data.files[r], label: a.data.files[r] }, css: { color: "rgb(240,240,240)" } }); for (r = 0; r < a.data.results.length; r++)l = a.data.results[r], c = (l.file1Percentage + l.file2Percentage) / 200 * 255, n.push({ data: { source: l.file1, target: l.file2 }, style: { lineColor: "rgb(".concat(c, ",0,0)") } }); D(n) } e.next = 12; break; case 9: e.prev = 9, e.t0 = e.catch(0), console.log(e.t0); case 12: v(!1); case 13: case "end": return e.stop() } }), e, null, [[0, 9]]) }))); return function () { return e.apply(this, arguments) } }(), I = function () { var e = Object(f.a)(h.a.mark((function e() { return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: return e.prev = 0, e.next = 3, u.a.delete("/api/tests/".concat(t.params.testID)); case 3: a.push("/home"), e.next = 9; break; case 6: e.prev = 6, e.t0 = e.catch(0), alert(e.t0.response.data); case 9: case "end": return e.stop() } }), e, null, [[0, 6]]) }))); return function () { return e.apply(this, arguments) } }(); return s.loaded && !s.username ? r.a.createElement(o.a, { to: "/" }) : d || N.files ? r.a.createElement("div", null, r.a.createElement(g, { username: s.username }), d && r.a.createElement("div", { className: "link" }, r.a.createElement("div", { className: "spinner" }, r.a.createElement("div", { className: "bounce1" }), r.a.createElement("div", { className: "bounce2" }), r.a.createElement("div", { className: "bounce3" }))), !d && r.a.createElement("div", null, r.a.createElement("div", { className: "dark-background center-container" }, r.a.createElement("h3", null, N.title), r.a.createElement("p", null, N.description), r.a.createElement("button", { className: "btn btn-outline-danger button-margin", onClick: function () { window.confirm("Are you sure you wish to delete this item?") && I() } }, "Delete Test")), r.a.createElement("div", { className: "parent-test" }, r.a.createElement("div", { className: "div1-test" }, r.a.createElement("h4", null, "Files"), r.a.createElement("ul", { className: "list-group" }, N.files.map((function (e, t) { return r.a.createElement("li", { key: t, className: "list-group-item" }, e) })))), r.a.createElement("div", { className: "div2-test" }, r.a.createElement("h4", null, "Base-files"), r.a.createElement("ul", { className: "list-group" }, N.baseFiles.map((function (e, t) { return r.a.createElement("li", { key: t, className: "list-group-item" }, e) })))), r.a.createElement("div", { className: "div3-test" }, r.a.createElement("h4", { style: { marginBottom: "5%" } }, "Results"), k.length > 0 && r.a.createElement("table", { className: "table table-dark" }, r.a.createElement("thead", null, r.a.createElement("tr", null, r.a.createElement("th", { scope: "col" }, "#"), r.a.createElement("th", { scope: "col" }, "File 1"), r.a.createElement("th", { scope: "col" }, "File 1 %"), r.a.createElement("th", { scope: "col" }, "File 2"), r.a.createElement("th", { scope: "col" }, "File 2 %"), r.a.createElement("th", { scope: "col" }, "Lines matched"))), r.a.createElement("tbody", null, k.map((function (e, t) { return r.a.createElement("tr", { key: t }, r.a.createElement("th", { scope: "row" }, t), r.a.createElement("td", null, e.file1), r.a.createElement("td", null, e.file1Percentage), r.a.createElement("td", null, e.file2), r.a.createElement("td", null, e.file2Percentage), r.a.createElement("td", null, e.linesMatched)) })))) || r.a.createElement("h5", { style: { color: "rgb(0, 190, 100)" } }, "No similarities found!"))), k.length > 0 && r.a.createElement("div", { className: "graph-container" }, r.a.createElement(P.a, { elements: M, zoomingEnabled: !1, style: { width: window.innerWidth / 2, height: window.innerHeight / 2, paddingLeft: 0, paddingRight: 0, marginLeft: "auto", marginRight: "auto", display: "block" }, layout: { name: "circle" } })))) : r.a.createElement(o.a, { to: "/NotFound" }) } function M() { var e = Object(n.useState)({ username: "", loaded: !1 }), t = Object(b.a)(e, 2), a = t[0], l = t[1]; Object(n.useEffect)((function () { c() }), []); var c = function () { var e = Object(f.a)(h.a.mark((function e() { var t; return h.a.wrap((function (e) { for (; ;)switch (e.prev = e.next) { case 0: return e.prev = 0, e.next = 3, u.a.get("/api/auth/user"); case 3: t = e.sent, l({ username: t.data, loaded: !0 }), e.next = 10; break; case 7: e.prev = 7, e.t0 = e.catch(0), l({ username: "", loaded: !0 }); case 10: case "end": return e.stop() } }), e, null, [[0, 7]]) }))); return function () { return e.apply(this, arguments) } }(); return a.loaded && !a.username ? r.a.createElement(o.a, { to: "/" }) : r.a.createElement("div", null, r.a.createElement(g, { username: a.username }), r.a.createElement("div", { style: { textAlign: "center" } }, r.a.createElement("h1", null, "404"))) } function D() { return r.a.createElement(s.a, null, r.a.createElement(o.d, null, r.a.createElement(o.b, { exact: !0, path: "/", component: x }), r.a.createElement(o.b, { exact: !0, path: "/register", component: v }), r.a.createElement(o.b, { exact: !0, path: "/login", component: E }), r.a.createElement(o.b, { exact: !0, path: "/home", component: N }), r.a.createElement(o.b, { exact: !0, path: "/about", component: O }), r.a.createElement(o.b, { exact: !0, path: "/new-test", component: k }), r.a.createElement(o.b, { exact: !0, path: "/tests/:testID", component: C }), r.a.createElement(o.b, { component: M }))) } u.a.defaults.headers = { "Content-Type": "application/json" }, u.a.defaults.withCredentials = !0; Boolean("localhost" === window.location.hostname || "[::1]" === window.location.hostname || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)); c.a.render(r.a.createElement(D, null), document.getElementById("root")), "serviceWorker" in navigator && navigator.serviceWorker.ready.then((function (e) { e.unregister() })).catch((function (e) { console.error(e.message) })) } }, [[39, 1, 2]]]);
//# sourceMappingURL=main.1b91c167.chunk.js.map