var footer = webpackJsonp_name_([ 3 ], {
0: function(t, e, n) {
"use strict";
function s() {
i(), window.devicePixelRatio > 1 && a(), window.addEventListener("scroll", o), o();
}
var i = n(19), a = n(20), o = n(21);
s();
},
19: function(t, e, n) {
"use strict";
var s = n(71);
t.exports = function() {
function t(t) {
var e = t.clientX + a;
e + i.offsetWidth > document.documentElement.clientWidth && (e = Math.max(0, t.clientX - a - i.offsetWidth)), 
i.style.left = e + "px";
var n = t.clientY + o;
n + i.offsetHeight > document.documentElement.clientHeight && (n = Math.max(0, t.clientY - o - i.offsetHeight)), 
i.style.top = n + "px";
}
function e(e) {
if (e.target.closest) {
var n = e.target.closest("a, [data-tooltip]");
n && ("A" == n.tagName && n.closest(".toolbar") || (i = document.createElement("span"), 
i.className = "link__type", n.getAttribute("data-tooltip") ? i.setAttribute("data-tooltip", n.getAttribute("data-tooltip")) : i.setAttribute("data-url", n.getAttribute("href")), 
document.body.appendChild(i), t(e), document.addEventListener("mousemove", t)));
}
}
function n() {
i && (document.removeEventListener("mousemove", t), i.remove(), i = null);
}
var i = null, a = 8, o = 10;
s("a,[data-tooltip]", e, n);
};
},
20: function(t) {
"use strict";
t.exports = function() {
for (var t = document.querySelectorAll('figure img[src$=".png"]'), e = function() {
var e = t[n];
e.onload = function() {
if (this.onload = null, !this.src.match(/@2x.png$/)) {
var t = new Image();
t.onload = function() {
this.width && this.height && (e.src = this.src);
}, t.src = this.src.replace(".png", "@2x.png");
}
}, e.complete && e.onload();
}, n = 0; n < t.length; n++) e();
};
},
21: function(t) {
"use strict";
function e() {
for (var t = document.querySelectorAll("[data-sticky]"), e = 0; e < t.length; e++) {
var s = t[e], i = s.dataset.sticky ? document.querySelector(s.dataset.sticky) : document.body;
if (s.getBoundingClientRect().top < 0) {
if (s.style.cssText) return;
var a = s.getBoundingClientRect().left, o = n(s);
s.parentNode.insertBefore(o, s), i.appendChild(s), s.classList.add("sticky"), s.style.position = "fixed", 
s.style.top = 0, s.style.left = a + "px", s.style.zIndex = 101, s.style.background = "white", 
s.style.margin = 0, s.style.width = o.offsetWidth + "px", s.placeholder = o;
} else s.placeholder && s.placeholder.getBoundingClientRect().top > 0 && (s.style.cssText = "", 
s.classList.remove("sticky"), s.placeholder.parentNode.insertBefore(s, s.placeholder), 
s.placeholder.remove(), s.placeholder = null);
}
}
function n(t) {
var e = document.createElement("div"), n = getComputedStyle(t);
return e.style.width = t.offsetWidth + "px", e.style.marginLeft = n.marginLeft, 
e.style.marginRight = n.marginRight, e.style.height = t.offsetHeight + "px", e.style.marginBottom = n.marginBottom, 
e.style.marginTop = n.marginTop, e;
}
t.exports = e;
},
71: function(t) {
"use strict";
function e(t, e, n) {
u[t] = {
over: e,
out: n
};
}
function n(t) {
if (!a) {
var e = Math.sqrt(Math.pow(t.pageX - o, 2) + Math.pow(t.pageY - l, 2)), n = e / (Date.now() - r);
if (c > n) {
var s = document.elementFromPoint(t.clientX, t.clientY);
if (!s) return;
if (s != i) {
for (var f in u) {
var p = s.closest(f);
p && (a = {
elem: p,
out: u[f].out
}, u[f].over(t));
}
i = s;
}
}
o = t.pageX, l = t.pageY, r = Date.now();
}
}
function s(t) {
if (a) {
for (var e = t.relatedTarget; e; ) {
if (e == a.elem) return;
e = e.parentElement;
}
var n = a.out;
a = null, n(t);
}
}
var i, a, o = 1 / 0, l = 1 / 0, r = Date.now(), c = .2, u = {};
document.addEventListener("mousemove", n), document.addEventListener("mouseout", s), 
t.exports = e;
}
});
//# sourceMappingURL=footer.e796a3fc3d01be4d9bcf.js.map