/* HealthLife - shared script: language switch (EN/AR), WhatsApp links, copy buttons, lightbox, payment page */
(function(){
  "use strict";

  /* ===== EDIT HERE: contact details ===== */
  var WA = "201050747891"; // WhatsApp number: country code first, no + or leading zeros

  /* ===== EDIT HERE: all website text. "en" = English, "ar" = Arabic ===== */
  var T = {
    en: {
      /* titles */
      title_home:"HealthLife | Diet & Workout Coaching",
      title_results:"Transformations | HealthLife",
      title_pay:"Pay by Bank Transfer | HealthLife",
      /* nav */
      nav_home:"Home", nav_program:"Program", nav_packages:"Packages", nav_results:"Transformations",
      nav_reviews:"Reviews", nav_pay:"Payment", nav_contact:"Contact",
      /* home hero */
      hero_p:"Your personalized diet plan and workout plan, with real follow-up from Coach Abdelrahman, so you actually reach your goal.",
      hero_wa:"Chat on WhatsApp", hero_pk:"See Packages",
      /* program */
      prog_h:"The Program", prog_sub:"Everything you need, built around your body and your schedule.",
      diet_h:"🥗 Diet Plan", diet_p:"A meal plan made for your goal, your food preferences and your lifestyle.",
      diet_1:"Fat loss, muscle gain or maintenance", diet_2:"Easy, realistic meals", diet_3:"Adjusted as your body changes",
      work_h:"🏋️ Workout Plan", work_p:"A training program that fits your level and where you train, gym or home.",
      work_1:"Clear weekly schedule", work_2:"Progressive overload", work_3:"Updated to keep results coming",
      fol_h:"📲 Coach Follow-up", fol_p:"You are never alone: questions, check-ins and adjustments go through WhatsApp.",
      fol_1:"Daily or weekly follow-up", fol_2:"Progress tracking", fol_3:"Motivation and accountability",
      /* packages */
      pk_h:"3-Month Packages", pk_sub:"Limited-time discounted prices. Both packages include the full diet plan and workout plan.",
      pk1_tag:"⭐ RECOMMENDED", pk1_h:"Daily Follow-up", pk_dur:"for 3 months",
      pk_l1:"Personalized diet plan", pk_l2:"Personalized workout plan", pk1_l3:"Daily follow-up with the coach", pk_l4:"Plan adjustments along the way",
      pk_join:"Join on WhatsApp", pk_pay:"Pay by bank transfer",
      pk2_tag:"GREAT VALUE", pk2_h:"Weekly Follow-up",
      pk2_l3:"Weekly follow-up via WhatsApp",
      why_h:"Why we recommend Daily Follow-up",
      why_p:"Daily contact with your coach keeps you motivated, accountable and on track. That is what turns a plan into a real transformation.",
      why_stat_t:"of clients on the Daily Follow-up package reached their transformation goal",
      why_fine:"Individual results vary and depend on commitment to the plan.",
      /* home transformations preview */
      tr_h:"Real Transformations", tr_sub:"Real clients, real results. Faces are blurred to protect their privacy.",
      tr_more:"See all transformations",
      /* reviews */
      rv_h:"Client Reviews", rv_sub:"Real reviews from our Facebook page.",
      rv_src:"Facebook review", rv_more:"See all reviews on Facebook",
      /* contact */
      ct_h:"Contact Coach Abdelrahman", ct_sub:"Ask anything, we reply on WhatsApp.",
      ct_wa:"WhatsApp", ct_fb:"Facebook Page", ct_fb_p:"Follow our results and updates", ct_em:"Email",
      rights:"All rights reserved.",
      /* transformations page */
      res_h:"Client Transformations", res_p:"Real people. Real work. Real change.",
      story_h:"Every transformation starts with a decision",
      story_1:"Most people who come to us have tried before: random diets, workouts copied from the internet, a few strong weeks, and then the old habits come back. The problem was never willpower. It was the lack of a clear plan and someone checking in on you.",
      story_2:"At HealthLife we start with you: your body, your goal, your food and your schedule. Then we build a diet plan and workout plan that fit your real life, not a perfect one. And we stay with you on WhatsApp: answering questions, adjusting the plan, and keeping you going on the days motivation disappears.",
      story_3:"Week by week the small wins add up: more energy, more strength, clothes that fit differently, and a person in the mirror you are proud of. The photos below are real clients who trusted the process. Their faces are blurred for privacy, but their results speak for themselves.",
      how_h:"How your transformation works",
      st1_h:"Tell us about you", st1_p:"Your goal, weight, training level, food preferences and schedule.",
      st2_h:"Get your plan", st2_p:"A personalized diet plan and workout plan built for you.",
      st3_h:"Follow-up", st3_p:"Daily or weekly check-ins on WhatsApp to keep you on track.",
      st4_h:"Adjust and grow", st4_p:"We adjust the plan as your body changes so results keep coming.",
      gal_h:"Real Client Results", gal_sub:"Tap a photo to enlarge it.",
      client:"Client", cap:"Real client result",
      privacy:"Faces are blurred to protect client privacy. Individual results vary.",
      cta_h:"Ready to write your own story?",
      cta_p:"Start with the Daily Follow-up package, the one we recommend for the best results.",
      /* payment page */
      pay_page_h:"Pay by Bank Transfer", pay_page_p:"Choose your package, transfer the amount to our bank account, then send us the receipt on WhatsApp to start.",
      pick_h:"1. Choose your package", rec:"Recommended", amount:"Amount to transfer", usd_note:"Prices are in US dollars. If you pay in another currency, ask the coach for the current rate on WhatsApp.",
      pay_h:"2. Transfer to this account", pay_acc:"Account number", pay_iban:"IBAN", copy:"Copy", copied:"Copied!",
      pay_note:"Please confirm the account name with the coach on WhatsApp before sending money.",
      send_h:"3. Send your receipt", name_l:"Your full name (it should match the transfer)", name_ph:"Your name",
      send_btn:"I have transferred, send receipt on WhatsApp",
      how1:"Choose your package.", how2:"Transfer the amount from your banking app or any bank branch.",
      how3:"Tap the green button and send us your name and the transfer receipt on WhatsApp.", how4:"We confirm your payment and start your program.",
      warn:"Safety first: we never ask for your card number, PIN or OTP, on this website or on WhatsApp. Pay only by bank transfer to the account shown on this page.",
      /* whatsapp messages */
      msg_hero:"Hello Coach, I want to join HealthLife",
      msg_daily:"Hello Coach, I want the 3-month DAILY follow-up package ($250)",
      msg_weekly:"Hello Coach, I want the 3-month WEEKLY follow-up package ($100)",
      msg_plain:"Hello Coach",
      msg_paid:"Hello Coach, I have transferred {amount} for the 3-month {plan} package. My name: {name}. I am sending the receipt now.",
      plan_daily:"DAILY follow-up", plan_weekly:"WEEKLY follow-up",
      pm_h:"Payment Methods", pm_now:"Available now", pm_bank:"Bank transfer", pm_soon:"Coming soon",
      pm_visa:"Visa", pm_mc:"Mastercard", pm_meeza:"Meeza", pm_apple:"Apple Pay", pm_vf:"Vodafone Cash", pm_or:"Orange Cash", pm_et:"Etisalat Cash (e&)", pm_banks:"Other bank wallets",
      pm_note:"Online payment by card and mobile wallet is being set up. For now, please pay by bank transfer.",
      btn:"العربية"
    },
    ar: {
      title_home:"هيلث لايف | نظام غذائي وخطة تمارين",
      title_results:"التحولات | هيلث لايف",
      title_pay:"الدفع بالتحويل البنكي | هيلث لايف",
      nav_home:"الرئيسية", nav_program:"البرنامج", nav_packages:"الباقات", nav_results:"التحولات",
      nav_reviews:"آراء العملاء", nav_pay:"الدفع", nav_contact:"تواصل معنا",
      hero_p:"نظام غذائي وخطة تمارين مصممة خصيصًا لك، مع متابعة حقيقية من الكابتن عبد الرحمن لتصل إلى هدفك فعلًا.",
      hero_wa:"تواصل عبر واتساب", hero_pk:"شاهد الباقات",
      prog_h:"البرنامج", prog_sub:"كل ما تحتاجه، مصمم حسب جسمك وجدولك.",
      diet_h:"🥗 النظام الغذائي", diet_p:"خطة وجبات مصممة لهدفك وتفضيلاتك الغذائية ونمط حياتك.",
      diet_1:"خسارة الدهون أو بناء العضلات أو الحفاظ على الوزن", diet_2:"وجبات سهلة وواقعية", diet_3:"يُعدَّل مع تغيّر جسمك",
      work_h:"🏋️ خطة التمارين", work_p:"برنامج تدريب يناسب مستواك ومكان تمرينك، سواء في الجيم أو المنزل.",
      work_1:"جدول أسبوعي واضح", work_2:"زيادة تدريجية في الأحمال", work_3:"يُحدَّث لتستمر النتائج",
      fol_h:"📲 المتابعة مع الكابتن", fol_p:"لست وحدك أبدًا: الأسئلة والمتابعة والتعديلات كلها عبر واتساب.",
      fol_1:"متابعة يومية أو أسبوعية", fol_2:"تتبّع التقدم", fol_3:"تحفيز ومسؤولية والتزام",
      pk_h:"باقات 3 شهور", pk_sub:"أسعار مخفضة لفترة محدودة. كلتا الباقتين تشملان النظام الغذائي وخطة التمارين كاملة.",
      pk1_tag:"⭐ الباقة الموصى بها", pk1_h:"متابعة يومية", pk_dur:"لمدة 3 شهور",
      pk_l1:"نظام غذائي مخصص", pk_l2:"خطة تمارين مخصصة", pk1_l3:"متابعة يومية مع الكابتن", pk_l4:"تعديل الخطة على طول الطريق",
      pk_join:"اشترك عبر واتساب", pk_pay:"ادفع بالتحويل البنكي",
      pk2_tag:"قيمة ممتازة", pk2_h:"متابعة أسبوعية",
      pk2_l3:"متابعة أسبوعية عبر واتساب",
      why_h:"لماذا ننصح بالمتابعة اليومية؟",
      why_p:"التواصل اليومي مع الكابتن يبقيك متحمسًا وملتزمًا وعلى المسار الصحيح، وهذا ما يحوّل الخطة إلى تحول حقيقي.",
      why_stat_t:"من عملاء باقة المتابعة اليومية وصلوا إلى هدفهم في التحول",
      why_fine:"تختلف النتائج من شخص لآخر وتعتمد على الالتزام بالخطة.",
      tr_h:"تحولات حقيقية", tr_sub:"عملاء حقيقيون ونتائج حقيقية. تم تغبيش الوجوه لحماية خصوصيتهم.",
      tr_more:"شاهد كل التحولات",
      rv_h:"آراء عملائنا", rv_sub:"آراء حقيقية من صفحتنا على فيسبوك.",
      rv_src:"تقييم على فيسبوك", rv_more:"شاهد كل التقييمات على فيسبوك",
      ct_h:"تواصل مع الكابتن عبد الرحمن", ct_sub:"اسأل عن أي شيء، نرد عليك على واتساب.",
      ct_wa:"واتساب", ct_fb:"صفحة فيسبوك", ct_fb_p:"تابع نتائجنا وآخر التحديثات", ct_em:"البريد الإلكتروني",
      rights:"جميع الحقوق محفوظة.",
      res_h:"تحولات عملائنا", res_p:"أشخاص حقيقيون. مجهود حقيقي. تغيير حقيقي.",
      story_h:"كل تحول يبدأ بقرار",
      story_1:"أغلب من يأتون إلينا جرّبوا من قبل: حميات عشوائية، وتمارين منقولة من الإنترنت، وبضعة أسابيع من الحماس ثم تعود العادات القديمة. المشكلة لم تكن في الإرادة، بل في غياب خطة واضحة وشخص يتابعك.",
      story_2:"في هيلث لايف نبدأ بك أنت: جسمك وهدفك وأكلك ومواعيدك. ثم نصمم لك نظامًا غذائيًا وخطة تمارين تناسب حياتك الحقيقية وليس حياة مثالية. ونبقى معك على واتساب: نجيب عن أسئلتك، ونعدّل الخطة، ونشدّ من عزيمتك في الأيام التي يختفي فيها الحماس.",
      story_3:"أسبوعًا بعد أسبوع تتراكم الانتصارات الصغيرة: طاقة أكبر، وقوة أفضل، وملابس تناسبك بشكل مختلف، وشخص في المرآة تفخر به. الصور التالية لعملاء حقيقيين وثقوا بالخطة. أخفينا وجوههم حفاظًا على خصوصيتهم، لكن نتائجهم تتحدث عن نفسها.",
      how_h:"كيف يتم تحولك؟",
      st1_h:"عرّفنا بنفسك", st1_p:"هدفك ووزنك ومستواك التدريبي وتفضيلاتك الغذائية ومواعيدك.",
      st2_h:"استلم خطتك", st2_p:"نظام غذائي وخطة تمارين مخصصة لك.",
      st3_h:"المتابعة", st3_p:"متابعة يومية أو أسبوعية عبر واتساب لتبقى على المسار.",
      st4_h:"نعدّل ونتطور", st4_p:"نعدّل الخطة مع تغيّر جسمك لتستمر النتائج.",
      gal_h:"نتائج عملاء حقيقية", gal_sub:"اضغط على الصورة لتكبيرها.",
      client:"عميل", cap:"نتيجة عميل حقيقي",
      privacy:"تم تغبيش الوجوه لحماية خصوصية العملاء. تختلف النتائج من شخص لآخر.",
      cta_h:"جاهز تبدأ قصتك؟",
      cta_p:"ابدأ بباقة المتابعة اليومية، الباقة التي ننصح بها للحصول على أفضل النتائج.",
      pay_page_h:"الدفع بالتحويل البنكي", pay_page_p:"اختر باقتك، حوّل المبلغ إلى حسابنا البنكي، ثم أرسل لنا الإيصال على واتساب لنبدأ.",
      pick_h:"١. اختر باقتك", rec:"موصى بها", amount:"المبلغ المطلوب تحويله", usd_note:"الأسعار بالدولار الأمريكي. إذا كنت ستدفع بعملة أخرى، اسأل الكابتن عن سعر الصرف الحالي على واتساب.",
      pay_h:"٢. حوّل إلى هذا الحساب", pay_acc:"رقم الحساب", pay_iban:"رقم الآيبان (IBAN)", copy:"نسخ", copied:"تم النسخ!",
      pay_note:"يُرجى تأكيد اسم صاحب الحساب مع الكابتن على واتساب قبل إرسال أي مبلغ.",
      send_h:"٣. أرسل الإيصال", name_l:"اسمك الكامل (يجب أن يطابق التحويل)", name_ph:"اسمك",
      send_btn:"تم التحويل، أرسل الإيصال على واتساب",
      how1:"اختر باقتك.", how2:"حوّل المبلغ من تطبيق البنك أو من أي فرع بنك.",
      how3:"اضغط الزر الأخضر وأرسل لنا اسمك وإيصال التحويل على واتساب.", how4:"نؤكد استلام الدفع ونبدأ برنامجك.",
      warn:"الأمان أولًا: لا نطلب أبدًا رقم بطاقتك أو الرقم السري أو رمز التحقق (OTP) لا على هذا الموقع ولا على واتساب. الدفع يتم فقط بالتحويل البنكي إلى الحساب الموضح في هذه الصفحة.",
      msg_hero:"مرحبًا كابتن، أريد الاشتراك في هيلث لايف",
      msg_daily:"مرحبًا كابتن، أريد باقة الـ3 شهور بمتابعة يومية (250$)",
      msg_weekly:"مرحبًا كابتن، أريد باقة الـ3 شهور بمتابعة أسبوعية (100$)",
      msg_plain:"مرحبًا كابتن",
      msg_paid:"مرحبًا كابتن، قمت بتحويل {amount} لباقة الـ3 شهور بـ{plan}. اسمي: {name}. سأرسل لك الإيصال الآن.",
      plan_daily:"متابعة يومية", plan_weekly:"متابعة أسبوعية",
      pm_h:"طرق الدفع", pm_now:"متاح الآن", pm_bank:"تحويل بنكي", pm_soon:"قريبًا",
      pm_visa:"فيزا", pm_mc:"ماستركارد", pm_meeza:"ميزة", pm_apple:"أبل باي", pm_vf:"فودافون كاش", pm_or:"أورانج كاش", pm_et:"اتصالات كاش (e&)", pm_banks:"محافظ البنوك الأخرى",
      pm_note:"جاري تجهيز الدفع الإلكتروني بالبطاقات والمحافظ الإلكترونية. حاليًا يُرجى الدفع بالتحويل البنكي.",
      btn:"English"
    }
  };

  var PLANS = { daily:{amount:"$250", key:"plan_daily"}, weekly:{amount:"$100", key:"plan_weekly"} };
  var page = document.body.getAttribute("data-page") || "home";
  var lang = "en";
  var plan = "daily";

  try {
    var saved = localStorage.getItem("hl_lang");
    if (saved === "ar" || saved === "en") lang = saved;
    else if ((navigator.language || "").toLowerCase().indexOf("ar") === 0) lang = "ar";
  } catch(e) {
    if ((navigator.language || "").toLowerCase().indexOf("ar") === 0) lang = "ar";
  }

  function fill(msg, vars){
    return msg.replace(/\{(\w+)\}/g, function(_, k){ return vars[k] !== undefined ? vars[k] : ""; });
  }

  function paidLink(){
    var d = T[lang];
    var nameEl = document.getElementById("clientName");
    var name = nameEl && nameEl.value.trim() ? nameEl.value.trim() : "____";
    var text = fill(d.msg_paid, { amount: PLANS[plan].amount, plan: d[PLANS[plan].key], name: name });
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(text);
  }

  function apply(l){
    lang = l;
    var d = T[l];
    var root = document.documentElement;
    root.lang = l;
    root.dir = (l === "ar") ? "rtl" : "ltr";
    document.title = d["title_" + page] || d.title_home;

    document.querySelectorAll("[data-i18n]").forEach(function(el){
      var k = el.getAttribute("data-i18n");
      if (d[k] !== undefined) el.textContent = d[k];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function(el){
      var k = el.getAttribute("data-i18n-ph");
      if (d[k] !== undefined) el.setAttribute("placeholder", d[k]);
    });
    document.querySelectorAll("[data-client]").forEach(function(el){
      el.textContent = d.client + " " + el.getAttribute("data-client");
    });
    document.querySelectorAll("[data-wa]").forEach(function(a){
      var kind = a.getAttribute("data-wa");
      if (kind === "paid") a.href = paidLink();
      else a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(d["msg_" + kind]);
    });
    var btn = document.getElementById("langBtn");
    if (btn) btn.textContent = d.btn;
    try { localStorage.setItem("hl_lang", l); } catch(e) {}
  }

  /* language button */
  var langBtn = document.getElementById("langBtn");
  if (langBtn) langBtn.addEventListener("click", function(){ apply(lang === "en" ? "ar" : "en"); });

  /* copy buttons */
  document.querySelectorAll(".copy").forEach(function(b){
    b.addEventListener("click", function(){
      var t = document.getElementById(b.getAttribute("data-copy")).textContent;
      var done = function(){
        b.textContent = T[lang].copied;
        setTimeout(function(){ b.textContent = T[lang].copy; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t).then(done).catch(function(){});
      }
    });
  });

  /* lightbox (transformations page) */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    document.querySelectorAll(".shot").forEach(function(s){
      s.addEventListener("click", function(){
        lbImg.src = s.getAttribute("data-full");
        lb.classList.add("open");
      });
    });
    var close = function(){ lb.classList.remove("open"); lbImg.removeAttribute("src"); };
    lb.addEventListener("click", close);
    document.addEventListener("keydown", function(e){ if (e.key === "Escape") close(); });
  }

  /* payment page: package picker */
  var picks = document.querySelectorAll('input[name="plan"]');
  if (picks.length) {
    try {
      var q = new URLSearchParams(location.search).get("plan");
      if (q === "daily" || q === "weekly") plan = q;
    } catch(e) {}
    var amountEl = document.getElementById("amountOut");
    var sync = function(){
      picks.forEach(function(r){ r.checked = (r.value === plan); });
      if (amountEl) amountEl.textContent = PLANS[plan].amount;
      var a = document.querySelector('[data-wa="paid"]');
      if (a) a.href = paidLink();
    };
    picks.forEach(function(r){
      r.addEventListener("change", function(){ if (r.checked) { plan = r.value; sync(); } });
    });
    var nameEl = document.getElementById("clientName");
    if (nameEl) nameEl.addEventListener("input", sync);
    sync();
  }

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  apply(lang);
})();
