import {
  r as w,
  R as Go,
  j as s,
  F as la,
  G as fe,
  e as Z,
  m as Fs,
  b as ae,
  g as Jo,
} from "./index-DoUcYi2w.js";
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function rs() {
  return (
    (rs = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var r in i)
              Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]);
          }
          return t;
        }),
    rs.apply(this, arguments)
  );
}
var it;
(function (t) {
  ((t.Pop = "POP"), (t.Push = "PUSH"), (t.Replace = "REPLACE"));
})(it || (it = {}));
const or = "popstate";
function Ko(t) {
  t === void 0 && (t = {});
  function e(r, a) {
    let { pathname: c, search: l, hash: h } = r.location;
    return Mn(
      "",
      { pathname: c, search: l, hash: h },
      (a.state && a.state.usr) || null,
      (a.state && a.state.key) || "default",
    );
  }
  function i(r, a) {
    return typeof a == "string" ? a : Ms(a);
  }
  return Yo(e, i, null, t);
}
function de(t, e) {
  if (t === !1 || t === null || typeof t > "u") throw new Error(e);
}
function ca(t, e) {
  if (!t) {
    typeof console < "u" && console.warn(e);
    try {
      throw new Error(e);
    } catch {}
  }
}
function Xo() {
  return Math.random().toString(36).substr(2, 8);
}
function lr(t, e) {
  return { usr: t.state, key: t.key, idx: e };
}
function Mn(t, e, i, r) {
  return (
    i === void 0 && (i = null),
    rs(
      { pathname: typeof t == "string" ? t : t.pathname, search: "", hash: "" },
      typeof e == "string" ? At(e) : e,
      { state: i, key: (e && e.key) || r || Xo() },
    )
  );
}
function Ms(t) {
  let { pathname: e = "/", search: i = "", hash: r = "" } = t;
  return (
    i && i !== "?" && (e += i.charAt(0) === "?" ? i : "?" + i),
    r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r),
    e
  );
}
function At(t) {
  let e = {};
  if (t) {
    let i = t.indexOf("#");
    i >= 0 && ((e.hash = t.substr(i)), (t = t.substr(0, i)));
    let r = t.indexOf("?");
    (r >= 0 && ((e.search = t.substr(r)), (t = t.substr(0, r))),
      t && (e.pathname = t));
  }
  return e;
}
function Yo(t, e, i, r) {
  r === void 0 && (r = {});
  let { window: a = document.defaultView, v5Compat: c = !1 } = r,
    l = a.history,
    h = it.Pop,
    p = null,
    y = j();
  y == null && ((y = 0), l.replaceState(rs({}, l.state, { idx: y }), ""));
  function j() {
    return (l.state || { idx: null }).idx;
  }
  function N() {
    h = it.Pop;
    let S = j(),
      R = S == null ? null : S - y;
    ((y = S), p && p({ action: h, location: T.location, delta: R }));
  }
  function _(S, R) {
    h = it.Push;
    let O = Mn(T.location, S, R);
    y = j() + 1;
    let L = lr(O, y),
      A = T.createHref(O);
    try {
      l.pushState(L, "", A);
    } catch (F) {
      if (F instanceof DOMException && F.name === "DataCloneError") throw F;
      a.location.assign(A);
    }
    c && p && p({ action: h, location: T.location, delta: 1 });
  }
  function D(S, R) {
    h = it.Replace;
    let O = Mn(T.location, S, R);
    y = j();
    let L = lr(O, y),
      A = T.createHref(O);
    (l.replaceState(L, "", A),
      c && p && p({ action: h, location: T.location, delta: 0 }));
  }
  function E(S) {
    let R = a.location.origin !== "null" ? a.location.origin : a.location.href,
      O = typeof S == "string" ? S : Ms(S);
    return (
      (O = O.replace(/ $/, "%20")),
      de(
        R,
        "No window.location.(origin|href) available to create URL for href: " +
          O,
      ),
      new URL(O, R)
    );
  }
  let T = {
    get action() {
      return h;
    },
    get location() {
      return t(a, l);
    },
    listen(S) {
      if (p) throw new Error("A history only accepts one active listener");
      return (
        a.addEventListener(or, N),
        (p = S),
        () => {
          (a.removeEventListener(or, N), (p = null));
        }
      );
    },
    createHref(S) {
      return e(a, S);
    },
    createURL: E,
    encodeLocation(S) {
      let R = E(S);
      return { pathname: R.pathname, search: R.search, hash: R.hash };
    },
    push: _,
    replace: D,
    go(S) {
      return l.go(S);
    },
  };
  return T;
}
var cr;
(function (t) {
  ((t.data = "data"),
    (t.deferred = "deferred"),
    (t.redirect = "redirect"),
    (t.error = "error"));
})(cr || (cr = {}));
function Qo(t, e, i) {
  return (i === void 0 && (i = "/"), Zo(t, e, i));
}
function Zo(t, e, i, r) {
  let a = typeof e == "string" ? At(e) : e,
    c = ei(a.pathname || "/", i);
  if (c == null) return null;
  let l = da(t);
  el(l);
  let h = null;
  for (let p = 0; h == null && p < l.length; ++p) {
    let y = ul(c);
    h = cl(l[p], y);
  }
  return h;
}
function da(t, e, i, r) {
  (e === void 0 && (e = []),
    i === void 0 && (i = []),
    r === void 0 && (r = ""));
  let a = (c, l, h) => {
    let p = {
      relativePath: h === void 0 ? c.path || "" : h,
      caseSensitive: c.caseSensitive === !0,
      childrenIndex: l,
      route: c,
    };
    p.relativePath.startsWith("/") &&
      (de(
        p.relativePath.startsWith(r),
        'Absolute route path "' +
          p.relativePath +
          '" nested under path ' +
          ('"' + r + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes.",
      ),
      (p.relativePath = p.relativePath.slice(r.length)));
    let y = at([r, p.relativePath]),
      j = i.concat(p);
    (c.children &&
      c.children.length > 0 &&
      (de(
        c.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + y + '".'),
      ),
      da(c.children, e, j, y)),
      !(c.path == null && !c.index) &&
        e.push({ path: y, score: ol(y, c.index), routesMeta: j }));
  };
  return (
    t.forEach((c, l) => {
      var h;
      if (c.path === "" || !((h = c.path) != null && h.includes("?"))) a(c, l);
      else for (let p of ha(c.path)) a(c, l, p);
    }),
    e
  );
}
function ha(t) {
  let e = t.split("/");
  if (e.length === 0) return [];
  let [i, ...r] = e,
    a = i.endsWith("?"),
    c = i.replace(/\?$/, "");
  if (r.length === 0) return a ? [c, ""] : [c];
  let l = ha(r.join("/")),
    h = [];
  return (
    h.push(...l.map((p) => (p === "" ? c : [c, p].join("/")))),
    a && h.push(...l),
    h.map((p) => (t.startsWith("/") && p === "" ? "/" : p))
  );
}
function el(t) {
  t.sort((e, i) =>
    e.score !== i.score
      ? i.score - e.score
      : ll(
          e.routesMeta.map((r) => r.childrenIndex),
          i.routesMeta.map((r) => r.childrenIndex),
        ),
  );
}
const tl = /^:[\w-]+$/,
  sl = 3,
  nl = 2,
  il = 1,
  rl = 10,
  al = -2,
  dr = (t) => t === "*";
function ol(t, e) {
  let i = t.split("/"),
    r = i.length;
  return (
    i.some(dr) && (r += al),
    e && (r += nl),
    i
      .filter((a) => !dr(a))
      .reduce((a, c) => a + (tl.test(c) ? sl : c === "" ? il : rl), r)
  );
}
function ll(t, e) {
  return t.length === e.length && t.slice(0, -1).every((r, a) => r === e[a])
    ? t[t.length - 1] - e[e.length - 1]
    : 0;
}
function cl(t, e, i) {
  let { routesMeta: r } = t,
    a = {},
    c = "/",
    l = [];
  for (let h = 0; h < r.length; ++h) {
    let p = r[h],
      y = h === r.length - 1,
      j = c === "/" ? e : e.slice(c.length) || "/",
      N = dl(
        { path: p.relativePath, caseSensitive: p.caseSensitive, end: y },
        j,
      ),
      _ = p.route;
    if (!N) return null;
    (Object.assign(a, N.params),
      l.push({
        params: a,
        pathname: at([c, N.pathname]),
        pathnameBase: gl(at([c, N.pathnameBase])),
        route: _,
      }),
      N.pathnameBase !== "/" && (c = at([c, N.pathnameBase])));
  }
  return l;
}
function dl(t, e) {
  typeof t == "string" && (t = { path: t, caseSensitive: !1, end: !0 });
  let [i, r] = hl(t.path, t.caseSensitive, t.end),
    a = e.match(i);
  if (!a) return null;
  let c = a[0],
    l = c.replace(/(.)\/+$/, "$1"),
    h = a.slice(1);
  return {
    params: r.reduce((y, j, N) => {
      let { paramName: _, isOptional: D } = j;
      if (_ === "*") {
        let T = h[N] || "";
        l = c.slice(0, c.length - T.length).replace(/(.)\/+$/, "$1");
      }
      const E = h[N];
      return (
        D && !E ? (y[_] = void 0) : (y[_] = (E || "").replace(/%2F/g, "/")),
        y
      );
    }, {}),
    pathname: c,
    pathnameBase: l,
    pattern: t,
  };
}
function hl(t, e, i) {
  (e === void 0 && (e = !1),
    i === void 0 && (i = !0),
    ca(
      t === "*" || !t.endsWith("*") || t.endsWith("/*"),
      'Route path "' +
        t +
        '" will be treated as if it were ' +
        ('"' + t.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + t.replace(/\*$/, "/*") + '".'),
    ));
  let r = [],
    a =
      "^" +
      t
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (l, h, p) => (
            r.push({ paramName: h, isOptional: p != null }),
            p ? "/?([^\\/]+)?" : "/([^\\/]+)"
          ),
        );
  return (
    t.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (a += t === "*" || t === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : i
        ? (a += "\\/*$")
        : t !== "" && t !== "/" && (a += "(?:(?=\\/|$))"),
    [new RegExp(a, e ? void 0 : "i"), r]
  );
}
function ul(t) {
  try {
    return t
      .split("/")
      .map((e) => decodeURIComponent(e).replace(/\//g, "%2F"))
      .join("/");
  } catch (e) {
    return (
      ca(
        !1,
        'The URL path "' +
          t +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + e + ")."),
      ),
      t
    );
  }
}
function ei(t, e) {
  if (e === "/") return t;
  if (!t.toLowerCase().startsWith(e.toLowerCase())) return null;
  let i = e.endsWith("/") ? e.length - 1 : e.length,
    r = t.charAt(i);
  return r && r !== "/" ? null : t.slice(i) || "/";
}
function ml(t, e) {
  e === void 0 && (e = "/");
  let {
    pathname: i,
    search: r = "",
    hash: a = "",
  } = typeof t == "string" ? At(t) : t;
  return {
    pathname: i ? (i.startsWith("/") ? i : fl(i, e)) : e,
    search: xl(r),
    hash: yl(a),
  };
}
function fl(t, e) {
  let i = e.replace(/\/+$/, "").split("/");
  return (
    t.split("/").forEach((a) => {
      a === ".." ? i.length > 1 && i.pop() : a !== "." && i.push(a);
    }),
    i.length > 1 ? i.join("/") : "/"
  );
}
function En(t, e, i, r) {
  return (
    "Cannot include a '" +
    t +
    "' character in a manually specified " +
    ("`to." +
      e +
      "` field [" +
      JSON.stringify(r) +
      "].  Please separate it out to the ") +
    ("`to." + i + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function pl(t) {
  return t.filter(
    (e, i) => i === 0 || (e.route.path && e.route.path.length > 0),
  );
}
function ua(t, e) {
  let i = pl(t);
  return e
    ? i.map((r, a) => (a === i.length - 1 ? r.pathname : r.pathnameBase))
    : i.map((r) => r.pathnameBase);
}
function ma(t, e, i, r) {
  r === void 0 && (r = !1);
  let a;
  typeof t == "string"
    ? (a = At(t))
    : ((a = rs({}, t)),
      de(
        !a.pathname || !a.pathname.includes("?"),
        En("?", "pathname", "search", a),
      ),
      de(
        !a.pathname || !a.pathname.includes("#"),
        En("#", "pathname", "hash", a),
      ),
      de(!a.search || !a.search.includes("#"), En("#", "search", "hash", a)));
  let c = t === "" || a.pathname === "",
    l = c ? "/" : a.pathname,
    h;
  if (l == null) h = i;
  else {
    let N = e.length - 1;
    if (!r && l.startsWith("..")) {
      let _ = l.split("/");
      for (; _[0] === ".."; ) (_.shift(), (N -= 1));
      a.pathname = _.join("/");
    }
    h = N >= 0 ? e[N] : "/";
  }
  let p = ml(a, h),
    y = l && l !== "/" && l.endsWith("/"),
    j = (c || l === ".") && i.endsWith("/");
  return (!p.pathname.endsWith("/") && (y || j) && (p.pathname += "/"), p);
}
const at = (t) => t.join("/").replace(/\/\/+/g, "/"),
  gl = (t) => t.replace(/\/+$/, "").replace(/^\/*/, "/"),
  xl = (t) => (!t || t === "?" ? "" : t.startsWith("?") ? t : "?" + t),
  yl = (t) => (!t || t === "#" ? "" : t.startsWith("#") ? t : "#" + t);
function vl(t) {
  return (
    t != null &&
    typeof t.status == "number" &&
    typeof t.statusText == "string" &&
    typeof t.internal == "boolean" &&
    "data" in t
  );
}
const fa = ["post", "put", "patch", "delete"];
new Set(fa);
const bl = ["get", ...fa];
new Set(bl);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function as() {
  return (
    (as = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var r in i)
              Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]);
          }
          return t;
        }),
    as.apply(this, arguments)
  );
}
const ti = w.createContext(null),
  jl = w.createContext(null),
  Nt = w.createContext(null),
  Gs = w.createContext(null),
  Ye = w.createContext({ outlet: null, matches: [], isDataRoute: !1 }),
  pa = w.createContext(null);
function Nl(t, e) {
  let { relative: i } = e === void 0 ? {} : e;
  us() || de(!1);
  let { basename: r, navigator: a } = w.useContext(Nt),
    { hash: c, pathname: l, search: h } = xa(t, { relative: i }),
    p = l;
  return (
    r !== "/" && (p = l === "/" ? r : at([r, l])),
    a.createHref({ pathname: p, search: h, hash: c })
  );
}
function us() {
  return w.useContext(Gs) != null;
}
function Rt() {
  return (us() || de(!1), w.useContext(Gs).location);
}
function ga(t) {
  w.useContext(Nt).static || w.useLayoutEffect(t);
}
function Le() {
  let { isDataRoute: t } = w.useContext(Ye);
  return t ? Fl() : wl();
}
function wl() {
  us() || de(!1);
  let t = w.useContext(ti),
    { basename: e, future: i, navigator: r } = w.useContext(Nt),
    { matches: a } = w.useContext(Ye),
    { pathname: c } = Rt(),
    l = JSON.stringify(ua(a, i.v7_relativeSplatPath)),
    h = w.useRef(!1);
  return (
    ga(() => {
      h.current = !0;
    }),
    w.useCallback(
      function (y, j) {
        if ((j === void 0 && (j = {}), !h.current)) return;
        if (typeof y == "number") {
          r.go(y);
          return;
        }
        let N = ma(y, JSON.parse(l), c, j.relative === "path");
        (t == null &&
          e !== "/" &&
          (N.pathname = N.pathname === "/" ? e : at([e, N.pathname])),
          (j.replace ? r.replace : r.push)(N, j.state, j));
      },
      [e, r, l, c, t],
    )
  );
}
const Sl = w.createContext(null);
function El(t) {
  let e = w.useContext(Ye).outlet;
  return e && w.createElement(Sl.Provider, { value: t }, e);
}
function It() {
  let { matches: t } = w.useContext(Ye),
    e = t[t.length - 1];
  return e ? e.params : {};
}
function xa(t, e) {
  let { relative: i } = e === void 0 ? {} : e,
    { future: r } = w.useContext(Nt),
    { matches: a } = w.useContext(Ye),
    { pathname: c } = Rt(),
    l = JSON.stringify(ua(a, r.v7_relativeSplatPath));
  return w.useMemo(() => ma(t, JSON.parse(l), c, i === "path"), [t, l, c, i]);
}
function Cl(t, e) {
  return Tl(t, e);
}
function Tl(t, e, i, r) {
  us() || de(!1);
  let { navigator: a } = w.useContext(Nt),
    { matches: c } = w.useContext(Ye),
    l = c[c.length - 1],
    h = l ? l.params : {};
  l && l.pathname;
  let p = l ? l.pathnameBase : "/";
  l && l.route;
  let y = Rt(),
    j;
  if (e) {
    var N;
    let S = typeof e == "string" ? At(e) : e;
    (p === "/" || ((N = S.pathname) != null && N.startsWith(p)) || de(!1),
      (j = S));
  } else j = y;
  let _ = j.pathname || "/",
    D = _;
  if (p !== "/") {
    let S = p.replace(/^\//, "").split("/");
    D = "/" + _.replace(/^\//, "").split("/").slice(S.length).join("/");
  }
  let E = Qo(t, { pathname: D }),
    T = Ll(
      E &&
        E.map((S) =>
          Object.assign({}, S, {
            params: Object.assign({}, h, S.params),
            pathname: at([
              p,
              a.encodeLocation
                ? a.encodeLocation(S.pathname).pathname
                : S.pathname,
            ]),
            pathnameBase:
              S.pathnameBase === "/"
                ? p
                : at([
                    p,
                    a.encodeLocation
                      ? a.encodeLocation(S.pathnameBase).pathname
                      : S.pathnameBase,
                  ]),
          }),
        ),
      c,
      i,
      r,
    );
  return e && T
    ? w.createElement(
        Gs.Provider,
        {
          value: {
            location: as(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              j,
            ),
            navigationType: it.Pop,
          },
        },
        T,
      )
    : T;
}
function _l() {
  let t = Ol(),
    e = vl(t)
      ? t.status + " " + t.statusText
      : t instanceof Error
        ? t.message
        : JSON.stringify(t),
    i = t instanceof Error ? t.stack : null,
    a = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return w.createElement(
    w.Fragment,
    null,
    w.createElement("h2", null, "Unexpected Application Error!"),
    w.createElement("h3", { style: { fontStyle: "italic" } }, e),
    i ? w.createElement("pre", { style: a }, i) : null,
    null,
  );
}
const Al = w.createElement(_l, null);
class Rl extends w.Component {
  constructor(e) {
    (super(e),
      (this.state = {
        location: e.location,
        revalidation: e.revalidation,
        error: e.error,
      }));
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  static getDerivedStateFromProps(e, i) {
    return i.location !== e.location ||
      (i.revalidation !== "idle" && e.revalidation === "idle")
      ? { error: e.error, location: e.location, revalidation: e.revalidation }
      : {
          error: e.error !== void 0 ? e.error : i.error,
          location: i.location,
          revalidation: e.revalidation || i.revalidation,
        };
  }
  componentDidCatch(e, i) {
    console.error(
      "React Router caught the following error during render",
      e,
      i,
    );
  }
  render() {
    return this.state.error !== void 0
      ? w.createElement(
          Ye.Provider,
          { value: this.props.routeContext },
          w.createElement(pa.Provider, {
            value: this.state.error,
            children: this.props.component,
          }),
        )
      : this.props.children;
  }
}
function Il(t) {
  let { routeContext: e, match: i, children: r } = t,
    a = w.useContext(ti);
  return (
    a &&
      a.static &&
      a.staticContext &&
      (i.route.errorElement || i.route.ErrorBoundary) &&
      (a.staticContext._deepestRenderedBoundaryId = i.route.id),
    w.createElement(Ye.Provider, { value: e }, r)
  );
}
function Ll(t, e, i, r) {
  var a;
  if (
    (e === void 0 && (e = []),
    i === void 0 && (i = null),
    r === void 0 && (r = null),
    t == null)
  ) {
    var c;
    if (!i) return null;
    if (i.errors) t = i.matches;
    else if (
      (c = r) != null &&
      c.v7_partialHydration &&
      e.length === 0 &&
      !i.initialized &&
      i.matches.length > 0
    )
      t = i.matches;
    else return null;
  }
  let l = t,
    h = (a = i) == null ? void 0 : a.errors;
  if (h != null) {
    let j = l.findIndex(
      (N) => N.route.id && (h == null ? void 0 : h[N.route.id]) !== void 0,
    );
    (j >= 0 || de(!1), (l = l.slice(0, Math.min(l.length, j + 1))));
  }
  let p = !1,
    y = -1;
  if (i && r && r.v7_partialHydration)
    for (let j = 0; j < l.length; j++) {
      let N = l[j];
      if (
        ((N.route.HydrateFallback || N.route.hydrateFallbackElement) && (y = j),
        N.route.id)
      ) {
        let { loaderData: _, errors: D } = i,
          E =
            N.route.loader &&
            _[N.route.id] === void 0 &&
            (!D || D[N.route.id] === void 0);
        if (N.route.lazy || E) {
          ((p = !0), y >= 0 ? (l = l.slice(0, y + 1)) : (l = [l[0]]));
          break;
        }
      }
    }
  return l.reduceRight((j, N, _) => {
    let D,
      E = !1,
      T = null,
      S = null;
    i &&
      ((D = h && N.route.id ? h[N.route.id] : void 0),
      (T = N.route.errorElement || Al),
      p &&
        (y < 0 && _ === 0
          ? (Ml("route-fallback"), (E = !0), (S = null))
          : y === _ &&
            ((E = !0), (S = N.route.hydrateFallbackElement || null))));
    let R = e.concat(l.slice(0, _ + 1)),
      O = () => {
        let L;
        return (
          D
            ? (L = T)
            : E
              ? (L = S)
              : N.route.Component
                ? (L = w.createElement(N.route.Component, null))
                : N.route.element
                  ? (L = N.route.element)
                  : (L = j),
          w.createElement(Il, {
            match: N,
            routeContext: { outlet: j, matches: R, isDataRoute: i != null },
            children: L,
          })
        );
      };
    return i && (N.route.ErrorBoundary || N.route.errorElement || _ === 0)
      ? w.createElement(Rl, {
          location: i.location,
          revalidation: i.revalidation,
          component: T,
          error: D,
          children: O(),
          routeContext: { outlet: null, matches: R, isDataRoute: !0 },
        })
      : O();
  }, null);
}
var ya = (function (t) {
    return (
      (t.UseBlocker = "useBlocker"),
      (t.UseRevalidator = "useRevalidator"),
      (t.UseNavigateStable = "useNavigate"),
      t
    );
  })(ya || {}),
  va = (function (t) {
    return (
      (t.UseBlocker = "useBlocker"),
      (t.UseLoaderData = "useLoaderData"),
      (t.UseActionData = "useActionData"),
      (t.UseRouteError = "useRouteError"),
      (t.UseNavigation = "useNavigation"),
      (t.UseRouteLoaderData = "useRouteLoaderData"),
      (t.UseMatches = "useMatches"),
      (t.UseRevalidator = "useRevalidator"),
      (t.UseNavigateStable = "useNavigate"),
      (t.UseRouteId = "useRouteId"),
      t
    );
  })(va || {});
function Pl(t) {
  let e = w.useContext(ti);
  return (e || de(!1), e);
}
function kl(t) {
  let e = w.useContext(jl);
  return (e || de(!1), e);
}
function Dl(t) {
  let e = w.useContext(Ye);
  return (e || de(!1), e);
}
function ba(t) {
  let e = Dl(),
    i = e.matches[e.matches.length - 1];
  return (i.route.id || de(!1), i.route.id);
}
function Ol() {
  var t;
  let e = w.useContext(pa),
    i = kl(),
    r = ba();
  return e !== void 0 ? e : (t = i.errors) == null ? void 0 : t[r];
}
function Fl() {
  let { router: t } = Pl(ya.UseNavigateStable),
    e = ba(va.UseNavigateStable),
    i = w.useRef(!1);
  return (
    ga(() => {
      i.current = !0;
    }),
    w.useCallback(
      function (a, c) {
        (c === void 0 && (c = {}),
          i.current &&
            (typeof a == "number"
              ? t.navigate(a)
              : t.navigate(a, as({ fromRouteId: e }, c))));
      },
      [t, e],
    )
  );
}
const hr = {};
function Ml(t, e, i) {
  hr[t] || (hr[t] = !0);
}
function Bl(t, e) {
  (t == null || t.v7_startTransition, t == null || t.v7_relativeSplatPath);
}
function Ul(t) {
  return El(t.context);
}
function ne(t) {
  de(!1);
}
function Vl(t) {
  let {
    basename: e = "/",
    children: i = null,
    location: r,
    navigationType: a = it.Pop,
    navigator: c,
    static: l = !1,
    future: h,
  } = t;
  us() && de(!1);
  let p = e.replace(/^\/*/, "/"),
    y = w.useMemo(
      () => ({
        basename: p,
        navigator: c,
        static: l,
        future: as({ v7_relativeSplatPath: !1 }, h),
      }),
      [p, h, c, l],
    );
  typeof r == "string" && (r = At(r));
  let {
      pathname: j = "/",
      search: N = "",
      hash: _ = "",
      state: D = null,
      key: E = "default",
    } = r,
    T = w.useMemo(() => {
      let S = ei(j, p);
      return S == null
        ? null
        : {
            location: { pathname: S, search: N, hash: _, state: D, key: E },
            navigationType: a,
          };
    }, [p, j, N, _, D, E, a]);
  return T == null
    ? null
    : w.createElement(
        Nt.Provider,
        { value: y },
        w.createElement(Gs.Provider, { children: i, value: T }),
      );
}
function $l(t) {
  let { children: e, location: i } = t;
  return Cl(Bn(e), i);
}
new Promise(() => {});
function Bn(t, e) {
  e === void 0 && (e = []);
  let i = [];
  return (
    w.Children.forEach(t, (r, a) => {
      if (!w.isValidElement(r)) return;
      let c = [...e, a];
      if (r.type === w.Fragment) {
        i.push.apply(i, Bn(r.props.children, c));
        return;
      }
      (r.type !== ne && de(!1), !r.props.index || !r.props.children || de(!1));
      let l = {
        id: r.props.id || c.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.ErrorBoundary != null || r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      (r.props.children && (l.children = Bn(r.props.children, c)), i.push(l));
    }),
    i
  );
}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Un() {
  return (
    (Un = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var r in i)
              Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]);
          }
          return t;
        }),
    Un.apply(this, arguments)
  );
}
function Hl(t, e) {
  if (t == null) return {};
  var i = {},
    r = Object.keys(t),
    a,
    c;
  for (c = 0; c < r.length; c++)
    ((a = r[c]), !(e.indexOf(a) >= 0) && (i[a] = t[a]));
  return i;
}
function zl(t) {
  return !!(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey);
}
function Wl(t, e) {
  return t.button === 0 && (!e || e === "_self") && !zl(t);
}
function Vn(t) {
  return (
    t === void 0 && (t = ""),
    new URLSearchParams(
      typeof t == "string" || Array.isArray(t) || t instanceof URLSearchParams
        ? t
        : Object.keys(t).reduce((e, i) => {
            let r = t[i];
            return e.concat(Array.isArray(r) ? r.map((a) => [i, a]) : [[i, r]]);
          }, []),
    )
  );
}
function ql(t, e) {
  let i = Vn(t);
  return (
    e &&
      e.forEach((r, a) => {
        i.has(a) ||
          e.getAll(a).forEach((c) => {
            i.append(a, c);
          });
      }),
    i
  );
}
const Gl = [
    "onClick",
    "relative",
    "reloadDocument",
    "replace",
    "state",
    "target",
    "to",
    "preventScrollReset",
    "viewTransition",
  ],
  Jl = "6";
try {
  window.__reactRouterVersion = Jl;
} catch {}
const Kl = "startTransition",
  ur = Go[Kl];
function Xl(t) {
  let { basename: e, children: i, future: r, window: a } = t,
    c = w.useRef();
  c.current == null && (c.current = Ko({ window: a, v5Compat: !0 }));
  let l = c.current,
    [h, p] = w.useState({ action: l.action, location: l.location }),
    { v7_startTransition: y } = r || {},
    j = w.useCallback(
      (N) => {
        y && ur ? ur(() => p(N)) : p(N);
      },
      [p, y],
    );
  return (
    w.useLayoutEffect(() => l.listen(j), [l, j]),
    w.useEffect(() => Bl(r), [r]),
    w.createElement(Vl, {
      basename: e,
      children: i,
      location: h.location,
      navigationType: h.action,
      navigator: l,
      future: r,
    })
  );
}
const Yl =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  Ql = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  q = w.forwardRef(function (e, i) {
    let {
        onClick: r,
        relative: a,
        reloadDocument: c,
        replace: l,
        state: h,
        target: p,
        to: y,
        preventScrollReset: j,
        viewTransition: N,
      } = e,
      _ = Hl(e, Gl),
      { basename: D } = w.useContext(Nt),
      E,
      T = !1;
    if (typeof y == "string" && Ql.test(y) && ((E = y), Yl))
      try {
        let L = new URL(window.location.href),
          A = y.startsWith("//") ? new URL(L.protocol + y) : new URL(y),
          F = ei(A.pathname, D);
        A.origin === L.origin && F != null
          ? (y = F + A.search + A.hash)
          : (T = !0);
      } catch {}
    let S = Nl(y, { relative: a }),
      R = Zl(y, {
        replace: l,
        state: h,
        target: p,
        preventScrollReset: j,
        relative: a,
        viewTransition: N,
      });
    function O(L) {
      (r && r(L), L.defaultPrevented || R(L));
    }
    return w.createElement(
      "a",
      Un({}, _, { href: E || S, onClick: T || c ? r : O, ref: i, target: p }),
    );
  });
var mr;
(function (t) {
  ((t.UseScrollRestoration = "useScrollRestoration"),
    (t.UseSubmit = "useSubmit"),
    (t.UseSubmitFetcher = "useSubmitFetcher"),
    (t.UseFetcher = "useFetcher"),
    (t.useViewTransitionState = "useViewTransitionState"));
})(mr || (mr = {}));
var fr;
(function (t) {
  ((t.UseFetcher = "useFetcher"),
    (t.UseFetchers = "useFetchers"),
    (t.UseScrollRestoration = "useScrollRestoration"));
})(fr || (fr = {}));
function Zl(t, e) {
  let {
      target: i,
      replace: r,
      state: a,
      preventScrollReset: c,
      relative: l,
      viewTransition: h,
    } = e === void 0 ? {} : e,
    p = Le(),
    y = Rt(),
    j = xa(t, { relative: l });
  return w.useCallback(
    (N) => {
      if (Wl(N, i)) {
        N.preventDefault();
        let _ = r !== void 0 ? r : Ms(y) === Ms(j);
        p(t, {
          replace: _,
          state: a,
          preventScrollReset: c,
          relative: l,
          viewTransition: h,
        });
      }
    },
    [y, p, j, r, a, i, t, c, l, h],
  );
}
function ec(t) {
  let e = w.useRef(Vn(t)),
    i = w.useRef(!1),
    r = Rt(),
    a = w.useMemo(() => ql(r.search, i.current ? null : e.current), [r.search]),
    c = Le(),
    l = w.useCallback(
      (h, p) => {
        const y = Vn(typeof h == "function" ? h(a) : h);
        ((i.current = !0), c("?" + y, p));
      },
      [c, a],
    );
  return [a, l];
}
const tc = () =>
  s.jsx("div", {
    className: "themebg",
    children: s.jsxs("footer", {
      id: "footer",
      children: [
        s.jsx("div", {
          className: "footer-top pt-5",
          children: s.jsx("div", {
            className: "container",
            children: s.jsxs("div", {
              className: "row",
              children: [
                s.jsx("div", {
                  className: "col-md-9",
                  children: s.jsxs("div", {
                    className: "footer-info",
                    children: [
                      s.jsxs("div", {
                        className: "row",
                        children: [
                          s.jsxs("div", {
                            className: "col-md-6",
                            children: [
                              s.jsx("h3", { children: "Landhome" }),
                              s.jsx("p", {
                                children:
                                  "We are committed to leveraging technology to remove unnecessary middlemen, reduce costs, and create a level playing field for both seasoned investors and first-time buyers.",
                              }),
                              s.jsxs("p", {
                                children: [
                                  s.jsxs("div", {
                                    className: "fs-5 mb-2",
                                    children: [
                                      s.jsx(la, { className: "icon " }),
                                      " Address",
                                    ],
                                  }),
                                  "Plot 40, Beside Devine Progressive College Gboko West along Gboko college of Education way, Gboko West Benue state, Nigeria.",
                                ],
                              }),
                            ],
                          }),
                          s.jsxs("div", {
                            className: "col-md-6 px-md-5",
                            children: [
                              s.jsx("h4", { children: "Contacts" }),
                              s.jsxs("div", {
                                onClick: () => {
                                  navigator.clipboard.writeText(
                                    "+234 906 791 2440",
                                  );
                                },
                                children: [
                                  s.jsx("div", { children: "Phone:" }),
                                  "+234 906 791 2440",
                                ],
                              }),
                              s.jsxs("div", {
                                className: "text-light mt-3",
                                children: [
                                  s.jsx("div", { children: "Email:" }),
                                  s.jsx("a", {
                                    href: "mailto:sirgbemziho@gmail.com",
                                    children: "sirgbemziho@gmail.com",
                                  }),
                                  s.jsx("br", {}),
                                  s.jsx("a", {
                                    href: "mailto:sirgbemziho@gmail.com",
                                    children: "sirgbemziho@gmail.com",
                                  }),
                                ],
                              }),
                              s.jsx("br", {}),
                            ],
                          }),
                        ],
                      }),
                      s.jsx("div", {
                        className: "social-links mt-3",
                        children: "/... /",
                      }),
                    ],
                  }),
                }),
                s.jsxs("div", {
                  className: "col-md-3 text-light",
                  children: [
                    s.jsx("h4", { children: "Quick Links" }),
                    s.jsx(q, {
                      to: "/search",
                      className: "d-block",
                      style: { textDecoration: "underline" },
                      children: "Search for Housing & Land",
                    }),
                    s.jsx(q, {
                      to: "/about-us",
                      className: "d-block",
                      style: { textDecoration: "underline" },
                      children: "About Us",
                    }),
                    s.jsx(q, {
                      to: "/contact-us",
                      className: "d-block",
                      style: { textDecoration: "underline" },
                      children: "Contact Us",
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
        s.jsx("div", {
          className: "container",
          children: s.jsxs("div", {
            className: "copyright text-center mt-5",
            children: [
              "© Copyright",
              " ",
              s.jsx("strong", {
                children: s.jsxs("span", {
                  children: ["Landsmart ", new Date().getFullYear(), " "],
                }),
              }),
              "in collaboration with",
              " ",
              s.jsx("strong", {
                children: s.jsx("a", {
                  className: "text-light",
                  href: "https://sprintet.onrender.com/about",
                  children: "SprintET",
                }),
              }),
              ". All Rights Reserved",
            ],
          }),
        }),
        s.jsxs("div", {
          className: "credits container text-center",
          children: [
            "Designed by and developed by",
            " ",
            s.jsx("a", {
              className: "text-light",
              href: "https://github.com/msugh623",
              children: "Ernest Chia",
            }),
          ],
        }),
      ],
    }),
  });
function ja(t) {
  return fe({
    attr: { fill: "currentColor", viewBox: "0 0 16 16" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 9.671V4.697l-5.803 3.546.338.208A4.5 4.5 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671",
        },
        child: [],
      },
      {
        tag: "path",
        attr: {
          d: "M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791",
        },
        child: [],
      },
    ],
  })(t);
}
function Na(t, e) {
  return function () {
    return t.apply(e, arguments);
  };
}
const { toString: sc } = Object.prototype,
  { getPrototypeOf: si } = Object,
  { iterator: Js, toStringTag: wa } = Symbol,
  Ks = ((t) => (e) => {
    const i = sc.call(e);
    return t[i] || (t[i] = i.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Me = (t) => ((t = t.toLowerCase()), (e) => Ks(e) === t),
  Xs = (t) => (e) => typeof e === t,
  { isArray: Lt } = Array,
  _t = Xs("undefined");
function ms(t) {
  return (
    t !== null &&
    !_t(t) &&
    t.constructor !== null &&
    !_t(t.constructor) &&
    Ee(t.constructor.isBuffer) &&
    t.constructor.isBuffer(t)
  );
}
const Sa = Me("ArrayBuffer");
function nc(t) {
  let e;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (e = ArrayBuffer.isView(t))
      : (e = t && t.buffer && Sa(t.buffer)),
    e
  );
}
const ic = Xs("string"),
  Ee = Xs("function"),
  Ea = Xs("number"),
  fs = (t) => t !== null && typeof t == "object",
  rc = (t) => t === !0 || t === !1,
  Ls = (t) => {
    if (Ks(t) !== "object") return !1;
    const e = si(t);
    return (
      (e === null ||
        e === Object.prototype ||
        Object.getPrototypeOf(e) === null) &&
      !(wa in t) &&
      !(Js in t)
    );
  },
  ac = (t) => {
    if (!fs(t) || ms(t)) return !1;
    try {
      return (
        Object.keys(t).length === 0 &&
        Object.getPrototypeOf(t) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  oc = Me("Date"),
  lc = Me("File"),
  cc = Me("Blob"),
  dc = Me("FileList"),
  hc = (t) => fs(t) && Ee(t.pipe),
  uc = (t) => {
    let e;
    return (
      t &&
      ((typeof FormData == "function" && t instanceof FormData) ||
        (Ee(t.append) &&
          ((e = Ks(t)) === "formdata" ||
            (e === "object" &&
              Ee(t.toString) &&
              t.toString() === "[object FormData]"))))
    );
  },
  mc = Me("URLSearchParams"),
  [fc, pc, gc, xc] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Me,
  ),
  yc = (t) =>
    t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ps(t, e, { allOwnKeys: i = !1 } = {}) {
  if (t === null || typeof t > "u") return;
  let r, a;
  if ((typeof t != "object" && (t = [t]), Lt(t)))
    for (r = 0, a = t.length; r < a; r++) e.call(null, t[r], r, t);
  else {
    if (ms(t)) return;
    const c = i ? Object.getOwnPropertyNames(t) : Object.keys(t),
      l = c.length;
    let h;
    for (r = 0; r < l; r++) ((h = c[r]), e.call(null, t[h], h, t));
  }
}
function Ca(t, e) {
  if (ms(t)) return null;
  e = e.toLowerCase();
  const i = Object.keys(t);
  let r = i.length,
    a;
  for (; r-- > 0; ) if (((a = i[r]), e === a.toLowerCase())) return a;
  return null;
}
const ft =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : global,
  Ta = (t) => !_t(t) && t !== ft;
function $n() {
  const { caseless: t, skipUndefined: e } = (Ta(this) && this) || {},
    i = {},
    r = (a, c) => {
      const l = (t && Ca(i, c)) || c;
      Ls(i[l]) && Ls(a)
        ? (i[l] = $n(i[l], a))
        : Ls(a)
          ? (i[l] = $n({}, a))
          : Lt(a)
            ? (i[l] = a.slice())
            : (!e || !_t(a)) && (i[l] = a);
    };
  for (let a = 0, c = arguments.length; a < c; a++)
    arguments[a] && ps(arguments[a], r);
  return i;
}
const vc = (t, e, i, { allOwnKeys: r } = {}) => (
    ps(
      e,
      (a, c) => {
        i && Ee(a) ? (t[c] = Na(a, i)) : (t[c] = a);
      },
      { allOwnKeys: r },
    ),
    t
  ),
  bc = (t) => (t.charCodeAt(0) === 65279 && (t = t.slice(1)), t),
  jc = (t, e, i, r) => {
    ((t.prototype = Object.create(e.prototype, r)),
      (t.prototype.constructor = t),
      Object.defineProperty(t, "super", { value: e.prototype }),
      i && Object.assign(t.prototype, i));
  },
  Nc = (t, e, i, r) => {
    let a, c, l;
    const h = {};
    if (((e = e || {}), t == null)) return e;
    do {
      for (a = Object.getOwnPropertyNames(t), c = a.length; c-- > 0; )
        ((l = a[c]),
          (!r || r(l, t, e)) && !h[l] && ((e[l] = t[l]), (h[l] = !0)));
      t = i !== !1 && si(t);
    } while (t && (!i || i(t, e)) && t !== Object.prototype);
    return e;
  },
  wc = (t, e, i) => {
    ((t = String(t)),
      (i === void 0 || i > t.length) && (i = t.length),
      (i -= e.length));
    const r = t.indexOf(e, i);
    return r !== -1 && r === i;
  },
  Sc = (t) => {
    if (!t) return null;
    if (Lt(t)) return t;
    let e = t.length;
    if (!Ea(e)) return null;
    const i = new Array(e);
    for (; e-- > 0; ) i[e] = t[e];
    return i;
  },
  Ec = (
    (t) => (e) =>
      t && e instanceof t
  )(typeof Uint8Array < "u" && si(Uint8Array)),
  Cc = (t, e) => {
    const r = (t && t[Js]).call(t);
    let a;
    for (; (a = r.next()) && !a.done; ) {
      const c = a.value;
      e.call(t, c[0], c[1]);
    }
  },
  Tc = (t, e) => {
    let i;
    const r = [];
    for (; (i = t.exec(e)) !== null; ) r.push(i);
    return r;
  },
  _c = Me("HTMLFormElement"),
  Ac = (t) =>
    t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (i, r, a) {
      return r.toUpperCase() + a;
    }),
  pr = (
    ({ hasOwnProperty: t }) =>
    (e, i) =>
      t.call(e, i)
  )(Object.prototype),
  Rc = Me("RegExp"),
  _a = (t, e) => {
    const i = Object.getOwnPropertyDescriptors(t),
      r = {};
    (ps(i, (a, c) => {
      let l;
      (l = e(a, c, t)) !== !1 && (r[c] = l || a);
    }),
      Object.defineProperties(t, r));
  },
  Ic = (t) => {
    _a(t, (e, i) => {
      if (Ee(t) && ["arguments", "caller", "callee"].indexOf(i) !== -1)
        return !1;
      const r = t[i];
      if (Ee(r)) {
        if (((e.enumerable = !1), "writable" in e)) {
          e.writable = !1;
          return;
        }
        e.set ||
          (e.set = () => {
            throw Error("Can not rewrite read-only method '" + i + "'");
          });
      }
    });
  },
  Lc = (t, e) => {
    const i = {},
      r = (a) => {
        a.forEach((c) => {
          i[c] = !0;
        });
      };
    return (Lt(t) ? r(t) : r(String(t).split(e)), i);
  },
  Pc = () => {},
  kc = (t, e) => (t != null && Number.isFinite((t = +t)) ? t : e);
function Dc(t) {
  return !!(t && Ee(t.append) && t[wa] === "FormData" && t[Js]);
}
const Oc = (t) => {
    const e = new Array(10),
      i = (r, a) => {
        if (fs(r)) {
          if (e.indexOf(r) >= 0) return;
          if (ms(r)) return r;
          if (!("toJSON" in r)) {
            e[a] = r;
            const c = Lt(r) ? [] : {};
            return (
              ps(r, (l, h) => {
                const p = i(l, a + 1);
                !_t(p) && (c[h] = p);
              }),
              (e[a] = void 0),
              c
            );
          }
        }
        return r;
      };
    return i(t, 0);
  },
  Fc = Me("AsyncFunction"),
  Mc = (t) => t && (fs(t) || Ee(t)) && Ee(t.then) && Ee(t.catch),
  Aa = ((t, e) =>
    t
      ? setImmediate
      : e
        ? ((i, r) => (
            ft.addEventListener(
              "message",
              ({ source: a, data: c }) => {
                a === ft && c === i && r.length && r.shift()();
              },
              !1,
            ),
            (a) => {
              (r.push(a), ft.postMessage(i, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (i) => setTimeout(i))(
    typeof setImmediate == "function",
    Ee(ft.postMessage),
  ),
  Bc =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(ft)
      : (typeof process < "u" && process.nextTick) || Aa,
  Uc = (t) => t != null && Ee(t[Js]),
  P = {
    isArray: Lt,
    isArrayBuffer: Sa,
    isBuffer: ms,
    isFormData: uc,
    isArrayBufferView: nc,
    isString: ic,
    isNumber: Ea,
    isBoolean: rc,
    isObject: fs,
    isPlainObject: Ls,
    isEmptyObject: ac,
    isReadableStream: fc,
    isRequest: pc,
    isResponse: gc,
    isHeaders: xc,
    isUndefined: _t,
    isDate: oc,
    isFile: lc,
    isBlob: cc,
    isRegExp: Rc,
    isFunction: Ee,
    isStream: hc,
    isURLSearchParams: mc,
    isTypedArray: Ec,
    isFileList: dc,
    forEach: ps,
    merge: $n,
    extend: vc,
    trim: yc,
    stripBOM: bc,
    inherits: jc,
    toFlatObject: Nc,
    kindOf: Ks,
    kindOfTest: Me,
    endsWith: wc,
    toArray: Sc,
    forEachEntry: Cc,
    matchAll: Tc,
    isHTMLForm: _c,
    hasOwnProperty: pr,
    hasOwnProp: pr,
    reduceDescriptors: _a,
    freezeMethods: Ic,
    toObjectSet: Lc,
    toCamelCase: Ac,
    noop: Pc,
    toFiniteNumber: kc,
    findKey: Ca,
    global: ft,
    isContextDefined: Ta,
    isSpecCompliantForm: Dc,
    toJSONObject: Oc,
    isAsyncFn: Fc,
    isThenable: Mc,
    setImmediate: Aa,
    asap: Bc,
    isIterable: Uc,
  };
function H(t, e, i, r, a) {
  (Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = t),
    (this.name = "AxiosError"),
    e && (this.code = e),
    i && (this.config = i),
    r && (this.request = r),
    a && ((this.response = a), (this.status = a.status ? a.status : null)));
}
P.inherits(H, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: P.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const Ra = H.prototype,
  Ia = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((t) => {
  Ia[t] = { value: t };
});
Object.defineProperties(H, Ia);
Object.defineProperty(Ra, "isAxiosError", { value: !0 });
H.from = (t, e, i, r, a, c) => {
  const l = Object.create(Ra);
  P.toFlatObject(
    t,
    l,
    function (j) {
      return j !== Error.prototype;
    },
    (y) => y !== "isAxiosError",
  );
  const h = t && t.message ? t.message : "Error",
    p = e == null && t ? t.code : e;
  return (
    H.call(l, h, p, i, r, a),
    t &&
      l.cause == null &&
      Object.defineProperty(l, "cause", { value: t, configurable: !0 }),
    (l.name = (t && t.name) || "Error"),
    c && Object.assign(l, c),
    l
  );
};
const Vc = null;
function Hn(t) {
  return P.isPlainObject(t) || P.isArray(t);
}
function La(t) {
  return P.endsWith(t, "[]") ? t.slice(0, -2) : t;
}
function gr(t, e, i) {
  return t
    ? t
        .concat(e)
        .map(function (a, c) {
          return ((a = La(a)), !i && c ? "[" + a + "]" : a);
        })
        .join(i ? "." : "")
    : e;
}
function $c(t) {
  return P.isArray(t) && !t.some(Hn);
}
const Hc = P.toFlatObject(P, {}, null, function (e) {
  return /^is[A-Z]/.test(e);
});
function Ys(t, e, i) {
  if (!P.isObject(t)) throw new TypeError("target must be an object");
  ((e = e || new FormData()),
    (i = P.toFlatObject(
      i,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (T, S) {
        return !P.isUndefined(S[T]);
      },
    )));
  const r = i.metaTokens,
    a = i.visitor || j,
    c = i.dots,
    l = i.indexes,
    p = (i.Blob || (typeof Blob < "u" && Blob)) && P.isSpecCompliantForm(e);
  if (!P.isFunction(a)) throw new TypeError("visitor must be a function");
  function y(E) {
    if (E === null) return "";
    if (P.isDate(E)) return E.toISOString();
    if (P.isBoolean(E)) return E.toString();
    if (!p && P.isBlob(E))
      throw new H("Blob is not supported. Use a Buffer instead.");
    return P.isArrayBuffer(E) || P.isTypedArray(E)
      ? p && typeof Blob == "function"
        ? new Blob([E])
        : Buffer.from(E)
      : E;
  }
  function j(E, T, S) {
    let R = E;
    if (E && !S && typeof E == "object") {
      if (P.endsWith(T, "{}"))
        ((T = r ? T : T.slice(0, -2)), (E = JSON.stringify(E)));
      else if (
        (P.isArray(E) && $c(E)) ||
        ((P.isFileList(E) || P.endsWith(T, "[]")) && (R = P.toArray(E)))
      )
        return (
          (T = La(T)),
          R.forEach(function (L, A) {
            !(P.isUndefined(L) || L === null) &&
              e.append(
                l === !0 ? gr([T], A, c) : l === null ? T : T + "[]",
                y(L),
              );
          }),
          !1
        );
    }
    return Hn(E) ? !0 : (e.append(gr(S, T, c), y(E)), !1);
  }
  const N = [],
    _ = Object.assign(Hc, {
      defaultVisitor: j,
      convertValue: y,
      isVisitable: Hn,
    });
  function D(E, T) {
    if (!P.isUndefined(E)) {
      if (N.indexOf(E) !== -1)
        throw Error("Circular reference detected in " + T.join("."));
      (N.push(E),
        P.forEach(E, function (R, O) {
          (!(P.isUndefined(R) || R === null) &&
            a.call(e, R, P.isString(O) ? O.trim() : O, T, _)) === !0 &&
            D(R, T ? T.concat(O) : [O]);
        }),
        N.pop());
    }
  }
  if (!P.isObject(t)) throw new TypeError("data must be an object");
  return (D(t), e);
}
function xr(t) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function (r) {
    return e[r];
  });
}
function ni(t, e) {
  ((this._pairs = []), t && Ys(t, this, e));
}
const Pa = ni.prototype;
Pa.append = function (e, i) {
  this._pairs.push([e, i]);
};
Pa.toString = function (e) {
  const i = e
    ? function (r) {
        return e.call(this, r, xr);
      }
    : xr;
  return this._pairs
    .map(function (a) {
      return i(a[0]) + "=" + i(a[1]);
    }, "")
    .join("&");
};
function zc(t) {
  return encodeURIComponent(t)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function ka(t, e, i) {
  if (!e) return t;
  const r = (i && i.encode) || zc;
  P.isFunction(i) && (i = { serialize: i });
  const a = i && i.serialize;
  let c;
  if (
    (a
      ? (c = a(e, i))
      : (c = P.isURLSearchParams(e) ? e.toString() : new ni(e, i).toString(r)),
    c)
  ) {
    const l = t.indexOf("#");
    (l !== -1 && (t = t.slice(0, l)),
      (t += (t.indexOf("?") === -1 ? "?" : "&") + c));
  }
  return t;
}
class yr {
  constructor() {
    this.handlers = [];
  }
  use(e, i, r) {
    return (
      this.handlers.push({
        fulfilled: e,
        rejected: i,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(e) {
    P.forEach(this.handlers, function (r) {
      r !== null && e(r);
    });
  }
}
const Da = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  Wc = typeof URLSearchParams < "u" ? URLSearchParams : ni,
  qc = typeof FormData < "u" ? FormData : null,
  Gc = typeof Blob < "u" ? Blob : null,
  Jc = {
    isBrowser: !0,
    classes: { URLSearchParams: Wc, FormData: qc, Blob: Gc },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  ii = typeof window < "u" && typeof document < "u",
  zn = (typeof navigator == "object" && navigator) || void 0,
  Kc =
    ii &&
    (!zn || ["ReactNative", "NativeScript", "NS"].indexOf(zn.product) < 0),
  Xc =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  Yc = (ii && window.location.href) || "http://localhost",
  Qc = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: ii,
        hasStandardBrowserEnv: Kc,
        hasStandardBrowserWebWorkerEnv: Xc,
        navigator: zn,
        origin: Yc,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  ve = { ...Qc, ...Jc };
function Zc(t, e) {
  return Ys(t, new ve.classes.URLSearchParams(), {
    visitor: function (i, r, a, c) {
      return ve.isNode && P.isBuffer(i)
        ? (this.append(r, i.toString("base64")), !1)
        : c.defaultVisitor.apply(this, arguments);
    },
    ...e,
  });
}
function ed(t) {
  return P.matchAll(/\w+|\[(\w*)]/g, t).map((e) =>
    e[0] === "[]" ? "" : e[1] || e[0],
  );
}
function td(t) {
  const e = {},
    i = Object.keys(t);
  let r;
  const a = i.length;
  let c;
  for (r = 0; r < a; r++) ((c = i[r]), (e[c] = t[c]));
  return e;
}
function Oa(t) {
  function e(i, r, a, c) {
    let l = i[c++];
    if (l === "__proto__") return !0;
    const h = Number.isFinite(+l),
      p = c >= i.length;
    return (
      (l = !l && P.isArray(a) ? a.length : l),
      p
        ? (P.hasOwnProp(a, l) ? (a[l] = [a[l], r]) : (a[l] = r), !h)
        : ((!a[l] || !P.isObject(a[l])) && (a[l] = []),
          e(i, r, a[l], c) && P.isArray(a[l]) && (a[l] = td(a[l])),
          !h)
    );
  }
  if (P.isFormData(t) && P.isFunction(t.entries)) {
    const i = {};
    return (
      P.forEachEntry(t, (r, a) => {
        e(ed(r), a, i, 0);
      }),
      i
    );
  }
  return null;
}
function sd(t, e, i) {
  if (P.isString(t))
    try {
      return ((e || JSON.parse)(t), P.trim(t));
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (i || JSON.stringify)(t);
}
const gs = {
  transitional: Da,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (e, i) {
      const r = i.getContentType() || "",
        a = r.indexOf("application/json") > -1,
        c = P.isObject(e);
      if ((c && P.isHTMLForm(e) && (e = new FormData(e)), P.isFormData(e)))
        return a ? JSON.stringify(Oa(e)) : e;
      if (
        P.isArrayBuffer(e) ||
        P.isBuffer(e) ||
        P.isStream(e) ||
        P.isFile(e) ||
        P.isBlob(e) ||
        P.isReadableStream(e)
      )
        return e;
      if (P.isArrayBufferView(e)) return e.buffer;
      if (P.isURLSearchParams(e))
        return (
          i.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          e.toString()
        );
      let h;
      if (c) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return Zc(e, this.formSerializer).toString();
        if ((h = P.isFileList(e)) || r.indexOf("multipart/form-data") > -1) {
          const p = this.env && this.env.FormData;
          return Ys(
            h ? { "files[]": e } : e,
            p && new p(),
            this.formSerializer,
          );
        }
      }
      return c || a ? (i.setContentType("application/json", !1), sd(e)) : e;
    },
  ],
  transformResponse: [
    function (e) {
      const i = this.transitional || gs.transitional,
        r = i && i.forcedJSONParsing,
        a = this.responseType === "json";
      if (P.isResponse(e) || P.isReadableStream(e)) return e;
      if (e && P.isString(e) && ((r && !this.responseType) || a)) {
        const l = !(i && i.silentJSONParsing) && a;
        try {
          return JSON.parse(e, this.parseReviver);
        } catch (h) {
          if (l)
            throw h.name === "SyntaxError"
              ? H.from(h, H.ERR_BAD_RESPONSE, this, null, this.response)
              : h;
        }
      }
      return e;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: ve.classes.FormData, Blob: ve.classes.Blob },
  validateStatus: function (e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
P.forEach(["delete", "get", "head", "post", "put", "patch"], (t) => {
  gs.headers[t] = {};
});
const nd = P.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  id = (t) => {
    const e = {};
    let i, r, a;
    return (
      t &&
        t
          .split(
            `
`,
          )
          .forEach(function (l) {
            ((a = l.indexOf(":")),
              (i = l.substring(0, a).trim().toLowerCase()),
              (r = l.substring(a + 1).trim()),
              !(!i || (e[i] && nd[i])) &&
                (i === "set-cookie"
                  ? e[i]
                    ? e[i].push(r)
                    : (e[i] = [r])
                  : (e[i] = e[i] ? e[i] + ", " + r : r)));
          }),
      e
    );
  },
  vr = Symbol("internals");
function Qt(t) {
  return t && String(t).trim().toLowerCase();
}
function Ps(t) {
  return t === !1 || t == null ? t : P.isArray(t) ? t.map(Ps) : String(t);
}
function rd(t) {
  const e = Object.create(null),
    i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = i.exec(t)); ) e[r[1]] = r[2];
  return e;
}
const ad = (t) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());
function Cn(t, e, i, r, a) {
  if (P.isFunction(r)) return r.call(this, e, i);
  if ((a && (e = i), !!P.isString(e))) {
    if (P.isString(r)) return e.indexOf(r) !== -1;
    if (P.isRegExp(r)) return r.test(e);
  }
}
function od(t) {
  return t
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (e, i, r) => i.toUpperCase() + r);
}
function ld(t, e) {
  const i = P.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(t, r + i, {
      value: function (a, c, l) {
        return this[r].call(this, e, a, c, l);
      },
      configurable: !0,
    });
  });
}
let Ce = class {
  constructor(e) {
    e && this.set(e);
  }
  set(e, i, r) {
    const a = this;
    function c(h, p, y) {
      const j = Qt(p);
      if (!j) throw new Error("header name must be a non-empty string");
      const N = P.findKey(a, j);
      (!N || a[N] === void 0 || y === !0 || (y === void 0 && a[N] !== !1)) &&
        (a[N || p] = Ps(h));
    }
    const l = (h, p) => P.forEach(h, (y, j) => c(y, j, p));
    if (P.isPlainObject(e) || e instanceof this.constructor) l(e, i);
    else if (P.isString(e) && (e = e.trim()) && !ad(e)) l(id(e), i);
    else if (P.isObject(e) && P.isIterable(e)) {
      let h = {},
        p,
        y;
      for (const j of e) {
        if (!P.isArray(j))
          throw TypeError("Object iterator must return a key-value pair");
        h[(y = j[0])] = (p = h[y])
          ? P.isArray(p)
            ? [...p, j[1]]
            : [p, j[1]]
          : j[1];
      }
      l(h, i);
    } else e != null && c(i, e, r);
    return this;
  }
  get(e, i) {
    if (((e = Qt(e)), e)) {
      const r = P.findKey(this, e);
      if (r) {
        const a = this[r];
        if (!i) return a;
        if (i === !0) return rd(a);
        if (P.isFunction(i)) return i.call(this, a, r);
        if (P.isRegExp(i)) return i.exec(a);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, i) {
    if (((e = Qt(e)), e)) {
      const r = P.findKey(this, e);
      return !!(r && this[r] !== void 0 && (!i || Cn(this, this[r], r, i)));
    }
    return !1;
  }
  delete(e, i) {
    const r = this;
    let a = !1;
    function c(l) {
      if (((l = Qt(l)), l)) {
        const h = P.findKey(r, l);
        h && (!i || Cn(r, r[h], h, i)) && (delete r[h], (a = !0));
      }
    }
    return (P.isArray(e) ? e.forEach(c) : c(e), a);
  }
  clear(e) {
    const i = Object.keys(this);
    let r = i.length,
      a = !1;
    for (; r--; ) {
      const c = i[r];
      (!e || Cn(this, this[c], c, e, !0)) && (delete this[c], (a = !0));
    }
    return a;
  }
  normalize(e) {
    const i = this,
      r = {};
    return (
      P.forEach(this, (a, c) => {
        const l = P.findKey(r, c);
        if (l) {
          ((i[l] = Ps(a)), delete i[c]);
          return;
        }
        const h = e ? od(c) : String(c).trim();
        (h !== c && delete i[c], (i[h] = Ps(a)), (r[h] = !0));
      }),
      this
    );
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const i = Object.create(null);
    return (
      P.forEach(this, (r, a) => {
        r != null && r !== !1 && (i[a] = e && P.isArray(r) ? r.join(", ") : r);
      }),
      i
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, i]) => e + ": " + i).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...i) {
    const r = new this(e);
    return (i.forEach((a) => r.set(a)), r);
  }
  static accessor(e) {
    const r = (this[vr] = this[vr] = { accessors: {} }).accessors,
      a = this.prototype;
    function c(l) {
      const h = Qt(l);
      r[h] || (ld(a, l), (r[h] = !0));
    }
    return (P.isArray(e) ? e.forEach(c) : c(e), this);
  }
};
Ce.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
P.reduceDescriptors(Ce.prototype, ({ value: t }, e) => {
  let i = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => t,
    set(r) {
      this[i] = r;
    },
  };
});
P.freezeMethods(Ce);
function Tn(t, e) {
  const i = this || gs,
    r = e || i,
    a = Ce.from(r.headers);
  let c = r.data;
  return (
    P.forEach(t, function (h) {
      c = h.call(i, c, a.normalize(), e ? e.status : void 0);
    }),
    a.normalize(),
    c
  );
}
function Fa(t) {
  return !!(t && t.__CANCEL__);
}
function Pt(t, e, i) {
  (H.call(this, t ?? "canceled", H.ERR_CANCELED, e, i),
    (this.name = "CanceledError"));
}
P.inherits(Pt, H, { __CANCEL__: !0 });
function Ma(t, e, i) {
  const r = i.config.validateStatus;
  !i.status || !r || r(i.status)
    ? t(i)
    : e(
        new H(
          "Request failed with status code " + i.status,
          [H.ERR_BAD_REQUEST, H.ERR_BAD_RESPONSE][
            Math.floor(i.status / 100) - 4
          ],
          i.config,
          i.request,
          i,
        ),
      );
}
function cd(t) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(t);
  return (e && e[1]) || "";
}
function dd(t, e) {
  t = t || 10;
  const i = new Array(t),
    r = new Array(t);
  let a = 0,
    c = 0,
    l;
  return (
    (e = e !== void 0 ? e : 1e3),
    function (p) {
      const y = Date.now(),
        j = r[c];
      (l || (l = y), (i[a] = p), (r[a] = y));
      let N = c,
        _ = 0;
      for (; N !== a; ) ((_ += i[N++]), (N = N % t));
      if (((a = (a + 1) % t), a === c && (c = (c + 1) % t), y - l < e)) return;
      const D = j && y - j;
      return D ? Math.round((_ * 1e3) / D) : void 0;
    }
  );
}
function hd(t, e) {
  let i = 0,
    r = 1e3 / e,
    a,
    c;
  const l = (y, j = Date.now()) => {
    ((i = j), (a = null), c && (clearTimeout(c), (c = null)), t(...y));
  };
  return [
    (...y) => {
      const j = Date.now(),
        N = j - i;
      N >= r
        ? l(y, j)
        : ((a = y),
          c ||
            (c = setTimeout(() => {
              ((c = null), l(a));
            }, r - N)));
    },
    () => a && l(a),
  ];
}
const Bs = (t, e, i = 3) => {
    let r = 0;
    const a = dd(50, 250);
    return hd((c) => {
      const l = c.loaded,
        h = c.lengthComputable ? c.total : void 0,
        p = l - r,
        y = a(p),
        j = l <= h;
      r = l;
      const N = {
        loaded: l,
        total: h,
        progress: h ? l / h : void 0,
        bytes: p,
        rate: y || void 0,
        estimated: y && h && j ? (h - l) / y : void 0,
        event: c,
        lengthComputable: h != null,
        [e ? "download" : "upload"]: !0,
      };
      t(N);
    }, i);
  },
  br = (t, e) => {
    const i = t != null;
    return [(r) => e[0]({ lengthComputable: i, total: t, loaded: r }), e[1]];
  },
  jr =
    (t) =>
    (...e) =>
      P.asap(() => t(...e)),
  ud = ve.hasStandardBrowserEnv
    ? ((t, e) => (i) => (
        (i = new URL(i, ve.origin)),
        t.protocol === i.protocol &&
          t.host === i.host &&
          (e || t.port === i.port)
      ))(
        new URL(ve.origin),
        ve.navigator && /(msie|trident)/i.test(ve.navigator.userAgent),
      )
    : () => !0,
  md = ve.hasStandardBrowserEnv
    ? {
        write(t, e, i, r, a, c) {
          const l = [t + "=" + encodeURIComponent(e)];
          (P.isNumber(i) && l.push("expires=" + new Date(i).toGMTString()),
            P.isString(r) && l.push("path=" + r),
            P.isString(a) && l.push("domain=" + a),
            c === !0 && l.push("secure"),
            (document.cookie = l.join("; ")));
        },
        read(t) {
          const e = document.cookie.match(
            new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"),
          );
          return e ? decodeURIComponent(e[3]) : null;
        },
        remove(t) {
          this.write(t, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function fd(t) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
}
function pd(t, e) {
  return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
}
function Ba(t, e, i) {
  let r = !fd(e);
  return t && (r || i == !1) ? pd(t, e) : e;
}
const Nr = (t) => (t instanceof Ce ? { ...t } : t);
function bt(t, e) {
  e = e || {};
  const i = {};
  function r(y, j, N, _) {
    return P.isPlainObject(y) && P.isPlainObject(j)
      ? P.merge.call({ caseless: _ }, y, j)
      : P.isPlainObject(j)
        ? P.merge({}, j)
        : P.isArray(j)
          ? j.slice()
          : j;
  }
  function a(y, j, N, _) {
    if (P.isUndefined(j)) {
      if (!P.isUndefined(y)) return r(void 0, y, N, _);
    } else return r(y, j, N, _);
  }
  function c(y, j) {
    if (!P.isUndefined(j)) return r(void 0, j);
  }
  function l(y, j) {
    if (P.isUndefined(j)) {
      if (!P.isUndefined(y)) return r(void 0, y);
    } else return r(void 0, j);
  }
  function h(y, j, N) {
    if (N in e) return r(y, j);
    if (N in t) return r(void 0, y);
  }
  const p = {
    url: c,
    method: c,
    data: c,
    baseURL: l,
    transformRequest: l,
    transformResponse: l,
    paramsSerializer: l,
    timeout: l,
    timeoutMessage: l,
    withCredentials: l,
    withXSRFToken: l,
    adapter: l,
    responseType: l,
    xsrfCookieName: l,
    xsrfHeaderName: l,
    onUploadProgress: l,
    onDownloadProgress: l,
    decompress: l,
    maxContentLength: l,
    maxBodyLength: l,
    beforeRedirect: l,
    transport: l,
    httpAgent: l,
    httpsAgent: l,
    cancelToken: l,
    socketPath: l,
    responseEncoding: l,
    validateStatus: h,
    headers: (y, j, N) => a(Nr(y), Nr(j), N, !0),
  };
  return (
    P.forEach(Object.keys({ ...t, ...e }), function (j) {
      const N = p[j] || a,
        _ = N(t[j], e[j], j);
      (P.isUndefined(_) && N !== h) || (i[j] = _);
    }),
    i
  );
}
const Ua = (t) => {
    const e = bt({}, t);
    let {
      data: i,
      withXSRFToken: r,
      xsrfHeaderName: a,
      xsrfCookieName: c,
      headers: l,
      auth: h,
    } = e;
    if (
      ((e.headers = l = Ce.from(l)),
      (e.url = ka(
        Ba(e.baseURL, e.url, e.allowAbsoluteUrls),
        t.params,
        t.paramsSerializer,
      )),
      h &&
        l.set(
          "Authorization",
          "Basic " +
            btoa(
              (h.username || "") +
                ":" +
                (h.password ? unescape(encodeURIComponent(h.password)) : ""),
            ),
        ),
      P.isFormData(i))
    ) {
      if (ve.hasStandardBrowserEnv || ve.hasStandardBrowserWebWorkerEnv)
        l.setContentType(void 0);
      else if (P.isFunction(i.getHeaders)) {
        const p = i.getHeaders(),
          y = ["content-type", "content-length"];
        Object.entries(p).forEach(([j, N]) => {
          y.includes(j.toLowerCase()) && l.set(j, N);
        });
      }
    }
    if (
      ve.hasStandardBrowserEnv &&
      (r && P.isFunction(r) && (r = r(e)), r || (r !== !1 && ud(e.url)))
    ) {
      const p = a && c && md.read(c);
      p && l.set(a, p);
    }
    return e;
  },
  gd = typeof XMLHttpRequest < "u",
  xd =
    gd &&
    function (t) {
      return new Promise(function (i, r) {
        const a = Ua(t);
        let c = a.data;
        const l = Ce.from(a.headers).normalize();
        let { responseType: h, onUploadProgress: p, onDownloadProgress: y } = a,
          j,
          N,
          _,
          D,
          E;
        function T() {
          (D && D(),
            E && E(),
            a.cancelToken && a.cancelToken.unsubscribe(j),
            a.signal && a.signal.removeEventListener("abort", j));
        }
        let S = new XMLHttpRequest();
        (S.open(a.method.toUpperCase(), a.url, !0), (S.timeout = a.timeout));
        function R() {
          if (!S) return;
          const L = Ce.from(
              "getAllResponseHeaders" in S && S.getAllResponseHeaders(),
            ),
            F = {
              data:
                !h || h === "text" || h === "json"
                  ? S.responseText
                  : S.response,
              status: S.status,
              statusText: S.statusText,
              headers: L,
              config: t,
              request: S,
            };
          (Ma(
            function (b) {
              (i(b), T());
            },
            function (b) {
              (r(b), T());
            },
            F,
          ),
            (S = null));
        }
        ("onloadend" in S
          ? (S.onloadend = R)
          : (S.onreadystatechange = function () {
              !S ||
                S.readyState !== 4 ||
                (S.status === 0 &&
                  !(S.responseURL && S.responseURL.indexOf("file:") === 0)) ||
                setTimeout(R);
            }),
          (S.onabort = function () {
            S &&
              (r(new H("Request aborted", H.ECONNABORTED, t, S)), (S = null));
          }),
          (S.onerror = function (A) {
            const F = A && A.message ? A.message : "Network Error",
              U = new H(F, H.ERR_NETWORK, t, S);
            ((U.event = A || null), r(U), (S = null));
          }),
          (S.ontimeout = function () {
            let A = a.timeout
              ? "timeout of " + a.timeout + "ms exceeded"
              : "timeout exceeded";
            const F = a.transitional || Da;
            (a.timeoutErrorMessage && (A = a.timeoutErrorMessage),
              r(
                new H(
                  A,
                  F.clarifyTimeoutError ? H.ETIMEDOUT : H.ECONNABORTED,
                  t,
                  S,
                ),
              ),
              (S = null));
          }),
          c === void 0 && l.setContentType(null),
          "setRequestHeader" in S &&
            P.forEach(l.toJSON(), function (A, F) {
              S.setRequestHeader(F, A);
            }),
          P.isUndefined(a.withCredentials) ||
            (S.withCredentials = !!a.withCredentials),
          h && h !== "json" && (S.responseType = a.responseType),
          y && (([_, E] = Bs(y, !0)), S.addEventListener("progress", _)),
          p &&
            S.upload &&
            (([N, D] = Bs(p)),
            S.upload.addEventListener("progress", N),
            S.upload.addEventListener("loadend", D)),
          (a.cancelToken || a.signal) &&
            ((j = (L) => {
              S &&
                (r(!L || L.type ? new Pt(null, t, S) : L),
                S.abort(),
                (S = null));
            }),
            a.cancelToken && a.cancelToken.subscribe(j),
            a.signal &&
              (a.signal.aborted
                ? j()
                : a.signal.addEventListener("abort", j))));
        const O = cd(a.url);
        if (O && ve.protocols.indexOf(O) === -1) {
          r(new H("Unsupported protocol " + O + ":", H.ERR_BAD_REQUEST, t));
          return;
        }
        S.send(c || null);
      });
    },
  yd = (t, e) => {
    const { length: i } = (t = t ? t.filter(Boolean) : []);
    if (e || i) {
      let r = new AbortController(),
        a;
      const c = function (y) {
        if (!a) {
          ((a = !0), h());
          const j = y instanceof Error ? y : this.reason;
          r.abort(
            j instanceof H ? j : new Pt(j instanceof Error ? j.message : j),
          );
        }
      };
      let l =
        e &&
        setTimeout(() => {
          ((l = null), c(new H(`timeout ${e} of ms exceeded`, H.ETIMEDOUT)));
        }, e);
      const h = () => {
        t &&
          (l && clearTimeout(l),
          (l = null),
          t.forEach((y) => {
            y.unsubscribe
              ? y.unsubscribe(c)
              : y.removeEventListener("abort", c);
          }),
          (t = null));
      };
      t.forEach((y) => y.addEventListener("abort", c));
      const { signal: p } = r;
      return ((p.unsubscribe = () => P.asap(h)), p);
    }
  },
  vd = function* (t, e) {
    let i = t.byteLength;
    if (i < e) {
      yield t;
      return;
    }
    let r = 0,
      a;
    for (; r < i; ) ((a = r + e), yield t.slice(r, a), (r = a));
  },
  bd = async function* (t, e) {
    for await (const i of jd(t)) yield* vd(i, e);
  },
  jd = async function* (t) {
    if (t[Symbol.asyncIterator]) {
      yield* t;
      return;
    }
    const e = t.getReader();
    try {
      for (;;) {
        const { done: i, value: r } = await e.read();
        if (i) break;
        yield r;
      }
    } finally {
      await e.cancel();
    }
  },
  wr = (t, e, i, r) => {
    const a = bd(t, e);
    let c = 0,
      l,
      h = (p) => {
        l || ((l = !0), r && r(p));
      };
    return new ReadableStream(
      {
        async pull(p) {
          try {
            const { done: y, value: j } = await a.next();
            if (y) {
              (h(), p.close());
              return;
            }
            let N = j.byteLength;
            if (i) {
              let _ = (c += N);
              i(_);
            }
            p.enqueue(new Uint8Array(j));
          } catch (y) {
            throw (h(y), y);
          }
        },
        cancel(p) {
          return (h(p), a.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  Sr = 64 * 1024,
  { isFunction: Ts } = P,
  Nd = (({ Request: t, Response: e }) => ({ Request: t, Response: e }))(
    P.global,
  ),
  { ReadableStream: Er, TextEncoder: Cr } = P.global,
  Tr = (t, ...e) => {
    try {
      return !!t(...e);
    } catch {
      return !1;
    }
  },
  wd = (t) => {
    t = P.merge.call({ skipUndefined: !0 }, Nd, t);
    const { fetch: e, Request: i, Response: r } = t,
      a = e ? Ts(e) : typeof fetch == "function",
      c = Ts(i),
      l = Ts(r);
    if (!a) return !1;
    const h = a && Ts(Er),
      p =
        a &&
        (typeof Cr == "function"
          ? (
              (E) => (T) =>
                E.encode(T)
            )(new Cr())
          : async (E) => new Uint8Array(await new i(E).arrayBuffer())),
      y =
        c &&
        h &&
        Tr(() => {
          let E = !1;
          const T = new i(ve.origin, {
            body: new Er(),
            method: "POST",
            get duplex() {
              return ((E = !0), "half");
            },
          }).headers.has("Content-Type");
          return E && !T;
        }),
      j = l && h && Tr(() => P.isReadableStream(new r("").body)),
      N = { stream: j && ((E) => E.body) };
    a &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((E) => {
        !N[E] &&
          (N[E] = (T, S) => {
            let R = T && T[E];
            if (R) return R.call(T);
            throw new H(
              `Response type '${E}' is not supported`,
              H.ERR_NOT_SUPPORT,
              S,
            );
          });
      });
    const _ = async (E) => {
        if (E == null) return 0;
        if (P.isBlob(E)) return E.size;
        if (P.isSpecCompliantForm(E))
          return (
            await new i(ve.origin, { method: "POST", body: E }).arrayBuffer()
          ).byteLength;
        if (P.isArrayBufferView(E) || P.isArrayBuffer(E)) return E.byteLength;
        if ((P.isURLSearchParams(E) && (E = E + ""), P.isString(E)))
          return (await p(E)).byteLength;
      },
      D = async (E, T) => {
        const S = P.toFiniteNumber(E.getContentLength());
        return S ?? _(T);
      };
    return async (E) => {
      let {
          url: T,
          method: S,
          data: R,
          signal: O,
          cancelToken: L,
          timeout: A,
          onDownloadProgress: F,
          onUploadProgress: U,
          responseType: b,
          headers: m,
          withCredentials: f = "same-origin",
          fetchOptions: g,
        } = Ua(E),
        v = e || fetch;
      b = b ? (b + "").toLowerCase() : "text";
      let C = yd([O, L && L.toAbortSignal()], A),
        x = null;
      const V =
        C &&
        C.unsubscribe &&
        (() => {
          C.unsubscribe();
        });
      let K;
      try {
        if (
          U &&
          y &&
          S !== "get" &&
          S !== "head" &&
          (K = await D(m, R)) !== 0
        ) {
          let he = new i(T, { method: "POST", body: R, duplex: "half" }),
            le;
          if (
            (P.isFormData(R) &&
              (le = he.headers.get("content-type")) &&
              m.setContentType(le),
            he.body)
          ) {
            const [ue, ie] = br(K, Bs(jr(U)));
            R = wr(he.body, Sr, ue, ie);
          }
        }
        P.isString(f) || (f = f ? "include" : "omit");
        const ee = c && "credentials" in i.prototype,
          X = {
            ...g,
            signal: C,
            method: S.toUpperCase(),
            headers: m.normalize().toJSON(),
            body: R,
            duplex: "half",
            credentials: ee ? f : void 0,
          };
        x = c && new i(T, X);
        let se = await (c ? v(x, g) : v(T, X));
        const Se = j && (b === "stream" || b === "response");
        if (j && (F || (Se && V))) {
          const he = {};
          ["status", "statusText", "headers"].forEach((xe) => {
            he[xe] = se[xe];
          });
          const le = P.toFiniteNumber(se.headers.get("content-length")),
            [ue, ie] = (F && br(le, Bs(jr(F), !0))) || [];
          se = new r(
            wr(se.body, Sr, ue, () => {
              (ie && ie(), V && V());
            }),
            he,
          );
        }
        b = b || "text";
        let Be = await N[P.findKey(N, b) || "text"](se, E);
        return (
          !Se && V && V(),
          await new Promise((he, le) => {
            Ma(he, le, {
              data: Be,
              headers: Ce.from(se.headers),
              status: se.status,
              statusText: se.statusText,
              config: E,
              request: x,
            });
          })
        );
      } catch (ee) {
        throw (
          V && V(),
          ee && ee.name === "TypeError" && /Load failed|fetch/i.test(ee.message)
            ? Object.assign(new H("Network Error", H.ERR_NETWORK, E, x), {
                cause: ee.cause || ee,
              })
            : H.from(ee, ee && ee.code, E, x)
        );
      }
    };
  },
  Sd = new Map(),
  Va = (t) => {
    let e = t ? t.env : {};
    const { fetch: i, Request: r, Response: a } = e,
      c = [r, a, i];
    let l = c.length,
      h = l,
      p,
      y,
      j = Sd;
    for (; h--; )
      ((p = c[h]),
        (y = j.get(p)),
        y === void 0 && j.set(p, (y = h ? new Map() : wd(e))),
        (j = y));
    return y;
  };
Va();
const Wn = { http: Vc, xhr: xd, fetch: { get: Va } };
P.forEach(Wn, (t, e) => {
  if (t) {
    try {
      Object.defineProperty(t, "name", { value: e });
    } catch {}
    Object.defineProperty(t, "adapterName", { value: e });
  }
});
const _r = (t) => `- ${t}`,
  Ed = (t) => P.isFunction(t) || t === null || t === !1,
  $a = {
    getAdapter: (t, e) => {
      t = P.isArray(t) ? t : [t];
      const { length: i } = t;
      let r, a;
      const c = {};
      for (let l = 0; l < i; l++) {
        r = t[l];
        let h;
        if (
          ((a = r),
          !Ed(r) && ((a = Wn[(h = String(r)).toLowerCase()]), a === void 0))
        )
          throw new H(`Unknown adapter '${h}'`);
        if (a && (P.isFunction(a) || (a = a.get(e)))) break;
        c[h || "#" + l] = a;
      }
      if (!a) {
        const l = Object.entries(c).map(
          ([p, y]) =>
            `adapter ${p} ` +
            (y === !1
              ? "is not supported by the environment"
              : "is not available in the build"),
        );
        let h = i
          ? l.length > 1
            ? `since :
` +
              l.map(_r).join(`
`)
            : " " + _r(l[0])
          : "as no adapter specified";
        throw new H(
          "There is no suitable adapter to dispatch the request " + h,
          "ERR_NOT_SUPPORT",
        );
      }
      return a;
    },
    adapters: Wn,
  };
function _n(t) {
  if (
    (t.cancelToken && t.cancelToken.throwIfRequested(),
    t.signal && t.signal.aborted)
  )
    throw new Pt(null, t);
}
function Ar(t) {
  return (
    _n(t),
    (t.headers = Ce.from(t.headers)),
    (t.data = Tn.call(t, t.transformRequest)),
    ["post", "put", "patch"].indexOf(t.method) !== -1 &&
      t.headers.setContentType("application/x-www-form-urlencoded", !1),
    $a
      .getAdapter(
        t.adapter || gs.adapter,
        t,
      )(t)
      .then(
        function (r) {
          return (
            _n(t),
            (r.data = Tn.call(t, t.transformResponse, r)),
            (r.headers = Ce.from(r.headers)),
            r
          );
        },
        function (r) {
          return (
            Fa(r) ||
              (_n(t),
              r &&
                r.response &&
                ((r.response.data = Tn.call(
                  t,
                  t.transformResponse,
                  r.response,
                )),
                (r.response.headers = Ce.from(r.response.headers)))),
            Promise.reject(r)
          );
        },
      )
  );
}
const Ha = "1.12.2",
  Qs = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (t, e) => {
    Qs[t] = function (r) {
      return typeof r === t || "a" + (e < 1 ? "n " : " ") + t;
    };
  },
);
const Rr = {};
Qs.transitional = function (e, i, r) {
  function a(c, l) {
    return (
      "[Axios v" +
      Ha +
      "] Transitional option '" +
      c +
      "'" +
      l +
      (r ? ". " + r : "")
    );
  }
  return (c, l, h) => {
    if (e === !1)
      throw new H(
        a(l, " has been removed" + (i ? " in " + i : "")),
        H.ERR_DEPRECATED,
      );
    return (
      i &&
        !Rr[l] &&
        ((Rr[l] = !0),
        console.warn(
          a(
            l,
            " has been deprecated since v" +
              i +
              " and will be removed in the near future",
          ),
        )),
      e ? e(c, l, h) : !0
    );
  };
};
Qs.spelling = function (e) {
  return (i, r) => (console.warn(`${r} is likely a misspelling of ${e}`), !0);
};
function Cd(t, e, i) {
  if (typeof t != "object")
    throw new H("options must be an object", H.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(t);
  let a = r.length;
  for (; a-- > 0; ) {
    const c = r[a],
      l = e[c];
    if (l) {
      const h = t[c],
        p = h === void 0 || l(h, c, t);
      if (p !== !0)
        throw new H("option " + c + " must be " + p, H.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (i !== !0) throw new H("Unknown option " + c, H.ERR_BAD_OPTION);
  }
}
const ks = { assertOptions: Cd, validators: Qs },
  $e = ks.validators;
let gt = class {
  constructor(e) {
    ((this.defaults = e || {}),
      (this.interceptors = { request: new yr(), response: new yr() }));
  }
  async request(e, i) {
    try {
      return await this._request(e, i);
    } catch (r) {
      if (r instanceof Error) {
        let a = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(a)
          : (a = new Error());
        const c = a.stack ? a.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack
            ? c &&
              !String(r.stack).endsWith(c.replace(/^.+\n.+\n/, "")) &&
              (r.stack +=
                `
` + c)
            : (r.stack = c);
        } catch {}
      }
      throw r;
    }
  }
  _request(e, i) {
    (typeof e == "string" ? ((i = i || {}), (i.url = e)) : (i = e || {}),
      (i = bt(this.defaults, i)));
    const { transitional: r, paramsSerializer: a, headers: c } = i;
    (r !== void 0 &&
      ks.assertOptions(
        r,
        {
          silentJSONParsing: $e.transitional($e.boolean),
          forcedJSONParsing: $e.transitional($e.boolean),
          clarifyTimeoutError: $e.transitional($e.boolean),
        },
        !1,
      ),
      a != null &&
        (P.isFunction(a)
          ? (i.paramsSerializer = { serialize: a })
          : ks.assertOptions(
              a,
              { encode: $e.function, serialize: $e.function },
              !0,
            )),
      i.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (i.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (i.allowAbsoluteUrls = !0)),
      ks.assertOptions(
        i,
        {
          baseUrl: $e.spelling("baseURL"),
          withXsrfToken: $e.spelling("withXSRFToken"),
        },
        !0,
      ),
      (i.method = (i.method || this.defaults.method || "get").toLowerCase()));
    let l = c && P.merge(c.common, c[i.method]);
    (c &&
      P.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (E) => {
          delete c[E];
        },
      ),
      (i.headers = Ce.concat(l, c)));
    const h = [];
    let p = !0;
    this.interceptors.request.forEach(function (T) {
      (typeof T.runWhen == "function" && T.runWhen(i) === !1) ||
        ((p = p && T.synchronous), h.unshift(T.fulfilled, T.rejected));
    });
    const y = [];
    this.interceptors.response.forEach(function (T) {
      y.push(T.fulfilled, T.rejected);
    });
    let j,
      N = 0,
      _;
    if (!p) {
      const E = [Ar.bind(this), void 0];
      for (
        E.unshift(...h), E.push(...y), _ = E.length, j = Promise.resolve(i);
        N < _;
      )
        j = j.then(E[N++], E[N++]);
      return j;
    }
    _ = h.length;
    let D = i;
    for (; N < _; ) {
      const E = h[N++],
        T = h[N++];
      try {
        D = E(D);
      } catch (S) {
        T.call(this, S);
        break;
      }
    }
    try {
      j = Ar.call(this, D);
    } catch (E) {
      return Promise.reject(E);
    }
    for (N = 0, _ = y.length; N < _; ) j = j.then(y[N++], y[N++]);
    return j;
  }
  getUri(e) {
    e = bt(this.defaults, e);
    const i = Ba(e.baseURL, e.url, e.allowAbsoluteUrls);
    return ka(i, e.params, e.paramsSerializer);
  }
};
P.forEach(["delete", "get", "head", "options"], function (e) {
  gt.prototype[e] = function (i, r) {
    return this.request(
      bt(r || {}, { method: e, url: i, data: (r || {}).data }),
    );
  };
});
P.forEach(["post", "put", "patch"], function (e) {
  function i(r) {
    return function (c, l, h) {
      return this.request(
        bt(h || {}, {
          method: e,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: c,
          data: l,
        }),
      );
    };
  }
  ((gt.prototype[e] = i()), (gt.prototype[e + "Form"] = i(!0)));
});
let Td = class za {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let i;
    this.promise = new Promise(function (c) {
      i = c;
    });
    const r = this;
    (this.promise.then((a) => {
      if (!r._listeners) return;
      let c = r._listeners.length;
      for (; c-- > 0; ) r._listeners[c](a);
      r._listeners = null;
    }),
      (this.promise.then = (a) => {
        let c;
        const l = new Promise((h) => {
          (r.subscribe(h), (c = h));
        }).then(a);
        return (
          (l.cancel = function () {
            r.unsubscribe(c);
          }),
          l
        );
      }),
      e(function (c, l, h) {
        r.reason || ((r.reason = new Pt(c, l, h)), i(r.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
  }
  unsubscribe(e) {
    if (!this._listeners) return;
    const i = this._listeners.indexOf(e);
    i !== -1 && this._listeners.splice(i, 1);
  }
  toAbortSignal() {
    const e = new AbortController(),
      i = (r) => {
        e.abort(r);
      };
    return (
      this.subscribe(i),
      (e.signal.unsubscribe = () => this.unsubscribe(i)),
      e.signal
    );
  }
  static source() {
    let e;
    return {
      token: new za(function (a) {
        e = a;
      }),
      cancel: e,
    };
  }
};
function _d(t) {
  return function (i) {
    return t.apply(null, i);
  };
}
function Ad(t) {
  return P.isObject(t) && t.isAxiosError === !0;
}
const qn = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(qn).forEach(([t, e]) => {
  qn[e] = t;
});
function Wa(t) {
  const e = new gt(t),
    i = Na(gt.prototype.request, e);
  return (
    P.extend(i, gt.prototype, e, { allOwnKeys: !0 }),
    P.extend(i, e, null, { allOwnKeys: !0 }),
    (i.create = function (a) {
      return Wa(bt(t, a));
    }),
    i
  );
}
const oe = Wa(gs);
oe.Axios = gt;
oe.CanceledError = Pt;
oe.CancelToken = Td;
oe.isCancel = Fa;
oe.VERSION = Ha;
oe.toFormData = Ys;
oe.AxiosError = H;
oe.Cancel = oe.CanceledError;
oe.all = function (e) {
  return Promise.all(e);
};
oe.spread = _d;
oe.isAxiosError = Ad;
oe.mergeConfig = bt;
oe.AxiosHeaders = Ce;
oe.formToJSON = (t) => Oa(P.isHTMLForm(t) ? new FormData(t) : t);
oe.getAdapter = $a.getAdapter;
oe.HttpStatusCode = qn;
oe.default = oe;
const {
    Axios: jm,
    AxiosError: Nm,
    CanceledError: wm,
    isCancel: Sm,
    CancelToken: Em,
    VERSION: Cm,
    all: Tm,
    Cancel: _m,
    isAxiosError: Am,
    spread: Rm,
    toFormData: Im,
    AxiosHeaders: Lm,
    HttpStatusCode: Pm,
    formToJSON: km,
    getAdapter: Dm,
    mergeConfig: Om,
  } = oe,
  $ = oe.create({
    baseURL: location.origin.includes("173")
      ? "http://localhost:3000"
      : location.origin,
    headers: { "X-Auth": localStorage.access ? localStorage.access : "" },
  });
function qa(t) {
  var e,
    i,
    r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object")
    if (Array.isArray(t)) {
      var a = t.length;
      for (e = 0; e < a; e++)
        t[e] && (i = qa(t[e])) && (r && (r += " "), (r += i));
    } else for (i in t) t[i] && (r && (r += " "), (r += i));
  return r;
}
function rt() {
  for (var t, e, i = 0, r = "", a = arguments.length; i < a; i++)
    (t = arguments[i]) && (e = qa(t)) && (r && (r += " "), (r += e));
  return r;
}
const os = (t) => typeof t == "number" && !isNaN(t),
  xt = (t) => typeof t == "string",
  Ae = (t) => typeof t == "function",
  Ds = (t) => (xt(t) || Ae(t) ? t : null),
  Gn = (t) => w.isValidElement(t) || xt(t) || Ae(t) || os(t);
function Rd(t, e, i) {
  i === void 0 && (i = 300);
  const { scrollHeight: r, style: a } = t;
  requestAnimationFrame(() => {
    ((a.minHeight = "initial"),
      (a.height = r + "px"),
      (a.transition = `all ${i}ms`),
      requestAnimationFrame(() => {
        ((a.height = "0"),
          (a.padding = "0"),
          (a.margin = "0"),
          setTimeout(e, i));
      }));
  });
}
function Zs(t) {
  let {
    enter: e,
    exit: i,
    appendPosition: r = !1,
    collapse: a = !0,
    collapseDuration: c = 300,
  } = t;
  return function (l) {
    let {
      children: h,
      position: p,
      preventExitTransition: y,
      done: j,
      nodeRef: N,
      isIn: _,
      playToast: D,
    } = l;
    const E = r ? `${e}--${p}` : e,
      T = r ? `${i}--${p}` : i,
      S = w.useRef(0);
    return (
      w.useLayoutEffect(() => {
        const R = N.current,
          O = E.split(" "),
          L = (A) => {
            A.target === N.current &&
              (D(),
              R.removeEventListener("animationend", L),
              R.removeEventListener("animationcancel", L),
              S.current === 0 &&
                A.type !== "animationcancel" &&
                R.classList.remove(...O));
          };
        (R.classList.add(...O),
          R.addEventListener("animationend", L),
          R.addEventListener("animationcancel", L));
      }, []),
      w.useEffect(() => {
        const R = N.current,
          O = () => {
            (R.removeEventListener("animationend", O), a ? Rd(R, j, c) : j());
          };
        _ ||
          (y
            ? O()
            : ((S.current = 1),
              (R.className += ` ${T}`),
              R.addEventListener("animationend", O)));
      }, [_]),
      Z.createElement(Z.Fragment, null, h)
    );
  };
}
function Ir(t, e) {
  return t != null
    ? {
        content: t.content,
        containerId: t.props.containerId,
        id: t.props.toastId,
        theme: t.props.theme,
        type: t.props.type,
        data: t.props.data || {},
        isLoading: t.props.isLoading,
        icon: t.props.icon,
        status: e,
      }
    : {};
}
const we = new Map();
let ls = [];
const Jn = new Set(),
  Id = (t) => Jn.forEach((e) => e(t)),
  Ga = () => we.size > 0;
function Ja(t, e) {
  var i;
  if (e) return !((i = we.get(e)) == null || !i.isToastActive(t));
  let r = !1;
  return (
    we.forEach((a) => {
      a.isToastActive(t) && (r = !0);
    }),
    r
  );
}
function Ka(t, e) {
  Gn(t) &&
    (Ga() || ls.push({ content: t, options: e }),
    we.forEach((i) => {
      i.buildToast(t, e);
    }));
}
function Lr(t, e) {
  we.forEach((i) => {
    e != null && e != null && e.containerId
      ? (e == null ? void 0 : e.containerId) === i.id &&
        i.toggle(t, e == null ? void 0 : e.id)
      : i.toggle(t, e == null ? void 0 : e.id);
  });
}
function Ld(t) {
  const {
    subscribe: e,
    getSnapshot: i,
    setProps: r,
  } = w.useRef(
    (function (c) {
      const l = c.containerId || 1;
      return {
        subscribe(h) {
          const p = (function (j, N, _) {
            let D = 1,
              E = 0,
              T = [],
              S = [],
              R = [],
              O = N;
            const L = new Map(),
              A = new Set(),
              F = () => {
                ((R = Array.from(L.values())), A.forEach((m) => m()));
              },
              U = (m) => {
                ((S = m == null ? [] : S.filter((f) => f !== m)), F());
              },
              b = (m) => {
                const {
                    toastId: f,
                    onOpen: g,
                    updateId: v,
                    children: C,
                  } = m.props,
                  x = v == null;
                (m.staleId && L.delete(m.staleId),
                  L.set(f, m),
                  (S = [...S, m.props.toastId].filter((V) => V !== m.staleId)),
                  F(),
                  _(Ir(m, x ? "added" : "updated")),
                  x && Ae(g) && g(w.isValidElement(C) && C.props));
              };
            return {
              id: j,
              props: O,
              observe: (m) => (A.add(m), () => A.delete(m)),
              toggle: (m, f) => {
                L.forEach((g) => {
                  (f != null && f !== g.props.toastId) ||
                    (Ae(g.toggle) && g.toggle(m));
                });
              },
              removeToast: U,
              toasts: L,
              clearQueue: () => {
                ((E -= T.length), (T = []));
              },
              buildToast: (m, f) => {
                if (
                  ((le) => {
                    let { containerId: ue, toastId: ie, updateId: xe } = le;
                    const ke = ue ? ue !== j : j !== 1,
                      Ge = L.has(ie) && xe == null;
                    return ke || Ge;
                  })(f)
                )
                  return;
                const {
                    toastId: g,
                    updateId: v,
                    data: C,
                    staleId: x,
                    delay: V,
                  } = f,
                  K = () => {
                    U(g);
                  },
                  ee = v == null;
                ee && E++;
                const X = {
                  ...O,
                  style: O.toastStyle,
                  key: D++,
                  ...Object.fromEntries(
                    Object.entries(f).filter((le) => {
                      let [ue, ie] = le;
                      return ie != null;
                    }),
                  ),
                  toastId: g,
                  updateId: v,
                  data: C,
                  closeToast: K,
                  isIn: !1,
                  className: Ds(f.className || O.toastClassName),
                  bodyClassName: Ds(f.bodyClassName || O.bodyClassName),
                  progressClassName: Ds(
                    f.progressClassName || O.progressClassName,
                  ),
                  autoClose:
                    !f.isLoading &&
                    ((se = f.autoClose),
                    (Se = O.autoClose),
                    se === !1 || (os(se) && se > 0) ? se : Se),
                  deleteToast() {
                    const le = L.get(g),
                      { onClose: ue, children: ie } = le.props;
                    (Ae(ue) && ue(w.isValidElement(ie) && ie.props),
                      _(Ir(le, "removed")),
                      L.delete(g),
                      E--,
                      E < 0 && (E = 0),
                      T.length > 0 ? b(T.shift()) : F());
                  },
                };
                var se, Se;
                ((X.closeButton = O.closeButton),
                  f.closeButton === !1 || Gn(f.closeButton)
                    ? (X.closeButton = f.closeButton)
                    : f.closeButton === !0 &&
                      (X.closeButton = !Gn(O.closeButton) || O.closeButton));
                let Be = m;
                w.isValidElement(m) && !xt(m.type)
                  ? (Be = w.cloneElement(m, {
                      closeToast: K,
                      toastProps: X,
                      data: C,
                    }))
                  : Ae(m) &&
                    (Be = m({ closeToast: K, toastProps: X, data: C }));
                const he = { content: Be, props: X, staleId: x };
                O.limit && O.limit > 0 && E > O.limit && ee
                  ? T.push(he)
                  : os(V)
                    ? setTimeout(() => {
                        b(he);
                      }, V)
                    : b(he);
              },
              setProps(m) {
                O = m;
              },
              setToggle: (m, f) => {
                L.get(m).toggle = f;
              },
              isToastActive: (m) => S.some((f) => f === m),
              getSnapshot: () => (O.newestOnTop ? R.reverse() : R),
            };
          })(l, c, Id);
          we.set(l, p);
          const y = p.observe(h);
          return (
            ls.forEach((j) => Ka(j.content, j.options)),
            (ls = []),
            () => {
              (y(), we.delete(l));
            }
          );
        },
        setProps(h) {
          var p;
          (p = we.get(l)) == null || p.setProps(h);
        },
        getSnapshot() {
          var h;
          return (h = we.get(l)) == null ? void 0 : h.getSnapshot();
        },
      };
    })(t),
  ).current;
  r(t);
  const a = w.useSyncExternalStore(e, i, i);
  return {
    getToastToRender: function (c) {
      if (!a) return [];
      const l = new Map();
      return (
        a.forEach((h) => {
          const { position: p } = h.props;
          (l.has(p) || l.set(p, []), l.get(p).push(h));
        }),
        Array.from(l, (h) => c(h[0], h[1]))
      );
    },
    isToastActive: Ja,
    count: a == null ? void 0 : a.length,
  };
}
function Pd(t) {
  const [e, i] = w.useState(!1),
    [r, a] = w.useState(!1),
    c = w.useRef(null),
    l = w.useRef({
      start: 0,
      delta: 0,
      removalDistance: 0,
      canCloseOnClick: !0,
      canDrag: !1,
      didMove: !1,
    }).current,
    {
      autoClose: h,
      pauseOnHover: p,
      closeToast: y,
      onClick: j,
      closeOnClick: N,
    } = t;
  var _, D;
  function E() {
    i(!0);
  }
  function T() {
    i(!1);
  }
  function S(L) {
    const A = c.current;
    l.canDrag &&
      A &&
      ((l.didMove = !0),
      e && T(),
      (l.delta =
        t.draggableDirection === "x"
          ? L.clientX - l.start
          : L.clientY - l.start),
      l.start !== L.clientX && (l.canCloseOnClick = !1),
      (A.style.transform = `translate3d(${t.draggableDirection === "x" ? `${l.delta}px, var(--y)` : `0, calc(${l.delta}px + var(--y))`},0)`),
      (A.style.opacity = "" + (1 - Math.abs(l.delta / l.removalDistance))));
  }
  function R() {
    (document.removeEventListener("pointermove", S),
      document.removeEventListener("pointerup", R));
    const L = c.current;
    if (l.canDrag && l.didMove && L) {
      if (((l.canDrag = !1), Math.abs(l.delta) > l.removalDistance))
        return (a(!0), t.closeToast(), void t.collapseAll());
      ((L.style.transition = "transform 0.2s, opacity 0.2s"),
        L.style.removeProperty("transform"),
        L.style.removeProperty("opacity"));
    }
  }
  ((D = we.get(
    (_ = { id: t.toastId, containerId: t.containerId, fn: i }).containerId || 1,
  )) == null || D.setToggle(_.id, _.fn),
    w.useEffect(() => {
      if (t.pauseOnFocusLoss)
        return (
          document.hasFocus() || T(),
          window.addEventListener("focus", E),
          window.addEventListener("blur", T),
          () => {
            (window.removeEventListener("focus", E),
              window.removeEventListener("blur", T));
          }
        );
    }, [t.pauseOnFocusLoss]));
  const O = {
    onPointerDown: function (L) {
      if (t.draggable === !0 || t.draggable === L.pointerType) {
        ((l.didMove = !1),
          document.addEventListener("pointermove", S),
          document.addEventListener("pointerup", R));
        const A = c.current;
        ((l.canCloseOnClick = !0),
          (l.canDrag = !0),
          (A.style.transition = "none"),
          t.draggableDirection === "x"
            ? ((l.start = L.clientX),
              (l.removalDistance = A.offsetWidth * (t.draggablePercent / 100)))
            : ((l.start = L.clientY),
              (l.removalDistance =
                (A.offsetHeight *
                  (t.draggablePercent === 80
                    ? 1.5 * t.draggablePercent
                    : t.draggablePercent)) /
                100)));
      }
    },
    onPointerUp: function (L) {
      const {
        top: A,
        bottom: F,
        left: U,
        right: b,
      } = c.current.getBoundingClientRect();
      L.nativeEvent.type !== "touchend" &&
      t.pauseOnHover &&
      L.clientX >= U &&
      L.clientX <= b &&
      L.clientY >= A &&
      L.clientY <= F
        ? T()
        : E();
    },
  };
  return (
    h && p && ((O.onMouseEnter = T), t.stacked || (O.onMouseLeave = E)),
    N &&
      (O.onClick = (L) => {
        (j && j(L), l.canCloseOnClick && y());
      }),
    {
      playToast: E,
      pauseToast: T,
      isRunning: e,
      preventExitTransition: r,
      toastRef: c,
      eventHandlers: O,
    }
  );
}
function kd(t) {
  let {
    delay: e,
    isRunning: i,
    closeToast: r,
    type: a = "default",
    hide: c,
    className: l,
    style: h,
    controlledProgress: p,
    progress: y,
    rtl: j,
    isIn: N,
    theme: _,
  } = t;
  const D = c || (p && y === 0),
    E = {
      ...h,
      animationDuration: `${e}ms`,
      animationPlayState: i ? "running" : "paused",
    };
  p && (E.transform = `scaleX(${y})`);
  const T = rt(
      "Toastify__progress-bar",
      p
        ? "Toastify__progress-bar--controlled"
        : "Toastify__progress-bar--animated",
      `Toastify__progress-bar-theme--${_}`,
      `Toastify__progress-bar--${a}`,
      { "Toastify__progress-bar--rtl": j },
    ),
    S = Ae(l) ? l({ rtl: j, type: a, defaultClassName: T }) : rt(T, l),
    R = {
      [p && y >= 1 ? "onTransitionEnd" : "onAnimationEnd"]:
        p && y < 1
          ? null
          : () => {
              N && r();
            },
    };
  return Z.createElement(
    "div",
    { className: "Toastify__progress-bar--wrp", "data-hidden": D },
    Z.createElement("div", {
      className: `Toastify__progress-bar--bg Toastify__progress-bar-theme--${_} Toastify__progress-bar--${a}`,
    }),
    Z.createElement("div", {
      role: "progressbar",
      "aria-hidden": D ? "true" : "false",
      "aria-label": "notification timer",
      className: S,
      style: E,
      ...R,
    }),
  );
}
let Dd = 1;
const Xa = () => "" + Dd++;
function Od(t) {
  return t && (xt(t.toastId) || os(t.toastId)) ? t.toastId : Xa();
}
function Zt(t, e) {
  return (Ka(t, e), e.toastId);
}
function Us(t, e) {
  return { ...e, type: (e && e.type) || t, toastId: Od(e) };
}
function _s(t) {
  return (e, i) => Zt(e, Us(t, i));
}
function B(t, e) {
  return Zt(t, Us("default", e));
}
((B.loading = (t, e) =>
  Zt(
    t,
    Us("default", {
      isLoading: !0,
      autoClose: !1,
      closeOnClick: !1,
      closeButton: !1,
      draggable: !1,
      ...e,
    }),
  )),
  (B.promise = function (t, e, i) {
    let r,
      { pending: a, error: c, success: l } = e;
    a && (r = xt(a) ? B.loading(a, i) : B.loading(a.render, { ...i, ...a }));
    const h = {
        isLoading: null,
        autoClose: null,
        closeOnClick: null,
        closeButton: null,
        draggable: null,
      },
      p = (j, N, _) => {
        if (N == null) return void B.dismiss(r);
        const D = { type: j, ...h, ...i, data: _ },
          E = xt(N) ? { render: N } : N;
        return (
          r ? B.update(r, { ...D, ...E }) : B(E.render, { ...D, ...E }),
          _
        );
      },
      y = Ae(t) ? t() : t;
    return (
      y.then((j) => p("success", l, j)).catch((j) => p("error", c, j)),
      y
    );
  }),
  (B.success = _s("success")),
  (B.info = _s("info")),
  (B.error = _s("error")),
  (B.warning = _s("warning")),
  (B.warn = B.warning),
  (B.dark = (t, e) => Zt(t, Us("default", { theme: "dark", ...e }))),
  (B.dismiss = function (t) {
    (function (e) {
      var i;
      if (Ga()) {
        if (e == null || xt((i = e)) || os(i))
          we.forEach((r) => {
            r.removeToast(e);
          });
        else if (e && ("containerId" in e || "id" in e)) {
          const r = we.get(e.containerId);
          r
            ? r.removeToast(e.id)
            : we.forEach((a) => {
                a.removeToast(e.id);
              });
        }
      } else ls = ls.filter((r) => e != null && r.options.toastId !== e);
    })(t);
  }),
  (B.clearWaitingQueue = function (t) {
    (t === void 0 && (t = {}),
      we.forEach((e) => {
        !e.props.limit ||
          (t.containerId && e.id !== t.containerId) ||
          e.clearQueue();
      }));
  }),
  (B.isActive = Ja),
  (B.update = function (t, e) {
    e === void 0 && (e = {});
    const i = ((r, a) => {
      var c;
      let { containerId: l } = a;
      return (c = we.get(l || 1)) == null ? void 0 : c.toasts.get(r);
    })(t, e);
    if (i) {
      const { props: r, content: a } = i,
        c = { delay: 100, ...r, ...e, toastId: e.toastId || t, updateId: Xa() };
      c.toastId !== t && (c.staleId = t);
      const l = c.render || a;
      (delete c.render, Zt(l, c));
    }
  }),
  (B.done = (t) => {
    B.update(t, { progress: 1 });
  }),
  (B.onChange = function (t) {
    return (
      Jn.add(t),
      () => {
        Jn.delete(t);
      }
    );
  }),
  (B.play = (t) => Lr(!0, t)),
  (B.pause = (t) => Lr(!1, t)));
const Fd = typeof window < "u" ? w.useLayoutEffect : w.useEffect,
  As = (t) => {
    let { theme: e, type: i, isLoading: r, ...a } = t;
    return Z.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "100%",
      height: "100%",
      fill:
        e === "colored" ? "currentColor" : `var(--toastify-icon-color-${i})`,
      ...a,
    });
  },
  An = {
    info: function (t) {
      return Z.createElement(
        As,
        { ...t },
        Z.createElement("path", {
          d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z",
        }),
      );
    },
    warning: function (t) {
      return Z.createElement(
        As,
        { ...t },
        Z.createElement("path", {
          d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z",
        }),
      );
    },
    success: function (t) {
      return Z.createElement(
        As,
        { ...t },
        Z.createElement("path", {
          d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z",
        }),
      );
    },
    error: function (t) {
      return Z.createElement(
        As,
        { ...t },
        Z.createElement("path", {
          d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z",
        }),
      );
    },
    spinner: function () {
      return Z.createElement("div", { className: "Toastify__spinner" });
    },
  },
  Md = (t) => {
    const {
        isRunning: e,
        preventExitTransition: i,
        toastRef: r,
        eventHandlers: a,
        playToast: c,
      } = Pd(t),
      {
        closeButton: l,
        children: h,
        autoClose: p,
        onClick: y,
        type: j,
        hideProgressBar: N,
        closeToast: _,
        transition: D,
        position: E,
        className: T,
        style: S,
        bodyClassName: R,
        bodyStyle: O,
        progressClassName: L,
        progressStyle: A,
        updateId: F,
        role: U,
        progress: b,
        rtl: m,
        toastId: f,
        deleteToast: g,
        isIn: v,
        isLoading: C,
        closeOnClick: x,
        theme: V,
      } = t,
      K = rt(
        "Toastify__toast",
        `Toastify__toast-theme--${V}`,
        `Toastify__toast--${j}`,
        { "Toastify__toast--rtl": m },
        { "Toastify__toast--close-on-click": x },
      ),
      ee = Ae(T)
        ? T({ rtl: m, position: E, type: j, defaultClassName: K })
        : rt(K, T),
      X = (function (he) {
        let { theme: le, type: ue, isLoading: ie, icon: xe } = he,
          ke = null;
        const Ge = { theme: le, type: ue };
        return (
          xe === !1 ||
            (Ae(xe)
              ? (ke = xe({ ...Ge, isLoading: ie }))
              : w.isValidElement(xe)
                ? (ke = w.cloneElement(xe, Ge))
                : ie
                  ? (ke = An.spinner())
                  : ((Dt) => Dt in An)(ue) && (ke = An[ue](Ge))),
          ke
        );
      })(t),
      se = !!b || !p,
      Se = { closeToast: _, type: j, theme: V };
    let Be = null;
    return (
      l === !1 ||
        (Be = Ae(l)
          ? l(Se)
          : w.isValidElement(l)
            ? w.cloneElement(l, Se)
            : (function (he) {
                let { closeToast: le, theme: ue, ariaLabel: ie = "close" } = he;
                return Z.createElement(
                  "button",
                  {
                    className: `Toastify__close-button Toastify__close-button--${ue}`,
                    type: "button",
                    onClick: (xe) => {
                      (xe.stopPropagation(), le(xe));
                    },
                    "aria-label": ie,
                  },
                  Z.createElement(
                    "svg",
                    { "aria-hidden": "true", viewBox: "0 0 14 16" },
                    Z.createElement("path", {
                      fillRule: "evenodd",
                      d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z",
                    }),
                  ),
                );
              })(Se)),
      Z.createElement(
        D,
        {
          isIn: v,
          done: g,
          position: E,
          preventExitTransition: i,
          nodeRef: r,
          playToast: c,
        },
        Z.createElement(
          "div",
          {
            id: f,
            onClick: y,
            "data-in": v,
            className: ee,
            ...a,
            style: S,
            ref: r,
          },
          Z.createElement(
            "div",
            {
              ...(v && { role: U }),
              className: Ae(R) ? R({ type: j }) : rt("Toastify__toast-body", R),
              style: O,
            },
            X != null &&
              Z.createElement(
                "div",
                {
                  className: rt("Toastify__toast-icon", {
                    "Toastify--animate-icon Toastify__zoom-enter": !C,
                  }),
                },
                X,
              ),
            Z.createElement("div", null, h),
          ),
          Be,
          Z.createElement(kd, {
            ...(F && !se ? { key: `pb-${F}` } : {}),
            rtl: m,
            theme: V,
            delay: p,
            isRunning: e,
            isIn: v,
            closeToast: _,
            hide: N,
            type: j,
            style: A,
            className: L,
            controlledProgress: se,
            progress: b || 0,
          }),
        ),
      )
    );
  },
  en = function (t, e) {
    return (
      e === void 0 && (e = !1),
      {
        enter: `Toastify--animate Toastify__${t}-enter`,
        exit: `Toastify--animate Toastify__${t}-exit`,
        appendPosition: e,
      }
    );
  };
Zs(en("bounce", !0));
const Bd = Zs(en("slide", !0));
Zs(en("zoom"));
Zs(en("flip"));
const Ud = {
  position: "bottom-left",
  transition: Bd,
  rtl: !1,
  autoClose: 3e3,
  hideProgressBar: !0,
  closeButton: !0,
  pauseOnHover: !0,
  pauseOnFocusLoss: !0,
  closeOnClick: !0,
  newestOnTop: !1,
  draggable: !0,
  draggablePercent: 80,
  draggableDirection: "x",
  role: "alert",
  theme: "light",
};
function Vd(t) {
  let e = { ...Ud, ...t };
  const i = t.stacked,
    [r, a] = w.useState(!0),
    c = w.useRef(null),
    { getToastToRender: l, isToastActive: h, count: p } = Ld(e),
    { className: y, style: j, rtl: N, containerId: _ } = e;
  function D(T) {
    const S = rt(
      "Toastify__toast-container",
      `Toastify__toast-container--${T}`,
      { "Toastify__toast-container--rtl": N },
    );
    return Ae(y)
      ? y({ position: T, rtl: N, defaultClassName: S })
      : rt(S, Ds(y));
  }
  function E() {
    i && (a(!0), B.play());
  }
  return (
    Fd(() => {
      if (i) {
        var T;
        const S = c.current.querySelectorAll('[data-in="true"]'),
          R = 12,
          O = (T = e.position) == null ? void 0 : T.includes("top");
        let L = 0,
          A = 0;
        Array.from(S)
          .reverse()
          .forEach((F, U) => {
            const b = F;
            (b.classList.add("Toastify__toast--stacked"),
              U > 0 && (b.dataset.collapsed = `${r}`),
              b.dataset.pos || (b.dataset.pos = O ? "top" : "bot"));
            const m = L * (r ? 0.2 : 1) + (r ? 0 : R * U);
            (b.style.setProperty("--y", `${O ? m : -1 * m}px`),
              b.style.setProperty("--g", `${R}`),
              b.style.setProperty("--s", "" + (1 - (r ? A : 0))),
              (L += b.offsetHeight),
              (A += 0.025));
          });
      }
    }, [r, p, i]),
    Z.createElement(
      "div",
      {
        ref: c,
        className: "Toastify",
        id: _,
        onMouseEnter: () => {
          i && (a(!1), B.pause());
        },
        onMouseLeave: E,
      },
      l((T, S) => {
        const R = S.length ? { ...j } : { ...j, pointerEvents: "none" };
        return Z.createElement(
          "div",
          { className: D(T), style: R, key: `container-${T}` },
          S.map((O) => {
            let { content: L, props: A } = O;
            return Z.createElement(
              Md,
              {
                ...A,
                stacked: i,
                collapseAll: E,
                isIn: h(A.toastId, A.containerId),
                style: A.style,
                key: `toast-${A.key}`,
              },
              L,
            );
          }),
        );
      }),
    )
  );
}
function Ya(t) {
  return fe({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z",
        },
        child: [],
      },
    ],
  })(t);
}
function es(t) {
  return fe({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z",
        },
        child: [],
      },
    ],
  })(t);
}
function $d(t) {
  return fe({
    attr: { viewBox: "0 0 384 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z",
        },
        child: [],
      },
    ],
  })(t);
}
function Hd(t) {
  return fe({
    attr: { viewBox: "0 0 384 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm65.18 216.01H224v80c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-80H94.82c-14.28 0-21.41-17.29-11.27-27.36l96.42-95.7c6.65-6.61 17.39-6.61 24.04 0l96.42 95.7c10.15 10.07 3.03 27.36-11.25 27.36zM377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z",
        },
        child: [],
      },
    ],
  })(t);
}
function Re(t) {
  return fe({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z",
        },
        child: [],
      },
    ],
  })(t);
}
function zd(t) {
  return fe({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z",
        },
        child: [],
      },
    ],
  })(t);
}
function Vs(t) {
  return fe({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z",
        },
        child: [],
      },
    ],
  })(t);
}
function Qa(t) {
  return fe({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z",
        },
        child: [],
      },
    ],
  })(t);
}
function be(t) {
  return fe({
    attr: { viewBox: "0 0 576 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z",
        },
        child: [],
      },
    ],
  })(t);
}
function Wd(t) {
  return fe({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z",
        },
        child: [],
      },
    ],
  })(t);
}
function Kn(t) {
  return fe({
    attr: { viewBox: "0 0 352 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z",
        },
        child: [],
      },
    ],
  })(t);
}
function qd(t) {
  return fe({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z",
        },
        child: [],
      },
    ],
  })(t);
}
function Gd(t) {
  return fe({
    attr: { viewBox: "0 0 640 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zm323-128.4l-27.8-28.1c-4.6-4.7-12.1-4.7-16.8-.1l-104.8 104-45.5-45.8c-4.6-4.7-12.1-4.7-16.8-.1l-28.1 27.9c-4.7 4.6-4.7 12.1-.1 16.8l81.7 82.3c4.6 4.7 12.1 4.7 16.8.1l141.3-140.2c4.6-4.7 4.7-12.2.1-16.8z",
        },
        child: [],
      },
    ],
  })(t);
}
function Jd(t) {
  return fe({
    attr: { viewBox: "0 0 640 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z",
        },
        child: [],
      },
    ],
  })(t);
}
const Za = w.createContext(),
  Kd = ({ children: t }) => {
    const [e, i] = w.useState(!1),
      [r, a] = w.useState({ x: scrollX, y: scrollY }),
      [c, l] = w.useState(!1),
      [h, p] = w.useState(0),
      [y, j] = w.useState(Number(new Date())),
      [N, _] = w.useState(Fs.heroBg),
      [D, E] = w.useState(""),
      [T, S] = w.useState({}),
      [R, O] = w.useState([]),
      [L, A] = w.useState([]),
      [F, U] = w.useState(""),
      [b, m] = w.useState({}),
      [f, g] = w.useState();
    async function v() {
      var C, x, V, K, ee;
      try {
        const X = await $.get("/auth/profile");
        S(X.data);
        const se = await $.get("/auth/profile/verification");
        m(se.data);
      } catch (X) {
        console.error(X);
      } finally {
        try {
          const X = await $.get("/listings");
          O(X.data);
        } catch (X) {
          B.error(
            ((x =
              (C = X == null ? void 0 : X.response) == null
                ? void 0
                : C.data) == null
              ? void 0
              : x.message) ||
              ((ee =
                (K =
                  (V = X == null ? void 0 : X.response) == null
                    ? void 0
                    : V.data) == null
                  ? void 0
                  : K.error) == null
                ? void 0
                : ee.message) ||
              "Something went wrong",
            { autoClose: !1 },
          );
        }
      }
    }
    return (
      w.useEffect(() => {
        ((onscroll = () => {
          (i(!0),
            (onscroll = () => {
              setTimeout(() => {
                a({ x: scrollX, y: scrollY });
              }, 0);
            }));
        }),
          v(),
          !e &&
            setTimeout(() => {
              location.pathname == "/" &&
                scrollY == 0 &&
                (scroll({ top: 200, behavior: "smooth" }),
                setTimeout(() => {
                  scroll({ top: 0, behavior: "smooth" });
                }, 1200));
            }, 5e3));
      }, []),
      s.jsxs(Za.Provider, {
        value: {
          didScroll: e,
          setDidScroll: i,
          scrollData: r,
          isLooking: c,
          setIsLooking: l,
          toPop: h,
          setToPop: p,
          twitch: y,
          setTwitch: j,
          hero: N,
          title: D,
          setTitle: E,
          user: T,
          setUser: S,
          someList: L,
          setSomeList: A,
          listings: R,
          setListings: O,
          modal: F,
          setModal: U,
          verification: b,
          setVerification: m,
          fetchSrc: v,
          modalTitle: f,
          setModalTitle: g,
        },
        children: [
          t,
          s.jsxs(s.Fragment, {
            children: [
              s.jsx("a", { id: "url-mounter", href: "" }),
              F &&
                s.jsx("div", {
                  className: "d-flex",
                  style: {
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "#c2c2c2ab",
                    zIndex: 1e4,
                  },
                  onClick: () => U("") || g(""),
                  children: s.jsxs("div", {
                    className:
                      "rounded m-auto p-2 d-flex slideUp flex-column themebg",
                    onClick: (C) => C.stopPropagation(),
                    style: { maxWidth: "98vw", maxHeight: "98vh" },
                    children: [
                      s.jsxs("div", {
                        className: "d-flex pb-2",
                        children: [
                          s.jsx("div", {
                            className: " text-light",
                            children: f,
                          }),
                          s.jsx("button", {
                            className:
                              "active ms-auto fs-6 p-0 px-2 my-auto rounded",
                            onClick: () => U("") || g(),
                            children: s.jsx(Kn, { className: "icon" }),
                          }),
                        ],
                      }),
                      s.jsx("div", {
                        className: "rounded row mx-auto g-0",
                        style: {
                          minWidth: "25vw",
                          minHeight: "30vh",
                          backgroundColor: "#121b27ff",
                        },
                        children: F,
                      }),
                    ],
                  }),
                }),
            ],
          }),
        ],
      })
    );
  },
  Pe = () => w.useContext(Za),
  Xn = (t) => {
    const [e, i] = w.useState(t.hasPop),
      { user: r } = Pe();
    return s.jsxs("div", {
      className: !(t != null && t.hov) && "sticky-top",
      children: [
        e &&
          s.jsx("nav", {
            className: "navbar text-light custom-navmenu themebg pt-0 growIn",
            onClick: () => i((a) => !a),
            children: s.jsxs("div", {
              className: "container py-4 ",
              children: [
                s.jsx("div", {
                  className: "col-lg-4 mb-3 mb-md-0 small",
                  children:
                    "We are committed to leveraging technology to remove unnecessary middlemen, reduce costs, and create a level playing field for both seasoned investors and first-time buyers.",
                }),
                s.jsxs("div", {
                  className: "ms-auto me-auto me-md-2",
                  children: [
                    s.jsx(q, {
                      to: "/search",
                      className: "me-1 mb-1 mb-md-0 subnav-btn rounded btn",
                      onClick: () => window.scroll({ top: 0 }),
                      children: "Search for Housing & Land",
                    }),
                    s.jsx(q, {
                      to: "/about-us",
                      className: "me-1 mb-1 mb-md-0 subnav-btn rounded btn",
                      children: "About Us",
                    }),
                    s.jsx(q, {
                      to: "/contact-us",
                      className: "me-1 mb-1 mb-md-0 subnav-btn rounded btn",
                      children: "Contact",
                    }),
                    s.jsx(q, {
                      to:
                        r != null && r.email
                          ? "/auth/user-profile"
                          : "/auth/login",
                      className: "me-1 mb-1 mb-md-0 subnav-btn rounded btn",
                      children: r != null && r.email ? "Profile" : "Login",
                    }),
                  ],
                }),
              ],
            }),
          }),
        s.jsx("nav", {
          className: `navbar slideIn custom-navbar pt-0 ${t.hasBg ? "text-light dd" : "bg-light"} shadow-sm`,
          style: {
            background: (t == null ? void 0 : t.trans) && "#efefef20",
            color: (t == null ? void 0 : t.trans) && "#efefef !important",
          },
          children: s.jsxs("div", {
            className: "container py-2 pb-2 px-2",
            children: [
              s.jsx("h2", {
                className: "m-0",
                children: s.jsxs(q, {
                  to: "/",
                  className: "d-flex no-dec ",
                  onClick: () => window.scroll({ top: 0 }),
                  children: [
                    s.jsx(ae.LazyLoadImage, {
                      src: Fs.logoSm,
                      effect: "opacity",
                      alt: "Landhome Logo",
                      about: "Landhome Logo",
                      height: (t != null && t.hasBg, "50px"),
                      className: "rounded my-auto",
                    }),
                    s.jsxs("div", {
                      className: "ps-3",
                      children: [
                        s.jsx("div", {
                          className: `fs-5 ${t.hasBg ? "text-light" : "themetxt"}`,
                          style: { position: "relative", top: "5px" },
                          children: "Landhome",
                        }),
                        s.jsx("div", {
                          className: `pt-2 ${t != null && t.hasBg ? "text-light" : "text-dark"}`,
                          children: s.jsx("div", {
                            style: {
                              fontSize: ".7rem",
                              maxWidth:
                                window.innerWidth > 900 ? "30vw" : "50vw",
                            },
                            children:
                              "Your sustainable solution for finding Housing & Land assets in Nigeria",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              !e &&
                s.jsxs("div", {
                  className:
                    "ms-auto me-2 pt-1 d-none d-lg-block nav-links small",
                  children: [
                    s.jsx(q, {
                      to: "/search",
                      className: `me-1 rounded btn ${t != null && t.hasBg ? "text-light shadow-sm acbg" : "text-dark"}`,
                      onClick: () => window.scroll({ top: 0 }),
                      children: "Search for Housing & Land",
                    }),
                    s.jsx(q, {
                      to: "/about-us",
                      className: `me-1 rounded btn ${t != null && t.hasBg ? "text-light shadow-sm acbg" : "text-dark"}`,
                      children: "About Us",
                    }),
                    s.jsx(q, {
                      to: "/contact-us",
                      className: `me-1 rounded btn ${t != null && t.hasBg ? "text-light shadow-sm acbg" : "text-dark"}`,
                      children: "Contact",
                    }),
                    s.jsx(q, {
                      to:
                        r != null && r.email
                          ? "/auth/user-profile"
                          : "/auth/login",
                      className: `me-1 rounded btn ${t != null && t.hasBg ? "text-light shadow-sm acbg" : "text-dark"}`,
                      children: s.jsxs("div", {
                        className: "d-flex fs-6",
                        children: [
                          s.jsx("span", {
                            className: "my-auto small",
                            children:
                              r != null && r.email ? "Profile" : "Login",
                          }),
                          (r == null ? void 0 : r.email) &&
                            s.jsx("img", {
                              src: "" + r.profileicon,
                              alt: "",
                              className: "rounded-circle ms-2 my-auto",
                              style: {
                                width: "20px",
                                height: "20px",
                                position: "relative",
                                bottom: "",
                              },
                            }),
                        ],
                      }),
                    }),
                  ],
                }),
              s.jsx("a", {
                className: `burger ${e && "active"} ${(t == null ? void 0 : t.hasBg) && "text-light"} d-lg-none`,
                "data-bs-toggle": "collapse",
                "data-bs-target": "#main-navbar",
                onClick: () => {
                  i((a) => !a);
                },
                children: s.jsx("span", {}),
              }),
            ],
          }),
        }),
      ],
    });
  };
function Xd() {
  const [t, e] = w.useState(""),
    [i, r] = w.useState(""),
    a = Le(),
    c = (l) => {
      l.preventDefault();
      const h = "?q=" + t + "&state=" + i;
      a("/search" + h);
    };
  return s.jsx("div", {
    className: "d-flex justify-content-center align-items-center  p-4",
    style: {},
    children: s.jsx("form", {
      className: "p-4 rounded-4 shadow w-100 shadow-lg",
      style: { maxWidth: "80rem", backgroundColor: "#56805257" },
      onSubmit: c,
      children: s.jsxs("div", {
        className: "d-flex flex-column flex-md-row align-items-center gap-3",
        children: [
          s.jsxs("div", {
            className: "position-relative flex-grow-1 w-100 w-md-auto",
            children: [
              s.jsx("input", {
                type: "text",
                className: "form-control ps-5 pe-3 py-3 rounded-4 shadow-sm",
                placeholder: "Search by Type, Location, Size...",
                value: t,
                onChange: (l) => e(l.target.value),
              }),
              s.jsx("div", {
                className:
                  "position-absolute top-50 start-0 translate-middle-y ps-3 text-secondary",
                children: s.jsxs("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: "lucide lucide-search",
                  children: [
                    s.jsx("circle", { cx: "11", cy: "11", r: "8" }),
                    s.jsx("path", { d: "m21 21-4.3-4.3" }),
                  ],
                }),
              }),
            ],
          }),
          s.jsx("button", {
            className:
              "btn themebg text-light w-100 w-md-auto px-4 py-3 fw-semibold rounded-4 shadow",
            type: "button",
            style: { maxWidth: "100px" },
            children: "Search",
          }),
        ],
      }),
    }),
  });
}
const Yd = () => {
    const { scrollData: t, listings: e } = Pe();
    return (
      w.useEffect(() => {
        document.title =
          "Find, buy, and rent land and housing in a fast-changing digital era - Landhome";
      }, []),
      s.jsxs("div", {
        className: "index-page",
        children: [
          s.jsx("div", {
            className: "fixed-top",
            children:
              t.y < 510
                ? s.jsx("div", {
                    className: "slideIn",
                    children: s.jsx(Xn, { trans: !0, hasBg: !0 }),
                  })
                : s.jsx(Xn, {}),
          }),
          s.jsx("main", {
            className: "main",
            children: s.jsx("section", {
              id: "hero",
              className: " section dark-background my-0 py-0",
              children: s.jsx("div", {
                className: "container pt-5 pb-3",
                "data-aos": "zoom-out",
                children: s.jsx("div", {
                  className: "ps-2 ps-md-3 ps-lg-0 ms-lg-0",
                  children: s.jsx("div", {
                    className: "row justify-content-center",
                    children: s.jsxs("div", {
                      className: "col-lg-12 d-flex flex-column",
                      children: [
                        s.jsx("h1", {
                          className: "slideUp fw-bold mt-5 pt-5 h2 text-center",
                          children:
                            "Find Housing & Land assets for sale/rental in Nigeria",
                        }),
                        s.jsxs("p", {
                          className: "fs-6 col-11 col-md-9 mx-auto",
                          children: [
                            s.jsx(Rn, {
                              delay: 100,
                              children: s.jsxs("div", {
                                className: "slideUp small text-center pt-2",
                                children: [
                                  "Your sustainable solution for finding Housing & Land assets in Nigeria",
                                  s.jsx("br", {}),
                                  s.jsx("br", {}),
                                ],
                              }),
                            }),
                            s.jsx(Rn, {
                              delay: 200,
                              children: s.jsx("div", {
                                className: "slideUp",
                                children: s.jsx(Xd, {}),
                              }),
                            }),
                          ],
                        }),
                        s.jsx("div", {
                          className: "social-links mx-auto text-light slideUp",
                          children: s.jsx(Rn, {
                            inline: !0,
                            delay: 1900,
                            children: s.jsx("a", {
                              className: "slideRight fs-5 ms-3",
                              target: "_blank",
                              href: "mailto:sirgbemziho@gmail.com",
                              children: s.jsx(ja, {}),
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
              }),
            }),
          }),
          s.jsx("section", {
            id: "services",
            className: " py-5 section services",
            children: s.jsx("div", {
              className: "container  py-0",
              style: { position: "relative", top: "-50px" },
              children: s.jsx("div", {
                className: "mt-5 px-md-5 mb-5",
                children: s.jsx("div", {
                  className: " row",
                  children: e.map((i) =>
                    s.jsx(
                      q,
                      {
                        to: `/listed/${i.id}`,
                        className:
                          "no-dec text-dark col-12 col-sm-6 col-md-4 mt-4",
                        children: s.jsxs("div", {
                          className:
                            "hovShade shadow rounded d-flex  flex-column w-100",
                          children: [
                            s.jsxs("div", {
                              className: "w-100 row mx-auto g-0",
                              children: [
                                s.jsxs("div", {
                                  className: "small",
                                  style: { position: "absolute" },
                                  children: [
                                    i.heldUp &&
                                      !i.sold &&
                                      s.jsxs("button", {
                                        className:
                                          "mb-1 btn text-light themebg",
                                        onClick: (r) => {
                                          (r.stopPropagation(),
                                            toast.info(
                                              `This is probably because ${theUser.name} has been contacted over the listing, you can still contact ${(theUser == null ? void 0 : theUser.gender) == "male" ? "him" : "her"} as the listing has not been sold out`,
                                            ));
                                        },
                                        children: [
                                          s.jsx(Re, { className: "icon" }),
                                          " This Listing has been held up by the owner",
                                        ],
                                      }),
                                    i.sold &&
                                      s.jsxs("button", {
                                        className:
                                          "mb-1 btn text-light btn-primary",
                                        onClick: (r) => {
                                          (r.stopPropagation(),
                                            toast.info(
                                              `This listing has been sold out. you are seen this because ${theUser == null ? void 0 : theUser.name} marked this listing as sold`,
                                            ));
                                        },
                                        children: [
                                          s.jsx(Re, { className: "icon" }),
                                          " This listing has been sold out",
                                        ],
                                      }),
                                  ],
                                }),
                                (() => {
                                  var a, c, l, h;
                                  return (
                                    ((a = i.images[0]) == null
                                      ? void 0
                                      : a.type) || ""
                                  ).startsWith("image") &&
                                    ((c = i.images[0]) == null
                                      ? void 0
                                      : c.type)
                                    ? s.jsx(ae.LazyLoadImage, {
                                        effect: "opacity",
                                        className:
                                          "img-fluid  w-100  rounded col-12",
                                        placeholderSrc: "/images/default.png",
                                        src:
                                          ((l = i.images[0]) == null
                                            ? void 0
                                            : l.url) || "/images/default.png",
                                        style: {
                                          height: "200px",
                                          minHeight: "200px",
                                          maxHeight: "200px",
                                          objectFit: "cover",
                                          minWidth: "100%",
                                        },
                                        alt: i.name,
                                      })
                                    : s.jsx(s.Fragment, {
                                        children: s.jsx("video", {
                                          effect: "opacity",
                                          className:
                                            "img-fluid  w-100  rounded col-12",
                                          placeholderSrc: "/images/default.png",
                                          src:
                                            ((h = i.images[0]) == null
                                              ? void 0
                                              : h.url) || "/images/default.png",
                                          style: {
                                            height: "200px",
                                            minHeight: "200px",
                                            maxHeight: "200px",
                                            objectFit: "cover",
                                            minWidth: "100%",
                                          },
                                          alt: i.name,
                                        }),
                                      });
                                })(),
                              ],
                            }),
                            s.jsxs("div", {
                              className: "p-3",
                              children: [
                                s.jsx("h4", {
                                  className: "h5 mb-2",
                                  children: i.name,
                                }),
                                s.jsxs("p", {
                                  className: "small mb-0 text-muted",
                                  children: [i.reigion, ", ", i.state],
                                }),
                                s.jsx("div", {
                                  className:
                                    "d-flex justify-content-between align-items-center",
                                  children: s.jsxs("div", {
                                    className: "fw-bold",
                                    children: [
                                      "NGN ",
                                      i.price.toLocaleString(),
                                    ],
                                  }),
                                }),
                                s.jsxs("div", {
                                  className: "d-flex",
                                  children: [
                                    i.verified &&
                                      s.jsxs("div", {
                                        className:
                                          "rounded small me-1 px-2 my-auto",
                                        style: {
                                          backgroundColor: "#D4AF37",
                                          maxWidth: "fit-content",
                                        },
                                        children: [
                                          s.jsx(be, {
                                            className: "icon",
                                            style: { color: "#ffe479ff" },
                                          }),
                                          " ",
                                          "Verified",
                                        ],
                                      }),
                                    s.jsx("div", {
                                      className:
                                        "rounded text-light small px-2 my-auto",
                                      style: {
                                        backgroundColor:
                                          i.type == "rental"
                                            ? "#0056a7a4"
                                            : "#3d8f1c",
                                        maxWidth: "fit-content",
                                      },
                                      children: i.type,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      },
                      i.id,
                    ),
                  ),
                }),
              }),
            }),
          }),
        ],
      })
    );
  },
  Qd = ae.trackWindowScroll(Yd),
  Rn = ({ delay: t, children: e, inline: i }) => {
    const [r, a] = w.useState(!1);
    return (
      w.useEffect(() => {
        setTimeout(() => {
          a(!0);
        }, t || 700);
      }, []),
      r
        ? e
        : s.jsx("div", {
            className: i ? "d-inline" : "",
            style: { opacity: 0 },
            children: e,
          })
    );
  },
  ge = ({ delay: t, children: e, inline: i }) => {
    const [r, a] = w.useState(t == 0);
    return (
      w.useEffect(() => {
        setTimeout(() => {
          a(!0);
        }, t || 700);
      }, []),
      r
        ? e
        : s.jsx("div", {
            className: i ? "d-inline" : "",
            style: { opacity: 0 },
            children: e,
          })
    );
  },
  Zd = () => {
    const { setTitle: t } = Pe();
    return (
      w.useEffect(() => {
        (scroll({ top: 0 }), (document.title = "About Us - Landhome"));
      }, []),
      s.jsx("section", {
        id: "about",
        className: "py-5 pt-3 section services",
        children: s.jsx("div", {
          className: "container",
          children: s.jsxs("div", {
            className: "mb-4 px-md-5",
            children: [
              s.jsx("h2", {
                className: "h2 heading mb-4 slideUp",
                children: "About Us",
              }),
              s.jsxs("div", {
                className: "row",
                children: [
                  s.jsx(ge, {
                    delay: 150,
                    children: s.jsx("div", {
                      className: "px-md-3 pb-3 slideUp",
                      children:
                        "Landhome was founded with a simple but ambitious idea to redefine how people find, buy, and rent land and housing in a fast-changing digital era. Real estate is often the most important investment people make, and yet for many, the process remains complicated, expensive, and filled with uncertainty. We are here to change that.",
                    }),
                  }),
                  s.jsx("div", {
                    className: "col-md-6",
                    children: s.jsxs("div", {
                      className: "pe-md-2",
                      children: [
                        s.jsx(ge, {
                          delay: 500,
                          children: s.jsxs("div", {
                            className: "slideUp",
                            children: [
                              s.jsx("h4", {
                                className: "fw-bold mb-3",
                                children: "Our Vision",
                              }),
                              s.jsx("p", {
                                children:
                                  "To become the most trusted and accessible digital marketplace for land and housing, empowering individuals and communities to confidently find, buy, and rent properties with ease. Our vision is centered on breaking barriers to property ownership and making the real estate market transparent and inclusive for all.",
                              }),
                              s.jsx("p", {
                                children:
                                  "Our vision is to break barriers to property ownership by making real estate transparent, inclusive, and accessible. Through innovation, we create opportunities for both first-time buyers and investors, strengthening communities and driving sustainable growth.",
                              }),
                            ],
                          }),
                        }),
                        s.jsx("br", {}),
                        s.jsx(ge, {
                          delay: 800,
                          children: s.jsx("div", {
                            className: "slideUp",
                            children: s.jsx(ae.LazyLoadImage, {
                              effect: "opacity",
                              className: "img-fluid acbg rounded shadow",
                              placeholderSrc: "/images/deal.png",
                              src: "/images/default.png",
                              alt: "Landhome Vision",
                            }),
                          }),
                        }),
                      ],
                    }),
                  }),
                  s.jsx("div", {
                    className: "col-md-6",
                    children: s.jsxs("div", {
                      className: "ps-md-2",
                      children: [
                        s.jsx(ge, {
                          children: s.jsxs("div", {
                            className: "slideUp",
                            children: [
                              s.jsx("h4", {
                                className: "fw-bold mb-3",
                                children: "Our Mission",
                              }),
                              s.jsx("p", {
                                children:
                                  "Our mission is to simplify property transactions by building a transparent, user-friendly platform where property owners can seamlessly list their lands and homes, buyers and renters can connect directly, and every interaction fosters trust, affordability, and sustainable growth in the real estate sector.",
                              }),
                              s.jsx(ge, {
                                delay: 600,
                                children: s.jsx("div", {
                                  className: "mb-3 slideUp",
                                  children: s.jsx(ae.LazyLoadImage, {
                                    effect: "opacity",
                                    className: "img-fluid acbg rounded shadow",
                                    placeholderSrc: "/images/default.png",
                                    src: "/images/default.png",
                                    alt: "Landhome Mission",
                                  }),
                                }),
                              }),
                              s.jsx(ge, {
                                delay: 800,
                                children: s.jsx("p", {
                                  children:
                                    "We are committed to leveraging technology to remove unnecessary middlemen, reduce costs, and create a level playing field for both seasoned investors and first-time buyers. Every feature on our platform is designed with one goal in mind: to give users confidence, clarity, and control in their property journey.",
                                }),
                              }),
                            ],
                          }),
                        }),
                        s.jsx("br", {}),
                      ],
                    }),
                  }),
                  s.jsx("div", {
                    className: "col-12 mt-4",
                    children: s.jsx(ge, {
                      delay: 1e3,
                      children: s.jsxs("div", {
                        className: "slideUp",
                        children: [
                          s.jsx("h4", {
                            className: "fw-bold mb-3",
                            children: "Our Commitment",
                          }),
                          s.jsx("p", {
                            children:
                              "At Landhome, our commitment goes beyond transactions. We believe in building stronger communities by making land and housing accessible to everyone. Transparency, integrity, and innovation guide every decision we make, from how we design our platform to how we support our users. Whether you are searching for your first home, investing in land, or securing a rental, we are here to make the process seamless and trustworthy.",
                          }),
                          s.jsx("p", {
                            children:
                              "Welcome to Landhome where opportunities meet trust, and the future of real estate becomes simpler, smarter, and more accessible for all.",
                          }),
                        ],
                      }),
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      })
    );
  },
  eh = () => {
    const { setTitle: t } = Pe();
    return (
      w.useEffect(() => {
        (scroll({ top: 0 }), t("Some  Other Project"));
      }, []),
      s.jsx("section", {
        id: "services",
        className: "py-5 pt-3 section services",
        children: s.jsx("div", {
          className: "container",
          children: s.jsxs("div", {
            className: "mb-4 px-md-5",
            children: [
              s.jsx("h2", {
                className: "h2 heading mb-4 slideUp",
                children: "Some Other Project",
              }),
              s.jsx(ge, {
                delay: 120,
                children: s.jsx("div", {
                  className: "slideUp",
                  children:
                    "Landhome Farm, nestled in the heart of Nigeria, has embarked on an innovative greenhouse project aimed at revolutionizing agriculture in the region. This ambitious initiative combines traditional farming practices with cutting-edge technology to create a sustainable and efficient growing environment. The greenhouse project encompasses a range of structures equipped with climate control systems, irrigation methods, and nutrient delivery systems to optimize plant growth and maximize yield.",
                }),
              }),
              s.jsxs("div", {
                className: "row mt-3",
                children: [
                  s.jsx("div", {
                    className: "col-md-6",
                    children: s.jsxs("div", {
                      className: "pe-md-2",
                      children: [
                        s.jsx(ge, {
                          delay: 500,
                          children: s.jsxs("div", {
                            className: "slideUp",
                            children: [
                              "By harnessing natural sunlight and regulating temperature and humidity levels, these greenhouses provide an ideal environment for cultivating a variety of crops year-round, regardless of external weather conditions. From tomatoes and peppers to cucumbers and leafy greens, Landhome’s greenhouse project diversifies crop production and ensures a consistent and reliable food supply for local communities.",
                              s.jsx("div", { className: "mt-3" }),
                              "Moreover, the greenhouse project at Landhome Farm is not only about increasing agricultural productivity but also about promoting environmental sustainability. By utilizing advanced irrigation techniques such as drip irrigation and capturing rainwater for reuse, the project minimizes water waste and reduces reliance on traditional irrigation methods.",
                            ],
                          }),
                        }),
                        s.jsx("br", {}),
                        s.jsx(ge, {
                          delay: 600,
                          children: s.jsx("div", {
                            className: "",
                            children: s.jsx(ae.LazyLoadImage, {
                              effect: "opacity",
                              className: "img-fluid acbg rounded shadow",
                              placeholderSrc: "/images/default.png",
                              src: Fs.greenHouseProject1,
                              alt: "",
                            }),
                          }),
                        }),
                        s.jsx("br", {}),
                      ],
                    }),
                  }),
                  s.jsx("div", {
                    className: "col-md-6",
                    children: s.jsxs("div", {
                      className: "ps-md-2",
                      children: [
                        s.jsx(ge, {
                          delay: 750,
                          children: s.jsx("div", {
                            className: "mb-3 slideUp",
                            children: s.jsx(ae.LazyLoadImage, {
                              effect: "opacity",
                              className: "img-fluid acbg rounded shadow",
                              placeholderSrc: "/images/default.png",
                              src: Fs.greenHouseProject2,
                              alt: "",
                            }),
                          }),
                        }),
                        s.jsx("br", {}),
                        s.jsx(ge, {
                          delay: 800,
                          children: s.jsxs("div", {
                            className: "slideUp",
                            children: [
                              "Additionally, integrated pest management strategies and organic farming practices are employed to minimize the use of pesticides and herbicides, ensuring that crops are grown in a healthy and eco-friendly manner. This commitment to sustainability extends beyond production methods to include energy-efficient technologies and waste management practices, further reducing the farm’s carbon footprint and environmental impact.",
                              s.jsx("div", { className: "mt-3" }),
                              "Furthermore, the greenhouse project at Landhome Farm represents a significant investment in the local economy, creating jobs, and stimulating economic growth in the region. Through training and employment opportunities, local residents are empowered to participate in the agricultural sector and contribute to the success of the greenhouse project.",
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              s.jsx("div", {
                className: "mt-3",
                children:
                  "Additionally, by producing high-quality crops year-round, Landhome enhances food security and reduces reliance on imported goods, strengthening Nigeria’s agricultural sector and fostering self-sufficiency. As a result, the greenhouse project at Landhome Farm not only transforms the agricultural landscape but also serves as a model for sustainable development and economic empowerment in Nigeria and beyond.",
              }),
              s.jsx("div", {
                className: "mt-3",
                children:
                  "The greenhouse project at Landhome Farm in Nigeria offers numerous advantages to farm production, contributing to agricultural sustainability, productivity, and economic development:",
              }),
              s.jsx("div", {
                className: "row",
                children: Jo.map((e, i) =>
                  s.jsx(ge, {
                    delay: (i + 1) * 100,
                    children: s.jsx(
                      "div",
                      {
                        className: "col-12 col-md-6 col-xl-4 mt-4 slideUp",
                        children: s.jsxs("div", {
                          className: "hovShade shadow h-100",
                          children: [
                            s.jsx("h4", {
                              className: "h4 mb-2",
                              children: e.title,
                            }),
                            s.jsx("p", { children: e.body }),
                          ],
                        }),
                      },
                      e.title,
                    ),
                  }),
                ),
              }),
            ],
          }),
        }),
      })
    );
  };
function th(t) {
  return fe({
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "path",
        attr: {
          fill: "none",
          strokeWidth: "2",
          d: "M5,12 C3.343,12 2,10.657 2,9 C2,7.343 3.343,6 5,6 C6.657,6 8,7.343 8,9 C8,10.657 6.657,12 5,12 Z M9,18 L9,16 C9,13.7504 7.2128,12 4.964,12 L5.0184,12 C2.7688,12 1,13.7504 1,16 L1,18 M12,7 L24,7 M12,17 L22,17 M12,12 L19,12",
        },
        child: [],
      },
    ],
  })(t);
}
const sh = () => {
    const { setTitle: t } = Pe();
    return (
      w.useEffect(() => {
        (scroll({ top: 0 }), (document.title = "Contact Us - Landhome"));
      }, []),
      s.jsx("section", {
        id: "services",
        className: "py-5 pt-3 section services",
        children: s.jsx("div", {
          className: "container",
          children: s.jsxs("div", {
            className: "mb-4 px-md-5",
            children: [
              s.jsx("h2", {
                className: "h2 heading mb-2 mt-3 slideUp",
                children: "Contact Us",
              }),
              s.jsx(ge, {
                delay: 100,
                children: s.jsx("div", {
                  className: "mb-4 fs-5 slideUp",
                  children:
                    "Get in touch with us today, we are here to answer your questions and guide you on your property journey.",
                }),
              }),
              s.jsxs("div", {
                className: "row",
                children: [
                  s.jsxs("div", {
                    className: "col-md-6",
                    children: [
                      s.jsx(ge, {
                        delay: 300,
                        children: s.jsxs("div", {
                          className: "mb-4 slideRight",
                          children: [
                            s.jsxs("h6", {
                              children: [
                                s.jsx(la, { className: "icon" }),
                                " Address:",
                              ],
                            }),
                            s.jsx("h5", {
                              className: "mb-1",
                              children:
                                "Plot 40, Beside Devine Progressive College Gboko West along Gboko college of Education way, Gboko West Benue state, Nigeria.",
                            }),
                          ],
                        }),
                      }),
                      s.jsx(ge, {
                        delay: 500,
                        children: s.jsxs("div", {
                          className: "mb-2 slideRight ",
                          children: [
                            s.jsxs("h6", {
                              className: "mb-1",
                              children: [
                                s.jsx(th, { className: "icon fs-4" }),
                                " Contact:",
                              ],
                            }),
                            s.jsxs("h5", {
                              children: [
                                "+234 906 791 2440",
                                s.jsx("br", {}),
                                s.jsx("br", {}),
                                "sirgbemziho@gmail.com",
                                s.jsx("br", {}),
                                "sirgbemziho@gmail.com",
                                s.jsx("br", {}),
                              ],
                            }),
                          ],
                        }),
                      }),
                      s.jsx("div", {
                        className: "social-links slideUp text-dark",
                        children: s.jsx(ge, {
                          inline: !0,
                          delay: 1e3,
                          children: s.jsx("a", {
                            className: "slideRight fs-4",
                            target: "_blank",
                            href: "mailto:sirgbemziho@gmail.com",
                            children: s.jsx(ja, {}),
                          }),
                        }),
                      }),
                    ],
                  }),
                  s.jsx("div", {
                    className: "col-md-6 ",
                    children: s.jsx(ge, {
                      delay: 300,
                      preRender: !0,
                      children: s.jsx("iframe", {
                        src: "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1324.9489483656855!2d8.964534426982471!3d7.308800118606539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1758577442613!5m2!1sen!2sng",
                        className: "shadow-lg",
                        width: "100%",
                        height: "300",
                        style: {},
                        allowfullscreen: "",
                        loading: "lazy",
                        referrerpolicy: "no-referrer-when-downgrade",
                      }),
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      })
    );
  },
  nh = () => {
    const t = Rt(),
      e = Le();
    return (
      w.useEffect(() => {
        if (localStorage.access) return () => {};
        (t.pathname.includes("profile") && e("/auth/login"),
          t.pathname.includes("admin") && e("/auth/login"),
          t.pathname.includes("verif") && e("/auth/login"));
      }, [t.pathname]),
      s.jsxs("div", {
        className: "bg-white text-dark pb-5",
        children: [t.pathname.length > 2 && s.jsx(Xn, {}), s.jsx(Ul, {})],
      })
    );
  };
function ih(t) {
  return fe({
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM12 20c-4.411 0-8-3.589-8-8s3.567-8 7.953-8C16.391 4 20 7.589 20 12s-3.589 8-8 8z",
        },
        child: [],
      },
      { tag: "path", attr: { d: "M11 7h2v7h-2zm0 8h2v2h-2z" }, child: [] },
    ],
  })(t);
}
function cs(t) {
  return fe({
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z",
        },
        child: [],
      },
    ],
  })(t);
}
function ds(t) {
  return fe({
    attr: { viewBox: "0 0 24 24" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-1.641-1.359-3-3-3z",
        },
        child: [],
      },
      {
        tag: "path",
        attr: {
          d: "M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z",
        },
        child: [],
      },
    ],
  })(t);
}
const rh = () => {
  const [t, e] = w.useState({ email: "", password: "" }),
    [i, r] = w.useState(!1),
    a = ({ target: l }) => {
      e((h) => ({ ...h, [l.name]: l.value }));
    },
    c = async (l) => {
      var p, y, j, N;
      l.preventDefault();
      const h = B.loading("Logging in", { autoClose: !1 });
      try {
        const _ =
          (p = await $.post("/auth/login", t)) == null ? void 0 : p.data;
        ((localStorage.access = _.token),
          ($.defaults.headers.common.Authorization = "Bearer " + _.token));
        const D = localStorage == null ? void 0 : localStorage.returnTo;
        ((localStorage.returnTo = ""), location.replace(D || "/"));
      } catch (_) {
        B.error(
          `${((j = (y = _ == null ? void 0 : _.response) == null ? void 0 : y.data) == null ? void 0 : j.message) || ((N = _ == null ? void 0 : _.response) == null ? void 0 : N.data) || (_ == null ? void 0 : _.message)}`,
        );
      } finally {
        B.dismiss(h);
      }
    };
  return s.jsx("div", {
    className: "bg-light",
    children: s.jsx("div", {
      className: "container pt-5 pb-5 darkTheme ",
      children: s.jsx("div", {
        className: "row",
        children: s.jsxs("form", {
          onSubmit: c,
          className:
            "col-10 col-sm-9 col-md-7 col-lg-5 px-3 col-xl-4 shadow-lg panel rounded mx-auto slideUp",
          children: [
            s.jsx("div", {
              className: "d-flex",
              children: s.jsxs("h3", {
                className: "m-auto mt-3 d-flex",
                children: [
                  s.jsx(q, {
                    to: "/",
                    children: s.jsx(ae.LazyLoadImage, {
                      effect: "opacity",
                      className: "me-2 h-[] my-auto icon",
                      src: "/logo.png",
                      alt: "",
                      height: "40px",
                    }),
                  }),
                  s.jsx("span", {
                    className: "my-auto pb-3 themetxt",
                    children: " Login",
                  }),
                  " ",
                  s.jsx("br", {}),
                ],
              }),
            }),
            s.jsx("div", {
              className: "mb-3 mt-1 text-center text-dark",
              children: s.jsx("small", {
                className: "small ",
                children: "Login to yout landsmart account",
              }),
            }),
            s.jsx("div", {
              className: "form-group mb-3",
              children: s.jsx("input", {
                type: "email",
                className: "form-control border",
                name: "email",
                onChange: a,
                value: t.email,
                required: !0,
                placeholder: "Email",
              }),
            }),
            s.jsxs("div", {
              className: "form-group d-flex",
              children: [
                s.jsx("input", {
                  type: "password",
                  name: "password",
                  className: "form-control border",
                  onChange: a,
                  value: t.password,
                  required: !0,
                  id: "pass",
                  placeholder: "Password",
                }),
                s.jsx("div", {
                  type: "button",
                  className:
                    "border bg-none border-start-0  d-flex px-2 text-dark",
                  onClick: (l) => {
                    (l.preventDefault(), r((p) => !p));
                    const h = document.getElementById("pass");
                    (h.type == "password"
                      ? (h.type = "text")
                      : (h.type = "password"),
                      h.focus());
                  },
                  children: i
                    ? s.jsx(ds, { className: "m-auto" })
                    : s.jsx(cs, { className: "m-auto" }),
                }),
              ],
            }),
            s.jsx("div", {
              className: "py-2",
              children: s.jsx(q, {
                to: "/auth/create-account",
                className: "small py-3 p-0 m-0 themetxt",
                style: { fontSize: ".8em" },
                children: "Don't have an account? Create account!",
              }),
            }),
            s.jsx("button", {
              className: "btn mb-4  themebg text-light",
              style: {},
              children: "Sign in",
            }),
          ],
        }),
      }),
    }),
  });
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const eo = function (t) {
    const e = [];
    let i = 0;
    for (let r = 0; r < t.length; r++) {
      let a = t.charCodeAt(r);
      a < 128
        ? (e[i++] = a)
        : a < 2048
          ? ((e[i++] = (a >> 6) | 192), (e[i++] = (a & 63) | 128))
          : (a & 64512) === 55296 &&
              r + 1 < t.length &&
              (t.charCodeAt(r + 1) & 64512) === 56320
            ? ((a = 65536 + ((a & 1023) << 10) + (t.charCodeAt(++r) & 1023)),
              (e[i++] = (a >> 18) | 240),
              (e[i++] = ((a >> 12) & 63) | 128),
              (e[i++] = ((a >> 6) & 63) | 128),
              (e[i++] = (a & 63) | 128))
            : ((e[i++] = (a >> 12) | 224),
              (e[i++] = ((a >> 6) & 63) | 128),
              (e[i++] = (a & 63) | 128));
    }
    return e;
  },
  ah = function (t) {
    const e = [];
    let i = 0,
      r = 0;
    for (; i < t.length; ) {
      const a = t[i++];
      if (a < 128) e[r++] = String.fromCharCode(a);
      else if (a > 191 && a < 224) {
        const c = t[i++];
        e[r++] = String.fromCharCode(((a & 31) << 6) | (c & 63));
      } else if (a > 239 && a < 365) {
        const c = t[i++],
          l = t[i++],
          h = t[i++],
          p =
            (((a & 7) << 18) | ((c & 63) << 12) | ((l & 63) << 6) | (h & 63)) -
            65536;
        ((e[r++] = String.fromCharCode(55296 + (p >> 10))),
          (e[r++] = String.fromCharCode(56320 + (p & 1023))));
      } else {
        const c = t[i++],
          l = t[i++];
        e[r++] = String.fromCharCode(
          ((a & 15) << 12) | ((c & 63) << 6) | (l & 63),
        );
      }
    }
    return e.join("");
  },
  oh = {
    byteToCharMap_: null,
    charToByteMap_: null,
    byteToCharMapWebSafe_: null,
    charToByteMapWebSafe_: null,
    ENCODED_VALS_BASE:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    get ENCODED_VALS() {
      return this.ENCODED_VALS_BASE + "+/=";
    },
    get ENCODED_VALS_WEBSAFE() {
      return this.ENCODED_VALS_BASE + "-_.";
    },
    HAS_NATIVE_SUPPORT: typeof atob == "function",
    encodeByteArray(t, e) {
      if (!Array.isArray(t))
        throw Error("encodeByteArray takes an array as a parameter");
      this.init_();
      const i = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
        r = [];
      for (let a = 0; a < t.length; a += 3) {
        const c = t[a],
          l = a + 1 < t.length,
          h = l ? t[a + 1] : 0,
          p = a + 2 < t.length,
          y = p ? t[a + 2] : 0,
          j = c >> 2,
          N = ((c & 3) << 4) | (h >> 4);
        let _ = ((h & 15) << 2) | (y >> 6),
          D = y & 63;
        (p || ((D = 64), l || (_ = 64)), r.push(i[j], i[N], i[_], i[D]));
      }
      return r.join("");
    },
    encodeString(t, e) {
      return this.HAS_NATIVE_SUPPORT && !e
        ? btoa(t)
        : this.encodeByteArray(eo(t), e);
    },
    decodeString(t, e) {
      return this.HAS_NATIVE_SUPPORT && !e
        ? atob(t)
        : ah(this.decodeStringToByteArray(t, e));
    },
    decodeStringToByteArray(t, e) {
      this.init_();
      const i = e ? this.charToByteMapWebSafe_ : this.charToByteMap_,
        r = [];
      for (let a = 0; a < t.length; ) {
        const c = i[t.charAt(a++)],
          h = a < t.length ? i[t.charAt(a)] : 0;
        ++a;
        const y = a < t.length ? i[t.charAt(a)] : 64;
        ++a;
        const N = a < t.length ? i[t.charAt(a)] : 64;
        if ((++a, c == null || h == null || y == null || N == null))
          throw new lh();
        const _ = (c << 2) | (h >> 4);
        if ((r.push(_), y !== 64)) {
          const D = ((h << 4) & 240) | (y >> 2);
          if ((r.push(D), N !== 64)) {
            const E = ((y << 6) & 192) | N;
            r.push(E);
          }
        }
      }
      return r;
    },
    init_() {
      if (!this.byteToCharMap_) {
        ((this.byteToCharMap_ = {}),
          (this.charToByteMap_ = {}),
          (this.byteToCharMapWebSafe_ = {}),
          (this.charToByteMapWebSafe_ = {}));
        for (let t = 0; t < this.ENCODED_VALS.length; t++)
          ((this.byteToCharMap_[t] = this.ENCODED_VALS.charAt(t)),
            (this.charToByteMap_[this.byteToCharMap_[t]] = t),
            (this.byteToCharMapWebSafe_[t] =
              this.ENCODED_VALS_WEBSAFE.charAt(t)),
            (this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]] = t),
            t >= this.ENCODED_VALS_BASE.length &&
              ((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)] = t),
              (this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)] = t)));
      }
    },
  };
class lh extends Error {
  constructor() {
    (super(...arguments), (this.name = "DecodeBase64StringError"));
  }
}
const ch = function (t) {
    const e = eo(t);
    return oh.encodeByteArray(e, !0);
  },
  to = function (t) {
    return ch(t).replace(/\./g, "");
  };
function dh() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function hh() {
  return new Promise((t, e) => {
    try {
      let i = !0;
      const r = "validate-browser-context-for-indexeddb-analytics-module",
        a = self.indexedDB.open(r);
      ((a.onsuccess = () => {
        (a.result.close(), i || self.indexedDB.deleteDatabase(r), t(!0));
      }),
        (a.onupgradeneeded = () => {
          i = !1;
        }),
        (a.onerror = () => {
          var c;
          e(((c = a.error) == null ? void 0 : c.message) || "");
        }));
    } catch (i) {
      e(i);
    }
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const uh = "FirebaseError";
class kt extends Error {
  constructor(e, i, r) {
    (super(i),
      (this.code = e),
      (this.customData = r),
      (this.name = uh),
      Object.setPrototypeOf(this, kt.prototype),
      Error.captureStackTrace &&
        Error.captureStackTrace(this, so.prototype.create));
  }
}
class so {
  constructor(e, i, r) {
    ((this.service = e), (this.serviceName = i), (this.errors = r));
  }
  create(e, ...i) {
    const r = i[0] || {},
      a = `${this.service}/${e}`,
      c = this.errors[e],
      l = c ? mh(c, r) : "Error",
      h = `${this.serviceName}: ${l} (${a}).`;
    return new kt(a, h, r);
  }
}
function mh(t, e) {
  return t.replace(fh, (i, r) => {
    const a = e[r];
    return a != null ? String(a) : `<${r}?>`;
  });
}
const fh = /\{\$([^}]+)}/g;
class $s {
  constructor(e, i, r) {
    ((this.name = e),
      (this.instanceFactory = i),
      (this.type = r),
      (this.multipleInstances = !1),
      (this.serviceProps = {}),
      (this.instantiationMode = "LAZY"),
      (this.onInstanceCreated = null));
  }
  setInstantiationMode(e) {
    return ((this.instantiationMode = e), this);
  }
  setMultipleInstances(e) {
    return ((this.multipleInstances = e), this);
  }
  setServiceProps(e) {
    return ((this.serviceProps = e), this);
  }
  setInstanceCreatedCallback(e) {
    return ((this.onInstanceCreated = e), this);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Q;
(function (t) {
  ((t[(t.DEBUG = 0)] = "DEBUG"),
    (t[(t.VERBOSE = 1)] = "VERBOSE"),
    (t[(t.INFO = 2)] = "INFO"),
    (t[(t.WARN = 3)] = "WARN"),
    (t[(t.ERROR = 4)] = "ERROR"),
    (t[(t.SILENT = 5)] = "SILENT"));
})(Q || (Q = {}));
const ph = {
    debug: Q.DEBUG,
    verbose: Q.VERBOSE,
    info: Q.INFO,
    warn: Q.WARN,
    error: Q.ERROR,
    silent: Q.SILENT,
  },
  gh = Q.INFO,
  xh = {
    [Q.DEBUG]: "log",
    [Q.VERBOSE]: "log",
    [Q.INFO]: "info",
    [Q.WARN]: "warn",
    [Q.ERROR]: "error",
  },
  yh = (t, e, ...i) => {
    if (e < t.logLevel) return;
    const r = new Date().toISOString(),
      a = xh[e];
    if (a) console[a](`[${r}]  ${t.name}:`, ...i);
    else
      throw new Error(
        `Attempted to log a message with an invalid logType (value: ${e})`,
      );
  };
class no {
  constructor(e) {
    ((this.name = e),
      (this._logLevel = gh),
      (this._logHandler = yh),
      (this._userLogHandler = null));
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(e) {
    if (!(e in Q))
      throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
    this._logLevel = e;
  }
  setLogLevel(e) {
    this._logLevel = typeof e == "string" ? ph[e] : e;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(e) {
    if (typeof e != "function")
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = e;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(e) {
    this._userLogHandler = e;
  }
  debug(...e) {
    (this._userLogHandler && this._userLogHandler(this, Q.DEBUG, ...e),
      this._logHandler(this, Q.DEBUG, ...e));
  }
  log(...e) {
    (this._userLogHandler && this._userLogHandler(this, Q.VERBOSE, ...e),
      this._logHandler(this, Q.VERBOSE, ...e));
  }
  info(...e) {
    (this._userLogHandler && this._userLogHandler(this, Q.INFO, ...e),
      this._logHandler(this, Q.INFO, ...e));
  }
  warn(...e) {
    (this._userLogHandler && this._userLogHandler(this, Q.WARN, ...e),
      this._logHandler(this, Q.WARN, ...e));
  }
  error(...e) {
    (this._userLogHandler && this._userLogHandler(this, Q.ERROR, ...e),
      this._logHandler(this, Q.ERROR, ...e));
  }
}
const vh = (t, e) => e.some((i) => t instanceof i);
let Pr, kr;
function bh() {
  return (
    Pr ||
    (Pr = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])
  );
}
function jh() {
  return (
    kr ||
    (kr = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey,
    ])
  );
}
const io = new WeakMap(),
  Yn = new WeakMap(),
  ro = new WeakMap(),
  In = new WeakMap(),
  ri = new WeakMap();
function Nh(t) {
  const e = new Promise((i, r) => {
    const a = () => {
        (t.removeEventListener("success", c),
          t.removeEventListener("error", l));
      },
      c = () => {
        (i(ot(t.result)), a());
      },
      l = () => {
        (r(t.error), a());
      };
    (t.addEventListener("success", c), t.addEventListener("error", l));
  });
  return (
    e
      .then((i) => {
        i instanceof IDBCursor && io.set(i, t);
      })
      .catch(() => {}),
    ri.set(e, t),
    e
  );
}
function wh(t) {
  if (Yn.has(t)) return;
  const e = new Promise((i, r) => {
    const a = () => {
        (t.removeEventListener("complete", c),
          t.removeEventListener("error", l),
          t.removeEventListener("abort", l));
      },
      c = () => {
        (i(), a());
      },
      l = () => {
        (r(t.error || new DOMException("AbortError", "AbortError")), a());
      };
    (t.addEventListener("complete", c),
      t.addEventListener("error", l),
      t.addEventListener("abort", l));
  });
  Yn.set(t, e);
}
let Qn = {
  get(t, e, i) {
    if (t instanceof IDBTransaction) {
      if (e === "done") return Yn.get(t);
      if (e === "objectStoreNames") return t.objectStoreNames || ro.get(t);
      if (e === "store")
        return i.objectStoreNames[1]
          ? void 0
          : i.objectStore(i.objectStoreNames[0]);
    }
    return ot(t[e]);
  },
  set(t, e, i) {
    return ((t[e] = i), !0);
  },
  has(t, e) {
    return t instanceof IDBTransaction && (e === "done" || e === "store")
      ? !0
      : e in t;
  },
};
function Sh(t) {
  Qn = t(Qn);
}
function Eh(t) {
  return t === IDBDatabase.prototype.transaction &&
    !("objectStoreNames" in IDBTransaction.prototype)
    ? function (e, ...i) {
        const r = t.call(Ln(this), e, ...i);
        return (ro.set(r, e.sort ? e.sort() : [e]), ot(r));
      }
    : jh().includes(t)
      ? function (...e) {
          return (t.apply(Ln(this), e), ot(io.get(this)));
        }
      : function (...e) {
          return ot(t.apply(Ln(this), e));
        };
}
function Ch(t) {
  return typeof t == "function"
    ? Eh(t)
    : (t instanceof IDBTransaction && wh(t),
      vh(t, bh()) ? new Proxy(t, Qn) : t);
}
function ot(t) {
  if (t instanceof IDBRequest) return Nh(t);
  if (In.has(t)) return In.get(t);
  const e = Ch(t);
  return (e !== t && (In.set(t, e), ri.set(e, t)), e);
}
const Ln = (t) => ri.get(t);
function Th(t, e, { blocked: i, upgrade: r, blocking: a, terminated: c } = {}) {
  const l = indexedDB.open(t, e),
    h = ot(l);
  return (
    r &&
      l.addEventListener("upgradeneeded", (p) => {
        r(ot(l.result), p.oldVersion, p.newVersion, ot(l.transaction), p);
      }),
    i && l.addEventListener("blocked", (p) => i(p.oldVersion, p.newVersion, p)),
    h
      .then((p) => {
        (c && p.addEventListener("close", () => c()),
          a &&
            p.addEventListener("versionchange", (y) =>
              a(y.oldVersion, y.newVersion, y),
            ));
      })
      .catch(() => {}),
    h
  );
}
const _h = ["get", "getKey", "getAll", "getAllKeys", "count"],
  Ah = ["put", "add", "delete", "clear"],
  Pn = new Map();
function Dr(t, e) {
  if (!(t instanceof IDBDatabase && !(e in t) && typeof e == "string")) return;
  if (Pn.get(e)) return Pn.get(e);
  const i = e.replace(/FromIndex$/, ""),
    r = e !== i,
    a = Ah.includes(i);
  if (
    !(i in (r ? IDBIndex : IDBObjectStore).prototype) ||
    !(a || _h.includes(i))
  )
    return;
  const c = async function (l, ...h) {
    const p = this.transaction(l, a ? "readwrite" : "readonly");
    let y = p.store;
    return (
      r && (y = y.index(h.shift())),
      (await Promise.all([y[i](...h), a && p.done]))[0]
    );
  };
  return (Pn.set(e, c), c);
}
Sh((t) => ({
  ...t,
  get: (e, i, r) => Dr(e, i) || t.get(e, i, r),
  has: (e, i) => !!Dr(e, i) || t.has(e, i),
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Rh {
  constructor(e) {
    this.container = e;
  }
  getPlatformInfoString() {
    return this.container
      .getProviders()
      .map((i) => {
        if (Ih(i)) {
          const r = i.getImmediate();
          return `${r.library}/${r.version}`;
        } else return null;
      })
      .filter((i) => i)
      .join(" ");
  }
}
function Ih(t) {
  const e = t.getComponent();
  return (e == null ? void 0 : e.type) === "VERSION";
}
const Zn = "@firebase/app",
  Or = "0.14.3";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Xe = new no("@firebase/app"),
  Lh = "@firebase/app-compat",
  Ph = "@firebase/analytics-compat",
  kh = "@firebase/analytics",
  Dh = "@firebase/app-check-compat",
  Oh = "@firebase/app-check",
  Fh = "@firebase/auth",
  Mh = "@firebase/auth-compat",
  Bh = "@firebase/database",
  Uh = "@firebase/data-connect",
  Vh = "@firebase/database-compat",
  $h = "@firebase/functions",
  Hh = "@firebase/functions-compat",
  zh = "@firebase/installations",
  Wh = "@firebase/installations-compat",
  qh = "@firebase/messaging",
  Gh = "@firebase/messaging-compat",
  Jh = "@firebase/performance",
  Kh = "@firebase/performance-compat",
  Xh = "@firebase/remote-config",
  Yh = "@firebase/remote-config-compat",
  Qh = "@firebase/storage",
  Zh = "@firebase/storage-compat",
  eu = "@firebase/firestore",
  tu = "@firebase/ai",
  su = "@firebase/firestore-compat",
  nu = "firebase",
  iu = "12.3.0",
  ru = {
    [Zn]: "fire-core",
    [Lh]: "fire-core-compat",
    [kh]: "fire-analytics",
    [Ph]: "fire-analytics-compat",
    [Oh]: "fire-app-check",
    [Dh]: "fire-app-check-compat",
    [Fh]: "fire-auth",
    [Mh]: "fire-auth-compat",
    [Bh]: "fire-rtdb",
    [Uh]: "fire-data-connect",
    [Vh]: "fire-rtdb-compat",
    [$h]: "fire-fn",
    [Hh]: "fire-fn-compat",
    [zh]: "fire-iid",
    [Wh]: "fire-iid-compat",
    [qh]: "fire-fcm",
    [Gh]: "fire-fcm-compat",
    [Jh]: "fire-perf",
    [Kh]: "fire-perf-compat",
    [Xh]: "fire-rc",
    [Yh]: "fire-rc-compat",
    [Qh]: "fire-gcs",
    [Zh]: "fire-gcs-compat",
    [eu]: "fire-fst",
    [su]: "fire-fst-compat",
    [tu]: "fire-vertex",
    "fire-js": "fire-js",
    [nu]: "fire-js-all",
  };
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const au = new Map(),
  ou = new Map(),
  Fr = new Map();
function Mr(t, e) {
  try {
    t.container.addComponent(e);
  } catch (i) {
    Xe.debug(
      `Component ${e.name} failed to register with FirebaseApp ${t.name}`,
      i,
    );
  }
}
function Hs(t) {
  const e = t.name;
  if (Fr.has(e))
    return (
      Xe.debug(`There were multiple attempts to register component ${e}.`),
      !1
    );
  Fr.set(e, t);
  for (const i of au.values()) Mr(i, t);
  for (const i of ou.values()) Mr(i, t);
  return !0;
}
function lu(t) {
  return t == null ? !1 : t.settings !== void 0;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const cu = {
    "no-app":
      "No Firebase App '{$appName}' has been created - call initializeApp() first",
    "bad-app-name": "Illegal App name: '{$appName}'",
    "duplicate-app":
      "Firebase App named '{$appName}' already exists with different options or config",
    "app-deleted": "Firebase App named '{$appName}' already deleted",
    "server-app-deleted": "Firebase Server App has been deleted",
    "no-options":
      "Need to provide options, when not being deployed to hosting via source.",
    "invalid-app-argument":
      "firebase.{$appName}() takes either no argument or a Firebase App instance.",
    "invalid-log-argument":
      "First argument to `onLog` must be null or a function.",
    "idb-open":
      "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-get":
      "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-set":
      "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
    "idb-delete":
      "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
    "finalization-registry-not-supported":
      "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
    "invalid-server-app-environment":
      "FirebaseServerApp is not for use in browser environments.",
  },
  ai = new so("app", "Firebase", cu);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const du = iu;
function ts(t, e, i) {
  let r = ru[t] ?? t;
  i && (r += `-${i}`);
  const a = r.match(/\s|\//),
    c = e.match(/\s|\//);
  if (a || c) {
    const l = [`Unable to register library "${r}" with version "${e}":`];
    (a &&
      l.push(
        `library name "${r}" contains illegal characters (whitespace or "/")`,
      ),
      a && c && l.push("and"),
      c &&
        l.push(
          `version name "${e}" contains illegal characters (whitespace or "/")`,
        ),
      Xe.warn(l.join(" ")));
    return;
  }
  Hs(new $s(`${r}-version`, () => ({ library: r, version: e }), "VERSION"));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const hu = "firebase-heartbeat-database",
  uu = 1,
  hs = "firebase-heartbeat-store";
let kn = null;
function ao() {
  return (
    kn ||
      (kn = Th(hu, uu, {
        upgrade: (t, e) => {
          switch (e) {
            case 0:
              try {
                t.createObjectStore(hs);
              } catch (i) {
                console.warn(i);
              }
          }
        },
      }).catch((t) => {
        throw ai.create("idb-open", { originalErrorMessage: t.message });
      })),
    kn
  );
}
async function mu(t) {
  try {
    const i = (await ao()).transaction(hs),
      r = await i.objectStore(hs).get(oo(t));
    return (await i.done, r);
  } catch (e) {
    if (e instanceof kt) Xe.warn(e.message);
    else {
      const i = ai.create("idb-get", {
        originalErrorMessage: e == null ? void 0 : e.message,
      });
      Xe.warn(i.message);
    }
  }
}
async function Br(t, e) {
  try {
    const r = (await ao()).transaction(hs, "readwrite");
    (await r.objectStore(hs).put(e, oo(t)), await r.done);
  } catch (i) {
    if (i instanceof kt) Xe.warn(i.message);
    else {
      const r = ai.create("idb-set", {
        originalErrorMessage: i == null ? void 0 : i.message,
      });
      Xe.warn(r.message);
    }
  }
}
function oo(t) {
  return `${t.name}!${t.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const fu = 1024,
  pu = 30;
class gu {
  constructor(e) {
    ((this.container = e), (this._heartbeatsCache = null));
    const i = this.container.getProvider("app").getImmediate();
    ((this._storage = new yu(i)),
      (this._heartbeatsCachePromise = this._storage
        .read()
        .then((r) => ((this._heartbeatsCache = r), r))));
  }
  async triggerHeartbeat() {
    var e, i;
    try {
      const a = this.container
          .getProvider("platform-logger")
          .getImmediate()
          .getPlatformInfoString(),
        c = Ur();
      if (
        (((e = this._heartbeatsCache) == null ? void 0 : e.heartbeats) ==
          null &&
          ((this._heartbeatsCache = await this._heartbeatsCachePromise),
          ((i = this._heartbeatsCache) == null ? void 0 : i.heartbeats) ==
            null)) ||
        this._heartbeatsCache.lastSentHeartbeatDate === c ||
        this._heartbeatsCache.heartbeats.some((l) => l.date === c)
      )
        return;
      if (
        (this._heartbeatsCache.heartbeats.push({ date: c, agent: a }),
        this._heartbeatsCache.heartbeats.length > pu)
      ) {
        const l = vu(this._heartbeatsCache.heartbeats);
        this._heartbeatsCache.heartbeats.splice(l, 1);
      }
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (r) {
      Xe.warn(r);
    }
  }
  async getHeartbeatsHeader() {
    var e;
    try {
      if (
        (this._heartbeatsCache === null && (await this._heartbeatsCachePromise),
        ((e = this._heartbeatsCache) == null ? void 0 : e.heartbeats) == null ||
          this._heartbeatsCache.heartbeats.length === 0)
      )
        return "";
      const i = Ur(),
        { heartbeatsToSend: r, unsentEntries: a } = xu(
          this._heartbeatsCache.heartbeats,
        ),
        c = to(JSON.stringify({ version: 2, heartbeats: r }));
      return (
        (this._heartbeatsCache.lastSentHeartbeatDate = i),
        a.length > 0
          ? ((this._heartbeatsCache.heartbeats = a),
            await this._storage.overwrite(this._heartbeatsCache))
          : ((this._heartbeatsCache.heartbeats = []),
            this._storage.overwrite(this._heartbeatsCache)),
        c
      );
    } catch (i) {
      return (Xe.warn(i), "");
    }
  }
}
function Ur() {
  return new Date().toISOString().substring(0, 10);
}
function xu(t, e = fu) {
  const i = [];
  let r = t.slice();
  for (const a of t) {
    const c = i.find((l) => l.agent === a.agent);
    if (c) {
      if ((c.dates.push(a.date), Vr(i) > e)) {
        c.dates.pop();
        break;
      }
    } else if ((i.push({ agent: a.agent, dates: [a.date] }), Vr(i) > e)) {
      i.pop();
      break;
    }
    r = r.slice(1);
  }
  return { heartbeatsToSend: i, unsentEntries: r };
}
class yu {
  constructor(e) {
    ((this.app = e),
      (this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck()));
  }
  async runIndexedDBEnvironmentCheck() {
    return dh()
      ? hh()
          .then(() => !0)
          .catch(() => !1)
      : !1;
  }
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const i = await mu(this.app);
      return i != null && i.heartbeats ? i : { heartbeats: [] };
    } else return { heartbeats: [] };
  }
  async overwrite(e) {
    if (await this._canUseIndexedDBPromise) {
      const r = await this.read();
      return Br(this.app, {
        lastSentHeartbeatDate:
          e.lastSentHeartbeatDate ?? r.lastSentHeartbeatDate,
        heartbeats: e.heartbeats,
      });
    } else return;
  }
  async add(e) {
    if (await this._canUseIndexedDBPromise) {
      const r = await this.read();
      return Br(this.app, {
        lastSentHeartbeatDate:
          e.lastSentHeartbeatDate ?? r.lastSentHeartbeatDate,
        heartbeats: [...r.heartbeats, ...e.heartbeats],
      });
    } else return;
  }
}
function Vr(t) {
  return to(JSON.stringify({ version: 2, heartbeats: t })).length;
}
function vu(t) {
  if (t.length === 0) return -1;
  let e = 0,
    i = t[0].date;
  for (let r = 1; r < t.length; r++)
    t[r].date < i && ((i = t[r].date), (e = r));
  return e;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function bu(t) {
  (Hs(new $s("platform-logger", (e) => new Rh(e), "PRIVATE")),
    Hs(new $s("heartbeat", (e) => new gu(e), "PRIVATE")),
    ts(Zn, Or, t),
    ts(Zn, Or, "esm2020"),
    ts("fire-js", ""));
}
bu("");
var $r =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/ var oi;
(function () {
  var t;
  /** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/ function e(b, m) {
    function f() {}
    ((f.prototype = m.prototype),
      (b.F = m.prototype),
      (b.prototype = new f()),
      (b.prototype.constructor = b),
      (b.D = function (g, v, C) {
        for (
          var x = Array(arguments.length - 2), V = 2;
          V < arguments.length;
          V++
        )
          x[V - 2] = arguments[V];
        return m.prototype[v].apply(g, x);
      }));
  }
  function i() {
    this.blockSize = -1;
  }
  function r() {
    ((this.blockSize = -1),
      (this.blockSize = 64),
      (this.g = Array(4)),
      (this.C = Array(this.blockSize)),
      (this.o = this.h = 0),
      this.u());
  }
  (e(r, i),
    (r.prototype.u = function () {
      ((this.g[0] = 1732584193),
        (this.g[1] = 4023233417),
        (this.g[2] = 2562383102),
        (this.g[3] = 271733878),
        (this.o = this.h = 0));
    }));
  function a(b, m, f) {
    f || (f = 0);
    const g = Array(16);
    if (typeof m == "string")
      for (var v = 0; v < 16; ++v)
        g[v] =
          m.charCodeAt(f++) |
          (m.charCodeAt(f++) << 8) |
          (m.charCodeAt(f++) << 16) |
          (m.charCodeAt(f++) << 24);
    else
      for (v = 0; v < 16; ++v)
        g[v] = m[f++] | (m[f++] << 8) | (m[f++] << 16) | (m[f++] << 24);
    ((m = b.g[0]), (f = b.g[1]), (v = b.g[2]));
    let C = b.g[3],
      x;
    ((x = (m + (C ^ (f & (v ^ C))) + g[0] + 3614090360) & 4294967295),
      (m = f + (((x << 7) & 4294967295) | (x >>> 25))),
      (x = (C + (v ^ (m & (f ^ v))) + g[1] + 3905402710) & 4294967295),
      (C = m + (((x << 12) & 4294967295) | (x >>> 20))),
      (x = (v + (f ^ (C & (m ^ f))) + g[2] + 606105819) & 4294967295),
      (v = C + (((x << 17) & 4294967295) | (x >>> 15))),
      (x = (f + (m ^ (v & (C ^ m))) + g[3] + 3250441966) & 4294967295),
      (f = v + (((x << 22) & 4294967295) | (x >>> 10))),
      (x = (m + (C ^ (f & (v ^ C))) + g[4] + 4118548399) & 4294967295),
      (m = f + (((x << 7) & 4294967295) | (x >>> 25))),
      (x = (C + (v ^ (m & (f ^ v))) + g[5] + 1200080426) & 4294967295),
      (C = m + (((x << 12) & 4294967295) | (x >>> 20))),
      (x = (v + (f ^ (C & (m ^ f))) + g[6] + 2821735955) & 4294967295),
      (v = C + (((x << 17) & 4294967295) | (x >>> 15))),
      (x = (f + (m ^ (v & (C ^ m))) + g[7] + 4249261313) & 4294967295),
      (f = v + (((x << 22) & 4294967295) | (x >>> 10))),
      (x = (m + (C ^ (f & (v ^ C))) + g[8] + 1770035416) & 4294967295),
      (m = f + (((x << 7) & 4294967295) | (x >>> 25))),
      (x = (C + (v ^ (m & (f ^ v))) + g[9] + 2336552879) & 4294967295),
      (C = m + (((x << 12) & 4294967295) | (x >>> 20))),
      (x = (v + (f ^ (C & (m ^ f))) + g[10] + 4294925233) & 4294967295),
      (v = C + (((x << 17) & 4294967295) | (x >>> 15))),
      (x = (f + (m ^ (v & (C ^ m))) + g[11] + 2304563134) & 4294967295),
      (f = v + (((x << 22) & 4294967295) | (x >>> 10))),
      (x = (m + (C ^ (f & (v ^ C))) + g[12] + 1804603682) & 4294967295),
      (m = f + (((x << 7) & 4294967295) | (x >>> 25))),
      (x = (C + (v ^ (m & (f ^ v))) + g[13] + 4254626195) & 4294967295),
      (C = m + (((x << 12) & 4294967295) | (x >>> 20))),
      (x = (v + (f ^ (C & (m ^ f))) + g[14] + 2792965006) & 4294967295),
      (v = C + (((x << 17) & 4294967295) | (x >>> 15))),
      (x = (f + (m ^ (v & (C ^ m))) + g[15] + 1236535329) & 4294967295),
      (f = v + (((x << 22) & 4294967295) | (x >>> 10))),
      (x = (m + (v ^ (C & (f ^ v))) + g[1] + 4129170786) & 4294967295),
      (m = f + (((x << 5) & 4294967295) | (x >>> 27))),
      (x = (C + (f ^ (v & (m ^ f))) + g[6] + 3225465664) & 4294967295),
      (C = m + (((x << 9) & 4294967295) | (x >>> 23))),
      (x = (v + (m ^ (f & (C ^ m))) + g[11] + 643717713) & 4294967295),
      (v = C + (((x << 14) & 4294967295) | (x >>> 18))),
      (x = (f + (C ^ (m & (v ^ C))) + g[0] + 3921069994) & 4294967295),
      (f = v + (((x << 20) & 4294967295) | (x >>> 12))),
      (x = (m + (v ^ (C & (f ^ v))) + g[5] + 3593408605) & 4294967295),
      (m = f + (((x << 5) & 4294967295) | (x >>> 27))),
      (x = (C + (f ^ (v & (m ^ f))) + g[10] + 38016083) & 4294967295),
      (C = m + (((x << 9) & 4294967295) | (x >>> 23))),
      (x = (v + (m ^ (f & (C ^ m))) + g[15] + 3634488961) & 4294967295),
      (v = C + (((x << 14) & 4294967295) | (x >>> 18))),
      (x = (f + (C ^ (m & (v ^ C))) + g[4] + 3889429448) & 4294967295),
      (f = v + (((x << 20) & 4294967295) | (x >>> 12))),
      (x = (m + (v ^ (C & (f ^ v))) + g[9] + 568446438) & 4294967295),
      (m = f + (((x << 5) & 4294967295) | (x >>> 27))),
      (x = (C + (f ^ (v & (m ^ f))) + g[14] + 3275163606) & 4294967295),
      (C = m + (((x << 9) & 4294967295) | (x >>> 23))),
      (x = (v + (m ^ (f & (C ^ m))) + g[3] + 4107603335) & 4294967295),
      (v = C + (((x << 14) & 4294967295) | (x >>> 18))),
      (x = (f + (C ^ (m & (v ^ C))) + g[8] + 1163531501) & 4294967295),
      (f = v + (((x << 20) & 4294967295) | (x >>> 12))),
      (x = (m + (v ^ (C & (f ^ v))) + g[13] + 2850285829) & 4294967295),
      (m = f + (((x << 5) & 4294967295) | (x >>> 27))),
      (x = (C + (f ^ (v & (m ^ f))) + g[2] + 4243563512) & 4294967295),
      (C = m + (((x << 9) & 4294967295) | (x >>> 23))),
      (x = (v + (m ^ (f & (C ^ m))) + g[7] + 1735328473) & 4294967295),
      (v = C + (((x << 14) & 4294967295) | (x >>> 18))),
      (x = (f + (C ^ (m & (v ^ C))) + g[12] + 2368359562) & 4294967295),
      (f = v + (((x << 20) & 4294967295) | (x >>> 12))),
      (x = (m + (f ^ v ^ C) + g[5] + 4294588738) & 4294967295),
      (m = f + (((x << 4) & 4294967295) | (x >>> 28))),
      (x = (C + (m ^ f ^ v) + g[8] + 2272392833) & 4294967295),
      (C = m + (((x << 11) & 4294967295) | (x >>> 21))),
      (x = (v + (C ^ m ^ f) + g[11] + 1839030562) & 4294967295),
      (v = C + (((x << 16) & 4294967295) | (x >>> 16))),
      (x = (f + (v ^ C ^ m) + g[14] + 4259657740) & 4294967295),
      (f = v + (((x << 23) & 4294967295) | (x >>> 9))),
      (x = (m + (f ^ v ^ C) + g[1] + 2763975236) & 4294967295),
      (m = f + (((x << 4) & 4294967295) | (x >>> 28))),
      (x = (C + (m ^ f ^ v) + g[4] + 1272893353) & 4294967295),
      (C = m + (((x << 11) & 4294967295) | (x >>> 21))),
      (x = (v + (C ^ m ^ f) + g[7] + 4139469664) & 4294967295),
      (v = C + (((x << 16) & 4294967295) | (x >>> 16))),
      (x = (f + (v ^ C ^ m) + g[10] + 3200236656) & 4294967295),
      (f = v + (((x << 23) & 4294967295) | (x >>> 9))),
      (x = (m + (f ^ v ^ C) + g[13] + 681279174) & 4294967295),
      (m = f + (((x << 4) & 4294967295) | (x >>> 28))),
      (x = (C + (m ^ f ^ v) + g[0] + 3936430074) & 4294967295),
      (C = m + (((x << 11) & 4294967295) | (x >>> 21))),
      (x = (v + (C ^ m ^ f) + g[3] + 3572445317) & 4294967295),
      (v = C + (((x << 16) & 4294967295) | (x >>> 16))),
      (x = (f + (v ^ C ^ m) + g[6] + 76029189) & 4294967295),
      (f = v + (((x << 23) & 4294967295) | (x >>> 9))),
      (x = (m + (f ^ v ^ C) + g[9] + 3654602809) & 4294967295),
      (m = f + (((x << 4) & 4294967295) | (x >>> 28))),
      (x = (C + (m ^ f ^ v) + g[12] + 3873151461) & 4294967295),
      (C = m + (((x << 11) & 4294967295) | (x >>> 21))),
      (x = (v + (C ^ m ^ f) + g[15] + 530742520) & 4294967295),
      (v = C + (((x << 16) & 4294967295) | (x >>> 16))),
      (x = (f + (v ^ C ^ m) + g[2] + 3299628645) & 4294967295),
      (f = v + (((x << 23) & 4294967295) | (x >>> 9))),
      (x = (m + (v ^ (f | ~C)) + g[0] + 4096336452) & 4294967295),
      (m = f + (((x << 6) & 4294967295) | (x >>> 26))),
      (x = (C + (f ^ (m | ~v)) + g[7] + 1126891415) & 4294967295),
      (C = m + (((x << 10) & 4294967295) | (x >>> 22))),
      (x = (v + (m ^ (C | ~f)) + g[14] + 2878612391) & 4294967295),
      (v = C + (((x << 15) & 4294967295) | (x >>> 17))),
      (x = (f + (C ^ (v | ~m)) + g[5] + 4237533241) & 4294967295),
      (f = v + (((x << 21) & 4294967295) | (x >>> 11))),
      (x = (m + (v ^ (f | ~C)) + g[12] + 1700485571) & 4294967295),
      (m = f + (((x << 6) & 4294967295) | (x >>> 26))),
      (x = (C + (f ^ (m | ~v)) + g[3] + 2399980690) & 4294967295),
      (C = m + (((x << 10) & 4294967295) | (x >>> 22))),
      (x = (v + (m ^ (C | ~f)) + g[10] + 4293915773) & 4294967295),
      (v = C + (((x << 15) & 4294967295) | (x >>> 17))),
      (x = (f + (C ^ (v | ~m)) + g[1] + 2240044497) & 4294967295),
      (f = v + (((x << 21) & 4294967295) | (x >>> 11))),
      (x = (m + (v ^ (f | ~C)) + g[8] + 1873313359) & 4294967295),
      (m = f + (((x << 6) & 4294967295) | (x >>> 26))),
      (x = (C + (f ^ (m | ~v)) + g[15] + 4264355552) & 4294967295),
      (C = m + (((x << 10) & 4294967295) | (x >>> 22))),
      (x = (v + (m ^ (C | ~f)) + g[6] + 2734768916) & 4294967295),
      (v = C + (((x << 15) & 4294967295) | (x >>> 17))),
      (x = (f + (C ^ (v | ~m)) + g[13] + 1309151649) & 4294967295),
      (f = v + (((x << 21) & 4294967295) | (x >>> 11))),
      (x = (m + (v ^ (f | ~C)) + g[4] + 4149444226) & 4294967295),
      (m = f + (((x << 6) & 4294967295) | (x >>> 26))),
      (x = (C + (f ^ (m | ~v)) + g[11] + 3174756917) & 4294967295),
      (C = m + (((x << 10) & 4294967295) | (x >>> 22))),
      (x = (v + (m ^ (C | ~f)) + g[2] + 718787259) & 4294967295),
      (v = C + (((x << 15) & 4294967295) | (x >>> 17))),
      (x = (f + (C ^ (v | ~m)) + g[9] + 3951481745) & 4294967295),
      (b.g[0] = (b.g[0] + m) & 4294967295),
      (b.g[1] =
        (b.g[1] + (v + (((x << 21) & 4294967295) | (x >>> 11)))) & 4294967295),
      (b.g[2] = (b.g[2] + v) & 4294967295),
      (b.g[3] = (b.g[3] + C) & 4294967295));
  }
  ((r.prototype.v = function (b, m) {
    m === void 0 && (m = b.length);
    const f = m - this.blockSize,
      g = this.C;
    let v = this.h,
      C = 0;
    for (; C < m; ) {
      if (v == 0) for (; C <= f; ) (a(this, b, C), (C += this.blockSize));
      if (typeof b == "string") {
        for (; C < m; )
          if (((g[v++] = b.charCodeAt(C++)), v == this.blockSize)) {
            (a(this, g), (v = 0));
            break;
          }
      } else
        for (; C < m; )
          if (((g[v++] = b[C++]), v == this.blockSize)) {
            (a(this, g), (v = 0));
            break;
          }
    }
    ((this.h = v), (this.o += m));
  }),
    (r.prototype.A = function () {
      var b = Array(
        (this.h < 56 ? this.blockSize : this.blockSize * 2) - this.h,
      );
      b[0] = 128;
      for (var m = 1; m < b.length - 8; ++m) b[m] = 0;
      m = this.o * 8;
      for (var f = b.length - 8; f < b.length; ++f)
        ((b[f] = m & 255), (m /= 256));
      for (this.v(b), b = Array(16), m = 0, f = 0; f < 4; ++f)
        for (let g = 0; g < 32; g += 8) b[m++] = (this.g[f] >>> g) & 255;
      return b;
    }));
  function c(b, m) {
    var f = h;
    return Object.prototype.hasOwnProperty.call(f, b) ? f[b] : (f[b] = m(b));
  }
  function l(b, m) {
    this.h = m;
    const f = [];
    let g = !0;
    for (let v = b.length - 1; v >= 0; v--) {
      const C = b[v] | 0;
      (g && C == m) || ((f[v] = C), (g = !1));
    }
    this.g = f;
  }
  var h = {};
  function p(b) {
    return -128 <= b && b < 128
      ? c(b, function (m) {
          return new l([m | 0], m < 0 ? -1 : 0);
        })
      : new l([b | 0], b < 0 ? -1 : 0);
  }
  function y(b) {
    if (isNaN(b) || !isFinite(b)) return N;
    if (b < 0) return S(y(-b));
    const m = [];
    let f = 1;
    for (let g = 0; b >= f; g++) ((m[g] = (b / f) | 0), (f *= 4294967296));
    return new l(m, 0);
  }
  function j(b, m) {
    if (b.length == 0) throw Error("number format error: empty string");
    if (((m = m || 10), m < 2 || 36 < m))
      throw Error("radix out of range: " + m);
    if (b.charAt(0) == "-") return S(j(b.substring(1), m));
    if (b.indexOf("-") >= 0)
      throw Error('number format error: interior "-" character');
    const f = y(Math.pow(m, 8));
    let g = N;
    for (let C = 0; C < b.length; C += 8) {
      var v = Math.min(8, b.length - C);
      const x = parseInt(b.substring(C, C + v), m);
      v < 8
        ? ((v = y(Math.pow(m, v))), (g = g.j(v).add(y(x))))
        : ((g = g.j(f)), (g = g.add(y(x))));
    }
    return g;
  }
  var N = p(0),
    _ = p(1),
    D = p(16777216);
  ((t = l.prototype),
    (t.m = function () {
      if (T(this)) return -S(this).m();
      let b = 0,
        m = 1;
      for (let f = 0; f < this.g.length; f++) {
        const g = this.i(f);
        ((b += (g >= 0 ? g : 4294967296 + g) * m), (m *= 4294967296));
      }
      return b;
    }),
    (t.toString = function (b) {
      if (((b = b || 10), b < 2 || 36 < b))
        throw Error("radix out of range: " + b);
      if (E(this)) return "0";
      if (T(this)) return "-" + S(this).toString(b);
      const m = y(Math.pow(b, 6));
      var f = this;
      let g = "";
      for (;;) {
        const v = A(f, m).g;
        f = R(f, v.j(m));
        let C = ((f.g.length > 0 ? f.g[0] : f.h) >>> 0).toString(b);
        if (((f = v), E(f))) return C + g;
        for (; C.length < 6; ) C = "0" + C;
        g = C + g;
      }
    }),
    (t.i = function (b) {
      return b < 0 ? 0 : b < this.g.length ? this.g[b] : this.h;
    }));
  function E(b) {
    if (b.h != 0) return !1;
    for (let m = 0; m < b.g.length; m++) if (b.g[m] != 0) return !1;
    return !0;
  }
  function T(b) {
    return b.h == -1;
  }
  t.l = function (b) {
    return ((b = R(this, b)), T(b) ? -1 : E(b) ? 0 : 1);
  };
  function S(b) {
    const m = b.g.length,
      f = [];
    for (let g = 0; g < m; g++) f[g] = ~b.g[g];
    return new l(f, ~b.h).add(_);
  }
  ((t.abs = function () {
    return T(this) ? S(this) : this;
  }),
    (t.add = function (b) {
      const m = Math.max(this.g.length, b.g.length),
        f = [];
      let g = 0;
      for (let v = 0; v <= m; v++) {
        let C = g + (this.i(v) & 65535) + (b.i(v) & 65535),
          x = (C >>> 16) + (this.i(v) >>> 16) + (b.i(v) >>> 16);
        ((g = x >>> 16), (C &= 65535), (x &= 65535), (f[v] = (x << 16) | C));
      }
      return new l(f, f[f.length - 1] & -2147483648 ? -1 : 0);
    }));
  function R(b, m) {
    return b.add(S(m));
  }
  t.j = function (b) {
    if (E(this) || E(b)) return N;
    if (T(this)) return T(b) ? S(this).j(S(b)) : S(S(this).j(b));
    if (T(b)) return S(this.j(S(b)));
    if (this.l(D) < 0 && b.l(D) < 0) return y(this.m() * b.m());
    const m = this.g.length + b.g.length,
      f = [];
    for (var g = 0; g < 2 * m; g++) f[g] = 0;
    for (g = 0; g < this.g.length; g++)
      for (let v = 0; v < b.g.length; v++) {
        const C = this.i(g) >>> 16,
          x = this.i(g) & 65535,
          V = b.i(v) >>> 16,
          K = b.i(v) & 65535;
        ((f[2 * g + 2 * v] += x * K),
          O(f, 2 * g + 2 * v),
          (f[2 * g + 2 * v + 1] += C * K),
          O(f, 2 * g + 2 * v + 1),
          (f[2 * g + 2 * v + 1] += x * V),
          O(f, 2 * g + 2 * v + 1),
          (f[2 * g + 2 * v + 2] += C * V),
          O(f, 2 * g + 2 * v + 2));
      }
    for (b = 0; b < m; b++) f[b] = (f[2 * b + 1] << 16) | f[2 * b];
    for (b = m; b < 2 * m; b++) f[b] = 0;
    return new l(f, 0);
  };
  function O(b, m) {
    for (; (b[m] & 65535) != b[m]; )
      ((b[m + 1] += b[m] >>> 16), (b[m] &= 65535), m++);
  }
  function L(b, m) {
    ((this.g = b), (this.h = m));
  }
  function A(b, m) {
    if (E(m)) throw Error("division by zero");
    if (E(b)) return new L(N, N);
    if (T(b)) return ((m = A(S(b), m)), new L(S(m.g), S(m.h)));
    if (T(m)) return ((m = A(b, S(m))), new L(S(m.g), m.h));
    if (b.g.length > 30) {
      if (T(b) || T(m))
        throw Error("slowDivide_ only works with positive integers.");
      for (var f = _, g = m; g.l(b) <= 0; ) ((f = F(f)), (g = F(g)));
      var v = U(f, 1),
        C = U(g, 1);
      for (g = U(g, 2), f = U(f, 2); !E(g); ) {
        var x = C.add(g);
        (x.l(b) <= 0 && ((v = v.add(f)), (C = x)),
          (g = U(g, 1)),
          (f = U(f, 1)));
      }
      return ((m = R(b, v.j(m))), new L(v, m));
    }
    for (v = N; b.l(m) >= 0; ) {
      for (
        f = Math.max(1, Math.floor(b.m() / m.m())),
          g = Math.ceil(Math.log(f) / Math.LN2),
          g = g <= 48 ? 1 : Math.pow(2, g - 48),
          C = y(f),
          x = C.j(m);
        T(x) || x.l(b) > 0;
      )
        ((f -= g), (C = y(f)), (x = C.j(m)));
      (E(C) && (C = _), (v = v.add(C)), (b = R(b, x)));
    }
    return new L(v, b);
  }
  ((t.B = function (b) {
    return A(this, b).h;
  }),
    (t.and = function (b) {
      const m = Math.max(this.g.length, b.g.length),
        f = [];
      for (let g = 0; g < m; g++) f[g] = this.i(g) & b.i(g);
      return new l(f, this.h & b.h);
    }),
    (t.or = function (b) {
      const m = Math.max(this.g.length, b.g.length),
        f = [];
      for (let g = 0; g < m; g++) f[g] = this.i(g) | b.i(g);
      return new l(f, this.h | b.h);
    }),
    (t.xor = function (b) {
      const m = Math.max(this.g.length, b.g.length),
        f = [];
      for (let g = 0; g < m; g++) f[g] = this.i(g) ^ b.i(g);
      return new l(f, this.h ^ b.h);
    }));
  function F(b) {
    const m = b.g.length + 1,
      f = [];
    for (let g = 0; g < m; g++) f[g] = (b.i(g) << 1) | (b.i(g - 1) >>> 31);
    return new l(f, b.h);
  }
  function U(b, m) {
    const f = m >> 5;
    m %= 32;
    const g = b.g.length - f,
      v = [];
    for (let C = 0; C < g; C++)
      v[C] =
        m > 0 ? (b.i(C + f) >>> m) | (b.i(C + f + 1) << (32 - m)) : b.i(C + f);
    return new l(v, b.h);
  }
  ((r.prototype.digest = r.prototype.A),
    (r.prototype.reset = r.prototype.u),
    (r.prototype.update = r.prototype.v),
    (l.prototype.add = l.prototype.add),
    (l.prototype.multiply = l.prototype.j),
    (l.prototype.modulo = l.prototype.B),
    (l.prototype.compare = l.prototype.l),
    (l.prototype.toNumber = l.prototype.m),
    (l.prototype.toString = l.prototype.toString),
    (l.prototype.getBits = l.prototype.i),
    (l.fromNumber = y),
    (l.fromString = j),
    (oi = l));
}).apply(
  typeof $r < "u"
    ? $r
    : typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : {},
);
var Rs =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
(function () {
  var t,
    e = Object.defineProperty;
  function i(n) {
    n = [
      typeof globalThis == "object" && globalThis,
      n,
      typeof window == "object" && window,
      typeof self == "object" && self,
      typeof Rs == "object" && Rs,
    ];
    for (var o = 0; o < n.length; ++o) {
      var d = n[o];
      if (d && d.Math == Math) return d;
    }
    throw Error("Cannot find global object");
  }
  var r = i(this);
  function a(n, o) {
    if (o)
      e: {
        var d = r;
        n = n.split(".");
        for (var u = 0; u < n.length - 1; u++) {
          var I = n[u];
          if (!(I in d)) break e;
          d = d[I];
        }
        ((n = n[n.length - 1]),
          (u = d[n]),
          (o = o(u)),
          o != u &&
            o != null &&
            e(d, n, { configurable: !0, writable: !0, value: o }));
      }
  }
  (a("Symbol.dispose", function (n) {
    return n || Symbol("Symbol.dispose");
  }),
    a("Array.prototype.values", function (n) {
      return (
        n ||
        function () {
          return this[Symbol.iterator]();
        }
      );
    }),
    a("Object.entries", function (n) {
      return (
        n ||
        function (o) {
          var d = [],
            u;
          for (u in o)
            Object.prototype.hasOwnProperty.call(o, u) && d.push([u, o[u]]);
          return d;
        }
      );
    }));
  /** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/ var c = c || {},
    l = this || self;
  function h(n) {
    var o = typeof n;
    return (o == "object" && n != null) || o == "function";
  }
  function p(n, o, d) {
    return n.call.apply(n.bind, arguments);
  }
  function y(n, o, d) {
    return ((y = p), y.apply(null, arguments));
  }
  function j(n, o) {
    var d = Array.prototype.slice.call(arguments, 1);
    return function () {
      var u = d.slice();
      return (u.push.apply(u, arguments), n.apply(this, u));
    };
  }
  function N(n, o) {
    function d() {}
    ((d.prototype = o.prototype),
      (n.Z = o.prototype),
      (n.prototype = new d()),
      (n.prototype.constructor = n),
      (n.Ob = function (u, I, k) {
        for (
          var M = Array(arguments.length - 2), z = 2;
          z < arguments.length;
          z++
        )
          M[z - 2] = arguments[z];
        return o.prototype[I].apply(u, M);
      }));
  }
  var _ =
    typeof AsyncContext < "u" && typeof AsyncContext.Snapshot == "function"
      ? (n) => n && AsyncContext.Snapshot.wrap(n)
      : (n) => n;
  function D(n) {
    const o = n.length;
    if (o > 0) {
      const d = Array(o);
      for (let u = 0; u < o; u++) d[u] = n[u];
      return d;
    }
    return [];
  }
  function E(n, o) {
    for (let u = 1; u < arguments.length; u++) {
      const I = arguments[u];
      var d = typeof I;
      if (
        ((d =
          d != "object" ? d : I ? (Array.isArray(I) ? "array" : d) : "null"),
        d == "array" || (d == "object" && typeof I.length == "number"))
      ) {
        d = n.length || 0;
        const k = I.length || 0;
        n.length = d + k;
        for (let M = 0; M < k; M++) n[d + M] = I[M];
      } else n.push(I);
    }
  }
  class T {
    constructor(o, d) {
      ((this.i = o), (this.j = d), (this.h = 0), (this.g = null));
    }
    get() {
      let o;
      return (
        this.h > 0
          ? (this.h--, (o = this.g), (this.g = o.next), (o.next = null))
          : (o = this.i()),
        o
      );
    }
  }
  function S(n) {
    l.setTimeout(() => {
      throw n;
    }, 0);
  }
  function R() {
    var n = b;
    let o = null;
    return (
      n.g &&
        ((o = n.g), (n.g = n.g.next), n.g || (n.h = null), (o.next = null)),
      o
    );
  }
  class O {
    constructor() {
      this.h = this.g = null;
    }
    add(o, d) {
      const u = L.get();
      (u.set(o, d), this.h ? (this.h.next = u) : (this.g = u), (this.h = u));
    }
  }
  var L = new T(
    () => new A(),
    (n) => n.reset(),
  );
  class A {
    constructor() {
      this.next = this.g = this.h = null;
    }
    set(o, d) {
      ((this.h = o), (this.g = d), (this.next = null));
    }
    reset() {
      this.next = this.g = this.h = null;
    }
  }
  let F,
    U = !1,
    b = new O(),
    m = () => {
      const n = Promise.resolve(void 0);
      F = () => {
        n.then(f);
      };
    };
  function f() {
    for (var n; (n = R()); ) {
      try {
        n.h.call(n.g);
      } catch (d) {
        S(d);
      }
      var o = L;
      (o.j(n), o.h < 100 && (o.h++, (n.next = o.g), (o.g = n)));
    }
    U = !1;
  }
  function g() {
    ((this.u = this.u), (this.C = this.C));
  }
  ((g.prototype.u = !1),
    (g.prototype.dispose = function () {
      this.u || ((this.u = !0), this.N());
    }),
    (g.prototype[Symbol.dispose] = function () {
      this.dispose();
    }),
    (g.prototype.N = function () {
      if (this.C) for (; this.C.length; ) this.C.shift()();
    }));
  function v(n, o) {
    ((this.type = n), (this.g = this.target = o), (this.defaultPrevented = !1));
  }
  v.prototype.h = function () {
    this.defaultPrevented = !0;
  };
  var C = (function () {
    if (!l.addEventListener || !Object.defineProperty) return !1;
    var n = !1,
      o = Object.defineProperty({}, "passive", {
        get: function () {
          n = !0;
        },
      });
    try {
      const d = () => {};
      (l.addEventListener("test", d, o), l.removeEventListener("test", d, o));
    } catch {}
    return n;
  })();
  function x(n) {
    return /^[\s\xa0]*$/.test(n);
  }
  function V(n, o) {
    (v.call(this, n ? n.type : ""),
      (this.relatedTarget = this.g = this.target = null),
      (this.button =
        this.screenY =
        this.screenX =
        this.clientY =
        this.clientX =
          0),
      (this.key = ""),
      (this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
      (this.state = null),
      (this.pointerId = 0),
      (this.pointerType = ""),
      (this.i = null),
      n && this.init(n, o));
  }
  (N(V, v),
    (V.prototype.init = function (n, o) {
      const d = (this.type = n.type),
        u =
          n.changedTouches && n.changedTouches.length
            ? n.changedTouches[0]
            : null;
      ((this.target = n.target || n.srcElement),
        (this.g = o),
        (o = n.relatedTarget),
        o ||
          (d == "mouseover"
            ? (o = n.fromElement)
            : d == "mouseout" && (o = n.toElement)),
        (this.relatedTarget = o),
        u
          ? ((this.clientX = u.clientX !== void 0 ? u.clientX : u.pageX),
            (this.clientY = u.clientY !== void 0 ? u.clientY : u.pageY),
            (this.screenX = u.screenX || 0),
            (this.screenY = u.screenY || 0))
          : ((this.clientX = n.clientX !== void 0 ? n.clientX : n.pageX),
            (this.clientY = n.clientY !== void 0 ? n.clientY : n.pageY),
            (this.screenX = n.screenX || 0),
            (this.screenY = n.screenY || 0)),
        (this.button = n.button),
        (this.key = n.key || ""),
        (this.ctrlKey = n.ctrlKey),
        (this.altKey = n.altKey),
        (this.shiftKey = n.shiftKey),
        (this.metaKey = n.metaKey),
        (this.pointerId = n.pointerId || 0),
        (this.pointerType = n.pointerType),
        (this.state = n.state),
        (this.i = n),
        n.defaultPrevented && V.Z.h.call(this));
    }),
    (V.prototype.h = function () {
      V.Z.h.call(this);
      const n = this.i;
      n.preventDefault ? n.preventDefault() : (n.returnValue = !1);
    }));
  var K = "closure_listenable_" + ((Math.random() * 1e6) | 0),
    ee = 0;
  function X(n, o, d, u, I) {
    ((this.listener = n),
      (this.proxy = null),
      (this.src = o),
      (this.type = d),
      (this.capture = !!u),
      (this.ha = I),
      (this.key = ++ee),
      (this.da = this.fa = !1));
  }
  function se(n) {
    ((n.da = !0),
      (n.listener = null),
      (n.proxy = null),
      (n.src = null),
      (n.ha = null));
  }
  function Se(n, o, d) {
    for (const u in n) o.call(d, n[u], u, n);
  }
  function Be(n, o) {
    for (const d in n) o.call(void 0, n[d], d, n);
  }
  function he(n) {
    const o = {};
    for (const d in n) o[d] = n[d];
    return o;
  }
  const le =
    "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
      " ",
    );
  function ue(n, o) {
    let d, u;
    for (let I = 1; I < arguments.length; I++) {
      u = arguments[I];
      for (d in u) n[d] = u[d];
      for (let k = 0; k < le.length; k++)
        ((d = le[k]),
          Object.prototype.hasOwnProperty.call(u, d) && (n[d] = u[d]));
    }
  }
  function ie(n) {
    ((this.src = n), (this.g = {}), (this.h = 0));
  }
  ie.prototype.add = function (n, o, d, u, I) {
    const k = n.toString();
    ((n = this.g[k]), n || ((n = this.g[k] = []), this.h++));
    const M = ke(n, o, u, I);
    return (
      M > -1
        ? ((o = n[M]), d || (o.fa = !1))
        : ((o = new X(o, this.src, k, !!u, I)), (o.fa = d), n.push(o)),
      o
    );
  };
  function xe(n, o) {
    const d = o.type;
    if (d in n.g) {
      var u = n.g[d],
        I = Array.prototype.indexOf.call(u, o, void 0),
        k;
      ((k = I >= 0) && Array.prototype.splice.call(u, I, 1),
        k && (se(o), n.g[d].length == 0 && (delete n.g[d], n.h--)));
    }
  }
  function ke(n, o, d, u) {
    for (let I = 0; I < n.length; ++I) {
      const k = n[I];
      if (!k.da && k.listener == o && k.capture == !!d && k.ha == u) return I;
    }
    return -1;
  }
  var Ge = "closure_lm_" + ((Math.random() * 1e6) | 0),
    Dt = {};
  function hi(n, o, d, u, I) {
    if (Array.isArray(o)) {
      for (let k = 0; k < o.length; k++) hi(n, o[k], d, u, I);
      return null;
    }
    return (
      (d = fi(d)),
      n && n[K] ? n.J(o, d, h(u) ? !!u.capture : !1, I) : go(n, o, d, !1, u, I)
    );
  }
  function go(n, o, d, u, I, k) {
    if (!o) throw Error("Invalid event type");
    const M = h(I) ? !!I.capture : !!I;
    let z = nn(n);
    if ((z || (n[Ge] = z = new ie(n)), (d = z.add(o, d, u, M, k)), d.proxy))
      return d;
    if (
      ((u = xo()),
      (d.proxy = u),
      (u.src = n),
      (u.listener = d),
      n.addEventListener)
    )
      (C || (I = M),
        I === void 0 && (I = !1),
        n.addEventListener(o.toString(), u, I));
    else if (n.attachEvent) n.attachEvent(mi(o.toString()), u);
    else if (n.addListener && n.removeListener) n.addListener(u);
    else throw Error("addEventListener and attachEvent are unavailable.");
    return d;
  }
  function xo() {
    function n(d) {
      return o.call(n.src, n.listener, d);
    }
    const o = yo;
    return n;
  }
  function ui(n, o, d, u, I) {
    if (Array.isArray(o))
      for (var k = 0; k < o.length; k++) ui(n, o[k], d, u, I);
    else
      ((u = h(u) ? !!u.capture : !!u),
        (d = fi(d)),
        n && n[K]
          ? ((n = n.i),
            (k = String(o).toString()),
            k in n.g &&
              ((o = n.g[k]),
              (d = ke(o, d, u, I)),
              d > -1 &&
                (se(o[d]),
                Array.prototype.splice.call(o, d, 1),
                o.length == 0 && (delete n.g[k], n.h--))))
          : n &&
            (n = nn(n)) &&
            ((o = n.g[o.toString()]),
            (n = -1),
            o && (n = ke(o, d, u, I)),
            (d = n > -1 ? o[n] : null) && sn(d)));
  }
  function sn(n) {
    if (typeof n != "number" && n && !n.da) {
      var o = n.src;
      if (o && o[K]) xe(o.i, n);
      else {
        var d = n.type,
          u = n.proxy;
        (o.removeEventListener
          ? o.removeEventListener(d, u, n.capture)
          : o.detachEvent
            ? o.detachEvent(mi(d), u)
            : o.addListener && o.removeListener && o.removeListener(u),
          (d = nn(o))
            ? (xe(d, n), d.h == 0 && ((d.src = null), (o[Ge] = null)))
            : se(n));
      }
    }
  }
  function mi(n) {
    return n in Dt ? Dt[n] : (Dt[n] = "on" + n);
  }
  function yo(n, o) {
    if (n.da) n = !0;
    else {
      o = new V(o, this);
      const d = n.listener,
        u = n.ha || n.src;
      (n.fa && sn(n), (n = d.call(u, o)));
    }
    return n;
  }
  function nn(n) {
    return ((n = n[Ge]), n instanceof ie ? n : null);
  }
  var rn = "__closure_events_fn_" + ((Math.random() * 1e9) >>> 0);
  function fi(n) {
    return typeof n == "function"
      ? n
      : (n[rn] ||
          (n[rn] = function (o) {
            return n.handleEvent(o);
          }),
        n[rn]);
  }
  function ye() {
    (g.call(this), (this.i = new ie(this)), (this.M = this), (this.G = null));
  }
  (N(ye, g),
    (ye.prototype[K] = !0),
    (ye.prototype.removeEventListener = function (n, o, d, u) {
      ui(this, n, o, d, u);
    }));
  function je(n, o) {
    var d,
      u = n.G;
    if (u) for (d = []; u; u = u.G) d.push(u);
    if (((n = n.M), (u = o.type || o), typeof o == "string")) o = new v(o, n);
    else if (o instanceof v) o.target = o.target || n;
    else {
      var I = o;
      ((o = new v(u, n)), ue(o, I));
    }
    I = !0;
    let k, M;
    if (d)
      for (M = d.length - 1; M >= 0; M--)
        ((k = o.g = d[M]), (I = ys(k, u, !0, o) && I));
    if (
      ((k = o.g = n), (I = ys(k, u, !0, o) && I), (I = ys(k, u, !1, o) && I), d)
    )
      for (M = 0; M < d.length; M++)
        ((k = o.g = d[M]), (I = ys(k, u, !1, o) && I));
  }
  ((ye.prototype.N = function () {
    if ((ye.Z.N.call(this), this.i)) {
      var n = this.i;
      for (const o in n.g) {
        const d = n.g[o];
        for (let u = 0; u < d.length; u++) se(d[u]);
        (delete n.g[o], n.h--);
      }
    }
    this.G = null;
  }),
    (ye.prototype.J = function (n, o, d, u) {
      return this.i.add(String(n), o, !1, d, u);
    }),
    (ye.prototype.K = function (n, o, d, u) {
      return this.i.add(String(n), o, !0, d, u);
    }));
  function ys(n, o, d, u) {
    if (((o = n.i.g[String(o)]), !o)) return !0;
    o = o.concat();
    let I = !0;
    for (let k = 0; k < o.length; ++k) {
      const M = o[k];
      if (M && !M.da && M.capture == d) {
        const z = M.listener,
          me = M.ha || M.src;
        (M.fa && xe(n.i, M), (I = z.call(me, u) !== !1 && I));
      }
    }
    return I && !u.defaultPrevented;
  }
  function vo(n, o) {
    if (typeof n != "function")
      if (n && typeof n.handleEvent == "function") n = y(n.handleEvent, n);
      else throw Error("Invalid listener argument");
    return Number(o) > 2147483647 ? -1 : l.setTimeout(n, o || 0);
  }
  function pi(n) {
    n.g = vo(() => {
      ((n.g = null), n.i && ((n.i = !1), pi(n)));
    }, n.l);
    const o = n.h;
    ((n.h = null), n.m.apply(null, o));
  }
  class bo extends g {
    constructor(o, d) {
      (super(),
        (this.m = o),
        (this.l = d),
        (this.h = null),
        (this.i = !1),
        (this.g = null));
    }
    j(o) {
      ((this.h = arguments), this.g ? (this.i = !0) : pi(this));
    }
    N() {
      (super.N(),
        this.g &&
          (l.clearTimeout(this.g),
          (this.g = null),
          (this.i = !1),
          (this.h = null)));
    }
  }
  function Ot(n) {
    (g.call(this), (this.h = n), (this.g = {}));
  }
  N(Ot, g);
  var gi = [];
  function xi(n) {
    (Se(
      n.g,
      function (o, d) {
        this.g.hasOwnProperty(d) && sn(o);
      },
      n,
    ),
      (n.g = {}));
  }
  ((Ot.prototype.N = function () {
    (Ot.Z.N.call(this), xi(this));
  }),
    (Ot.prototype.handleEvent = function () {
      throw Error("EventHandler.handleEvent not implemented");
    }));
  var an = l.JSON.stringify,
    jo = l.JSON.parse,
    No = class {
      stringify(n) {
        return l.JSON.stringify(n, void 0);
      }
      parse(n) {
        return l.JSON.parse(n, void 0);
      }
    };
  function yi() {}
  function wo() {}
  var Ft = { OPEN: "a", hb: "b", ERROR: "c", tb: "d" };
  function on() {
    v.call(this, "d");
  }
  N(on, v);
  function ln() {
    v.call(this, "c");
  }
  N(ln, v);
  var wt = {},
    vi = null;
  function cn() {
    return (vi = vi || new ye());
  }
  wt.Ia = "serverreachability";
  function bi(n) {
    v.call(this, wt.Ia, n);
  }
  N(bi, v);
  function Mt(n) {
    const o = cn();
    je(o, new bi(o));
  }
  wt.STAT_EVENT = "statevent";
  function ji(n, o) {
    (v.call(this, wt.STAT_EVENT, n), (this.stat = o));
  }
  N(ji, v);
  function Ne(n) {
    const o = cn();
    je(o, new ji(o, n));
  }
  wt.Ja = "timingevent";
  function Ni(n, o) {
    (v.call(this, wt.Ja, n), (this.size = o));
  }
  N(Ni, v);
  function Bt(n, o) {
    if (typeof n != "function")
      throw Error("Fn must not be null and must be a function");
    return l.setTimeout(function () {
      n();
    }, o);
  }
  function Ut() {
    this.g = !0;
  }
  Ut.prototype.ua = function () {
    this.g = !1;
  };
  function So(n, o, d, u, I, k) {
    n.info(function () {
      if (n.g)
        if (k) {
          var M = "",
            z = k.split("&");
          for (let Y = 0; Y < z.length; Y++) {
            var me = z[Y].split("=");
            if (me.length > 1) {
              const pe = me[0];
              me = me[1];
              const Ve = pe.split("_");
              M =
                Ve.length >= 2 && Ve[1] == "type"
                  ? M + (pe + "=" + me + "&")
                  : M + (pe + "=redacted&");
            }
          }
        } else M = null;
      else M = k;
      return (
        "XMLHTTP REQ (" +
        u +
        ") [attempt " +
        I +
        "]: " +
        o +
        `
` +
        d +
        `
` +
        M
      );
    });
  }
  function Eo(n, o, d, u, I, k, M) {
    n.info(function () {
      return (
        "XMLHTTP RESP (" +
        u +
        ") [ attempt " +
        I +
        "]: " +
        o +
        `
` +
        d +
        `
` +
        k +
        " " +
        M
      );
    });
  }
  function St(n, o, d, u) {
    n.info(function () {
      return "XMLHTTP TEXT (" + o + "): " + To(n, d) + (u ? " " + u : "");
    });
  }
  function Co(n, o) {
    n.info(function () {
      return "TIMEOUT: " + o;
    });
  }
  Ut.prototype.info = function () {};
  function To(n, o) {
    if (!n.g) return o;
    if (!o) return null;
    try {
      const k = JSON.parse(o);
      if (k) {
        for (n = 0; n < k.length; n++)
          if (Array.isArray(k[n])) {
            var d = k[n];
            if (!(d.length < 2)) {
              var u = d[1];
              if (Array.isArray(u) && !(u.length < 1)) {
                var I = u[0];
                if (I != "noop" && I != "stop" && I != "close")
                  for (let M = 1; M < u.length; M++) u[M] = "";
              }
            }
          }
      }
      return an(k);
    } catch {
      return o;
    }
  }
  var dn = { NO_ERROR: 0, TIMEOUT: 8 },
    _o = {},
    wi;
  function hn() {}
  (N(hn, yi),
    (hn.prototype.g = function () {
      return new XMLHttpRequest();
    }),
    (wi = new hn()));
  function Vt(n) {
    return encodeURIComponent(String(n));
  }
  function Ao(n) {
    var o = 1;
    n = n.split(":");
    const d = [];
    for (; o > 0 && n.length; ) (d.push(n.shift()), o--);
    return (n.length && d.push(n.join(":")), d);
  }
  function Qe(n, o, d, u) {
    ((this.j = n),
      (this.i = o),
      (this.l = d),
      (this.S = u || 1),
      (this.V = new Ot(this)),
      (this.H = 45e3),
      (this.J = null),
      (this.o = !1),
      (this.u = this.B = this.A = this.M = this.F = this.T = this.D = null),
      (this.G = []),
      (this.g = null),
      (this.C = 0),
      (this.m = this.v = null),
      (this.X = -1),
      (this.K = !1),
      (this.P = 0),
      (this.O = null),
      (this.W = this.L = this.U = this.R = !1),
      (this.h = new Si()));
  }
  function Si() {
    ((this.i = null), (this.g = ""), (this.h = !1));
  }
  var Ei = {},
    un = {};
  function mn(n, o, d) {
    ((n.M = 1), (n.A = bs(Ue(o))), (n.u = d), (n.R = !0), Ci(n, null));
  }
  function Ci(n, o) {
    ((n.F = Date.now()), vs(n), (n.B = Ue(n.A)));
    var d = n.B,
      u = n.S;
    (Array.isArray(u) || (u = [String(u)]),
      Bi(d.i, "t", u),
      (n.C = 0),
      (d = n.j.L),
      (n.h = new Si()),
      (n.g = nr(n.j, d ? o : null, !n.u)),
      n.P > 0 && (n.O = new bo(y(n.Y, n, n.g), n.P)),
      (o = n.V),
      (d = n.g),
      (u = n.ba));
    var I = "readystatechange";
    Array.isArray(I) || (I && (gi[0] = I.toString()), (I = gi));
    for (let k = 0; k < I.length; k++) {
      const M = hi(d, I[k], u || o.handleEvent, !1, o.h || o);
      if (!M) break;
      o.g[M.key] = M;
    }
    ((o = n.J ? he(n.J) : {}),
      n.u
        ? (n.v || (n.v = "POST"),
          (o["Content-Type"] = "application/x-www-form-urlencoded"),
          n.g.ea(n.B, n.v, n.u, o))
        : ((n.v = "GET"), n.g.ea(n.B, n.v, null, o)),
      Mt(),
      So(n.i, n.v, n.B, n.l, n.S, n.u));
  }
  ((Qe.prototype.ba = function (n) {
    n = n.target;
    const o = this.O;
    o && tt(n) == 3 ? o.j() : this.Y(n);
  }),
    (Qe.prototype.Y = function (n) {
      try {
        if (n == this.g)
          e: {
            const z = tt(this.g),
              me = this.g.ya(),
              Y = this.g.ca();
            if (
              !(z < 3) &&
              (z != 3 || (this.g && (this.h.h || this.g.la() || qi(this.g))))
            ) {
              (this.K ||
                z != 4 ||
                me == 7 ||
                (me == 8 || Y <= 0 ? Mt(3) : Mt(2)),
                fn(this));
              var o = this.g.ca();
              this.X = o;
              var d = Ro(this);
              if (
                ((this.o = o == 200),
                Eo(this.i, this.v, this.B, this.l, this.S, z, o),
                this.o)
              ) {
                if (this.U && !this.L) {
                  t: {
                    if (this.g) {
                      var u,
                        I = this.g;
                      if (
                        (u = I.g
                          ? I.g.getResponseHeader("X-HTTP-Initial-Response")
                          : null) &&
                        !x(u)
                      ) {
                        var k = u;
                        break t;
                      }
                    }
                    k = null;
                  }
                  if ((n = k))
                    (St(
                      this.i,
                      this.l,
                      n,
                      "Initial handshake response via X-HTTP-Initial-Response",
                    ),
                      (this.L = !0),
                      pn(this, n));
                  else {
                    ((this.o = !1), (this.m = 3), Ne(12), ct(this), $t(this));
                    break e;
                  }
                }
                if (this.R) {
                  n = !0;
                  let pe;
                  for (; !this.K && this.C < d.length; )
                    if (((pe = Io(this, d)), pe == un)) {
                      (z == 4 && ((this.m = 4), Ne(14), (n = !1)),
                        St(this.i, this.l, null, "[Incomplete Response]"));
                      break;
                    } else if (pe == Ei) {
                      ((this.m = 4),
                        Ne(15),
                        St(this.i, this.l, d, "[Invalid Chunk]"),
                        (n = !1));
                      break;
                    } else (St(this.i, this.l, pe, null), pn(this, pe));
                  if (
                    (Ti(this) &&
                      this.C != 0 &&
                      ((this.h.g = this.h.g.slice(this.C)), (this.C = 0)),
                    z != 4 ||
                      d.length != 0 ||
                      this.h.h ||
                      ((this.m = 1), Ne(16), (n = !1)),
                    (this.o = this.o && n),
                    !n)
                  )
                    (St(this.i, this.l, d, "[Invalid Chunked Response]"),
                      ct(this),
                      $t(this));
                  else if (d.length > 0 && !this.W) {
                    this.W = !0;
                    var M = this.j;
                    M.g == this &&
                      M.aa &&
                      !M.P &&
                      (M.j.info(
                        "Great, no buffering proxy detected. Bytes received: " +
                          d.length,
                      ),
                      wn(M),
                      (M.P = !0),
                      Ne(11));
                  }
                } else (St(this.i, this.l, d, null), pn(this, d));
                (z == 4 && ct(this),
                  this.o &&
                    !this.K &&
                    (z == 4 ? Zi(this.j, this) : ((this.o = !1), vs(this))));
              } else
                (Wo(this.g),
                  o == 400 && d.indexOf("Unknown SID") > 0
                    ? ((this.m = 3), Ne(12))
                    : ((this.m = 0), Ne(13)),
                  ct(this),
                  $t(this));
            }
          }
      } catch {
      } finally {
      }
    }));
  function Ro(n) {
    if (!Ti(n)) return n.g.la();
    const o = qi(n.g);
    if (o === "") return "";
    let d = "";
    const u = o.length,
      I = tt(n.g) == 4;
    if (!n.h.i) {
      if (typeof TextDecoder > "u") return (ct(n), $t(n), "");
      n.h.i = new l.TextDecoder();
    }
    for (let k = 0; k < u; k++)
      ((n.h.h = !0), (d += n.h.i.decode(o[k], { stream: !(I && k == u - 1) })));
    return ((o.length = 0), (n.h.g += d), (n.C = 0), n.h.g);
  }
  function Ti(n) {
    return n.g ? n.v == "GET" && n.M != 2 && n.j.Aa : !1;
  }
  function Io(n, o) {
    var d = n.C,
      u = o.indexOf(
        `
`,
        d,
      );
    return u == -1
      ? un
      : ((d = Number(o.substring(d, u))),
        isNaN(d)
          ? Ei
          : ((u += 1),
            u + d > o.length
              ? un
              : ((o = o.slice(u, u + d)), (n.C = u + d), o)));
  }
  Qe.prototype.cancel = function () {
    ((this.K = !0), ct(this));
  };
  function vs(n) {
    ((n.T = Date.now() + n.H), _i(n, n.H));
  }
  function _i(n, o) {
    if (n.D != null) throw Error("WatchDog timer not null");
    n.D = Bt(y(n.aa, n), o);
  }
  function fn(n) {
    n.D && (l.clearTimeout(n.D), (n.D = null));
  }
  Qe.prototype.aa = function () {
    this.D = null;
    const n = Date.now();
    n - this.T >= 0
      ? (Co(this.i, this.B),
        this.M != 2 && (Mt(), Ne(17)),
        ct(this),
        (this.m = 2),
        $t(this))
      : _i(this, this.T - n);
  };
  function $t(n) {
    n.j.I == 0 || n.K || Zi(n.j, n);
  }
  function ct(n) {
    fn(n);
    var o = n.O;
    (o && typeof o.dispose == "function" && o.dispose(),
      (n.O = null),
      xi(n.V),
      n.g && ((o = n.g), (n.g = null), o.abort(), o.dispose()));
  }
  function pn(n, o) {
    try {
      var d = n.j;
      if (d.I != 0 && (d.g == n || gn(d.h, n))) {
        if (!n.L && gn(d.h, n) && d.I == 3) {
          try {
            var u = d.Ba.g.parse(o);
          } catch {
            u = null;
          }
          if (Array.isArray(u) && u.length == 3) {
            var I = u;
            if (I[0] == 0) {
              e: if (!d.v) {
                if (d.g)
                  if (d.g.F + 3e3 < n.F) (Es(d), ws(d));
                  else break e;
                (Nn(d), Ne(18));
              }
            } else
              ((d.xa = I[1]),
                0 < d.xa - d.K &&
                  I[2] < 37500 &&
                  d.F &&
                  d.A == 0 &&
                  !d.C &&
                  (d.C = Bt(y(d.Va, d), 6e3)));
            Ii(d.h) <= 1 && d.ta && (d.ta = void 0);
          } else ht(d, 11);
        } else if (((n.L || d.g == n) && Es(d), !x(o)))
          for (I = d.Ba.g.parse(o), o = 0; o < I.length; o++) {
            let Y = I[o];
            const pe = Y[0];
            if (!(pe <= d.K))
              if (((d.K = pe), (Y = Y[1]), d.I == 2))
                if (Y[0] == "c") {
                  ((d.M = Y[1]), (d.ba = Y[2]));
                  const Ve = Y[3];
                  Ve != null && ((d.ka = Ve), d.j.info("VER=" + d.ka));
                  const ut = Y[4];
                  ut != null && ((d.za = ut), d.j.info("SVER=" + d.za));
                  const st = Y[5];
                  (st != null &&
                    typeof st == "number" &&
                    st > 0 &&
                    ((u = 1.5 * st),
                    (d.O = u),
                    d.j.info("backChannelRequestTimeoutMs_=" + u)),
                    (u = d));
                  const nt = n.g;
                  if (nt) {
                    const Cs = nt.g
                      ? nt.g.getResponseHeader("X-Client-Wire-Protocol")
                      : null;
                    if (Cs) {
                      var k = u.h;
                      k.g ||
                        (Cs.indexOf("spdy") == -1 &&
                          Cs.indexOf("quic") == -1 &&
                          Cs.indexOf("h2") == -1) ||
                        ((k.j = k.l),
                        (k.g = new Set()),
                        k.h && (xn(k, k.h), (k.h = null)));
                    }
                    if (u.G) {
                      const Sn = nt.g
                        ? nt.g.getResponseHeader("X-HTTP-Session-Id")
                        : null;
                      Sn && ((u.wa = Sn), te(u.J, u.G, Sn));
                    }
                  }
                  ((d.I = 3),
                    d.l && d.l.ra(),
                    d.aa &&
                      ((d.T = Date.now() - n.F),
                      d.j.info("Handshake RTT: " + d.T + "ms")),
                    (u = d));
                  var M = n;
                  if (((u.na = sr(u, u.L ? u.ba : null, u.W)), M.L)) {
                    Li(u.h, M);
                    var z = M,
                      me = u.O;
                    (me && (z.H = me), z.D && (fn(z), vs(z)), (u.g = M));
                  } else Yi(u);
                  d.i.length > 0 && Ss(d);
                } else (Y[0] != "stop" && Y[0] != "close") || ht(d, 7);
              else
                d.I == 3 &&
                  (Y[0] == "stop" || Y[0] == "close"
                    ? Y[0] == "stop"
                      ? ht(d, 7)
                      : jn(d)
                    : Y[0] != "noop" && d.l && d.l.qa(Y),
                  (d.A = 0));
          }
      }
      Mt(4);
    } catch {}
  }
  var Lo = class {
    constructor(n, o) {
      ((this.g = n), (this.map = o));
    }
  };
  function Ai(n) {
    ((this.l = n || 10),
      l.PerformanceNavigationTiming
        ? ((n = l.performance.getEntriesByType("navigation")),
          (n =
            n.length > 0 &&
            (n[0].nextHopProtocol == "hq" || n[0].nextHopProtocol == "h2")))
        : (n = !!(
            l.chrome &&
            l.chrome.loadTimes &&
            l.chrome.loadTimes() &&
            l.chrome.loadTimes().wasFetchedViaSpdy
          )),
      (this.j = n ? this.l : 1),
      (this.g = null),
      this.j > 1 && (this.g = new Set()),
      (this.h = null),
      (this.i = []));
  }
  function Ri(n) {
    return n.h ? !0 : n.g ? n.g.size >= n.j : !1;
  }
  function Ii(n) {
    return n.h ? 1 : n.g ? n.g.size : 0;
  }
  function gn(n, o) {
    return n.h ? n.h == o : n.g ? n.g.has(o) : !1;
  }
  function xn(n, o) {
    n.g ? n.g.add(o) : (n.h = o);
  }
  function Li(n, o) {
    n.h && n.h == o ? (n.h = null) : n.g && n.g.has(o) && n.g.delete(o);
  }
  Ai.prototype.cancel = function () {
    if (((this.i = Pi(this)), this.h)) (this.h.cancel(), (this.h = null));
    else if (this.g && this.g.size !== 0) {
      for (const n of this.g.values()) n.cancel();
      this.g.clear();
    }
  };
  function Pi(n) {
    if (n.h != null) return n.i.concat(n.h.G);
    if (n.g != null && n.g.size !== 0) {
      let o = n.i;
      for (const d of n.g.values()) o = o.concat(d.G);
      return o;
    }
    return D(n.i);
  }
  var ki = RegExp(
    "^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$",
  );
  function Po(n, o) {
    if (n) {
      n = n.split("&");
      for (let d = 0; d < n.length; d++) {
        const u = n[d].indexOf("=");
        let I,
          k = null;
        (u >= 0
          ? ((I = n[d].substring(0, u)), (k = n[d].substring(u + 1)))
          : (I = n[d]),
          o(I, k ? decodeURIComponent(k.replace(/\+/g, " ")) : ""));
      }
    }
  }
  function Ze(n) {
    ((this.g = this.o = this.j = ""),
      (this.u = null),
      (this.m = this.h = ""),
      (this.l = !1));
    let o;
    n instanceof Ze
      ? ((this.l = n.l),
        Ht(this, n.j),
        (this.o = n.o),
        (this.g = n.g),
        zt(this, n.u),
        (this.h = n.h),
        yn(this, Ui(n.i)),
        (this.m = n.m))
      : n && (o = String(n).match(ki))
        ? ((this.l = !1),
          Ht(this, o[1] || "", !0),
          (this.o = Wt(o[2] || "")),
          (this.g = Wt(o[3] || "", !0)),
          zt(this, o[4]),
          (this.h = Wt(o[5] || "", !0)),
          yn(this, o[6] || "", !0),
          (this.m = Wt(o[7] || "")))
        : ((this.l = !1), (this.i = new Gt(null, this.l)));
  }
  ((Ze.prototype.toString = function () {
    const n = [];
    var o = this.j;
    o && n.push(qt(o, Di, !0), ":");
    var d = this.g;
    return (
      (d || o == "file") &&
        (n.push("//"),
        (o = this.o) && n.push(qt(o, Di, !0), "@"),
        n.push(Vt(d).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        (d = this.u),
        d != null && n.push(":", String(d))),
      (d = this.h) &&
        (this.g && d.charAt(0) != "/" && n.push("/"),
        n.push(qt(d, d.charAt(0) == "/" ? Oo : Do, !0))),
      (d = this.i.toString()) && n.push("?", d),
      (d = this.m) && n.push("#", qt(d, Mo)),
      n.join("")
    );
  }),
    (Ze.prototype.resolve = function (n) {
      const o = Ue(this);
      let d = !!n.j;
      (d ? Ht(o, n.j) : (d = !!n.o),
        d ? (o.o = n.o) : (d = !!n.g),
        d ? (o.g = n.g) : (d = n.u != null));
      var u = n.h;
      if (d) zt(o, n.u);
      else if ((d = !!n.h)) {
        if (u.charAt(0) != "/")
          if (this.g && !this.h) u = "/" + u;
          else {
            var I = o.h.lastIndexOf("/");
            I != -1 && (u = o.h.slice(0, I + 1) + u);
          }
        if (((I = u), I == ".." || I == ".")) u = "";
        else if (I.indexOf("./") != -1 || I.indexOf("/.") != -1) {
          ((u = I.lastIndexOf("/", 0) == 0), (I = I.split("/")));
          const k = [];
          for (let M = 0; M < I.length; ) {
            const z = I[M++];
            z == "."
              ? u && M == I.length && k.push("")
              : z == ".."
                ? ((k.length > 1 || (k.length == 1 && k[0] != "")) && k.pop(),
                  u && M == I.length && k.push(""))
                : (k.push(z), (u = !0));
          }
          u = k.join("/");
        } else u = I;
      }
      return (
        d ? (o.h = u) : (d = n.i.toString() !== ""),
        d ? yn(o, Ui(n.i)) : (d = !!n.m),
        d && (o.m = n.m),
        o
      );
    }));
  function Ue(n) {
    return new Ze(n);
  }
  function Ht(n, o, d) {
    ((n.j = d ? Wt(o, !0) : o), n.j && (n.j = n.j.replace(/:$/, "")));
  }
  function zt(n, o) {
    if (o) {
      if (((o = Number(o)), isNaN(o) || o < 0))
        throw Error("Bad port number " + o);
      n.u = o;
    } else n.u = null;
  }
  function yn(n, o, d) {
    o instanceof Gt
      ? ((n.i = o), Bo(n.i, n.l))
      : (d || (o = qt(o, Fo)), (n.i = new Gt(o, n.l)));
  }
  function te(n, o, d) {
    n.i.set(o, d);
  }
  function bs(n) {
    return (
      te(
        n,
        "zx",
        Math.floor(Math.random() * 2147483648).toString(36) +
          Math.abs(
            Math.floor(Math.random() * 2147483648) ^ Date.now(),
          ).toString(36),
      ),
      n
    );
  }
  function Wt(n, o) {
    return n
      ? o
        ? decodeURI(n.replace(/%25/g, "%2525"))
        : decodeURIComponent(n)
      : "";
  }
  function qt(n, o, d) {
    return typeof n == "string"
      ? ((n = encodeURI(n).replace(o, ko)),
        d && (n = n.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        n)
      : null;
  }
  function ko(n) {
    return (
      (n = n.charCodeAt(0)),
      "%" + ((n >> 4) & 15).toString(16) + (n & 15).toString(16)
    );
  }
  var Di = /[#\/\?@]/g,
    Do = /[#\?:]/g,
    Oo = /[#\?]/g,
    Fo = /[#\?@]/g,
    Mo = /#/g;
  function Gt(n, o) {
    ((this.h = this.g = null), (this.i = n || null), (this.j = !!o));
  }
  function dt(n) {
    n.g ||
      ((n.g = new Map()),
      (n.h = 0),
      n.i &&
        Po(n.i, function (o, d) {
          n.add(decodeURIComponent(o.replace(/\+/g, " ")), d);
        }));
  }
  ((t = Gt.prototype),
    (t.add = function (n, o) {
      (dt(this), (this.i = null), (n = Et(this, n)));
      let d = this.g.get(n);
      return (d || this.g.set(n, (d = [])), d.push(o), (this.h += 1), this);
    }));
  function Oi(n, o) {
    (dt(n),
      (o = Et(n, o)),
      n.g.has(o) && ((n.i = null), (n.h -= n.g.get(o).length), n.g.delete(o)));
  }
  function Fi(n, o) {
    return (dt(n), (o = Et(n, o)), n.g.has(o));
  }
  t.forEach = function (n, o) {
    (dt(this),
      this.g.forEach(function (d, u) {
        d.forEach(function (I) {
          n.call(o, I, u, this);
        }, this);
      }, this));
  };
  function Mi(n, o) {
    dt(n);
    let d = [];
    if (typeof o == "string") Fi(n, o) && (d = d.concat(n.g.get(Et(n, o))));
    else
      for (n = Array.from(n.g.values()), o = 0; o < n.length; o++)
        d = d.concat(n[o]);
    return d;
  }
  ((t.set = function (n, o) {
    return (
      dt(this),
      (this.i = null),
      (n = Et(this, n)),
      Fi(this, n) && (this.h -= this.g.get(n).length),
      this.g.set(n, [o]),
      (this.h += 1),
      this
    );
  }),
    (t.get = function (n, o) {
      return n ? ((n = Mi(this, n)), n.length > 0 ? String(n[0]) : o) : o;
    }));
  function Bi(n, o, d) {
    (Oi(n, o),
      d.length > 0 &&
        ((n.i = null), n.g.set(Et(n, o), D(d)), (n.h += d.length)));
  }
  t.toString = function () {
    if (this.i) return this.i;
    if (!this.g) return "";
    const n = [],
      o = Array.from(this.g.keys());
    for (let u = 0; u < o.length; u++) {
      var d = o[u];
      const I = Vt(d);
      d = Mi(this, d);
      for (let k = 0; k < d.length; k++) {
        let M = I;
        (d[k] !== "" && (M += "=" + Vt(d[k])), n.push(M));
      }
    }
    return (this.i = n.join("&"));
  };
  function Ui(n) {
    const o = new Gt();
    return ((o.i = n.i), n.g && ((o.g = new Map(n.g)), (o.h = n.h)), o);
  }
  function Et(n, o) {
    return ((o = String(o)), n.j && (o = o.toLowerCase()), o);
  }
  function Bo(n, o) {
    (o &&
      !n.j &&
      (dt(n),
      (n.i = null),
      n.g.forEach(function (d, u) {
        const I = u.toLowerCase();
        u != I && (Oi(this, u), Bi(this, I, d));
      }, n)),
      (n.j = o));
  }
  function Uo(n, o) {
    const d = new Ut();
    if (l.Image) {
      const u = new Image();
      ((u.onload = j(et, d, "TestLoadImage: loaded", !0, o, u)),
        (u.onerror = j(et, d, "TestLoadImage: error", !1, o, u)),
        (u.onabort = j(et, d, "TestLoadImage: abort", !1, o, u)),
        (u.ontimeout = j(et, d, "TestLoadImage: timeout", !1, o, u)),
        l.setTimeout(function () {
          u.ontimeout && u.ontimeout();
        }, 1e4),
        (u.src = n));
    } else o(!1);
  }
  function Vo(n, o) {
    const d = new Ut(),
      u = new AbortController(),
      I = setTimeout(() => {
        (u.abort(), et(d, "TestPingServer: timeout", !1, o));
      }, 1e4);
    fetch(n, { signal: u.signal })
      .then((k) => {
        (clearTimeout(I),
          k.ok
            ? et(d, "TestPingServer: ok", !0, o)
            : et(d, "TestPingServer: server error", !1, o));
      })
      .catch(() => {
        (clearTimeout(I), et(d, "TestPingServer: error", !1, o));
      });
  }
  function et(n, o, d, u, I) {
    try {
      (I &&
        ((I.onload = null),
        (I.onerror = null),
        (I.onabort = null),
        (I.ontimeout = null)),
        u(d));
    } catch {}
  }
  function $o() {
    this.g = new No();
  }
  function vn(n) {
    ((this.i = n.Sb || null), (this.h = n.ab || !1));
  }
  (N(vn, yi),
    (vn.prototype.g = function () {
      return new js(this.i, this.h);
    }));
  function js(n, o) {
    (ye.call(this),
      (this.H = n),
      (this.o = o),
      (this.m = void 0),
      (this.status = this.readyState = 0),
      (this.responseType =
        this.responseText =
        this.response =
        this.statusText =
          ""),
      (this.onreadystatechange = null),
      (this.A = new Headers()),
      (this.h = null),
      (this.F = "GET"),
      (this.D = ""),
      (this.g = !1),
      (this.B = this.j = this.l = null),
      (this.v = new AbortController()));
  }
  (N(js, ye),
    (t = js.prototype),
    (t.open = function (n, o) {
      if (this.readyState != 0)
        throw (this.abort(), Error("Error reopening a connection"));
      ((this.F = n), (this.D = o), (this.readyState = 1), Kt(this));
    }),
    (t.send = function (n) {
      if (this.readyState != 1)
        throw (this.abort(), Error("need to call open() first. "));
      if (this.v.signal.aborted)
        throw (this.abort(), Error("Request was aborted."));
      this.g = !0;
      const o = {
        headers: this.A,
        method: this.F,
        credentials: this.m,
        cache: void 0,
        signal: this.v.signal,
      };
      (n && (o.body = n),
        (this.H || l)
          .fetch(new Request(this.D, o))
          .then(this.Pa.bind(this), this.ga.bind(this)));
    }),
    (t.abort = function () {
      ((this.response = this.responseText = ""),
        (this.A = new Headers()),
        (this.status = 0),
        this.v.abort(),
        this.j && this.j.cancel("Request was aborted.").catch(() => {}),
        this.readyState >= 1 &&
          this.g &&
          this.readyState != 4 &&
          ((this.g = !1), Jt(this)),
        (this.readyState = 0));
    }),
    (t.Pa = function (n) {
      if (
        this.g &&
        ((this.l = n),
        this.h ||
          ((this.status = this.l.status),
          (this.statusText = this.l.statusText),
          (this.h = n.headers),
          (this.readyState = 2),
          Kt(this)),
        this.g && ((this.readyState = 3), Kt(this), this.g))
      )
        if (this.responseType === "arraybuffer")
          n.arrayBuffer().then(this.Na.bind(this), this.ga.bind(this));
        else if (typeof l.ReadableStream < "u" && "body" in n) {
          if (((this.j = n.body.getReader()), this.o)) {
            if (this.responseType)
              throw Error(
                'responseType must be empty for "streamBinaryChunks" mode responses.',
              );
            this.response = [];
          } else
            ((this.response = this.responseText = ""),
              (this.B = new TextDecoder()));
          Vi(this);
        } else n.text().then(this.Oa.bind(this), this.ga.bind(this));
    }));
  function Vi(n) {
    n.j.read().then(n.Ma.bind(n)).catch(n.ga.bind(n));
  }
  ((t.Ma = function (n) {
    if (this.g) {
      if (this.o && n.value) this.response.push(n.value);
      else if (!this.o) {
        var o = n.value ? n.value : new Uint8Array(0);
        (o = this.B.decode(o, { stream: !n.done })) &&
          (this.response = this.responseText += o);
      }
      (n.done ? Jt(this) : Kt(this), this.readyState == 3 && Vi(this));
    }
  }),
    (t.Oa = function (n) {
      this.g && ((this.response = this.responseText = n), Jt(this));
    }),
    (t.Na = function (n) {
      this.g && ((this.response = n), Jt(this));
    }),
    (t.ga = function () {
      this.g && Jt(this);
    }));
  function Jt(n) {
    ((n.readyState = 4), (n.l = null), (n.j = null), (n.B = null), Kt(n));
  }
  ((t.setRequestHeader = function (n, o) {
    this.A.append(n, o);
  }),
    (t.getResponseHeader = function (n) {
      return (this.h && this.h.get(n.toLowerCase())) || "";
    }),
    (t.getAllResponseHeaders = function () {
      if (!this.h) return "";
      const n = [],
        o = this.h.entries();
      for (var d = o.next(); !d.done; )
        ((d = d.value), n.push(d[0] + ": " + d[1]), (d = o.next()));
      return n.join(`\r
`);
    }));
  function Kt(n) {
    n.onreadystatechange && n.onreadystatechange.call(n);
  }
  Object.defineProperty(js.prototype, "withCredentials", {
    get: function () {
      return this.m === "include";
    },
    set: function (n) {
      this.m = n ? "include" : "same-origin";
    },
  });
  function $i(n) {
    let o = "";
    return (
      Se(n, function (d, u) {
        ((o += u),
          (o += ":"),
          (o += d),
          (o += `\r
`));
      }),
      o
    );
  }
  function bn(n, o, d) {
    e: {
      for (u in d) {
        var u = !1;
        break e;
      }
      u = !0;
    }
    u || ((d = $i(d)), typeof n == "string" ? d != null && Vt(d) : te(n, o, d));
  }
  function re(n) {
    (ye.call(this),
      (this.headers = new Map()),
      (this.L = n || null),
      (this.h = !1),
      (this.g = null),
      (this.D = ""),
      (this.o = 0),
      (this.l = ""),
      (this.j = this.B = this.v = this.A = !1),
      (this.m = null),
      (this.F = ""),
      (this.H = !1));
  }
  N(re, ye);
  var Ho = /^https?$/i,
    zo = ["POST", "PUT"];
  ((t = re.prototype),
    (t.Fa = function (n) {
      this.H = n;
    }),
    (t.ea = function (n, o, d, u) {
      if (this.g)
        throw Error(
          "[goog.net.XhrIo] Object is active with another request=" +
            this.D +
            "; newUri=" +
            n,
        );
      ((o = o ? o.toUpperCase() : "GET"),
        (this.D = n),
        (this.l = ""),
        (this.o = 0),
        (this.A = !1),
        (this.h = !0),
        (this.g = this.L ? this.L.g() : wi.g()),
        (this.g.onreadystatechange = _(y(this.Ca, this))));
      try {
        ((this.B = !0), this.g.open(o, String(n), !0), (this.B = !1));
      } catch (k) {
        Hi(this, k);
        return;
      }
      if (((n = d || ""), (d = new Map(this.headers)), u))
        if (Object.getPrototypeOf(u) === Object.prototype)
          for (var I in u) d.set(I, u[I]);
        else if (typeof u.keys == "function" && typeof u.get == "function")
          for (const k of u.keys()) d.set(k, u.get(k));
        else throw Error("Unknown input type for opt_headers: " + String(u));
      ((u = Array.from(d.keys()).find(
        (k) => k.toLowerCase() == "content-type",
      )),
        (I = l.FormData && n instanceof l.FormData),
        !(Array.prototype.indexOf.call(zo, o, void 0) >= 0) ||
          u ||
          I ||
          d.set(
            "Content-Type",
            "application/x-www-form-urlencoded;charset=utf-8",
          ));
      for (const [k, M] of d) this.g.setRequestHeader(k, M);
      (this.F && (this.g.responseType = this.F),
        "withCredentials" in this.g &&
          this.g.withCredentials !== this.H &&
          (this.g.withCredentials = this.H));
      try {
        (this.m && (clearTimeout(this.m), (this.m = null)),
          (this.v = !0),
          this.g.send(n),
          (this.v = !1));
      } catch (k) {
        Hi(this, k);
      }
    }));
  function Hi(n, o) {
    ((n.h = !1),
      n.g && ((n.j = !0), n.g.abort(), (n.j = !1)),
      (n.l = o),
      (n.o = 5),
      zi(n),
      Ns(n));
  }
  function zi(n) {
    n.A || ((n.A = !0), je(n, "complete"), je(n, "error"));
  }
  ((t.abort = function (n) {
    this.g &&
      this.h &&
      ((this.h = !1),
      (this.j = !0),
      this.g.abort(),
      (this.j = !1),
      (this.o = n || 7),
      je(this, "complete"),
      je(this, "abort"),
      Ns(this));
  }),
    (t.N = function () {
      (this.g &&
        (this.h &&
          ((this.h = !1), (this.j = !0), this.g.abort(), (this.j = !1)),
        Ns(this, !0)),
        re.Z.N.call(this));
    }),
    (t.Ca = function () {
      this.u || (this.B || this.v || this.j ? Wi(this) : this.Xa());
    }),
    (t.Xa = function () {
      Wi(this);
    }));
  function Wi(n) {
    if (n.h && typeof c < "u") {
      if (n.v && tt(n) == 4) setTimeout(n.Ca.bind(n), 0);
      else if ((je(n, "readystatechange"), tt(n) == 4)) {
        n.h = !1;
        try {
          const k = n.ca();
          e: switch (k) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var o = !0;
              break e;
            default:
              o = !1;
          }
          var d;
          if (!(d = o)) {
            var u;
            if ((u = k === 0)) {
              let M = String(n.D).match(ki)[1] || null;
              (!M &&
                l.self &&
                l.self.location &&
                (M = l.self.location.protocol.slice(0, -1)),
                (u = !Ho.test(M ? M.toLowerCase() : "")));
            }
            d = u;
          }
          if (d) (je(n, "complete"), je(n, "success"));
          else {
            n.o = 6;
            try {
              var I = tt(n) > 2 ? n.g.statusText : "";
            } catch {
              I = "";
            }
            ((n.l = I + " [" + n.ca() + "]"), zi(n));
          }
        } finally {
          Ns(n);
        }
      }
    }
  }
  function Ns(n, o) {
    if (n.g) {
      n.m && (clearTimeout(n.m), (n.m = null));
      const d = n.g;
      ((n.g = null), o || je(n, "ready"));
      try {
        d.onreadystatechange = null;
      } catch {}
    }
  }
  t.isActive = function () {
    return !!this.g;
  };
  function tt(n) {
    return n.g ? n.g.readyState : 0;
  }
  ((t.ca = function () {
    try {
      return tt(this) > 2 ? this.g.status : -1;
    } catch {
      return -1;
    }
  }),
    (t.la = function () {
      try {
        return this.g ? this.g.responseText : "";
      } catch {
        return "";
      }
    }),
    (t.La = function (n) {
      if (this.g) {
        var o = this.g.responseText;
        return (n && o.indexOf(n) == 0 && (o = o.substring(n.length)), jo(o));
      }
    }));
  function qi(n) {
    try {
      if (!n.g) return null;
      if ("response" in n.g) return n.g.response;
      switch (n.F) {
        case "":
        case "text":
          return n.g.responseText;
        case "arraybuffer":
          if ("mozResponseArrayBuffer" in n.g)
            return n.g.mozResponseArrayBuffer;
      }
      return null;
    } catch {
      return null;
    }
  }
  function Wo(n) {
    const o = {};
    n = ((n.g && tt(n) >= 2 && n.g.getAllResponseHeaders()) || "").split(`\r
`);
    for (let u = 0; u < n.length; u++) {
      if (x(n[u])) continue;
      var d = Ao(n[u]);
      const I = d[0];
      if (((d = d[1]), typeof d != "string")) continue;
      d = d.trim();
      const k = o[I] || [];
      ((o[I] = k), k.push(d));
    }
    Be(o, function (u) {
      return u.join(", ");
    });
  }
  ((t.ya = function () {
    return this.o;
  }),
    (t.Ha = function () {
      return typeof this.l == "string" ? this.l : String(this.l);
    }));
  function Xt(n, o, d) {
    return (d && d.internalChannelParams && d.internalChannelParams[n]) || o;
  }
  function Gi(n) {
    ((this.za = 0),
      (this.i = []),
      (this.j = new Ut()),
      (this.ba =
        this.na =
        this.J =
        this.W =
        this.g =
        this.wa =
        this.G =
        this.H =
        this.u =
        this.U =
        this.o =
          null),
      (this.Ya = this.V = 0),
      (this.Sa = Xt("failFast", !1, n)),
      (this.F = this.C = this.v = this.m = this.l = null),
      (this.X = !0),
      (this.xa = this.K = -1),
      (this.Y = this.A = this.D = 0),
      (this.Qa = Xt("baseRetryDelayMs", 5e3, n)),
      (this.Za = Xt("retryDelaySeedMs", 1e4, n)),
      (this.Ta = Xt("forwardChannelMaxRetries", 2, n)),
      (this.va = Xt("forwardChannelRequestTimeoutMs", 2e4, n)),
      (this.ma = (n && n.xmlHttpFactory) || void 0),
      (this.Ua = (n && n.Rb) || void 0),
      (this.Aa = (n && n.useFetchStreams) || !1),
      (this.O = void 0),
      (this.L = (n && n.supportsCrossDomainXhr) || !1),
      (this.M = ""),
      (this.h = new Ai(n && n.concurrentRequestLimit)),
      (this.Ba = new $o()),
      (this.S = (n && n.fastHandshake) || !1),
      (this.R = (n && n.encodeInitMessageHeaders) || !1),
      this.S && this.R && (this.R = !1),
      (this.Ra = (n && n.Pb) || !1),
      n && n.ua && this.j.ua(),
      n && n.forceLongPolling && (this.X = !1),
      (this.aa = (!this.S && this.X && n && n.detectBufferingProxy) || !1),
      (this.ia = void 0),
      n &&
        n.longPollingTimeout &&
        n.longPollingTimeout > 0 &&
        (this.ia = n.longPollingTimeout),
      (this.ta = void 0),
      (this.T = 0),
      (this.P = !1),
      (this.ja = this.B = null));
  }
  ((t = Gi.prototype),
    (t.ka = 8),
    (t.I = 1),
    (t.connect = function (n, o, d, u) {
      (Ne(0),
        (this.W = n),
        (this.H = o || {}),
        d && u !== void 0 && ((this.H.OSID = d), (this.H.OAID = u)),
        (this.F = this.X),
        (this.J = sr(this, null, this.W)),
        Ss(this));
    }));
  function jn(n) {
    if ((Ji(n), n.I == 3)) {
      var o = n.V++,
        d = Ue(n.J);
      if (
        (te(d, "SID", n.M),
        te(d, "RID", o),
        te(d, "TYPE", "terminate"),
        Yt(n, d),
        (o = new Qe(n, n.j, o)),
        (o.M = 2),
        (o.A = bs(Ue(d))),
        (d = !1),
        l.navigator && l.navigator.sendBeacon)
      )
        try {
          d = l.navigator.sendBeacon(o.A.toString(), "");
        } catch {}
      (!d && l.Image && ((new Image().src = o.A), (d = !0)),
        d || ((o.g = nr(o.j, null)), o.g.ea(o.A)),
        (o.F = Date.now()),
        vs(o));
    }
    tr(n);
  }
  function ws(n) {
    n.g && (wn(n), n.g.cancel(), (n.g = null));
  }
  function Ji(n) {
    (ws(n),
      n.v && (l.clearTimeout(n.v), (n.v = null)),
      Es(n),
      n.h.cancel(),
      n.m && (typeof n.m == "number" && l.clearTimeout(n.m), (n.m = null)));
  }
  function Ss(n) {
    if (!Ri(n.h) && !n.m) {
      n.m = !0;
      var o = n.Ea;
      (F || m(), U || (F(), (U = !0)), b.add(o, n), (n.D = 0));
    }
  }
  function qo(n, o) {
    return Ii(n.h) >= n.h.j - (n.m ? 1 : 0)
      ? !1
      : n.m
        ? ((n.i = o.G.concat(n.i)), !0)
        : n.I == 1 || n.I == 2 || n.D >= (n.Sa ? 0 : n.Ta)
          ? !1
          : ((n.m = Bt(y(n.Ea, n, o), er(n, n.D))), n.D++, !0);
  }
  t.Ea = function (n) {
    if (this.m)
      if (((this.m = null), this.I == 1)) {
        if (!n) {
          ((this.V = Math.floor(Math.random() * 1e5)), (n = this.V++));
          const I = new Qe(this, this.j, n);
          let k = this.o;
          if (
            (this.U && (k ? ((k = he(k)), ue(k, this.U)) : (k = this.U)),
            this.u !== null || this.R || ((I.J = k), (k = null)),
            this.S)
          )
            e: {
              for (var o = 0, d = 0; d < this.i.length; d++) {
                t: {
                  var u = this.i[d];
                  if (
                    "__data__" in u.map &&
                    ((u = u.map.__data__), typeof u == "string")
                  ) {
                    u = u.length;
                    break t;
                  }
                  u = void 0;
                }
                if (u === void 0) break;
                if (((o += u), o > 4096)) {
                  o = d;
                  break e;
                }
                if (o === 4096 || d === this.i.length - 1) {
                  o = d + 1;
                  break e;
                }
              }
              o = 1e3;
            }
          else o = 1e3;
          ((o = Xi(this, I, o)),
            (d = Ue(this.J)),
            te(d, "RID", n),
            te(d, "CVER", 22),
            this.G && te(d, "X-HTTP-Session-Id", this.G),
            Yt(this, d),
            k &&
              (this.R
                ? (o = "headers=" + Vt($i(k)) + "&" + o)
                : this.u && bn(d, this.u, k)),
            xn(this.h, I),
            this.Ra && te(d, "TYPE", "init"),
            this.S
              ? (te(d, "$req", o),
                te(d, "SID", "null"),
                (I.U = !0),
                mn(I, d, null))
              : mn(I, d, o),
            (this.I = 2));
        }
      } else
        this.I == 3 &&
          (n ? Ki(this, n) : this.i.length == 0 || Ri(this.h) || Ki(this));
  };
  function Ki(n, o) {
    var d;
    o ? (d = o.l) : (d = n.V++);
    const u = Ue(n.J);
    (te(u, "SID", n.M),
      te(u, "RID", d),
      te(u, "AID", n.K),
      Yt(n, u),
      n.u && n.o && bn(u, n.u, n.o),
      (d = new Qe(n, n.j, d, n.D + 1)),
      n.u === null && (d.J = n.o),
      o && (n.i = o.G.concat(n.i)),
      (o = Xi(n, d, 1e3)),
      (d.H = Math.round(n.va * 0.5) + Math.round(n.va * 0.5 * Math.random())),
      xn(n.h, d),
      mn(d, u, o));
  }
  function Yt(n, o) {
    (n.H &&
      Se(n.H, function (d, u) {
        te(o, u, d);
      }),
      n.l &&
        Se({}, function (d, u) {
          te(o, u, d);
        }));
  }
  function Xi(n, o, d) {
    d = Math.min(n.i.length, d);
    const u = n.l ? y(n.l.Ka, n.l, n) : null;
    e: {
      var I = n.i;
      let z = -1;
      for (;;) {
        const me = ["count=" + d];
        z == -1
          ? d > 0
            ? ((z = I[0].g), me.push("ofs=" + z))
            : (z = 0)
          : me.push("ofs=" + z);
        let Y = !0;
        for (let pe = 0; pe < d; pe++) {
          var k = I[pe].g;
          const Ve = I[pe].map;
          if (((k -= z), k < 0)) ((z = Math.max(0, I[pe].g - 100)), (Y = !1));
          else
            try {
              k = "req" + k + "_" || "";
              try {
                var M = Ve instanceof Map ? Ve : Object.entries(Ve);
                for (const [ut, st] of M) {
                  let nt = st;
                  (h(st) && (nt = an(st)),
                    me.push(k + ut + "=" + encodeURIComponent(nt)));
                }
              } catch (ut) {
                throw (
                  me.push(k + "type=" + encodeURIComponent("_badmap")),
                  ut
                );
              }
            } catch {
              u && u(Ve);
            }
        }
        if (Y) {
          M = me.join("&");
          break e;
        }
      }
      M = void 0;
    }
    return ((n = n.i.splice(0, d)), (o.G = n), M);
  }
  function Yi(n) {
    if (!n.g && !n.v) {
      n.Y = 1;
      var o = n.Da;
      (F || m(), U || (F(), (U = !0)), b.add(o, n), (n.A = 0));
    }
  }
  function Nn(n) {
    return n.g || n.v || n.A >= 3
      ? !1
      : (n.Y++, (n.v = Bt(y(n.Da, n), er(n, n.A))), n.A++, !0);
  }
  ((t.Da = function () {
    if (
      ((this.v = null),
      Qi(this),
      this.aa && !(this.P || this.g == null || this.T <= 0))
    ) {
      var n = 4 * this.T;
      (this.j.info("BP detection timer enabled: " + n),
        (this.B = Bt(y(this.Wa, this), n)));
    }
  }),
    (t.Wa = function () {
      this.B &&
        ((this.B = null),
        this.j.info("BP detection timeout reached."),
        this.j.info("Buffering proxy detected and switch to long-polling!"),
        (this.F = !1),
        (this.P = !0),
        Ne(10),
        ws(this),
        Qi(this));
    }));
  function wn(n) {
    n.B != null && (l.clearTimeout(n.B), (n.B = null));
  }
  function Qi(n) {
    ((n.g = new Qe(n, n.j, "rpc", n.Y)),
      n.u === null && (n.g.J = n.o),
      (n.g.P = 0));
    var o = Ue(n.na);
    (te(o, "RID", "rpc"),
      te(o, "SID", n.M),
      te(o, "AID", n.K),
      te(o, "CI", n.F ? "0" : "1"),
      !n.F && n.ia && te(o, "TO", n.ia),
      te(o, "TYPE", "xmlhttp"),
      Yt(n, o),
      n.u && n.o && bn(o, n.u, n.o),
      n.O && (n.g.H = n.O));
    var d = n.g;
    ((n = n.ba),
      (d.M = 1),
      (d.A = bs(Ue(o))),
      (d.u = null),
      (d.R = !0),
      Ci(d, n));
  }
  t.Va = function () {
    this.C != null && ((this.C = null), ws(this), Nn(this), Ne(19));
  };
  function Es(n) {
    n.C != null && (l.clearTimeout(n.C), (n.C = null));
  }
  function Zi(n, o) {
    var d = null;
    if (n.g == o) {
      (Es(n), wn(n), (n.g = null));
      var u = 2;
    } else if (gn(n.h, o)) ((d = o.G), Li(n.h, o), (u = 1));
    else return;
    if (n.I != 0) {
      if (o.o)
        if (u == 1) {
          ((d = o.u ? o.u.length : 0), (o = Date.now() - o.F));
          var I = n.D;
          ((u = cn()), je(u, new Ni(u, d)), Ss(n));
        } else Yi(n);
      else if (
        ((I = o.m),
        I == 3 ||
          (I == 0 && o.X > 0) ||
          !((u == 1 && qo(n, o)) || (u == 2 && Nn(n))))
      )
        switch ((d && d.length > 0 && ((o = n.h), (o.i = o.i.concat(d))), I)) {
          case 1:
            ht(n, 5);
            break;
          case 4:
            ht(n, 10);
            break;
          case 3:
            ht(n, 6);
            break;
          default:
            ht(n, 2);
        }
    }
  }
  function er(n, o) {
    let d = n.Qa + Math.floor(Math.random() * n.Za);
    return (n.isActive() || (d *= 2), d * o);
  }
  function ht(n, o) {
    if ((n.j.info("Error code " + o), o == 2)) {
      var d = y(n.bb, n),
        u = n.Ua;
      const I = !u;
      ((u = new Ze(u || "//www.google.com/images/cleardot.gif")),
        (l.location && l.location.protocol == "http") || Ht(u, "https"),
        bs(u),
        I ? Uo(u.toString(), d) : Vo(u.toString(), d));
    } else Ne(2);
    ((n.I = 0), n.l && n.l.pa(o), tr(n), Ji(n));
  }
  t.bb = function (n) {
    n
      ? (this.j.info("Successfully pinged google.com"), Ne(2))
      : (this.j.info("Failed to ping google.com"), Ne(1));
  };
  function tr(n) {
    if (((n.I = 0), (n.ja = []), n.l)) {
      const o = Pi(n.h);
      ((o.length != 0 || n.i.length != 0) &&
        (E(n.ja, o),
        E(n.ja, n.i),
        (n.h.i.length = 0),
        D(n.i),
        (n.i.length = 0)),
        n.l.oa());
    }
  }
  function sr(n, o, d) {
    var u = d instanceof Ze ? Ue(d) : new Ze(d);
    if (u.g != "") (o && (u.g = o + "." + u.g), zt(u, u.u));
    else {
      var I = l.location;
      ((u = I.protocol),
        (o = o ? o + "." + I.hostname : I.hostname),
        (I = +I.port));
      const k = new Ze(null);
      (u && Ht(k, u), o && (k.g = o), I && zt(k, I), d && (k.h = d), (u = k));
    }
    return (
      (d = n.G),
      (o = n.wa),
      d && o && te(u, d, o),
      te(u, "VER", n.ka),
      Yt(n, u),
      u
    );
  }
  function nr(n, o, d) {
    if (o && !n.L)
      throw Error("Can't create secondary domain capable XhrIo object.");
    return (
      (o = n.Aa && !n.ma ? new re(new vn({ ab: d })) : new re(n.ma)),
      o.Fa(n.L),
      o
    );
  }
  t.isActive = function () {
    return !!this.l && this.l.isActive(this);
  };
  function ir() {}
  ((t = ir.prototype),
    (t.ra = function () {}),
    (t.qa = function () {}),
    (t.pa = function () {}),
    (t.oa = function () {}),
    (t.isActive = function () {
      return !0;
    }),
    (t.Ka = function () {}));
  function Ie(n, o) {
    (ye.call(this),
      (this.g = new Gi(o)),
      (this.l = n),
      (this.h = (o && o.messageUrlParams) || null),
      (n = (o && o.messageHeaders) || null),
      o &&
        o.clientProtocolHeaderRequired &&
        (n
          ? (n["X-Client-Protocol"] = "webchannel")
          : (n = { "X-Client-Protocol": "webchannel" })),
      (this.g.o = n),
      (n = (o && o.initMessageHeaders) || null),
      o &&
        o.messageContentType &&
        (n
          ? (n["X-WebChannel-Content-Type"] = o.messageContentType)
          : (n = { "X-WebChannel-Content-Type": o.messageContentType })),
      o &&
        o.sa &&
        (n
          ? (n["X-WebChannel-Client-Profile"] = o.sa)
          : (n = { "X-WebChannel-Client-Profile": o.sa })),
      (this.g.U = n),
      (n = o && o.Qb) && !x(n) && (this.g.u = n),
      (this.A = (o && o.supportsCrossDomainXhr) || !1),
      (this.v = (o && o.sendRawJson) || !1),
      (o = o && o.httpSessionIdParam) &&
        !x(o) &&
        ((this.g.G = o),
        (n = this.h),
        n !== null && o in n && ((n = this.h), o in n && delete n[o])),
      (this.j = new Ct(this)));
  }
  (N(Ie, ye),
    (Ie.prototype.m = function () {
      ((this.g.l = this.j),
        this.A && (this.g.L = !0),
        this.g.connect(this.l, this.h || void 0));
    }),
    (Ie.prototype.close = function () {
      jn(this.g);
    }),
    (Ie.prototype.o = function (n) {
      var o = this.g;
      if (typeof n == "string") {
        var d = {};
        ((d.__data__ = n), (n = d));
      } else this.v && ((d = {}), (d.__data__ = an(n)), (n = d));
      (o.i.push(new Lo(o.Ya++, n)), o.I == 3 && Ss(o));
    }),
    (Ie.prototype.N = function () {
      ((this.g.l = null),
        delete this.j,
        jn(this.g),
        delete this.g,
        Ie.Z.N.call(this));
    }));
  function rr(n) {
    (on.call(this),
      n.__headers__ &&
        ((this.headers = n.__headers__),
        (this.statusCode = n.__status__),
        delete n.__headers__,
        delete n.__status__));
    var o = n.__sm__;
    if (o) {
      e: {
        for (const d in o) {
          n = d;
          break e;
        }
        n = void 0;
      }
      ((this.i = n) &&
        ((n = this.i), (o = o !== null && n in o ? o[n] : void 0)),
        (this.data = o));
    } else this.data = n;
  }
  N(rr, on);
  function ar() {
    (ln.call(this), (this.status = 1));
  }
  N(ar, ln);
  function Ct(n) {
    this.g = n;
  }
  (N(Ct, ir),
    (Ct.prototype.ra = function () {
      je(this.g, "a");
    }),
    (Ct.prototype.qa = function (n) {
      je(this.g, new rr(n));
    }),
    (Ct.prototype.pa = function (n) {
      je(this.g, new ar());
    }),
    (Ct.prototype.oa = function () {
      je(this.g, "b");
    }),
    (Ie.prototype.send = Ie.prototype.o),
    (Ie.prototype.open = Ie.prototype.m),
    (Ie.prototype.close = Ie.prototype.close),
    (dn.NO_ERROR = 0),
    (dn.TIMEOUT = 8),
    (dn.HTTP_ERROR = 6),
    (_o.COMPLETE = "complete"),
    (wo.EventType = Ft),
    (Ft.OPEN = "a"),
    (Ft.CLOSE = "b"),
    (Ft.ERROR = "c"),
    (Ft.MESSAGE = "d"),
    (ye.prototype.listen = ye.prototype.J),
    (re.prototype.listenOnce = re.prototype.K),
    (re.prototype.getLastError = re.prototype.Ha),
    (re.prototype.getLastErrorCode = re.prototype.ya),
    (re.prototype.getStatus = re.prototype.ca),
    (re.prototype.getResponseJson = re.prototype.La),
    (re.prototype.getResponseText = re.prototype.la),
    (re.prototype.send = re.prototype.ea),
    (re.prototype.setWithCredentials = re.prototype.Fa));
}).apply(
  typeof Rs < "u"
    ? Rs
    : typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : {},
);
const Hr = "@firebase/firestore",
  zr = "4.9.2";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class _e {
  constructor(e) {
    this.uid = e;
  }
  isAuthenticated() {
    return this.uid != null;
  }
  toKey() {
    return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
  }
  isEqual(e) {
    return e.uid === this.uid;
  }
}
((_e.UNAUTHENTICATED = new _e(null)),
  (_e.GOOGLE_CREDENTIALS = new _e("google-credentials-uid")),
  (_e.FIRST_PARTY = new _e("first-party-uid")),
  (_e.MOCK_USER = new _e("mock-user")));
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ let tn = "12.3.0";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const zs = new no("@firebase/firestore");
function Fe(t, ...e) {
  if (zs.logLevel <= Q.DEBUG) {
    const i = e.map(co);
    zs.debug(`Firestore (${tn}): ${t}`, ...i);
  }
}
function lo(t, ...e) {
  if (zs.logLevel <= Q.ERROR) {
    const i = e.map(co);
    zs.error(`Firestore (${tn}): ${t}`, ...i);
  }
}
function co(t) {
  if (typeof t == "string") return t;
  try {
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ return (function (i) {
      return JSON.stringify(i);
    })(t);
  } catch {
    return t;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Ws(t, e, i) {
  let r = "Unexpected state";
  (typeof e == "string" ? (r = e) : (i = e), ho(t, r, i));
}
function ho(t, e, i) {
  let r = `FIRESTORE (${tn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;
  if (i !== void 0)
    try {
      r += " CONTEXT: " + JSON.stringify(i);
    } catch {
      r += " CONTEXT: " + i;
    }
  throw (lo(r), new Error(r));
}
function ss(t, e, i, r) {
  let a = "Unexpected state";
  (typeof i == "string" ? (a = i) : (r = i), t || ho(e, a, r));
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const G = {
  CANCELLED: "cancelled",
  INVALID_ARGUMENT: "invalid-argument",
  FAILED_PRECONDITION: "failed-precondition",
};
class J extends kt {
  constructor(e, i) {
    (super(e, i),
      (this.code = e),
      (this.message = i),
      (this.toString = () =>
        `${this.name}: [code=${this.code}]: ${this.message}`));
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ns {
  constructor() {
    this.promise = new Promise((e, i) => {
      ((this.resolve = e), (this.reject = i));
    });
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ju {
  constructor(e, i) {
    ((this.user = i),
      (this.type = "OAuth"),
      (this.headers = new Map()),
      this.headers.set("Authorization", `Bearer ${e}`));
  }
}
class Nu {
  getToken() {
    return Promise.resolve(null);
  }
  invalidateToken() {}
  start(e, i) {
    e.enqueueRetryable(() => i(_e.UNAUTHENTICATED));
  }
  shutdown() {}
}
class wu {
  constructor(e) {
    ((this.t = e),
      (this.currentUser = _e.UNAUTHENTICATED),
      (this.i = 0),
      (this.forceRefresh = !1),
      (this.auth = null));
  }
  start(e, i) {
    ss(this.o === void 0, 42304);
    let r = this.i;
    const a = (p) => (this.i !== r ? ((r = this.i), i(p)) : Promise.resolve());
    let c = new ns();
    this.o = () => {
      (this.i++,
        (this.currentUser = this.u()),
        c.resolve(),
        (c = new ns()),
        e.enqueueRetryable(() => a(this.currentUser)));
    };
    const l = () => {
        const p = c;
        e.enqueueRetryable(async () => {
          (await p.promise, await a(this.currentUser));
        });
      },
      h = (p) => {
        (Fe("FirebaseAuthCredentialsProvider", "Auth detected"),
          (this.auth = p),
          this.o && (this.auth.addAuthTokenListener(this.o), l()));
      };
    (this.t.onInit((p) => h(p)),
      setTimeout(() => {
        if (!this.auth) {
          const p = this.t.getImmediate({ optional: !0 });
          p
            ? h(p)
            : (Fe("FirebaseAuthCredentialsProvider", "Auth not yet detected"),
              c.resolve(),
              (c = new ns()));
        }
      }, 0),
      l());
  }
  getToken() {
    const e = this.i,
      i = this.forceRefresh;
    return (
      (this.forceRefresh = !1),
      this.auth
        ? this.auth
            .getToken(i)
            .then((r) =>
              this.i !== e
                ? (Fe(
                    "FirebaseAuthCredentialsProvider",
                    "getToken aborted due to token change.",
                  ),
                  this.getToken())
                : r
                  ? (ss(typeof r.accessToken == "string", 31837, { l: r }),
                    new ju(r.accessToken, this.currentUser))
                  : null,
            )
        : Promise.resolve(null)
    );
  }
  invalidateToken() {
    this.forceRefresh = !0;
  }
  shutdown() {
    (this.auth && this.o && this.auth.removeAuthTokenListener(this.o),
      (this.o = void 0));
  }
  u() {
    const e = this.auth && this.auth.getUid();
    return (ss(e === null || typeof e == "string", 2055, { h: e }), new _e(e));
  }
}
class Su {
  constructor(e, i, r) {
    ((this.P = e),
      (this.T = i),
      (this.I = r),
      (this.type = "FirstParty"),
      (this.user = _e.FIRST_PARTY),
      (this.A = new Map()));
  }
  R() {
    return this.I ? this.I() : null;
  }
  get headers() {
    this.A.set("X-Goog-AuthUser", this.P);
    const e = this.R();
    return (
      e && this.A.set("Authorization", e),
      this.T && this.A.set("X-Goog-Iam-Authorization-Token", this.T),
      this.A
    );
  }
}
class Eu {
  constructor(e, i, r) {
    ((this.P = e), (this.T = i), (this.I = r));
  }
  getToken() {
    return Promise.resolve(new Su(this.P, this.T, this.I));
  }
  start(e, i) {
    e.enqueueRetryable(() => i(_e.FIRST_PARTY));
  }
  shutdown() {}
  invalidateToken() {}
}
class Wr {
  constructor(e) {
    ((this.value = e),
      (this.type = "AppCheck"),
      (this.headers = new Map()),
      e && e.length > 0 && this.headers.set("x-firebase-appcheck", this.value));
  }
}
class Cu {
  constructor(e, i) {
    ((this.V = i),
      (this.forceRefresh = !1),
      (this.appCheck = null),
      (this.m = null),
      (this.p = null),
      lu(e) && e.settings.appCheckToken && (this.p = e.settings.appCheckToken));
  }
  start(e, i) {
    ss(this.o === void 0, 3512);
    const r = (c) => {
      c.error != null &&
        Fe(
          "FirebaseAppCheckTokenProvider",
          `Error getting App Check token; using placeholder token instead. Error: ${c.error.message}`,
        );
      const l = c.token !== this.m;
      return (
        (this.m = c.token),
        Fe(
          "FirebaseAppCheckTokenProvider",
          `Received ${l ? "new" : "existing"} token.`,
        ),
        l ? i(c.token) : Promise.resolve()
      );
    };
    this.o = (c) => {
      e.enqueueRetryable(() => r(c));
    };
    const a = (c) => {
      (Fe("FirebaseAppCheckTokenProvider", "AppCheck detected"),
        (this.appCheck = c),
        this.o && this.appCheck.addTokenListener(this.o));
    };
    (this.V.onInit((c) => a(c)),
      setTimeout(() => {
        if (!this.appCheck) {
          const c = this.V.getImmediate({ optional: !0 });
          c
            ? a(c)
            : Fe("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
        }
      }, 0));
  }
  getToken() {
    if (this.p) return Promise.resolve(new Wr(this.p));
    const e = this.forceRefresh;
    return (
      (this.forceRefresh = !1),
      this.appCheck
        ? this.appCheck
            .getToken(e)
            .then((i) =>
              i
                ? (ss(typeof i.token == "string", 44558, { tokenResult: i }),
                  (this.m = i.token),
                  new Wr(i.token))
                : null,
            )
        : Promise.resolve(null)
    );
  }
  invalidateToken() {
    this.forceRefresh = !0;
  }
  shutdown() {
    (this.appCheck && this.o && this.appCheck.removeTokenListener(this.o),
      (this.o = void 0));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Tu(t) {
  const e = typeof self < "u" && (self.crypto || self.msCrypto),
    i = new Uint8Array(t);
  if (e && typeof e.getRandomValues == "function") e.getRandomValues(i);
  else for (let r = 0; r < t; r++) i[r] = Math.floor(256 * Math.random());
  return i;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class _u {
  static newId() {
    const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      i = 62 * Math.floor(4.129032258064516);
    let r = "";
    for (; r.length < 20; ) {
      const a = Tu(40);
      for (let c = 0; c < a.length; ++c)
        r.length < 20 && a[c] < i && (r += e.charAt(a[c] % 62));
    }
    return r;
  }
}
function lt(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
function Au(t, e) {
  const i = Math.min(t.length, e.length);
  for (let r = 0; r < i; r++) {
    const a = t.charAt(r),
      c = e.charAt(r);
    if (a !== c) return Dn(a) === Dn(c) ? lt(a, c) : Dn(a) ? 1 : -1;
  }
  return lt(t.length, e.length);
}
const Ru = 55296,
  Iu = 57343;
function Dn(t) {
  const e = t.charCodeAt(0);
  return e >= Ru && e <= Iu;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const qr = "__name__";
class ze {
  constructor(e, i, r) {
    (i === void 0
      ? (i = 0)
      : i > e.length && Ws(637, { offset: i, range: e.length }),
      r === void 0
        ? (r = e.length - i)
        : r > e.length - i && Ws(1746, { length: r, range: e.length - i }),
      (this.segments = e),
      (this.offset = i),
      (this.len = r));
  }
  get length() {
    return this.len;
  }
  isEqual(e) {
    return ze.comparator(this, e) === 0;
  }
  child(e) {
    const i = this.segments.slice(this.offset, this.limit());
    return (
      e instanceof ze
        ? e.forEach((r) => {
            i.push(r);
          })
        : i.push(e),
      this.construct(i)
    );
  }
  limit() {
    return this.offset + this.length;
  }
  popFirst(e) {
    return (
      (e = e === void 0 ? 1 : e),
      this.construct(this.segments, this.offset + e, this.length - e)
    );
  }
  popLast() {
    return this.construct(this.segments, this.offset, this.length - 1);
  }
  firstSegment() {
    return this.segments[this.offset];
  }
  lastSegment() {
    return this.get(this.length - 1);
  }
  get(e) {
    return this.segments[this.offset + e];
  }
  isEmpty() {
    return this.length === 0;
  }
  isPrefixOf(e) {
    if (e.length < this.length) return !1;
    for (let i = 0; i < this.length; i++)
      if (this.get(i) !== e.get(i)) return !1;
    return !0;
  }
  isImmediateParentOf(e) {
    if (this.length + 1 !== e.length) return !1;
    for (let i = 0; i < this.length; i++)
      if (this.get(i) !== e.get(i)) return !1;
    return !0;
  }
  forEach(e) {
    for (let i = this.offset, r = this.limit(); i < r; i++) e(this.segments[i]);
  }
  toArray() {
    return this.segments.slice(this.offset, this.limit());
  }
  static comparator(e, i) {
    const r = Math.min(e.length, i.length);
    for (let a = 0; a < r; a++) {
      const c = ze.compareSegments(e.get(a), i.get(a));
      if (c !== 0) return c;
    }
    return lt(e.length, i.length);
  }
  static compareSegments(e, i) {
    const r = ze.isNumericId(e),
      a = ze.isNumericId(i);
    return r && !a
      ? -1
      : !r && a
        ? 1
        : r && a
          ? ze.extractNumericId(e).compare(ze.extractNumericId(i))
          : Au(e, i);
  }
  static isNumericId(e) {
    return e.startsWith("__id") && e.endsWith("__");
  }
  static extractNumericId(e) {
    return oi.fromString(e.substring(4, e.length - 2));
  }
}
class Oe extends ze {
  construct(e, i, r) {
    return new Oe(e, i, r);
  }
  canonicalString() {
    return this.toArray().join("/");
  }
  toString() {
    return this.canonicalString();
  }
  toUriEncodedString() {
    return this.toArray().map(encodeURIComponent).join("/");
  }
  static fromString(...e) {
    const i = [];
    for (const r of e) {
      if (r.indexOf("//") >= 0)
        throw new J(
          G.INVALID_ARGUMENT,
          `Invalid segment (${r}). Paths must not contain // in them.`,
        );
      i.push(...r.split("/").filter((a) => a.length > 0));
    }
    return new Oe(i);
  }
  static emptyPath() {
    return new Oe([]);
  }
}
const Lu = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
class mt extends ze {
  construct(e, i, r) {
    return new mt(e, i, r);
  }
  static isValidIdentifier(e) {
    return Lu.test(e);
  }
  canonicalString() {
    return this.toArray()
      .map(
        (e) => (
          (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`")),
          mt.isValidIdentifier(e) || (e = "`" + e + "`"),
          e
        ),
      )
      .join(".");
  }
  toString() {
    return this.canonicalString();
  }
  isKeyField() {
    return this.length === 1 && this.get(0) === qr;
  }
  static keyField() {
    return new mt([qr]);
  }
  static fromServerFormat(e) {
    const i = [];
    let r = "",
      a = 0;
    const c = () => {
      if (r.length === 0)
        throw new J(
          G.INVALID_ARGUMENT,
          `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
        );
      (i.push(r), (r = ""));
    };
    let l = !1;
    for (; a < e.length; ) {
      const h = e[a];
      if (h === "\\") {
        if (a + 1 === e.length)
          throw new J(
            G.INVALID_ARGUMENT,
            "Path has trailing escape character: " + e,
          );
        const p = e[a + 1];
        if (p !== "\\" && p !== "." && p !== "`")
          throw new J(
            G.INVALID_ARGUMENT,
            "Path has invalid escape sequence: " + e,
          );
        ((r += p), (a += 2));
      } else
        h === "`"
          ? ((l = !l), a++)
          : h !== "." || l
            ? ((r += h), a++)
            : (c(), a++);
    }
    if ((c(), l))
      throw new J(G.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
    return new mt(i);
  }
  static emptyPath() {
    return new mt([]);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class pt {
  constructor(e) {
    this.path = e;
  }
  static fromPath(e) {
    return new pt(Oe.fromString(e));
  }
  static fromName(e) {
    return new pt(Oe.fromString(e).popFirst(5));
  }
  static empty() {
    return new pt(Oe.emptyPath());
  }
  get collectionGroup() {
    return this.path.popLast().lastSegment();
  }
  hasCollectionId(e) {
    return this.path.length >= 2 && this.path.get(this.path.length - 2) === e;
  }
  getCollectionGroup() {
    return this.path.get(this.path.length - 2);
  }
  getCollectionPath() {
    return this.path.popLast();
  }
  isEqual(e) {
    return e !== null && Oe.comparator(this.path, e.path) === 0;
  }
  toString() {
    return this.path.toString();
  }
  static comparator(e, i) {
    return Oe.comparator(e.path, i.path);
  }
  static isDocumentKey(e) {
    return e.length % 2 == 0;
  }
  static fromSegments(e) {
    return new pt(new Oe(e.slice()));
  }
}
function Pu(t, e, i, r) {
  if (e === !0 && r === !0)
    throw new J(G.INVALID_ARGUMENT, `${t} and ${i} cannot be used together.`);
}
function ku(t) {
  return (
    typeof t == "object" &&
    t !== null &&
    (Object.getPrototypeOf(t) === Object.prototype ||
      Object.getPrototypeOf(t) === null)
  );
}
/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function ce(t, e) {
  const i = { typeString: t };
  return (e && (i.value = e), i);
}
function xs(t, e) {
  if (!ku(t)) throw new J(G.INVALID_ARGUMENT, "JSON must be an object");
  let i;
  for (const r in e)
    if (e[r]) {
      const a = e[r].typeString,
        c = "value" in e[r] ? { value: e[r].value } : void 0;
      if (!(r in t)) {
        i = `JSON missing required field: '${r}'`;
        break;
      }
      const l = t[r];
      if (a && typeof l !== a) {
        i = `JSON field '${r}' must be a ${a}.`;
        break;
      }
      if (c !== void 0 && l !== c.value) {
        i = `Expected '${r}' field to equal '${c.value}'`;
        break;
      }
    }
  if (i) throw new J(G.INVALID_ARGUMENT, i);
  return !0;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Gr = -62135596800,
  Jr = 1e6;
class We {
  static now() {
    return We.fromMillis(Date.now());
  }
  static fromDate(e) {
    return We.fromMillis(e.getTime());
  }
  static fromMillis(e) {
    const i = Math.floor(e / 1e3),
      r = Math.floor((e - 1e3 * i) * Jr);
    return new We(i, r);
  }
  constructor(e, i) {
    if (((this.seconds = e), (this.nanoseconds = i), i < 0))
      throw new J(
        G.INVALID_ARGUMENT,
        "Timestamp nanoseconds out of range: " + i,
      );
    if (i >= 1e9)
      throw new J(
        G.INVALID_ARGUMENT,
        "Timestamp nanoseconds out of range: " + i,
      );
    if (e < Gr)
      throw new J(G.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
    if (e >= 253402300800)
      throw new J(G.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
  }
  toDate() {
    return new Date(this.toMillis());
  }
  toMillis() {
    return 1e3 * this.seconds + this.nanoseconds / Jr;
  }
  _compareTo(e) {
    return this.seconds === e.seconds
      ? lt(this.nanoseconds, e.nanoseconds)
      : lt(this.seconds, e.seconds);
  }
  isEqual(e) {
    return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds;
  }
  toString() {
    return (
      "Timestamp(seconds=" +
      this.seconds +
      ", nanoseconds=" +
      this.nanoseconds +
      ")"
    );
  }
  toJSON() {
    return {
      type: We._jsonSchemaVersion,
      seconds: this.seconds,
      nanoseconds: this.nanoseconds,
    };
  }
  static fromJSON(e) {
    if (xs(e, We._jsonSchema)) return new We(e.seconds, e.nanoseconds);
  }
  valueOf() {
    const e = this.seconds - Gr;
    return (
      String(e).padStart(12, "0") +
      "." +
      String(this.nanoseconds).padStart(9, "0")
    );
  }
}
((We._jsonSchemaVersion = "firestore/timestamp/1.0"),
  (We._jsonSchema = {
    type: ce("string", We._jsonSchemaVersion),
    seconds: ce("number"),
    nanoseconds: ce("number"),
  }));
function Du(t) {
  return t.name === "IndexedDbTransactionError";
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ou extends Error {
  constructor() {
    (super(...arguments), (this.name = "Base64DecodeError"));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class jt {
  constructor(e) {
    this.binaryString = e;
  }
  static fromBase64String(e) {
    const i = (function (a) {
      try {
        return atob(a);
      } catch (c) {
        throw typeof DOMException < "u" && c instanceof DOMException
          ? new Ou("Invalid base64 string: " + c)
          : c;
      }
    })(e);
    return new jt(i);
  }
  static fromUint8Array(e) {
    const i = (function (a) {
      let c = "";
      for (let l = 0; l < a.length; ++l) c += String.fromCharCode(a[l]);
      return c;
    })(e);
    return new jt(i);
  }
  [Symbol.iterator]() {
    let e = 0;
    return {
      next: () =>
        e < this.binaryString.length
          ? { value: this.binaryString.charCodeAt(e++), done: !1 }
          : { value: void 0, done: !0 },
    };
  }
  toBase64() {
    return (function (i) {
      return btoa(i);
    })(this.binaryString);
  }
  toUint8Array() {
    return (function (i) {
      const r = new Uint8Array(i.length);
      for (let a = 0; a < i.length; a++) r[a] = i.charCodeAt(a);
      return r;
    })(this.binaryString);
  }
  approximateByteSize() {
    return 2 * this.binaryString.length;
  }
  compareTo(e) {
    return lt(this.binaryString, e.binaryString);
  }
  isEqual(e) {
    return this.binaryString === e.binaryString;
  }
}
jt.EMPTY_BYTE_STRING = new jt("");
const Kr = "(default)";
class qs {
  constructor(e, i) {
    ((this.projectId = e), (this.database = i || Kr));
  }
  static empty() {
    return new qs("", "");
  }
  get isDefaultDatabase() {
    return this.database === Kr;
  }
  isEqual(e) {
    return (
      e instanceof qs &&
      e.projectId === this.projectId &&
      e.database === this.database
    );
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Fu {
  constructor(
    e,
    i = null,
    r = [],
    a = [],
    c = null,
    l = "F",
    h = null,
    p = null,
  ) {
    ((this.path = e),
      (this.collectionGroup = i),
      (this.explicitOrderBy = r),
      (this.filters = a),
      (this.limit = c),
      (this.limitType = l),
      (this.startAt = h),
      (this.endAt = p),
      (this.Ie = null),
      (this.Ee = null),
      (this.de = null),
      this.startAt,
      this.endAt);
  }
}
function Mu(t) {
  return new Fu(t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var Xr, W;
(((W = Xr || (Xr = {}))[(W.OK = 0)] = "OK"),
  (W[(W.CANCELLED = 1)] = "CANCELLED"),
  (W[(W.UNKNOWN = 2)] = "UNKNOWN"),
  (W[(W.INVALID_ARGUMENT = 3)] = "INVALID_ARGUMENT"),
  (W[(W.DEADLINE_EXCEEDED = 4)] = "DEADLINE_EXCEEDED"),
  (W[(W.NOT_FOUND = 5)] = "NOT_FOUND"),
  (W[(W.ALREADY_EXISTS = 6)] = "ALREADY_EXISTS"),
  (W[(W.PERMISSION_DENIED = 7)] = "PERMISSION_DENIED"),
  (W[(W.UNAUTHENTICATED = 16)] = "UNAUTHENTICATED"),
  (W[(W.RESOURCE_EXHAUSTED = 8)] = "RESOURCE_EXHAUSTED"),
  (W[(W.FAILED_PRECONDITION = 9)] = "FAILED_PRECONDITION"),
  (W[(W.ABORTED = 10)] = "ABORTED"),
  (W[(W.OUT_OF_RANGE = 11)] = "OUT_OF_RANGE"),
  (W[(W.UNIMPLEMENTED = 12)] = "UNIMPLEMENTED"),
  (W[(W.INTERNAL = 13)] = "INTERNAL"),
  (W[(W.UNAVAILABLE = 14)] = "UNAVAILABLE"),
  (W[(W.DATA_LOSS = 15)] = "DATA_LOSS"));
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ new oi([4294967295, 4294967295], 0);
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Bu = 41943040;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Uu = 1048576;
function On() {
  return typeof document < "u" ? document : null;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Vu {
  constructor(e, i, r = 1e3, a = 1.5, c = 6e4) {
    ((this.Mi = e),
      (this.timerId = i),
      (this.d_ = r),
      (this.A_ = a),
      (this.R_ = c),
      (this.V_ = 0),
      (this.m_ = null),
      (this.f_ = Date.now()),
      this.reset());
  }
  reset() {
    this.V_ = 0;
  }
  g_() {
    this.V_ = this.R_;
  }
  p_(e) {
    this.cancel();
    const i = Math.floor(this.V_ + this.y_()),
      r = Math.max(0, Date.now() - this.f_),
      a = Math.max(0, i - r);
    (a > 0 &&
      Fe(
        "ExponentialBackoff",
        `Backing off for ${a} ms (base delay: ${this.V_} ms, delay with jitter: ${i} ms, last attempt: ${r} ms ago)`,
      ),
      (this.m_ = this.Mi.enqueueAfterDelay(
        this.timerId,
        a,
        () => ((this.f_ = Date.now()), e()),
      )),
      (this.V_ *= this.A_),
      this.V_ < this.d_ && (this.V_ = this.d_),
      this.V_ > this.R_ && (this.V_ = this.R_));
  }
  w_() {
    this.m_ !== null && (this.m_.skipDelay(), (this.m_ = null));
  }
  cancel() {
    this.m_ !== null && (this.m_.cancel(), (this.m_ = null));
  }
  y_() {
    return (Math.random() - 0.5) * this.V_;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class li {
  constructor(e, i, r, a, c) {
    ((this.asyncQueue = e),
      (this.timerId = i),
      (this.targetTimeMs = r),
      (this.op = a),
      (this.removalCallback = c),
      (this.deferred = new ns()),
      (this.then = this.deferred.promise.then.bind(this.deferred.promise)),
      this.deferred.promise.catch((l) => {}));
  }
  get promise() {
    return this.deferred.promise;
  }
  static createAndSchedule(e, i, r, a, c) {
    const l = Date.now() + r,
      h = new li(e, i, l, a, c);
    return (h.start(r), h);
  }
  start(e) {
    this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
  }
  skipDelay() {
    return this.handleDelayElapsed();
  }
  cancel(e) {
    this.timerHandle !== null &&
      (this.clearTimeout(),
      this.deferred.reject(
        new J(G.CANCELLED, "Operation cancelled" + (e ? ": " + e : "")),
      ));
  }
  handleDelayElapsed() {
    this.asyncQueue.enqueueAndForget(() =>
      this.timerHandle !== null
        ? (this.clearTimeout(), this.op().then((e) => this.deferred.resolve(e)))
        : Promise.resolve(),
    );
  }
  clearTimeout() {
    this.timerHandle !== null &&
      (this.removalCallback(this),
      clearTimeout(this.timerHandle),
      (this.timerHandle = null));
  }
}
var Yr, Qr;
(((Qr = Yr || (Yr = {})).Ma = "default"), (Qr.Cache = "cache"));
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function $u(t) {
  const e = {};
  return (
    t.timeoutSeconds !== void 0 && (e.timeoutSeconds = t.timeoutSeconds),
    e
  );
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Zr = new Map();
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Hu = "firestore.googleapis.com",
  ea = !0;
class ta {
  constructor(e) {
    if (e.host === void 0) {
      if (e.ssl !== void 0)
        throw new J(
          G.INVALID_ARGUMENT,
          "Can't provide ssl option if host option is not set",
        );
      ((this.host = Hu), (this.ssl = ea));
    } else ((this.host = e.host), (this.ssl = e.ssl ?? ea));
    if (
      ((this.isUsingEmulator = e.emulatorOptions !== void 0),
      (this.credentials = e.credentials),
      (this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties),
      (this.localCache = e.localCache),
      e.cacheSizeBytes === void 0)
    )
      this.cacheSizeBytes = Bu;
    else {
      if (e.cacheSizeBytes !== -1 && e.cacheSizeBytes < Uu)
        throw new J(
          G.INVALID_ARGUMENT,
          "cacheSizeBytes must be at least 1048576",
        );
      this.cacheSizeBytes = e.cacheSizeBytes;
    }
    (Pu(
      "experimentalForceLongPolling",
      e.experimentalForceLongPolling,
      "experimentalAutoDetectLongPolling",
      e.experimentalAutoDetectLongPolling,
    ),
      (this.experimentalForceLongPolling = !!e.experimentalForceLongPolling),
      this.experimentalForceLongPolling
        ? (this.experimentalAutoDetectLongPolling = !1)
        : e.experimentalAutoDetectLongPolling === void 0
          ? (this.experimentalAutoDetectLongPolling = !0)
          : (this.experimentalAutoDetectLongPolling =
              !!e.experimentalAutoDetectLongPolling),
      (this.experimentalLongPollingOptions = $u(
        e.experimentalLongPollingOptions ?? {},
      )),
      (function (r) {
        if (r.timeoutSeconds !== void 0) {
          if (isNaN(r.timeoutSeconds))
            throw new J(
              G.INVALID_ARGUMENT,
              `invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`,
            );
          if (r.timeoutSeconds < 5)
            throw new J(
              G.INVALID_ARGUMENT,
              `invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`,
            );
          if (r.timeoutSeconds > 30)
            throw new J(
              G.INVALID_ARGUMENT,
              `invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`,
            );
        }
      })(this.experimentalLongPollingOptions),
      (this.useFetchStreams = !!e.useFetchStreams));
  }
  isEqual(e) {
    return (
      this.host === e.host &&
      this.ssl === e.ssl &&
      this.credentials === e.credentials &&
      this.cacheSizeBytes === e.cacheSizeBytes &&
      this.experimentalForceLongPolling === e.experimentalForceLongPolling &&
      this.experimentalAutoDetectLongPolling ===
        e.experimentalAutoDetectLongPolling &&
      (function (r, a) {
        return r.timeoutSeconds === a.timeoutSeconds;
      })(
        this.experimentalLongPollingOptions,
        e.experimentalLongPollingOptions,
      ) &&
      this.ignoreUndefinedProperties === e.ignoreUndefinedProperties &&
      this.useFetchStreams === e.useFetchStreams
    );
  }
}
class zu {
  constructor(e, i, r, a) {
    ((this._authCredentials = e),
      (this._appCheckCredentials = i),
      (this._databaseId = r),
      (this._app = a),
      (this.type = "firestore-lite"),
      (this._persistenceKey = "(lite)"),
      (this._settings = new ta({})),
      (this._settingsFrozen = !1),
      (this._emulatorOptions = {}),
      (this._terminateTask = "notTerminated"));
  }
  get app() {
    if (!this._app)
      throw new J(
        G.FAILED_PRECONDITION,
        "Firestore was not initialized using the Firebase SDK. 'app' is not available",
      );
    return this._app;
  }
  get _initialized() {
    return this._settingsFrozen;
  }
  get _terminated() {
    return this._terminateTask !== "notTerminated";
  }
  _setSettings(e) {
    if (this._settingsFrozen)
      throw new J(
        G.FAILED_PRECONDITION,
        "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.",
      );
    ((this._settings = new ta(e)),
      (this._emulatorOptions = e.emulatorOptions || {}),
      e.credentials !== void 0 &&
        (this._authCredentials = (function (r) {
          if (!r) return new Nu();
          switch (r.type) {
            case "firstParty":
              return new Eu(
                r.sessionIndex || "0",
                r.iamToken || null,
                r.authTokenFactory || null,
              );
            case "provider":
              return r.client;
            default:
              throw new J(
                G.INVALID_ARGUMENT,
                "makeAuthCredentialsProvider failed due to invalid credential type",
              );
          }
        })(e.credentials)));
  }
  _getSettings() {
    return this._settings;
  }
  _getEmulatorOptions() {
    return this._emulatorOptions;
  }
  _freezeSettings() {
    return ((this._settingsFrozen = !0), this._settings);
  }
  _delete() {
    return (
      this._terminateTask === "notTerminated" &&
        (this._terminateTask = this._terminate()),
      this._terminateTask
    );
  }
  async _restart() {
    this._terminateTask === "notTerminated"
      ? await this._terminate()
      : (this._terminateTask = "notTerminated");
  }
  toJSON() {
    return {
      app: this._app,
      databaseId: this._databaseId,
      settings: this._settings,
    };
  }
  _terminate() {
    return (
      (function (i) {
        const r = Zr.get(i);
        r &&
          (Fe("ComponentProvider", "Removing Datastore"),
          Zr.delete(i),
          r.terminate());
      })(this),
      Promise.resolve()
    );
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ci {
  constructor(e, i, r) {
    ((this.converter = i),
      (this._query = r),
      (this.type = "query"),
      (this.firestore = e));
  }
  withConverter(e) {
    return new ci(this.firestore, e, this._query);
  }
}
class qe {
  constructor(e, i, r) {
    ((this.converter = i),
      (this._key = r),
      (this.type = "document"),
      (this.firestore = e));
  }
  get _path() {
    return this._key.path;
  }
  get id() {
    return this._key.path.lastSegment();
  }
  get path() {
    return this._key.path.canonicalString();
  }
  get parent() {
    return new di(this.firestore, this.converter, this._key.path.popLast());
  }
  withConverter(e) {
    return new qe(this.firestore, e, this._key);
  }
  toJSON() {
    return { type: qe._jsonSchemaVersion, referencePath: this._key.toString() };
  }
  static fromJSON(e, i, r) {
    if (xs(i, qe._jsonSchema))
      return new qe(e, r || null, new pt(Oe.fromString(i.referencePath)));
  }
}
((qe._jsonSchemaVersion = "firestore/documentReference/1.0"),
  (qe._jsonSchema = {
    type: ce("string", qe._jsonSchemaVersion),
    referencePath: ce("string"),
  }));
class di extends ci {
  constructor(e, i, r) {
    (super(e, i, Mu(r)), (this._path = r), (this.type = "collection"));
  }
  get id() {
    return this._query.path.lastSegment();
  }
  get path() {
    return this._query.path.canonicalString();
  }
  get parent() {
    const e = this._path.popLast();
    return e.isEmpty() ? null : new qe(this.firestore, null, new pt(e));
  }
  withConverter(e) {
    return new di(this.firestore, e, this._path);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const sa = "AsyncQueue";
class na {
  constructor(e = Promise.resolve()) {
    ((this.Xu = []),
      (this.ec = !1),
      (this.tc = []),
      (this.nc = null),
      (this.rc = !1),
      (this.sc = !1),
      (this.oc = []),
      (this.M_ = new Vu(this, "async_queue_retry")),
      (this._c = () => {
        const r = On();
        (r && Fe(sa, "Visibility state changed to " + r.visibilityState),
          this.M_.w_());
      }),
      (this.ac = e));
    const i = On();
    i &&
      typeof i.addEventListener == "function" &&
      i.addEventListener("visibilitychange", this._c);
  }
  get isShuttingDown() {
    return this.ec;
  }
  enqueueAndForget(e) {
    this.enqueue(e);
  }
  enqueueAndForgetEvenWhileRestricted(e) {
    (this.uc(), this.cc(e));
  }
  enterRestrictedMode(e) {
    if (!this.ec) {
      ((this.ec = !0), (this.sc = e || !1));
      const i = On();
      i &&
        typeof i.removeEventListener == "function" &&
        i.removeEventListener("visibilitychange", this._c);
    }
  }
  enqueue(e) {
    if ((this.uc(), this.ec)) return new Promise(() => {});
    const i = new ns();
    return this.cc(() =>
      this.ec && this.sc
        ? Promise.resolve()
        : (e().then(i.resolve, i.reject), i.promise),
    ).then(() => i.promise);
  }
  enqueueRetryable(e) {
    this.enqueueAndForget(() => (this.Xu.push(e), this.lc()));
  }
  async lc() {
    if (this.Xu.length !== 0) {
      try {
        (await this.Xu[0](), this.Xu.shift(), this.M_.reset());
      } catch (e) {
        if (!Du(e)) throw e;
        Fe(sa, "Operation failed with retryable error: " + e);
      }
      this.Xu.length > 0 && this.M_.p_(() => this.lc());
    }
  }
  cc(e) {
    const i = this.ac.then(
      () => (
        (this.rc = !0),
        e()
          .catch((r) => {
            throw (
              (this.nc = r),
              (this.rc = !1),
              lo("INTERNAL UNHANDLED ERROR: ", ia(r)),
              r
            );
          })
          .then((r) => ((this.rc = !1), r))
      ),
    );
    return ((this.ac = i), i);
  }
  enqueueAfterDelay(e, i, r) {
    (this.uc(), this.oc.indexOf(e) > -1 && (i = 0));
    const a = li.createAndSchedule(this, e, i, r, (c) => this.hc(c));
    return (this.tc.push(a), a);
  }
  uc() {
    this.nc && Ws(47125, { Pc: ia(this.nc) });
  }
  verifyOperationInProgress() {}
  async Tc() {
    let e;
    do ((e = this.ac), await e);
    while (e !== this.ac);
  }
  Ic(e) {
    for (const i of this.tc) if (i.timerId === e) return !0;
    return !1;
  }
  Ec(e) {
    return this.Tc().then(() => {
      this.tc.sort((i, r) => i.targetTimeMs - r.targetTimeMs);
      for (const i of this.tc)
        if ((i.skipDelay(), e !== "all" && i.timerId === e)) break;
      return this.Tc();
    });
  }
  dc(e) {
    this.oc.push(e);
  }
  hc(e) {
    const i = this.tc.indexOf(e);
    this.tc.splice(i, 1);
  }
}
function ia(t) {
  let e = t.message || "";
  return (
    t.stack &&
      (e = t.stack.includes(t.message)
        ? t.stack
        : t.message +
          `
` +
          t.stack),
    e
  );
}
class Wu extends zu {
  constructor(e, i, r, a) {
    (super(e, i, r, a),
      (this.type = "firestore"),
      (this._queue = new na()),
      (this._persistenceKey = (a == null ? void 0 : a.name) || "[DEFAULT]"));
  }
  async _terminate() {
    if (this._firestoreClient) {
      const e = this._firestoreClient.terminate();
      ((this._queue = new na(e)), (this._firestoreClient = void 0), await e);
    }
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Ke {
  constructor(e) {
    this._byteString = e;
  }
  static fromBase64String(e) {
    try {
      return new Ke(jt.fromBase64String(e));
    } catch (i) {
      throw new J(
        G.INVALID_ARGUMENT,
        "Failed to construct data from Base64 string: " + i,
      );
    }
  }
  static fromUint8Array(e) {
    return new Ke(jt.fromUint8Array(e));
  }
  toBase64() {
    return this._byteString.toBase64();
  }
  toUint8Array() {
    return this._byteString.toUint8Array();
  }
  toString() {
    return "Bytes(base64: " + this.toBase64() + ")";
  }
  isEqual(e) {
    return this._byteString.isEqual(e._byteString);
  }
  toJSON() {
    return { type: Ke._jsonSchemaVersion, bytes: this.toBase64() };
  }
  static fromJSON(e) {
    if (xs(e, Ke._jsonSchema)) return Ke.fromBase64String(e.bytes);
  }
}
((Ke._jsonSchemaVersion = "firestore/bytes/1.0"),
  (Ke._jsonSchema = {
    type: ce("string", Ke._jsonSchemaVersion),
    bytes: ce("string"),
  }));
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class uo {
  constructor(...e) {
    for (let i = 0; i < e.length; ++i)
      if (e[i].length === 0)
        throw new J(
          G.INVALID_ARGUMENT,
          "Invalid field name at argument $(i + 1). Field names must not be empty.",
        );
    this._internalPath = new mt(e);
  }
  isEqual(e) {
    return this._internalPath.isEqual(e._internalPath);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class yt {
  constructor(e, i) {
    if (!isFinite(e) || e < -90 || e > 90)
      throw new J(
        G.INVALID_ARGUMENT,
        "Latitude must be a number between -90 and 90, but was: " + e,
      );
    if (!isFinite(i) || i < -180 || i > 180)
      throw new J(
        G.INVALID_ARGUMENT,
        "Longitude must be a number between -180 and 180, but was: " + i,
      );
    ((this._lat = e), (this._long = i));
  }
  get latitude() {
    return this._lat;
  }
  get longitude() {
    return this._long;
  }
  isEqual(e) {
    return this._lat === e._lat && this._long === e._long;
  }
  _compareTo(e) {
    return lt(this._lat, e._lat) || lt(this._long, e._long);
  }
  toJSON() {
    return {
      latitude: this._lat,
      longitude: this._long,
      type: yt._jsonSchemaVersion,
    };
  }
  static fromJSON(e) {
    if (xs(e, yt._jsonSchema)) return new yt(e.latitude, e.longitude);
  }
}
((yt._jsonSchemaVersion = "firestore/geoPoint/1.0"),
  (yt._jsonSchema = {
    type: ce("string", yt._jsonSchemaVersion),
    latitude: ce("number"),
    longitude: ce("number"),
  }));
/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class vt {
  constructor(e) {
    this._values = (e || []).map((i) => i);
  }
  toArray() {
    return this._values.map((e) => e);
  }
  isEqual(e) {
    return (function (r, a) {
      if (r.length !== a.length) return !1;
      for (let c = 0; c < r.length; ++c) if (r[c] !== a[c]) return !1;
      return !0;
    })(this._values, e._values);
  }
  toJSON() {
    return { type: vt._jsonSchemaVersion, vectorValues: this._values };
  }
  static fromJSON(e) {
    if (xs(e, vt._jsonSchema)) {
      if (
        Array.isArray(e.vectorValues) &&
        e.vectorValues.every((i) => typeof i == "number")
      )
        return new vt(e.vectorValues);
      throw new J(
        G.INVALID_ARGUMENT,
        "Expected 'vectorValues' field to be a number array",
      );
    }
  }
}
((vt._jsonSchemaVersion = "firestore/vectorValue/1.0"),
  (vt._jsonSchema = {
    type: ce("string", vt._jsonSchemaVersion),
    vectorValues: ce("object"),
  }));
const qu = new RegExp("[~\\*/\\[\\]]");
function Gu(t, e, i) {
  if (e.search(qu) >= 0)
    throw ra(
      `Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,
      t,
    );
  try {
    return new uo(...e.split("."))._internalPath;
  } catch {
    throw ra(
      `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
      t,
    );
  }
}
function ra(t, e, i, r, a) {
  let c = `Function ${e}() called with invalid data`;
  c += ". ";
  let l = "";
  return new J(G.INVALID_ARGUMENT, c + t + l);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class mo {
  constructor(e, i, r, a, c) {
    ((this._firestore = e),
      (this._userDataWriter = i),
      (this._key = r),
      (this._document = a),
      (this._converter = c));
  }
  get id() {
    return this._key.path.lastSegment();
  }
  get ref() {
    return new qe(this._firestore, this._converter, this._key);
  }
  exists() {
    return this._document !== null;
  }
  data() {
    if (this._document) {
      if (this._converter) {
        const e = new Ju(
          this._firestore,
          this._userDataWriter,
          this._key,
          this._document,
          null,
        );
        return this._converter.fromFirestore(e);
      }
      return this._userDataWriter.convertValue(this._document.data.value);
    }
  }
  get(e) {
    if (this._document) {
      const i = this._document.data.field(fo("DocumentSnapshot.get", e));
      if (i !== null) return this._userDataWriter.convertValue(i);
    }
  }
}
class Ju extends mo {
  data() {
    return super.data();
  }
}
function fo(t, e) {
  return typeof e == "string"
    ? Gu(t, e)
    : e instanceof uo
      ? e._internalPath
      : e._delegate._internalPath;
}
class Is {
  constructor(e, i) {
    ((this.hasPendingWrites = e), (this.fromCache = i));
  }
  isEqual(e) {
    return (
      this.hasPendingWrites === e.hasPendingWrites &&
      this.fromCache === e.fromCache
    );
  }
}
class Tt extends mo {
  constructor(e, i, r, a, c, l) {
    (super(e, i, r, a, l),
      (this._firestore = e),
      (this._firestoreImpl = e),
      (this.metadata = c));
  }
  exists() {
    return super.exists();
  }
  data(e = {}) {
    if (this._document) {
      if (this._converter) {
        const i = new Os(
          this._firestore,
          this._userDataWriter,
          this._key,
          this._document,
          this.metadata,
          null,
        );
        return this._converter.fromFirestore(i, e);
      }
      return this._userDataWriter.convertValue(
        this._document.data.value,
        e.serverTimestamps,
      );
    }
  }
  get(e, i = {}) {
    if (this._document) {
      const r = this._document.data.field(fo("DocumentSnapshot.get", e));
      if (r !== null)
        return this._userDataWriter.convertValue(r, i.serverTimestamps);
    }
  }
  toJSON() {
    if (this.metadata.hasPendingWrites)
      throw new J(
        G.FAILED_PRECONDITION,
        "DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().",
      );
    const e = this._document,
      i = {};
    return (
      (i.type = Tt._jsonSchemaVersion),
      (i.bundle = ""),
      (i.bundleSource = "DocumentSnapshot"),
      (i.bundleName = this._key.toString()),
      !e || !e.isValidDocument() || !e.isFoundDocument()
        ? i
        : (this._userDataWriter.convertObjectMap(
            e.data.value.mapValue.fields,
            "previous",
          ),
          (i.bundle = (this._firestore, this.ref.path, "NOT SUPPORTED")),
          i)
    );
  }
}
((Tt._jsonSchemaVersion = "firestore/documentSnapshot/1.0"),
  (Tt._jsonSchema = {
    type: ce("string", Tt._jsonSchemaVersion),
    bundleSource: ce("string", "DocumentSnapshot"),
    bundleName: ce("string"),
    bundle: ce("string"),
  }));
class Os extends Tt {
  data(e = {}) {
    return super.data(e);
  }
}
class is {
  constructor(e, i, r, a) {
    ((this._firestore = e),
      (this._userDataWriter = i),
      (this._snapshot = a),
      (this.metadata = new Is(a.hasPendingWrites, a.fromCache)),
      (this.query = r));
  }
  get docs() {
    const e = [];
    return (this.forEach((i) => e.push(i)), e);
  }
  get size() {
    return this._snapshot.docs.size;
  }
  get empty() {
    return this.size === 0;
  }
  forEach(e, i) {
    this._snapshot.docs.forEach((r) => {
      e.call(
        i,
        new Os(
          this._firestore,
          this._userDataWriter,
          r.key,
          r,
          new Is(
            this._snapshot.mutatedKeys.has(r.key),
            this._snapshot.fromCache,
          ),
          this.query.converter,
        ),
      );
    });
  }
  docChanges(e = {}) {
    const i = !!e.includeMetadataChanges;
    if (i && this._snapshot.excludesMetadataChanges)
      throw new J(
        G.INVALID_ARGUMENT,
        "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().",
      );
    return (
      (this._cachedChanges &&
        this._cachedChangesIncludeMetadataChanges === i) ||
        ((this._cachedChanges = (function (a, c) {
          if (a._snapshot.oldDocs.isEmpty()) {
            let l = 0;
            return a._snapshot.docChanges.map((h) => {
              const p = new Os(
                a._firestore,
                a._userDataWriter,
                h.doc.key,
                h.doc,
                new Is(
                  a._snapshot.mutatedKeys.has(h.doc.key),
                  a._snapshot.fromCache,
                ),
                a.query.converter,
              );
              return (
                h.doc,
                { type: "added", doc: p, oldIndex: -1, newIndex: l++ }
              );
            });
          }
          {
            let l = a._snapshot.oldDocs;
            return a._snapshot.docChanges
              .filter((h) => c || h.type !== 3)
              .map((h) => {
                const p = new Os(
                  a._firestore,
                  a._userDataWriter,
                  h.doc.key,
                  h.doc,
                  new Is(
                    a._snapshot.mutatedKeys.has(h.doc.key),
                    a._snapshot.fromCache,
                  ),
                  a.query.converter,
                );
                let y = -1,
                  j = -1;
                return (
                  h.type !== 0 &&
                    ((y = l.indexOf(h.doc.key)), (l = l.delete(h.doc.key))),
                  h.type !== 1 &&
                    ((l = l.add(h.doc)), (j = l.indexOf(h.doc.key))),
                  { type: Ku(h.type), doc: p, oldIndex: y, newIndex: j }
                );
              });
          }
        })(this, i)),
        (this._cachedChangesIncludeMetadataChanges = i)),
      this._cachedChanges
    );
  }
  toJSON() {
    if (this.metadata.hasPendingWrites)
      throw new J(
        G.FAILED_PRECONDITION,
        "QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().",
      );
    const e = {};
    ((e.type = is._jsonSchemaVersion),
      (e.bundleSource = "QuerySnapshot"),
      (e.bundleName = _u.newId()),
      this._firestore._databaseId.database,
      this._firestore._databaseId.projectId);
    const i = [],
      r = [],
      a = [];
    return (
      this.docs.forEach((c) => {
        c._document !== null &&
          (i.push(c._document),
          r.push(
            this._userDataWriter.convertObjectMap(
              c._document.data.value.mapValue.fields,
              "previous",
            ),
          ),
          a.push(c.ref.path));
      }),
      (e.bundle =
        (this._firestore, this.query._query, e.bundleName, "NOT SUPPORTED")),
      e
    );
  }
}
function Ku(t) {
  switch (t) {
    case 0:
      return "added";
    case 2:
    case 3:
      return "modified";
    case 1:
      return "removed";
    default:
      return Ws(61501, { type: t });
  }
}
((is._jsonSchemaVersion = "firestore/querySnapshot/1.0"),
  (is._jsonSchema = {
    type: ce("string", is._jsonSchemaVersion),
    bundleSource: ce("string", "QuerySnapshot"),
    bundleName: ce("string"),
    bundle: ce("string"),
  }));
(function (e, i = !0) {
  ((function (a) {
    tn = a;
  })(du),
    Hs(
      new $s(
        "firestore",
        (r, { instanceIdentifier: a, options: c }) => {
          const l = r.getProvider("app").getImmediate(),
            h = new Wu(
              new wu(r.getProvider("auth-internal")),
              new Cu(l, r.getProvider("app-check-internal")),
              (function (y, j) {
                if (
                  !Object.prototype.hasOwnProperty.apply(y.options, [
                    "projectId",
                  ])
                )
                  throw new J(
                    G.INVALID_ARGUMENT,
                    '"projectId" not provided in firebase.initializeApp.',
                  );
                return new qs(y.options.projectId, j);
              })(l, a),
              l,
            );
          return ((c = { useFetchStreams: i, ...c }), h._setSettings(c), h);
        },
        "PUBLIC",
      ).setMultipleInstances(!0),
    ),
    ts(Hr, zr, e),
    ts(Hr, zr, "esm2020"));
})();
class Xu {
  constructor(e) {
    ((this.email = String((e == null ? void 0 : e.email) || "")),
      (this.id = String((e == null ? void 0 : e.id) || "")),
      (this.profileicon = String((e == null ? void 0 : e.profileicon) || "")),
      (this.fullname = String((e == null ? void 0 : e.fullname) || "")),
      (this.gender = String((e == null ? void 0 : e.gender) || "")),
      (this.dateCreated = String((e == null ? void 0 : e.dateCreated) || "")),
      (this.dateModified = String((e == null ? void 0 : e.dateModified) || "")),
      (this.bio = String((e == null ? void 0 : e.bio) || "")),
      (this.firstname = String((e == null ? void 0 : e.firstname) || "")),
      (this.lastname = String((e == null ? void 0 : e.lastname) || "")),
      (this.role = String((e == null ? void 0 : e.role) || "1001")),
      (this.phone = String((e == null ? void 0 : e.phone) || "")),
      (this.verified = String((e == null ? void 0 : e.verified) || "")),
      (this.verifiedId = String((e == null ? void 0 : e.verifiedId) || "")));
  }
}
const Yu = () => {
    const t = ["Personal", "Contact", "Security"],
      [e, i] = w.useState(new Xu({})),
      [r, a] = w.useState(null),
      c = w.useRef(),
      [l, h] = w.useState("Personal"),
      [p, y] = w.useState(!1),
      [j, N] = w.useState(!1),
      _ = {
        Personal: ["firstname", "lastname", "gender"],
        Contact: ["email", "phone"],
        Security: ["password"],
      },
      D = ({ target: L }) => {
        i((A) => ({ ...A, [L.name]: L.value }));
      },
      E = (L) => {
        a(L.target.files[0]);
      };
    function T() {
      const L = [];
      for (let A = 0; A < _[l].length; A++) L.push(!!e[_[l][A]]);
      if (L.indexOf(!1) > -1)
        return B.warning("Please fill in your " + _[l][L.indexOf(!1)]);
      (h((A) => t[t.indexOf(A) + 1] || t[t.length - 1]),
        setTimeout(() => {
          document.action = "";
        }, 400));
    }
    function S() {
      (h((L) => t[t.indexOf(L) - 1] || t[0]),
        setTimeout(() => {
          document.action = "";
        }, 400));
    }
    const R = async (L) => {
      var F, U, b, m;
      if ((L.preventDefault(), document.action == "next")) return T();
      if (document.action == "prev") return S();
      document.action = "";
      const A = B.loading("Creating Account", { autoClose: !1 });
      try {
        let f = e.profileicon,
          g = {};
        if (r) {
          const V = new FormData();
          V.append("media", r);
          const K = await $.post("/files/single", V, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          ((g = K.data), (f = K.data.url));
        }
        const v = { ...e, profileicon: f, iconData: g },
          C = (F = await $.post("/auth/signup", v)) == null ? void 0 : F.data;
        ((localStorage.access = C.token),
          ($.defaults.headers.common.Authorization = "Bearer " + C.token));
        const x = localStorage == null ? void 0 : localStorage.returnTo;
        ((localStorage.returnTo = ""), location.replace(x || "/"));
      } catch (f) {
        B.error(
          `${((b = (U = f == null ? void 0 : f.response) == null ? void 0 : U.data) == null ? void 0 : b.message) || ((m = f == null ? void 0 : f.response) == null ? void 0 : m.data) || (f == null ? void 0 : f.message)}`,
        );
      } finally {
        B.dismiss(A);
      }
    };
    w.useEffect(() => {
      i((L) => ({ ...L, id: "" }));
    }, []);
    const O = {
      Personal: s.jsxs("div", {
        className: `${document.action == "prev" && "slideRight"}`,
        children: [
          s.jsxs("div", {
            className: "form-group row mb-3",
            children: [
              s.jsx("div", {
                className: "form-group col-6",
                children: s.jsx("input", {
                  type: "text",
                  name: "firstname",
                  className: "form-control border",
                  onChange: D,
                  value: e.firstname,
                  required: !0,
                  placeholder: "Firstname",
                }),
              }),
              s.jsx("div", {
                className: "form-group col-6",
                children: s.jsx("input", {
                  type: "text",
                  name: "lastname",
                  className: "form-control border",
                  onChange: D,
                  value: e.lastname,
                  required: !0,
                  placeholder: "Lastname",
                }),
              }),
            ],
          }),
          s.jsx("div", {
            className: "form-group mb-3",
            children: s.jsxs("select", {
              name: "gender",
              className: "form-control border",
              onChange: D,
              value: e.gender,
              required: !0,
              placeholder: "Gender",
              children: [
                s.jsx("option", {
                  value: "",
                  className: "d-none",
                  children: "Gender",
                }),
                s.jsx("option", { value: "male", children: "Male" }),
                s.jsx("option", { value: "female", children: "Female" }),
              ],
            }),
          }),
          s.jsxs("div", {
            className: "form-group mb-3",
            children: [
              s.jsx("label", {
                className: "form-label text-dark",
                children: "Profile Icon",
              }),
              s.jsx("input", {
                type: "file",
                accept: "image/*",
                className: "form-control",
                ref: c,
                required: !0,
                onChange: E,
              }),
            ],
          }),
          r &&
            s.jsx("div", {
              className: "mb-2",
              children: s.jsx("img", {
                src: URL.createObjectURL(r),
                alt: "Profile Preview",
                style: { maxWidth: 80, maxHeight: 80, borderRadius: 8 },
              }),
            }),
        ],
      }),
      Contact: s.jsxs("div", {
        className: document.action == "prev" ? "slideRight" : "slideLeft",
        children: [
          s.jsx("div", {
            className: "form-group mb-3",
            children: s.jsx("input", {
              type: "email",
              name: "email",
              className: "form-control border",
              onChange: D,
              value: e.email,
              required: !0,
              placeholder: "Email",
            }),
          }),
          s.jsx("div", {
            className: "form-group mb-3",
            children: s.jsx("input", {
              type: "number",
              name: "phone",
              className: "form-control border",
              onChange: D,
              value: e.phone,
              required: !0,
              placeholder: "Phone",
            }),
          }),
          s.jsx("div", {
            className: "form-group mb-3",
            children: s.jsx("textarea", {
              name: "bio",
              className: "form-control border",
              onChange: D,
              value: e.bio,
              placeholder: "Short Bio (optional)",
              rows: 2,
            }),
          }),
        ],
      }),
      Security: s.jsxs("div", {
        className: document.action == "prev" ? "slideRight" : "slideLeft",
        children: [
          s.jsx("input", {
            type: "email",
            name: "email",
            className: "form-control border",
            style: {
              maxWidth: "0px",
              maxHeight: "0px",
              position: "fixed",
              width: "0px",
              height: "0px",
              opacity: "0",
            },
            onChange: D,
            value: e.email,
            required: !0,
            placeholder: "Email",
          }),
          s.jsxs("div", {
            className: "form-group mb-3 d-flex",
            children: [
              s.jsx("input", {
                type: "password",
                name: "password",
                title: "Enter your desired password",
                id: "pass",
                minLength: 6,
                className: "form-control border",
                onChange: D,
                value: e.password,
                autoComplete: "off",
                required: !0,
                placeholder: "Enter Password",
              }),
              s.jsx("div", {
                className:
                  "border bg-none border-start-0 text-dark d-flex px-2",
                onClick: (L) => {
                  (L.preventDefault(), y((F) => !F));
                  const A = document.getElementById("pass");
                  (A.type == "password"
                    ? (A.type = "text")
                    : (A.type = "password"),
                    A.focus());
                },
                children: p
                  ? s.jsx(ds, { className: "m-auto" })
                  : s.jsx(cs, { className: "m-auto" }),
              }),
            ],
          }),
          s.jsxs("div", {
            className: "form-group d-flex",
            children: [
              s.jsx("input", {
                type: "password",
                name: "vrfpass",
                id: "confpass",
                className: "form-control border",
                onChange: D,
                value: e.vrfpass,
                required: !0,
                pattern: e.password,
                title: "This must be same as the password above",
                autoComplete: "off",
                placeholder: "Confirm password",
              }),
              s.jsx("div", {
                type: "button",
                className:
                  "border bg-none border-start-0 text-dark  d-flex px-2",
                onClick: (L) => {
                  (L.preventDefault(), N((F) => !F));
                  const A = document.getElementById("confpass");
                  (A.type == "password"
                    ? (A.type = "text")
                    : (A.type = "password"),
                    A.focus());
                },
                children: j
                  ? s.jsx(ds, { className: "m-auto" })
                  : s.jsx(cs, { className: "m-auto" }),
              }),
            ],
          }),
        ],
      }),
    };
    return s.jsx("div", {
      className: "bg-light pb-5",
      children: s.jsx("div", {
        className: "container pt-5 darkTheme",
        children: s.jsx("div", {
          className: "row",
          children: s.jsxs("form", {
            onSubmit: R,
            className:
              "col-10 col-sm-9 col-md-7 col-lg-5 px-3 col-xl-4 shadow-lg panel rounded mx-auto slideUp",
            children: [
              s.jsx("div", {
                className: "d-flex",
                children: s.jsxs("h3", {
                  className: "m-auto mt-3 d-flex",
                  children: [
                    s.jsx(q, {
                      to: "/",
                      children: s.jsx(ae.LazyLoadImage, {
                        effect: "opacity",
                        className: "me-2 h-[60px] my-auto",
                        src: "/sprintetName.png",
                        alt: "",
                      }),
                    }),
                    s.jsx("span", {
                      className: "my-auto pb-3 themetxt",
                      children: " Create Account",
                    }),
                  ],
                }),
              }),
              s.jsx(
                "div",
                {
                  className: `mb-2 text-dark ${document.action == "prev" ? "slideRight" : document.action == "next" ? "slideLeft" : ""}`,
                  children: l,
                },
                l,
              ),
              O[l],
              s.jsxs("div", {
                className: "py-2 d-flex",
                children: [
                  s.jsx("div", {
                    className: "",
                    children: s.jsx(q, {
                      to: "/auth/login",
                      className: "small py-3 p-0",
                      style: { fontSize: ".8em" },
                      children: "Sign in instead!",
                    }),
                  }),
                  s.jsx("div", {
                    className: "ms-auto d-flex",
                    style: { maxWidth: "50px" },
                    children: t.map((L) =>
                      s.jsx(
                        "div",
                        {
                          className: "themebg ani",
                          style: {
                            minWidth: "6px",
                            width: l == L ? "16px" : "6px",
                            height: "6px",
                            margin: "auto 2px",
                            borderRadius: "10px",
                          },
                        },
                        L,
                      ),
                    ),
                  }),
                ],
              }),
              s.jsxs("div", {
                className: "d-flex",
                children: [
                  l !== t[0] &&
                    s.jsx("div", {
                      type: "button",
                      "aria-live": "polite",
                      className: "btn mb-4 themebg text-light",
                      onClick: () => {
                        (S(), (document.action = "prev"));
                      },
                      children: "Back",
                    }),
                  l == t[t.length - 1]
                    ? s.jsx("button", {
                        className: "btn mb-4 ms-auto themebg text-light",
                        children: "Create Account",
                      })
                    : s.jsx("button", {
                        className: "btn mb-4 ms-auto themebg text-light ",
                        onClick: () => {
                          document.action = "next";
                        },
                        children: "Next",
                      }),
                ],
              }),
            ],
          }),
        }),
      }),
    });
  },
  Qu = () => {
    var h;
    const { user: t, verification: e, fetchSrc: i } = Pe(),
      [r, a] = w.useState([]),
      c = Le();
    async function l() {
      document.title = "My Profile - Landhome";
      const p = await $.get("/auth/profile/listings");
      (a(p.data), i());
    }
    return (
      w.useEffect(() => {
        (scroll({ top: 0, behavior: "smooth" }), l());
      }, []),
      s.jsxs("div", {
        className: "bg-light min-vh-100",
        children: [
          s.jsx("div", {
            className: "position-relative",
            style: {
              background:
                "linear-gradient(90deg, #badfafff 60%, #bfd1afff 100%)",
              height: 160,
            },
            children: s.jsx("div", {
              className: "container position-relative",
              children: s.jsx("img", {
                src: t.profileicon,
                alt: "Profile",
                className:
                  "rounded-circle border border-3 border-white position-absolute",
                style: {
                  width: 180,
                  height: 180,
                  objectFit: "cover",
                  left: 30,
                  top: 30,
                  background: "#fff",
                },
              }),
            }),
          }),
          s.jsxs("div", {
            className: "",
            style: { paddingTop: 10 },
            children: [
              s.jsx("div", {
                className: " text-dark shadow-sm px-5 px-md-0 pt-5 p-4",
                children: s.jsxs("div", {
                  className:
                    "d-flex flex-column flex-md-row align-items-md-center",
                  children: [
                    s.jsx("div", { style: { width: 140 } }),
                    s.jsxs("div", {
                      className: "flex-grow-1",
                      children: [
                        s.jsx("h3", {
                          className: "mb-1",
                          children: t.fullname,
                        }),
                        t.verified &&
                          s.jsxs("div", {
                            className: "rounded mt-1 small px-2",
                            style: {
                              backgroundColor: "#D4AF37",
                              maxWidth: "fit-content",
                            },
                            onClick: () =>
                              c("/auth/user-profile/verification/view"),
                            children: [
                              s.jsx(be, {
                                className: "icon",
                                style: { color: "#ffe479ff" },
                              }),
                              " ",
                              "Verified",
                            ],
                          }),
                        s.jsx("div", {
                          className: "text-muted mt-2 mb-2",
                          children: t.bio || "No bio provided.",
                        }),
                        s.jsxs("div", {
                          className: "mb-2",
                          children: [
                            s.jsx("span", {
                              className: "me-3",
                              children: t.email,
                            }),
                            s.jsx("span", {
                              className: "me-3",
                              children:
                                t.gender &&
                                t.gender.charAt(0).toUpperCase() +
                                  t.gender.slice(1),
                            }),
                          ],
                        }),
                        s.jsx("div", {
                          className: "mb-2",
                          children: s.jsxs("span", {
                            className: "text-muted",
                            children: [
                              "Joined on",
                              " ",
                              (h = t.dateCreated) != null && h.seconds
                                ? new Date(t.dateCreated.seconds * 1e3)
                                    .toDateString()
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")
                                : "",
                            ],
                          }),
                        }),
                        s.jsxs("div", {
                          className: "d-flex gap-2 mt-3 small",
                          children: [
                            !(t != null && t.verified) &&
                              (t.verifiedId
                                ? s.jsxs(q, {
                                    to:
                                      e != null && e.checkoutId
                                        ? "/auth/verification/finish"
                                        : "/auth/user-profile/verification/view",
                                    className: "rounded btn",
                                    style: {
                                      backgroundColor: "#D4AF37",
                                      maxWidth: "fit-content",
                                    },
                                    children: [
                                      s.jsx(be, {
                                        className: "icon fs-5",
                                        style: { color: "#ffe479ff" },
                                      }),
                                      " ",
                                      e != null && e.checkoutId
                                        ? s.jsx(s.Fragment, {
                                            children: "Complete verification",
                                          })
                                        : s.jsx(s.Fragment, {
                                            children:
                                              "Verification " +
                                              (e.status || "Pending"),
                                          }),
                                    ],
                                  })
                                : s.jsxs(q, {
                                    to: "/auth/user-profile/verification",
                                    className: "rounded btn",
                                    style: {
                                      backgroundColor: "#D4AF37",
                                      maxWidth: "fit-content",
                                    },
                                    children: [
                                      s.jsx(be, {
                                        className: "icon fs-5",
                                        style: { color: "#ffe479ff" },
                                      }),
                                      " ",
                                      "Get Verified",
                                    ],
                                  })),
                            s.jsx(q, {
                              to: "/auth/user-profile/edit",
                              className: "btn themebg small text-light",
                              children: "Edit Profile",
                            }),
                            s.jsx(q, {
                              to: "/listed/new",
                              className:
                                "btn themetxt small border border-success",
                              children: "+ Add Listing",
                            }),
                            t.role == "0"
                              ? s.jsx(q, {
                                  to: "/sys/admin",
                                  className:
                                    "btn themetxt small border border-success",
                                  children: "Admin",
                                })
                              : s.jsx(s.Fragment, {}),
                            s.jsx("button", {
                              className:
                                "btn border border-dark small text-dark",
                              onClick: async () => {
                                if (!confirm("Logout?")) return null;
                                (await $.get("/logout"),
                                  (localStorage.access = ""),
                                  (location.href = location.origin));
                              },
                              children: "Logout",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              s.jsx("div", {
                className: "",
                style: { paddingTop: 10 },
                children: s.jsx("div", {
                  className: "container text-dark px-0 px-2 pt-5 p-4",
                  children: s.jsxs("div", {
                    className: "px-4",
                    children: [
                      s.jsx("h3", {
                        className: "mb-2",
                        children: "My Listings",
                      }),
                      s.jsx("div", {
                        className: "mb-5",
                        children: s.jsx("div", {
                          className: "row",
                          children: s.jsx("div", {
                            className: " row",
                            children: r.map((p) =>
                              s.jsx(
                                q,
                                {
                                  to: `/auth/user-profile/listed/${p.id}`,
                                  className:
                                    "no-dec text-dark col-12 col-sm-6 col-md-4 mt-4",
                                  children: s.jsxs("div", {
                                    className:
                                      "hovShade shadow rounded d-flex  flex-column w-100",
                                    children: [
                                      s.jsxs("div", {
                                        className: "w-100 row mx-auto g-0",
                                        children: [
                                          s.jsxs("div", {
                                            className: "small",
                                            style: { position: "absolute" },
                                            children: [
                                              p.heldUp &&
                                                !p.sold &&
                                                s.jsxs("button", {
                                                  className:
                                                    "mb-1 btn text-light themebg",
                                                  onClick: (y) => {
                                                    (y.stopPropagation(),
                                                      toast.info(
                                                        `This is probably because ${t.name} has been contacted over the listing, you can still contact ${(t == null ? void 0 : t.gender) == "male" ? "him" : "her"} as the listing has not been sold out`,
                                                      ));
                                                  },
                                                  children: [
                                                    s.jsx(Re, {
                                                      className: "icon",
                                                    }),
                                                    " This Listing has been held up by the owner",
                                                  ],
                                                }),
                                              p.sold &&
                                                s.jsxs("button", {
                                                  className:
                                                    "mb-1 btn text-light btn-primary",
                                                  onClick: (y) => {
                                                    (y.stopPropagation(),
                                                      toast.info(
                                                        `This listing has been sold out. you are seen this because ${t == null ? void 0 : t.name} marked this listing as sold`,
                                                      ));
                                                  },
                                                  children: [
                                                    s.jsx(Re, {
                                                      className: "icon",
                                                    }),
                                                    " This listing has been sold out",
                                                  ],
                                                }),
                                            ],
                                          }),
                                          (() => {
                                            var j, N, _;
                                            return (
                                              ((j = p.images[0]) == null
                                                ? void 0
                                                : j.type) || ""
                                            ).includes("image")
                                              ? s.jsx(ae.LazyLoadImage, {
                                                  effect: "opacity",
                                                  className:
                                                    "img-fluid  w-100  rounded col-12",
                                                  placeholderSrc:
                                                    "/images/default.png",
                                                  src:
                                                    ((N = p.images[0]) == null
                                                      ? void 0
                                                      : N.url) ||
                                                    "/images/default.png",
                                                  style: {
                                                    height: "200px",
                                                    minHeight: "200px",
                                                    maxHeight: "200px",
                                                    objectFit: "cover",
                                                    minWidth: "100%",
                                                  },
                                                  alt: p.name,
                                                })
                                              : s.jsx(s.Fragment, {
                                                  children: s.jsx("video", {
                                                    effect: "opacity",
                                                    className:
                                                      "img-fluid  w-100  rounded col-12",
                                                    placeholderSrc:
                                                      "/images/default.png",
                                                    src:
                                                      ((_ = p.images[0]) == null
                                                        ? void 0
                                                        : _.url) ||
                                                      "/images/default.png",
                                                    style: {
                                                      height: "200px",
                                                      minHeight: "200px",
                                                      maxHeight: "200px",
                                                      objectFit: "cover",
                                                      minWidth: "100%",
                                                    },
                                                    alt: p.name,
                                                  }),
                                                });
                                          })(),
                                        ],
                                      }),
                                      s.jsxs("div", {
                                        className: "p-3",
                                        children: [
                                          s.jsx("h4", {
                                            className: "h5 mb-2",
                                            children: p.name,
                                          }),
                                          s.jsxs("p", {
                                            className: "small text-muted",
                                            children: [
                                              p.reigion,
                                              ", ",
                                              p.state,
                                            ],
                                          }),
                                          s.jsx("div", {
                                            className:
                                              "d-flex justify-content-between align-items-center",
                                            children: s.jsxs("div", {
                                              className: "fw-bold",
                                              children: [
                                                "NGN ",
                                                p.price.toLocaleString(),
                                              ],
                                            }),
                                          }),
                                          s.jsxs("div", {
                                            className: "d-flex",
                                            children: [
                                              p.verified &&
                                                s.jsxs("div", {
                                                  className:
                                                    "rounded small me-1 px-2 my-auto",
                                                  style: {
                                                    backgroundColor: "#D4AF37",
                                                    maxWidth: "fit-content",
                                                  },
                                                  children: [
                                                    s.jsx(be, {
                                                      className: "icon",
                                                      style: {
                                                        color: "#ffe479ff",
                                                      },
                                                    }),
                                                    " ",
                                                    "Verified",
                                                  ],
                                                }),
                                              s.jsx("div", {
                                                className:
                                                  "rounded text-light small px-2 my-auto",
                                                style: {
                                                  backgroundColor:
                                                    p.type == "rental"
                                                      ? "#0056a7a4"
                                                      : "#3d8f1c",
                                                  maxWidth: "fit-content",
                                                },
                                                children: p.type,
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                },
                                p.id,
                              ),
                            ),
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
              }),
            ],
          }),
        ],
      })
    );
  },
  De = ["Basic", "Location", "Meta", "Media"],
  aa = {
    name: "",
    description: "",
    tags: "",
    reigion: "",
    state: "",
    country: "Nigeria",
    images: [],
    address: "",
    price: "",
    upVotes: "",
    relevance: 0,
    verified: !1,
    reach: 0,
    externalUrl: "",
    meta: { size: "0ft by 0ft" },
  },
  Zu = () => {
    const [t, e] = w.useState(aa),
      [i, r] = w.useState([]),
      [a, c] = w.useState(De[0]),
      [l, h] = w.useState(!1),
      [p, y] = w.useState(""),
      j = Le(),
      N = (R) => {
        const { name: O, value: L, type: A, checked: F } = R.target;
        O === "verified"
          ? e((U) => ({ ...U, [O]: F }))
          : O.startsWith("meta.")
            ? e((U) => ({ ...U, meta: { ...U.meta, [O.split(".")[1]]: L } }))
            : e((U) => ({ ...U, [O]: L }));
      },
      _ = (R) => {
        r([...R.target.files]);
      };
    function D() {
      ((document.action = "next"),
        c((R) => De[Math.min(De.indexOf(R) + 1, De.length - 1)]),
        setTimeout(() => {
          document.action = "";
        }, 400));
    }
    function E() {
      ((document.action = "prev"),
        c((R) => De[Math.max(De.indexOf(R) - 1, 0)]),
        setTimeout(() => {
          document.action = "";
        }, 400));
    }
    const T = async (R) => {
        var L;
        if ((R.preventDefault(), l))
          return B("Your request is processing... Please wait");
        const O = B.loading("Creating your listing");
        (y(""), h(!0));
        try {
          let A = [];
          if (i.length > 0) {
            const U = new FormData();
            (i.forEach((m) => U.append("media", m)),
              (A = (
                await $.post("/files/many", U, {
                  headers: { "Content-Type": "multipart/form-data" },
                })
              ).data.map((m) => ({ url: m.url, id: m.id, type: m.type }))));
          }
          const F = await $.post("/listings", {
            ...t,
            price: Number(t.price),
            relevance: String(t.relevance),
            reach: Number(t.reach),
            images: A,
            upVotes: [],
            meta: { ...t.meta },
          });
          (y("Listing created successfully!"),
            e(aa),
            r([]),
            c(De[0]),
            j(
              "/auth/user-profile/listed/" +
                ((L = F.data) == null ? void 0 : L.id),
            ));
        } catch (A) {
          (console.error(A), B.error("Failed to create listing"));
        } finally {
          B.dismiss(O);
        }
        h(!1);
      },
      S = {
        Basic: s.jsxs("div", {
          className: `${document.action == "prev" && "slideRight"}`,
          children: [
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", { className: "form-label", children: "Name" }),
                s.jsx("input", {
                  name: "name",
                  value: t.name,
                  onChange: N,
                  className: "form-control",
                  required: !0,
                }),
              ],
            }),
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", {
                  className: "form-label",
                  children: "Description",
                }),
                s.jsx("textarea", {
                  name: "description",
                  value: t.description,
                  onChange: N,
                  className: "form-control",
                  rows: 3,
                  required: !0,
                }),
              ],
            }),
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", {
                  className: "form-label",
                  children: "Tags (comma separated)",
                }),
                s.jsx("input", {
                  name: "tags",
                  value: t.tags,
                  onChange: N,
                  className: "form-control",
                }),
              ],
            }),
          ],
        }),
        Location: s.jsxs("div", {
          className: document.action == "prev" ? "slideRight" : "slideLeft",
          children: [
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", { className: "form-label", children: "Region" }),
                s.jsx("input", {
                  name: "reigion",
                  value: t.reigion,
                  onChange: N,
                  className: "form-control",
                }),
              ],
            }),
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", { className: "form-label", children: "State" }),
                s.jsxs("select", {
                  className: "form-select",
                  name: "state",
                  value: t.state,
                  onChange: N,
                  children: [
                    s.jsx("option", { value: "", children: "All States" }),
                    em().map((R) =>
                      s.jsx("option", { value: R, children: R }, R),
                    ),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", {
                  className: "form-label",
                  children: "Country",
                }),
                s.jsx("input", {
                  name: "country",
                  value: t.country,
                  onChange: N,
                  className: "form-control",
                }),
              ],
            }),
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", {
                  className: "form-label",
                  children: "Address",
                }),
                s.jsx("input", {
                  name: "address",
                  value: t.address,
                  onChange: N,
                  className: "form-control",
                }),
              ],
            }),
          ],
        }),
        Media: s.jsxs("div", {
          className: document.action == "prev" ? "slideRight" : "slideLeft",
          children: [
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", {
                  className: "form-label",
                  children: "Images/Videos",
                }),
                s.jsx("input", {
                  type: "file",
                  className: "form-control",
                  multiple: !0,
                  accept: "image/*,video/*",
                  onChange: _,
                }),
              ],
            }),
            i.length > 0 &&
              s.jsx("div", {
                className: "mb-2 d-flex flex-wrap gap-2",
                children: Array.from(i).map((R, O) => {
                  const L = R.type.startsWith("image/") ? "image" : "video";
                  return s.jsx(
                    "div",
                    {
                      children:
                        L === "image"
                          ? s.jsx("img", {
                              src: URL.createObjectURL(R),
                              alt: "Preview",
                              style: {
                                minWidth: 80,
                                minHeight: 80,
                                maxWidth: 80,
                                maxHeight: 80,
                                borderRadius: 8,
                                objectFit: "cover",
                              },
                            })
                          : s.jsx("video", {
                              src: URL.createObjectURL(R),
                              alt: "Video Preview",
                              style: {
                                minWidth: 80,
                                minHeight: 80,
                                maxWidth: 80,
                                maxHeight: 80,
                                borderRadius: 8,
                                objectFit: "cover",
                              },
                              controls: !0,
                            }),
                    },
                    O,
                  );
                }),
              }),
          ],
        }),
        Meta: s.jsxs("div", {
          className: document.action == "prev" ? "slideRight" : "slideLeft",
          children: [
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", { className: "form-label", children: "Type" }),
                s.jsxs("select", {
                  className: "form-select",
                  name: "type",
                  value: t.type,
                  onChange: N,
                  children: [
                    s.jsx("option", { value: "", children: "Select Type" }),
                    s.jsx("option", { value: "sale", children: "Sale" }),
                    s.jsx("option", { value: "rental", children: "Rental" }),
                  ],
                }),
              ],
            }),
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", { className: "form-label", children: "Price" }),
                s.jsx("input", {
                  name: "price",
                  value: t.price,
                  onChange: N,
                  className: "form-control",
                  type: "number",
                  required: !0,
                }),
              ],
            }),
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", {
                  className: "form-label",
                  children: "External URL",
                }),
                s.jsx("input", {
                  name: "externalUrl",
                  value: t.externalUrl,
                  onChange: N,
                  className: "form-control",
                }),
              ],
            }),
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", {
                  className: "form-label",
                  children: "Meta Size",
                }),
                s.jsx("input", {
                  name: "meta.size",
                  value: t.meta.size,
                  onChange: N,
                  className: "form-control",
                }),
              ],
            }),
          ],
        }),
      };
    return s.jsx("div", {
      className: "bg-light text-dark pb-5",
      children: s.jsx("div", {
        className: "container pt-5 darkTheme",
        children: s.jsx("div", {
          className: "row",
          children: s.jsxs("form", {
            onSubmit: T,
            className:
              "col-11 col-sm-9 ani col-md-7 col-lg-6 px-3 shadow-lg panel rounded mx-auto slideUp",
            style: { height: "fit-content", transition: "all, 0.3s" },
            children: [
              s.jsxs("div", {
                className: "d-flex flex-column",
                children: [
                  s.jsx("h3", {
                    className: "m-auto fs-4 mt-3 d-flex mb-2",
                    children: "Create a listing",
                  }),
                  s.jsx("div", {
                    className: "small text-center mb-3 ",
                    children:
                      "Put your property up for listing and be rest assured, it is in safe hands",
                  }),
                ],
              }),
              s.jsxs(
                "div",
                {
                  className: `mb-2 rounded border-success text-dark border px-2 me-auto ${document.action == "prev" ? "slideRight" : document.action == "next" ? "slideLeft" : ""}`,
                  children: [a, " Information"],
                },
                a,
              ),
              S[a],
              s.jsxs("div", {
                className: "py-2 d-flex",
                children: [
                  s.jsx("div", { className: "" }),
                  s.jsx("div", {
                    className: "ms-auto d-flex",
                    style: { maxWidth: "50px" },
                    children: De.map((R) =>
                      s.jsx(
                        "div",
                        {
                          className: "themebg ani",
                          style: {
                            minWidth: "6px",
                            width: a === R ? "16px" : "6px",
                            height: "6px",
                            margin: "auto 2px",
                            borderRadius: "10px",
                          },
                        },
                        R,
                      ),
                    ),
                  }),
                ],
              }),
              s.jsxs("div", {
                className: "d-flex",
                children: [
                  a !== De[0] &&
                    s.jsx("div", {
                      type: "button",
                      "aria-live": "polite",
                      className: "btn mb-4 themebg text-light",
                      onClick: E,
                      children: "Back",
                    }),
                  a === De[De.length - 1]
                    ? s.jsx("button", {
                        className: "btn mb-4 ms-auto themebg text-light",
                        children: "Create Listing",
                      })
                    : s.jsx("div", {
                        className: "btn mb-4 ms-auto themebg text-light ",
                        onClick: D,
                        children: "Next",
                      }),
                ],
              }),
              p &&
                s.jsx("div", {
                  className: "mt-3 alert alert-info",
                  children: p,
                }),
            ],
          }),
        }),
      }),
    });
  };
function em() {
  return [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT",
  ];
}
const tm = () => {
    var N, _;
    const { listingId: t } = It(),
      [e, i] = w.useState(null),
      [r, a] = w.useState(null),
      [c, l] = w.useState({}),
      { setModal: h } = Pe(),
      p = Le(),
      [y, j] = w.useState(!0);
    return (
      w.useEffect(() => {
        (scroll({ top: 0 }),
          (async () => {
            var D, E;
            try {
              const T = await $.get("/listings/" + t);
              (i(T.data),
                ((E = (D = T.data) == null ? void 0 : D.images) == null
                  ? void 0
                  : E.length) > 0 && a(T.data.images[0]),
                (document.title = "My " + T.data.name + " listing - Landhome"));
              const { uid: S } = T.data,
                R = await $.get("/listings/users/" + S);
              l(R.data);
            } catch (T) {
              (B.error("Something went wrong"), console.error(T));
            }
          })());
      }, [t, y]),
      e
        ? s.jsx("div", {
            className: "bg-white py-4 text-dark ",
            children: s.jsx("div", {
              className: "container",
              children: s.jsxs("div", {
                className: "row g-4",
                children: [
                  s.jsxs("div", {
                    className: "col-12 col-md-6",
                    children: [
                      e.heldUp &&
                        !e.sold &&
                        s.jsxs("button", {
                          className: "mb-1 btn text-light themebg",
                          onClick: () => {
                            B.info(
                              "This is probably because You have been contacted over the listing and marked it as sold",
                            );
                          },
                          children: [
                            s.jsx(Re, { className: "icon" }),
                            " This Listing has been held up by the You",
                          ],
                        }),
                      e.sold &&
                        s.jsxs("button", {
                          className: "mb-1 btn text-light btn-primary",
                          onClick: () => {
                            B.info(
                              "This listing has been sold out. you are seen this because You marked this listing as sold",
                            );
                          },
                          children: [
                            s.jsx(Re, { className: "icon" }),
                            " This listing has been sold out",
                          ],
                        }),
                      ((N = e.images) == null ? void 0 : N.length) > 0 &&
                        s.jsxs(s.Fragment, {
                          children: [
                            s.jsx("div", {
                              className: "text-center mb-3",
                              children:
                                (_ = r == null ? void 0 : r.type) != null &&
                                _.startsWith("video")
                                  ? s.jsx("video", {
                                      src: r.url,
                                      controls: !0,
                                      className: "img-fluid rounded shadow-sm",
                                      style: {
                                        maxHeight: "300px",
                                        width: "100%",
                                        objectFit: "cover",
                                      },
                                      onClick: () => {
                                        h(
                                          s.jsx("video", {
                                            src: r.url,
                                            controls: !0,
                                            className:
                                              "img-fluid rounded shadow-sm mx-auto",
                                            style: {
                                              maxHeight: "70vh",
                                              width: "100%",
                                              objectFit: "cover",
                                            },
                                          }),
                                        );
                                      },
                                    })
                                  : s.jsx(ae.LazyLoadImage, {
                                      effect: "opacity",
                                      src: r.url,
                                      alt: e.name,
                                      className: "img-fluid rounded shadow-sm",
                                      style: {
                                        maxHeight: "300px",
                                        width: "100%",
                                        objectFit: "cover",
                                      },
                                      onClick: () => {
                                        h(
                                          s.jsx(ae.LazyLoadImage, {
                                            effect: "opacity",
                                            src: r.url,
                                            alt: e.name,
                                            className:
                                              "img-fluid rounded shadow-sm mx-auto",
                                            style: {
                                              maxHeight: "70vh",
                                              width: "100%",
                                              objectFit: "cover",
                                            },
                                          }),
                                        );
                                      },
                                    }),
                            }),
                            s.jsx("div", {
                              className:
                                "d-flex flex-wrap justify-content-center gap-2",
                              children: e.images.map((D, E) => {
                                var T;
                                return s.jsx(
                                  "div",
                                  {
                                    className: `border rounded p-1 ${(r == null ? void 0 : r.url) === D.url ? "border-success" : "border-light"}`,
                                    style: {
                                      cursor: "pointer",
                                      width: "70px",
                                      height: "70px",
                                      overflow: "hidden",
                                    },
                                    onClick: () => a(D),
                                    children:
                                      (T = D.type) != null &&
                                      T.startsWith("video")
                                        ? s.jsx("video", {
                                            src: D.url,
                                            className: "w-100 h-100",
                                            style: { objectFit: "cover" },
                                          })
                                        : s.jsx(ae.LazyLoadImage, {
                                            effect: "opacity",
                                            src: D.url,
                                            alt: "thumb",
                                            className: "w-100 h-100",
                                            style: { objectFit: "cover" },
                                          }),
                                  },
                                  E,
                                );
                              }),
                            }),
                          ],
                        }),
                    ],
                  }),
                  s.jsxs("div", {
                    className: "col-12 col-md-6",
                    children: [
                      s.jsx("div", {
                        className:
                          "d-flex justify-content-between align-items-center mb-3",
                        children: s.jsx("h2", {
                          className: "mb-0 ",
                          children: e.name,
                        }),
                      }),
                      s.jsxs("p", {
                        className: "lead fw-bold themetxt",
                        children: [e.currency, " ", e.price.toLocaleString()],
                      }),
                      s.jsxs("p", {
                        className: "text-muted mb-2",
                        children: [
                          e.address,
                          ", ",
                          e.state,
                          ", ",
                          e.reigion,
                          ",",
                          " ",
                          e.country,
                        ],
                      }),
                      s.jsxs("div", {
                        className: "d-flex",
                        children: [
                          e.verified &&
                            s.jsxs("div", {
                              className: "rounded small me-1 px-2 my-auto",
                              style: {
                                backgroundColor: "#D4AF37",
                                maxWidth: "fit-content",
                              },
                              children: [
                                s.jsx(be, {
                                  className: "icon",
                                  style: { color: "#ffe479ff" },
                                }),
                                " ",
                                "Verified",
                              ],
                            }),
                          s.jsx("div", {
                            className: "rounded text-light small px-2 my-auto",
                            style: {
                              backgroundColor:
                                e.type == "rental" ? "#0056a7a4" : "#3d8f1c",
                              maxWidth: "fit-content",
                            },
                            children: e.type,
                          }),
                        ],
                      }),
                      s.jsxs("div", {
                        className: "mb-3 mt-3",
                        children: [
                          s.jsx("h5", { children: "Description" }),
                          s.jsx("p", {
                            children:
                              e.description || "No description available.",
                          }),
                        ],
                      }),
                      e.tags &&
                        s.jsxs("div", {
                          className: "mb-3",
                          children: [
                            s.jsx("h6", { children: "Tags" }),
                            e.tags
                              .split(",")
                              .map((D, E) =>
                                s.jsx(
                                  "span",
                                  {
                                    className: "badge bg-secondary me-2",
                                    children: D.trim(),
                                  },
                                  E,
                                ),
                              ),
                          ],
                        }),
                      s.jsxs("div", {
                        className: "d-flex gap-2 mt-3 small",
                        children: [
                          s.jsx("button", {
                            className: "btn btn-small btn-primary text-light",
                            onClick: async () => {
                              var E, T, S;
                              const D = B.loading("Holding up your listing");
                              try {
                                const R = { ...e };
                                ((R.sold = !R.sold),
                                  await $.put(`/listings/${t}`, { ...R }),
                                  j((O) => !O),
                                  B.success(
                                    "Your listing has been marked as sold",
                                  ));
                              } catch (R) {
                                B.error(
                                  ((T =
                                    (E = R == null ? void 0 : R.response) ==
                                    null
                                      ? void 0
                                      : E.data) == null
                                    ? void 0
                                    : T.message) ||
                                    ((S = R == null ? void 0 : R.response) ==
                                    null
                                      ? void 0
                                      : S.data) ||
                                    (R == null ? void 0 : R.message) ||
                                    "Something went wrong",
                                );
                              } finally {
                                B.dismiss(D);
                              }
                            },
                            children:
                              e != null && e.sold
                                ? "Mark as available"
                                : "Mark as Sold",
                          }),
                          s.jsx("button", {
                            className: "btn btn-small themebg text-light",
                            onClick: async () => {
                              var E, T, S;
                              const D = B.loading("Holding up your listing");
                              try {
                                const R = { ...e };
                                ((R.heldUp = !R.heldUp),
                                  await $.put(`/listings/${t}`, { ...R }),
                                  j((O) => !O),
                                  B.success("Your listing has been held up"));
                              } catch (R) {
                                B.error(
                                  ((T =
                                    (E = R == null ? void 0 : R.response) ==
                                    null
                                      ? void 0
                                      : E.data) == null
                                    ? void 0
                                    : T.message) ||
                                    ((S = R == null ? void 0 : R.response) ==
                                    null
                                      ? void 0
                                      : S.data) ||
                                    (R == null ? void 0 : R.message) ||
                                    "Something went wrong",
                                );
                              } finally {
                                B.dismiss(D);
                              }
                            },
                            children:
                              e != null && e.heldUp ? "Release" : "Hold Up",
                          }),
                          s.jsx(q, {
                            to: "edit",
                            className: "btn btn-small border-success themetxt",
                            children: "Edit Listing",
                          }),
                          s.jsx(q, {
                            onClick: async () => {
                              var E, T, S;
                              if (
                                !(
                                  confirm(
                                    "Do You want to delete this listing?",
                                  ) && confirm("This action cannot be undone")
                                )
                              )
                                return;
                              const D = B.loading("Deleting your listing");
                              try {
                                (await $.delete("/listings/" + t),
                                  B.success("Your listing has been deleted"),
                                  p("/auth/user-profile"));
                              } catch (R) {
                                B.error(
                                  ((T =
                                    (E = R == null ? void 0 : R.response) ==
                                    null
                                      ? void 0
                                      : E.data) == null
                                    ? void 0
                                    : T.message) ||
                                    ((S = R == null ? void 0 : R.response) ==
                                    null
                                      ? void 0
                                      : S.data) ||
                                    (R == null ? void 0 : R.message) ||
                                    "Failed to delete listing",
                                );
                              } finally {
                                B.dismiss(D);
                              }
                            },
                            className: "btn text-danger border border-danger",
                            children: "Delete Lising",
                          }),
                        ],
                      }),
                      e.externalUrl &&
                        s.jsx("a", {
                          href: e.externalUrl,
                          className:
                            "btn btn-outline-success mt-3 btn-small small p-1 px-2",
                          target: "_blank",
                          rel: "noopener noreferrer",
                          children: e.externalUrl.replace("https://", ""),
                        }),
                    ],
                  }),
                ],
              }),
            }),
          })
        : s.jsx("div", {
            className:
              "d-flex justify-content-center align-items-center py-5 bg-light",
            style: { minHeight: "45vw" },
            children: s.jsx("div", {
              className: "spinner-border themetxt",
              role: "status",
            }),
          })
    );
  },
  sm = () => {
    var j, N;
    const { listingId: t } = It(),
      [e, i] = w.useState(null),
      [r, a] = w.useState(null),
      [c, l] = w.useState({}),
      { setModal: h, setTitle: p } = Pe(),
      y = (c.phone || "").startsWith("0")
        ? (c.phone || "").replace("0", "")
        : c.phone || "";
    return (
      w.useEffect(() => {
        (scroll({ top: 0 }),
          (async () => {
            var _, D, E;
            try {
              const T = await $.get("/listings/" + t);
              (i(T.data),
                (document.title =
                  ((_ = T == null ? void 0 : T.data) == null
                    ? void 0
                    : _.name) + " - Landhome"),
                ((E = (D = T.data) == null ? void 0 : D.images) == null
                  ? void 0
                  : E.length) > 0 && a(T.data.images[0]));
              const { uid: S } = T.data,
                R = await $.get("/users/" + S);
              l(R.data);
            } catch (T) {
              (B.error("Something went wrong"),
                console.error(T),
                (document.title = (e == null ? void 0 : e.name) || "Listing"));
            }
          })());
      }, [t]),
      e
        ? s.jsx("div", {
            className: "bg-white py-4 text-dark ",
            children: s.jsxs("div", {
              className: "container",
              children: [
                s.jsxs("div", {
                  className: "row g-4",
                  children: [
                    s.jsx("div", {
                      className: "col-12 col-md-6",
                      children:
                        ((j = e.images) == null ? void 0 : j.length) > 0 &&
                        s.jsxs(s.Fragment, {
                          children: [
                            e.heldUp &&
                              !e.sold &&
                              s.jsxs("button", {
                                className: "mb-1 btn text-light themebg",
                                onClick: () => {
                                  B.info(
                                    `This is probably because ${c.name} has been contacted over the listing, you can still contact ${(c == null ? void 0 : c.gender) == "male" ? "him" : "her"} as the listing has not been sold out`,
                                  );
                                },
                                children: [
                                  s.jsx(Re, { className: "icon" }),
                                  " This Listing has been held up by the owner",
                                ],
                              }),
                            e.sold &&
                              s.jsxs("button", {
                                className: "mb-1 btn text-light btn-primary",
                                onClick: () => {
                                  B.info(
                                    `This listing has been sold out. you are seen this because ${c == null ? void 0 : c.name} marked this listing as sold`,
                                  );
                                },
                                children: [
                                  s.jsx(Re, { className: "icon" }),
                                  " This listing has been sold out",
                                ],
                              }),
                            s.jsx("div", {
                              className: "text-center mb-3",
                              children:
                                (N = r == null ? void 0 : r.type) != null &&
                                N.startsWith("video")
                                  ? s.jsx("video", {
                                      src: r.url,
                                      controls: !0,
                                      className: "img-fluid rounded shadow-sm",
                                      style: {
                                        maxHeight: "300px",
                                        width: "100%",
                                        objectFit: "cover",
                                      },
                                      onClick: () => {
                                        h(
                                          s.jsx("video", {
                                            src: r.url,
                                            controls: !0,
                                            className:
                                              "img-fluid rounded shadow-sm mx-auto",
                                            style: {
                                              maxHeight: "70vh",
                                              width: "100%",
                                              objectFit: "cover",
                                            },
                                          }),
                                        );
                                      },
                                    })
                                  : s.jsx(ae.LazyLoadImage, {
                                      effect: "opacity",
                                      src: r.url,
                                      alt: e.name,
                                      className: "img-fluid rounded shadow-sm",
                                      style: {
                                        maxHeight: "300px",
                                        width: "100%",
                                        objectFit: "cover",
                                      },
                                      onClick: () => {
                                        h(
                                          s.jsx(ae.LazyLoadImage, {
                                            effect: "opacity",
                                            src: r.url,
                                            alt: e.name,
                                            className:
                                              "img-fluid rounded shadow-sm mx-auto",
                                            style: {
                                              maxHeight: "70vh",
                                              width: "100%",
                                              objectFit: "cover",
                                            },
                                          }),
                                        );
                                      },
                                    }),
                            }),
                            s.jsx("div", {
                              className:
                                "d-flex flex-wrap justify-content-center gap-2",
                              children: e.images.map((_, D) => {
                                var E;
                                return s.jsx(
                                  "div",
                                  {
                                    className: `border rounded p-1 ${(r == null ? void 0 : r.url) === _.url ? "border-success" : "border-light"}`,
                                    style: {
                                      cursor: "pointer",
                                      width: "70px",
                                      height: "70px",
                                      overflow: "hidden",
                                    },
                                    onClick: () => a(_),
                                    children:
                                      (E = _.type) != null &&
                                      E.startsWith("video")
                                        ? s.jsx("video", {
                                            src: _.url,
                                            className: "w-100 h-100",
                                            style: { objectFit: "cover" },
                                          })
                                        : s.jsx(ae.LazyLoadImage, {
                                            effect: "opacity",
                                            src: _.url,
                                            alt: "thumb",
                                            className: "w-100 h-100",
                                            style: { objectFit: "cover" },
                                          }),
                                  },
                                  D,
                                );
                              }),
                            }),
                          ],
                        }),
                    }),
                    s.jsxs("div", {
                      className: "col-12 col-md-6",
                      children: [
                        s.jsx("div", {
                          className:
                            "d-flex justify-content-between align-items-center mb-3",
                          children: s.jsx("h2", {
                            className: "mb-0 ",
                            children: e.name,
                          }),
                        }),
                        s.jsxs("p", {
                          className: "lead fw-bold themetxt",
                          children: [e.currency, " ", e.price.toLocaleString()],
                        }),
                        s.jsxs("p", {
                          className: "text-muted mb-2",
                          children: [
                            e.address,
                            ", ",
                            e.state,
                            ", ",
                            e.reigion,
                            ",",
                            " ",
                            e.country,
                          ],
                        }),
                        s.jsxs("div", {
                          className: "d-flex",
                          children: [
                            e.verified &&
                              s.jsxs("div", {
                                className: "rounded small me-1 px-2 my-auto",
                                style: {
                                  backgroundColor: "#D4AF37",
                                  maxWidth: "fit-content",
                                },
                                children: [
                                  s.jsx(be, {
                                    className: "icon",
                                    style: { color: "#ffe479ff" },
                                  }),
                                  " ",
                                  "Verified",
                                ],
                              }),
                            s.jsx("div", {
                              className:
                                "rounded text-light small px-2 my-auto",
                              style: {
                                backgroundColor:
                                  e.type == "rental" ? "#0056a7a4" : "#3d8f1c",
                                maxWidth: "fit-content",
                              },
                              children: e.type,
                            }),
                          ],
                        }),
                        s.jsxs("div", {
                          className: "mb-3 mt-3",
                          children: [
                            s.jsx("h5", { children: "Description" }),
                            s.jsx("p", {
                              children:
                                e.description || "No description available.",
                            }),
                          ],
                        }),
                        e.tags &&
                          s.jsxs("div", {
                            className: "mb-3",
                            children: [
                              s.jsx("h6", { children: "Tags" }),
                              e.tags
                                .split(",")
                                .map((_, D) =>
                                  s.jsx(
                                    "span",
                                    {
                                      className: "badge bg-secondary me-2",
                                      children: _.trim(),
                                    },
                                    D,
                                  ),
                                ),
                            ],
                          }),
                        s.jsxs("div", {
                          className: "small",
                          children: [
                            c.phone &&
                              s.jsx("a", {
                                href:
                                  "https://wa.me/" +
                                  y +
                                  `?text=I am interested in your listing ${e.name} on landsmart ${location.href} %0A`,
                                className:
                                  "btn themebg text-light btn-small me-1 small p-1 px-2",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: "Message on whatsapp",
                              }),
                            e.externalUrl &&
                              s.jsx("a", {
                                href: e.externalUrl,
                                className:
                                  "btn btn-outline-success btn-small small p-1 me-1 px-2",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: "Visit website",
                              }),
                            c.email &&
                              s.jsx("a", {
                                href: `mailto:${c.email}?subject=Inquiry for your ${e.name} listing on Landhome&&body=I am interested in your listing ${location.href} %0A`,
                                className:
                                  "btn btn-outline-success btn-small small p-1 me-1 px-2",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: "Send Email",
                              }),
                            c.phone &&
                              s.jsx("a", {
                                href: "tel:" + c.phone,
                                className:
                                  "btn btn-outline-success btn-small me-1 small p-1 px-2",
                                target: "_blank",
                                rel: "noopener noreferrer",
                                children: "Call",
                              }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                s.jsx("div", {
                  className: "row mt-4",
                  children: s.jsx("div", {
                    className: "col-12",
                    children: s.jsx("div", {
                      className: "card p-3",
                      children: s.jsx("div", {
                        className: "d-flex align-items-center",
                        children: s.jsxs(q, {
                          to: `/user/${c.id}`,
                          className: "d-flex align-items-center",
                          children: [
                            s.jsx(ae.LazyLoadImage, {
                              effect: "opacity",
                              src: c.profileicon,
                              alt: c.fullname,
                              className: "rounded-circle me-3",
                              style: {
                                width: 50,
                                height: 50,
                                objectFit: "cover",
                              },
                            }),
                            s.jsxs("div", {
                              children: [
                                s.jsxs("h6", {
                                  className: "mb-0 d-flex",
                                  children: [
                                    c.fullname,
                                    " ",
                                    c.verified &&
                                      s.jsxs("div", {
                                        className:
                                          "rounded icon mt-1 small ms-2 px-2",
                                        style: {
                                          backgroundColor: "#D4AF37",
                                          maxWidth: "fit-content",
                                        },
                                        children: [
                                          s.jsx(be, {
                                            className: "icon",
                                            style: { color: "#ffe479ff" },
                                          }),
                                          " ",
                                        ],
                                      }),
                                  ],
                                }),
                                s.jsx("p", {
                                  className: "small text-muted mb-0",
                                  children: s.jsx("a", {
                                    onClick: (_) => {
                                      _.stopPropagation();
                                    },
                                    href: `mailto:${c.email}`,
                                    children: c.email,
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    }),
                  }),
                }),
              ],
            }),
          })
        : s.jsx("div", {
            className:
              "d-flex justify-content-center align-items-center py-5 bg-light",
            style: { minHeight: "45vw" },
            children: s.jsx("div", {
              className: "spinner-border themetxt",
              role: "status",
            }),
          })
    );
  },
  nm = () => {
    var l;
    const [t, e] = w.useState({}),
      [i, r] = w.useState([]),
      { uid: a } = It();
    async function c() {
      const h = await $.get("/users/" + a);
      (e(h.data),
        (document.title =
          h.data.firstname +
          " " +
          h.data.lastname +
          `'s ${h.data.verified ? " verified business " : ""} Profile - Landhome`));
      const p = await $.get("/auth/profile/listings/user/" + a);
      r(p.data);
    }
    return (
      w.useEffect(() => {
        (scroll({ top: 0 }), c());
      }, []),
      s.jsxs("div", {
        className: "bg-light min-vh-100",
        children: [
          s.jsx("div", {
            className: "position-relative",
            style: {
              background:
                "linear-gradient(90deg, #badfafff 60%, #bfd1afff 100%)",
              height: 160,
            },
            children: s.jsx("div", {
              className: "container position-relative",
              children: s.jsx("img", {
                src: t.profileicon,
                alt: "Profile",
                className:
                  "rounded-circle border border-3 border-white position-absolute",
                style: {
                  width: 180,
                  height: 180,
                  objectFit: "cover",
                  left: 30,
                  top: 30,
                  background: "#fff",
                },
              }),
            }),
          }),
          s.jsxs("div", {
            className: "",
            style: { paddingTop: 10 },
            children: [
              s.jsx("div", {
                className: " text-dark shadow-sm px-5 px-md-0 pt-5 p-4",
                children: s.jsxs("div", {
                  className:
                    "d-flex flex-column flex-md-row align-items-md-center",
                  children: [
                    s.jsx("div", { style: { width: 140 } }),
                    s.jsxs("div", {
                      className: "flex-grow-1",
                      children: [
                        s.jsx("h3", {
                          className: "mb-1",
                          children: t.fullname,
                        }),
                        t.verified &&
                          s.jsxs("div", {
                            className: "rounded mt-1 small px-2",
                            style: {
                              backgroundColor: "#D4AF37",
                              maxWidth: "fit-content",
                            },
                            children: [
                              s.jsx(be, {
                                className: "icon",
                                style: { color: "#ffe479ff" },
                              }),
                              " ",
                              "Verified",
                            ],
                          }),
                        s.jsx("div", {
                          className: "text-muted mt-2 mb-2",
                          children: t.bio || "No bio provided.",
                        }),
                        s.jsxs("div", {
                          className: "mb-2",
                          children: [
                            s.jsx("span", {
                              className: "me-3",
                              children: t.email,
                            }),
                            s.jsx("span", {
                              className: "me-3",
                              children:
                                t.gender &&
                                t.gender.charAt(0).toUpperCase() +
                                  t.gender.slice(1),
                            }),
                          ],
                        }),
                        s.jsx("div", {
                          className: "mb-2",
                          children: s.jsxs("span", {
                            className: "text-muted",
                            children: [
                              "Joined on",
                              " ",
                              (l = t.dateCreated) != null && l.seconds
                                ? new Date(t.dateCreated.seconds * 1e3)
                                    .toDateString()
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")
                                : "",
                            ],
                          }),
                        }),
                        s.jsx("div", {
                          className: "d-flex gap-2 mt-3",
                          children: s.jsxs("div", {
                            className: "small",
                            children: [
                              t.phone &&
                                s.jsx("a", {
                                  href: "https://wa.me/" + t.phone,
                                  className:
                                    "btn themebg text-light btn-small me-1 small p-1 px-2",
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  children: "Message on whatsapp",
                                }),
                              t.email &&
                                s.jsx("a", {
                                  href: `mailto:${t.email}`,
                                  className:
                                    "btn btn-outline-success btn-small small p-1 me-1 px-2",
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  children: "Send Email",
                                }),
                              t.phone &&
                                s.jsx("a", {
                                  href: "tel:" + t.phone,
                                  className:
                                    "btn btn-outline-success btn-small me-1 small p-1 px-2",
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                  children: "Call",
                                }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              s.jsx("div", {
                className: "",
                style: { paddingTop: 10 },
                children: s.jsx("div", {
                  className: "container text-dark px-0 px-2 pt-5 p-4",
                  children: s.jsxs("div", {
                    className: "px-4",
                    children: [
                      s.jsxs("h3", {
                        className: "mb-2",
                        children: [
                          (t.firstname || "").replace(" ", "") || "User",
                          "'s Listings",
                        ],
                      }),
                      s.jsx("div", {
                        className: "mb-5",
                        children: s.jsx("div", {
                          className: "row",
                          children: s.jsx("div", {
                            className: " row",
                            children: i.map((h) =>
                              s.jsx(
                                q,
                                {
                                  to: `/listed/${h.id}`,
                                  className:
                                    "no-dec text-dark col-12 col-sm-6 col-md-4 mt-4",
                                  children: s.jsxs("div", {
                                    className:
                                      "hovShade shadow rounded d-flex  flex-column w-100",
                                    children: [
                                      s.jsxs("div", {
                                        className: "w-100 row mx-auto g-0",
                                        children: [
                                          s.jsxs("div", {
                                            className: "small",
                                            style: { position: "absolute" },
                                            children: [
                                              h.heldUp &&
                                                !h.sold &&
                                                s.jsxs("button", {
                                                  className:
                                                    "mb-1 btn text-light themebg",
                                                  onClick: (p) => {
                                                    (p.stopPropagation(),
                                                      toast.info(
                                                        `This is probably because ${t.name} has been contacted over the listing, you can still contact ${(t == null ? void 0 : t.gender) == "male" ? "him" : "her"} as the listing has not been sold out`,
                                                      ));
                                                  },
                                                  children: [
                                                    s.jsx(Re, {
                                                      className: "icon",
                                                    }),
                                                    " This Listing has been held up by the owner",
                                                  ],
                                                }),
                                              h.sold &&
                                                s.jsxs("button", {
                                                  className:
                                                    "mb-1 btn text-light btn-primary",
                                                  onClick: (p) => {
                                                    (p.stopPropagation(),
                                                      toast.info(
                                                        `This listing has been sold out. you are seen this because ${t == null ? void 0 : t.name} marked this listing as sold`,
                                                      ));
                                                  },
                                                  children: [
                                                    s.jsx(Re, {
                                                      className: "icon",
                                                    }),
                                                    " This listing has been sold out",
                                                  ],
                                                }),
                                            ],
                                          }),
                                          (() => {
                                            var y, j, N, _;
                                            return (
                                              ((y = h.images[0]) == null
                                                ? void 0
                                                : y.type) || ""
                                            ).startsWith("image") &&
                                              ((j = h.images[0]) == null
                                                ? void 0
                                                : j.type)
                                              ? s.jsx(ae.LazyLoadImage, {
                                                  effect: "opacity",
                                                  className:
                                                    "img-fluid  w-100  rounded col-12",
                                                  placeholderSrc:
                                                    "/images/default.png",
                                                  src:
                                                    ((N = h.images[0]) == null
                                                      ? void 0
                                                      : N.url) ||
                                                    "/images/default.png",
                                                  style: {
                                                    height: "200px",
                                                    minHeight: "200px",
                                                    maxHeight: "200px",
                                                    objectFit: "cover",
                                                    minWidth: "100%",
                                                  },
                                                  alt: h.name,
                                                })
                                              : s.jsx(s.Fragment, {
                                                  children: s.jsx("video", {
                                                    effect: "opacity",
                                                    className:
                                                      "img-fluid  w-100  rounded col-12",
                                                    placeholderSrc:
                                                      "/images/default.png",
                                                    src:
                                                      ((_ = h.images[0]) == null
                                                        ? void 0
                                                        : _.url) ||
                                                      "/images/default.png",
                                                    style: {
                                                      height: "200px",
                                                      minHeight: "200px",
                                                      maxHeight: "200px",
                                                      objectFit: "cover",
                                                      minWidth: "100%",
                                                    },
                                                    alt: h.name,
                                                  }),
                                                });
                                          })(),
                                        ],
                                      }),
                                      s.jsxs("div", {
                                        className: "p-3",
                                        children: [
                                          s.jsx("h4", {
                                            className: "h5 mb-2",
                                            children: h.name,
                                          }),
                                          s.jsxs("p", {
                                            className: "small text-muted",
                                            children: [
                                              h.reigion,
                                              ", ",
                                              h.state,
                                            ],
                                          }),
                                          s.jsx("div", {
                                            className:
                                              "d-flex justify-content-between align-items-center",
                                            children: s.jsxs("div", {
                                              className: "fw-bold",
                                              children: [
                                                "NGN ",
                                                h.price.toLocaleString(),
                                              ],
                                            }),
                                          }),
                                          s.jsxs("div", {
                                            className: "d-flex",
                                            children: [
                                              h.verified &&
                                                s.jsxs("div", {
                                                  className:
                                                    "rounded small me-1 px-2 my-auto",
                                                  style: {
                                                    backgroundColor: "#D4AF37",
                                                    maxWidth: "fit-content",
                                                  },
                                                  children: [
                                                    s.jsx(be, {
                                                      className: "icon",
                                                      style: {
                                                        color: "#ffe479ff",
                                                      },
                                                    }),
                                                    " ",
                                                    "Verified",
                                                  ],
                                                }),
                                              s.jsx("div", {
                                                className:
                                                  "rounded text-light small px-2 my-auto",
                                                style: {
                                                  backgroundColor:
                                                    h.type == "rental"
                                                      ? "#0056a7a4"
                                                      : "#3d8f1c",
                                                  maxWidth: "fit-content",
                                                },
                                                children: h.type,
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                },
                                h.id,
                              ),
                            ),
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
              }),
            ],
          }),
        ],
      })
    );
  },
  im = () => {
    const [t, e] = ec(),
      [i, r] = w.useState([]),
      [a, c] = w.useState(!0),
      [l, h] = w.useState(null),
      [p, y] = w.useState(0),
      [j, N] = w.useState(!1),
      _ = t.get("state") || "",
      D = t.get("verified") === "true",
      E = t.get("minPrice") || "",
      T = t.get("maxPrice") || "",
      S = t.get("q") || "",
      R = t.get("sort") || "relevance:desc",
      O = parseInt(t.get("page") || "1", 10),
      L = parseInt(t.get("limit") || "20", 10),
      A = w.useCallback(async () => {
        (c(!0), h(null));
        try {
          const g = await $.get("/listings/query", {
            params: {
              state: _,
              verified: D,
              minPrice: E,
              maxPrice: T,
              q: S,
              sort: R,
              page: O,
              limit: L,
            },
          });
          (r(g.data.results),
            y(g.data.total),
            (document.title = `${g.data.total} listings for "${S}" - Landhome`));
        } catch (g) {
          h(g.message || "An error occurred");
        } finally {
          c(!1);
        }
      }, [_, D, E, T, S, R, O, L]);
    w.useEffect(() => {
      (scroll({ top: 0, behavior: "smooth" }), A());
    }, [A]);
    const F = (g) => {
        const { name: v, value: C, type: x, checked: V } = g.target;
        e(
          (K) => (
            x === "checkbox" ? K.set(v, V) : K.set(v, C),
            K.set("page", "1"),
            K
          ),
        );
      },
      U = (g) => {
        e((v) => (v.set("page", g), v));
      },
      b = () => {
        A();
      },
      m = Math.ceil(p / L),
      f = [
        "Abia",
        "Adamawa",
        "Akwa Ibom",
        "Anambra",
        "Bauchi",
        "Bayelsa",
        "Benue",
        "Borno",
        "Cross River",
        "Delta",
        "Ebonyi",
        "Edo",
        "Ekiti",
        "Enugu",
        "Gombe",
        "Imo",
        "Jigawa",
        "Kaduna",
        "Kano",
        "Katsina",
        "Kebbi",
        "Kogi",
        "Kwara",
        "Lagos",
        "Nasarawa",
        "Niger",
        "Ogun",
        "Ondo",
        "Osun",
        "Oyo",
        "Plateau",
        "Rivers",
        "Sokoto",
        "Taraba",
        "Yobe",
        "Zamfara",
        "FCT",
      ];
    return s.jsx("div", {
      className: "bg-white text-dark",
      children: s.jsxs("div", {
        className: "container py-4",
        children: [
          s.jsxs("nav", {
            className:
              "navbar text-dark rounded px-2 shadow navbar-light bg-light mb-4",
            children: [
              s.jsxs("div", {
                className: "d-flex w-100",
                children: [
                  s.jsx("div", {
                    className: "navbar-brand",
                    children: "Search Filters",
                  }),
                  s.jsx("button", {
                    className: "btn ms-auto themebg text-light",
                    onClick: () => N(!j),
                    "aria-label": "Toggle Filters",
                    children: "Filters",
                  }),
                  s.jsx("button", {
                    className:
                      "btn btn-outline-secondary themetxt border-success ms-2",
                    onClick: b,
                    "aria-label": "Refresh",
                    children: s.jsx(Wd, {}),
                  }),
                ],
              }),
              s.jsx("input", {
                type: "text",
                className: "form-control mt-2",
                placeholder: "Search",
                name: "q",
                value: S,
                onChange: F,
              }),
            ],
          }),
          j &&
            s.jsx("div", {
              className: "bg-light p-3 rounded shadow-lg mb-4 slideIn",
              children: s.jsxs("div", {
                className: "row",
                children: [
                  s.jsx("div", {
                    className: "col-md-4 mb-2",
                    children: s.jsxs("select", {
                      className: "form-select",
                      name: "state",
                      value: _,
                      onChange: F,
                      children: [
                        s.jsx("option", { value: "", children: "All States" }),
                        f.map((g) =>
                          s.jsx("option", { value: g, children: g }, g),
                        ),
                      ],
                    }),
                  }),
                  s.jsx("div", {
                    className: "col-md-4 mb-2",
                    children: s.jsxs("div", {
                      className: "form-check",
                      children: [
                        s.jsx("input", {
                          className: "form-check-input",
                          type: "checkbox",
                          name: "verified",
                          checked: D,
                          onChange: F,
                          id: "verifiedCheck",
                        }),
                        s.jsx("label", {
                          className: "form-check-label",
                          htmlFor: "verifiedCheck",
                          children: "Verified",
                        }),
                      ],
                    }),
                  }),
                  s.jsx("div", {
                    className: "col-md-4 mb-2",
                    children: s.jsx("input", {
                      type: "number",
                      className: "form-control",
                      placeholder: "Min Price",
                      name: "minPrice",
                      value: E,
                      onChange: F,
                    }),
                  }),
                  s.jsx("div", {
                    className: "col-md-4 mb-2",
                    children: s.jsx("input", {
                      type: "number",
                      className: "form-control",
                      placeholder: "Max Price",
                      name: "maxPrice",
                      value: T,
                      onChange: F,
                    }),
                  }),
                  s.jsx("div", {
                    className: "col-md-4 mb-2",
                    children: s.jsxs("select", {
                      className: "form-select",
                      name: "sort",
                      value: R,
                      onChange: F,
                      children: [
                        s.jsx("option", {
                          value: "relevance:desc",
                          children: "Relevance",
                        }),
                        s.jsx("option", {
                          value: "price:asc",
                          children: "Price: Low to High",
                        }),
                        s.jsx("option", {
                          value: "price:desc",
                          children: "Price: High to Low",
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          a
            ? s.jsx("div", {
                className: "text-center text-dark py-5",
                children: s.jsx(Qa, { className: "spinner fs-2" }),
              })
            : l
              ? s.jsx("div", { className: "alert alert-danger", children: l })
              : s.jsxs(s.Fragment, {
                  children: [
                    s.jsx("div", {
                      className: "row",
                      children: i.map((g) =>
                        s.jsx(
                          "div",
                          {
                            className: "col-12 col-sm-6 col-md-4 mb-4",
                            children: s.jsxs(q, {
                              to: `/listed/${g.id}`,
                              className:
                                "card no-dec hovShade shadow rounded d-flex flex-column",
                              children: [
                                g.heldUp &&
                                  !g.sold &&
                                  s.jsxs("button", {
                                    className:
                                      "mb-1 btn text-light small themebg",
                                    style: {
                                      fontSize: ".7em",
                                      position: "absolute",
                                    },
                                    onClick: (v) => {
                                      (v.stopPropagation(),
                                        toast.info(
                                          `This is probably because ${theUser.name} has been contacted over the listing, you can still contact ${(theUser == null ? void 0 : theUser.gender) == "male" ? "him" : "her"} as the listing has not been sold out`,
                                        ));
                                    },
                                    children: [
                                      s.jsx(Re, { className: "icon" }),
                                      " This Listing has been held up by the owner",
                                    ],
                                  }),
                                s.jsx("div", {
                                  className: "w-100 row px-0 g-0 mx-auto",
                                  children: (() => {
                                    var C, x, V;
                                    return (
                                      ((C = g.images[0]) == null
                                        ? void 0
                                        : C.type) || ""
                                    ).startsWith("image")
                                      ? s.jsx(ae.LazyLoadImage, {
                                          effect: "opacity",
                                          className:
                                            "img-fluid  w-100  rounded col-12",
                                          placeholderSrc: "/images/default.png",
                                          src:
                                            ((x = g.images[0]) == null
                                              ? void 0
                                              : x.url) || "/images/default.png",
                                          style: {
                                            height: "200px",
                                            minHeight: "200px",
                                            maxHeight: "200px",
                                            objectFit: "cover",
                                            minWidth: "100%",
                                          },
                                          alt: g.name,
                                        })
                                      : s.jsx(s.Fragment, {
                                          children: s.jsx("video", {
                                            effect: "opacity",
                                            className:
                                              "img-fluid  w-100  rounded col-12",
                                            placeholderSrc:
                                              "/images/default.png",
                                            src:
                                              ((V = g.images[0]) == null
                                                ? void 0
                                                : V.url) ||
                                              "/images/default.png",
                                            style: {
                                              height: "200px",
                                              minHeight: "200px",
                                              maxHeight: "200px",
                                              objectFit: "cover",
                                              minWidth: "100%",
                                            },
                                            alt: g.name,
                                          }),
                                        });
                                  })(),
                                }),
                                s.jsxs("div", {
                                  className: "card-body",
                                  children: [
                                    s.jsx("h5", {
                                      className: "card-title",
                                      children: g.name,
                                    }),
                                    s.jsxs("p", {
                                      className: "card-text",
                                      children: [g.reigion, ", ", g.state],
                                    }),
                                    s.jsxs("p", {
                                      className:
                                        "card-text mb-0 themetxt fw-bold",
                                      children: [
                                        "NGN ",
                                        g.price.toLocaleString(),
                                      ],
                                    }),
                                    s.jsxs("div", {
                                      className: "d-flex",
                                      children: [
                                        g.verified &&
                                          s.jsxs("div", {
                                            className:
                                              "rounded small me-1 px-2 my-auto",
                                            style: {
                                              backgroundColor: "#D4AF37",
                                              maxWidth: "fit-content",
                                            },
                                            children: [
                                              s.jsx(be, {
                                                className: "icon",
                                                style: { color: "#ffe479ff" },
                                              }),
                                              " ",
                                              "Verified",
                                            ],
                                          }),
                                        s.jsx("div", {
                                          className:
                                            "rounded text-light small px-2 my-auto",
                                          style: {
                                            backgroundColor:
                                              g.type == "rental"
                                                ? "#0056a7a4"
                                                : "#3d8f1c",
                                            maxWidth: "fit-content",
                                          },
                                          children: g.type,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          },
                          g.id,
                        ),
                      ),
                    }),
                    s.jsx("nav", {
                      "aria-label": "Page navigation",
                      children: s.jsxs("ul", {
                        className: "pagination justify-content-center",
                        children: [
                          s.jsx("li", {
                            className: `page-item ${O === 1 ? "disabled" : ""}`,
                            children: s.jsx("button", {
                              className: "page-link",
                              onClick: () => U(O - 1),
                              children: "Previous",
                            }),
                          }),
                          Array.from({ length: Math.min(5, m) }, (g, v) => {
                            const C = Math.max(1, Math.min(O - 2 + v, m));
                            return s.jsx(
                              "li",
                              {
                                className: `page-item ${O === C ? "active" : ""}`,
                                children: s.jsx("button", {
                                  className: "page-link",
                                  onClick: () => U(C),
                                  children: C,
                                }),
                              },
                              C,
                            );
                          }),
                          s.jsx("li", {
                            className: `page-item ${O === m ? "disabled" : ""}`,
                            children: s.jsx("button", {
                              className: "page-link",
                              onClick: () => U(O + 1),
                              children: "Next",
                            }),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
        ],
      }),
    });
  },
  rm = () => {
    const t = ["Personal", "Contact", "Security"],
      { user: e } = Pe(),
      [i, r] = w.useState({}),
      [a, c] = w.useState(null),
      l = w.useRef(),
      [h, p] = w.useState("Personal"),
      [y, j] = w.useState(!1),
      [N, _] = w.useState(!1),
      D = ({ target: L }) => {
        r((A) => ({ ...A, [L.name]: L.value }));
      },
      E = (L) => {
        c(L.target.files[0]);
      };
    function T() {
      (p((L) => t[t.indexOf(L) + 1] || t[t.length - 1]),
        setTimeout(() => {
          document.action = "";
        }, 400));
    }
    function S() {
      (p((L) => t[t.indexOf(L) - 1] || t[0]),
        setTimeout(() => {
          document.action = "";
        }, 400));
    }
    const R = async (L) => {
      var F, U, b;
      if ((L.preventDefault(), document.action == "next")) return T();
      if (document.action == "prev") return S();
      document.action = "";
      const A = B.loading("Updating profile", { autoClose: !1 });
      try {
        let m = i.profileicon,
          f = {};
        if (a) {
          const x = new FormData();
          x.append("media", a);
          const V = await $.post("/files/single", x, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          ((f = V.data), (m = V.data.url));
        }
        const g = {
            ...i,
            profileicon: m || e.profileicon,
            iconData: f.url ? f : e.iconData,
          },
          v = {},
          C = Object.keys(g);
        for (const x of C) g[x] && (v[x] = g[x]);
        (await $.put("/auth/profile", v), (location.pathname = "/"));
      } catch (m) {
        B.error(
          `${((U = (F = m == null ? void 0 : m.response) == null ? void 0 : F.data) == null ? void 0 : U.message) || ((b = m == null ? void 0 : m.response) == null ? void 0 : b.data) || (m == null ? void 0 : m.message)}`,
        );
      } finally {
        B.dismiss(A);
      }
    };
    w.useEffect(() => {
      (setTimeout(() => {
        r((L) => ({ ...L, password: "" }));
      }, 2e3),
        document.getElementById("pass") &&
          (document.getElementById("pass").value = ""));
    }, [h]);
    const O = {
      Personal: s.jsxs("div", {
        className: `${document.action == "prev" && "slideRight"}`,
        children: [
          s.jsxs("div", {
            className: "form-group row mb-3",
            children: [
              s.jsx("div", {
                className: "form-group col-6",
                children: s.jsx("input", {
                  type: "text",
                  name: "firstname",
                  className: "form-control border",
                  onChange: D,
                  value: i.firstname || e.firstname,
                  placeholder: "Firstname",
                }),
              }),
              s.jsx("div", {
                className: "form-group col-6",
                children: s.jsx("input", {
                  type: "text",
                  name: "lastname",
                  className: "form-control border",
                  onChange: D,
                  value: i.lastname || e.lastname,
                  placeholder: "Lastname",
                }),
              }),
            ],
          }),
          s.jsx("div", {
            className: "form-group mb-3",
            children: s.jsxs("select", {
              name: "gender",
              className: "form-control border",
              onChange: D,
              value: i.gender || e.gender,
              placeholder: "Gender",
              children: [
                s.jsx("option", {
                  value: "",
                  className: "d-none",
                  children: "Gender",
                }),
                s.jsx("option", { value: "male", children: "Male" }),
                s.jsx("option", { value: "female", children: "Female" }),
              ],
            }),
          }),
          s.jsxs("div", {
            className: "form-group mb-3",
            children: [
              s.jsx("label", {
                className: "form-label text-dark",
                children: "Profile Icon",
              }),
              s.jsx("input", {
                type: "file",
                accept: "image/*",
                className: "form-control",
                ref: l,
                onChange: E,
              }),
            ],
          }),
          a &&
            s.jsx("div", {
              className: "mb-2",
              children: s.jsx("img", {
                src: URL.createObjectURL(a),
                alt: "Profile Preview",
                style: { maxWidth: 80, maxHeight: 80, borderRadius: 8 },
              }),
            }),
        ],
      }),
      Contact: s.jsxs("div", {
        className: document.action == "prev" ? "slideRight" : "slideLeft",
        children: [
          s.jsx("div", {
            className: "form-group mb-3",
            children: s.jsx("input", {
              type: "email",
              name: "email",
              className: "form-control border",
              onChange: D,
              value: i.email || e.email,
              placeholder: "Email",
            }),
          }),
          s.jsx("div", {
            className: "form-group mb-3",
            children: s.jsx("input", {
              type: "number",
              name: "phone",
              className: "form-control border",
              onChange: D,
              value: i.phone || e.phone,
              placeholder: "Phone",
            }),
          }),
          s.jsx("div", {
            className: "form-group mb-3",
            children: s.jsx("textarea", {
              name: "bio",
              className: "form-control border",
              onChange: D,
              value: i.bio || e.bio,
              placeholder: "Short Bio (optional)",
              rows: 2,
            }),
          }),
        ],
      }),
      Security: s.jsxs("div", {
        className: document.action == "prev" ? "slideRight" : "slideLeft",
        children: [
          s.jsx("input", {
            type: "email",
            name: "email",
            className: "form-control border",
            style: {
              maxWidth: "0px",
              maxHeight: "0px",
              position: "fixed",
              width: "0px",
              height: "0px",
              opacity: "0",
            },
            onChange: D,
            value: i.email || e.email,
            placeholder: "Email",
          }),
          s.jsxs("div", {
            className: "form-group mb-3 d-flex",
            children: [
              s.jsx("input", {
                type: "password",
                name: "password",
                title: "Enter your desired new password (optional)",
                id: "pass",
                minLength: 6,
                autoComplete: "off",
                className: "form-control border",
                onChange: D,
                value: i.password || e.password,
                placeholder: "New Password (optional)",
              }),
              s.jsx("div", {
                className:
                  "border bg-none border-start-0 text-dark d-flex px-2",
                onClick: (L) => {
                  (L.preventDefault(), j((F) => !F));
                  const A = document.getElementById("pass");
                  (A.type == "password"
                    ? (A.type = "text")
                    : (A.type = "password"),
                    A.focus());
                },
                children: y
                  ? s.jsx(ds, { className: "m-auto" })
                  : s.jsx(cs, { className: "m-auto" }),
              }),
            ],
          }),
          s.jsxs("div", {
            className: "form-group d-flex",
            children: [
              s.jsx("input", {
                type: "password",
                name: "prevPass",
                id: "confpass",
                autoComplete: "off",
                className: "form-control border",
                onChange: D,
                value: i.prevPass || e.prevPass,
                title: "This must be same as the password as the old password",
                placeholder: "Old password (optional)",
              }),
              s.jsx("div", {
                type: "button",
                className:
                  "border bg-none border-start-0 text-dark  d-flex px-2",
                onClick: (L) => {
                  (L.preventDefault(), _((F) => !F));
                  const A = document.getElementById("confpass");
                  (A.type == "password"
                    ? (A.type = "text")
                    : (A.type = "password"),
                    A.focus());
                },
                children: N
                  ? s.jsx(ds, { className: "m-auto" })
                  : s.jsx(cs, { className: "m-auto" }),
              }),
            ],
          }),
        ],
      }),
    };
    return s.jsx("div", {
      className: "bg-light pb-5",
      children: s.jsx("div", {
        className: "container pt-5 darkTheme",
        children: s.jsx("div", {
          className: "row",
          children: s.jsxs("form", {
            onSubmit: R,
            className:
              "col-10 col-sm-9 col-md-7 col-lg-5 px-3 col-xl-4 shadow-lg panel rounded mx-auto slideUp",
            children: [
              s.jsx("div", {
                className: "d-flex",
                children: s.jsxs("h3", {
                  className: "m-auto mt-3 d-flex",
                  children: [
                    s.jsx(q, {
                      to: "/",
                      children: s.jsx(ae.LazyLoadImage, {
                        effect: "opacity",
                        className: "me-2 h-[60px] my-auto",
                        src: "/sprintetName.png",
                        alt: "",
                      }),
                    }),
                    s.jsx("span", {
                      className: "my-auto pb-3 themetxt",
                      children: " Edit Profile",
                    }),
                  ],
                }),
              }),
              s.jsx(
                "div",
                {
                  className: `mb-2 text-dark ${document.action == "prev" ? "slideRight" : document.action == "next" ? "slideLeft" : ""}`,
                  children: h,
                },
                h,
              ),
              O[h],
              s.jsxs("div", {
                className: "py-2 d-flex",
                children: [
                  s.jsx("div", {
                    className: "",
                    children: s.jsx(q, {
                      to: "/auth/login",
                      className: "small py-3 p-0",
                      style: { fontSize: ".8em" },
                      children: "Sign in instead!",
                    }),
                  }),
                  s.jsx("div", {
                    className: "ms-auto d-flex",
                    style: { maxWidth: "50px" },
                    children: t.map((L) =>
                      s.jsx(
                        "div",
                        {
                          className: "themebg ani",
                          style: {
                            minWidth: "6px",
                            width: h == L ? "16px" : "6px",
                            height: "6px",
                            margin: "auto 2px",
                            borderRadius: "10px",
                          },
                        },
                        L,
                      ),
                    ),
                  }),
                ],
              }),
              s.jsxs("div", {
                className: "d-flex",
                children: [
                  h !== t[0] &&
                    s.jsx("div", {
                      type: "button",
                      "aria-live": "polite",
                      className: "btn mb-4 themebg text-light",
                      onClick: () => {
                        (S(), (document.action = "prev"));
                      },
                      children: "Back",
                    }),
                  h == t[t.length - 1]
                    ? s.jsx("button", {
                        className: "btn mb-4 ms-auto themebg text-light",
                        children: "Save Changes",
                      })
                    : s.jsx("div", {
                        className: "btn mb-4 ms-auto themebg text-light ",
                        onClick: () => {
                          ((document.action = "next"), T());
                        },
                        children: "Next",
                      }),
                ],
              }),
            ],
          }),
        }),
      }),
    });
  },
  He = ["Basic", "Location", "Meta", "Media"],
  am = () => {
    var b, m;
    const { listingId: t } = It(),
      e = Le(),
      [i, r] = w.useState(null),
      [a, c] = w.useState(!1),
      [l, h] = w.useState([]),
      [p, y] = w.useState([]),
      [j, N] = w.useState([]),
      [_, D] = w.useState(He[0]),
      [E, T] = w.useState("");
    w.useEffect(() => {
      (async () => {
        var g;
        try {
          c(!0);
          const v = await $.get(`/listings/${t}`);
          (r(v.data),
            y(
              ((g = v.data.images) == null ? void 0 : g.map((C) => C.id)) || [],
            ));
        } catch (v) {
          (console.error(v), B.error("Failed to load listing"));
        } finally {
          c(!1);
        }
      })();
    }, [t]);
    const S = (f) => {
        const { name: g, value: v, type: C, checked: x } = f.target;
        g === "verified"
          ? r((V) => ({ ...V, [g]: x }))
          : g.startsWith("meta.")
            ? r((V) => ({ ...V, meta: { ...V.meta, [g.split(".")[1]]: v } }))
            : r((V) => ({ ...V, [g]: v }));
      },
      R = (f) => {
        h([...f.target.files]);
      },
      O = (f) => {
        p.includes(f)
          ? (y((g) => g.filter((v) => v !== f)), N((g) => [...g, f]))
          : (y((g) => [...g, f]), N((g) => g.filter((v) => v !== f)));
      };
    function L() {
      (T("next"),
        D((f) => He[Math.min(He.indexOf(f) + 1, He.length - 1)]),
        setTimeout(() => T(""), 400));
    }
    function A() {
      (T("prev"),
        D((f) => He[Math.max(He.indexOf(f) - 1, 0)]),
        setTimeout(() => T(""), 400));
    }
    const F = async (f) => {
      var g;
      f.preventDefault();
      try {
        c(!0);
        const v = B.loading("Updating listing...");
        let C = [];
        if (l.length > 0) {
          const V = new FormData();
          (l.forEach((ee) => V.append("media", ee)),
            (C = (
              await $.post("/files/many", V, {
                headers: { "Content-Type": "multipart/form-data" },
              })
            ).data.map((ee) => ({ url: ee.url, id: ee.id, type: ee.type }))));
        }
        const x = [
          ...(((g = i.images) == null
            ? void 0
            : g.filter((V) => p.includes(V.id))) || []),
          ...C,
        ];
        (await $.put(`/listings/${t}`, {
          ...i,
          price: Number(i.price) || 0,
          reach: Number(i.reach) || 0,
          images: x,
        }),
          B.dismiss(v),
          B.success("Listing updated successfully!"),
          e("/auth/user-profile/listed/" + t));
      } catch (v) {
        (console.error(v), B.error("Failed to update listing"));
      } finally {
        (c(!1), B.dismiss(tst));
      }
    };
    if (a && !i)
      return s.jsx("div", {
        className: "text-center bg-white text-dark p-3",
        children: "Loading...",
      });
    if (!i) return null;
    const U = {
      Basic: s.jsxs("div", {
        className: E === "prev" ? "slideRight" : "",
        children: [
          s.jsxs("div", {
            className: "mb-3",
            children: [
              s.jsx("label", { className: "form-label", children: "Name" }),
              s.jsx("input", {
                name: "name",
                value: i.name || "",
                onChange: S,
                className: "form-control",
                required: !0,
              }),
            ],
          }),
          s.jsxs("div", {
            className: "mb-3",
            children: [
              s.jsx("label", {
                className: "form-label",
                children: "Description",
              }),
              s.jsx("textarea", {
                name: "description",
                value: i.description || "",
                onChange: S,
                className: "form-control",
                rows: 3,
              }),
            ],
          }),
          s.jsxs("div", {
            className: "mb-3",
            children: [
              s.jsx("label", { className: "form-label", children: "Tags" }),
              s.jsx("input", {
                name: "tags",
                value: i.tags || "",
                onChange: S,
                className: "form-control",
              }),
            ],
          }),
        ],
      }),
      Location: s.jsxs("div", {
        className: E === "prev" ? "slideRight" : "slideLeft",
        children: [
          s.jsxs("div", {
            className: "mb-3",
            children: [
              s.jsx("label", { className: "form-label", children: "Region" }),
              s.jsx("input", {
                name: "reigion",
                value: i.reigion || "",
                onChange: S,
                className: "form-control",
              }),
            ],
          }),
          s.jsxs("div", {
            className: "mb-3",
            children: [
              s.jsx("label", { className: "form-label", children: "State" }),
              s.jsxs("select", {
                className: "form-select",
                name: "state",
                value: i.state || "",
                onChange: S,
                children: [
                  s.jsx("option", { value: "", children: "All States" }),
                  om().map((f) =>
                    s.jsx("option", { value: f, children: f }, f),
                  ),
                ],
              }),
            ],
          }),
          s.jsxs("div", {
            className: "mb-3",
            children: [
              s.jsx("label", { className: "form-label", children: "Country" }),
              s.jsx("input", {
                name: "country",
                value: i.country || "",
                onChange: S,
                className: "form-control",
              }),
            ],
          }),
          s.jsxs("div", {
            className: "mb-3",
            children: [
              s.jsx("label", { className: "form-label", children: "Address" }),
              s.jsx("input", {
                name: "address",
                value: i.address || "",
                onChange: S,
                className: "form-control",
              }),
            ],
          }),
        ],
      }),
      Meta: s.jsxs("div", {
        className: E === "prev" ? "slideRight" : "slideLeft",
        children: [
          s.jsxs("div", {
            className: "mb-3",
            children: [
              s.jsx("label", { className: "form-label", children: "Type" }),
              s.jsxs("select", {
                className: "form-select",
                name: "type",
                value: i.type,
                onChange: S,
                children: [
                  s.jsx("option", { value: "", children: "Select Type" }),
                  s.jsx("option", { value: "sale", children: "Sale" }),
                  s.jsx("option", { value: "rental", children: "Rental" }),
                ],
              }),
            ],
          }),
          s.jsxs("div", {
            className: "mb-3",
            children: [
              s.jsx("label", { className: "form-label", children: "Price" }),
              s.jsx("input", {
                name: "price",
                type: "number",
                value: i.price || "",
                onChange: S,
                className: "form-control",
              }),
            ],
          }),
          s.jsxs("div", {
            className: "mb-3",
            children: [
              s.jsx("label", {
                className: "form-label",
                children: "External URL",
              }),
              s.jsx("input", {
                name: "externalUrl",
                value: i.externalUrl || "",
                onChange: S,
                className: "form-control",
              }),
            ],
          }),
          s.jsxs("div", {
            className: "mb-3",
            children: [
              s.jsx("label", {
                className: "form-label",
                children: "Meta Size",
              }),
              s.jsx("input", {
                name: "meta.size",
                value: ((b = i.meta) == null ? void 0 : b.size) || "",
                onChange: S,
                className: "form-control",
              }),
            ],
          }),
        ],
      }),
      Media: s.jsxs("div", {
        className: E === "prev" ? "slideRight" : "slideLeft",
        children: [
          ((m = i.images) == null ? void 0 : m.length) > 0 &&
            s.jsx("div", {
              className: "mb-2 d-flex flex-wrap gap-2",
              children: i.images.map((f) => {
                const g = f.type.startsWith("image/") ? "image" : "video",
                  v = p.includes(f.id);
                return s.jsx(
                  "div",
                  {
                    onClick: () => O(f.id),
                    style: {
                      border: v ? "2px solid green" : "2px solid transparent",
                      opacity: j.includes(f.id) ? 0.4 : 1,
                      borderRadius: 8,
                      cursor: "pointer",
                    },
                    children:
                      g === "image"
                        ? s.jsx("img", {
                            src: f.url,
                            alt: "Preview",
                            style: {
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                              borderRadius: 8,
                            },
                          })
                        : s.jsx("video", {
                            src: f.url,
                            style: {
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                              borderRadius: 8,
                            },
                            controls: !0,
                          }),
                  },
                  f.id,
                );
              }),
            }),
          s.jsxs("div", {
            className: "mb-3",
            children: [
              s.jsx("label", {
                className: "form-label",
                children: "Add Media",
              }),
              s.jsx("input", {
                type: "file",
                className: "form-control",
                multiple: !0,
                accept: "image/*,video/*",
                onChange: R,
              }),
              l.length > 0 &&
                s.jsx("div", {
                  className: "mt-2 d-flex flex-wrap gap-2",
                  children: Array.from(l).map((f, g) => {
                    const v = f.type.startsWith("image/") ? "image" : "video";
                    return s.jsx(
                      "div",
                      {
                        children:
                          v === "image"
                            ? s.jsx("img", {
                                src: URL.createObjectURL(f),
                                alt: "New Preview",
                                style: {
                                  width: 80,
                                  height: 80,
                                  objectFit: "cover",
                                  borderRadius: 8,
                                },
                              })
                            : s.jsx("video", {
                                src: URL.createObjectURL(f),
                                style: {
                                  width: 80,
                                  height: 80,
                                  objectFit: "cover",
                                  borderRadius: 8,
                                },
                                controls: !0,
                              }),
                      },
                      g,
                    );
                  }),
                }),
            ],
          }),
        ],
      }),
    };
    return s.jsx("div", {
      className: "bg-light text-dark pb-5",
      children: s.jsx("div", {
        className: "container pt-5 darkTheme",
        children: s.jsx("div", {
          className: "row",
          children: s.jsxs("form", {
            onSubmit: F,
            className:
              "col-11 col-sm-9 ani col-md-7 col-lg-6 px-3 shadow-lg panel rounded mx-auto slideUp",
            style: { height: "fit-content", transition: "all 0.3s" },
            children: [
              s.jsxs("div", {
                className: "d-flex flex-column",
                children: [
                  s.jsx("h3", {
                    className: "m-auto fs-4 mt-3 d-flex mb-2",
                    children: "Edit listing",
                  }),
                  s.jsx("div", {
                    className: "small text-center mb-3",
                    children: "Update your property listing information",
                  }),
                ],
              }),
              s.jsxs(
                "div",
                {
                  className: `mb-2 rounded border-success text-dark border px-2 me-auto ${E === "prev" ? "slideRight" : E === "next" ? "slideLeft" : ""}`,
                  children: [_, " Information"],
                },
                _,
              ),
              U[_],
              s.jsx("div", {
                className: "py-2 d-flex",
                children: s.jsx("div", {
                  className: "ms-auto d-flex",
                  style: { maxWidth: "50px" },
                  children: He.map((f) =>
                    s.jsx(
                      "div",
                      {
                        className: "themebg ani",
                        style: {
                          minWidth: "6px",
                          width: _ === f ? "16px" : "6px",
                          height: "6px",
                          margin: "auto 2px",
                          borderRadius: "10px",
                        },
                      },
                      f,
                    ),
                  ),
                }),
              }),
              s.jsxs("div", {
                className: "d-flex",
                children: [
                  _ !== He[0] &&
                    s.jsx("div", {
                      type: "button",
                      "aria-live": "polite",
                      className: "btn mb-4 themebg text-light",
                      onClick: A,
                      children: "Back",
                    }),
                  _ === He[He.length - 1]
                    ? s.jsx("button", {
                        className: "btn mb-4 ms-auto themebg text-light",
                        children: "Update Listing",
                      })
                    : s.jsx("div", {
                        className: "btn mb-4 ms-auto themebg text-light",
                        onClick: L,
                        children: "Next",
                      }),
                ],
              }),
            ],
          }),
        }),
      }),
    });
  };
function om() {
  return [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT",
  ];
}
const oa = { nin: "", address: "", images: [] },
  Te = ["Get Verified", "Identification", "Documents"],
  lm = {
    "Get Verified": [],
    Identification: ["nin", "address"],
    Documents: ["idCard"],
  },
  po = () => {
    const [t, e] = w.useState(oa),
      [i, r] = w.useState(Te[0]),
      [a, c] = w.useState(null),
      [l, h] = w.useState(null),
      [p, y] = w.useState(null),
      [j, N] = w.useState(!1),
      [_, D] = w.useState(""),
      E = Le(),
      T = (F) => {
        const { name: U, value: b } = F.target;
        e((m) => ({ ...m, [U]: b }));
      },
      S = () => {
        const F = lm[i];
        for (const b of F) {
          if (b === "idCard" && !a)
            return B.warning("Please upload your ID Card to proceed.");
          if (t[b] === "" || t[b] === null)
            return B.warning(`Please fill in your ${b} to proceed.`);
        }
        document.action = "next";
        const U = Te.indexOf(i) + 1;
        r(Te[U]);
      },
      R = () => {
        document.action = "prev";
        const F = Te.indexOf(i) - 1;
        r(Te[F]);
      },
      O = async (F) => {
        if ((F.preventDefault(), i !== Te[Te.length - 1])) return S();
        const U = B.loading("Submitting verification request...");
        (D(""), N(!0));
        try {
          let b = [];
          const m = [a, l, p].filter(Boolean);
          if (m.length > 0) {
            const f = new FormData();
            (m.forEach((v) => f.append("media", v)),
              (b = (
                await $.post("/files/many", f, {
                  headers: { "Content-Type": "multipart/form-data" },
                })
              ).data.map((v) => ({ url: v.url, id: v.id, type: v.type }))));
          }
          (await $.post("/auth/profile/verification", { ...t, images: b }),
            D("Verification submitted successfully!"),
            e(oa),
            c(null),
            h(null),
            y(null),
            E("/auth/user-profile"));
        } catch (b) {
          (console.error(b),
            B.error("Failed to submit verification. Please try again."));
        } finally {
          (B.dismiss(U), N(!1));
        }
      };
    w.useEffect(() => {
      document.title = "Get Verified, build customer trust - Landhome";
    }, []);
    const L = ({ label: F, file: U, setFile: b, required: m }) =>
        s.jsxs("div", {
          className: "position-relative",
          children: [
            s.jsxs("label", {
              className: "form-label text-start d-block mb-2 text-dark",
              children: [
                F,
                " ",
                m && s.jsx("span", { className: "text-danger", children: "*" }),
              ],
            }),
            s.jsxs("div", {
              className:
                "file-drop-zone border border-2 border-dashed rounded-3 p-4 text-center d-flex flex-column align-items-center justify-content-center",
              children: [
                U
                  ? s.jsxs("div", {
                      className: "d-flex flex-column align-items-center gap-2",
                      children: [
                        s.jsx(Ya, { className: "text-success", size: 20 }),
                        s.jsx("span", {
                          className:
                            "badge rounded-pill bg-success fw-normal py-2 px-3",
                          children: U.name,
                        }),
                      ],
                    })
                  : s.jsxs(s.Fragment, {
                      children: [
                        s.jsx(Hd, {
                          className: "text-secondary mb-2",
                          size: 32,
                        }),
                        s.jsxs("p", {
                          className: "m-0 text-secondary",
                          children: [
                            "Drag and drop or",
                            " ",
                            s.jsx("span", {
                              className: "text-primary fw-bold",
                              children: "click to upload",
                            }),
                          ],
                        }),
                      ],
                    }),
                s.jsx("input", {
                  type: "file",
                  className:
                    "file-input position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer",
                  accept: "image/*",
                  onChange: (f) => b(f.target.files[0]),
                }),
              ],
            }),
          ],
        }),
      A = {
        "Get Verified": s.jsxs("div", {
          className: `ani ${document.action === "prev" ? "slideRight" : "slideLeft"}`,
          children: [
            s.jsx("div", {
              className: "d-flex justify-content-center mb-4",
              children: s.jsx("div", {
                className: "bg-warning-subtle rounded-circle p-3",
                children: s.jsx(Vs, { size: 50, className: "text-warning" }),
              }),
            }),
            s.jsx("h4", {
              className: "fw-bold mb-3 text-dark",
              children: "Why get verified?",
            }),
            s.jsxs("p", {
              className: "text-secondary small",
              children: [
                "Verified users are ",
                s.jsx("strong", { children: "more likely to close deals" }),
                " because people trust verified profiles. Stand out and boost your credibility instantly.",
              ],
            }),
            s.jsxs("div", {
              className:
                "alert alert-warning d-flex flex-column align-items-center text-center  fw-semibold my-3 p-3 rounded-3",
              children: [
                s.jsx(be, { className: "text-warning mb-2", size: 20 }),
                s.jsxs("div", {
                  children: [
                    "Verification costs just ",
                    s.jsx("span", {
                      className: "text-dark",
                      children: "₦5,000",
                    }),
                    " — a small step for a big boost in trust.",
                  ],
                }),
              ],
            }),
            s.jsxs("ul", {
              className: "list-unstyled text-start mb-4",
              children: [
                s.jsxs("li", {
                  className: "d-flex align-items-center mb-2",
                  children: [
                    s.jsx(es, { className: "text-success me-2" }),
                    s.jsx("span", {
                      className: "text-dark",
                      children: "List and rent properties with confidence.",
                    }),
                  ],
                }),
                s.jsxs("li", {
                  className: "d-flex align-items-center mb-2",
                  children: [
                    s.jsx(es, { className: "text-success me-2" }),
                    s.jsx("span", {
                      className: "text-dark",
                      children:
                        "Gain the trust of potential partners and users.",
                    }),
                  ],
                }),
                s.jsxs("li", {
                  className: "d-flex align-items-center mb-2",
                  children: [
                    s.jsx(es, { className: "text-success me-2" }),
                    s.jsx("span", {
                      className: "text-dark",
                      children: "Unlock premium account features.",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        Identification: s.jsxs("div", {
          className: `ani ${document.action === "prev" ? "slideRight" : "slideLeft"}`,
          children: [
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", {
                  htmlFor: "nin",
                  className: "form-label",
                  children: "National ID Number (NIN)",
                }),
                s.jsx("input", {
                  type: "text",
                  name: "nin",
                  value: t.nin,
                  onChange: T,
                  className: "form-control",
                  id: "nin",
                  required: !0,
                }),
              ],
            }),
            s.jsxs("div", {
              className: "mb-3",
              children: [
                s.jsx("label", {
                  htmlFor: "address",
                  className: "form-label",
                  children: "Residential Address",
                }),
                s.jsx("input", {
                  type: "text",
                  name: "address",
                  value: t.address,
                  onChange: T,
                  className: "form-control",
                  id: "address",
                  required: !0,
                }),
              ],
            }),
          ],
        }),
        Documents: s.jsx("div", {
          className: `ani ${document.action === "prev" ? "slideRight" : "slideLeft"}`,
          children: s.jsxs("div", {
            className: "row g-4",
            children: [
              s.jsx("div", {
                className: "col-12",
                children: s.jsx(L, {
                  label: "Upload ID Card",
                  file: a,
                  setFile: c,
                  required: !0,
                }),
              }),
              s.jsx("div", {
                className: "col-12",
                children: s.jsx(L, {
                  label: "Upload CAC Document",
                  file: l,
                  setFile: h,
                  required: !0,
                }),
              }),
              s.jsx("div", {
                className: "col-12",
                children: s.jsx(L, {
                  label: "Upload Utility Bill",
                  file: p,
                  setFile: y,
                  required: !0,
                }),
              }),
            ],
          }),
        }),
      };
    return s.jsx("div", {
      className:
        "bg-light min-vh-100 d-flex align-items-center justify-content-center py-5",
      children: s.jsx("div", {
        className: "container",
        children: s.jsx("div", {
          className: "row justify-content-center",
          children: s.jsx("div", {
            className: "col-12 col-md-9 col-lg-7 col-xl-6",
            children: s.jsx("div", {
              className: "card shadow-lg rounded-4 border-0 ani slideUp",
              children: s.jsxs("div", {
                className: "card-body p-4 p-md-5 text-center",
                children: [
                  s.jsxs("div", {
                    className: "d-flex flex-column align-items-center mb-4",
                    children: [
                      s.jsxs("div", {
                        className: "d-flex align-items-center gap-2 mb-2",
                        children: [
                          s.jsx(be, { className: "text-warning", size: 26 }),
                          s.jsx("h3", {
                            className: "fs-3 fw-bold m-0 text-dark",
                            children: "Get Verified",
                          }),
                        ],
                      }),
                      s.jsx("div", {
                        className: "text-secondary small",
                        children:
                          "Unlock premium trust & visibility. Verified users can list and rent properties with confidence.",
                      }),
                    ],
                  }),
                  s.jsxs("form", {
                    onSubmit: O,
                    children: [
                      s.jsx("div", { className: "mb-4", children: A[i] }, i),
                      s.jsxs("div", {
                        className:
                          "d-flex justify-content-between align-items-center mt-3",
                        children: [
                          s.jsx("div", {
                            className: "d-flex flex-grow-1 me-3",
                            children: Te.map((F, U) =>
                              s.jsx(
                                "div",
                                {
                                  className: `progress-pill rounded-pill mx-1 ${U <= Te.indexOf(i) ? "themebg" : "bg-secondary"} ani`,
                                  style: {
                                    height: "6px",
                                    width: i === F ? "13px" : "6px",
                                    transition: "width 0.3s ease-in-out",
                                  },
                                },
                                F,
                              ),
                            ),
                          }),
                          s.jsxs("div", {
                            className: "d-flex gap-2",
                            children: [
                              i !== Te[0] &&
                                s.jsx("div", {
                                  className:
                                    "btn btn-outline-success themetxt fw-bold cursor-pointer",
                                  onClick: R,
                                  children: "Back",
                                }),
                              i !== Te[Te.length - 1]
                                ? s.jsx("div", {
                                    className:
                                      "btn themebg text-light fw-bold cursor-pointer",
                                    onClick: S,
                                    children:
                                      i === Te[0] ? "Get Started" : "Next",
                                  })
                                : s.jsx("button", {
                                    type: "submit",
                                    className: "btn themebg text-light fw-bold",
                                    disabled: j,
                                    children: j
                                      ? s.jsxs(s.Fragment, {
                                          children: [
                                            s.jsx("span", {
                                              className:
                                                "spinner-border spinner-border-sm me-2",
                                              role: "status",
                                              "aria-hidden": "true",
                                            }),
                                            "Submitting...",
                                          ],
                                        })
                                      : "Submit Verification",
                                  }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  _ &&
                    s.jsx("div", {
                      className: "mt-3 alert alert-success text-center",
                      children: _,
                    }),
                ],
              }),
            }),
          }),
        }),
      }),
    });
  },
  cm = () => {
    var j;
    const {
        verification: t,
        setVerification: e,
        fetchSrc: i,
        setModal: r,
        user: a,
      } = Pe(),
      [c, l] = w.useState(!1),
      h = Le(),
      p = async () => {
        var N;
        if (
          t != null &&
          t.id &&
          window.confirm("Are you sure you want to delete this verification?")
        )
          try {
            (l(!0),
              await $.delete("/auth/profile/verification"),
              B.success("Verification deleted successfully"),
              e(null),
              i(),
              h("/auth/user-profile"));
          } catch (_) {
            (console.error(_),
              B.error(
                ((N = _ == null ? void 0 : _.response) == null
                  ? void 0
                  : N.data) ||
                  (_ == null ? void 0 : _.message) ||
                  "Failed to delete verification",
              ));
          } finally {
            l(!1);
          }
      },
      y = async () => {
        var N;
        if (
          t != null &&
          t.id &&
          window.confirm(
            "You will pay a verification fee of N5000 to complete verification",
          )
        )
          try {
            l(!0);
            const D = (await $.post("/auth/profile/verification/complete")).data
              .url;
            location.href = D;
          } catch (_) {
            (console.error(_),
              B.error(
                ((N = _ == null ? void 0 : _.response) == null
                  ? void 0
                  : N.data) ||
                  (_ == null ? void 0 : _.message) ||
                  "Failed to delete verification",
              ));
          } finally {
            l(!1);
          }
      };
    return (
      w.useEffect(() => {
        (i(), (document.title = "Manage your Verification - Landhome"));
      }, []),
      t != null && t.id
        ? s.jsx("div", {
            className:
              "bg-light min-vh-100 d-flex align-items-center justify-content-center py-5",
            children: s.jsx("div", {
              className: "container",
              children: s.jsx("div", {
                className: "row justify-content-center",
                children: s.jsx("div", {
                  className: "col-12 col-md-9 col-lg-7 col-xl-6",
                  children: s.jsx("div", {
                    className: "card shadow-lg rounded-4 border-0 ani slideUp",
                    children: s.jsxs("div", {
                      className: "card-body p-4 p-md-5 text-center",
                      children: [
                        s.jsxs("div", {
                          className:
                            "d-flex flex-column align-items-center mb-4",
                          children: [
                            s.jsxs("div", {
                              className: "d-flex align-items-center gap-2 mb-2",
                              children: [
                                s.jsx(be, {
                                  className: "text-warning",
                                  size: 26,
                                }),
                                s.jsx("h3", {
                                  className: "fs-3 fw-bold m-0 text-dark",
                                  children: "Your Verification",
                                }),
                              ],
                            }),
                            s.jsx("div", {
                              className: "text-secondary small",
                              children:
                                "Review your submitted verification request.",
                            }),
                          ],
                        }),
                        s.jsxs("div", {
                          className: "text-start",
                          children: [
                            s.jsxs("div", {
                              className: "mb-3",
                              children: [
                                s.jsx("strong", { children: "NIN:" }),
                                " ",
                                t.nin || "—",
                              ],
                            }),
                            s.jsxs("div", {
                              className: "mb-3",
                              children: [
                                s.jsx("strong", { children: "Address:" }),
                                " ",
                                t.address || "—",
                              ],
                            }),
                            s.jsxs("div", {
                              className: "mb-3",
                              children: [
                                s.jsx("strong", { children: "Status:" }),
                                " ",
                                s.jsx("span", {
                                  className: "badge bg-info text-dark",
                                  children: t.status || "pending",
                                }),
                              ],
                            }),
                            s.jsxs("div", {
                              className: "mb-3",
                              children: [
                                s.jsx("strong", { children: "Documents:" }),
                                s.jsxs("div", {
                                  className: "d-flex flex-wrap gap-2 mt-2",
                                  children: [
                                    (j = t.images) == null
                                      ? void 0
                                      : j.map((N) =>
                                          s.jsxs(
                                            "div",
                                            {
                                              className: "position-relative",
                                              children: [
                                                s.jsx("img", {
                                                  src: N.url,
                                                  alt: "doc",
                                                  className:
                                                    "rounded shadow-sm",
                                                  style: {
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                  },
                                                  onClick: () => {
                                                    r(
                                                      s.jsx("img", {
                                                        src: N.url,
                                                        alt: "doc",
                                                        className:
                                                          "rounded shadow-sm",
                                                        style: {
                                                          objectFit: "cover",
                                                        },
                                                      }),
                                                    );
                                                  },
                                                }),
                                                s.jsx($d, {
                                                  className:
                                                    "position-absolute bottom-0 end-0 text-light bg-dark p-1 rounded-circle",
                                                  size: 18,
                                                }),
                                              ],
                                            },
                                            N.id,
                                          ),
                                        ),
                                    (!t.images || t.images.length === 0) &&
                                      s.jsx("span", {
                                        className: "text-secondary",
                                        children: "No documents uploaded",
                                      }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        !a.verified &&
                          s.jsxs("div", {
                            className: "mt-4 small",
                            children: [
                              t.status !== "approved" &&
                                s.jsx("button", {
                                  className:
                                    "btn btn-danger fw-bold d-flex align-items-center gap-2 mx-auto",
                                  onClick: p,
                                  disabled: c,
                                  children: c
                                    ? s.jsx("span", {
                                        className:
                                          "spinner-border spinner-border-sm",
                                        role: "status",
                                        "aria-hidden": "true",
                                      })
                                    : s.jsxs(s.Fragment, {
                                        children: [
                                          s.jsx(qd, {}),
                                          " Delete Verification",
                                        ],
                                      }),
                                }),
                              t.status == "approved" &&
                                s.jsx("button", {
                                  className:
                                    "btn btn-warning  fw-bold d-flex align-items-center gap-2 mx-auto",
                                  onClick: y,
                                  disabled: c,
                                  children: c
                                    ? s.jsx("span", {
                                        className:
                                          "spinner-border spinner-border-sm",
                                        role: "status",
                                        "aria-hidden": "true",
                                      })
                                    : s.jsx(s.Fragment, {
                                        children: "Complete Verification",
                                      }),
                                }),
                            ],
                          }),
                        a.verified
                          ? s.jsxs("div", {
                              className:
                                "alert alert-warning mt-4 d-flex align-items-center gap-2",
                              children: [
                                s.jsx(Vs, { className: "text-warning fs-4" }),
                                s.jsx("span", {
                                  children: "You Landhome account is verified",
                                }),
                              ],
                            })
                          : s.jsxs("div", {
                              className:
                                "alert alert-warning mt-4 d-flex align-items-center gap-2",
                              children: [
                                s.jsx(Vs, { className: "text-warning" }),
                                s.jsx("span", {
                                  children:
                                    "Your request cannot be edited. Please delete and resubmit if needed.",
                                }),
                              ],
                            }),
                      ],
                    }),
                  }),
                }),
              }),
            }),
          })
        : s.jsx(po, {})
    );
  },
  dm = () => {
    const [t, e] = w.useState({
      userCount: 0,
      verifiedUserCount: 0,
      listingCount: 0,
    });
    return (
      w.useEffect(() => {
        (async () => {
          try {
            const r = await $.get("/admin/stats");
            e(r.data);
          } catch (r) {
            console.error("Failed to fetch stats:", r);
          }
        })();
      }, []),
      s.jsxs("div", {
        className: "p-4 bg-white text-dark",
        children: [
          s.jsx("h3", {
            className: "fw-bold mb-4 ",
            children: "Admin Dashboard",
          }),
          s.jsxs("div", {
            className: "row g-4",
            children: [
              s.jsx("div", {
                className: "col-md-4",
                children: s.jsxs("div", {
                  className:
                    "p-3 rounded themebg text-light shadow-sm d-flex align-items-center",
                  children: [
                    s.jsx(Jd, { size: 28, className: "me-3 text-warning" }),
                    s.jsxs("div", {
                      children: [
                        s.jsx("h5", {
                          className: "mb-0",
                          children: t.userCount,
                        }),
                        s.jsx("small", { children: "Total Users" }),
                      ],
                    }),
                  ],
                }),
              }),
              s.jsx("div", {
                className: "col-md-4",
                children: s.jsxs("div", {
                  className:
                    "p-3 rounded themebg text-light shadow-sm d-flex align-items-center",
                  children: [
                    s.jsx(Gd, { size: 28, className: "me-3 text-warning" }),
                    s.jsxs("div", {
                      children: [
                        s.jsx("h5", {
                          className: "mb-0",
                          children: t.verifiedUserCount,
                        }),
                        s.jsx("small", { children: "Verified Users" }),
                      ],
                    }),
                  ],
                }),
              }),
              s.jsx("div", {
                className: "col-md-4",
                children: s.jsxs("div", {
                  className:
                    "p-3 rounded themebg text-light shadow-sm d-flex align-items-center",
                  children: [
                    s.jsx(zd, { size: 28, className: "me-3 text-warning" }),
                    s.jsxs("div", {
                      children: [
                        s.jsx("h5", {
                          className: "mb-0",
                          children: t.listingCount,
                        }),
                        s.jsx("small", { children: "Total Listings" }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          s.jsx("div", {
            className: "mt-5",
            children: s.jsxs(q, {
              to: "/sys/admin/verifications",
              className:
                "px-4 py-2 rounded themebg text-light text-decoration-none shadow-sm d-inline-flex align-items-center",
              children: [
                s.jsx(Vs, { className: "me-2 text-warning" }),
                " Manage Verifications",
              ],
            }),
          }),
        ],
      })
    );
  },
  hm = ({ children: t, className: e = "", ...i }) =>
    s.jsx("div", {
      className: `card shadow border-0 rounded-4 overflow-hidden ${e}`,
      ...i,
      children: t,
    }),
  um = ({ children: t, className: e = "", ...i }) =>
    s.jsx("div", { className: `card-body p-4 p-md-5 ${e}`, ...i, children: t }),
  Je = ({ children: t, variant: e = "primary", className: i = "", ...r }) =>
    s.jsx("button", {
      className: `btn rounded-pill fw-bold btn-${e} ${i}`,
      ...r,
      children: t,
    }),
  Fn = 9,
  mm = () => {
    const [t, e] = w.useState([]),
      [i, r] = w.useState(!0),
      [a, c] = w.useState("cards"),
      [l, h] = w.useState(""),
      [p, y] = w.useState(1),
      [j, N] = w.useState("pending"),
      _ = Le();
    w.useEffect(() => {
      (async () => {
        try {
          const { data: F } = await $.get("/admin/verifications");
          e(F);
        } catch {
          B.error("Failed to fetch verifications");
        } finally {
          r(!1);
        }
      })();
    }, []);
    const D = w.useMemo(() => t.filter((A) => A.status === j), [t, j]),
      E = w.useMemo(
        () =>
          D.filter(
            (A) =>
              (A.firstname || "").toLowerCase().includes(l.toLowerCase()) ||
              (A.lastname || "").toLowerCase().includes(l.toLowerCase()),
          ),
        [l, D],
      ),
      T = Math.ceil(E.length / Fn),
      S = w.useMemo(() => {
        const A = (p - 1) * Fn;
        return E.slice(A, A + Fn);
      }, [E, p]),
      R = async (A) => {
        try {
          (await $.put(`/admin/verifications/${A}/approve`),
            B.success("Verification approved"),
            e((F) =>
              F.map((U) => (U.id === A ? { ...U, status: "approved" } : U)),
            ));
        } catch {
          B.error("Error approving verification");
        }
      },
      O = async (A) => {
        try {
          (await $.put(`/admin/verifications/${A}/reject`),
            B.success("Verification rejected"),
            e((F) =>
              F.map((U) => (U.id === A ? { ...U, status: "rejected" } : U)),
            ));
        } catch {
          B.error("Error rejecting verification");
        }
      },
      L = async () => {
        try {
          (await $.put("/admin/verifications/approve-all"),
            B.success("All verifications approved"),
            e((A) => A.map((F) => ({ ...F, status: "approved" }))));
        } catch {
          for (let A of t) A.status !== "approved" && (await R(A.id));
        }
      };
    return i
      ? s.jsx("p", {
          className: "text-center mt-5 text-muted",
          children: "Loading...",
        })
      : s.jsxs("div", {
          className: "container py-5",
          children: [
            s.jsxs("div", {
              className:
                "d-flex flex-column flex-md-row justify-content-between align-items-center mb-4",
              children: [
                s.jsx("h1", {
                  className: "h3 fw-bold text-dark",
                  children: "Verifications",
                }),
                s.jsxs("div", {
                  className:
                    "d-flex flex-wrap align-items-center gap-2 mt-3 mt-md-0",
                  children: [
                    s.jsx("div", {
                      className: "input-group me-2",
                      style: { maxWidth: "300px" },
                      children: s.jsx("input", {
                        type: "text",
                        className:
                          "form-control rounded-pill border-0 shadow-sm",
                        placeholder: "Search by name...",
                        value: l,
                        onChange: (A) => {
                          (h(A.target.value), y(1));
                        },
                      }),
                    }),
                    s.jsx(Je, {
                      variant: a === "cards" ? "primary" : "outline-secondary",
                      onClick: () => c("cards"),
                      children: "Cards",
                    }),
                    s.jsx(Je, {
                      variant: a === "table" ? "primary" : "outline-secondary",
                      onClick: () => c("table"),
                      children: "Table",
                    }),
                    j === "pending" &&
                      s.jsx(Je, {
                        variant: "success",
                        onClick: L,
                        children: "Approve All",
                      }),
                  ],
                }),
              ],
            }),
            s.jsx("ul", {
              className: "nav nav-tabs mb-4",
              children: ["pending", "approved", "rejected"].map((A) =>
                s.jsx(
                  "li",
                  {
                    className: "nav-item",
                    children: s.jsx("button", {
                      className: `nav-link ${j === A ? "active fw-bold" : ""}`,
                      onClick: () => {
                        (N(A), y(1));
                      },
                      children: A.charAt(0).toUpperCase() + A.slice(1),
                    }),
                  },
                  A,
                ),
              ),
            }),
            a === "cards"
              ? s.jsx("div", {
                  className: "row g-4",
                  children: S.map((A) =>
                    s.jsx(
                      "div",
                      {
                        className: "col-12 col-sm-6 col-lg-4",
                        children: s.jsx(hm, {
                          role: "button",
                          onClick: () => _(`/sys/admin/verifications/${A.id}`),
                          className: "cursor-pointer",
                          children: s.jsx(um, {
                            children: s.jsxs("div", {
                              className:
                                "d-flex flex-column align-items-center text-center",
                              children: [
                                s.jsx("img", {
                                  src:
                                    A.profileicon ||
                                    "https://via.placeholder.com/150",
                                  alt: `${A.firstname} ${A.lastname}`,
                                  className:
                                    "rounded-circle mb-3 border border-3 border-white shadow-sm",
                                  style: {
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                  },
                                }),
                                s.jsxs("h5", {
                                  className: "fw-bold mb-1 text-dark",
                                  children: [A.firstname, " ", A.lastname],
                                }),
                                s.jsx("span", {
                                  className: `badge rounded-pill text-capitalize ${A.status === "approved" ? "bg-success" : A.status === "rejected" ? "bg-danger" : "bg-warning text-dark"}`,
                                  children: A.status,
                                }),
                                A.status === "pending" &&
                                  s.jsxs("div", {
                                    className: "d-flex gap-2 mt-3",
                                    onClick: (F) => F.stopPropagation(),
                                    children: [
                                      s.jsx(Je, {
                                        variant: "success",
                                        className: "btn-sm",
                                        onClick: () => R(A.id),
                                        children: s.jsx(es, {}),
                                      }),
                                      s.jsx(Je, {
                                        variant: "danger",
                                        className: "btn-sm",
                                        onClick: () => O(A.id),
                                        children: s.jsx(Kn, {}),
                                      }),
                                    ],
                                  }),
                              ],
                            }),
                          }),
                        }),
                      },
                      A.id,
                    ),
                  ),
                })
              : s.jsx("div", {
                  className: "table-responsive rounded-4 shadow-sm",
                  children: s.jsxs("table", {
                    className: "table table-hover align-middle mb-0",
                    children: [
                      s.jsx("thead", {
                        className: "table-light",
                        children: s.jsxs("tr", {
                          children: [
                            s.jsx("th", { children: "Profile" }),
                            s.jsx("th", { children: "First Name" }),
                            s.jsx("th", { children: "Last Name" }),
                            s.jsx("th", { children: "Status" }),
                            j === "pending" &&
                              s.jsx("th", {
                                className: "text-end",
                                children: "Actions",
                              }),
                          ],
                        }),
                      }),
                      s.jsx("tbody", {
                        children: S.map((A) =>
                          s.jsxs(
                            "tr",
                            {
                              role: "button",
                              onClick: () =>
                                _(`/sys/admin/verifications/${A.id}`),
                              className: "cursor-pointer",
                              children: [
                                s.jsx("td", {
                                  children: s.jsx("img", {
                                    src:
                                      A.profileicon ||
                                      "https://via.placeholder.com/150",
                                    alt: `${A.firstname} ${A.lastname}`,
                                    className: "rounded-circle",
                                    style: {
                                      width: "40px",
                                      height: "40px",
                                      objectFit: "cover",
                                    },
                                  }),
                                }),
                                s.jsx("td", { children: A.firstname }),
                                s.jsx("td", { children: A.lastname }),
                                s.jsx("td", {
                                  children: s.jsx("span", {
                                    className: `badge rounded-pill text-capitalize ${A.status === "approved" ? "bg-success" : A.status === "rejected" ? "bg-danger" : "bg-warning text-dark"}`,
                                    children: A.status,
                                  }),
                                }),
                                j === "pending" &&
                                  s.jsx("td", {
                                    className: "text-end",
                                    onClick: (F) => F.stopPropagation(),
                                    children: s.jsxs("div", {
                                      className:
                                        "d-flex justify-content-end gap-2",
                                      children: [
                                        s.jsx(Je, {
                                          variant: "success",
                                          className: "btn-sm",
                                          onClick: () => R(A.id),
                                          children: s.jsx(es, {}),
                                        }),
                                        s.jsx(Je, {
                                          variant: "danger",
                                          className: "btn-sm",
                                          onClick: () => O(A.id),
                                          children: s.jsx(Kn, {}),
                                        }),
                                      ],
                                    }),
                                  }),
                              ],
                            },
                            A.id,
                          ),
                        ),
                      }),
                    ],
                  }),
                }),
            s.jsxs("div", {
              className:
                "d-flex justify-content-center align-items-center gap-2 mt-4",
              children: [
                s.jsx(Je, {
                  variant: "outline-secondary",
                  disabled: p === 1,
                  onClick: () => y((A) => A - 1),
                  children: "Previous",
                }),
                s.jsxs("span", {
                  className: "text-muted",
                  children: ["Page ", p, " of ", T || 1],
                }),
                s.jsx(Je, {
                  variant: "outline-secondary",
                  disabled: p === T || T === 0,
                  onClick: () => y((A) => A + 1),
                  children: "Next",
                }),
              ],
            }),
          ],
        });
  },
  fm = () => {
    var E;
    const { id: t } = It(),
      e = Le(),
      [i, r] = w.useState(null),
      [a, c] = w.useState(null),
      [l, h] = w.useState(!0),
      { setModal: p, setModalTitle: y } = Pe();
    w.useEffect(() => {
      (async () => {
        var S;
        try {
          const R = await $.get(`/admin/verifications/${t}`);
          if ((r(R.data), (S = R.data) != null && S.uid)) {
            const O = await $.get(`/users/${R.data.uid}`);
            c(O.data);
          }
        } catch (R) {
          console.error("Failed to fetch verification:", R);
        } finally {
          h(!1);
        }
      })();
    }, [t]);
    const j = async () => {
        if (
          window.confirm(
            "Are you sure you want to delete this verification request?",
          )
        )
          try {
            (await $.delete(`/admin/verifications/${t}`),
              e("/sys/admin/verifications"));
          } catch (T) {
            console.error("Failed to delete verification:", T);
          }
      },
      N = () => {
        a != null && a.email
          ? (window.location.href = `mailto:${a.email}`)
          : alert("No email available for this user.");
      },
      _ = async () => {
        try {
          (await $.put(`/admin/verifications/${t}/approve`),
            e("/sys/admin/verifications"));
        } catch (T) {
          console.error("Failed to approve:", T);
        }
      },
      D = async () => {
        try {
          (await $.put(`/admin/verifications/${t}/reject`),
            e("/sys/admin/verifications"));
        } catch (T) {
          console.error("Failed to reject:", T);
        }
      };
    return l
      ? s.jsx("div", { className: "text-center mt-5", children: "Loading..." })
      : i
        ? s.jsx("div", {
            className: "container mt-5",
            children: s.jsxs("div", {
              className: "card shadow-lg",
              children: [
                s.jsx("div", {
                  className: "card-header themebg text-white",
                  children: s.jsx("h3", {
                    className: "mb-0",
                    children: "Verification Details",
                  }),
                }),
                s.jsxs("div", {
                  className: "card-body",
                  children: [
                    s.jsxs("div", {
                      className: "text-center mb-4",
                      children: [
                        s.jsx("img", {
                          src: i.profileicon,
                          alt: "Profile",
                          className: "rounded-circle mb-3",
                          width: "120",
                          height: "120",
                        }),
                        s.jsxs("h4", {
                          children: [i.firstname, " ", i.lastname],
                        }),
                        s.jsxs("p", {
                          className: "text-muted",
                          children: ["Verification ID: ", t],
                        }),
                      ],
                    }),
                    s.jsxs("div", {
                      className: "mb-4",
                      children: [
                        s.jsx("h5", {
                          className: "fw-bold",
                          children: "Verification Information",
                        }),
                        s.jsxs("ul", {
                          className: "list-group list-group-flush",
                          children: [
                            s.jsxs("li", {
                              className: "list-group-item",
                              children: [
                                s.jsx("strong", { children: "NIN:" }),
                                " ",
                                i.nin || "N/A",
                              ],
                            }),
                            s.jsxs("li", {
                              className: "list-group-item",
                              children: [
                                s.jsx("strong", { children: "Residence:" }),
                                " ",
                                i.address || "N/A",
                              ],
                            }),
                            s.jsxs("li", {
                              className: "list-group-item",
                              children: [
                                s.jsx("strong", {
                                  children: "Uploaded Documents:",
                                }),
                                s.jsx("div", {
                                  className: "d-flex flex-wrap gap-3 mt-2",
                                  children:
                                    ((E = i.images) == null
                                      ? void 0
                                      : E.length) > 0
                                      ? i.images.map((T, S) =>
                                          s.jsx(
                                            "img",
                                            {
                                              src: T.url,
                                              alt: `doc-${S}`,
                                              className: "border rounded",
                                              style: {
                                                width: "120px",
                                                height: "120px",
                                                objectFit: "cover",
                                              },
                                              onClick: () => {
                                                (p(
                                                  s.jsx(
                                                    "img",
                                                    {
                                                      src: T.url,
                                                      alt: `doc-${S}`,
                                                      className:
                                                        "border rounded",
                                                      style: {
                                                        width: "100%",
                                                        objectFit: "cover",
                                                      },
                                                    },
                                                    S,
                                                  ),
                                                ),
                                                  y(
                                                    (a == null
                                                      ? void 0
                                                      : a.firstname) +
                                                      "'s verification request document",
                                                  ));
                                              },
                                            },
                                            S,
                                          ),
                                        )
                                      : s.jsx("span", {
                                          className: "text-muted ms-2",
                                          children: "No documents",
                                        }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    a &&
                      s.jsxs("div", {
                        className: "mb-4",
                        children: [
                          s.jsx("h5", {
                            className: "fw-bold",
                            children: "User Information",
                          }),
                          s.jsxs("ul", {
                            className: "list-group list-group-flush",
                            children: [
                              s.jsxs("li", {
                                className: "list-group-item",
                                children: [
                                  s.jsx("strong", { children: "Email:" }),
                                  " ",
                                  a.email,
                                ],
                              }),
                              s.jsxs("li", {
                                className: "list-group-item",
                                children: [
                                  s.jsx("strong", { children: "Username:" }),
                                  " ",
                                  a.username,
                                ],
                              }),
                              s.jsxs("li", {
                                className: "list-group-item",
                                children: [
                                  s.jsx("strong", { children: "Phone:" }),
                                  " ",
                                  a.phone || "N/A",
                                ],
                              }),
                              s.jsxs("li", {
                                className: "list-group-item",
                                children: [
                                  s.jsx("strong", { children: "Role:" }),
                                  " ",
                                  a.role || "User",
                                ],
                              }),
                              s.jsxs("li", {
                                className: "list-group-item",
                                children: [
                                  s.jsx("strong", { children: "Joined:" }),
                                  " ",
                                  a.createdAt
                                    ? new Date(a.createdAt).toLocaleDateString()
                                    : "Unknown",
                                ],
                              }),
                            ],
                          }),
                          s.jsx("div", {
                            className: "mt-3",
                            children: s.jsx(q, {
                              to: `/sys/admin/users/${a.id}`,
                              className: "btn btn-outline-primary",
                              children: "View Full Profile",
                            }),
                          }),
                        ],
                      }),
                    s.jsxs("div", {
                      className: "d-flex justify-content-center gap-3 mt-4",
                      children: [
                        s.jsx("button", {
                          className: "btn btn-success",
                          onClick: _,
                          children: "Approve",
                        }),
                        s.jsx("button", {
                          className: "btn btn-danger",
                          onClick: D,
                          children: "Reject",
                        }),
                        s.jsx("button", {
                          className: "btn btn-primary",
                          onClick: N,
                          children: "Email User",
                        }),
                        s.jsx("button", {
                          className: "btn btn-outline-danger",
                          onClick: j,
                          children: "Delete Request",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          })
        : s.jsx("div", {
            className: "text-center mt-5",
            children: "Verification not found",
          });
  },
  pm = () => {
    var l;
    const [t, e] = w.useState({}),
      [i, r] = w.useState([]),
      { uid: a } = It();
    async function c() {
      const h = await $.get("/users/" + a);
      e(h.data);
      const p = await $.get("/auth/profile/listings/user/" + a);
      r(p.data);
    }
    return (
      w.useEffect(() => {
        (scroll({ top: 0 }), c());
      }, []),
      s.jsxs("div", {
        className: "bg-light min-vh-100",
        children: [
          s.jsx("div", {
            className: "position-relative",
            style: {
              background:
                "linear-gradient(90deg, #badfafff 60%, #bfd1afff 100%)",
              height: 160,
            },
            children: s.jsx("div", {
              className: "container position-relative",
              children: s.jsx("img", {
                src: t.profileicon,
                alt: "Profile",
                className:
                  "rounded-circle border border-3 border-white position-absolute",
                style: {
                  width: 180,
                  height: 180,
                  objectFit: "cover",
                  left: 30,
                  top: 30,
                  background: "#fff",
                },
              }),
            }),
          }),
          s.jsxs("div", {
            className: "",
            style: { paddingTop: 10 },
            children: [
              s.jsx("div", {
                className: " text-dark shadow-sm px-5 px-md-0 pt-5 p-4",
                children: s.jsxs("div", {
                  className:
                    "d-flex flex-column flex-md-row align-items-md-center",
                  children: [
                    s.jsx("div", { style: { width: 140 } }),
                    s.jsxs("div", {
                      className: "flex-grow-1",
                      children: [
                        s.jsx("h3", {
                          className: "mb-1",
                          children: t.fullname,
                        }),
                        t.verified &&
                          s.jsxs("div", {
                            className: "rounded mt-1 small px-2",
                            style: {
                              backgroundColor: "#D4AF37",
                              maxWidth: "fit-content",
                            },
                            children: [
                              s.jsx(be, {
                                className: "icon",
                                style: { color: "#ffe479ff" },
                              }),
                              " ",
                              "Verified",
                            ],
                          }),
                        s.jsx("div", {
                          className: "text-muted mt-2 mb-2",
                          children: t.bio || "No bio provided.",
                        }),
                        s.jsxs("div", {
                          className: "mb-2",
                          children: [
                            s.jsx("span", {
                              className: "me-3",
                              children: t.email,
                            }),
                            s.jsx("span", {
                              className: "me-3",
                              children:
                                t.gender &&
                                t.gender.charAt(0).toUpperCase() +
                                  t.gender.slice(1),
                            }),
                          ],
                        }),
                        s.jsx("div", {
                          className: "mb-2",
                          children: s.jsxs("span", {
                            className: "text-muted",
                            children: [
                              "Joined on",
                              " ",
                              (l = t.dateCreated) != null && l.seconds
                                ? new Date(t.dateCreated.seconds * 1e3)
                                    .toDateString()
                                    .split(" ")
                                    .slice(1)
                                    .join(" ")
                                : "",
                            ],
                          }),
                        }),
                        s.jsx("div", {
                          className: "d-flex gap-2 mt-3",
                          children: s.jsx("button", {
                            className: "btn themebg text-light",
                            children: "Message",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              s.jsx("div", {
                className: "",
                style: { paddingTop: 10 },
                children: s.jsx("div", {
                  className: "container text-dark px-0 px-2 pt-5 p-4",
                  children: s.jsxs("div", {
                    className: "px-4",
                    children: [
                      s.jsxs("h3", {
                        className: "mb-2",
                        children: [
                          (t.firstname || "").replace(" ", "") || "User",
                          "'s Listings",
                        ],
                      }),
                      s.jsx("div", {
                        className: "mb-5",
                        children: s.jsx("div", {
                          className: "row",
                          children: s.jsx("div", {
                            className: " row",
                            children: i.map((h) =>
                              s.jsx(
                                q,
                                {
                                  to: `/listed/${h.id}`,
                                  className:
                                    "no-dec text-dark col-12 col-sm-6 col-md-4 mt-4",
                                  children: s.jsxs("div", {
                                    className:
                                      "hovShade shadow rounded d-flex  flex-column w-100",
                                    children: [
                                      s.jsxs("div", {
                                        className: "w-100 row mx-auto g-0",
                                        children: [
                                          s.jsxs("div", {
                                            className: "small",
                                            style: { position: "absolute" },
                                            children: [
                                              h.heldUp &&
                                                !h.sold &&
                                                s.jsxs("button", {
                                                  className:
                                                    "mb-1 btn text-light themebg",
                                                  onClick: (p) => {
                                                    (p.stopPropagation(),
                                                      toast.info(
                                                        `This is probably because ${t.name} has been contacted over the listing, you can still contact ${(t == null ? void 0 : t.gender) == "male" ? "him" : "her"} as the listing has not been sold out`,
                                                      ));
                                                  },
                                                  children: [
                                                    s.jsx(Re, {
                                                      className: "icon",
                                                    }),
                                                    " This Listing has been held up by the owner",
                                                  ],
                                                }),
                                              h.sold &&
                                                s.jsxs("button", {
                                                  className:
                                                    "mb-1 btn text-light btn-primary",
                                                  onClick: (p) => {
                                                    (p.stopPropagation(),
                                                      toast.info(
                                                        `This listing has been sold out. you are seen this because ${t == null ? void 0 : t.name} marked this listing as sold`,
                                                      ));
                                                  },
                                                  children: [
                                                    s.jsx(Re, {
                                                      className: "icon",
                                                    }),
                                                    " This listing has been sold out",
                                                  ],
                                                }),
                                            ],
                                          }),
                                          (() => {
                                            var y, j, N, _;
                                            return (
                                              ((y = h.images[0]) == null
                                                ? void 0
                                                : y.type) || ""
                                            ).startsWith("image") &&
                                              ((j = h.images[0]) == null
                                                ? void 0
                                                : j.type)
                                              ? s.jsx(ae.LazyLoadImage, {
                                                  effect: "opacity",
                                                  className:
                                                    "img-fluid  w-100  rounded col-12",
                                                  placeholderSrc:
                                                    "/images/default.png",
                                                  src:
                                                    ((N = h.images[0]) == null
                                                      ? void 0
                                                      : N.url) ||
                                                    "/images/default.png",
                                                  style: {
                                                    height: "200px",
                                                    minHeight: "200px",
                                                    maxHeight: "200px",
                                                    objectFit: "cover",
                                                    minWidth: "100%",
                                                  },
                                                  alt: h.name,
                                                })
                                              : s.jsx(s.Fragment, {
                                                  children: s.jsx("video", {
                                                    effect: "opacity",
                                                    className:
                                                      "img-fluid  w-100  rounded col-12",
                                                    placeholderSrc:
                                                      "/images/default.png",
                                                    src:
                                                      ((_ = h.images[0]) == null
                                                        ? void 0
                                                        : _.url) ||
                                                      "/images/default.png",
                                                    style: {
                                                      height: "200px",
                                                      minHeight: "200px",
                                                      maxHeight: "200px",
                                                      objectFit: "cover",
                                                      minWidth: "100%",
                                                    },
                                                    alt: h.name,
                                                  }),
                                                });
                                          })(),
                                        ],
                                      }),
                                      s.jsxs("div", {
                                        className: "p-3",
                                        children: [
                                          s.jsx("h4", {
                                            className: "h5 mb-2",
                                            children: h.name,
                                          }),
                                          s.jsxs("p", {
                                            className: "small text-muted",
                                            children: [
                                              h.reigion,
                                              ", ",
                                              h.state,
                                            ],
                                          }),
                                          s.jsx("div", {
                                            className:
                                              "d-flex justify-content-between align-items-center",
                                            children: s.jsxs("div", {
                                              className: "fw-bold",
                                              children: [
                                                "NGN ",
                                                h.price.toLocaleString(),
                                              ],
                                            }),
                                          }),
                                          s.jsxs("div", {
                                            className: "d-flex",
                                            children: [
                                              h.verified &&
                                                s.jsxs("div", {
                                                  className:
                                                    "rounded small me-1 px-2 my-auto",
                                                  style: {
                                                    backgroundColor: "#D4AF37",
                                                    maxWidth: "fit-content",
                                                  },
                                                  children: [
                                                    s.jsx(be, {
                                                      className: "icon",
                                                      style: {
                                                        color: "#ffe479ff",
                                                      },
                                                    }),
                                                    " ",
                                                    "Verified",
                                                  ],
                                                }),
                                              s.jsx("div", {
                                                className:
                                                  "rounded text-light small px-2 my-auto",
                                                style: {
                                                  backgroundColor:
                                                    h.type == "rental"
                                                      ? "#0056a7a4"
                                                      : "#3d8f1c",
                                                  maxWidth: "fit-content",
                                                },
                                                children: h.type,
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                },
                                h.id,
                              ),
                            ),
                          }),
                        }),
                      }),
                    ],
                  }),
                }),
              }),
            ],
          }),
        ],
      })
    );
  },
  gm = () => {
    const [t, e] = w.useState(!0),
      [i, r] = w.useState(!0);
    return (
      w.useEffect(() => {
        (async () => {
          var a, c, l;
          try {
            (e(!0),
              await $.post("/auth/profile/verification/finish"),
              e("success"),
              setTimeout(() => {
                location.href = location.origin + "/auth/user-profile";
              }, 3e3));
          } catch (h) {
            (B.error(
              ((c =
                (a = h == null ? void 0 : h.response) == null
                  ? void 0
                  : a.data) == null
                ? void 0
                : c.message) ||
                ((l = h == null ? void 0 : h.response) == null
                  ? void 0
                  : l.data) ||
                (h == null ? void 0 : h.message) ||
                "Something went wrong",
            ),
              e("error"));
          }
        })();
      }, [i]),
      s.jsx("div", {
        className: "d-flex m-5 p-5",
        children: s.jsx("h1", {
          className: "m-auto themetxt",
          children:
            t == !0
              ? s.jsx(Qa, { className: "spinner" })
              : t == "success"
                ? s.jsx(s.Fragment, {
                    children: s.jsx(Ya, { className: "slideUp" }),
                  })
                : s.jsx(s.Fragment, {
                    children: s.jsxs("div", {
                      className: "d-flex flex-column",
                      children: [
                        s.jsxs("div", {
                          className: "mx-auto text-danger slideUp",
                          children: [s.jsx(ih, {}), " Something went wrong"],
                        }),
                        s.jsx("div", {
                          className: "mx-auto mt-1",
                          children: s.jsx("button", {
                            className: "btn-primary btn",
                            onClick: () => r((a) => !a),
                            children: "Retry",
                          }),
                        }),
                      ],
                    }),
                  }),
        }),
      })
    );
  },
  xm = () => (
    Pe(),
    w.useEffect(() => {
      const t = document.getElementById("ico");
      t && (t.href = "/logo.png");
    }, []),
    s.jsx(Xl, {
      children: s.jsxs("main", {
        className: "p-0 m-0 themebg",
        children: [
          s.jsx(Vd, {}),
          s.jsx($l, {
            children: s.jsxs(ne, {
              path: "/",
              element: s.jsx(nh, {}),
              children: [
                s.jsx(ne, { index: !0, element: s.jsx(Qd, {}) }),
                s.jsx(ne, { path: "/about-us", element: s.jsx(Zd, {}) }),
                s.jsx(ne, { path: "/some-other-page", element: s.jsx(eh, {}) }),
                s.jsx(ne, { path: "/contact-us", element: s.jsx(sh, {}) }),
                s.jsx(ne, { path: "/search", element: s.jsx(im, {}) }),
                s.jsx(ne, { path: "/listed/new", element: s.jsx(Zu, {}) }),
                s.jsx(ne, {
                  path: "/listed/:listingId",
                  element: s.jsx(sm, {}),
                }),
                s.jsx(ne, { path: "/user/:uid", element: s.jsx(nm, {}) }),
                s.jsx(ne, {
                  path: "/auth/user-profile",
                  element: s.jsx(Qu, {}),
                }),
                s.jsx(ne, {
                  path: "/auth/user-profile/edit",
                  element: s.jsx(rm, {}),
                }),
                s.jsx(ne, {
                  path: "/auth/user-profile/verification",
                  element: s.jsx(po, {}),
                }),
                s.jsx(ne, {
                  path: "/auth/user-profile/verification/view",
                  element: s.jsx(cm, {}),
                }),
                s.jsx(ne, {
                  path: "/auth/verification/finish",
                  element: s.jsx(gm, {}),
                }),
                s.jsx(ne, {
                  path: "/auth/user-profile/listed/:listingId",
                  element: s.jsx(tm, {}),
                }),
                s.jsx(ne, {
                  path: "/auth/user-profile/listed/:listingId/edit",
                  element: s.jsx(am, {}),
                }),
                s.jsx(ne, { path: "/auth/login", element: s.jsx(rh, {}) }),
                s.jsx(ne, {
                  path: "/auth/create-account",
                  element: s.jsx(Yu, {}),
                }),
                s.jsx(ne, { path: "/sys/admin", element: s.jsx(dm, {}) }),
                s.jsx(ne, {
                  path: "/sys/admin/verifications",
                  element: s.jsx(mm, {}),
                }),
                s.jsx(ne, {
                  path: "/sys/admin/verifications/:id",
                  element: s.jsx(fm, {}),
                }),
                s.jsx(ne, {
                  path: "/sys/admin/users/:uid",
                  element: s.jsx(pm, {}),
                }),
              ],
            }),
          }),
          s.jsx("div", {
            className: "content pb-0 mb-0",
            children: s.jsx(tc, {}),
          }),
          s.jsx("div", {
            className: "themebg themetxt px-3",
            children:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          }),
        ],
      }),
    })
  ),
  Fm = () => s.jsx(Kd, { children: s.jsx(xm, {}) });
export { Fm as default };
