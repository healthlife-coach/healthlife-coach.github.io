/* HealthLife screening page (client). Bilingual ar/en.
   The questionnaire and the instant safety alerts run here (free). The REPORT is built on the server only after payment.
   Health answers are sent to the server only to build your report; they are not stored there. */
(function () {
  "use strict";
  var AC = window.AC, AD = window.AD, API = "https://healthlife-pay.abdelrahmansarya90.workers.dev";
  var $ = function (i) { return document.getElementById(i); };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function num(v) { return v === "" || v == null ? NaN : Number(v); }
  function has(v) { return v !== undefined && v !== null && v !== "" && !(typeof v === "number" && isNaN(v)); }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k) || ""; if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} return ""; }
  var lang = document.documentElement.lang === "ar" ? "ar" : "en";
  function X(a, e) { return lang === "ar" ? a : e; }
  var state = { mods: [], steps: [], i: 0, a: {}, name: "", prices: { assess_one: 4, assess_full: 9 }, rate: 0, order: null };

  /* ---------- page texts ---------- */
  var UI = {
    ar: { hero_h: "الفحص الصحي الشامل", hero_p: "فحص مبدئي مبني على مقاييس علمية معتمدة، وتقرير مفصل بمؤشراتك وخطواتك التالية.", priv: "الأسئلة مجانية. التقرير المفصل يتحسب على السيرفر بعد الدفع، وإجاباتك الصحية مبتتخزنش عندنا. بنحفظ بس اسمك ورقم الواتساب عشان نتواصل معاك.", pick: "اختر ما تريد فحصه",
      m_body: "الصحة العامة والجسم", m_body_d: "مؤشرات الوزن والدهون والضغط وخطر السكري، وسعراتك ومياهك، وتحاليل تسأل عنها طبيبك.", m_psych: "الصحة النفسية (للبالغين)", m_psych_d: "مؤشرات الاكتئاب والقلق والطاقة المرتفعة والتجارب الإدراكية، مع إرشاد للخطوة التالية.", m_child: "صحة الطفل (4–17 سنة)", m_child_d: "يجاوب ولي الأمر: علامات الخطر، سلوك الطفل ومشاعره، ونومه وحركته.", m_pers: "تحليل الشخصية", m_pers_d: "نموذج الخمس عوامل الكبرى (50 سؤال)، وإزاي شخصيتك بتؤثر على التزامك بالأكل والتمرين.",
      data: "بياناتك", name: "اسمك", phone: "رقم الواتساب (مع كود الدولة)", email: "الإيميل (اختياري)", agree: "أفهم أن هذا فحص مبدئي للتوعية وليس تشخيصًا طبيًا ولا بديلًا عن الطبيب، وأن النتائج تعتمد على صدق إجاباتي. وأوافق أن يتواصل معي الكابتن على الواتساب. (الفحص النفسي للبالغين، وفحص الطفل لأولياء الأمور.)", start: "ابدأ الفحص", back: "السابق", next: "التالي", show: "اعرض النتيجة",
      price1: "وحدة واحدة", priceN: "الفحص الكامل (كل الوحدات)", priceNote: "الأسئلة مجانية، وتدفع فقط لفتح التقرير المفصل.", paidOK: "تم تأكيد دفعك. أجب عن الأسئلة وسيظهر تقريرك مباشرة.",
      errMod: "اختر وحدة واحدة على الأقل.", errAgree: "علّم على الموافقة للمتابعة.", errName: "اكتب اسمك.", errPhone: "اكتب رقم واتساب صحيح (أرقام فقط، وكود الدولة من القائمة).", errOne: "الدفعة دي تغطي وحدة واحدة فقط. اختر الوحدة المدفوعة.",
      step: "الخطوة", of: "من", fill: "من فضلك اكتب: ", between: "القيمة لازم تكون بين ", and: " و", answer: "من فضلك أجب عن: ", pickD: "اختر مدى الإزعاج في: ", yes: "نعم", no: "لا", t: "صح", f: "خطأ",
      lockH: "تقريرك جاهز ليفتح", lockP: "أجبت عن كل الأسئلة. لفتح التقرير المفصل (المؤشرات، التفسير، الخطوات المقترحة، المراجع، وملف PDF) ادفع مرة واحدة.", pay: "افتح التقرير", paying: "جاري تحويلك للدفع...", payErr: "تعذّر بدء الدفع. حاول مرة أخرى أو كلّمنا على واتساب.", free: "نتيجة مجانية الآن", bmiLine: "مؤشر كتلة جسمك (BMI): ", checking: "جاري تأكيد الدفع...", pending: "لسه الدفع مأكدش. لو دفعت، انتظر دقيقة وأعد تحميل الصفحة.", loading: "جاري تجهيز تقريرك...", repErr: "تعذّر إنشاء التقرير. تواصل معنا على واتساب وذكر رقم طلبك: ", again: "ابدأ فحصًا جديدًا", noAns: "تم تأكيد الدفع. ابدأ الفحص من جديد، وسيفتح تقريرك مباشرة بعد الأسئلة.", limit: "وصلت للحد الأقصى لعدد التقارير على هذا الطلب. تواصل معنا على واتساب.", notCov: "هذه الدفعة لا تغطي الوحدات المختارة.", usd: "دولار", ordRef: "رقم الطلب",
      bodyH: "بياناتك الأساسية", bodyN: "اكتب أرقامًا حقيقية. الدقة بتفرق في النتيجة." },
    en: { hero_h: "Complete Health Screening", hero_p: "An initial screening built on recognised scientific scales, with a detailed report of your indicators and next steps.", priv: "The questions are free. Your detailed report is built on our server after payment, and your health answers are not stored. We only save your name and WhatsApp number so we can contact you.", pick: "Choose what you want screened",
      m_body: "General health and body", m_body_d: "Weight, body fat, blood pressure and diabetes-risk indicators, your calories and water, and tests to ask your doctor about.", m_psych: "Mental health (adults)", m_psych_d: "Depression, anxiety, elevated energy and unusual-experience indicators, with guidance on the next step.", m_child: "Child health (ages 4-17)", m_child_d: "Answered by a parent: warning signs, behaviour and feelings, sleep and activity.", m_pers: "Personality analysis", m_pers_d: "The Big Five model (50 questions) and how your personality affects sticking to food and training.",
      data: "Your details", name: "Your name", phone: "WhatsApp number (with country code)", email: "Email (optional)", agree: "I understand this is an initial screening for awareness, not a medical diagnosis and not a substitute for a doctor, and that results depend on my honest answers. I agree the coach may contact me on WhatsApp. (The mental-health screen is for adults; the child screen is for parents.)", start: "Start the screening", back: "Back", next: "Next", show: "Show my result",
      price1: "Single module", priceN: "Full screening (all modules)", priceNote: "The questions are free; you pay only to unlock the detailed report.", paidOK: "Your payment is confirmed. Answer the questions and your report will appear right away.",
      errMod: "Choose at least one module.", errAgree: "Tick the agreement to continue.", errName: "Enter your name.", errPhone: "Enter a valid WhatsApp number (digits only; pick the country code from the list).", errOne: "This payment covers one module only. Choose the module you paid for.",
      step: "Step", of: "of", fill: "Please enter: ", between: "The value must be between ", and: " and ", answer: "Please answer: ", pickD: "Choose how distressing it is for: ", yes: "Yes", no: "No", t: "True", f: "False",
      lockH: "Your report is ready to unlock", lockP: "You answered every question. Pay once to unlock the detailed report (indicators, interpretation, suggested steps, references and a PDF).", pay: "Unlock my report", paying: "Taking you to payment...", payErr: "Could not start the payment. Try again or message us on WhatsApp.", free: "Free result now", bmiLine: "Your body mass index (BMI): ", checking: "Confirming your payment...", pending: "Payment is not confirmed yet. If you paid, wait a minute and reload the page.", loading: "Preparing your report...", repErr: "Could not build the report. Contact us on WhatsApp with your order number: ", again: "Start a new screening", noAns: "Payment confirmed. Start the screening again and your report will open right after the questions.", limit: "This order reached its maximum number of reports. Contact us on WhatsApp.", notCov: "This payment does not cover the selected modules.", usd: "USD", ordRef: "Order number",
      bodyH: "Your basic details", bodyN: "Enter real numbers. Accuracy changes the result." }
  };
  function U(k) { return UI[lang][k]; }
  function applyUI() {
    document.querySelectorAll("[data-u]").forEach(function (el) { var k = el.getAttribute("data-u"); if (UI[lang][k] !== undefined) el.textContent = UI[lang][k]; });
    var as = $("as"); as.dir = lang === "ar" ? "rtl" : "ltr"; $("phoneBox").dir = "ltr";
    document.title = lang === "ar" ? "الفحص الصحي الشامل | HealthLife" : "Complete Health Screening | HealthLife";
    showPrices();
  }
  function money(u) { return "$" + u + (state.rate && lang === "ar" ? " (≈ " + Math.ceil(u * state.rate).toLocaleString("ar-EG") + " جنيه)" : ""); }
  function showPrices() {
    var n = document.querySelectorAll(".mod input:checked").length, p = state.prices;
    var plan = n === 1 ? p.assess_one : p.assess_full;
    $("priceLine").innerHTML = "<b>" + (n === 1 ? U("price1") : U("priceN")) + ": " + money(plan) + "</b><br><span>" + U("priceNote") + "</span>";
    if (state.order) $("priceLine").innerHTML = "<b>" + U("paidOK") + "</b>";
  }

  /* ---------- steps (questions are public; labels come from AD) ---------- */
  var STEPS = [];
  function S(o) { STEPS.push(o); }
  function likertFields(prefix, texts, opts) { return texts.map(function (t, k) { return { id: prefix + k, t: "radio", label: (k + 1) + ". " + t, opts: opts.map(function (o, v) { return [v, o]; }), req: 1, compact: 1 }; }); }
  function makeSteps() {
    var D = AD[lang]; STEPS = [];
    var YN = [["1", U("yes")], ["0", U("no")]];
    S({ id: "body1", mod: "body", title: X("بياناتك الأساسية", "Your basic details"), note: U("bodyN"), fields: [
      { id: "sex", t: "radio", label: X("النوع", "Sex"), opts: [["m", X("ذكر", "Male")], ["f", X("أنثى", "Female")]], req: 1 },
      { id: "age", t: "num", label: X("العمر (سنة)", "Age (years)"), min: 18, max: 90, req: 1 },
      { id: "h", t: "num", label: X("الطول (سم)", "Height (cm)"), min: 120, max: 230, req: 1 },
      { id: "w", t: "num", label: X("الوزن (كجم)", "Weight (kg)"), min: 35, max: 250, step: "0.1", req: 1 },
      { id: "waist", t: "num", label: X("محيط الخصر (سم) — يُقاس عند مستوى السرة", "Waist circumference (cm) — measured at navel level"), min: 40, max: 200, req: 1 },
      { id: "neck", t: "num", label: X("محيط الرقبة (سم) — اختياري، لتقدير نسبة الدهون", "Neck circumference (cm) — optional, to estimate body fat"), min: 20, max: 70 },
      { id: "hip", t: "num", label: X("محيط الورك (سم) — للسيدات، اختياري لتقدير الدهون", "Hip circumference (cm) — women, optional, to estimate body fat"), min: 60, max: 200, show: function (a) { return a.sex === "f"; } },
      { id: "act", t: "radio", label: X("مستوى نشاطك البدني", "Your physical activity level"), opts: [["sedentary", X("قليل الحركة (عمل مكتبي)", "Sedentary (desk job)")], ["light", X("خفيف (تمرين 1–3 أيام)", "Light (exercise 1-3 days)")], ["moderate", X("متوسط (3–5 أيام)", "Moderate (3-5 days)")], ["high", X("عالٍ (6–7 أيام)", "High (6-7 days)")], ["athlete", X("رياضي مكثف أو عمل بدني شاق", "Intense athlete or hard physical job")]], req: 1 },
      { id: "goal", t: "radio", label: X("هدفك الآن", "Your goal now"), opts: [["lose", X("تخسيس", "Lose weight")], ["gain", X("زيادة وزن / عضل", "Gain weight / muscle")], ["keep", X("الحفاظ على وزني", "Maintain my weight")]], req: 1 },
      { id: "preg", t: "radio", label: X("هل أنتِ حامل أو مرضعة؟", "Are you pregnant or breastfeeding?"), opts: YN, req: 1, show: function (a) { return a.sex === "f"; } }
    ] });
    S({ id: "body2", mod: "body", title: X("ضغط الدم (اختياري)", "Blood pressure (optional)"), note: X("لو قست ضغطك بجهاز موثوق وأنت جالس بعد راحة 5 دقائق، اكتب الرقمين. لو مش عارف اتركهم فاضيين.", "If you measured your pressure with a reliable device while seated after 5 minutes of rest, enter both numbers. If you do not know, leave them empty."), fields: [
      { id: "sys", t: "num", label: X("الضغط الانقباضي (الرقم الكبير)", "Systolic pressure (the top number)"), min: 60, max: 260 },
      { id: "dia", t: "num", label: X("الضغط الانبساطي (الرقم الصغير)", "Diastolic pressure (the bottom number)"), min: 40, max: 160 }
    ] });
    S({ id: "body3", mod: "body", title: X("علامات الخطر", "Warning signs"), note: X("علّم على أي علامة موجودة عندك حاليًا. لو مفيش، اضغط التالي.", "Tick any sign you have right now. If none, press Next."), fields: [
      { id: "redE", t: "check", label: X("علامات تستدعي الطوارئ فورًا", "Signs that need emergency care now"), opts: D.redEmergency },
      { id: "redU", t: "check", label: X("علامات تستدعي زيارة الطبيب قريبًا", "Signs that need a doctor visit soon"), opts: D.redUrgent }
    ] });
    S({ id: "body4", mod: "body", title: X("السكر ونمط الحياة", "Blood sugar and lifestyle"), fields: [
      { id: "fr_act", t: "radio", label: X("هل تمارس نشاطًا بدنيًا 30 دقيقة يوميًا على الأقل (أو ما يعادل 150 دقيقة في الأسبوع)؟", "Do you do at least 30 minutes of physical activity daily (or about 150 minutes a week)?"), opts: YN, req: 1 },
      { id: "fr_veg", t: "radio", label: X("هل تأكل خضار أو فاكهة كل يوم؟", "Do you eat vegetables or fruit every day?"), opts: YN, req: 1 },
      { id: "fr_bp", t: "radio", label: X("هل تأخذ أدوية لضغط الدم بانتظام؟", "Do you regularly take blood pressure medication?"), opts: YN, req: 1 },
      { id: "fr_glu", t: "radio", label: X("هل سبق أن وُجد عندك ارتفاع في سكر الدم (في فحص أو أثناء مرض أو حمل)؟", "Have you ever been found to have high blood sugar (in a test, during illness or pregnancy)?"), opts: YN, req: 1 },
      { id: "fr_fam", t: "radio", label: X("هل أُصيب أحد من أقاربك بالسكري؟", "Has any relative had diabetes?"), opts: [["0", X("لا", "No")], ["1", X("نعم: جد/جدة أو عم/عمة أو خال/خالة أو ابن عم", "Yes: grandparent, aunt, uncle or cousin")], ["2", X("نعم: أب أو أم أو أخ أو أخت أو ابن", "Yes: parent, sibling or child")]], req: 1 },
      { id: "sleep", t: "num", label: X("متوسط ساعات نومك في الليلة", "Average hours of sleep per night"), min: 2, max: 14, step: "0.5", req: 1 },
      { id: "mins", t: "num", label: X("دقائق النشاط البدني المتوسط أو الشديد في الأسبوع (مشي سريع، تمرين...)", "Minutes of moderate or vigorous activity per week (brisk walking, training...)"), min: 0, max: 3000, req: 1 },
      { id: "sweet", t: "radio", label: X("المشروبات المحلاة يوميًا (عصير، مشروب غازي، شاي بسكر كثير)", "Sweetened drinks per day (juice, soda, heavily sugared tea)"), opts: [["0", X("لا أشرب تقريبًا", "Almost none")], ["1", X("1–2 كوب", "1-2 cups")], ["3", X("3 أكواب أو أكثر", "3 cups or more")]], req: 1 },
      { id: "smoke", t: "radio", label: X("هل تدخّن؟", "Do you smoke?"), opts: YN, req: 1 }
    ] });
    S({ id: "body5", mod: "body", title: X("أعراض شائعة (اختياري)", "Common symptoms (optional)"), note: X("علّم على ما يحدث معك باستمرار. ده بيساعدنا نقترح عليك تحاليل تسأل عنها طبيبك.", "Tick what happens to you regularly. This helps us suggest tests to ask your doctor about."), fields: [{ id: "sym", t: "check", label: X("الأعراض", "Symptoms"), opts: D.symptoms }] });

    var q2 = X("خلال آخر أسبوعين، كم مرة أزعجتك المشكلات التالية؟", "Over the last 2 weeks, how often have you been bothered by the following problems?");
    S({ id: "psy1", mod: "psych", title: X("المزاج (آخر أسبوعين)", "Mood (last 2 weeks)"), note: q2, fields: likertFields("phq", D.phq9, D.freq).concat([{ id: "phqF", t: "radio", label: X("لو كان عندك أي من المشكلات السابقة، ما مدى صعوبة أن جعلتك تؤدي عملك أو أمورك المنزلية أو تتعامل مع الآخرين؟", "If you checked any problems, how difficult have they made it to do your work, take care of things at home, or get along with other people?"), opts: D.phqFunc.map(function (o, v) { return [v, o]; }) }]) });
    S({ id: "psy2", mod: "psych", title: X("القلق (آخر أسبوعين)", "Anxiety (last 2 weeks)"), note: q2, fields: likertFields("gad", D.gad7, D.freq) });
    S({ id: "psy3", mod: "psych", title: X("الطاقة والمزاج المرتفع (آخر أسبوع)", "Energy and elevated mood (last week)"), note: X("في كل سؤال اختر العبارة التي تصف حالتك خلال آخر أسبوع.", "In each question choose the statement that best describes you over the past week."), fields: D.asrm.map(function (q, k) { return { id: "asr" + k, t: "radio", label: (k + 1) + ". " + q.q, opts: q.o.map(function (o, v) { return [v, o]; }), req: 1, compact: 1 }; }) });
    S({ id: "psy4", mod: "psych", title: X("تجارب إدراكية", "Perceptual experiences"), note: X("اقرأ كل عبارة واختر صح أو خطأ. لو صح، اختر مدى إزعاجها لك. هذه الأسئلة روتينية ولا تعني أن عندك مشكلة.", "Read each statement and choose true or false. If true, choose how distressing it is. These are routine questions and do not mean you have a problem."), fields: D.pq16.map(function (q, k) { return { id: "pq" + k, t: "pq", label: (k + 1) + ". " + q, req: 1 }; }) });
    S({ id: "psy5", mod: "psych", title: X("أسئلة أمان", "Safety questions"), fields: [
      { id: "harmO", t: "radio", label: X("هل تفكر حاليًا في إيذاء شخص آخر؟", "Are you currently thinking about harming another person?"), opts: YN, req: 1 },
      { id: "cmd", t: "radio", label: X("هل تسمع أصواتًا تأمرك بفعل أشياء أو تهددك؟", "Do you hear voices that command you to do things or threaten you?"), opts: YN, req: 1 },
      { id: "supp", t: "radio", label: X("هل عندك شخص قريب تثق به وتقدر تتكلم معه؟", "Do you have someone close you trust and can talk to?"), opts: YN, req: 1 }
    ] });

    var cAge = function (a) { return num(a.cage) >= 4; };
    S({ id: "ch1", mod: "child", title: X("بيانات الطفل (يجاوب ولي الأمر)", "Child details (answered by a parent)"), note: X("الفحص للأعمار من 4 إلى 17 سنة. لو الطفل أصغر من 4 سنوات نكتفي بعلامات الخطر.", "The screen is for ages 4 to 17. For a child under 4 we only check warning signs."), fields: [
      { id: "cage", t: "num", label: X("عمر الطفل (سنة)", "Child's age (years)"), min: 0, max: 17, req: 1 },
      { id: "csex", t: "radio", label: X("النوع", "Sex"), opts: [["m", X("ولد", "Boy")], ["f", X("بنت", "Girl")]], req: 1 },
      { id: "ch", t: "num", label: X("الطول (سم) — اختياري", "Height (cm) — optional"), min: 40, max: 210 },
      { id: "cw", t: "num", label: X("الوزن (كجم) — اختياري", "Weight (kg) — optional"), min: 3, max: 150, step: "0.1" }
    ] });
    S({ id: "ch2", mod: "child", title: X("علامات الخطر عند الطفل", "Warning signs in the child"), note: X("علّم على أي علامة موجودة حاليًا. لو مفيش، اضغط التالي.", "Tick any sign present now. If none, press Next."), fields: [{ id: "cred", t: "check", label: X("علامات تستدعي الطوارئ فورًا", "Signs that need emergency care now"), opts: D.childEmergency }] });
    S({ id: "ch3", mod: "child", title: X("سلوك الطفل ومشاعره", "Child's behaviour and feelings"), note: X("خلال الشهور الأخيرة، كم مرة ينطبق ذلك على الطفل؟", "In recent months, how often does this apply to the child?"), when: cAge, fields: likertFields("psc", D.psc, D.pscOpts) });
    S({ id: "ch4", mod: "child", title: X("عادات الطفل", "Child's habits"), when: cAge, fields: [
      { id: "csleep", t: "num", label: X("متوسط ساعات نوم الطفل في الليلة", "Average hours of sleep per night"), min: 3, max: 15, step: "0.5", req: 1 },
      { id: "cact", t: "num", label: X("دقائق اللعب النشط أو الحركة في اليوم", "Minutes of active play or movement per day"), min: 0, max: 600, req: 1 },
      { id: "cscr", t: "num", label: X("ساعات الشاشات الترفيهية في اليوم (موبايل، تلفزيون، ألعاب)", "Hours of recreational screen time per day (phone, TV, games)"), min: 0, max: 16, step: "0.5", req: 1 },
      { id: "cveg", t: "radio", label: X("هل يأكل خضار أو فاكهة كل يوم؟", "Does the child eat vegetables or fruit every day?"), opts: YN, req: 1 },
      { id: "csweet", t: "radio", label: X("المشروبات والحلويات المحلاة يوميًا", "Sweetened drinks and sweets per day"), opts: [["0", X("قليل أو لا شيء", "Few or none")], ["1", X("مرة أو مرتان", "Once or twice")], ["3", X("3 مرات أو أكثر", "3 times or more")]], req: 1 }
    ] });
    S({ id: "ch5", mod: "child", title: X("سؤال أمان", "Safety question"), when: cAge, fields: [{ id: "cself", t: "radio", label: D.childSelf + X("؟", "?"), opts: YN, req: 1 }] });

    [0, 1, 2, 3, 4].forEach(function (p) {
      S({ id: "pe" + p, mod: "pers", title: X("تحليل الشخصية (", "Personality (") + (p + 1) + X(" من 5)", " of 5)"), note: X("إلى أي درجة تنطبق عليك كل عبارة في حياتك عمومًا؟", "How accurately does each phrase describe you in general? (read each one as: \"I ...\")"), fields: D.big5.slice(p * 10, p * 10 + 10).map(function (t, k) { var i = p * 10 + k; return { id: "b" + i, t: "radio", label: (i + 1) + ". " + t, opts: D.likert5.map(function (o, v) { return [v + 1, o]; }), req: 1, compact: 1 }; }) });
    });
  }

  /* ---------- rendering ---------- */
  function fieldHtml(f, a) {
    var v = a[f.id], h = '<div class="q" data-f="' + f.id + '"><div class="ql">' + esc(f.label) + "</div>";
    if (f.t === "num") h += '<input type="number" inputmode="decimal" dir="ltr" id="f_' + f.id + '" min="' + f.min + '" max="' + f.max + '"' + (f.step ? ' step="' + f.step + '"' : "") + (has(v) ? ' value="' + esc(v) + '"' : "") + ">";
    else if (f.t === "radio") { h += '<div class="opts' + (f.compact ? " compact" : "") + '">'; f.opts.forEach(function (o) { h += '<label class="opt' + (String(v) === String(o[0]) ? " on" : "") + '"><input type="radio" name="' + f.id + '" value="' + esc(o[0]) + '"' + (String(v) === String(o[0]) ? " checked" : "") + "><span>" + esc(o[1]) + "</span></label>"; }); h += "</div>"; }
    else if (f.t === "check") { h += '<div class="opts checks">'; var cur = v || []; f.opts.forEach(function (o) { h += '<label class="opt' + (cur.indexOf(o[0]) >= 0 ? " on" : "") + '"><input type="checkbox" name="' + f.id + '" value="' + o[0] + '"' + (cur.indexOf(o[0]) >= 0 ? " checked" : "") + "><span>" + esc(o[1]) + "</span></label>"; }); h += "</div>"; }
    else if (f.t === "pq") {
      var t = a[f.id], d = a[f.id + "_d"];
      h += '<div class="opts compact"><label class="opt' + (t === "1" ? " on" : "") + '"><input type="radio" name="' + f.id + '" value="1"' + (t === "1" ? " checked" : "") + "><span>" + U("t") + '</span></label><label class="opt' + (t === "0" ? " on" : "") + '"><input type="radio" name="' + f.id + '" value="0"' + (t === "0" ? " checked" : "") + "><span>" + U("f") + "</span></label></div>";
      h += '<div class="opts compact pqd"' + (t === "1" ? "" : " hidden") + ">"; AD[lang].pqDistress.forEach(function (o, k) { h += '<label class="opt' + (String(d) === String(k) ? " on" : "") + '"><input type="radio" name="' + f.id + '_d" value="' + k + '"' + (String(d) === String(k) ? " checked" : "") + "><span>" + esc(o) + "</span></label>"; }); h += "</div>";
    }
    return h + "</div>";
  }
  function buildSteps() { var order = ["body", "psych", "child", "pers"]; makeSteps(); state.steps = STEPS.filter(function (s) { return state.mods.indexOf(s.mod) >= 0; }).sort(function (x, y) { return order.indexOf(x.mod) - order.indexOf(y.mod); }); }
  function visibleSteps() { return state.steps.filter(function (s) { return !s.when || s.when(state.a); }); }
  function collect() {
    var s = visibleSteps()[state.i]; if (!s) return;
    s.fields.forEach(function (f) {
      if (f.show && !f.show(state.a)) return;
      if (f.t === "num") { var e = $("f_" + f.id); state.a[f.id] = e ? e.value : ""; }
      else if (f.t === "check") { var arr = []; document.querySelectorAll('input[name="' + f.id + '"]:checked').forEach(function (c) { arr.push(c.value); }); state.a[f.id] = arr; }
      else if (f.t === "pq") { var c1 = document.querySelector('input[name="' + f.id + '"]:checked'); state.a[f.id] = c1 ? c1.value : undefined; var c2 = document.querySelector('input[name="' + f.id + '_d"]:checked'); state.a[f.id + "_d"] = c2 ? c2.value : undefined; }
      else { var c = document.querySelector('input[name="' + f.id + '"]:checked'); state.a[f.id] = c ? c.value : undefined; }
    });
  }
  function short(l) { return l.split(/—|—/)[0].trim(); }
  function validate(s) {
    for (var k = 0; k < s.fields.length; k++) {
      var f = s.fields[k]; if (f.show && !f.show(state.a)) continue; var v = state.a[f.id];
      if (f.t === "num") { if (f.req && !has(num(v))) return U("fill") + short(f.label); if (has(num(v)) && (num(v) < f.min || num(v) > f.max)) return "\"" + short(f.label) + "\": " + U("between") + f.min + U("and") + f.max + "."; }
      else if (f.t === "pq") { if (f.req && v === undefined) return U("answer") + f.label.slice(0, 40) + "..."; if (v === "1" && state.a[f.id + "_d"] === undefined) return U("pickD") + f.label.slice(0, 40) + "..."; }
      else if (f.t === "radio" && f.req && v === undefined) return U("answer") + f.label.slice(0, 60) + (f.label.length > 60 ? "..." : "");
    }
    return "";
  }
  function renderStep(keep) {
    var vs = visibleSteps(), s = vs[state.i];
    $("prog").style.width = Math.round((state.i / vs.length) * 100) + "%";
    $("stepNo").textContent = U("step") + " " + (state.i + 1) + " " + U("of") + " " + vs.length;
    var h = "<h2>" + esc(s.title) + "</h2>" + (s.note ? '<p class="note2">' + esc(s.note) + "</p>" : "");
    s.fields.forEach(function (f) { if (!f.show || f.show(state.a)) h += fieldHtml(f, state.a); });
    $("stepBody").innerHTML = h; $("err").hidden = true;
    $("back").hidden = state.i === 0; $("next").textContent = state.i === vs.length - 1 ? U("show") : U("next");
    if (!keep) window.scrollTo({ top: $("wiz").offsetTop - 60, behavior: "smooth" });
    showAlerts();
  }
  function onChange(e) {
    var t = e.target; if (!t || !t.name) return;
    if (t.type === "radio") { document.querySelectorAll('input[name="' + t.name + '"]').forEach(function (r) { r.parentNode.classList.toggle("on", r.checked); }); var q = t.closest(".q"); if (q) { var d = q.querySelector(".pqd"); if (d && t.name.slice(-2) !== "_d") d.hidden = t.value !== "1"; } }
    if (t.type === "checkbox") t.parentNode.classList.toggle("on", t.checked);
    var prevSex = state.a.sex; collect(); showAlerts();
    if (t.name === "sex" && prevSex !== state.a.sex) renderStep(true);
  }

  /* ---------- instant safety alerts (always free, never behind payment) ---------- */
  function crisisBox() { var E = AD[lang].EMERGENCY; return X("لو إنت أو حد قريب منك في خطر حقيقي الآن، اتصل بالإسعاف (مصر: " + E.ambulance + ") أو توجّه لأقرب طوارئ. للدعم النفسي في مصر: الخط " + E.mentalHotline + ". " + E.other, "If you or someone close to you is in real danger right now, call emergency services or go to the nearest emergency room. " + E.other); }
  function alertsFor(a) {
    var out = [], E = AD[lang].EMERGENCY;
    if ((a.redE || []).length) out.push(X("ذكرت علامة خطر طبية. توجّه للطوارئ أو اتصل بالإسعاف (" + E.ambulance + ") فورًا. لا تنتظر نتيجة الفحص.", "You reported a medical warning sign. Go to the emergency room or call emergency services now. Do not wait for the screening result."));
    if ((a.cred || []).length) out.push(X("ذكرت علامة خطر عند الطفل. توجّه به للطوارئ أو اتصل بالإسعاف (" + E.ambulance + ") فورًا.", "You reported a warning sign in the child. Take them to the emergency room or call emergency services now."));
    if (num(a.phq8) >= 1) out.push(X("أفكار إيذاء النفس أو تمنّي الموت تستحق اهتمامًا فوريًا. ", "Thoughts of self-harm or wishing to be dead deserve immediate attention. ") + crisisBox());
    if (a.harmO === "1" || a.cmd === "1") out.push(X("ما ذكرته يستدعي تقييمًا عاجلًا. ", "What you reported needs urgent assessment. ") + crisisBox());
    if (a.cself === "1") out.push(X("لا تترك الطفل وحده، وتحدّث معه بهدوء. ", "Do not leave the child alone, and talk to them calmly. ") + crisisBox());
    return out;
  }
  function showAlerts() { var o = alertsFor(state.a), b = $("alert"); if (!o.length) { b.hidden = true; return; } b.innerHTML = o.map(function (x) { return "<p>🚨 " + esc(x) + "</p>"; }).join(""); b.hidden = false; }

  /* ---------- payment + report (server side) ---------- */
  function planFor() { return state.mods.length === 1 ? "assess_one" : "assess_full"; }
  function covered(o) { return o && o.state === "paid" && (o.plan === "assess_full" || (o.plan === "assess_one" && state.mods.length === 1 && state.mods[0] === o.mod)); }
  async function getOrder(id) { try { var r = await fetch(API + "/order?id=" + encodeURIComponent(id)); return await r.json(); } catch (e) { return null; } }
  function show(id) { ["intro", "wiz", "lock", "report", "wait"].forEach(function (x) { $(x).hidden = x !== id; }); }
  function msg(txt) { $("waitMsg").innerHTML = txt; show("wait"); }

  async function fetchReport(orderId) {
    msg(esc(U("loading")));
    var r, d;
    try { r = await fetch(API + "/assess/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order: orderId, mods: state.mods, lang: lang, name: state.name, a: state.a }) }); d = await r.json(); } catch (e) { r = { status: 0 }; d = {}; }
    if (r.status === 200 && d.html) { renderReport(d.html); ls("hl_as_pending", null); return true; }
    if (r.status === 402) { showLock(); return false; }
    var m = r.status === 429 ? U("limit") : r.status === 403 ? U("notCov") : U("repErr") + esc(orderId);
    msg(esc(m) + (r.status === 400 && d.fields ? "<br><small dir='ltr'>" + esc(d.fields.join(", ")) + "</small>" : "")); return false;
  }
  function renderReport(html) {
    $("report").innerHTML = html; show("report"); $("alert").hidden = true;
    var pr = $("print"); if (pr) pr.onclick = function () { window.print(); };
    var ag = $("again"); if (ag) ag.onclick = function () { state.a = {}; state.i = 0; show("intro"); window.scrollTo(0, 0); };
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function showLock() {
    var p = state.prices, plan = planFor(), usd = plan === "assess_one" ? p.assess_one : p.assess_full, free = "";
    if (state.mods.indexOf("body") >= 0 && has(num(state.a.w)) && has(num(state.a.h))) { var b = AC.bmi(num(state.a.w), num(state.a.h)); free = '<div class="tip"><b>' + U("free") + "</b><br>" + U("bmiLine") + AC.r1(b) + "</div>"; }
    var al = alertsFor(state.a).map(function (x) { return '<div class="alert2">🚨 ' + esc(x) + "</div>"; }).join("");
    $("lock").innerHTML = "<h2>" + U("lockH") + "</h2>" + al + free + "<p>" + U("lockP") + '</p><p class="price"><b>' + money(usd) + '</b></p><div class="btns"><button class="btn primary" id="pay" type="button">' + U("pay") + '</button></div><div id="payErr" class="msg" hidden></div>';
    show("lock"); window.scrollTo({ top: 0, behavior: "smooth" });
    $("pay").onclick = startPay;
  }
  async function startPay() {
    var pe = $("payErr"); pe.hidden = true; $("pay").disabled = true; $("pay").textContent = U("paying");
    ls("hl_as_pending", JSON.stringify({ a: state.a, mods: state.mods, lang: lang, name: state.name }));
    try {
      var r = await fetch(API + "/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: planFor(), mod: state.mods.length === 1 ? state.mods[0] : "", name: state.name, phone: ls("hl_as_phone"), email: ls("hl_as_email"), lang: lang }) });
      var d = await r.json(); if (d && d.url) { ls("hl_as_order", d.order); location.href = d.url; return; }
    } catch (e) {}
    pe.textContent = U("payErr"); pe.hidden = false; $("pay").disabled = false; $("pay").textContent = U("pay");
  }
  async function finish() {
    showAlerts();
    var id = ls("hl_as_order");
    if (id) { var o = await getOrder(id); if (covered(o)) { state.order = o; var ok = await fetchReport(id); return; } }
    showLock();
  }
  async function returnFromPayment(id) {
    msg(esc(U("checking")));
    var o = null, t0 = Date.now();
    while (Date.now() - t0 < 90000) { o = await getOrder(id); if (o && (o.state === "paid" || o.state === "failed" || o.state === "expired" || o.state === "mismatch")) break; await new Promise(function (r) { setTimeout(r, 3000); }); }
    if (!o || o.state !== "paid") { msg(esc(U("pending"))); return; }
    state.order = o; ls("hl_as_order", id);
    var p = null; try { p = JSON.parse(ls("hl_as_pending") || "null"); } catch (e) {}
    if (p && p.a && p.mods) { state.a = p.a; state.mods = p.mods; state.name = p.name || state.name; if (p.lang && p.lang !== lang) { /* keep the language the client is viewing now */ } await fetchReport(id); return; }
    show("intro"); applyUI(); $("paidNote").textContent = U("noAns"); $("paidNote").hidden = false;
    if (o.plan === "assess_one" && o.mod) document.querySelectorAll(".mod input").forEach(function (c) { c.checked = c.value === o.mod; c.parentNode.classList.toggle("on", c.checked); c.disabled = c.value !== o.mod; });
  }

  /* ---------- flow ---------- */
  function startWizard() { buildSteps(); state.i = 0; show("wiz"); renderStep(); }
  function next() {
    collect(); var vs = visibleSteps(), s = vs[state.i], m = validate(s);
    if (m) { var e = $("err"); e.textContent = m; e.hidden = false; return; }
    if (state.i >= vs.length - 1) { finish(); return; }
    state.i++; if (!visibleSteps()[state.i]) { finish(); return; } renderStep();
  }
  function back() { collect(); if (state.i > 0) { state.i--; renderStep(); } }
  window.AssessDebug = { state: state, alertsFor: alertsFor, visibleSteps: visibleSteps, buildSteps: buildSteps };

  function setLang(l) { if (l === lang) return; if (!$("wiz").hidden) collect(); lang = l; applyUI(); if (!$("wiz").hidden) { buildSteps(); renderStep(true); } if (!$("lock").hidden) showLock(); }

  document.addEventListener("DOMContentLoaded", async function () {
    lang = document.documentElement.lang === "ar" ? "ar" : "en";
    var lb = $("langBtn"); if (lb) lb.addEventListener("click", function () { setTimeout(function () { setLang(document.documentElement.lang === "ar" ? "ar" : "en"); }, 0); });
    $("stepBody").addEventListener("change", onChange); $("stepBody").addEventListener("input", function (e) { if (e.target.type === "number") { collect(); showAlerts(); } });
    $("next").addEventListener("click", next); $("back").addEventListener("click", back);
    state.name = ls("hl_name");
    var gateDone = ls("hl_sim_tok") && state.name && ls("hl_as_phone");
    if (gateDone) $("gate").hidden = true;
    document.querySelectorAll(".mod input").forEach(function (c) { c.addEventListener("change", function () { c.parentNode.classList.toggle("on", c.checked); showPrices(); }); });
    applyUI();
    try { var pr = await (await fetch(API + "/")).json(); if (pr && pr.usd) { state.prices.assess_one = pr.usd.assess_one || 4; state.prices.assess_full = pr.usd.assess_full || 9; } if (pr && pr.rate) state.rate = pr.rate; showPrices(); } catch (e) {}
    $("start").addEventListener("click", async function () {
      var ge = $("gErr"); ge.hidden = true;
      var mods = []; document.querySelectorAll(".mod input:checked").forEach(function (c) { mods.push(c.value); });
      if (!mods.length) { ge.textContent = U("errMod"); ge.hidden = false; return; }
      if (!$("agree").checked) { ge.textContent = U("errAgree"); ge.hidden = false; return; }
      if (!$("gate").hidden) {
        var name = $("gName").value.trim(), cc = $("gCc").value, raw = $("gPhone").value.trim(), digits = raw.replace(/\D/g, "");
        if (/^(\+|00)/.test(raw) && digits.replace(/^0+/, "").indexOf(cc) === 0) digits = digits.replace(/^0+/, "").slice(cc.length);
        digits = digits.replace(/^0+/, ""); var phone = "+" + cc + digits;
        if (name.length < 2) { ge.textContent = U("errName"); ge.hidden = false; return; }
        if (!/^\+\d{8,15}$/.test(phone) || (cc === "20" && !/^1\d{9}$/.test(digits))) { ge.textContent = U("errPhone"); ge.hidden = false; return; }
        state.name = name; $("start").disabled = true;
        var email = $("gEmail").value.trim();
        try { var r = await fetch(API + "/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name, phone: phone, email: email, ref: "assessment", lang: lang }) }); var d = await r.json(); if (d && d.token) { ls("hl_sim_tok", d.token); } } catch (e) { /* continue even if the lead could not be saved */ }
        ls("hl_name", name); ls("hl_as_phone", phone); ls("hl_as_email", email);
        $("start").disabled = false;
      }
      var po = state.order; if (po && po.plan === "assess_one" && !(mods.length === 1 && mods[0] === po.mod)) { ge.textContent = U("errOne"); ge.hidden = false; return; }
      state.mods = mods; startWizard();
    });
    var qs = new URLSearchParams(location.search), oid = qs.get("order");
    if (oid) { if (qs.get("status") === "done") await returnFromPayment(oid); else { var o = await getOrder(oid); if (o && o.state === "paid") { state.order = o; ls("hl_as_order", oid); showPrices(); $("paidNote").textContent = U("paidOK"); $("paidNote").hidden = false; if (o.plan === "assess_one" && o.mod) document.querySelectorAll(".mod input").forEach(function (c) { c.checked = c.value === o.mod; c.parentNode.classList.toggle("on", c.checked); c.disabled = c.value !== o.mod; }); } } }
  });
})();
