/* HealthLife screening core: pure scoring functions (no network, no storage).
   These are SCREENING tools. They never diagnose. Sources are listed in assess_refs.js. */
(function (root) {
  "use strict";
  var r1 = function (n) { return Math.round(n * 10) / 10; };
  var log10 = function (x) { return Math.log(x) / Math.LN10; };

  /* ---------- body measures ---------- */
  function bmi(w, h) { var m = h / 100; return w / (m * m); }
  /* WHO adult categories (WHO TRS 894, 2000) */
  function bmiCat(b) { return b < 18.5 ? "under" : b < 25 ? "normal" : b < 30 ? "over" : "obese"; }
  /* waist-to-height: <0.4 low, 0.4-0.49 no increased risk, 0.5-0.59 increased, >=0.6 high (Ashwell 2012) */
  function whtr(waist, h) { return waist / h; }
  function whtrCat(x) { return x < 0.4 ? "low" : x < 0.5 ? "ok" : x < 0.6 ? "increased" : "high"; }
  /* US Navy circumference method (Hodgdon & Beckett 1984), all in cm. Estimate only (about +-3-4 points). */
  function navyBF(sex, h, neck, waist, hip) {
    var v;
    if (sex === "m") { if (waist - neck <= 0) return NaN; v = 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(h)) - 450; }
    else { if (waist + hip - neck <= 0) return NaN; v = 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(h)) - 450; }
    return v;
  }
  /* ACE categories */
  function bfCat(sex, p) {
    var c = sex === "m" ? [6, 14, 18, 25] : [14, 21, 25, 32];
    return p < c[0] ? "essential" : p < c[1] ? "athlete" : p < c[2] ? "fitness" : p < c[3] ? "average" : "high";
  }
  /* Mifflin-St Jeor (1990) */
  function bmr(sex, w, h, age) { return 10 * w + 6.25 * h - 5 * age + (sex === "m" ? 5 : -161); }
  var ACT = { sedentary: 1.2, light: 1.375, moderate: 1.55, high: 1.725, athlete: 1.9 };
  function tdee(sex, w, h, age, act) { return bmr(sex, w, h, age) * (ACT[act] || 1.2); }
  /* goal: lose | gain | keep. Calories never below the usual safe floors (1200 women / 1500 men). */
  function targets(sex, w, h, age, act, goal) {
    var t = tdee(sex, w, h, age, act), floor = sex === "m" ? 1500 : 1200, kcal = t, note = "";
    if (goal === "lose") { kcal = Math.max(floor, t - 450); note = "deficit"; }
    else if (goal === "gain") { kcal = t + 300; note = "surplus"; }
    var lo = goal === "keep" ? 0.8 : 1.6, hi = goal === "keep" ? 1.6 : 2.2; /* Morton 2018: 1.6 g/kg plateau, upper CI 2.2 */
    var water = sex === "m" ? 2.5 : 2.0; /* EFSA total water adequate intake, litres (includes food) */
    return { bmr: Math.round(bmr(sex, w, h, age)), tdee: Math.round(t), kcal: Math.round(kcal / 10) * 10, proteinLo: Math.round(lo * w), proteinHi: Math.round(hi * w), water: water, note: note };
  }

  /* ---------- blood pressure (ESC/ESH 2018 office categories) ---------- */
  function bpCat(s, d) {
    if (s >= 180 || d >= 110) return "grade3";
    if (s >= 160 || d >= 100) return "grade2";
    if (s >= 140 || d >= 90) return "grade1";
    if (s >= 130 || d >= 85) return "highnormal";
    if (s >= 120 || d >= 80) return "normal";
    if (s < 90 || d < 60) return "low";
    return "optimal";
  }

  /* ---------- FINDRISC (Lindstrom & Tuomilehto 2003) ---------- */
  function findrisc(a) { /* a: {age,bmi,sex,waist,active(bool),veg(bool daily),bpMeds(bool),highGlucose(bool),family:0|1|2} */
    var p = 0;
    p += a.age >= 65 ? 4 : a.age >= 55 ? 3 : a.age >= 45 ? 2 : 0;
    p += a.bmi > 30 ? 3 : a.bmi >= 25 ? 1 : 0;
    var w1 = a.sex === "m" ? 94 : 80, w2 = a.sex === "m" ? 102 : 88;
    p += a.waist > w2 ? 4 : a.waist >= w1 ? 3 : 0;
    p += a.active ? 0 : 2;
    p += a.veg ? 0 : 1;
    p += a.bpMeds ? 2 : 0;
    p += a.highGlucose ? 5 : 0;
    p += a.family === 2 ? 5 : a.family === 1 ? 3 : 0;
    var level = p < 7 ? "low" : p < 12 ? "slight" : p < 15 ? "moderate" : p <= 20 ? "high" : "veryhigh";
    var risk = { low: 1, slight: 4, moderate: 17, high: 33, veryhigh: 50 }[level];
    return { score: p, level: level, risk10y: risk };
  }

  /* ---------- PHQ-9 / GAD-7 (public domain, Pfizer) ---------- */
  function phq9(s) {
    var t = 0, i; for (i = 0; i < 9; i++) t += s[i];
    return { total: t, level: t < 5 ? "minimal" : t < 10 ? "mild" : t < 15 ? "moderate" : t < 20 ? "modsevere" : "severe", item9: s[8] };
  }
  function gad7(s) {
    var t = 0, i; for (i = 0; i < 7; i++) t += s[i];
    return { total: t, level: t < 5 ? "minimal" : t < 10 ? "mild" : t < 15 ? "moderate" : "severe" };
  }
  /* ---------- ASRM (Altman 1997): 5 items scored 0-4, >=6 = high probability of manic/hypomanic state ---------- */
  function asrm(s) { var t = 0, i; for (i = 0; i < 5; i++) t += s[i]; return { total: t, positive: t >= 6 }; }
  /* ---------- PQ-16 (Ising 2012): count of TRUE answers, >=6 positive ---------- */
  function pq16(t, distress) {
    var n = 0, d = 0, i; for (i = 0; i < 16; i++) { if (t[i]) { n++; d += (distress && distress[i]) || 0; } }
    return { count: n, distress: d, positive: n >= 6 };
  }

  /* ---------- PSC-17 (Gardner 1999), parent report, each item 0-2 ---------- */
  /* item order used on the page (Maryland form order) */
  var PSC_ORDER = ["Fidgety, unable to sit still", "Feels sad, unhappy", "Daydreams too much", "Refuses to share", "Does not understand other people's feelings", "Feels hopeless", "Has trouble concentrating", "Fights with other children", "Is down on him or herself", "Blames others for his or her trouble", "Seems to be having less fun", "Does not listen to rules", "Acts as if driven by a motor", "Teases others", "Worries a lot", "Takes things that do not belong to him or her", "Distracted easily"];
  var PSC_INT = [1, 5, 8, 10, 14];   /* sad, hopeless, down on self, less fun, worries */
  var PSC_ATT = [0, 2, 6, 12, 16];   /* fidgety, daydreams, concentrating, driven by motor, distracted */
  var PSC_EXT = [3, 4, 7, 9, 11, 13, 15]; /* refuses to share, others' feelings, fights, blames, rules, teases, takes things */
  function psc17(s) {
    var sum = function (ix) { var t = 0; ix.forEach(function (i) { t += s[i]; }); return t; };
    var tot = 0, i; for (i = 0; i < 17; i++) tot += s[i];
    var a = sum(PSC_INT), b = sum(PSC_ATT), c = sum(PSC_EXT);
    return { total: tot, internalizing: a, attention: b, externalizing: c, positiveTotal: tot >= 15, positiveInt: a >= 5, positiveAtt: b >= 7, positiveExt: c >= 7, positive: tot >= 15 || a >= 5 || b >= 7 || c >= 7 };
  }

  /* ---------- Big Five (IPIP 50-item Big-Five Factor Markers, public domain). answers 1-5 ---------- */
  var B5 = { /* trait: [[itemIndex, reversed]] ; item order is the page order 0..49 */
    E: [[0, 0], [1, 1], [2, 0], [3, 1], [4, 0], [5, 1], [6, 0], [7, 1], [8, 0], [9, 1]],
    N: [[10, 0], [11, 1], [12, 0], [13, 1], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0]],
    A: [[20, 1], [21, 0], [22, 1], [23, 0], [24, 1], [25, 0], [26, 1], [27, 0], [28, 0], [29, 0]],
    C: [[30, 0], [31, 1], [32, 0], [33, 1], [34, 0], [35, 1], [36, 0], [37, 1], [38, 0], [39, 0]],
    O: [[40, 0], [41, 1], [42, 0], [43, 1], [44, 0], [45, 1], [46, 0], [47, 0], [48, 0], [49, 0]]
  };
  function big5(a) {
    var out = {}; Object.keys(B5).forEach(function (k) {
      var t = 0; B5[k].forEach(function (p) { var v = a[p[0]]; t += p[1] ? 6 - v : v; });
      var m = t / 10; out[k] = { sum: t, mean: r1(m), level: m < 2.4 ? "low" : m <= 3.6 ? "mid" : "high" };
    }); return out;
  }

  var api = { bmi: bmi, bmiCat: bmiCat, whtr: whtr, whtrCat: whtrCat, navyBF: navyBF, bfCat: bfCat, bmr: bmr, tdee: tdee, targets: targets, bpCat: bpCat, findrisc: findrisc, phq9: phq9, gad7: gad7, asrm: asrm, pq16: pq16, psc17: psc17, PSC_ORDER: PSC_ORDER, big5: big5, ACT: ACT, r1: r1 };
  root.AC = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
