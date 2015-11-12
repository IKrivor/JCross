var head = function(e) {
function t(n) {
if (r[n]) return r[n].exports;
var i = r[n] = {
exports: {},
id: n,
loaded: !1
};
return e[n].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports;
}
var n = window.webpackJsonp_name_;
window.webpackJsonp_name_ = function(a, o) {
for (var s, u, c = 0, l = []; c < a.length; c++) u = a[c], i[u] && l.push.apply(l, i[u]), 
i[u] = 0;
for (s in o) e[s] = o[s];
for (n && n(a, o); l.length; ) l.shift().call(null, t);
return o[0] ? (r[0] = 0, t(0)) : void 0;
};
var r = {}, i = {
14: 0
};
return t.e = function(e, n) {
if (0 === i[e]) return n.call(null, t);
if (void 0 !== i[e]) i[e].push(n); else {
i[e] = [ n ];
var r = document.getElementsByTagName("head")[0], a = document.createElement("script");
a.type = "text/javascript", a.charset = "utf-8", a.async = !0, a.src = t.p + "" + ({
"0": "search",
"1": "coursesCourse",
"2": "authClient",
"3": "footer",
"4": "angular",
"5": "tutorial",
"6": "ebookExtras",
"7": "coursesSignup",
"8": "ebook",
"9": "nodejsScreencast",
"10": "profile",
"11": "coursesParticipantDetails",
"12": "about",
"13": "quiz",
"16": "coursesMaterials",
"17": "auth",
"18": "coursesFrontpage",
"19": "coursesFeedbackEdit",
"20": "coursesFeedbackList",
"21": "coursesFeedbackShow",
"22": "profileGuestAboutMe",
"23": "webpackScreencast"
}[e] || e) + "-" + e + ".e796a3fc3d01be4d9bcf.js", r.appendChild(a);
}
}, t.m = e, t.c = r, t.p = "/pack/", t(0);
}({
0: function(e, t, n) {
"use strict";
n(133), n(22);
try {
window.localStorage.testProperty = 1, delete window.localStorage.testProperty;
} catch (r) {
try {
window.localStorage = {};
} catch (r) {}
}
n(7), t.login = n(8), n(9), t.Modal = n(10), t.fontTest = n(11), t.resizeOnload = n(18), 
n(12), n(13), n(14), n(15), n(16), n(17), n(23).init();
},
7: function() {
"use strict";
document.addEventListener("click", function(e) {
for (var t = e.target; t; ) {
if (!t.className.match) return;
if (t.className.match(/_unready\b/)) return void e.preventDefault();
t = t.parentElement;
}
}), document.addEventListener("submit", function(e) {
e.target.className.match && e.target.className.match(/_unready\b/) && e.preventDefault();
});
},
8: function(e, t, n) {
"use strict";
function r() {
var e = new i({
hasClose: !1,
mixClass: "login-modal"
}), t = new a();
e.setContent(t.elem), t.start(), n.e(2, function() {
e.remove();
var t = n(84);
new t();
});
}
var i = n(10), a = n(53);
document.addEventListener("click", function(e) {
e.target.hasAttribute("data-action-login") && (e.preventDefault(), r());
}), e.exports = r;
},
9: function(e) {
"use strict";
function t() {
var e = document.createElement("form");
e.method = "POST", e.action = "/auth/logout?_csrf=" + document.cookie.match(/XSRF-TOKEN=([\w-]+)/)[1], 
document.body.appendChild(e), e.submit();
}
document.addEventListener("click", function(e) {
e.target.hasAttribute("data-action-user-logout") && (e.preventDefault(), t());
}), e.exports = t;
},
10: function(e) {
"use strict";
function t(e) {
e = e || {}, this.render(), this.setHasClose(void 0 === e.hasClose ? !0 : e.hasClose), 
this.onClick = this.onClick.bind(this), this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this), 
this.elem.addEventListener("click", this.onClick), document.addEventListener("keydown", this.onDocumentKeyDown);
}
t.prototype.setHasClose = function(e) {
this._hasClose = e, this._hasClose ? this.elem.classList.add("modal__has-close") : this.elem.classList.remove("modal__has-close");
}, t.prototype.render = function() {
document.body.insertAdjacentHTML("beforeEnd", '<div class="modal"><div class="modal__dialog"><button class="close-button modal__close" title="закрыть"></button><div class="modal__content"></div></div></div>'), 
document.body.classList.add("paranja-open"), this.elem = document.body.lastChild, 
this.contentElem = this.elem.querySelector(".modal__content");
}, t.prototype.onClick = function(e) {
e.target.classList.contains("modal__close") && (this.remove(), e.preventDefault());
}, t.prototype.onDocumentKeyDown = function(e) {
27 == e.keyCode && (e.preventDefault(), this.remove());
}, t.prototype.showOverlay = function() {
this.contentElem.classList.add("modal-overlay_light");
}, t.prototype.hideOverlay = function() {
this.contentElem.classList.remove("modal-overlay_light");
}, t.prototype.setContent = function(e) {
"string" == typeof e ? this.contentElem.innerHTML = e : (this.contentElem.innerHTML = "", 
this.contentElem.appendChild(e));
var t = this.contentElem.querySelector("[data-modal-autofocus],[autofocus]");
t && t.focus();
}, t.prototype.remove = function() {
document.body.classList.remove("paranja-open"), document.body.removeChild(this.elem), 
document.removeEventListener("keydown", this.onDocumentKeyDown), this.elem.dispatchEvent(new CustomEvent("modal-remove"));
}, e.exports = t;
},
11: function(e) {
"use strict";
e.exports = function() {
function e() {
n != t.offsetWidth ? document.body.classList.remove("no-icons") : setTimeout(e, 100);
}
var t = document.createElement("span");
document.body.appendChild(t), t.className = "font-test", t.style.fontFamily = "serif";
var n = t.offsetWidth;
t.style.fontFamily = "", e();
};
},
12: function() {
"use strict";
function e() {}
function t() {
e("compactifySidebar");
var t = document.querySelector(".sidebar"), n = t.querySelector(".sidebar__content"), r = t.querySelector(".sidebar__inner"), i = t.classList.contains("sidebar_sticky-footer"), a = t.classList.contains("sidebar_compact");
if (a) {
var o;
o = i ? n.lastElementChild.getBoundingClientRect().top - n.lastElementChild.previousElementSibling.getBoundingClientRect().bottom : n.getBoundingClientRect().bottom - n.lastElementChild.getBoundingClientRect().bottom, 
e("decompact?", o), o > 150 && t.classList.remove("sidebar_compact");
} else e(r.scrollHeight, r.clientHeight), r.scrollHeight > r.clientHeight && (e("compact!"), 
t.classList.add("sidebar_compact"));
}
function n() {
var n = "ru" === document.documentElement.lang ? ".sitetoolbar" : ".sitetoolbar-light", i = document.querySelector(n);
if (!i) return void e("no sitetoolbar");
var a = document.querySelector(".sidebar");
a && (a.style.top = Math.max(i.getBoundingClientRect().bottom, 0) + "px", t()), 
r();
}
function r() {
var e = document.documentElement.clientWidth <= a, t = document.querySelector('meta[name="viewport"]').content;
t = t.replace(/user-scalable=\w+/, "user-scalable=" + (e ? "yes" : "no")), document.querySelector('meta[name="viewport"]').content = t;
}
var i, a = 840;
!function() {
function t() {
e("onWindowScrollAndResizeThrottled", i), i || (i = window.requestAnimationFrame(function() {
n(), i = null;
}));
}
window.addEventListener("scroll", t), window.addEventListener("resize", t), document.addEventListener("DOMContentLoaded", t);
}();
},
13: function() {
"use strict";
function e(e) {
if (e.target.closest) {
var i = e.target.closest(a + "__search-toggle");
i && (r || t(), n());
}
}
function t() {
var e, t = document.querySelector(a), i = t.querySelector(a + "__search-input input"), o = t.querySelector(a + "__find");
o.onmousedown = function() {
e = !0;
}, i.onkeydown = function(e) {
27 == e.keyCode && (this.value = "", n());
}, i.onblur = function() {
!e && n();
}, r = !0;
}
function n() {
var e, t = document.querySelector(a);
t.classList.toggle(i + "_search_open");
var n = t.querySelector(a + "__search-input input");
t.classList.contains(i + "_search_open") ? (n.focus(), e = document.createElement("div"), 
e.className = "search-paranja", e.style.top = t.offsetHeight + "px", document.body.appendChild(e), 
document.body.classList.add("paranja-open")) : (e = document.querySelector(".search-paranja"), 
e.parentNode.removeChild(e), document.body.classList.remove("paranja-open"));
}
document.addEventListener("click", e);
var r = !1, i = "ru" === document.documentElement.lang ? "sitetoolbar" : "sitetoolbar-light", a = "." + i;
},
14: function() {
"use strict";
function e() {
var e = document.querySelector(".page-wrapper");
document.querySelector(".page").classList.toggle("page_sidebar_on"), e && e.classList.toggle("page-wrapper_sidebar_on"), 
document.querySelector(".page").classList.contains("page_sidebar_on") ? delete localStorage.noSidebar : localStorage.noSidebar = 1;
}
function t(t) {
t.target.hasAttribute("data-sidebar-toggle") && e();
}
function n(t) {
if (!(document.activeElement && ~[ "INPUT", "TEXTAREA", "SELECT" ].indexOf(document.activeElement.tagName) || t.keyCode != "S".charCodeAt(0))) {
if (~navigator.userAgent.toLowerCase().indexOf("mac os x")) {
if (!t.metaKey || !t.altKey) return;
} else if (!t.altKey) return;
e(), t.preventDefault();
}
}
document.addEventListener("click", t), document.addEventListener("keydown", n);
},
15: function(e, t, n) {
"use strict";
function r(e) {
if ((!document.activeElement || !~[ "INPUT", "TEXTAREA", "SELECT" ].indexOf(document.activeElement.tagName)) && e[o + "Key"]) {
var t = null;
switch (e.keyCode) {
case 37:
t = "prev";
break;

case 39:
t = "next";
break;

default:
return;
}
var n = document.querySelector('link[rel="' + t + '"]');
n && (document.location = n.href, e.preventDefault());
}
}
function i() {
var e, t = o[0].toUpperCase() + o.slice(1), n = document.querySelector('link[rel="next"]');
n && (e = document.querySelector('a[href="' + n.getAttribute("href") + '"] .page__nav-text-shortcut'), 
e.innerHTML = t + ' + <span class="page__nav-text-arr">→</span>');
var r = document.querySelector('link[rel="prev"]');
r && (e = document.querySelector('a[href="' + r.getAttribute("href") + '"] .page__nav-text-shortcut'), 
e.innerHTML = t + ' + <span class="page__nav-text-arr">←</span>');
}
var a = n(69), o = ~navigator.userAgent.toLowerCase().indexOf("mac os x") ? "ctrl" : "alt";
a(document, {
onRight: function() {
var e = document.querySelector('link[rel="prev"]');
e && (document.location = e.href);
},
onLeft: function() {
var e = document.querySelector('link[rel="next"]');
e && (document.location = e.href);
}
}), document.addEventListener("keydown", r), document.addEventListener("DOMContentLoaded", i);
},
16: function() {
"use strict";
var e;
document.addEventListener("mouseover", function(t) {
var n = t.target.closest("[data-add-class-on-hover]") || t.target.closest(".button");
n && (e = n, n.classList.add("hover"));
}), document.addEventListener("touchend", function() {
setTimeout(function() {
e && (e.classList.remove("hover"), e = null);
}, 500);
}), document.addEventListener("mouseout", function(t) {
e && (e.contains(t.relatedTarget) || (e.classList.remove("hover"), e = null));
}), navigator.userAgent.match(/(iPad|iPhone|iPod)/g) || document.documentElement.classList.add("working-hover");
},
17: function() {
"use strict";
var e = window.location.host;
document.addEventListener("click", function(t) {
function n() {
document.location = i;
}
if (1 == t.which && !t.defaultPrevented) {
var r = t.target.closest && t.target.closest("a");
if (r && (e != r.host || r.hasAttribute("data-track-outbound")) && ~[ "_self", "_top", "_parent" ].indexOf(r.target) && !(t.shiftKey || t.ctrlKey || t.altKey)) {
t.preventDefault();
var i = r.href;
window.ga("send", "event", "outbound", "click", i, {
hitCallback: n
}), setTimeout(n, 500);
}
}
});
},
18: function(e, t, n) {
"use strict";
var r = n(70), i = n(76), a = [];
t.iframe = function(e) {
function t() {
r.async(e, function(t, n) {
n && (e.style.height = n + "px");
});
}
t();
}, t.codeTabs = function(e) {
function t() {
var t = e.closest(".code-tabs"), n = (e.closest("[data-code-tabs-content]"), t.querySelector("[data-code-tabs-switches]")), r = n.firstElementChild;
r.offsetWidth > n.offsetWidth ? t.classList.add("code-tabs_scroll") : t.classList.remove("code-tabs_scroll");
}
t(), a.push(t);
}, window.addEventListener("resize", i(function() {
a.forEach(function(e) {
e();
});
}, 200));
},
22: function(e, t, n) {
"use strict";
n(75);
},
23: function(e, t, n) {
"use strict";
function r(e, t) {
if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
e.prototype = Object.create(t && t.prototype, {
constructor: {
value: e,
enumerable: !1,
writable: !0,
configurable: !0
}
}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}
function i(e, t) {
if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
Object.defineProperty(t, "__esModule", {
value: !0
});
var a, o = function(e, t, n) {
for (var r = !0; r; ) {
var i = e, a = t, o = n;
s = c = u = void 0, r = !1, null === i && (i = Function.prototype);
var s = Object.getOwnPropertyDescriptor(i, a);
if (void 0 !== s) {
if ("value" in s) return s.value;
var u = s.get;
return void 0 === u ? void 0 : u.call(o);
}
var c = Object.getPrototypeOf(i);
if (null === c) return void 0;
e = c, t = a, n = o, r = !0;
}
}, s = function() {
function e(e, t) {
for (var n = 0; n < t.length; n++) {
var r = t[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(e, r.key, r);
}
}
return function(t, n, r) {
return n && e(t.prototype, n), r && e(t, r), t;
};
}(), u = n(27), c = function() {
function e() {
var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
i(this, e), this.notifications = [], this.verticalSpace = t.verticalSpace || 8;
}
return s(e, [ {
key: "register",
value: function(e) {
var t = this;
this.notifications.unshift(e), setTimeout(function() {
return t.recalculate();
}, 20);
}
}, {
key: "unregister",
value: function(e) {
var t = this.notifications.indexOf(e);
this.notifications.splice(t, 1), this.recalculate();
}
}, {
key: "recalculate",
value: function() {
var e = this, t = this.verticalSpace;
this.notifications.forEach(function(n) {
n.top = t, t += n.height + e.verticalSpace;
});
}
} ]), e;
}();
t.init = function(e) {
a = new c(e);
};
var l = function() {
function e(t, n, r) {
i(this, e);
var o = '<div class="notification notification_popup notification_' + n + '">\n    <div class="notification__content">' + t + '</div>\n    <button title="Закрыть" class="notification__close"></button></div>';
switch (document.body.insertAdjacentHTML("beforeEnd", o), this.elem = document.body.lastElementChild, 
r) {
case void 0:
this.timeout = this.TIMEOUT_DEFAULT;
break;

case "slow":
this.timeout = this.TIMEOUT_SLOW;
break;

case "fast":
this.timeout = this.TIMEOUT_FAST;
break;

default:
this.timeout = r;
}
a.register(this), this.setupCloseHandler(), this.setupCloseTimeout();
}
return s(e, [ {
key: "close",
value: function() {
this.elem.parentNode && (this.elem.remove(), a.unregister(this));
}
}, {
key: "setupCloseHandler",
value: function() {
var e = this;
this.delegate(".notification__close", "click", function() {
return e.close();
});
}
}, {
key: "setupCloseTimeout",
value: function() {
var e = this;
this.timeout && setTimeout(function() {
return e.close();
}, this.timeout);
}
}, {
key: "TIMEOUT_DEFAULT",
get: function() {
return 2500;
}
}, {
key: "TIMEOUT_SLOW",
get: function() {
return 5e3;
}
}, {
key: "TIMEOUT_FAST",
get: function() {
return 1500;
}
}, {
key: "height",
get: function() {
return this.elem.offsetHeight;
}
}, {
key: "top",
set: function(e) {
this.elem.style.transform = "translateY(" + e + "px)";
}
} ]), e;
}();
u.delegateMixin(l.prototype);
var f = function(e) {
function t(e, n) {
i(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e, "info", n);
}
return r(t, e), t;
}(l);
t.Info = f;
var h = function(e) {
function t(e, n) {
i(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e, "warning", n);
}
return r(t, e), t;
}(l);
t.Warning = h;
var d = function(e) {
function t(e, n) {
i(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e, "success", n);
}
return r(t, e), t;
}(l);
t.Success = d;
var p = function(e) {
function t(e, n) {
i(this, t), o(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, e, "error", n);
}
return r(t, e), s(t, [ {
key: "TIMEOUT_DEFAULT",
get: function() {
return 5e3;
}
} ]), t;
}(l);
t.Error = p, t.Error = p;
},
27: function(e) {
"use strict";
function t(e, t) {
for (var n = e.target; n; ) {
if (n.matches(t)) return n;
if (n == e.currentTarget) break;
n = n.parentElement;
}
return null;
}
function n(e, n, r, i, a) {
e.addEventListener(r, function(e) {
var r = t(e, n);
e.delegateTarget = r, r && i.call(a || this, e);
});
}
n.delegateMixin = function(e) {
e.delegate = function(e, t, r) {
n(this.elem, e, t, r, this);
};
}, e.exports = n;
},
53: function(e) {
"use strict";
function t(e) {
if (e = e || {}, this.elem = e.elem, this.size = e.size || "medium", this.class = e.class ? " " + e.class : "", 
this.elemClass = e.elemClass, "medium" != this.size && "small" != this.size && "large" != this.size) throw Error("Unsupported size: " + this.size);
this.elem || (this.elem = document.createElement("div"));
}
t.prototype.start = function() {
this.elemClass && this.elem.classList.toggle(this.elemClass), this.elem.insertAdjacentHTML("beforeend", '<span class="spinner spinner_active spinner_' + this.size + this.class + '"><span class="spinner__dot spinner__dot_1"></span><span class="spinner__dot spinner__dot_2"></span><span class="spinner__dot spinner__dot_3"></span></span>');
}, t.prototype.stop = function() {
var e = this.elem.querySelector(".spinner");
e && (e.remove(), this.elemClass && this.elem.classList.toggle(this.elemClass));
}, e.exports = t;
},
69: function(e) {
"use strict";
function t(e, t) {
t = t || {};
var n, r, i, a, o, s = t.onRight || function() {}, u = t.onLeft || function() {}, c = t.tolerance || 50, l = t.threshold || 150, f = t.allowedTime || 500;
e.addEventListener("touchstart", function(e) {
var t = e.changedTouches[0];
i = 0, n = t.pageX, r = t.pageY, o = Date.now();
}), e.addEventListener("touchend", function(e) {
var t = e.changedTouches[0];
if (i = t.pageX - n, a = Date.now() - o, !(Math.abs(t.pageY - r) > c || a > f)) {
for (var h = !1, d = e.target; d != document.body; ) {
if (d.scrollWidth > d.clientWidth) {
h = !0;
break;
}
d = d.parentElement;
}
h || (i > l && s(e), -l > i && u(e));
}
});
}
e.exports = t;
},
70: function(e, t, n) {
"use strict";
function r(e, t) {
function n(e, n) {
clearTimeout(r), t(e, n);
}
var r = setTimeout(function() {
t(Error("timeout"));
}, 500);
try {
(e.contentDocument || e.contentWindow.document).body;
} catch (o) {
i(e, n);
}
if (!e.offsetWidth) {
var s = e.cloneNode(!0);
return s.name = "", s.style.height = "50px", s.style.position = "absolute", s.style.display = "block", 
s.style.top = "10000px", s.onload = function() {
var t = a(this.contentDocument);
e.style.display = "block", s.remove(), n(null, t);
}, void document.body.appendChild(s);
}
e.style.display = "block", e.style.height = "1px";
var u = a(e.contentDocument);
e.style.height = "", n(null, u);
}
function i() {
throw Error("Not implemented yet");
}
var a = n(107);
r.async = function(e, t) {
setTimeout(function() {
r(e, t);
}, 0);
}, e.exports = r;
},
75: function(e, t, n) {
"use strict";
function r(e) {
if (e.length) {
if (1 === e.length) return "string" == typeof e[0] ? document.createTextNode(e[0]) : e[0];
for (var t, n = document.createDocumentFragment(), r = e.length, i = -1; ++i < r; ) t = e[i], 
n.appendChild("string" == typeof t ? document.createTextNode(t) : t);
return n;
}
throw Error("DOM Exception 8");
}
var i = {
matches: Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector,
replace: function() {
this.parentNode && this.parentNode.replaceChild(r(arguments), this);
},
prepend: function() {
this.insertBefore(r(arguments), this.firstChild);
},
append: function() {
this.appendChild(r(arguments));
},
remove: function() {
var e = this.parentNode;
return e ? e.removeChild(this) : void 0;
},
before: function() {
this.parentNode && this.parentNode.insertBefore(r(arguments), this);
},
after: function() {
this.parentNode && this.parentNode.insertBefore(r(arguments), this.nextSibling);
},
closest: function(e) {
for (var t = this; t; ) {
if (t.matches && t.matches(e)) return t;
t = t.parentElement;
}
return null;
}
};
for (var a in i) Element.prototype[a] || (Element.prototype[a] = i[a]);
n(103), n(104), n(105), n(106);
},
76: function(e) {
"use strict";
function t(e, t) {
function n() {
return a ? (r = arguments, void (i = this)) : (e.apply(this, arguments), a = !0, 
void setTimeout(function() {
a = !1, r && (n.apply(i, r), r = i = null);
}, t));
}
var r, i, a = !1;
return n;
}
e.exports = t;
},
103: function() {
"use strict";
try {
new CustomEvent("IE has CustomEvent, but doesn't support constructor");
} catch (e) {
window.CustomEvent = function(e, t) {
var n;
return t = t || {
bubbles: !1,
cancelable: !1,
detail: void 0
}, n = document.createEvent("CustomEvent"), n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), 
n;
}, CustomEvent.prototype = Object.create(window.Event.prototype);
}
},
104: function() {
"use strict";
if (!(document.documentElement.dataset || Object.getOwnPropertyDescriptor(Element.prototype, "dataset") && Object.getOwnPropertyDescriptor(Element.prototype, "dataset").get)) {
var e = {
enumerable: !0,
get: function() {
var e, t, n, r, i, a, o = this, s = this.attributes, u = s.length, c = function(e) {
return e.charAt(1).toUpperCase();
}, l = function() {
return this;
}, f = function(e, t) {
return void 0 !== t ? this.setAttribute(e, t) : this.removeAttribute(e);
};
try {
({}).__defineGetter__("test", function() {}), t = {};
} catch (h) {
t = document.createElement("div");
}
for (e = 0; u > e; e++) if (a = s[e], a && a.name && /^data-\w[\w\-]*$/.test(a.name)) {
n = a.value, r = a.name, i = r.substr(5).replace(/-./g, c);
try {
Object.defineProperty(t, i, {
enumerable: this.enumerable,
get: l.bind(n || ""),
set: f.bind(o, r)
});
} catch (d) {
t[i] = n;
}
}
return t;
}
};
try {
Object.defineProperty(Element.prototype, "dataset", e);
} catch (t) {
e.enumerable = !1, Object.defineProperty(Element.prototype, "dataset", e);
}
}
},
105: function() {
"use strict";
void 0 === document.documentElement.hidden && (document.head.insertAdjacentHTML("beforeEnd", "<style> [hidden] { display: none } </style>"), 
Object.defineProperty(Element.prototype, "hidden", {
set: function(e) {
this.setAttribute("hidden", e);
},
get: function() {
return this.getAttribute("hidden");
}
}));
},
106: function() {
"use strict";
!function() {
var e = 0;
window.requestAnimationFrame || (window.requestAnimationFrame = function(t) {
var n = new Date().getTime(), r = Math.max(0, 16 - (n - e)), i = window.setTimeout(function() {
t(n + r);
}, r);
return e = n + r, i;
}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
clearTimeout(e);
});
}();
},
107: function(e, t, n) {
"use strict";
function r(e) {
e = e || document;
var t = Math.max(e.body.scrollHeight, e.documentElement.scrollHeight, e.body.offsetHeight, e.documentElement.offsetHeight, e.body.clientHeight, e.documentElement.clientHeight);
return e.documentElement.scrollWidth > e.documentElement.clientWidth && (i || (i = a()), 
t += i), t;
}
var i, a = n(121);
e.exports = r;
},
121: function(e) {
"use strict";
function t() {
var e = document.createElement("div");
if (e.style.cssText = "visibility:hidden;height:100px", !document.body) throw Error("getScrollbarHeight called to early: no document.body");
document.body.appendChild(e);
var t = e.offsetWidth;
e.style.overflow = "scroll";
var n = document.createElement("div");
n.style.width = "100%", e.appendChild(n);
var r = n.offsetWidth;
return e.parentNode.removeChild(e), t - r;
}
e.exports = t;
},
133: function() {}
});
//# sourceMappingURL=head.e796a3fc3d01be4d9bcf.js.map