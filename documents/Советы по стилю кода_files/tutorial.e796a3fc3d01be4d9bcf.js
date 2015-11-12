var tutorial = webpackJsonp_name_([ 5 ], {
0: function(module, exports, __webpack_require__) {
"use strict";
function init() {
initTaskButtons(), initFolderList(), initSidebarHighlight(), initNewsletterForm(), 
delegate(document, '[data-action="tutorial-map"]', "click", function(e) {
1 == e.which && (e.preventDefault(), showTutorialMapModal());
}), prism.init(), window.ebookType && __webpack_require__.e(6, function() {
__webpack_require__(26).init();
});
var e = document.querySelector(".tutorial-map");
e ? new TutorialMap(e) : /[&?]map\b/.test(location.href) && showTutorialMapModal();
}
function initNewsletterForm() {
var e = document.querySelector("[data-newsletter-subscribe-form]");
e && (e.onsubmit = function(t) {
t.preventDefault(), newsletter.submitSubscribeForm(e);
});
}
function showTutorialMapModal() {
/[&?]map\b/.test(location.href) || window.history.replaceState(null, null, ~location.href.indexOf("?") ? location.href + "&map" : location.href + "?map");
var e = new TutorialMapModal();
e.elem.addEventListener("tutorial-map-remove", function() {
window.history.replaceState(null, null, location.href.replace(/[&?]map\b/, ""));
});
}
function initSidebarHighlight() {
function e() {
var e = document.getElementsByClassName("sidebar__navigation-link_active");
e[0] && e[0].classList.remove("sidebar__navigation-link_active");
for (var t = document.getElementsByTagName("h2"), n = 0; n < t.length; n++) {
var r = t[n];
if (r.getBoundingClientRect().top > 1) break;
}
if (n--, n >= 0) {
var i = t[n].firstElementChild && t[n].firstElementChild.getAttribute("href"), a = document.querySelector('.sidebar__navigation-link a[href="' + i + '"]');
i && a && a.classList.add("sidebar__navigation-link_active");
}
}
document.addEventListener("DOMContentLoaded", function() {
e(), window.addEventListener("scroll", e);
});
}
function initTaskButtons() {
delegate(document, ".task__solution", "click", function(e) {
e.target.closest(".task").classList.toggle("task__answer_open");
}), delegate(document, ".task__answer-close", "click", function(e) {
e.target.closest(".task").classList.toggle("task__answer_open");
}), delegate(document, ".task__step-show", "click", function(e) {
e.target.closest(".task__step").classList.toggle("task__step_open");
});
}
function initFolderList() {
delegate(document, ".lessons-list__lesson_level_1 > .lessons-list__link", "click", function(e) {
var t = e.delegateTarget, n = t.closest(".lessons-list").querySelector(".lessons-list__lesson_open");
n && n != t.parentNode && n.classList.remove("lessons-list__lesson_open"), t.parentNode.classList.toggle("lessons-list__lesson_open"), 
e.preventDefault();
});
}
var delegate = __webpack_require__(27), prism = __webpack_require__(52), xhr = __webpack_require__(28), TutorialMapModal = __webpack_require__(24), TutorialMap = __webpack_require__(25), newsletter = __webpack_require__(60);
window.runDemo = function(button) {
for (var demoElem, parent = button; (parent = parent.parentElement) && !(demoElem = parent.querySelector("[data-demo]")); ) ;
demoElem ? eval(demoElem.textContent) : alert("Ошибка, нет элемента с демо");
}, init();
},
21: function(e) {
"use strict";
function t() {
for (var e = document.querySelectorAll("[data-sticky]"), t = 0; t < e.length; t++) {
var r = e[t], i = r.dataset.sticky ? document.querySelector(r.dataset.sticky) : document.body;
if (r.getBoundingClientRect().top < 0) {
if (r.style.cssText) return;
var a = r.getBoundingClientRect().left, o = n(r);
r.parentNode.insertBefore(o, r), i.appendChild(r), r.classList.add("sticky"), r.style.position = "fixed", 
r.style.top = 0, r.style.left = a + "px", r.style.zIndex = 101, r.style.background = "white", 
r.style.margin = 0, r.style.width = o.offsetWidth + "px", r.placeholder = o;
} else r.placeholder && r.placeholder.getBoundingClientRect().top > 0 && (r.style.cssText = "", 
r.classList.remove("sticky"), r.placeholder.parentNode.insertBefore(r, r.placeholder), 
r.placeholder.remove(), r.placeholder = null);
}
}
function n(e) {
var t = document.createElement("div"), n = getComputedStyle(e);
return t.style.width = e.offsetWidth + "px", t.style.marginLeft = n.marginLeft, 
t.style.marginRight = n.marginRight, t.style.height = e.offsetHeight + "px", t.style.marginBottom = n.marginBottom, 
t.style.marginTop = n.marginTop, t;
}
e.exports = t;
},
24: function(e, t, n) {
"use strict";
function r() {
var e = this;
this.elem = document.createElement("div"), document.body.appendChild(this.elem);
var t = new o({
hasClose: !1
}), n = new s();
t.setContent(n.elem), n.start(), this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);
var r = i({
url: "/tutorial/map"
});
r.addEventListener("success", function(n) {
t.remove(), e.elem.innerHTML = '<div class="tutorial-map-overlay"></div>', e.mapElem = e.elem.firstChild, 
e.mapElem.innerHTML = n.result + '<button class="close-button tutorial-map-overlay__close"></button>', 
e.mapElem.addEventListener("click", function(t) {
t.target.classList.contains("tutorial-map-overlay__close") && e.remove();
}), document.addEventListener("keydown", e.onDocumentKeyDown), document.body.classList.add("tutorial-map_on"), 
e.mapElem.addEventListener("scroll", l), new u(e.mapElem.firstElementChild);
}), r.addEventListener("fail", function() {
return t.remove();
});
}
var i = n(28), a = n(27), o = n(10), s = n(53), u = n(25), l = n(21);
a.delegateMixin(r.prototype), r.prototype.remove = function() {
this.elem.dispatchEvent(new CustomEvent("tutorial-map-remove")), this.elem.remove(), 
document.body.classList.remove("tutorial-map_on"), document.removeEventListener("keydown", this.onDocumentKeyDown);
}, r.prototype.onDocumentKeyDown = function(e) {
27 == e.keyCode && (e.preventDefault(), this.remove());
}, e.exports = r;
},
25: function(e, t, n) {
"use strict";
function r(e) {
var t = this;
this.elem = e, this.showTasksCheckbox = e.querySelector("[data-tutorial-map-show-tasks]"), 
this.showTasksCheckbox.checked = +localStorage.showTasksCheckbox, this.updateShowTasks(), 
this.showTasksCheckbox.onchange = this.updateShowTasks.bind(this), this.filterInput = this.elem.querySelector("[data-tutorial-map-filter]"), 
this.textInputBlock = this.elem.querySelector(".tutorial-map__filter .text-input"), 
this.layoutSwitch = this.elem.querySelector("[data-tutorial-map-layout-switch]");
var n = +localStorage.isMapSingleColumn;
this.layoutSwitch.querySelector('[value="0"]').checked = !n, this.layoutSwitch.querySelector('[value="1"]').checked = n, 
this.updateLayout(), this.layoutSwitch.onchange = this.onLayoutSwitchChange.bind(this), 
this.filterInput.oninput = this.onFilterInput.bind(this), this.filterInput.onkeydown = this.onFilterKeydown.bind(this), 
this.elem.querySelector(".close-button").onclick = function() {
t.filterInput.value = "", t.showClearButton(!1), t.filter("");
}, this.chaptersCollapsed = JSON.parse(localStorage.tutorialMapChapters || "{}"), 
this.showChaptersCollapsed(), this.delegate(".tutorial-map__item > .tutorial-map__link", "click", function(e) {
e.preventDefault();
var t = e.delegateTarget.getAttribute("href");
this.chaptersCollapsed[t] ? delete this.chaptersCollapsed[t] : this.chaptersCollapsed[t] = 1, 
localStorage.tutorialMapChapters = JSON.stringify(this.chaptersCollapsed), this.showChaptersCollapsed();
});
var r = this.elem.querySelector('[href="' + location.pathname + '"]');
r && r.classList.add("tutorial-map__link_active"), this.filterInput.focus();
}
function i(e, t) {
for (var n = 0, r = 0; n < e.length && r < t.length; ) e[n] == t[r] ? (n++, r++) : n++;
return r == t.length;
}
var a = n(76), o = n(27);
r.prototype.showChaptersCollapsed = function() {
for (var e = this.elem.querySelectorAll(".tutorial-map__item > .tutorial-map__link"), t = 0; t < e.length; t++) {
var n = e[t];
this.chaptersCollapsed[n.getAttribute("href")] ? n.parentNode.classList.add("tutorial-map__item_collapsed") : n.parentNode.classList.remove("tutorial-map__item_collapsed");
}
}, r.prototype.onLayoutSwitchChange = function() {
this.updateLayout();
}, r.prototype.updateLayout = function() {
var e = +this.elem.querySelector('[name="map-layout"]:checked').value;
e ? this.elem.classList.add("tutorial-map_singlecol") : this.elem.classList.remove("tutorial-map_singlecol"), 
localStorage.isMapSingleColumn = e ? "1" : "0";
}, r.prototype.updateShowTasks = function() {
this.showTasksCheckbox.checked ? this.elem.classList.add("tutorial-map_show-tasks") : this.elem.classList.remove("tutorial-map_show-tasks"), 
localStorage.showTasksCheckbox = this.showTasksCheckbox.checked ? "1" : "0";
}, r.prototype.onFilterInput = function(e) {
this.showClearButton(e.target.value), this.throttleFilter(e.target.value);
}, r.prototype.onFilterKeydown = function(e) {
27 == e.keyCode && (this.filterInput.value = "", this.showClearButton(!1), this.filter(""));
}, r.prototype.showClearButton = function(e) {
e ? this.textInputBlock.classList.add("text-input_clear-button") : this.textInputBlock.classList.remove("text-input_clear-button");
}, r.prototype.focus = function() {
this.elem.tabIndex = -1, this.elem.focus();
}, r.prototype.filter = function(e) {
function t(t) {
return i(t.querySelector("a").innerHTML.toLowerCase(), e.replace(/\s/g, ""));
}
e = e.toLowerCase();
for (var n = this.showTasksCheckbox.checked, r = (this.elem.querySelectorAll(".tutorial-map-link"), 
this.elem.querySelectorAll(".tutorial-map__item")), a = 0; a < r.length; a++) {
var o = r[a], s = o.querySelectorAll(".tutorial-map__sub-item"), u = Array.prototype.reduce.call(s, function(e, r) {
var i = !1;
if (n) {
var a = r.querySelectorAll(".tutorial-map__sub-sub-item");
i = Array.prototype.reduce.call(a, function(e, n) {
var r = t(n);
return n.hidden = !r, e || r;
}, !1);
}
var o = i || t(r);
return r.hidden = !o, e || o;
}, !1);
o.hidden = !(u || t(o));
}
}, r.prototype.throttleFilter = a(r.prototype.filter, 200), o.delegateMixin(r.prototype), 
e.exports = r;
},
28: function(e, t, n) {
"use strict";
function r(e) {
function t(e, t) {
var n = new CustomEvent(e);
return n.originalEvent = t, n;
}
function n(e, n) {
var r = t("fail", n);
r.reason = e, i.dispatchEvent(r);
}
function r(e, n) {
var r = t("success", n);
r.result = e, i.dispatchEvent(r);
}
var i = new XMLHttpRequest(), o = e.method || "GET", s = e.body, u = e.url;
i.open(o, u, e.sync ? !1 : !0), i.method = o;
var l = a();
l && !e.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", l), "[object Object]" == {}.toString.call(s) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
s = JSON.stringify(s)), e.noDocumentEvents || (i.addEventListener("loadstart", function(e) {
i.timeStart = Date.now();
var n = t("xhrstart", e);
document.dispatchEvent(n);
}), i.addEventListener("loadend", function(e) {
var n = t("xhrend", e);
document.dispatchEvent(n);
}), i.addEventListener("success", function(e) {
var n = t("xhrsuccess", e);
n.result = e.result, document.dispatchEvent(n);
}), i.addEventListener("fail", function(e) {
var n = t("xhrfail", e);
n.reason = e.reason, document.dispatchEvent(n);
})), e.raw || i.setRequestHeader("Accept", "application/json"), i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var c = e.normalStatuses || [ 200 ];
return i.addEventListener("error", function(e) {
n("Ошибка связи с сервером.", e);
}), i.addEventListener("timeout", function(e) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", e);
}), i.addEventListener("abort", function(e) {
n("Запрос был прерван.", e);
}), i.addEventListener("load", function(t) {
if (!i.status) return void n("Не получен ответ от сервера.", t);
if (-1 == c.indexOf(i.status)) return void n("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее.", t);
var a = i.responseText, o = i.getResponseHeader("Content-Type");
if (o.match(/^application\/json/) || e.json) try {
a = JSON.parse(a);
} catch (t) {
return void n("Некорректный формат ответа от сервера.", t);
}
r(a, t);
}), setTimeout(function() {
i.send(s);
}, 0), i;
}
var i = n(23), a = n(77);
document.addEventListener("xhrfail", function(e) {
new i.Error(e.reason);
}), e.exports = r;
},
52: function(e, t, n) {
"use strict";
function r(e) {
for (var t = e.querySelectorAll(".code-example:not([data-prism-done])"), n = 0; n < t.length; n++) {
var r = t[n];
new o(r), r.setAttribute("data-prism-done", "1");
}
}
function i(e) {
for (var t = e.querySelectorAll("div.code-tabs:not([data-prism-done])"), n = 0; n < t.length; n++) new s(t[n]), 
t[n].setAttribute("data-prism-done", "1");
}
function a(e) {
r(e), i(e);
}
n(87), n(88), n(89), n(90), n(91), n(92), n(93), n(94), n(95), n(96), n(97), n(98), 
n(99), n(100), n(101), Prism.tokenTag = "code";
var o = n(79), s = n(80);
t.init = function() {
document.removeEventListener("DOMContentLoaded", Prism.highlightAll), document.addEventListener("DOMContentLoaded", function() {
a(document);
});
}, t.highlight = a;
},
60: function(e, t, n) {
"use strict";
function r(e, t) {
if (e.elements.email.value) {
var n = e.elements.slug, r = [];
if (n.length) for (var s = 0; s < n.length; s++) {
var u = n[s];
u.checked && r.push(u.value);
} else r.push(n.value);
if (!r.length) return void new o.Info("Выберите рассылки из списка.");
var l = {
email: e.elements.email.value,
slug: r
}, c = a({
method: "POST",
url: e.action,
body: l
}), f = e.querySelector('[type="submit"]'), p = new i({
elem: f,
size: "small",
elemClass: "button_loading"
});
p.start(), f.disabled = !0, c.addEventListener("loadend", function() {
p.stop(), f.disabled = !1;
});
var h = e.getAttribute("data-newsletter-subscribe-form");
c.addEventListener("success", function(n) {
200 == this.status ? (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE", {
form: h
}), window.ga("send", "event", "newsletter", "subscribe", h), new o.Success(n.result.message, "slow"), 
e.elements.email.value = "", t && t()) : (window.metrika.reachGoal("NEWSLETTER-SUBSCRIBE-FAIL", {
form: h
}), window.ga("send", "event", "newsletter", "subscribe-fail", h), new o.Error(n.result.message));
});
}
}
var i = n(53), a = n(28), o = n(23);
t.submitSubscribeForm = r;
},
77: function(e) {
"use strict";
e.exports = function() {
var e = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return e ? e[1] : null;
};
},
79: function(e, t, n) {
"use strict";
function r(e) {
function t() {
var e = y.contentWindow;
return "function" != typeof e.postMessage ? void alert("Извините, запуск кода требует более современный браузер") : void e.postMessage(d, "https://ru.lookatcode.com/showjs");
}
function n() {
var t;
if (b && e.hasAttribute("data-refresh") && (b.remove(), b = null), b || (b = e.querySelector(".code-result")), 
b) t = b.querySelector("iframe"); else {
if (b = document.createElement("div"), b.className = "code-result code-example__result", 
t = document.createElement("iframe"), t.name = "frame-" + Math.random(), t.className = "code-result__iframe", 
"0" === e.getAttribute("data-demo-height")) t.style.display = "none"; else if (e.hasAttribute("data-demo-height")) {
var n = +e.getAttribute("data-demo-height");
t.style.height = n + "px";
}
b.appendChild(t), e.appendChild(b);
}
if (g) {
var r = t.contentDocument || t.contentWindow.document;
r.open(), r.write(c(d)), r.close(), "epub" == window.ebookType && setTimeout(function() {
[].forEach.call(r.querySelectorAll("script"), function(e) {
e.remove();
});
}, 2e3), e.hasAttribute("data-demo-height") || o.iframe(t), w && e.hasAttribute("data-autorun") || s(b) || b.scrollIntoView(!1);
} else {
var i = document.createElement("form");
i.style.display = "none", i.method = "POST", i.enctype = "multipart/form-data", 
i.action = "https://ru.lookatcode.com/showhtml", i.target = t.name;
var a = document.createElement("textarea");
a.name = "code", a.value = c(d), i.appendChild(a), t.parentNode.insertBefore(i, t.nextSibling), 
i.submit(), i.remove(), w && e.hasAttribute("data-autorun") || (t.onload = function() {
e.hasAttribute("data-demo-height") || o.iframe(t), s(b) || b.scrollIntoView(!1);
});
}
}
function r() {
if (g) try {
window.eval.call(window, d);
} catch (n) {
alert("Ошибка: " + n.message);
} else e.hasAttribute("data-refresh") && y && (y.remove(), y = null), y ? t() : (y = document.createElement("iframe"), 
y.className = "js-frame", y.src = "https://ru.lookatcode.com/showjs", y.style.width = 0, 
y.style.height = 0, y.style.border = "none", y.onload = function() {
t();
}, document.body.appendChild(y));
}
function l() {
var e;
if (v) e = c(d); else {
var t = d.replace(/^/gim, "    ");
e = "<!DOCTYPE html>\n<html>\n\n<body>\n  <script>\n" + t + "\n  </script>\n</body>\n\n</html>";
}
var n = document.createElement("form");
n.action = "http://plnkr.co/edit/?p=preview", n.method = "POST", n.target = "_blank", 
document.body.appendChild(n);
var r = document.createElement("textarea");
r.name = "files[index.html]", r.value = e, n.appendChild(r);
var i = document.createElement("input");
i.name = "description", i.value = "Fork from " + window.location, n.appendChild(i), 
n.submit(), n.remove();
}
function c() {
var e = d.toLowerCase(), t = e.match("<body>"), n = e.match("</body>"), r = e.match("<html>"), i = e.match("</html>"), a = e.match(/^\s*<!doctype/);
if (a) return d;
var o = d;
return r || (o = "<html>\n" + o), i || (o += "\n</html>"), t || (o = o.replace("<html>", '<html>\n<head>\n  <meta charset="utf-8">\n</head><body>\n')), 
n || (o = o.replace("</html>", "\n</body>\n</html>")), o = "<!DOCTYPE HTML>\n" + o;
}
function f() {
m ? r() : n(), w = !1;
}
var p = e.querySelector("pre"), h = p.querySelector("code"), d = h.textContent;
Prism.highlightElement(h), u(p), i(p, e.getAttribute("data-highlight-block")), a(p, e.getAttribute("data-highlight-inline"));
var m = p.classList.contains("language-javascript"), v = p.classList.contains("language-markup"), g = +e.getAttribute("data-trusted"), $ = +e.getAttribute("data-no-strict");
!$ && m && (d = "'use strict';\n" + d);
var y, b, w = !0;
if (m || v) {
var E = e.querySelector('[data-action="run"]');
E && (E.onclick = function() {
return this.blur(), f(), !1;
});
var x = e.querySelector('[data-action="edit"]');
x && (x.onclick = function() {
return this.blur(), l(), !1;
}), e.hasAttribute("data-autorun") && ("epub" == window.ebookType && "no-epub" == e.getAttribute("data-autorun") ? e.querySelector("iframe").remove() : setTimeout(f, 100));
}
}
function i(e, t) {
if (t) for (var n, r = t.replace(/\s+/g, "").split(","), i = 0; n = r[i++]; ) {
n = n.split("-");
var a = +n[0], o = +n[1] || a, s = '<code class="block-highlight" data-start="' + a + '" data-end="' + o + '">' + Array(a + 1).join("\n") + '<code class="mask">' + Array(o - a + 2).join("\n") + "</code></code>";
e.insertAdjacentHTML("afterBegin", s);
}
}
function a(e, t) {
var n = e.querySelector('code[class*="language-"]');
t = t ? t.split(",") : [];
for (var r = 0; r < t.length; r++) {
var i = t[r].split(":"), a = +i[0], o = i[1].split("-"), s = +o[0], u = +o[1], l = '<code class="inline-highlight">' + Array(a + 1).join("\n") + Array(s + 1).join(" ") + '<code class="mask">' + Array(u - s + 1).join(" ") + "</code></code>";
n.insertAdjacentHTML("afterBegin", l);
}
}
var o = n(18), s = n(112), u = n(109);
e.exports = r;
},
80: function(e, t, n) {
"use strict";
function r(e) {
window.ebookType || (this.elem = e, this.translateX = 0, this.switchesElem = e.querySelector("[data-code-tabs-switches]"), 
this.switchesElemItems = this.switchesElem.firstElementChild, this.arrowLeft = e.querySelector("[data-code-tabs-left]"), 
this.arrowRight = e.querySelector("[data-code-tabs-right]"), this.arrowLeft.onclick = function(e) {
e.preventDefault(), this.translateX = Math.max(0, this.translateX - this.switchesElem.offsetWidth), 
this.renderTranslate();
}.bind(this), this.arrowRight.onclick = function(e) {
e.preventDefault(), this.translateX = Math.min(this.translateX + this.switchesElem.offsetWidth, this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth), 
this.renderTranslate();
}.bind(this), this.delegate(".code-tabs__switch", "click", this.onSwitchClick));
}
var i = n(27), a = n(109);
r.prototype.onSwitchClick = function(e) {
e.preventDefault();
for (var t, n = e.delegateTarget.parentNode.children, r = this.elem.querySelector("[data-code-tabs-content]").children, i = 0; i < n.length; i++) {
var a = n[i], o = r[i];
a == e.delegateTarget ? (t = i, o.classList.add("code-tabs__section_current"), a.classList.add("code-tabs__switch_current")) : (o.classList.remove("code-tabs__section_current"), 
a.classList.remove("code-tabs__switch_current"));
}
0 === t ? this.elem.classList.add("code-tabs_result_on") : (this.elem.classList.remove("code-tabs_result_on"), 
this.highlightTab(r[t]));
}, r.prototype.highlightTab = function(e) {
if (!e.highlighted) {
var t = e.querySelector("pre"), n = t.querySelector("code");
Prism.highlightElement(n), a(t), e.highlighted = !0;
}
}, r.prototype.renderTranslate = function() {
this.switchesElemItems.style.transform = "translateX(-" + this.translateX + "px)", 
0 === this.translateX ? this.arrowLeft.setAttribute("disabled", "") : this.arrowLeft.removeAttribute("disabled"), 
this.translateX === this.switchesElemItems.offsetWidth - this.switchesElem.offsetWidth ? this.arrowRight.setAttribute("disabled", "") : this.arrowRight.removeAttribute("disabled");
}, i.delegateMixin(r.prototype), e.exports = r;
},
87: function(e) {
var t = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {}, n = function() {
var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i, n = t.Prism = {
util: {
encode: function(e) {
return e instanceof r ? new r(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
},
type: function(e) {
return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1];
},
clone: function(e) {
var t = n.util.type(e);
switch (t) {
case "Object":
var r = {};
for (var i in e) e.hasOwnProperty(i) && (r[i] = n.util.clone(e[i]));
return r;

case "Array":
return e.map && e.map(function(e) {
return n.util.clone(e);
});
}
return e;
}
},
languages: {
extend: function(e, t) {
var r = n.util.clone(n.languages[e]);
for (var i in t) r[i] = t[i];
return r;
},
insertBefore: function(e, t, r, i) {
i = i || n.languages;
var a = i[e];
if (2 == arguments.length) {
r = arguments[1];
for (var o in r) r.hasOwnProperty(o) && (a[o] = r[o]);
return a;
}
var s = {};
for (var u in a) if (a.hasOwnProperty(u)) {
if (u == t) for (var o in r) r.hasOwnProperty(o) && (s[o] = r[o]);
s[u] = a[u];
}
return n.languages.DFS(n.languages, function(t, n) {
n === i[e] && t != e && (this[t] = s);
}), i[e] = s;
},
DFS: function(e, t, r) {
for (var i in e) e.hasOwnProperty(i) && (t.call(e, i, e[i], r || i), "Object" === n.util.type(e[i]) ? n.languages.DFS(e[i], t) : "Array" === n.util.type(e[i]) && n.languages.DFS(e[i], t, i));
}
},
plugins: {},
highlightAll: function(e, t) {
for (var r, i = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), a = 0; r = i[a++]; ) n.highlightElement(r, e === !0, t);
},
highlightElement: function(r, i, a) {
for (var o, s, u = r; u && !e.test(u.className); ) u = u.parentNode;
u && (o = (u.className.match(e) || [ , "" ])[1], s = n.languages[o]), r.className = r.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o, 
u = r.parentNode, /pre/i.test(u.nodeName) && (u.className = u.className.replace(e, "").replace(/\s+/g, " ") + " language-" + o);
var l = r.textContent, c = {
element: r,
language: o,
grammar: s,
code: l
};
if (!l || !s) return void n.hooks.run("complete", c);
if (n.hooks.run("before-highlight", c), i && t.Worker) {
var f = new Worker(n.filename);
f.onmessage = function(e) {
c.highlightedCode = e.data, n.hooks.run("before-insert", c), c.element.innerHTML = c.highlightedCode, 
a && a.call(c.element), n.hooks.run("after-highlight", c), n.hooks.run("complete", c);
}, f.postMessage(JSON.stringify({
language: c.language,
code: c.code,
immediateClose: !0
}));
} else c.highlightedCode = n.highlight(c.code, c.grammar, c.language), n.hooks.run("before-insert", c), 
c.element.innerHTML = c.highlightedCode, a && a.call(r), n.hooks.run("after-highlight", c), 
n.hooks.run("complete", c);
},
highlight: function(e, t, i) {
var a = n.tokenize(e, t);
return r.stringify(n.util.encode(a), i);
},
tokenize: function(e, t) {
var r = n.Token, i = [ e ], a = t.rest;
if (a) {
for (var o in a) t[o] = a[o];
delete t.rest;
}
e: for (var o in t) if (t.hasOwnProperty(o) && t[o]) {
var s = t[o];
s = "Array" === n.util.type(s) ? s : [ s ];
for (var u = 0; u < s.length; ++u) {
var l = s[u], c = l.inside, f = !!l.lookbehind, p = 0, h = l.alias;
l = l.pattern || l;
for (var d = 0; d < i.length; d++) {
var m = i[d];
if (i.length > e.length) break e;
if (!(m instanceof r)) {
l.lastIndex = 0;
var v = l.exec(m);
if (v) {
f && (p = v[1].length);
var g = v.index - 1 + p, v = v[0].slice(p), $ = v.length, y = g + $, b = m.slice(0, g + 1), w = m.slice(y + 1), E = [ d, 1 ];
b && E.push(b);
var x = new r(o, c ? n.tokenize(v, c) : v, h);
E.push(x), w && E.push(w), Array.prototype.splice.apply(i, E);
}
}
}
}
}
return i;
},
hooks: {
all: {},
add: function(e, t) {
var r = n.hooks.all;
r[e] = r[e] || [], r[e].push(t);
},
run: function(e, t) {
var r = n.hooks.all[e];
if (r && r.length) for (var i, a = 0; i = r[a++]; ) i(t);
}
}
}, r = n.Token = function(e, t, n) {
this.type = e, this.content = t, this.alias = n;
};
if (r.stringify = function(e, t, i) {
if ("string" == typeof e) return e;
if ("Array" === n.util.type(e)) return e.map(function(n) {
return r.stringify(n, t, e);
}).join("");
var a = {
type: e.type,
content: r.stringify(e.content, t, i),
tag: "span",
classes: [ "token", e.type ],
attributes: {},
language: t,
parent: i
};
if ("comment" == a.type && (a.attributes.spellcheck = "true"), e.alias) {
var o = "Array" === n.util.type(e.alias) ? e.alias : [ e.alias ];
Array.prototype.push.apply(a.classes, o);
}
n.hooks.run("wrap", a);
var s = "";
for (var u in a.attributes) s += (s ? " " : "") + u + '="' + (a.attributes[u] || "") + '"';
return "<" + a.tag + ' class="' + a.classes.join(" ") + '" ' + s + ">" + a.content + "</" + a.tag + ">";
}, !t.document) return t.addEventListener ? (t.addEventListener("message", function(e) {
var r = JSON.parse(e.data), i = r.language, a = r.code, o = r.immediateClose;
t.postMessage(n.highlight(a, n.languages[i], i)), o && t.close();
}, !1), t.Prism) : t.Prism;
var i = document.getElementsByTagName("script");
return i = i[i.length - 1], i && (n.filename = i.src, document.addEventListener && !i.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", n.highlightAll)), 
t.Prism;
}();
void 0 !== e && e.exports && (e.exports = n), "undefined" != typeof global && (global.Prism = n);
},
88: function() {
Prism.languages.markup = {
comment: /<!--[\w\W]*?-->/,
prolog: /<\?[\w\W]+?\?>/,
doctype: /<!DOCTYPE[\w\W]+?>/,
cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
tag: {
pattern: /<\/?[^\s>\/=.]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
inside: {
tag: {
pattern: /^<\/?[^\s>\/]+/i,
inside: {
punctuation: /^<\/?/,
namespace: /^[^\s>\/:]+:/
}
},
"attr-value": {
pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
inside: {
punctuation: /[=>"']/
}
},
punctuation: /\/?>/,
"attr-name": {
pattern: /[^\s>\/]+/,
inside: {
namespace: /^[^\s>\/:]+:/
}
}
}
},
entity: /&#?[\da-z]{1,8};/i
}, Prism.hooks.add("wrap", function(e) {
"entity" === e.type && (e.attributes.title = e.content.replace(/&amp;/, "&"));
}), Prism.languages.xml = Prism.languages.markup, Prism.languages.html = Prism.languages.markup, 
Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup;
},
89: function() {
Prism.languages.css = {
comment: /\/\*[\w\W]*?\*\//,
atrule: {
pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
inside: {
rule: /@[\w-]+/
}
},
url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
property: /(\b|\B)[\w-]+(?=\s*:)/i,
important: /\B!important\b/i,
"function": /[-a-z0-9]+(?=\()/i,
punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), 
Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
style: {
pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
lookbehind: !0,
inside: Prism.languages.css,
alias: "language-css"
}
}), Prism.languages.insertBefore("inside", "attr-value", {
"style-attr": {
pattern: /\s*style=("|').*?\1/i,
inside: {
"attr-name": {
pattern: /^\s*style/i,
inside: Prism.languages.markup.tag.inside
},
punctuation: /^\s*=\s*['"]|['"]\s*$/,
"attr-value": {
pattern: /.+/i,
inside: Prism.languages.css
}
},
alias: "language-css"
}
}, Prism.languages.markup.tag));
},
90: function() {
Prism.languages.css.selector = {
pattern: /[^\{\}\s][^\{\}]*(?=\s*\{)/,
inside: {
"pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
"pseudo-class": /:[-\w]+(?:\(.*\))?/,
"class": /\.[-:\.\w]+/,
id: /#[-:\.\w]+/
}
}, Prism.languages.insertBefore("css", "function", {
hexcode: /#[\da-f]{3,6}/i,
entity: /\\[\da-f]{1,8}/i,
number: /[\d%\.]+/
});
},
91: function() {
Prism.languages.clike = {
comment: [ {
pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
lookbehind: !0
}, {
pattern: /(^|[^\\:])\/\/.*/,
lookbehind: !0
} ],
string: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
"class-name": {
pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
lookbehind: !0,
inside: {
punctuation: /(\.|\\)/
}
},
keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
"boolean": /\b(true|false)\b/,
"function": /[a-z0-9_]+(?=\()/i,
number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
punctuation: /[{}[\];(),.:]/
};
},
92: function() {
Prism.languages.javascript = Prism.languages.extend("clike", {
keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,
number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
"function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i
}), Prism.languages.insertBefore("javascript", "keyword", {
regex: {
pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
lookbehind: !0
}
}), Prism.languages.insertBefore("javascript", "class-name", {
"template-string": {
pattern: /`(?:\\`|\\?[^`])*`/,
inside: {
interpolation: {
pattern: /\$\{[^}]+\}/,
inside: {
"interpolation-punctuation": {
pattern: /^\$\{|\}$/,
alias: "punctuation"
},
rest: Prism.languages.javascript
}
},
string: /[\s\S]+/
}
}
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
script: {
pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
lookbehind: !0,
inside: Prism.languages.javascript,
alias: "language-javascript"
}
}), Prism.languages.js = Prism.languages.javascript;
},
93: function() {
!function(e) {
var t = /#(?!\{).+/, n = {
pattern: /#\{[^}]+\}/,
alias: "variable"
};
e.languages.coffeescript = e.languages.extend("javascript", {
comment: t,
string: [ /'(?:\\?[^\\])*?'/, {
pattern: /"(?:\\?[^\\])*?"/,
inside: {
interpolation: n
}
} ],
keyword: /\b(and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
"class-member": {
pattern: /@(?!\d)\w+/,
alias: "variable"
}
}), e.languages.insertBefore("coffeescript", "comment", {
"multiline-comment": {
pattern: /###[\s\S]+?###/,
alias: "comment"
},
"block-regex": {
pattern: /\/{3}[\s\S]*?\/{3}/,
alias: "regex",
inside: {
comment: t,
interpolation: n
}
}
}), e.languages.insertBefore("coffeescript", "string", {
"inline-javascript": {
pattern: /`(?:\\?[\s\S])*?`/,
inside: {
delimiter: {
pattern: /^`|`$/,
alias: "punctuation"
},
rest: e.languages.javascript
}
},
"multiline-string": [ {
pattern: /'''[\s\S]*?'''/,
alias: "string"
}, {
pattern: /"""[\s\S]*?"""/,
alias: "string",
inside: {
interpolation: n
}
} ]
}), e.languages.insertBefore("coffeescript", "keyword", {
property: /(?!\d)\w+(?=\s*:(?!:))/
});
}(Prism);
},
94: function() {
Prism.languages.http = {
"request-line": {
pattern: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b\shttps?:\/\/\S+\sHTTP\/[0-9.]+/m,
inside: {
property: /^(POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
"attr-name": /:\w+/
}
},
"response-status": {
pattern: /^HTTP\/1.[01] [0-9]+.*/m,
inside: {
property: {
pattern: /(^HTTP\/1.[01] )[0-9]+.*/i,
lookbehind: !0
}
}
},
"header-name": {
pattern: /^[\w-]+:(?=.)/m,
alias: "keyword"
}
};
var e = {
"application/json": Prism.languages.javascript,
"application/xml": Prism.languages.markup,
"text/xml": Prism.languages.markup,
"text/html": Prism.languages.markup
};
for (var t in e) if (e[t]) {
var n = {};
n[t] = {
pattern: RegExp("(content-type:\\s*" + t + "[\\w\\W]*?)(?:\\r?\\n|\\r){2}[\\w\\W]*", "i"),
lookbehind: !0,
inside: {
rest: e[t]
}
}, Prism.languages.insertBefore("http", "header-name", n);
}
},
95: function() {
Prism.languages.scss = Prism.languages.extend("css", {
comment: {
pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
lookbehind: !0
},
atrule: {
pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
inside: {
rule: /@[\w-]+/
}
},
url: /(?:[-a-z]+-)*url(?=\()/i,
selector: {
pattern: /(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,
inside: {
placeholder: /%[-_\w]+/
}
}
}), Prism.languages.insertBefore("scss", "atrule", {
keyword: [ /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i, {
pattern: /( +)(?:from|through)(?= )/,
lookbehind: !0
} ]
}), Prism.languages.insertBefore("scss", "property", {
variable: /\$[-_\w]+|#\{\$[-_\w]+\}/
}), Prism.languages.insertBefore("scss", "function", {
placeholder: {
pattern: /%[-_\w]+/,
alias: "selector"
},
statement: /\B!(?:default|optional)\b/i,
"boolean": /\b(?:true|false)\b/,
"null": /\bnull\b/,
operator: {
pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
lookbehind: !0
}
}), Prism.languages.scss.atrule.inside.rest = Prism.util.clone(Prism.languages.scss);
},
96: function() {
Prism.languages.sql = {
comment: {
pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|(?:--|\/\/|#).*)/,
lookbehind: !0
},
string: {
pattern: /(^|[^@\\])("|')(?:\\?[\s\S])*?\2/,
lookbehind: !0
},
variable: /@[\w.$]+|@("|'|`)(?:\\?[\s\S])+?\1/,
"function": /\b(?:COUNT|SUM|AVG|MIN|MAX|FIRST|LAST|UCASE|LCASE|MID|LEN|ROUND|NOW|FORMAT)(?=\s*\()/i,
keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR VARYING|CHARACTER (?:SET|VARYING)|CHARSET|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|DATA(?:BASES?)?|DATETIME|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE(?: PRECISION)?|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE KEY|ELSE|ENABLE|ENCLOSED BY|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPE(?:D BY)?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTO|INVOKER|ISOLATION LEVEL|JOIN|KEYS?|KILL|LANGUAGE SQL|LAST|LEFT|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MODIFIES SQL DATA|MODIFY|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL(?: CHAR VARYING| CHARACTER(?: VARYING)?| VARCHAR)?|NATURAL|NCHAR(?: VARCHAR)?|NEXT|NO(?: SQL|CHECK|CYCLE)?|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READ(?:S SQL DATA|TEXT)?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEATABLE|REPLICATION|REQUIRE|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE MODE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|START(?:ING BY)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED BY|TEXT(?:SIZE)?|THEN|TIMESTAMP|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNPIVOT|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?)\b/i,
"boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
number: /\b-?(?:0x)?\d*\.?[\da-f]+\b/,
operator: /[-+*\/=%^~]|&&?|\|?\||!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
punctuation: /[;[\]()`,.]/
};
},
97: function() {
Prism.languages.php = Prism.languages.extend("clike", {
keyword: /\b(and|or|xor|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|return|static|switch|use|require|require_once|var|while|abstract|interface|public|implements|private|protected|parent|throw|null|echo|print|trait|namespace|final|yield|goto|instanceof|finally|try|catch)\b/i,
constant: /\b[A-Z0-9_]{2,}\b/,
comment: {
pattern: /(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,
lookbehind: !0
}
}), Prism.languages.insertBefore("php", "class-name", {
"shell-comment": {
pattern: /(^|[^\\])#.*/,
lookbehind: !0,
alias: "comment"
}
}), Prism.languages.insertBefore("php", "keyword", {
delimiter: /\?>|<\?(?:php)?/i,
variable: /\$\w+\b/i,
"package": {
pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
lookbehind: !0,
inside: {
punctuation: /\\/
}
}
}), Prism.languages.insertBefore("php", "operator", {
property: {
pattern: /(->)[\w]+/,
lookbehind: !0
}
}), Prism.languages.markup && (Prism.hooks.add("before-highlight", function(e) {
"php" === e.language && (e.tokenStack = [], e.backupCode = e.code, e.code = e.code.replace(/(?:<\?php|<\?)[\w\W]*?(?:\?>)/gi, function(t) {
return e.tokenStack.push(t), "{{{PHP" + e.tokenStack.length + "}}}";
}));
}), Prism.hooks.add("before-insert", function(e) {
"php" === e.language && (e.code = e.backupCode, delete e.backupCode);
}), Prism.hooks.add("after-highlight", function(e) {
if ("php" === e.language) {
for (var t, n = 0; t = e.tokenStack[n]; n++) e.highlightedCode = e.highlightedCode.replace("{{{PHP" + (n + 1) + "}}}", Prism.highlight(t, e.grammar, "php").replace(/\$/g, "$$$$"));
e.element.innerHTML = e.highlightedCode;
}
}), Prism.hooks.add("wrap", function(e) {
"php" === e.language && "markup" === e.type && (e.content = e.content.replace(/(\{\{\{PHP[0-9]+\}\}\})/g, '<span class="token php">$1</span>'));
}), Prism.languages.insertBefore("php", "comment", {
markup: {
pattern: /<[^?]\/?(.*?)>/,
inside: Prism.languages.markup
},
php: /\{\{\{PHP[0-9]+\}\}\}/
}));
},
98: function() {
Prism.languages.insertBefore("php", "variable", {
"this": /\$this\b/,
global: /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)/,
scope: {
pattern: /\b[\w\\]+::/,
inside: {
keyword: /(static|self|parent)/,
punctuation: /(::|\\)/
}
}
});
},
99: function() {
Prism.languages.python = {
comment: {
pattern: /(^|[^\\])#.*/,
lookbehind: !0
},
string: /"""[\s\S]+?"""|'''[\s\S]+?'''|("|')(?:\\?.)*?\1/,
"function": {
pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_][a-zA-Z0-9_]*(?=\()/g,
lookbehind: !0
},
"class-name": {
pattern: /(\bclass\s+)[a-z0-9_]+/i,
lookbehind: !0
},
keyword: /\b(?:as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|with|yield)\b/,
"boolean": /\b(?:True|False)\b/,
number: /\b-?(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not)\b/,
punctuation: /[{}[\];(),.:]/
};
},
100: function() {
!function(e) {
e.languages.ruby = e.languages.extend("clike", {
comment: /#(?!\{[^\r\n]*?\}).*/,
keyword: /\b(alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|false|for|if|in|module|new|next|nil|not|or|raise|redo|require|rescue|retry|return|self|super|then|throw|true|undef|unless|until|when|while|yield)\b/
});
var t = {
pattern: /#\{[^}]+\}/,
inside: {
delimiter: {
pattern: /^#\{|\}$/,
alias: "tag"
},
rest: e.util.clone(e.languages.ruby)
}
};
e.languages.insertBefore("ruby", "keyword", {
regex: [ {
pattern: /%r([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1[gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
inside: {
interpolation: t
}
}, {
pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/,
lookbehind: !0
} ],
variable: /[@$]+[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/,
symbol: /:[a-zA-Z_][a-zA-Z_0-9]*(?:[?!]|\b)/
}), e.languages.insertBefore("ruby", "number", {
builtin: /\b(Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Fload|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
constant: /\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/
}), e.languages.ruby.string = [ {
pattern: /%[qQiIwWxs]?([^a-zA-Z0-9\s\{\(\[<])(?:[^\\]|\\[\s\S])*?\1/,
inside: {
interpolation: t
}
}, {
pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
inside: {
interpolation: t
}
}, {
pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
inside: {
interpolation: t
}
}, {
pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
inside: {
interpolation: t
}
}, {
pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
inside: {
interpolation: t
}
}, {
pattern: /("|')(#\{[^}]+\}|\\(?:\r?\n|\r)|\\?.)*?\1/,
inside: {
interpolation: t
}
} ];
}(Prism);
},
101: function() {
Prism.languages.java = Prism.languages.extend("clike", {
keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/,
number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+(?:e[+-]?\d+)?[df]?\b/i,
operator: {
pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
lookbehind: !0
}
});
},
109: function(e) {
"use strict";
function t(e) {
var t, n = 1 + e.innerHTML.split("\n").length, r = Array(n);
r = r.join("<span></span>"), t = document.createElement("span"), t.className = "line-numbers-rows", 
t.innerHTML = r, e.hasAttribute("data-start") && (e.style.counterReset = "linenumber " + +e.dataset.start - 1), 
e.appendChild(t);
}
e.exports = t;
},
112: function(e) {
"use strict";
function t(e) {
var t = e.getBoundingClientRect(), n = 0;
if (t.top < 0) n = t.bottom; else {
if (!(t.bottom > window.innerHeight)) return !0;
n = window.innerHeight - top;
}
return n > 10;
}
e.exports = t;
}
});
//# sourceMappingURL=tutorial.e796a3fc3d01be4d9bcf.js.map