/* HealthLife simulator page. Lead gate -> AI image via Worker (free Workers AI) -> on-device fallback. Photo is never stored. */
(function () {
  "use strict";
  var API = "https://healthlife-pay.abdelrahmansarya90.workers.dev", WA = "201050747891", LIMIT = 5;
  var MP = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";
  var SEG_MODEL = "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite";
  var POSE_MODEL = "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";
  var MAXSIDE = 960;

  var S = {
    en: {
      title: "Body Transformation Simulator | HealthLife",
      h1: "See Your Future Self", sub: "Enter your numbers, add a photo, choose your goal, and see an illustration of how you could look.",
      privacy: "Your photo is used only to create your result. It is not saved, not shared and not used for anything else.",
      g_h: "Start your free simulation", g_p: "Enter your details to see your result. It is free.", g_name: "Your name", g_phone: "WhatsApp number (with country code)", g_email: "Email (optional)",
      g_agree: "I agree that the coach may contact me on WhatsApp about my result.", g_go: "Continue", f_age: "Age",
      e_name: "Please enter your name.", e_phone: "Please enter a valid WhatsApp number (digits only, country code is chosen on the left).", e_email: "This email does not look right.", e_gagree: "Please tick the box to continue.", e_age: "Please enter your age (18 to 90).",
      e_server: "The service is busy right now. Please try again in a minute.",
      st_ai: "Creating your image (10 to 30 seconds)...", disc_local: "This is a computer illustration of a body shape change. It is not a guarantee. Results vary from person to person. If you have a health condition, ask your doctor first.",
      f_nums: "1. Your numbers (your starting point: \"Before\")", f_h: "Height (cm)", f_w: "Current weight (kg)",
      bmi_your: "Your BMI", c_under: "Under", c_norm: "Healthy", c_over: "Over", c_obese: "Obese",
      cat_under: "Underweight", cat_norm: "Healthy weight", cat_over: "Overweight", cat_obese: "Obese",
      bmi_range: "Healthy weight for your height: {a} to {b} kg",
      bmi_note: "BMI is a general screening number. It does not separate muscle from fat, so athletes and very muscular people can read high.",
      f_photo: "2. Your photo (standing, front view, head to feet)", f_photo_btn: "Tap to choose a photo or take one",
      f_photo_tip: "Tip: good light, plain background, fitted clothes, arms slightly away from the body.",
      f_goal: "3. Your goal", g_lose: "Lose weight", g_muscle: "Build muscle", g_gain: "Gain weight",
      f_kg_lose: "How many kg do you want to lose?", f_kg_gain: "How many kg do you want to gain?",
      tgt: "Target weight: {t} kg  (BMI {b})",
      agree: "I am 18 or older. I agree that my photo is sent securely to create the image and is not saved. I understand this is only an illustration and not a promise or a medical prediction. Real results depend on nutrition, training and genetics.",
      go: "Show my result", before: "Before", after: "After (simulation)", drag: "Drag the line to compare.",
      cta_plan: "Start my real plan", wa_btn: "Chat with the coach", dl: "Save image", again: "Try another goal",
      disc: "This is an AI-generated illustration of a body shape change. It is not a guarantee. Results vary from person to person. If you have a health condition, ask your doctor first.",
      lim_h: "You used all your tries", lim_p: "Each device can run the simulator {n} times. Talk to the coach to get your real plan.",
      left: "Tries left: {n} of {m}",
      st_load: "Loading the body detector (first time only, a few seconds)...", st_detect: "Analysing your photo on your device...", st_draw: "Drawing your result...",
      r_before: "Before", r_after: "After", r_bmi: "BMI", r_weight: "Weight", r_time: "Safe pace estimate", r_weeks: "{a} to {b} weeks",
      r_change_lose: "Target: -{k} kg", r_change_gain: "Target: +{k} kg",
      e_photo: "Please choose a photo first.", e_nums: "Please enter your height and weight.", e_kg: "Please enter how many kg.", e_agree: "Please tick the confirmation box.",
      e_bad_body: "Check your numbers: height 120-230 cm and weight 35-250 kg.", e_too_small: "Please enter at least 0.5 kg.",
      e_lose_too_much: "That is too large for one simulation (maximum 25% of your weight or 40 kg). Try a smaller number.",
      e_bmi_low: "That target is below the healthy range, so we cannot show it. Please choose a smaller loss.",
      e_gain_too_much: "That gain is above the allowed limit (20 kg, or 12 kg for muscle).", e_bmi_high: "That target is higher than the range we simulate. Please choose a smaller gain.",
      e_nopose: "We could not see your full body. Use a standing, front-facing photo that shows from head to at least the knees.",
      e_load: "Could not load the body detector. Check your internet connection and try again.", e_busy: "Please wait, working...",
      wa_msg: "Hello Coach, I tried the body simulator. My goal: {g} {k} kg (from {w} to {t} kg, BMI {b1} to {b2}). I want to start my plan.{r}",
      gw_lose: "lose", gw_gain: "gain", gw_muscle: "gain (muscle)"
    },
    ar: {
      title: "محاكي التحول الجسدي | HealthLife",
      h1: "شوف نفسك بعد التغيير", sub: "اكتب بياناتك، ضيف صورتك، اختار هدفك، وشوف رسم توضيحي لشكلك المتوقع.",
      privacy: "صورتك بتُستخدم بس عشان نعمل نتيجتك. مش بتتحفظ ولا بتتشارك ولا بتُستخدم في أي حاجة تانية.",
      g_h: "ابدأ محاكاتك المجانية", g_p: "اكتب بياناتك عشان تشوف نتيجتك. مجاني.", g_name: "اسمك", g_phone: "رقم الواتساب (مع كود الدولة)", g_email: "الإيميل (اختياري)",
      g_agree: "أوافق إن الكابتن يتواصل معايا على الواتساب بخصوص نتيجتي.", g_go: "كمّل", f_age: "العمر",
      e_name: "اكتب اسمك.", e_phone: "اكتب رقم واتساب صحيح (أرقام بس، وكود الدولة بتختاره من الجنب).", e_email: "الإيميل شكله مش مظبوط.", e_gagree: "علّم على المربع عشان تكمّل.", e_age: "اكتب عمرك (من 18 لـ 90).",
      e_server: "الخدمة مشغولة دلوقتي. جرّب تاني بعد دقيقة.",
      st_ai: "بنجهّز صورتك (من 10 لـ 30 ثانية)...", disc_local: "ده رسم بالكمبيوتر لتغيّر شكل الجسم، مش ضمان. النتايج بتختلف من شخص لشخص. لو عندك مشكلة صحية، استشر دكتورك الأول.",
      f_nums: "1. بياناتك (نقطة البداية: \"قبل\")", f_h: "الطول (سم)", f_w: "الوزن الحالي (كجم)",
      bmi_your: "مؤشر كتلة جسمك BMI", c_under: "نحافة", c_norm: "صحي", c_over: "زيادة", c_obese: "سمنة",
      cat_under: "وزن ناقص", cat_norm: "وزن صحي", cat_over: "وزن زائد", cat_obese: "سمنة",
      bmi_range: "الوزن الصحي لطولك: من {a} إلى {b} كجم",
      bmi_note: "مؤشر BMI رقم عام للفحص المبدئي. مش بيفرّق بين العضل والدهون، فالرياضيين وأصحاب العضلات الكبيرة ممكن يطلع عندهم رقم عالي.",
      f_photo: "2. صورتك (واقف، من الأمام، من الراس للرجلين)", f_photo_btn: "اضغط لاختيار صورة أو التقاط واحدة",
      f_photo_tip: "نصيحة: إضاءة كويسة، خلفية سادة، لبس مناسب للجسم، والإيدين بعيدة شوية عن الجسم.",
      f_goal: "3. هدفك", g_lose: "خسارة وزن", g_muscle: "بناء عضل", g_gain: "زيادة وزن",
      f_kg_lose: "عايز تخسّس كام كيلو؟", f_kg_gain: "عايز تزوّد كام كيلو؟",
      tgt: "الوزن المستهدف: {t} كجم  (BMI {b})",
      agree: "عمري 18 سنة أو أكتر. وموافق إن صورتي تتبعت بشكل آمن عشان تتعمل الصورة وإنها مش بتتحفظ. وفاهم إن ده رسم توضيحي بس، مش وعد ولا توقع طبي. النتيجة الحقيقية بتعتمد على الأكل والتمرين والجينات.",
      go: "اعرض نتيجتي", before: "قبل", after: "بعد (محاكاة)", drag: "اسحب الخط للمقارنة.",
      cta_plan: "ابدأ خطتي الحقيقية", wa_btn: "كلّم الكابتن", dl: "احفظ الصورة", again: "جرّب هدف تاني",
      disc: "ده رسم بالذكاء الاصطناعي لتغيّر شكل الجسم، مش ضمان. النتايج بتختلف من شخص لشخص. لو عندك مشكلة صحية، استشر دكتورك الأول.",
      lim_h: "خلّصت محاولاتك", lim_p: "كل جهاز يقدر يجرّب المحاكي {n} مرات. كلّم الكابتن عشان تبدأ خطتك الحقيقية.",
      left: "المحاولات المتبقية: {n} من {m}",
      st_load: "بنحمّل كاشف الجسم (أول مرة بس، ثواني)...", st_detect: "بنحلل صورتك على جهازك...", st_draw: "بنرسم نتيجتك...",
      r_before: "قبل", r_after: "بعد", r_bmi: "BMI", r_weight: "الوزن", r_time: "تقدير بسرعة آمنة", r_weeks: "من {a} إلى {b} أسبوع",
      r_change_lose: "الهدف: -{k} كجم", r_change_gain: "الهدف: +{k} كجم",
      e_photo: "اختار صورة الأول.", e_nums: "اكتب طولك ووزنك.", e_kg: "اكتب عدد الكيلوهات.", e_agree: "علّم على مربع الموافقة.",
      e_bad_body: "راجع أرقامك: الطول 120-230 سم والوزن 35-250 كجم.", e_too_small: "اكتب 0.5 كجم على الأقل.",
      e_lose_too_much: "الرقم ده كبير على محاكاة واحدة (الحد الأقصى 25% من وزنك أو 40 كجم). جرّب رقم أصغر.",
      e_bmi_low: "الهدف ده أقل من النطاق الصحي، فمش هنعرضه. اختار خسارة أقل.",
      e_gain_too_much: "الزيادة دي فوق الحد المسموح (20 كجم، أو 12 كجم للعضل).", e_bmi_high: "الهدف ده أعلى من النطاق اللي بنحاكيه. اختار زيادة أقل.",
      e_nopose: "ما قدرناش نشوف جسمك كامل. استخدم صورة واقف من الأمام تبيّن من الراس لحد الركبة على الأقل.",
      e_load: "ما قدرناش نحمّل كاشف الجسم. اتأكد من الإنترنت وجرّب تاني.", e_busy: "استنى شوية، جاري العمل...",
      wa_msg: "مرحبًا كابتن، جرّبت محاكي الجسم. هدفي: {g} {k} كجم (من {w} إلى {t} كجم، BMI من {b1} إلى {b2}). عايز أبدأ خطتي.{r}",
      gw_lose: "خسارة", gw_gain: "زيادة", gw_muscle: "زيادة (عضل)"
    }
  };

  var $ = function (id) { return document.getElementById(id); };
  function lang() { return document.documentElement.lang === "ar" ? "ar" : "en"; }
  function t(k, v) { var s = (S[lang()][k] !== undefined ? S[lang()][k] : S.en[k]) || k; if (v) for (var p in v) s = s.split("{" + p + "}").join(v[p]); return s; }
  function r1(n) { return Math.round(n * 10) / 10; }

  var qs = new URLSearchParams(location.search);
  var ref = (qs.get("ref") || "").replace(/[^\w\- .]/g, "").slice(0, 30);
  var img = null, work = null, analysis = null, busy = false, lastRes = null;

  /* ---------- texts ---------- */
  function applyTexts() {
    document.title = t("title");
    document.querySelectorAll("[data-s]").forEach(function (el) { var k = el.getAttribute("data-s"); if (S[lang()][k] !== undefined) el.textContent = S[lang()][k]; });
    var goal = currentGoal();
    var lab = document.querySelector('label[for="kg"]'); if (lab) lab.textContent = t(goal === "lose" ? "f_kg_lose" : "f_kg_gain");
    var lp = document.querySelector('[data-s="lim_p"]'); if (lp) lp.textContent = t("lim_p", { n: LIMIT });
    updateBmi(); updateTarget(); updateLeft(); setWaLinks();
    if (lastRes) renderStats(lastRes);
  }
  new MutationObserver(function () { applyTexts(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  /* ---------- BMI ---------- */
  function bmiOf(w, h) { var m = h / 100; return w / (m * m); }
  function catOf(b) { return b < 18.5 ? ["under", "#4aa3ff"] : b < 25 ? ["norm", "#3fbf4a"] : b < 30 ? ["over", "#f5c542"] : ["obese", "#ff6b5b"]; }
  function num(id) { var v = parseFloat(($(id).value || "").replace(",", ".")); return isFinite(v) ? v : NaN; }
  function updateBmi() {
    var h = num("h"), w = num("w"), box = $("bmiBox");
    if (!(h >= 100 && h <= 250 && w >= 25 && w <= 300)) { box.hidden = true; return; }
    var b = bmiOf(w, h), c = catOf(b), m = h / 100;
    box.hidden = false;
    $("bmiVal").textContent = r1(b).toFixed(1);
    var el = $("bmiCat"); el.textContent = t("cat_" + c[0]); el.style.background = c[1];
    $("pin").style.left = "calc(" + Math.min(99, Math.max(0, b / 40 * 100)) + "% - 2px)";
    $("bmiRange").textContent = t("bmi_range", { a: r1(18.5 * m * m).toFixed(1), b: r1(24.9 * m * m).toFixed(1) });
  }
  function currentGoal() { var r = document.querySelector('input[name="goal"]:checked'); return r ? r.value : "lose"; }
  function deltaKg() { var k = num("kg"); if (!(k > 0)) return NaN; return currentGoal() === "lose" ? -k : k; }
  function updateTarget() {
    var h = num("h"), w = num("w"), d = deltaKg(), el = $("tgt");
    if (!(h >= 100 && w >= 25 && isFinite(d))) { el.textContent = ""; return; }
    el.innerHTML = "";
    var b = document.createElement("b"); b.textContent = t("tgt", { t: r1(w + d), b: r1(bmiOf(w + d, h)).toFixed(1) });
    el.appendChild(b);
  }
  ["h", "w", "kg"].forEach(function (id) { $(id).addEventListener("input", function () { updateBmi(); updateTarget(); }); });
  document.querySelectorAll('input[name="goal"]').forEach(function (r) {
    r.addEventListener("change", function () {
      document.querySelectorAll("#goals label").forEach(function (l) { l.classList.toggle("on", l.querySelector("input").checked); });
      applyTexts();
    });
  });
  document.querySelectorAll(".chip").forEach(function (c) { c.addEventListener("click", function () { $("kg").value = c.getAttribute("data-kg"); updateTarget(); }); });

  /* prefill from a coach link: ?goal=lose&kg=8&h=175&w=90&ref=Ahmed */
  (function () {
    var g = qs.get("goal"); if (g === "lose" || g === "gain" || g === "muscle") { var r = document.querySelector('input[name="goal"][value="' + g + '"]'); if (r) { r.checked = true; document.querySelectorAll("#goals label").forEach(function (l) { l.classList.toggle("on", l.querySelector("input").checked); }); } }
    var m = { kg: "kg", h: "h", w: "w" };
    for (var k in m) { var v = parseFloat(qs.get(k)); if (isFinite(v) && v > 0 && v < 400) $(m[k]).value = v; }
  })();

  /* ---------- photo ---------- */
  $("drop").addEventListener("click", function () { $("file").click(); });
  $("file").addEventListener("change", function () {
    var f = this.files && this.files[0]; if (!f) return;
    var url = URL.createObjectURL(f), im = new Image();
    im.onload = function () {
      var sc = Math.min(1, MAXSIDE / Math.max(im.naturalWidth, im.naturalHeight));
      work = document.createElement("canvas"); work.width = Math.round(im.naturalWidth * sc); work.height = Math.round(im.naturalHeight * sc);
      work.getContext("2d").drawImage(im, 0, 0, work.width, work.height);
      img = im; analysis = null;
      var th = $("thumb"); th.src = work.toDataURL("image/jpeg", 0.6); th.hidden = false;
      URL.revokeObjectURL(url);
    };
    im.onerror = function () { URL.revokeObjectURL(url); };
    im.src = url;
  });

  /* ---------- lead gate + attempts ---------- */
  var TOKEN = ""; try { TOKEN = localStorage.getItem("hl_sim_tok") || ""; } catch (e) {}
  function localCount() { try { return parseInt(localStorage.getItem("hl_sim_n") || "0", 10) || 0; } catch (e) { return 0; } }
  function localSet(n) { try { localStorage.setItem("hl_sim_n", String(n)); } catch (e) {} }
  function localInc() { localSet(localCount() + 1); }
  function isUnl() { try { return localStorage.getItem("hl_sim_unl") === "1"; } catch (e) { return false; } }
  function updateLeft() { $("left").textContent = isUnl() ? "" : t("left", { n: Math.max(0, LIMIT - localCount()), m: LIMIT }); }
  function showLimit() { $("limitBox").hidden = false; $("formBox").hidden = true; $("gate").hidden = true; $("result").hidden = true; setWaLinks(); }
  function showGate() { $("gate").hidden = false; $("formBox").hidden = true; $("limitBox").hidden = true; $("result").hidden = true; }
  function showForm() { $("gate").hidden = true; $("formBox").hidden = false; $("limitBox").hidden = true; }
  function gErr(k) { var e = $("gErr"); if (!k) { e.hidden = true; return; } e.textContent = t(k); e.hidden = false; }
  (function () { var n = $("gName"); if (ref && !n.value) n.value = ref; })();

  $("gGo").addEventListener("click", async function () {
    gErr(null);
    var name = $("gName").value.trim(), cc = $("gCc").value, raw = $("gPhone").value.trim(), email = $("gEmail").value.trim();
    var digits = raw.replace(/\D/g, "");
    if (/^(\+|00)/.test(raw) && digits.replace(/^0+/, "").indexOf(cc) === 0) digits = digits.replace(/^0+/, "").slice(cc.length);
    digits = digits.replace(/^0+/, "");
    var phone = "+" + cc + digits;
    if (name.length < 2) return gErr("e_name");
    if (!/^\+\d{8,15}$/.test(phone) || (cc === "20" && !/^1\d{9}$/.test(digits))) return gErr("e_phone");
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return gErr("e_email");
    if (!$("gAgree").checked) return gErr("e_gagree");
    var btn = $("gGo"); btn.disabled = true;
    try {
      var r = await fetch(API + "/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name, phone: phone, email: email, ref: ref, lang: lang() }) });
      var d = null; try { d = await r.json(); } catch (e) {}
      if (!r.ok || !d || !d.token) { var er = d && d.error; return gErr(er === "bad_phone" ? "e_phone" : er === "bad_email" ? "e_email" : er === "bad_name" ? "e_name" : "e_server"); }
      TOKEN = d.token; try { localStorage.setItem("hl_sim_tok", TOKEN); } catch (e) {}
      showForm(); window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) { gErr("e_server"); }
    finally { btn.disabled = false; }
  });

  /* asks the Worker for an AI-made "after" image. Returns {limit:true} | {need:true} | {img:Image,left:n} | {fallback:true} */
  async function aiAfter(p) {
    var sc = Math.min(1, 480 / Math.max(work.width, work.height)), c = document.createElement("canvas");
    c.width = Math.max(64, Math.round(work.width * sc)); c.height = Math.max(64, Math.round(work.height * sc));
    c.getContext("2d").drawImage(work, 0, 0, c.width, c.height);
    var r, d;
    try {
      r = await fetch(API + "/sim/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: TOKEN, kind: p.kind, deltaKg: p.d, weightKg: p.w, heightCm: p.h, age: p.age, w: c.width, h: c.height, image: c.toDataURL("image/jpeg", 0.85).split(",")[1] }) });
    } catch (e) { return localCount() >= LIMIT && !isUnl() ? { limit: true } : { fallback: true, offline: true }; }
    if (r.status === 401) return { need: true };
    try { d = await r.json(); } catch (e) { return { fallback: true, offline: true }; }
    if (d && d.ok === false) return { limit: true };
    if (!r.ok || !d) return { fallback: true, offline: true };
    if (typeof d.limit === "number") LIMIT = d.limit;
    try { if (d.unlimited) localStorage.setItem("hl_sim_unl", "1"); else localStorage.removeItem("hl_sim_unl"); } catch (e) {}
    var left = typeof d.remaining === "number" ? d.remaining : null;
    if (d.unlimited) localSet(0); else if (left !== null) localSet(LIMIT - left); else localInc();
    updateLeft();
    if (d.image) {
      var src = String(d.image); if (src.indexOf("data:") !== 0) src = "data:image/png;base64," + src;
      try {
        var im = await new Promise(function (ok, no) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = no; i.src = src; });
        return { img: im };
      } catch (e) { /* unreadable image: use fallback */ }
    }
    return { fallback: true };
  }

  /* ---------- detector (MediaPipe, loaded only when needed) ---------- */
  var detectors = null;
  /* detector files: first from this website (folder "mp"), then from the public CDN as a backup */
  var SOURCES = [
    { js: "mp/vision_bundle.mjs", wasm: "mp/wasm", seg: "mp/selfie_segmenter.tflite", pose: "mp/pose_landmarker_lite.task" },
    { js: MP + "/vision_bundle.mjs", wasm: MP + "/wasm", seg: SEG_MODEL, pose: POSE_MODEL }
  ];
  function abs(u) { return new URL(u, document.baseURI).href; }
  async function loadFrom(src) {
    var vision = await import(abs(src.js));
    var fileset = await vision.FilesetResolver.forVisionTasks(abs(src.wasm));
    var pose = await vision.PoseLandmarker.createFromOptions(fileset, { baseOptions: { modelAssetPath: abs(src.pose) }, runningMode: "IMAGE", numPoses: 1 });
    var seg = await vision.ImageSegmenter.createFromOptions(fileset, { baseOptions: { modelAssetPath: abs(src.seg) }, runningMode: "IMAGE", outputCategoryMask: true, outputConfidenceMasks: false });
    return { pose: pose, seg: seg };
  }
  async function loadDetectors() {
    if (detectors) return detectors;
    var lastErr;
    for (var i = 0; i < SOURCES.length; i++) {
      try { detectors = await loadFrom(SOURCES[i]); return detectors; } catch (e) { lastErr = e; }
    }
    throw lastErr || new Error("load");
  }
  async function analyze() {
    if (analysis) return analysis;
    var w = work.width, h = work.height, d = await loadDetectors();
    var pr = d.pose.detect(work);
    var lm = pr && pr.landmarks && pr.landmarks[0];
    if (!lm || lm.length < 29) throw new Error("nopose");
    var sh = (lm[11].y + lm[12].y) / 2, hp = (lm[23].y + lm[24].y) / 2;
    if (!(hp > sh + 0.04) || lm[0].y > sh) throw new Error("nopose");
    var sr = d.seg.segment(work), cm = sr.categoryMask, arr = cm.getAsUint8Array(), mw = cm.width, mh = cm.height;
    var cxh = Math.min(mw - 1, Math.max(0, Math.round((lm[23].x + lm[24].x) / 2 * mw))), cyh = Math.min(mh - 1, Math.max(0, Math.round(hp * mh)));
    var personVal = arr[cyh * mw + cxh], mask = new Uint8Array(w * h), cnt = 0, x, y;
    for (y = 0; y < h; y++) { var sy = Math.min(mh - 1, Math.floor(y * mh / h)); for (x = 0; x < w; x++) { var sx = Math.min(mw - 1, Math.floor(x * mw / w)); if (arr[sy * mw + sx] === personVal) { mask[y * w + x] = 1; cnt++; } } }
    try { sr.close(); } catch (e) {}
    if (cnt < w * h * 0.04) throw new Error("nopose");
    analysis = { mask: mask, lm: lm, src: work.getContext("2d").getImageData(0, 0, w, h) };
    return analysis;
  }

  /* ---------- run ---------- */
  function showErr(k) { var e = $("err"); if (!k) { e.hidden = true; return; } e.textContent = t(k); e.hidden = false; }
  function status(k) { var s = $("status"); if (!k) { s.hidden = true; return; } s.textContent = t(k); s.hidden = false; }

  $("go").addEventListener("click", async function () {
    if (busy) return;
    showErr(null);
    var h = num("h"), w = num("w"), age = num("age"), kind = currentGoal(), d = deltaKg();
    if (!TOKEN) return showGate();
    if (!work) return showErr("e_photo");
    if (!(age >= 18 && age <= 90)) return showErr("e_age");
    if (!(h > 0 && w > 0)) return showErr("e_nums");
    if (!isFinite(d)) return showErr("e_kg");
    if (!$("agree").checked) return showErr("e_agree");
    var chk = SimCore.checkLimits({ heightCm: h, weightKg: w, deltaKg: d, kind: kind });
    if (!chk.ok) return showErr("e_" + chk.reason);
    busy = true; $("go").disabled = true;
    try {
      status("st_ai");
      var res = await aiAfter({ kind: kind, d: d, w: w, h: h, age: age });
      if (res.need) { TOKEN = ""; try { localStorage.removeItem("hl_sim_tok"); } catch (e) {} status(null); return showGate(); }
      if (res.limit) { localSet(LIMIT); updateLeft(); return showLimit(); }
      var mode = "ai", a;
      if (res.fallback) {
        mode = "local";
        if (res.offline) { localInc(); updateLeft(); }
        status(detectors ? "st_detect" : "st_load");
        try { a = await analyze(); } catch (e) { status(null); return showErr(String(e.message) === "nopose" ? "e_nopose" : "e_load"); }
        status("st_draw");
        await new Promise(function (r) { setTimeout(r, 30); });
        var out = SimCore.warp(a.src.data, work.width, work.height, a.mask, a.lm, { kind: kind, weightKg: w, deltaKg: d });
        draw(work.getContext("2d").getImageData(0, 0, work.width, work.height), new ImageData(out, work.width, work.height));
      } else {
        draw(work.getContext("2d").getImageData(0, 0, work.width, work.height), res.img);
      }
      document.querySelector("#result [data-s^='disc']").setAttribute("data-s", mode === "ai" ? "disc" : "disc_local");
      lastRes = { h: h, w: w, d: d, kind: kind, mode: mode, b1: bmiOf(w, h), b2: bmiOf(w + d, h), weeks: SimCore.estimateWeeks(d, kind) };
      applyTexts();
      $("result").hidden = false; $("formBox").hidden = true; status(null);
      $("result").scrollIntoView({ behavior: "smooth", block: "start" });
    } finally { busy = false; $("go").disabled = false; status(null); }
  });

  function draw(srcData, after) { /* after: ImageData or an Image element */
    var w = work.width, h = work.height, cb = $("cBefore"), ca = $("cAfter");
    cb.width = ca.width = w; cb.height = ca.height = h;
    cb.getContext("2d").putImageData(srcData, 0, 0);
    var g = ca.getContext("2d"); if (after instanceof ImageData) g.putImageData(after, 0, 0); else g.drawImage(after, 0, 0, w, h);
    mark(g, w, h);
    setSlider(50);
  }
  function mark(g, w, h) {
    var fs = Math.max(12, Math.round(w / 34)); g.save(); g.font = "700 " + fs + "px Arial,sans-serif"; g.textBaseline = "bottom";
    var txt = "HealthLife simulation - illustration only", pad = fs * 0.5, tw = g.measureText(txt).width;
    g.fillStyle = "rgba(0,0,0,.55)"; g.fillRect(pad / 2, h - fs - pad * 1.5, tw + pad, fs + pad);
    g.fillStyle = "#c6ee0a"; g.fillText(txt, pad, h - pad); g.restore();
  }
  function setSlider(v) { $("slider").value = v; $("topWrap").style.clipPath = "inset(0 0 0 " + v + "%)"; $("bar").style.left = "calc(" + v + "% - 1px)"; }
  $("slider").addEventListener("input", function () { setSlider(this.value); });

  function renderStats(r) {
    var c1 = catOf(r.b1), c2 = catOf(r.b2), box = $("stats"), w2 = r1(r.w + r.d);
    box.innerHTML = "";
    function card(big, small, color) { var d = document.createElement("div"); d.className = "stat"; var b = document.createElement("b"); b.textContent = big; if (color) b.style.color = color; var s = document.createElement("span"); s.textContent = small; d.appendChild(b); d.appendChild(s); box.appendChild(d); }
    card(r1(r.b1).toFixed(1) + " → " + r1(r.b2).toFixed(1), t("r_bmi") + " (" + t("cat_" + c1[0]) + " → " + t("cat_" + c2[0]) + ")", c2[1]);
    card(r1(r.w) + " → " + w2 + " kg", t("r_weight") + " (" + t(r.d < 0 ? "r_change_lose" : "r_change_gain", { k: r1(Math.abs(r.d)) }) + ")");
    card(t("r_weeks", { a: r.weeks[0], b: r.weeks[1] }), t("r_time"));
  }

  /* ---------- WhatsApp + save + again ---------- */
  function waUrl(text) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(text); }
  function setWaLinks() {
    var text;
    if (lastRes) text = t("wa_msg", { g: t("gw_" + lastRes.kind), k: r1(Math.abs(lastRes.d)), w: r1(lastRes.w), t: r1(lastRes.w + lastRes.d), b1: r1(lastRes.b1).toFixed(1), b2: r1(lastRes.b2).toFixed(1), r: ref ? " (ref: " + ref + ")" : "" });
    else text = lang() === "ar" ? "مرحبًا كابتن، جرّبت محاكي الجسم وعايز أبدأ خطتي." : "Hello Coach, I tried the body simulator and I want to start my plan.";
    $("waRes").href = waUrl(text); $("waLimit").href = waUrl(text);
  }
  $("again").addEventListener("click", function () { var dd = document.querySelector("#result [data-s^='disc']"); if (dd) dd.setAttribute("data-s", "disc"); applyTexts(); $("result").hidden = true; $("formBox").hidden = false; window.scrollTo({ top: 0, behavior: "smooth" }); });
  $("dl").addEventListener("click", function () {
    var w = work.width, h = work.height, bar = Math.round(w / 12), c = document.createElement("canvas"); c.width = w * 2; c.height = h + bar;
    var g = c.getContext("2d"); g.fillStyle = "#00301f"; g.fillRect(0, 0, c.width, c.height);
    g.drawImage($("cBefore"), 0, bar); g.drawImage($("cAfter"), w, bar);
    g.fillStyle = "#f2fff0"; g.font = "700 " + Math.round(bar * 0.5) + "px Arial,sans-serif"; g.textBaseline = "middle"; g.textAlign = "center";
    g.fillText("Before", w / 2, bar / 2); g.fillStyle = "#c6ee0a"; g.fillText("After (simulation)", w * 1.5, bar / 2);
    c.toBlob(function (b) { var a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = "HealthLife-simulation.png"; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500); }, "image/png");
  });

  applyTexts();
  if (TOKEN) showForm(); else showGate();
})();
