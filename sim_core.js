/* HealthLife body simulator: core maths (runs fully in the browser, no photo leaves the device).
   warp(): re-shapes the person in a photo horizontally, row by row, using a person mask and pose landmarks.
   It is an ILLUSTRATION, not a prediction. */
(function (root) {
  "use strict";

  var LIMITS = { minBMI: 18.5, maxBMI: 35, maxLoseFrac: 0.25, maxLoseKg: 40, maxGainKg: 20, maxMuscleKg: 12, minH: 120, maxH: 230, minW: 35, maxW: 250 };

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  /* safety rules: never show an unhealthy target */
  function checkLimits(o) {
    var h = o.heightCm, w = o.weightKg, d = o.deltaKg, k = o.kind;
    if (!(h >= LIMITS.minH && h <= LIMITS.maxH) || !(w >= LIMITS.minW && w <= LIMITS.maxW)) return { ok: false, reason: "bad_body" };
    if (!(Math.abs(d) >= 0.5)) return { ok: false, reason: "too_small" };
    var m = h / 100, bmiNew = (w + d) / (m * m);
    if (k === "lose") {
      if (d > 0) return { ok: false, reason: "bad_body" };
      if (-d > w * LIMITS.maxLoseFrac || -d > LIMITS.maxLoseKg) return { ok: false, reason: "lose_too_much" };
      if (bmiNew < LIMITS.minBMI) return { ok: false, reason: "bmi_low" };
    } else {
      if (d < 0) return { ok: false, reason: "bad_body" };
      var cap = k === "muscle" ? LIMITS.maxMuscleKg : LIMITS.maxGainKg;
      if (d > cap) return { ok: false, reason: "gain_too_much" };
      if (bmiNew > LIMITS.maxBMI) return { ok: false, reason: "bmi_high" };
    }
    return { ok: true, bmiNew: bmiNew };
  }

  /* safe pace: lose 0.5-1 kg/week, gain fat 0.25-0.5, gain muscle 0.1-0.25 kg/week */
  function estimateWeeks(deltaKg, kind) {
    var a = Math.abs(deltaKg), slow, fast;
    if (kind === "lose") { slow = 0.5; fast = 1; } else if (kind === "muscle") { slow = 0.1; fast = 0.25; } else { slow = 0.25; fast = 0.5; }
    return [Math.max(1, Math.round(a / fast)), Math.max(2, Math.round(a / slow))];
  }

  /* how strongly each body level changes (0..1). Control points: chin, shoulder, chest, waist, hip, thigh, knee, ankle, end */
  var SHAPES = {
    lose: [0, 0.35, 0.65, 1.0, 0.95, 0.7, 0.45, 0.2, 0],
    gain: [0, 0.3, 0.55, 1.0, 1.0, 0.8, 0.5, 0.2, 0],
    muscle: [0, 0.9, 1.0, 0.3, 0.3, 0.75, 0.4, 0.25, 0]
  };

  function levels(lm, h) {
    function avgY(a, b) { return (lm[a].y + lm[b].y) / 2 * h; }
    var yNose = lm[0].y * h, yS = avgY(11, 12), yH = avgY(23, 24), yK = avgY(25, 26);
    var yA = avgY(27, 28);
    var legLen = Math.max(1, yK - yH);
    if (!(yA > yK + 5) || yA > h) yA = Math.min(h - 1, yK + legLen * 0.95);
    var T = Math.max(1, yH - yS);
    var chin = yNose + 0.75 * (yS - yNose);
    return [chin, yS, yS + 0.3 * T, yS + 0.65 * T, yH, yH + 0.5 * legLen, yK, yA, Math.min(h - 1, yA + 0.12 * legLen)];
  }

  function interp(ys, ps, y) {
    if (y <= ys[0] || y >= ys[ys.length - 1]) return 0;
    for (var i = 0; i < ys.length - 1; i++) {
      if (y <= ys[i + 1]) {
        var t = (y - ys[i]) / Math.max(1e-6, ys[i + 1] - ys[i]);
        t = (1 - Math.cos(t * Math.PI)) / 2;
        return ps[i] + (ps[i + 1] - ps[i]) * t;
      }
    }
    return 0;
  }

  function boxBlur(src, w, h, r) { // float32 in, float32 out (separable)
    var tmp = new Float32Array(w * h), out = new Float32Array(w * h), x, y, k, s, c;
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) { s = 0; c = 0; for (k = -r; k <= r; k++) { var xx = x + k; if (xx >= 0 && xx < w) { s += src[y * w + xx]; c++; } } tmp[y * w + x] = s / c; }
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) { s = 0; c = 0; for (k = -r; k <= r; k++) { var yy = y + k; if (yy >= 0 && yy < h) { s += tmp[yy * w + x]; c++; } } out[y * w + x] = s / c; }
    return out;
  }

  /* src: RGBA Uint8ClampedArray (w*h*4); mask: Uint8Array (w*h) 1 = person; lm: 33 pose landmarks (x,y normalised);
     opts: {kind:'lose'|'gain'|'muscle', weightKg, deltaKg}. Returns a new RGBA array. */
  function warp(src, w, h, mask, lm, opts) {
    var out = new Uint8ClampedArray(src), ys = levels(lm, h), ps = SHAPES[opts.kind] || SHAPES.lose;
    var r = (opts.weightKg + opts.deltaKg) / opts.weightKg;
    var expo = opts.kind === "muscle" ? 0.8 : 0.9;
    var base = clamp(Math.pow(r, expo) - 1, -0.25, 0.25);
    var yTop = Math.max(0, Math.floor(ys[0])), yBot = Math.min(h - 1, Math.ceil(ys[ys.length - 1]));
    var mf = new Float32Array(w * h), i, x, y;
    for (i = 0; i < mask.length; i++) mf[i] = mask[i] ? 1 : 0;
    var alpha = boxBlur(mf, w, h, 2), alphaBig = boxBlur(mf, w, h, 5);

    /* centre line of the body (from pose) */
    var cxS = (lm[11].x + lm[12].x) / 2 * w, cxH = (lm[23].x + lm[24].x) / 2 * w, cxA = (lm[27].x + lm[28].x) / 2 * w;
    function cxAt(yy) {
      if (yy <= ys[1]) return cxS;
      if (yy <= ys[4]) return cxS + (cxH - cxS) * (yy - ys[1]) / Math.max(1, ys[4] - ys[1]);
      if (yy <= ys[7]) return cxH + (cxA - cxH) * (yy - ys[4]) / Math.max(1, ys[7] - ys[4]);
      return cxA;
    }

    /* background fill colour per row (left / right of the person), smoothed over rows to avoid streaks */
    var fl = new Float32Array(h * 3), fr = new Float32Array(h * 3), has = new Uint8Array(h), c;
    for (y = yTop; y <= yBot; y++) {
      var xl = -1, xr = -1;
      for (x = 0; x < w; x++) if (mask[y * w + x]) { xl = x; break; }
      for (x = w - 1; x >= 0; x--) if (mask[y * w + x]) { xr = x; break; }
      if (xl < 0) continue;
      has[y] = 1;
      var lx = Math.max(0, xl - 4), rx = Math.min(w - 1, xr + 4);
      for (c = 0; c < 3; c++) { fl[y * 3 + c] = src[(y * w + lx) * 4 + c]; fr[y * 3 + c] = src[(y * w + rx) * 4 + c]; }
    }
    var W = 7;
    var fl2 = new Float32Array(h * 3), fr2 = new Float32Array(h * 3);
    for (y = yTop; y <= yBot; y++) {
      for (c = 0; c < 3; c++) {
        var sl = 0, sr = 0, n = 0;
        for (var k = -W; k <= W; k++) { var yy = y + k; if (yy >= yTop && yy <= yBot && has[yy]) { sl += fl[yy * 3 + c]; sr += fr[yy * 3 + c]; n++; } }
        fl2[y * 3 + c] = n ? sl / n : 0; fr2[y * 3 + c] = n ? sr / n : 0;
      }
    }

    function samp(arr, nCh, xf, yy, ch) { // bilinear along x on one row
      var x0 = Math.floor(xf), x1 = Math.min(w - 1, x0 + 1), t = xf - x0;
      return arr[(yy * w + x0) * nCh + ch] * (1 - t) + arr[(yy * w + x1) * nCh + ch] * t;
    }

    for (y = yTop; y <= yBot; y++) {
      var p = interp(ys, ps, y), s = 1 + base * p;
      if (Math.abs(s - 1) < 0.002 || !has[y]) continue;
      var cx = cxAt(y);
      for (x = 0; x < w; x++) {
        var xs = cx + (x - cx) / s, a = 0;
        if (xs >= 0 && xs <= w - 1.001) a = samp(alpha, 1, xs, y, 0);
        var a0 = Math.min(1, alphaBig[y * w + x] * 4), idx = (y * w + x) * 4, side = x < cx ? fl2 : fr2;
        for (c = 0; c < 3; c++) {
          var orig = src[idx + c];
          var bg = orig * (1 - a0) + side[y * 3 + c] * a0;
          var pc = (xs >= 0 && xs <= w - 1.001) ? samp(src, 4, xs, y, c) : bg;
          out[idx + c] = pc * a + bg * (1 - a);
        }
      }
    }
    return out;
  }

  root.SimCore = { warp: warp, checkLimits: checkLimits, estimateWeeks: estimateWeeks, LIMITS: LIMITS, levels: levels };
  if (typeof module !== "undefined" && module.exports) module.exports = root.SimCore;
})(typeof window !== "undefined" ? window : globalThis);
