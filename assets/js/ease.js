/*==================
Ease
====================*/

! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).window = e.window || {})
}(this, function (e) {
    "use strict";

    function m(e) {
        return Math.round(1e5 * e) / 1e5 || 0
    }
    var E = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        b = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
        U = Math.PI / 180,
        Y = Math.sin,
        k = Math.cos,
        B = Math.abs,
        F = Math.sqrt;

    function arcToSegment(e, t, n, s, i, o, r, a, u) {
        if (e !== a || t !== u) {
            n = B(n), s = B(s);
            var h = i % 360 * U,
                f = k(h),
                c = Y(h),
                l = Math.PI,
                g = 2 * l,
                v = (e - a) / 2,
                d = (t - u) / 2,
                m = f * v + c * d,
                p = -c * v + f * d,
                x = m * m,
                y = p * p,
                w = x / (n * n) + y / (s * s);
            1 < w && (n = F(w) * n, s = F(w) * s);
            var C = n * n,
                M = s * s,
                E = (C * M - C * y - M * x) / (C * y + M * x);
            E < 0 && (E = 0);
            var b = (o === r ? -1 : 1) * F(E),
                P = n * p / s * b,
                S = -s * m / n * b,
                N = f * P - c * S + (e + a) / 2,
                T = c * P + f * S + (t + u) / 2,
                _ = (m - P) / n,
                D = (p - S) / s,
                O = (-m - P) / n,
                V = (-p - S) / s,
                q = _ * _ + D * D,
                A = (D < 0 ? -1 : 1) * Math.acos(_ / F(q)),
                R = (_ * V - D * O < 0 ? -1 : 1) * Math.acos((_ * O + D * V) / F(q * (O * O + V * V)));
            isNaN(R) && (R = l), !r && 0 < R ? R -= g : r && R < 0 && (R += g), A %= g, R %= g;
            var G, L = Math.ceil(B(R) / (g / 4)),
                j = [],
                z = R / L,
                I = 4 / 3 * Y(z / 2) / (1 + k(z / 2)),
                W = f * n,
                H = c * n,
                Q = c * -s,
                Z = f * s;
            for (G = 0; G < L; G++) m = k(i = A + G * z), p = Y(i), _ = k(i += z), D = Y(i), j.push(m - I * p, p + I * m, _ + I * D, D - I * _, _, D);
            for (G = 0; G < j.length; G += 2) m = j[G], p = j[G + 1], j[G] = m * W + p * Q + N, j[G + 1] = m * H + p * Z + T;
            return j[G - 2] = a, j[G - 1] = u, j
        }
    }

    function stringToRawPath(e) {
        function ib(e, t, n, s) {
            f = (n - e) / 3, c = (s - t) / 3, a.push(e + f, t + c, n - f, s - c, n, s)
        }
        var t, n, s, i, o, r, a, u, h, f, c, l, g, v, d, m = (e + "").replace(b, function (e) {
                var t = +e;
                return t < 1e-4 && -1e-4 < t ? 0 : t
            }).match(E) || [],
            p = [],
            x = 0,
            y = 0,
            w = m.length,
            C = 0,
            M = "ERROR: malformed path: " + e;
        if (!e || !isNaN(m[0]) || isNaN(m[1])) return console.log(M), p;
        for (t = 0; t < w; t++)
            if (g = o, isNaN(m[t]) ? r = (o = m[t].toUpperCase()) !== m[t] : t--, s = +m[t + 1], i = +m[t + 2], r && (s += x, i += y), t || (u = s, h = i), "M" === o) a && (a.length < 8 ? --p.length : C += a.length), x = u = s, y = h = i, a = [s, i], p.push(a), t += 2, o = "L";
            else if ("C" === o) r || (x = y = 0), (a = a || [0, 0]).push(s, i, x + 1 * m[t + 3], y + 1 * m[t + 4], x += 1 * m[t + 5], y += 1 * m[t + 6]), t += 6;
        else if ("S" === o) f = x, c = y, "C" !== g && "S" !== g || (f += x - a[a.length - 4], c += y - a[a.length - 3]), r || (x = y = 0), a.push(f, c, s, i, x += 1 * m[t + 3], y += 1 * m[t + 4]), t += 4;
        else if ("Q" === o) f = x + 2 / 3 * (s - x), c = y + 2 / 3 * (i - y), r || (x = y = 0), x += 1 * m[t + 3], y += 1 * m[t + 4], a.push(f, c, x + 2 / 3 * (s - x), y + 2 / 3 * (i - y), x, y), t += 4;
        else if ("T" === o) f = x - a[a.length - 4], c = y - a[a.length - 3], a.push(x + f, y + c, s + 2 / 3 * (x + 1.5 * f - s), i + 2 / 3 * (y + 1.5 * c - i), x = s, y = i), t += 2;
        else if ("H" === o) ib(x, y, x = s, y), t += 1;
        else if ("V" === o) ib(x, y, x, y = s + (r ? y - x : 0)), t += 1;
        else if ("L" === o || "Z" === o) "Z" === o && (s = u, i = h, a.closed = !0), ("L" === o || .5 < B(x - s) || .5 < B(y - i)) && (ib(x, y, s, i), "L" === o && (t += 2)), x = s, y = i;
        else if ("A" === o) {
            if (v = m[t + 4], d = m[t + 5], f = m[t + 6], c = m[t + 7], n = 7, 1 < v.length && (v.length < 3 ? (c = f, f = d, n--) : (c = d, f = v.substr(2), n -= 2), d = v.charAt(1), v = v.charAt(0)), l = arcToSegment(x, y, +m[t + 1], +m[t + 2], +m[t + 3], +v, +d, (r ? x : 0) + 1 * f, (r ? y : 0) + 1 * c), t += n, l)
                for (n = 0; n < l.length; n++) a.push(l[n]);
            x = a[a.length - 2], y = a[a.length - 1]
        } else console.log(M);
        return (t = a.length) < 6 ? (p.pop(), t = 0) : a[0] === a[t - 2] && a[1] === a[t - 1] && (a.closed = !0), p.totalPoints = C + t, p
    }

    function p() {
        return y || "undefined" != typeof window && (y = window.gsap) && y.registerPlugin && y
    }

    function q() {
        (y = p()) ? (y.registerEase("_CE", n.create), i = 1) : console.warn("Please gsap.registerPlugin(CustomEase)")
    }

    function s(e) {
        return ~~(1e3 * e + (e < 0 ? -.5 : .5)) / 1e3
    }

    function v() {
        return String.fromCharCode.apply(null, arguments)
    }

    function C(e, t, n, s, i, o, r, a, u, h, f) {
        var c, l = (e + n) / 2,
            g = (t + s) / 2,
            v = (n + i) / 2,
            d = (s + o) / 2,
            m = (i + r) / 2,
            p = (o + a) / 2,
            x = (l + v) / 2,
            y = (g + d) / 2,
            w = (v + m) / 2,
            M = (d + p) / 2,
            E = (x + w) / 2,
            b = (y + M) / 2,
            P = r - e,
            S = a - t,
            N = Math.abs((n - r) * S - (s - a) * P),
            T = Math.abs((i - r) * S - (o - a) * P);
        return h || (h = [{
            x: e,
            y: t
        }, {
            x: r,
            y: a
        }], f = 1), h.splice(f || h.length - 1, 0, {
            x: E,
            y: b
        }), u * (P * P + S * S) < (N + T) * (N + T) && (c = h.length, C(e, t, l, g, x, y, E, b, u, h, f), C(E, b, w, M, m, p, r, a, u, h, f + 1 + (h.length - c))), h
    }
    var y, i, t, o = "CustomEase",
        r = v(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
        a = function (e) {
            var t = 0 === (window ? window.location.href : "").indexOf(v(102, 105, 108, 101, 58, 47, 47)) || -1 !== e.indexOf(v(108, 111, 99, 97, 108, 104, 111, 115, 116)) || -1 !== e.indexOf(v(49, 50, 55, 46, 48, 32, 48, 46, 49)),
                n = [r, v(99, 111, 100, 101, 112, 101, 110, 46, 105, 111), v(99, 111, 100, 101, 112, 101, 110, 46, 112, 108, 117, 109, 98, 105, 110, 103), v(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118), v(99, 111, 100, 101, 112, 101, 110, 46, 97, 112, 112), v(112, 101, 110, 115, 46, 99, 108, 111, 117, 100), v(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), v(99, 100, 112, 110, 46, 105, 111), v(112, 101, 110, 115, 46, 105, 111), v(103, 97, 110, 110, 111, 110, 46, 116, 118), v(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116), v(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46, 110, 101, 116), v(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107), v(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116), v(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109), v(116, 119, 101, 101, 110, 108, 105, 116, 101, 46, 99, 111, 109), v(112, 108, 110, 107, 114, 46, 99, 111), v(104, 111, 116, 106, 97, 114, 46, 99, 111, 109), v(119, 101, 98, 112, 97, 99, 107, 98, 105, 110, 46, 99, 111, 109), v(97, 114, 99, 104, 105, 118, 101, 46, 111, 114, 103), v(99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111), v(99, 115, 98, 46, 97, 112, 112), v(115, 116, 97, 99, 107, 98, 108, 105, 116, 122, 46, 99, 111, 109), v(99, 111, 100, 105, 101, 114, 46, 105, 111), v(109, 111, 116, 105, 111, 110, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), v(115, 116, 97, 99, 107, 111, 118, 101, 114, 102, 108, 111, 119, 46, 99, 111, 109), v(115, 116, 97, 99, 107, 101, 120, 99, 104, 97, 110, 103, 101, 46, 99, 111, 109), v(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116)],
                s = n.length;
            for (setTimeout(function () {
                    window && window.console && !window._gsapWarned && y && !1 !== y.config().trialWarn && (console.log(v(37, 99, 87, 97, 114, 110, 105, 110, 103), v(102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 51, 48, 112, 120, 59, 99, 111, 108, 111, 114, 58, 114, 101, 100, 59)), console.log(v(65, 32, 116, 114, 105, 97, 108, 32, 118, 101, 114, 115, 105, 111, 110, 32, 111, 102, 32) + o + v(32, 105, 115, 32, 108, 111, 97, 100, 101, 100, 32, 116, 104, 97, 116, 32, 111, 110, 108, 121, 32, 119, 111, 114, 107, 115, 32, 108, 111, 99, 97, 108, 108, 121, 32, 97, 110, 100, 32, 111, 110, 32, 100, 111, 109, 97, 105, 110, 115, 32, 108, 105, 107, 101, 32, 99, 111, 100, 101, 112, 101, 110, 46, 105, 111, 32, 97, 110, 100, 32, 99, 111, 100, 101, 115, 97, 110, 100, 98, 111, 120, 46, 105, 111, 46, 32, 42, 42, 42, 32, 68, 79, 32, 78, 79, 84, 32, 68, 69, 80, 76, 79, 89, 32, 84, 72, 73, 83, 32, 70, 73, 76, 69, 32, 42, 42, 42, 32, 76, 111, 97, 100, 105, 110, 103, 32, 105, 116, 32, 111, 110, 32, 97, 110, 32, 117, 110, 97, 117, 116, 104, 111, 114, 105, 122, 101, 100, 32, 115, 105, 116, 101, 32, 118, 105, 111, 108, 97, 116, 101, 115, 32, 116, 104, 101, 32, 108, 105, 99, 101, 110, 115, 101, 32, 97, 110, 100, 32, 119, 105, 108, 108, 32, 99, 97, 117, 115, 101, 32, 97, 32, 114, 101, 100, 105, 114, 101, 99, 116, 46, 32, 80, 108, 101, 97, 115, 101, 32, 106, 111, 105, 110, 32, 67, 108, 117, 98, 32, 71, 114, 101, 101, 110, 83, 111, 99, 107, 32, 116, 111, 32, 103, 101, 116, 32, 102, 117, 108, 108, 32, 97, 99, 99, 101, 115, 115, 32, 116, 111, 32, 116, 104, 101, 32, 98, 111, 110, 117, 115, 32, 112, 108, 117, 103, 105, 110, 115, 32, 116, 104, 97, 116, 32, 98, 111, 111, 115, 116, 32, 121, 111, 117, 114, 32, 97, 110, 105, 109, 97, 116, 105, 111, 110, 32, 115, 117, 112, 101, 114, 112, 111, 119, 101, 114, 115, 46, 32, 68, 105, 115, 97, 98, 108, 101, 32, 116, 104, 105, 115, 32, 119, 97, 114, 110, 105, 110, 103, 32, 119, 105, 116, 104, 32, 103, 115, 97, 112, 46, 99, 111, 110, 102, 105, 103, 40, 123, 116, 114, 105, 97, 108, 87, 97, 114, 110, 58, 32, 102, 97, 108, 115, 101, 125, 41, 59)), console.log(v(37, 99, 71, 101, 116, 32, 117, 110, 114, 101, 115, 116, 114, 105, 99, 116, 101, 100, 32, 102, 105, 108, 101, 115, 32, 97, 116, 32, 104, 116, 116, 112, 115, 58, 47, 47, 103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109, 47, 99, 108, 117, 98), v(102, 111, 110, 116, 45, 115, 105, 122, 101, 58, 49, 54, 112, 120, 59, 99, 111, 108, 111, 114, 58, 35, 52, 101, 57, 56, 49, 53)), window._gsapWarned = 1)
                }, 50); - 1 < --s;)
                if (-1 !== e.indexOf(n[s])) return !0;
            return t || !setTimeout(function () {
                window.location.href = v(104, 116, 116, 112, 115, 58, 47, 47) + r + v(47, 114, 101, 113, 117, 105, 114, 101, 115, 45, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 47) + "?plugin=" + o 
            }, 3e3)
        },
        x = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
        w = /[cLlsSaAhHvVtTqQ]/g,
        n = ((t = CustomEase.prototype).setData = function setData(e, t) {
            t = t || {};
            var n, s, i, o, r, a, u, h, f, c = (e = e || "0,0,1,1").match(x),
                l = 1,
                g = [],
                v = [],
                d = t.precision || 1,
                m = d <= 1;
            if (this.data = e, (w.test(e) || ~e.indexOf("M") && e.indexOf("C") < 0) && (c = stringToRawPath(e)[0]), 4 === (n = c.length)) c.unshift(0, 0), c.push(1, 1), n = 8;
            else if ((n - 2) % 6) throw "Invalid CustomEase";
            for (0 == +c[0] && 1 == +c[n - 2] || function _normalize(e, t, n) {
                    n || 0 === n || (n = Math.max(+e[e.length - 1], +e[1]));
                    var s, i = -1 * e[0],
                        o = -n,
                        r = e.length,
                        a = 1 / (+e[r - 2] + i),
                        u = -t || (Math.abs(e[r - 1] - e[1]) < .01 * (e[r - 2] - e[0]) ? function _findMinimum(e) {
                            var t, n = e.length,
                                s = 1e20;
                            for (t = 1; t < n; t += 6) + e[t] < s && (s = +e[t]);
                            return s
                        }(e) + o : +e[r - 1] + o);
                    for (u = u ? 1 / u : -a, s = 0; s < r; s += 2) e[s] = (+e[s] + i) * a, e[s + 1] = (+e[s + 1] + o) * u
                }(c, t.height, t.originY), this.segment = c, o = 2; o < n; o += 6) s = {
                x: +c[o - 2],
                y: +c[o - 1]
            }, i = {
                x: +c[o + 4],
                y: +c[o + 5]
            }, g.push(s, i), C(s.x, s.y, +c[o], +c[o + 1], +c[o + 2], +c[o + 3], i.x, i.y, 1 / (2e5 * d), g, g.length - 1);
            for (n = g.length, o = 0; o < n; o++) u = g[o], h = g[o - 1] || u, (u.x > h.x || h.y !== u.y && h.x === u.x || u === h) && u.x <= 1 ? (h.cx = u.x - h.x, h.cy = u.y - h.y, h.n = u, h.nx = u.x, m && 1 < o && 2 < Math.abs(h.cy / h.cx - g[o - 2].cy / g[o - 2].cx) && (m = 0), h.cx < l && (h.cx ? l = h.cx : (h.cx = .001, o === n - 1 && (h.x -= .001, l = Math.min(l, .001), m = 0)))) : (g.splice(o--, 1), n--);
            if (r = 1 / (n = 1 / l + 1 | 0), u = g[a = 0], m) {
                for (o = 0; o < n; o++) f = o * r, u.nx < f && (u = g[++a]), s = u.y + (f - u.x) / u.cx * u.cy, v[o] = {
                    x: f,
                    cx: r,
                    y: s,
                    cy: 0,
                    nx: 9
                }, o && (v[o - 1].cy = s - v[o - 1].y);
                v[n - 1].cy = g[g.length - 1].y - s
            } else {
                for (o = 0; o < n; o++) u.nx < o * r && (u = g[++a]), v[o] = u;
                a < g.length - 1 && (v[o - 1] = g[g.length - 2])
            }
            return this.ease = function (e) {
                var t = v[e * n | 0] || v[n - 1];
                return t.nx < e && (t = t.n), t.y + (e - t.x) / t.cx * t.cy
            }, (this.ease.custom = this).id && y && y.registerEase(this.id, this.ease), this
        }, t.getSVGData = function getSVGData(e) {
            return CustomEase.getSVGData(this, e)
        }, CustomEase.create = function create(e, t, n) {
            return new CustomEase(e, t, n).ease
        }, CustomEase.register = function register(e) {
            y = e, q()
        }, CustomEase.get = function get(e) {
            return y.parseEase(e)
        }, CustomEase.getSVGData = function getSVGData(e, t) {
            var n, i, o, r, a, u, h, f, c, l, g = (t = t || {}).width || 100,
                v = t.height || 100,
                d = t.x || 0,
                p = (t.y || 0) + v,
                x = y.utils.toArray(t.path)[0];
            if (t.invert && (v = -v, p = 0), "string" == typeof e && (e = y.parseEase(e)), e.custom && (e = e.custom), e instanceof CustomEase) n = function rawPathToString(e) {
                ! function _isNumber(e) {
                    return "number" == typeof e
                }(e[0]) || (e = [e]);
                var t, n, s, i, o = "",
                    r = e.length;
                for (n = 0; n < r; n++) {
                    for (i = e[n], o += "M" + m(i[0]) + "," + m(i[1]) + " C", t = i.length, s = 2; s < t; s++) o += m(i[s++]) + "," + m(i[s++]) + " " + m(i[s++]) + "," + m(i[s++]) + " " + m(i[s++]) + "," + m(i[s]) + " ";
                    i.closed && (o += "z")
                }
                return o
            }(function transformRawPath(e, t, n, s, i, o, r) {
                for (var a, u, h, f, c, l = e.length; - 1 < --l;)
                    for (u = (a = e[l]).length, h = 0; h < u; h += 2) f = a[h], c = a[h + 1], a[h] = f * t + c * s + o, a[h + 1] = f * n + c * i + r;
                return e._dirty = 1, e
            }([e.segment], g, 0, 0, -v, d, p));
            else {
                for (n = [d, p], r = 1 / (h = Math.max(5, 200 * (t.precision || 1))), f = 5 / (h += 2), c = s(d + r * g), i = ((l = s(p + e(r) * -v)) - p) / (c - d), o = 2; o < h; o++) a = s(d + o * r * g), u = s(p + e(o * r) * -v), (Math.abs((u - l) / (a - c) - i) > f || o === h - 1) && (n.push(c, l), i = (u - l) / (a - c)), c = a, l = u;
                n = "M" + n.join(",")
            }
            return x && x.setAttribute("d", n), n
        }, CustomEase);

    function CustomEase(e, t, n) {
        i || q(), this.id = e, a && this.setData(t, n)
    }
    p() && y.registerPlugin(n), n.version = "3.8.0", e.CustomEase = n, e.default = n;
    if (typeof (window) === "undefined" || window !== e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    } else {
        delete e.default
    }
});
