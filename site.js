/* HealthLife - shared script: language switch (EN/AR), WhatsApp links, copy buttons, lightbox, payment page */
(function(){
  "use strict";

  /* ===== EDIT HERE: contact details ===== */
  var WA = "201050747891"; // WhatsApp number: country code first, no + or leading zeros
  /* Paste your Cloudflare Worker URL here to switch online payment ON. Empty = bank transfer only. */
  var PAYMENT_API = "https://healthlife-pay.abdelrahmansarya90.workers.dev";

  /* ===== EDIT HERE: all website text. "en" = English, "ar" = Arabic ===== */
  var T = {
    en: {
    pk_pay:"Subscribe & pay now", terms_p:"Your diet and workout program is designed individually for you and delivered within 24 hours of payment confirmation. Once your plan has been designed and delivered to you, the amount is non-refundable. If it is not delivered within that time, you may request a refund. Our delivery records (date, time and WhatsApp message status) are valid proof of delivery.", terms_chk:"I have read and agree to the terms above", terms_need:"Please tick the box to agree to the terms.", thx_h:"Thank you! 🎉", thx_p:"Your payment is being confirmed. Send us your order number on WhatsApp and we will verify it and start your program.", thx_o:"Order number", thx_btn:"Send order number on WhatsApp", msg_order:"Hello Coach Abdelrahman, I paid online. My order number is: {order}. Please confirm my payment and start my program.", powered:"Online payments powered by", pk_ask:"Ask on WhatsApp", pm_online:"Online payment", pay_online_h:"Pay online by card or wallet", pay_online_p:"Fill in your details, then you will be taken to a secure Kashier page to finish the payment. We never see your card details.", f_name:"Full name", f_phone:"WhatsApp number", f_email:"Email (optional)", pay_now:"Pay now", pay_wait:"Please wait…", pay_err:"Could not start the payment. Please try again or pay by bank transfer.", pay_need:"Please enter your name and WhatsApp number.", pay_done:"Thank you! Your payment is being confirmed. Please message us on WhatsApp to start.", or_bank:"Or pay by bank transfer",
      /* titles */
      title_home:"HealthLife | Diet & Workout Coaching",
      title_results:"Transformations | HealthLife",
      title_pay:"Pay by Bank Transfer | HealthLife",
      /* nav */
      nav_home:"Home", nav_program:"Program", nav_packages:"Packages", nav_results:"Transformations",
      nav_reviews:"Reviews", nav_pay:"Payment", nav_contact:"Contact", nav_about:"About", ab_eyebrow:"About HealthLife", ab_h:"Real coaching, backed by science", ab_p:"HealthLife started in 2018, and since then we have helped more than 5,000 people build better health and fitness. Led by Coach Abdelrahman together with a team of nutrition specialists and fitness instructors, we design a personal nutrition plan and training plan for every client, and follow up step by step until they reach their goal. Our clients come from all around the world.", ab_s1:"Our journey began", ab_s2:"People supported", ab_s3n:"Worldwide", ab_s3:"Clients from many countries", ab_s4:"Real personal follow-up", ab_c1h:"Nutrition", ab_c1p:"Personal meal plans built around your goal, your body and your food preferences, grounded in nutrition science.", ab_c2h:"Training", ab_c2p:"Progressive workout plans matched to your level and where you train, at the gym or at home.", ab_c3h:"Mindset and habits", ab_c3p:"We work on your habits and motivation using approaches from sports psychology and nutrition psychology, so results last.", ab_cred:"Our specialists hold professional certifications in nutrition, fitness training, sports psychology and nutrition psychology.", ab_note:"HealthLife provides coaching and health education. It is not a substitute for medical care.",
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
      pk_join:"Join on WhatsApp",
      pk2_tag:"GREAT VALUE", pk2_h:"Weekly Follow-up",
      pk2_l3:"Weekly follow-up via WhatsApp",
      why_h:"Why we recommend Daily Follow-up",
      why_p:"Daily contact with your coach keeps you motivated, accountable and on track. That is what turns a plan into a real transformation.",
      why_stat_t:"Daily follow-up means a real coach checks in with you every day. See real client results on the Transformations page.",
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
      msg_paid:"Hello Coach, I have transferred {amount} for the {plan} package. My name: {name}. I am sending the receipt now.",
      plan_daily:"3-month DAILY follow-up", plan_weekly:"3-month WEEKLY follow-up",
      pm_h:"Payment Methods", pm_now:"Available now", pm_bank:"Bank transfer", pm_soon:"Coming soon",
      pm_visa:"Visa", pm_mc:"Mastercard", pm_meeza:"Meeza", pm_apple:"Apple Pay", pm_vf:"Vodafone Cash", pm_or:"Orange Cash", pm_et:"Etisalat Cash (e&)", pm_banks:"Other bank wallets",
      pm_note:"Online payment by card and mobile wallet is being set up. For now, please pay by bank transfer.",
            nav_book:"Recipe Book", pky_h:"1-Year Packages", pky_sub:"Best value: a full year of follow-up with a big discount.", pky_dur:"for 1 year", pky1_h:"1-Year Daily Follow-up", pky2_h:"1-Year Weekly Follow-up", pky1_tag:"SAVE $700", pky2_tag:"SAVE $600", msg_yearly_daily:"Hello Coach, I want the 1-year DAILY follow-up package ($1000).", msg_yearly_weekly:"Hello Coach, I want the 1-year WEEKLY follow-up package ($400).", home_fit_h:"Strength & Fitness Encyclopedia", home_fit_p:"200+ pages: military, weights, CrossFit, home fat-burning, hormones, recovery and consistency. Arabic & English editions.", home_fit_btn:"See the book - $10", title_book:"HealthLife Recipes Book | HealthLife",
      fx_note:"Prices are in US dollars. You pay the equivalent in Egyptian pounds at the current exchange rate. The exact amount is shown on the secure Kashier page before you pay.",
      plan_book:"HealthLife Recipes book",
      msg_order_book:"Hello Coach Abdelrahman, I paid online for the HealthLife Recipes book. My order number is: {order}. Please send me my copy.",
      bk_h:"HealthLife Recipes", bk_p:"72 halal recipes from 24 world kitchens. Every ingredient in grams, every calorie counted.",
      bk_price_l:"Price", bk_now:"Buy the book",
      bk_1:"72 complete recipes with ingredient weights and step-by-step method", bk_2:"Calories per serving and for the whole recipe", bk_3:"No pork and no alcohol in any recipe", bk_4:"Food science and allergen information for each kitchen, with a references page", bk_5:"126-page PDF in Arabic or English, easy to read on phone, tablet or computer",
      bk_how_h:"How you get your copy", bk_how:"After payment your personal download link appears right here, instantly. You can also ask for your copy on WhatsApp.",
      bk_terms_p:"Your copy is personal and for your own use only. It is a digital product: once your copy has been delivered the amount is non-refundable. If it is not delivered within 24 hours of payment confirmation, you may request a refund. The book gives general information and is not medical advice.",
      bk_thx_p:"Thank you! We are confirming your payment. Your download link will appear below in a moment.",

      nav_fitness:"Fitness Book", nav_sim:"Simulator", nav_coach:"Client Link", nav_assess:"Health Check", sim_h:"See your future self", sim_p:"Free body simulator: enter your height and weight, add a photo, choose your goal, and see an illustration of how you could look. Your photo is not saved.", sim_btn:"Try the simulator", hs_h:"Complete Health Screening", hs_p:"Answer science-based questionnaires and get a detailed report: body, mental health, child health and personality, with your indicators and next steps. Questions are free; the report starts at $4.", hs_btn:"Start the health screening", title_fitness:"Strength & Fitness Encyclopedia | HealthLife", plan_fitness:"Strength & Fitness Encyclopedia", plan_yearly_daily:"1-year DAILY follow-up", plan_yearly_weekly:"1-year WEEKLY follow-up",
      msg_order_fitness:"Hello Coach Abdelrahman, I paid online for the Strength & Fitness Encyclopedia. My order number is: {order}. Please send me my copy.",
      ft_h:"The Strength & Fitness Encyclopedia", ft_p:"The science of strength, fat loss, resilience and courage: military, weights, CrossFit and home training, in one book.",
      ft_1:"Over 200 pages with 49 illustrations: step-by-step exercise figures and science diagrams", ft_2:"17 chapters: hormones and nerves, men and women, muscle biomechanics, tendons and fascia, ancient and modern military training, weights, CrossFit and HIIT, fighter conditioning", ft_3:"Complete home fat-burning workouts with exact timings, sets and reps; 12-week plans for beginner, intermediate and advanced", ft_4:"Training while fasting, hydration, breathing and meditation, massage and recovery, with clear safety rules", ft_5:"Motivation science: how to stay consistent even on the worst days. Available in Arabic or English (PDF)",
      ft_how:"After payment your personal download link appears right here, instantly. You can also ask for your copy on WhatsApp.",
      ft_terms_p:"This is a digital product for your personal use only; sharing or reselling it is not allowed. Once the download link has been issued the amount is non-refundable. If you cannot download your copy, contact us and we will send it or refund you. The book gives general educational information and is not medical advice; see a doctor before starting, especially with a health condition.",
      ft_thx_p:"Thank you! We are confirming your payment. Your download link will appear below in a moment.",
      ed_l:"Choose your edition", ed_ar:"Arabic edition", ed_en:"English edition",
      dl_wait:"Confirming your payment… this usually takes a few seconds.", dl_btn:"Download your book (PDF)", dl_ready:"Payment confirmed. Your download is ready.", dl_note:"The link works for 72 hours and you can re-open this page any time (for 30 days) to get a new link. Please keep your copy private.", dl_fail:"The payment was not completed. You have not been charged. You can try again.", dl_review:"We received your payment and are checking it. Please message us on WhatsApp with your order number and we will send your copy.", dl_slow:"Still confirming. You can wait here, or tap the button below to ask for your copy on WhatsApp.", dl_ask:"Ask for my copy on WhatsApp",
      nav_glow:"Natures Glow", home_cal_h:"Meal Calorie Scanner", home_cal_p:"Take a photo of your meal and get an estimated calories and macros report. 3 free tries.", home_cal_btn:"Try it free", home_eye_h:"Eye Awareness Check", home_eye_p:"Take a photo of your eyes and see 6 visible signs that may be worth discussing with a doctor. Awareness only, not a diagnosis. $3 for 30 days (also unlocks the calorie scanner).", home_eye_btn:"Try the Eye Check", home_glow_h:"Nature's Glow Encyclopedia", home_glow_p:"Natural beauty, skin and calm: exact recipes in grams, face and fascia exercises, breathing and meditation. Arabic and English editions.", home_glow_btn:"See the book - $6.99", title_glow:"Nature's Glow Encyclopedia | HealthLife", plan_glow:"Nature's Glow Encyclopedia",
      msg_order_glow:"Hello Coach Abdelrahman, I paid online for the Nature's Glow Encyclopedia. My order number is: {order}. Please send me my copy.",
      gl_h:"Nature's Glow", gl_p:"The HealthLife encyclopedia of natural beauty, skin and calm: exact recipes in grams, face and fascia exercises, breathing, meditation, scents and herbs.",
      gl_1:"12 parts and 9 appendices: skin science, ingredients, safety, preservation, 16 recipes by percentage, and answers for common skin concerns", gl_2:"Face yoga with 12 movements, each linked to fascia massage and scalp care, plus a 10-minute daily sequence", gl_3:"Breathing and meditation practices with clear safety rules, and scents and herbs for relaxation", gl_4:"Beauty rituals from Egypt, Greece and Rome, India, East Asia, the Middle East and Africa, separating proven benefit from myth", gl_5:"A 28-day programme and a seasonal guide, with every claim graded by strength of evidence. About 49 pages in English or 46 in Arabic (PDF). The two editions are separate books",
      gl_how:"After payment your personal download link appears right here, instantly. You can also ask for your copy on WhatsApp.",
      gl_terms_p:"This is a digital product for your personal use only; sharing or reselling it is not allowed. Once the download link has been issued the amount is non-refundable. If you cannot download your copy, contact us and we will send it or refund you. The book is an educational reference and not medical advice. Patch-test every recipe before use and see a doctor for any skin or health condition.",
      gl_thx_p:"Thank you! We are confirming your payment. Your download link will appear below in a moment.",
      egp_now:"About {egp} EGP today",
      btn:"العربية"
    },
    ar: {
    pk_pay:"اشترك وادفع الآن", terms_p:"يتم تصميم برنامجك الغذائي والتدريبي خصيصاً لك وتسليمه خلال 24 ساعة من تأكيد الدفع. بعد اكتمال تصميم خطتك وتسليمها لك لا يمكن استرداد المبلغ. وإذا لم يتم التسليم خلال المدة المذكورة يمكنك طلب الاسترداد. وسجلات التسليم لدينا (التاريخ والوقت وحالة رسالة الواتساب) تُعد إثباتاً صحيحاً للتسليم.", terms_chk:"قرأت الشروط أعلاه وأوافق عليها", terms_need:"من فضلك علّم على خانة الموافقة على الشروط.", thx_h:"شكراً لك! 🎉", thx_p:"جاري تأكيد دفعتك. ابعتلنا رقم الطلب على واتساب وهنراجعه ونبدأ برنامجك.", thx_o:"رقم الطلب", thx_btn:"ابعت رقم الطلب على واتساب", msg_order:"أهلاً كابتن عبدالرحمن، دفعت أونلاين. رقم طلبي: {order}. من فضلك أكد الدفع وابدأ برنامجي.", powered:"الدفع الإلكتروني بواسطة", pk_ask:"اسأل على واتساب", pm_online:"الدفع الإلكتروني", pay_online_h:"ادفع أونلاين بالكارت أو المحفظة", pay_online_p:"اكتب بياناتك وهننقلك لصفحة كاشير الآمنة لإتمام الدفع. إحنا مش بنشوف بيانات الكارت أبداً.", f_name:"الاسم بالكامل", f_phone:"رقم الواتساب", f_email:"الإيميل (اختياري)", pay_now:"ادفع الآن", pay_wait:"استنى لحظة…", pay_err:"مقدرناش نبدأ الدفع. جرّب تاني أو ادفع بتحويل بنكي.", pay_need:"من فضلك اكتب اسمك ورقم الواتساب.", pay_done:"شكراً! جاري تأكيد الدفع. ابعتلنا على واتساب لنبدأ.", or_bank:"أو ادفع بتحويل بنكي",
      title_home:"هيلث لايف | نظام غذائي وخطة تمارين",
      title_results:"التحولات | هيلث لايف",
      title_pay:"الدفع بالتحويل البنكي | هيلث لايف",
      nav_home:"الرئيسية", nav_program:"البرنامج", nav_packages:"الباقات", nav_results:"التحولات",
      nav_reviews:"آراء العملاء", nav_pay:"الدفع", nav_contact:"تواصل معنا", nav_about:"من نحن", ab_eyebrow:"عن HealthLife", ab_h:"كوتشنج حقيقي مبني على العلم", ab_p:"بدأت HealthLife في عام 2018، ومن وقتها ساعدنا أكتر من 5,000 شخص على بناء صحة ولياقة أفضل. بقيادة الكابتن عبد الرحمن وفريق من أخصائيي التغذية ومدربي اللياقة، بنصمم لكل عميل نظام غذائي وخطة تمرين تناسبه، ونتابعه خطوة بخطوة لحد ما يوصل لهدفه. وعملاؤنا من مختلف أنحاء العالم.", ab_s1:"بدأت رحلتنا", ab_s2:"شخص ساعدناهم", ab_s3n:"كل العالم", ab_s3:"عملاء من دول كثيرة", ab_s4:"متابعة شخصية حقيقية", ab_c1h:"التغذية", ab_c1p:"أنظمة غذائية مخصصة لهدفك وجسمك وتفضيلاتك، مبنية على أسس علم التغذية.", ab_c2h:"التدريب", ab_c2p:"خطط تمرين متدرجة تناسب مستواك ومكان تدريبك، في الجيم أو البيت.", ab_c3h:"العقلية والعادات", ab_c3p:"بنشتغل على عاداتك وتحفيزك بأساليب من علم النفس الرياضي وعلم نفس التغذية، عشان النتيجة تستمر.", ab_cred:"فريقنا من المتخصصين حاصلون على شهادات مهنية في التغذية، وتدريب اللياقة، وعلم النفس الرياضي، وعلم نفس التغذية.", ab_note:"HealthLife تقدم تدريبًا وتثقيفًا صحيًا، وليست بديلًا عن الرعاية الطبية.",
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
      pk_join:"اشترك عبر واتساب",
      pk2_tag:"قيمة ممتازة", pk2_h:"متابعة أسبوعية",
      pk2_l3:"متابعة أسبوعية عبر واتساب",
      why_h:"لماذا ننصح بالمتابعة اليومية؟",
      why_p:"التواصل اليومي مع الكابتن يبقيك متحمسًا وملتزمًا وعلى المسار الصحيح، وهذا ما يحوّل الخطة إلى تحول حقيقي.",
      why_stat_t:"المتابعة اليومية معناها إن في كابتن حقيقي بيتابع معاك كل يوم. شوف نتايج عملاء حقيقيين في صفحة التحوّلات.",
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
      msg_paid:"مرحبًا كابتن، قمت بتحويل {amount} لباقة {plan}. اسمي: {name}. سأرسل لك الإيصال الآن.",
      plan_daily:"متابعة يومية لمدة 3 شهور", plan_weekly:"متابعة أسبوعية لمدة 3 شهور",
      pm_h:"طرق الدفع", pm_now:"متاح الآن", pm_bank:"تحويل بنكي", pm_soon:"قريبًا",
      pm_visa:"فيزا", pm_mc:"ماستركارد", pm_meeza:"ميزة", pm_apple:"أبل باي", pm_vf:"فودافون كاش", pm_or:"أورانج كاش", pm_et:"اتصالات كاش (e&)", pm_banks:"محافظ البنوك الأخرى",
      pm_note:"جاري تجهيز الدفع الإلكتروني بالبطاقات والمحافظ الإلكترونية. حاليًا يُرجى الدفع بالتحويل البنكي.",
            nav_book:"كتاب الوصفات", pky_h:"باقات السنة الكاملة", pky_sub:"أفضل قيمة: سنة كاملة من المتابعة بخصم كبير.", pky_dur:"لمدة سنة", pky1_h:"متابعة يومية لمدة سنة", pky2_h:"متابعة أسبوعية لمدة سنة", pky1_tag:"وفّر 700$", pky2_tag:"وفّر 600$", msg_yearly_daily:"مرحبًا كابتن، أريد باقة المتابعة اليومية لمدة سنة (1000$).", msg_yearly_weekly:"مرحبًا كابتن، أريد باقة المتابعة الأسبوعية لمدة سنة (400$).", home_fit_h:"موسوعة اللياقة والقوة", home_fit_p:"أكثر من 200 صفحة: عسكري، حديد، كروسفت، حرق دهون في البيت، هرمونات، استشفاء وثبات. نسختان عربي وإنجليزي.", home_fit_btn:"شوف الكتاب - 10$", title_book:"كتاب HealthLife Recipes | هيلث لايف",
      fx_note:"الأسعار بالدولار الأمريكي. هتدفع ما يعادلها بالجنيه المصري بسعر الصرف الحالي، والمبلغ الدقيق بيظهر لك في صفحة كاشير الآمنة قبل ما تدفع.",
      plan_book:"كتاب HealthLife Recipes",
      msg_order_book:"أهلاً كابتن عبدالرحمن، دفعت أونلاين ثمن كتاب HealthLife Recipes. رقم طلبي: {order}. من فضلك ابعتلي نسختي.",
      bk_h:"HealthLife Recipes", bk_p:"72 وصفة حلال من 24 مطبخ حول العالم. كل مكوّن بالجرام وكل سعر حراري محسوب. (الكتاب بالإنجليزية)",
      bk_price_l:"السعر", bk_now:"اشترِ الكتاب",
      bk_1:"72 وصفة كاملة بأوزان المكونات وخطوات التحضير", bk_2:"السعرات لكل حصة وللوصفة كاملة", bk_3:"بدون لحم خنزير وبدون كحول في أي وصفة", bk_4:"معلومات علمية وعن مسببات الحساسية لكل مطبخ مع صفحة مراجع", bk_5:"ملف PDF من 126 صفحة بالإنجليزية، سهل القراءة على الموبايل أو التابلت أو الكمبيوتر",
      bk_how_h:"إزاي تستلم نسختك", bk_how:"بعد الدفع هيظهر لك رابط تحميل نسختك هنا فوراً. وتقدر كمان تطلب نسختك على واتساب.",
      bk_terms_p:"نسختك شخصية ولاستخدامك أنت فقط. هذا منتج رقمي: بعد تسليم نسختك لا يمكن استرداد المبلغ. وإذا لم يتم التسليم خلال 24 ساعة من تأكيد الدفع يمكنك طلب الاسترداد. الكتاب يقدم معلومات عامة وليس نصيحة طبية.",
      bk_thx_p:"شكراً لك! بنأكد دفعتك. هيظهر رابط التحميل تحت بعد لحظات.",
      nav_fitness:"كتاب اللياقة", nav_sim:"المحاكي", nav_coach:"لينك العميل", nav_assess:"الفحص الصحي", sim_h:"شوف نفسك بعد التغيير", sim_p:"محاكي جسم مجاني: اكتب طولك ووزنك، ضيف صورتك، اختار هدفك، وشوف رسم توضيحي لشكلك المتوقع. صورتك مش بتتحفظ.", sim_btn:"جرّب المحاكي", hs_h:"الفحص الصحي الشامل", hs_p:"جاوب على استبيانات علمية واحصل على تقرير مفصل: الجسم، الصحة النفسية، صحة الطفل، والشخصية، بمؤشراتك وخطواتك التالية. الأسئلة مجانية والتقرير يبدأ من 4 دولار.", hs_btn:"ابدأ الفحص الصحي", title_fitness:"موسوعة اللياقة والقوة | هيلث لايف", plan_fitness:"موسوعة اللياقة والقوة", plan_yearly_daily:"متابعة يومية لمدة سنة", plan_yearly_weekly:"متابعة أسبوعية لمدة سنة",
      msg_order_fitness:"أهلاً كابتن عبدالرحمن، دفعت أونلاين ثمن موسوعة اللياقة والقوة. رقم طلبي: {order}. من فضلك ابعتلي نسختي.",
      ft_h:"موسوعة اللياقة والقوة", ft_p:"علم القوة وحرق الدهون والصلابة والشجاعة: عسكري وأثقال وكروس فيت وتمارين منزلية في كتاب واحد.",
      ft_1:"أكثر من 200 صفحة مع 49 صورة: رسومات تمارين خطوة بخطوة ورسوم علمية", ft_2:"17 فصلاً: الهرمونات والأعصاب، الرجال والنساء، ميكانيكا العضلة، الأوتار والنسيج الضام، تدريب الحضارات القديمة والجيوش الحديثة، الأثقال، كروس فيت وHIIT، لياقة المقاتل", ft_3:"تمارين منزلية كاملة لحرق الدهون بالتوقيتات والمجموعات والتكرارات، وخطط 12 أسبوعاً للمبتدئ والمتوسط والمتقدم", ft_4:"التمرين أثناء الصيام، الترطيب، التنفس والتأمل، المساج والاستشفاء، مع قواعد أمان واضحة", ft_5:"علم الدافع: إزاي تستمر حتى في أسوأ الأيام. متاح بالعربي أو الإنجليزي (PDF)",
      ft_how:"بعد الدفع هيظهر لك رابط تحميل نسختك هنا فوراً. وتقدر كمان تطلب نسختك على واتساب.",
      ft_terms_p:"هذا منتج رقمي لاستخدامك الشخصي فقط، ولا يُسمح بمشاركته أو إعادة بيعه. بعد إصدار رابط التحميل لا يمكن استرداد المبلغ. وإذا لم تستطع تحميل نسختك تواصل معنا وسنرسلها لك أو نرد المبلغ. الكتاب يقدم معلومات تثقيفية عامة وليس نصيحة طبية؛ استشر طبيباً قبل البدء خاصة مع وجود مرض.",
      ft_thx_p:"شكراً لك! بنأكد دفعتك. هيظهر رابط التحميل تحت بعد لحظات.",
      ed_l:"اختر النسخة", ed_ar:"النسخة العربية", ed_en:"النسخة الإنجليزية",
      dl_wait:"جاري تأكيد الدفع… بياخد ثواني عادةً.", dl_btn:"حمّل كتابك (PDF)", dl_ready:"تم تأكيد الدفع. التحميل جاهز.", dl_note:"الرابط يعمل 72 ساعة، وتقدر تفتح الصفحة دي في أي وقت (لمدة 30 يوماً) للحصول على رابط جديد. من فضلك حافظ على خصوصية نسختك.", dl_fail:"لم تكتمل عملية الدفع ولم يتم خصم أي مبلغ. تقدر تحاول مرة أخرى.", dl_review:"استلمنا دفعتك وبنراجعها. ابعتلنا رقم الطلب على واتساب وهنبعتلك نسختك.", dl_slow:"لسه بنأكد. تقدر تنتظر هنا أو تضغط الزر تحت وتطلب نسختك على واتساب.", dl_ask:"اطلب نسختي على واتساب",
      nav_glow:"نور الطبيعة", home_cal_h:"ماسح سعرات الوجبة", home_cal_p:"صوّر وجبتك واحصل على تقرير تقريبي بالسعرات والبروتين والكارب والدهون. 3 تجارب مجانية.", home_cal_btn:"جرّبه مجاناً", home_eye_h:"فحص العين التوعوي", home_eye_p:"صوّر عينيك وشوف 6 علامات ظاهرة ممكن تستحق إنك تعرضها على دكتور. للتوعية فقط مش تشخيص. 3$ لمدة 30 يوم (وبيفتح كمان ماسح السعرات).", home_eye_btn:"جرّب فحص العين", home_glow_h:"موسوعة نور الطبيعة", home_glow_p:"الجمال الطبيعي والبشرة والسكينة: وصفات بالجرام، تمارين الوجه والفاشيا، تنفس وتأمل. نسخة عربي ونسخة إنجليزي.", home_glow_btn:"شوف الكتاب - 6.99$", title_glow:"موسوعة نور الطبيعة | هيلث لايف", plan_glow:"موسوعة نور الطبيعة",
      msg_order_glow:"أهلاً كابتن عبدالرحمن، دفعت أونلاين ثمن موسوعة نور الطبيعة. رقم طلبي: {order}. من فضلك ابعتلي نسختي.",
      gl_h:"نور الطبيعة", gl_p:"موسوعة هيلث لايف للجمال الطبيعي والبشرة والسكينة: وصفات بالجرام، تمارين الوجه والفاشيا، تنفس وتأمل، عطور وأعشاب.",
      gl_1:"12 بابًا و9 ملاحق: علم البشرة، المكونات، السلامة، الحفظ، 16 وصفة بالنسب المئوية، وحلول لمشاكل البشرة الشائعة", gl_2:"يوغا الوجه في 12 حركة، كل حركة مرتبطة بمساج الفاشيا وفروة الرأس، مع تسلسل يومي لمدة 10 دقائق", gl_3:"تمارين تنفس وتأمل بقواعد أمان واضحة، وعطور وأعشاب للاسترخاء", gl_4:"طقوس الجمال في مصر واليونان وروما والهند وشرق آسيا والشرق الأوسط وأفريقيا، مع التفريق بين الفائدة المثبتة والخرافة", gl_5:"برنامج 28 يومًا ودليل المواسم، وكل معلومة مصنفة حسب قوة الدليل. حوالي 46 صفحة بالعربي أو 49 بالإنجليزي (PDF). النسختان كتابان منفصلان",
      gl_how:"بعد الدفع هيظهر لك رابط تحميل نسختك هنا فوراً. وتقدر كمان تطلب نسختك على واتساب.",
      gl_terms_p:"هذا منتج رقمي لاستخدامك الشخصي فقط، ولا يُسمح بمشاركته أو إعادة بيعه. بعد إصدار رابط التحميل لا يمكن استرداد المبلغ. وإذا لم تستطع تحميل نسختك تواصل معنا وسنرسلها لك أو نرد المبلغ. الكتاب مرجع تعليمي وليس نصيحة طبية. جرّب أي وصفة على بقعة صغيرة من الجلد قبل الاستخدام، واستشر طبيباً عند وجود أي مشكلة جلدية أو صحية.",
      gl_thx_p:"شكراً لك! بنأكد دفعتك. هيظهر رابط التحميل تحت بعد لحظات.",
      egp_now:"حوالي {egp} جنيه بسعر اليوم",
      btn:"English"
    }
  };

  var PLANS = { daily:{amount:"$250", key:"plan_daily"}, weekly:{amount:"$100", key:"plan_weekly"}, book:{amount:"$4.99", key:"plan_book"}, fitness:{amount:"$10", key:"plan_fitness"}, glow:{amount:"$6.99", key:"plan_glow"}, yearly_daily:{amount:"$1000", key:"plan_yearly_daily"}, yearly_weekly:{amount:"$400", key:"plan_yearly_weekly"} };
  var page = document.body.getAttribute("data-page") || "home";
  var lang = "en";
  var plan = document.body.getAttribute("data-plan") || "daily";

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
      else if (kind === "order") a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent((page === "book" ? d.msg_order_book : page === "fitness" ? d.msg_order_fitness : page === "glow" ? d.msg_order_glow : d.msg_order).replace("{order}", (typeof orderId !== "undefined" ? orderId : "")));
      else a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(d["msg_" + kind]);
    });
    document.querySelectorAll("img[data-src-en]").forEach(function(im){ im.src = im.getAttribute("data-src-" + l); });
    if (typeof refreshEgp === "function") refreshEgp();
    if (typeof syncEd === "function") syncEd();
    if (typeof refreshDl === "function") refreshDl();
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
      if (q === "daily" || q === "weekly" || q === "yearly_daily" || q === "yearly_weekly") plan = q;
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

  /* online payment: ON only when PAYMENT_API is set */
  var LIVE = !!PAYMENT_API;
  var orderId = "";
  try {
    var qo = new URLSearchParams(location.search);
    var o = qo.get("order") || "";
    if (qo.get("status") === "done" && /^HL-[a-z_]+-[a-z0-9-]+$/i.test(o)) orderId = o;
  } catch(e) {}
  if (LIVE) {
    T.en.pay_page_h = "Pay Online or by Bank Transfer";
    T.en.pay_page_p = "Choose your package and pay securely by card or mobile wallet, or transfer to our bank account and send us the receipt on WhatsApp.";
    T.en.title_pay = "Payment | HealthLife";
    T.ar.pay_page_h = "ادفع أونلاين أو بتحويل بنكي";
    T.ar.pay_page_p = "اختار باقتك وادفع بأمان بالكارت أو المحفظة، أو حوّل على حسابنا البنكي وابعتلنا الإيصال على واتساب.";
    T.ar.title_pay = "الدفع | HealthLife";
    apply(lang);
  }
  if (LIVE) {
    T.en.pay_page_h = "Pay Online or by Bank Transfer";
    T.en.pay_page_p = "Choose your package, then pay by card or mobile wallet, or transfer to our bank account and send us the receipt on WhatsApp.";
    T.en.title_pay = "Payment | HealthLife";
    T.ar.pay_page_h = "ادفع أونلاين أو بتحويل بنكي";
    T.ar.pay_page_p = "اختار باقتك وادفع بالكارت أو المحفظة الإلكترونية، أو حوّل على حسابنا البنكي وابعتلنا الإيصال على واتساب.";
    T.ar.title_pay = "الدفع | HealthLife";
  }
  document.querySelectorAll("[data-live]").forEach(function(el){ el.hidden = !LIVE; });
  document.querySelectorAll("[data-offline]").forEach(function(el){ el.hidden = LIVE; });
  var thanks = document.getElementById("thanks");
  if (thanks && LIVE && orderId) {
    thanks.hidden = false;
    var oe = document.getElementById("orderNo"); if (oe) oe.textContent = orderId;
    document.querySelectorAll("[data-hide-done]").forEach(function(el){ el.hidden = true; });
    apply(lang);
    try { thanks.scrollIntoView(); } catch(e) {}
  }
  /* ---- book pages: show the price in EGP at today's rate ---- */
  var egpEl = document.getElementById("egpNow"); var egpVal = 0;
  function refreshEgp(){ if (egpEl && egpVal) egpEl.textContent = T[lang].egp_now.replace("{egp}", egpVal.toLocaleString("en-US")); }
  if (LIVE && egpEl) {
    fetch(PAYMENT_API).then(function(r){ return r.json(); }).then(function(d){
      var usd = d && d.usd && d.usd[plan]; if (usd && d.rate) { egpVal = Math.ceil(usd * d.rate); refreshEgp(); }
    }).catch(function(){});
  }
  /* ---- after payment: confirm with the server and show the download button ---- */
  var dlBox = document.getElementById("dlBox"); var dlState = "wait", dlUrl = "";
  function refreshDl(){
    if (!dlBox) return; var d = T[lang];
    var msg = dlState === "wait" ? d.dl_wait : dlState === "slow" ? d.dl_slow : dlState === "paid" ? d.dl_ready : dlState === "failed" ? d.dl_fail : dlState === "review" ? d.dl_review : "";
    var m = document.getElementById("dlMsg"); if (m) m.textContent = msg;
    var b = document.getElementById("dlBtn"); if (b) { b.hidden = !(dlState === "paid" && dlUrl); if (dlUrl) b.href = dlUrl; b.textContent = d.dl_btn; }
    var n = document.getElementById("dlNote"); if (n) { n.hidden = dlState !== "paid"; n.textContent = d.dl_note; }
    var w = document.getElementById("dlAsk"); if (w) { w.hidden = !(dlState === "slow" || dlState === "review" || dlState === "paid"); w.textContent = d.dl_ask; }
  }
  if (dlBox && LIVE && orderId) {
    var tries = 0;
    var poll = function(){
      tries++;
      fetch(PAYMENT_API.replace(/\/$/,"") + "/order?id=" + encodeURIComponent(orderId)).then(function(r){ return r.json(); }).then(function(d){
        if (d.state === "paid") { dlState = "paid"; dlUrl = d.download || ""; if (!dlUrl) dlState = "review"; refreshDl(); return; }
        if (d.state === "failed" || d.state === "expired") { dlState = "failed"; refreshDl(); return; }
        if (d.state === "review") { dlState = "review"; refreshDl(); return; }
        if (tries > 30) { dlState = "slow"; refreshDl(); return; }
        if (tries > 12) { dlState = "slow"; refreshDl(); }
        setTimeout(poll, 4000);
      }).catch(function(){ if (tries < 40) setTimeout(poll, 5000); else { dlState = "slow"; refreshDl(); } });
    };
    refreshDl(); poll();
  }
  var edTouched = false;
  document.querySelectorAll("input[name=edition]").forEach(function(r){ r.addEventListener("change", function(){ edTouched = true; }); });
  function syncEd(){ if (edTouched) return; var r = document.querySelector("input[name=edition][value=" + lang + "]"); if (r) r.checked = true; }
  syncEd();
  var payBtn = document.getElementById("payNow");
  var priceEl = document.getElementById("onlinePrice");
  if (LIVE && priceEl) {
    var showPrice = function(){ priceEl.textContent = T[lang].fx_note; };
    showPrice();
    var lbBtn = document.getElementById("langBtn"); if (lbBtn) lbBtn.addEventListener("click", function(){ setTimeout(showPrice, 0); });
  }
  if (payBtn && LIVE) {
    var msgEl = document.getElementById("payMsg");
    var say = function(k){ if (msgEl) msgEl.textContent = k ? T[lang][k] : ""; };
    payBtn.addEventListener("click", function(){
      var n = document.getElementById("pName").value.trim();
      var p = document.getElementById("pPhone").value.trim();
      var e = document.getElementById("pEmail").value.trim();
      if (n.length < 2 || p.replace(/\D/g,"").length < 7) { say("pay_need"); return; }
      var tc = document.getElementById("agree");
      if (tc && !tc.checked) { say("terms_need"); return; }
      payBtn.disabled = true; say("pay_wait");
      fetch(PAYMENT_API, { method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ plan:plan, name:n, phone:p, email:e, lang:lang, edition:(document.querySelector("input[name=edition]:checked")||{}).value || lang }) })
        .then(function(r){ return r.json(); })
        .then(function(d){ if (d && d.url) { location.href = d.url; } else { throw 0; } })
        .catch(function(){ payBtn.disabled = false; say("pay_err"); });
    });
  }
  /* whole package card opens the payment page */
  document.querySelectorAll(".plan[data-plan]").forEach(function(c){
    c.style.cursor = "pointer";
    c.addEventListener("click", function(ev){
      if (ev.target.closest("a,button")) return;
      location.href = "payment.html?plan=" + c.getAttribute("data-plan");
    });
  });

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  apply(lang);
})();

/* ---- local-currency price guide: shows "≈ price in your currency" next to dollar prices (display only) ---- */
(function () {
  var API = "https://healthlife-pay.abdelrahmansarya90.workers.dev/";
  var SUP = ["EGP", "SAR", "AED", "KWD", "QAR", "BHD", "OMR", "JOD", "IQD", "MAD", "DZD", "TND", "LYD", "EUR", "GBP", "CAD", "AUD", "TRY"];
  var AR = { EGP: "جنيه", SAR: "ريال سعودي", AED: "درهم إماراتي", KWD: "دينار كويتي", QAR: "ريال قطري", BHD: "دينار بحريني", OMR: "ريال عماني", JOD: "دينار أردني", IQD: "دينار عراقي", MAD: "درهم مغربي", DZD: "دينار جزائري", TND: "دينار تونسي", LYD: "دينار ليبي", EUR: "يورو", GBP: "جنيه إسترليني", CAD: "دولار كندي", AUD: "دولار أسترالي", TRY: "ليرة تركية" };
  var st = { rates: null, auto: "", cur: "" };
  function lang() { return document.documentElement.lang === "ar" ? "ar" : "en"; }
  try { st.cur = localStorage.getItem("hl_cur") || ""; } catch (e) {}
  var DEC = { IQD: 0, KWD: 3, BHD: 3, OMR: 3, JOD: 3, TND: 3, LYD: 3 };
  function exact(v, c) { if (c === "EGP") return Math.ceil(v); var d = DEC[c] !== undefined ? DEC[c] : 2, f = Math.pow(10, d); return Math.round(v * f) / f; } /* EGP: rounded up to a whole pound, same as the checkout */
  function active() { var c = st.cur || st.auto; return c === "USD" || !st.rates || !st.rates[c] ? "" : c; }
  function fmt(usd) {
    var c = active(); if (!c) return "";
    var v = exact(usd * st.rates[c], c), l = lang(), d = DEC[c] !== undefined ? DEC[c] : (c === "EGP" ? 0 : 2);
    return v.toLocaleString(l === "ar" ? "ar-EG" : "en-US", { minimumFractionDigits: d, maximumFractionDigits: d }) + " " + (l === "ar" ? AR[c] : c);
  }
  window.HLCur = { local: fmt };
  function mark() {
    document.querySelectorAll(".price,.p").forEach(function (el) {
      var u = el.getAttribute("data-usd");
      if (!u) { var m = (el.firstChild && el.firstChild.nodeType === 3 ? el.firstChild.nodeValue : el.textContent).trim().match(/^\$\s*([\d.,]+)$/); if (!m) return; u = m[1].replace(/,/g, ""); el.setAttribute("data-usd", u); }
      var s = el.querySelector(".loc"); if (!s) { s = document.createElement("small"); s.className = "loc"; s.style.cssText = "display:block;font-size:.5em;font-weight:600;opacity:.8;margin-top:2px"; el.appendChild(s); }
      s.textContent = fmt(Number(u));
    });
    var n = document.getElementById("curNote"); if (n) n.textContent = lang() === "ar" ? "السعر بعملتك محسوب بسعر الصرف الحالي (مباشر). الأسعار الأساسية بالدولار، والمبلغ النهائي المحصَّل يظهر في صفحة الدفع الآمنة." : "Your-currency price is converted at today's live exchange rate. Base prices are in US dollars; the final charged amount is shown on the secure payment page.";
    var lb = document.getElementById("curLbl"); if (lb) lb.textContent = lang() === "ar" ? "العملة:" : "Currency:";
    var sel = document.getElementById("curSel"); if (sel) { sel.options[0].textContent = lang() === "ar" ? "تلقائي حسب بلدك" : "Auto (your country)"; sel.options[1].textContent = lang() === "ar" ? "دولار فقط" : "US dollar only"; for (var i = 2; i < sel.options.length; i++) { var c = sel.options[i].value; sel.options[i].textContent = c + (lang() === "ar" ? " — " + AR[c] : ""); } }
    window.dispatchEvent(new Event("hlcur"));
  }
  function bar() {
    if (document.getElementById("curBar")) return;
    var h = document.querySelector("header"); if (!h) return;
    var d = document.createElement("div"); d.id = "curBar"; d.style.cssText = "display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center;padding:8px 14px;font-size:13px;background:rgba(182,240,0,.06);border-bottom:1px solid var(--line)";
    var o = '<option value=""></option><option value="USD"></option>' + SUP.map(function (c) { return '<option value="' + c + '"></option>'; }).join("");
    d.innerHTML = '<label id="curLbl" for="curSel"></label><select id="curSel" style="padding:4px 8px;border-radius:8px;background:var(--card);color:var(--text);border:1px solid var(--line)">' + o + '</select><span id="curNote" style="color:var(--muted);flex:1 1 280px;text-align:center"></span>';
    h.parentNode.insertBefore(d, h.nextSibling);
    var sel = d.querySelector("select"); sel.value = st.cur;
    sel.addEventListener("change", function () { st.cur = sel.value; try { localStorage.setItem("hl_cur", st.cur); } catch (e) {} mark(); });
  }
  function init() {
    fetch(API).then(function (r) { return r.json(); }).then(function (d) {
      if (!d || !d.rates) return; st.rates = d.rates; st.auto = d.cur || ""; bar(); mark();
      var lb = document.getElementById("langBtn"); if (lb) lb.addEventListener("click", function () { setTimeout(mark, 0); });
    }).catch(function () {});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

/* ---- website assistant widget (talks to the Worker /chat; answers from HealthLife facts only) ---- */
(function () {
  var API = "https://healthlife-pay.abdelrahmansarya90.workers.dev/chat";
  var TX = {
    en: { t: "Ask HealthLife", ph: "Type your question…", send: "Send", hi: "Hi! I am the HealthLife assistant. Ask me about the packages, prices, books or how to pay.", note: "Automated assistant, it can make mistakes. Not medical advice. Coach Abdelrahman is the final word.", wait: "Typing…", err: "Could not reach the assistant. Please message us on WhatsApp.", open: "Open chat", close: "Close" },
    ar: { t: "اسأل هيلث لايف", ph: "اكتب سؤالك…", send: "إرسال", hi: "أهلاً! أنا مساعد هيلث لايف. اسألني عن الباقات والأسعار والكتب وطرق الدفع.", note: "مساعد آلي وممكن يغلط. مش نصيحة طبية. كلمة الكابتن عبد الرحمن هي النهائية.", wait: "بكتب…", err: "مقدرتش أوصل للمساعد. ابعتلنا على واتساب.", open: "افتح الشات", close: "إغلاق" }
  };
  function L() { return document.documentElement.lang === "ar" ? "ar" : "en"; }
  var hist = [], busy = false;
  function el(tag, css, txt) { var e = document.createElement(tag); if (css) e.style.cssText = css; if (txt !== undefined) e.textContent = txt; return e; }
  function init() {
    if (document.getElementById("hlChat")) return;
    var root = el("div", "position:fixed;bottom:18px;left:18px;z-index:9998;font-family:inherit"); root.id = "hlChat";
    var btn = el("button", "width:56px;height:56px;border-radius:50%;border:0;cursor:pointer;background:var(--lime,#b6f000);color:#0b2a1c;font-size:26px;box-shadow:0 6px 18px rgba(0,0,0,.35)", "💬"); btn.type = "button";
    var box = el("div", "display:none;position:absolute;bottom:68px;left:0;width:min(340px,calc(100vw - 36px));height:min(460px,70vh);flex-direction:column;background:var(--card,#10281c);color:var(--text,#f4f1e6);border:1px solid var(--line,#2c4a3a);border-radius:16px;box-shadow:0 12px 34px rgba(0,0,0,.45);overflow:hidden");
    var head = el("div", "display:flex;align-items:center;justify-content:space-between;padding:10px 14px;font-weight:700;border-bottom:1px solid var(--line,#2c4a3a)");
    var title = el("span"); var x = el("button", "background:none;border:0;color:inherit;font-size:20px;cursor:pointer", "×"); x.type = "button";
    head.appendChild(title); head.appendChild(x);
    var log = el("div", "flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;font-size:14px;line-height:1.6");
    var note = el("div", "padding:6px 12px;font-size:11px;color:var(--muted,#b9c2b5);border-top:1px solid var(--line,#2c4a3a)");
    var form = el("form", "display:flex;gap:6px;padding:8px;border-top:1px solid var(--line,#2c4a3a)");
    var inp = el("input", "flex:1;min-width:0;padding:9px 10px;border-radius:10px;border:1px solid var(--line,#2c4a3a);background:transparent;color:inherit;font:inherit"); inp.type = "text"; inp.maxLength = 500; inp.autocomplete = "off";
    var go = el("button", "padding:9px 14px;border-radius:10px;border:0;cursor:pointer;font-weight:700;background:var(--lime,#b6f000);color:#0b2a1c"); go.type = "submit";
    form.appendChild(inp); form.appendChild(go);
    box.appendChild(head); box.appendChild(log); box.appendChild(note); box.appendChild(form);
    root.appendChild(box); root.appendChild(btn); document.body.appendChild(root);
    function bub(t, me) { var b = el("div", "max-width:88%;padding:8px 11px;border-radius:12px;white-space:pre-wrap;word-break:break-word;" + (me ? "align-self:flex-end;background:rgba(182,240,0,.18)" : "align-self:flex-start;background:rgba(255,255,255,.07)"), t); log.appendChild(b); log.scrollTop = log.scrollHeight; return b; }
    function labels() { var d = TX[L()]; title.textContent = d.t; inp.placeholder = d.ph; go.textContent = d.send; note.textContent = d.note; btn.setAttribute("aria-label", d.open); x.setAttribute("aria-label", d.close); box.dir = L() === "ar" ? "rtl" : "ltr"; }
    labels(); var lb = document.getElementById("langBtn"); if (lb) lb.addEventListener("click", function () { setTimeout(labels, 0); });
    var greeted = false;
    btn.addEventListener("click", function () { box.style.display = box.style.display === "flex" ? "none" : "flex"; if (box.style.display === "flex") { if (!greeted) { greeted = true; bub(TX[L()].hi, false); } inp.focus(); } });
    x.addEventListener("click", function () { box.style.display = "none"; });
    form.addEventListener("submit", function (e) {
      e.preventDefault(); var q = inp.value.trim(); if (!q || busy) return;
      busy = true; inp.value = ""; bub(q, true); hist.push({ role: "user", content: q }); var w = bub(TX[L()].wait, false);
      fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lang: L(), messages: hist.slice(-8) }) })
        .then(function (r) { return r.json(); })
        .then(function (d) { var t = d && d.reply ? d.reply : TX[L()].err; w.textContent = t; hist.push({ role: "assistant", content: t }); })
        .catch(function () { w.textContent = TX[L()].err; hist.pop(); })
        .then(function () { busy = false; log.scrollTop = log.scrollHeight; });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

/* ---- add Natures Glow + Calorie Scanner links to every page's menu if missing ---- */
(function () {
  function ar() { return document.documentElement.lang === "ar"; }
  function add() {
    var ul = document.querySelector("header nav ul");
    if (!ul) return;
    if (!ul.querySelector('a[href="glow.html"]')) {
      var li = document.createElement("li"), a = document.createElement("a");
      a.href = "glow.html"; a.setAttribute("data-i18n", "nav_glow");
      a.textContent = ar() ? "نور الطبيعة" : "Natures Glow";
      li.appendChild(a);
      var fit = ul.querySelector('a[href="fitness.html"]');
      if (fit && fit.parentNode && fit.parentNode.nextSibling) ul.insertBefore(li, fit.parentNode.nextSibling); else ul.appendChild(li);
    }
    var ca = ul.querySelector('a[href="calories.html"]');
    if (!ca) {
      var l2 = document.createElement("li"); ca = document.createElement("a"); ca.href = "calories.html";
      l2.appendChild(ca);
      var gl = ul.querySelector('a[href="glow.html"]');
      if (gl && gl.parentNode && gl.parentNode.nextSibling) ul.insertBefore(l2, gl.parentNode.nextSibling); else ul.appendChild(l2);
    }
    var ey = ul.querySelector('a[href="eye.html"]');
    if (!ey) {
      var l3 = document.createElement("li"); ey = document.createElement("a"); ey.href = "eye.html";
      l3.appendChild(ey);
      if (ca && ca.parentNode && ca.parentNode.nextSibling) ul.insertBefore(l3, ca.parentNode.nextSibling); else ul.appendChild(l3);
    }
    function lab() { if (!ca.hasAttribute("data-en")) ca.textContent = ar() ? "ماسح السعرات" : "Calorie Scanner"; if (!ey.hasAttribute("data-en")) ey.textContent = ar() ? "فحص العين" : "Eye Check"; }
    lab();
    var lb = document.getElementById("langBtn"); if (lb) lb.addEventListener("click", function () { setTimeout(lab, 60); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", add); else add();
})();

/* ---- keep the whole menu tidy even with many links ---- */
(function () {
  try {
    var st = document.createElement("style");
    st.textContent = "header nav ul{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 16px;padding:0;margin-left:auto;margin-right:auto}header nav ul li{margin:0}header nav ul li a{font-size:14.5px;white-space:nowrap}@media(min-width:1100px){header nav{max-width:1400px!important;flex-wrap:wrap}header nav ul{flex-wrap:nowrap;gap:6px 13px;width:100%;order:3;justify-content:center}header nav ul li a{font-size:13.5px}}@media(min-width:1100px) and (max-width:1300px){header nav ul{gap:6px 10px}header nav ul li a{font-size:12.5px}}";
    document.head.appendChild(st);
  } catch (e) {}
})();

/* ---- phone menu: a burger button that opens/closes the links ---- */
(function () {
  function init() {
    try {
      var nav = document.querySelector("header nav"), ul = nav && nav.querySelector("ul");
      if (!ul || nav.querySelector(".hl-burger")) return;
      var st = document.createElement("style");
      st.textContent = ".hl-burger{display:none;background:transparent;border:1px solid var(--line,#2c4a3a);color:inherit;border-radius:10px;font-size:22px;line-height:1;padding:6px 12px;cursor:pointer}@media(max-width:820px){.hl-burger{display:inline-block}header nav{flex-wrap:wrap}header nav ul{display:none!important;width:100%;flex-direction:column;align-items:stretch;max-height:none!important;overflow:visible!important;gap:0!important;padding:6px 0!important;order:5}header nav ul.hl-open{display:flex!important}header nav ul li a{display:block;padding:11px 8px;font-size:16px!important;border-bottom:1px solid var(--line,#2c4a3a);text-align:start}}";
      document.head.appendChild(st);
      var b = document.createElement("button"); b.type = "button"; b.className = "hl-burger"; b.textContent = "☰"; b.setAttribute("aria-label", "Menu");
      var lang = nav.querySelector("#langBtn"); if (lang) nav.insertBefore(b, lang); else nav.appendChild(b);
      b.addEventListener("click", function () { var o = ul.classList.toggle("hl-open"); b.textContent = o ? "✕" : "☰"; });
    } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

/* ---- visitor statistics (Cloudflare Web Analytics: free, no cookies). Open any page with ?notrack=1 once on your own devices to exclude your visits; ?notrack=0 turns counting back on ---- */
(function () {
  try {
    var q = new URLSearchParams(location.search).get("notrack");
    if (q === "1") localStorage.setItem("hl_notrack", "1");
    if (q === "0") localStorage.removeItem("hl_notrack");
    if (localStorage.getItem("hl_notrack") === "1") return;
  } catch (e) {}
  try {
    var s = document.createElement("script");
    s.type = "module"; s.defer = true;
    s.src = "https://static.cloudflareinsights.com/beacon.min.js";
    s.setAttribute("data-cf-beacon", '{"token": "4d129efb4b9d43c49010ecf619502ce5"}');
    document.head.appendChild(s);
  } catch (e) {}
})();

/* ---- Terms & Refund link: in every footer and under the payment agreement checkbox ---- */
(function () {
  function ar() { return document.documentElement.lang === "ar"; }
  function lab() { return ar() ? "الشروط والاسترداد والخصوصية" : "Terms, Refunds & Privacy"; }
  function init() {
    try {
      var links = [];
      var f = document.querySelector("footer");
      if (f && !f.querySelector('a[href="terms.html"]')) {
        var p = document.createElement("p"); p.style.cssText = "margin:10px 0 0;text-align:center";
        var a = document.createElement("a"); a.href = "terms.html"; a.textContent = lab(); a.setAttribute("data-terms-link", "1"); p.appendChild(a); f.appendChild(p); links.push(a);
      }
      var chk = document.getElementById("agree");
      if (chk && chk.parentNode && !document.getElementById("termsFull")) {
        var q = document.createElement("p"); q.id = "termsFull"; q.style.cssText = "margin:0 0 12px;font-size:14px";
        var b = document.createElement("a"); b.href = "terms.html"; b.target = "_blank"; b.rel = "noopener"; b.textContent = (ar() ? "اقرأ الشروط كاملة: " : "Read the full terms: ") + lab(); b.setAttribute("data-terms-link", "2"); q.appendChild(b);
        chk.parentNode.parentNode.insertBefore(q, chk.parentNode.nextSibling); links.push(b);
      }
      var lb = document.getElementById("langBtn");
      if (lb) lb.addEventListener("click", function () { setTimeout(function () { links.forEach(function (x) { x.textContent = (x.getAttribute("data-terms-link") === "2" ? (ar() ? "اقرأ الشروط كاملة: " : "Read the full terms: ") : "") + lab(); }); }, 80); });
    } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
