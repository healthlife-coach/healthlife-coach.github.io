/* HealthLife screening: questionnaire texts (Arabic + English) and the reference list. Public file (questions are not secret). */
(function (root) {
  "use strict";
  var D = { ar: {}, en: {} }, A = D.ar;

  A.EMERGENCY = {
    ambulance: "123",            /* Egypt ambulance */
    mentalHotline: "105",        /* Egypt Ministry of Health psychological-support line (announced 2026) */
    other: "في أي دولة أخرى: اتصل برقم الإسعاف المحلي أو اذهب لأقرب طوارئ."
  };

  /* ---------- adult red flags ---------- */
  A.redEmergency = [
    ["chest", "ألم أو ضغط في الصدر الآن، أو يأتي مع المجهود"],
    ["breath", "ضيق نفس شديد وأنت في حالة راحة"],
    ["faint", "إغماء أو فقدان وعي (حديث)"],
    ["stroke", "ضعف أو تنميل مفاجئ في جانب واحد من الجسم، أو التواء في الوجه، أو صعوبة مفاجئة في الكلام"],
    ["head", "صداع شديد مفاجئ هو الأسوأ في حياتك"],
    ["vision", "فقدان مفاجئ للرؤية"],
    ["blood", "قيء أو سعال بدم، أو براز أسود أو دموي غزير"],
    ["abd", "ألم شديد في البطن مع حمى أو قيء مستمر"]
  ];
  A.redUrgent = [
    ["wloss", "نزول وزن غير مقصود أكثر من 5% في آخر 6 شهور"],
    ["fever", "حرارة أو حمى مستمرة أكثر من أسبوعين"],
    ["cough", "سعال مستمر أكثر من 3 أسابيع"],
    ["lump", "ظهور كتلة أو ورم جديد في أي مكان بالجسم"],
    ["bowel", "تغيّر مستمر في عادات الإخراج، أو دم في البول أو البراز"],
    ["palp", "خفقان متكرر أو دوخة متكررة"]
  ];
  A.symptoms = [
    ["fatigue", "تعب وإرهاق مستمر بدون سبب واضح"],
    ["hair", "تساقط شعر ملحوظ"],
    ["cold", "برودة زائدة، أو إمساك، أو جفاف جلد، أو زيادة وزن بدون سبب"],
    ["thirst", "عطش شديد وتبوّل متكرر"],
    ["hyper", "رعشة أو تعرّق أو حساسية للحرارة مع نزول وزن"],
    ["snore", "شخير عالي أو انقطاع نفس أثناء النوم مع نعاس نهاري"]
  ];

  /* ---------- pediatric red flags ---------- */
  A.childEmergency = [
    ["c_breath", "صعوبة في التنفس (تنفس سريع جدًا أو انسحاب الصدر) أو ازرقاق الشفاه"],
    ["c_resp", "صعب إيقاظه أو غير مستجيب أو مرتخٍ بشكل غير عادي"],
    ["c_seiz", "تشنجات أو نوبة صرع"],
    ["c_baby", "حرارة 38 درجة أو أكثر عند رضيع أقل من 3 شهور"],
    ["c_dehy", "علامات جفاف (لا تبوّل منذ 8 ساعات، فم جاف، بكاء بدون دموع)"],
    ["c_neck", "حمى مع تيبّس الرقبة أو طفح جلدي لا يختفي بالضغط"],
    ["c_abd", "ألم بطن شديد أو قيء مستمر أو قيء أخضر"],
    ["c_poison", "ابتلع دواء أو مادة سامة"],
    ["c_injury", "إصابة خطيرة أو نزيف لا يتوقف"]
  ];
  A.childSelf = "ذكر الطفل أنه يريد إيذاء نفسه أو أنه يتمنى الموت أو أنه لا يريد أن يعيش";

  /* ---------- PHQ-9 / GAD-7 ---------- */
  A.freq = ["أبدًا", "عدة أيام", "أكثر من نصف الأيام", "تقريبًا كل يوم"];
  A.phq9 = [
    "قلة الاهتمام أو المتعة في فعل الأشياء",
    "الشعور بالحزن أو الاكتئاب أو اليأس",
    "صعوبة في النوم أو الاستمرار فيه، أو النوم أكثر من اللازم",
    "الشعور بالتعب أو قلة الطاقة",
    "ضعف الشهية أو الإفراط في الأكل",
    "الشعور بالسوء تجاه نفسك، أو أنك فاشل، أو أنك خذلت نفسك أو أسرتك",
    "صعوبة في التركيز، مثل قراءة الجريدة أو مشاهدة التلفزيون",
    "بطء في الحركة أو الكلام لدرجة لاحظها الآخرون، أو العكس: توتر وحركة زائدة أكثر من المعتاد",
    "أفكار بأنك ستكون أفضل حالًا لو مُتّ، أو أفكار بإيذاء نفسك بطريقة ما"
  ];
  A.phqFunc = ["لا توجد صعوبة", "صعوبة بسيطة", "صعوبة كبيرة", "صعوبة شديدة جدًا"];
  A.gad7 = [
    "الشعور بالعصبية أو القلق أو التوتر",
    "عدم القدرة على إيقاف القلق أو السيطرة عليه",
    "القلق الزائد بشأن أمور مختلفة",
    "صعوبة في الاسترخاء",
    "التململ لدرجة يصعب معها الجلوس بهدوء",
    "الانزعاج أو الانفعال بسهولة",
    "الخوف كأن شيئًا فظيعًا سيحدث"
  ];

  /* ---------- ASRM (Altman 1997), each item 5 statements scored 0-4 ---------- */
  var L = ["لا", "أحيانًا", "كثيرًا", "في أغلب الأوقات", "طوال الوقت"];
  A.asrm = [
    { q: "السعادة والبهجة", o: ["لا أشعر بسعادة أو بهجة أكثر من المعتاد", "أشعر أحيانًا بسعادة أو بهجة أكثر من المعتاد", "كثيرًا ما أشعر بسعادة أو بهجة أكثر من المعتاد", "أشعر بسعادة أو بهجة أكثر من المعتاد في أغلب الوقت", "أشعر بسعادة أو بهجة أكثر من المعتاد طوال الوقت"] },
    { q: "الثقة بالنفس", o: ["لا أشعر بثقة أكثر من المعتاد", "أشعر أحيانًا بثقة أكثر من المعتاد", "كثيرًا ما أشعر بثقة أكثر من المعتاد", "أشعر بثقة أكثر من المعتاد في أغلب الوقت", "أشعر بثقة مفرطة طوال الوقت"] },
    { q: "النوم", o: ["لا أحتاج لنوم أقل من المعتاد", "أحتاج أحيانًا لنوم أقل من المعتاد", "كثيرًا ما أحتاج لنوم أقل من المعتاد", "أحتاج في أغلب الوقت لنوم أقل من المعتاد", "أستطيع البقاء يومًا وليلة بدون نوم ولا أشعر بالتعب"] },
    { q: "الكلام", o: ["لا أتكلم أكثر من المعتاد", "أتكلم أحيانًا أكثر من المعتاد", "كثيرًا ما أتكلم أكثر من المعتاد", "أتكلم أكثر من المعتاد في أغلب الوقت", "أتكلم باستمرار ولا يمكن مقاطعتي"] },
    { q: "النشاط والحركة (في العمل أو البيت أو الدراسة أو العلاقات)", o: ["لم أكن أنشط من المعتاد", "كنت أحيانًا أنشط من المعتاد", "كنت كثيرًا أنشط من المعتاد", "كنت في أغلب الوقت أنشط من المعتاد", "أنا في حركة ونشاط زائد طوال الوقت"] }
  ];

  /* ---------- PQ-16 (Ising 2012) ---------- */
  A.pq16 = [
    "أشعر بعدم الاهتمام بالأشياء التي كنت أستمتع بها",
    "كثيرًا ما أشعر أنني أعيش موقفًا بنفس تفاصيله حدث من قبل (ديجا فو)",
    "أشم أو أتذوق أحيانًا أشياء لا يشمها أو يتذوقها الآخرون",
    "كثيرًا ما أسمع أصواتًا غير عادية مثل طرق أو نقر أو فحيح أو تصفيق أو رنين في أذني",
    "حدث أحيانًا أن اختلط عليّ هل ما مررت به حقيقي أم خيال",
    "عندما أنظر إلى شخص أو إلى نفسي في المرآة رأيت الوجه يتغير أمام عيني",
    "أشعر بقلق شديد عند مقابلة أشخاص لأول مرة",
    "رأيت أشياء لا يراها الآخرون على ما يبدو",
    "أفكاري أحيانًا قوية لدرجة أنني أكاد أسمعها",
    "أرى أحيانًا معاني خاصة في الإعلانات أو واجهات المحلات أو في طريقة ترتيب الأشياء حولي",
    "شعرت أحيانًا أنني لا أتحكم في أفكاري",
    "ينشغل ذهني أحيانًا فجأة بأصوات بعيدة لا ألاحظها عادة",
    "سمعت أشياء لا يسمعها الآخرون مثل همس أو كلام أشخاص",
    "كثيرًا ما أشعر أن الآخرين يتربصون بي",
    "شعرت بوجود شخص أو قوة حولي رغم أنني لم أرَ أحدًا",
    "أشعر أن أجزاء من جسمي تغيرت أو تعمل بشكل مختلف عن قبل"
  ];
  A.pqDistress = ["لا يزعجني", "يزعجني قليلًا", "يزعجني بدرجة متوسطة", "يزعجني بشدة"];

  /* ---------- PSC-17 (parent version, Maryland order) ---------- */
  A.psc = [
    "كثير الحركة ولا يستطيع الجلوس ساكنًا",
    "يشعر بالحزن أو عدم السعادة",
    "يسرح بخياله أكثر من اللازم",
    "يرفض المشاركة",
    "لا يفهم مشاعر الآخرين",
    "يشعر باليأس",
    "يجد صعوبة في التركيز",
    "يتشاجر مع الأطفال الآخرين",
    "يشعر بالسوء تجاه نفسه",
    "يلوم الآخرين على مشاكله",
    "يبدو أنه لا يستمتع كالمعتاد",
    "لا يسمع الكلام ولا يلتزم بالقواعد",
    "يتصرف كأن به محرك لا يتوقف",
    "يسخر من الآخرين",
    "يقلق كثيرًا",
    "يأخذ أشياء ليست له",
    "يتشتت بسهولة"
  ];
  A.pscOpts = ["أبدًا", "أحيانًا", "كثيرًا"];

  /* ---------- Big Five (IPIP 50 markers) ---------- */
  A.big5 = [
    "أنا مصدر البهجة والحيوية في التجمعات", "لا أتكلم كثيرًا", "أشعر بالراحة وسط الناس", "أفضّل البقاء في الخلفية", "أبدأ الحديث مع الآخرين",
    "ليس لدي الكثير لأقوله", "أتحدث مع أشخاص كثيرين في الحفلات", "لا أحب لفت الانتباه لنفسي", "لا مانع عندي أن أكون محور الاهتمام", "أكون هادئًا مع الغرباء",
    "أتوتر بسهولة", "أكون مرتاحًا معظم الوقت", "أقلق بشأن الأشياء", "نادرًا ما أشعر بالحزن", "ينزعج مزاجي بسهولة",
    "أنزعج وأتضايق بسرعة", "مزاجي يتغير كثيرًا", "تتقلب مشاعري كثيرًا", "أنفعل وأغضب بسهولة", "كثيرًا ما أشعر بالحزن",
    "لا أهتم كثيرًا بالآخرين", "أهتم بالناس", "أجرح الناس بكلامي", "أتعاطف مع مشاعر الآخرين", "لا تهمني مشاكل الآخرين",
    "قلبي رقيق", "لا أهتم فعلًا بالآخرين", "أخصص وقتًا للآخرين", "أحس بمشاعر الآخرين", "أجعل الناس يشعرون بالراحة",
    "أكون دائمًا مستعدًا", "أترك أغراضي في أي مكان", "أنتبه للتفاصيل", "أفسد الأمور وأعمل فوضى", "أنجز المهام فورًا",
    "كثيرًا ما أنسى إعادة الأشياء إلى مكانها", "أحب النظام", "أتهرب من واجباتي", "ألتزم بجدول", "أدقق في عملي",
    "عندي حصيلة لغوية غنية", "أجد صعوبة في فهم الأفكار المجردة", "لدي خيال واسع", "لا تهمني الأفكار المجردة", "لدي أفكار ممتازة",
    "ليس لدي خيال جيد", "أفهم الأمور بسرعة", "أستخدم كلمات صعبة", "أقضي وقتًا في التأمل والتفكير", "أنا مليء بالأفكار"
  ];
  A.likert5 = ["لا تنطبق أبدًا", "نادرًا", "أحيانًا", "غالبًا", "تنطبق تمامًا"];



  A.reason = [
    { q: "أكمل السلسلة: 5، 10، 20، 40، ؟", o: ["60", "80", "50", "45"] },
    { q: "أكمل السلسلة: 2، 3، 5، 8، 12، ؟", o: ["16", "18", "17", "20"] },
    { q: "أكمل السلسلة: 3، 6، 5، 10، 9، 18، ؟", o: ["17", "36", "27", "21"] },
    { q: "الكتاب للقراءة كما أن الشوكة لـ ...؟", o: ["المطبخ", "الأكل", "المعدن", "الطبق"] },
    { q: "البذرة للشجرة كما أن البيضة لـ ...؟", o: ["العش", "القشرة", "الطائر", "الطعام"] },
    { q: "أي رقم لا ينتمي للمجموعة: 2، 3، 5، 9، 11؟", o: ["2", "5", "11", "9"] },
    { q: "كل الطيور لها ريش. البطريق طائر. إذن:", o: ["البطريق يطير", "البطريق له ريش", "البطريق يعيش في البرد فقط", "لا يمكن معرفة ذلك"] },
    { q: "ليلى أكبر سنًا من هدى. هدى أكبر من سارة. منى أصغر من سارة. من الثانية في الترتيب من الأكبر؟", o: ["سارة", "ليلى", "هدى", "منى"] },
    { q: "إذا أمطرت السماء يصبح الشارع مبللًا. الشارع مبلل الآن. ماذا نستنتج؟", o: ["أمطرت السماء", "لم تمطر السماء", "الشارع جاف", "لا نستطيع التأكد أنها أمطرت (قد يكون الشارع غُسل مثلًا)"] },
    { q: "الدفتر بـ 10 جنيه. 3 أقلام ودفتر واحد بـ 25 جنيه. كم سعر القلم الواحد؟", o: ["4", "6", "5", "8"] },
    { q: "سيارة تقطع 90 كم في ساعة ونصف بسرعة ثابتة. كم تقطع في 4 ساعات؟", o: ["180", "240", "200", "360"] },
    { q: "شاحن وجراب موبايل ثمنهما معًا 110 جنيه. الجراب أغلى من الشاحن بـ 100 جنيه. كم سعر الشاحن (بالجنيه)؟", o: ["5", "10", "100", "1"] }
  ];

  /* ================= English ================= */
  var E = D.en;
  E.EMERGENCY = { ambulance: "123", mentalHotline: "105", other: "Elsewhere: call your local emergency number (112 in the EU, 999 in the UK, 911 in the US/Canada). US: call or text 988. UK and Ireland: Samaritans 116 123. In Egypt: ambulance 123, psychological support line 105." };
  E.redEmergency = [
    ["chest", "Chest pain or pressure right now, or that comes with exertion"],
    ["breath", "Severe shortness of breath at rest"],
    ["faint", "Fainting or loss of consciousness (recent)"],
    ["stroke", "Sudden weakness or numbness on one side of the body, facial droop, or sudden difficulty speaking"],
    ["head", "Sudden severe headache, the worst of your life"],
    ["vision", "Sudden loss of vision"],
    ["blood", "Vomiting or coughing blood, or heavy black or bloody stools"],
    ["abd", "Severe abdominal pain with fever or persistent vomiting"]
  ];
  E.redUrgent = [
    ["wloss", "Unintentional weight loss of more than 5% in the last 6 months"],
    ["fever", "Fever lasting more than two weeks"],
    ["cough", "Cough lasting more than 3 weeks"],
    ["lump", "A new lump or swelling anywhere in the body"],
    ["bowel", "A lasting change in bowel habits, or blood in urine or stool"],
    ["palp", "Frequent palpitations or dizziness"]
  ];
  E.symptoms = [
    ["fatigue", "Constant tiredness or exhaustion with no clear cause"],
    ["hair", "Noticeable hair loss"],
    ["cold", "Feeling unusually cold, constipation, dry skin, or unexplained weight gain"],
    ["thirst", "Intense thirst with frequent urination"],
    ["hyper", "Tremor, sweating or heat intolerance with weight loss"],
    ["snore", "Loud snoring or pauses in breathing during sleep with daytime sleepiness"]
  ];
  E.childEmergency = [
    ["c_breath", "Difficulty breathing (very fast breathing or chest pulling in) or blue lips"],
    ["c_resp", "Hard to wake, unresponsive, or unusually limp"],
    ["c_seiz", "Seizure or convulsions"],
    ["c_baby", "Temperature of 38 C or more in a baby under 3 months"],
    ["c_dehy", "Signs of dehydration (no urine for 8 hours, dry mouth, crying without tears)"],
    ["c_neck", "Fever with a stiff neck or a rash that does not fade when pressed"],
    ["c_abd", "Severe abdominal pain, persistent vomiting, or green vomit"],
    ["c_poison", "Swallowed a medicine or a poisonous substance"],
    ["c_injury", "Serious injury or bleeding that will not stop"]
  ];
  E.childSelf = "The child said they want to hurt themselves, wish they were dead, or do not want to live";
  E.freq = ["Not at all", "Several days", "More than half the days", "Nearly every day"];
  E.phq9 = [
    "Little interest or pleasure in doing things",
    "Feeling down, depressed, or hopeless",
    "Trouble falling or staying asleep, or sleeping too much",
    "Feeling tired or having little energy",
    "Poor appetite or overeating",
    "Feeling bad about yourself, or that you are a failure or have let yourself or your family down",
    "Trouble concentrating on things, such as reading the newspaper or watching television",
    "Moving or speaking so slowly that other people could have noticed, or the opposite: being so fidgety or restless that you have been moving around a lot more than usual",
    "Thoughts that you would be better off dead, or of hurting yourself in some way"
  ];
  E.phqFunc = ["Not difficult at all", "Somewhat difficult", "Very difficult", "Extremely difficult"];
  E.gad7 = [
    "Feeling nervous, anxious, or on edge",
    "Not being able to stop or control worrying",
    "Worrying too much about different things",
    "Trouble relaxing",
    "Being so restless that it is hard to sit still",
    "Becoming easily annoyed or irritable",
    "Feeling afraid, as if something awful might happen"
  ];
  E.asrm = [
    { q: "Happiness", o: ["I do not feel happier or more cheerful than usual", "I occasionally feel happier or more cheerful than usual", "I often feel happier or more cheerful than usual", "I feel happier or more cheerful than usual most of the time", "I feel happier or more cheerful than usual all of the time"] },
    { q: "Self-confidence", o: ["I do not feel more self-confident than usual", "I occasionally feel more self-confident than usual", "I often feel more self-confident than usual", "I feel more self-confident than usual most of the time", "I feel extremely self-confident all of the time"] },
    { q: "Sleep", o: ["I do not need less sleep than usual", "I occasionally need less sleep than usual", "I often need less sleep than usual", "I frequently need less sleep than usual", "I can go all day and night without any sleep and still not feel tired"] },
    { q: "Talking", o: ["I do not talk more than usual", "I occasionally talk more than usual", "I often talk more than usual", "I frequently talk more than usual", "I talk constantly and cannot be interrupted"] },
    { q: "Activity (at work, home, school, or socially)", o: ["I have not been more active than usual", "I have occasionally been more active than usual", "I have often been more active than usual", "I have frequently been more active than usual", "I am constantly active, or on the go, all the time"] }
  ];
  E.pq16 = [
    "I feel uninterested in the things I used to enjoy",
    "I often seem to experience deja vu",
    "I sometimes smell or taste things that other people cannot smell or taste",
    "I often hear unusual sounds like banging, clicking, hissing, clapping or ringing in my ears",
    "I have been confused at times about whether something I experienced was real or imaginary",
    "When I look at a person, or at myself in a mirror, I have seen the face change right before my eyes",
    "I get extremely anxious when meeting people for the first time",
    "I have seen things that other people apparently cannot see",
    "My thoughts are sometimes so strong that I can almost hear them",
    "I sometimes see special meanings in advertisements, shop windows, or in the way things are arranged around me",
    "Sometimes I have felt that I am not in control of my own ideas or thoughts",
    "Sometimes I feel suddenly distracted by distant sounds that I am not normally aware of",
    "I have heard things other people cannot hear, like voices whispering or talking",
    "I often feel that others have it in for me",
    "I have had the sense that some person or force is around me, even though I could not see anyone",
    "I feel that parts of my body have changed in some way, or are working differently than before"
  ];
  E.pqDistress = ["Not distressing", "Mildly distressing", "Moderately distressing", "Severely distressing"];
  E.psc = [
    "Fidgety, unable to sit still", "Feels sad, unhappy", "Daydreams too much", "Refuses to share", "Does not understand other people's feelings",
    "Feels hopeless", "Has trouble concentrating", "Fights with other children", "Is down on him or herself", "Blames others for his or her troubles",
    "Seems to be having less fun", "Does not listen to rules", "Acts as if driven by a motor", "Teases others", "Worries a lot",
    "Takes things that do not belong to him or her", "Distracted easily"
  ];
  E.pscOpts = ["Never", "Sometimes", "Often"];
  E.big5 = [
    "Am the life of the party", "Don't talk a lot", "Feel comfortable around people", "Keep in the background", "Start conversations",
    "Have little to say", "Talk to a lot of different people at parties", "Don't like to draw attention to myself", "Don't mind being the center of attention", "Am quiet around strangers",
    "Get stressed out easily", "Am relaxed most of the time", "Worry about things", "Seldom feel blue", "Am easily disturbed",
    "Get upset easily", "Change my mood a lot", "Have frequent mood swings", "Get irritated easily", "Often feel blue",
    "Feel little concern for others", "Am interested in people", "Insult people", "Sympathize with others' feelings", "Am not interested in other people's problems",
    "Have a soft heart", "Am not really interested in others", "Take time out for others", "Feel others' emotions", "Make people feel at ease",
    "Am always prepared", "Leave my belongings around", "Pay attention to details", "Make a mess of things", "Get chores done right away",
    "Often forget to put things back in their proper place", "Like order", "Shirk my duties", "Follow a schedule", "Am exacting in my work",
    "Have a rich vocabulary", "Have difficulty understanding abstract ideas", "Have a vivid imagination", "Am not interested in abstract ideas", "Have excellent ideas",
    "Do not have a good imagination", "Am quick to understand things", "Use difficult words", "Spend time reflecting on things", "Am full of ideas"
  ];
  E.likert5 = ["Very inaccurate", "Moderately inaccurate", "Neither", "Moderately accurate", "Very accurate"];

  E.reason = [
    { q: "Complete the series: 5, 10, 20, 40, ?", o: ["60", "80", "50", "45"] },
    { q: "Complete the series: 2, 3, 5, 8, 12, ?", o: ["16", "18", "17", "20"] },
    { q: "Complete the series: 3, 6, 5, 10, 9, 18, ?", o: ["17", "36", "27", "21"] },
    { q: "Book is to reading as fork is to ...?", o: ["Kitchen", "Eating", "Metal", "Plate"] },
    { q: "Seed is to tree as egg is to ...?", o: ["Nest", "Shell", "Bird", "Food"] },
    { q: "Which number does not belong: 2, 3, 5, 9, 11?", o: ["2", "5", "11", "9"] },
    { q: "All birds have feathers. A penguin is a bird. Therefore:", o: ["Penguins can fly", "Penguins have feathers", "Penguins live only in the cold", "We cannot know"] },
    { q: "Layla is older than Huda. Huda is older than Sara. Mona is younger than Sara. Who is second oldest?", o: ["Sara", "Layla", "Huda", "Mona"] },
    { q: "If it rains, the street gets wet. The street is wet now. What can we conclude?", o: ["It rained", "It did not rain", "The street is dry", "We cannot be sure it rained (the street may have been washed, for example)"] },
    { q: "A notebook costs 10 EGP. 3 pens and 1 notebook cost 25 EGP. How much is one pen?", o: ["4", "6", "5", "8"] },
    { q: "A car travels 90 km in 1.5 hours at a steady speed. How far does it go in 4 hours?", o: ["180", "240", "200", "360"] },
    { q: "A charger and a phone case cost 110 EGP together. The case costs 100 EGP more than the charger. How much is the charger (in EGP)?", o: ["5", "10", "100", "1"] }
  ];

  /* ---------- references ---------- */
  D.refs = {
    body: [
      "World Health Organization. Obesity: preventing and managing the global epidemic. WHO Technical Report Series 894; 2000.",
      "Ashwell M, Gunn P, Gibson S. Waist-to-height ratio is a better screening tool than waist circumference and BMI for adult cardiometabolic risk factors. Obes Rev. 2012;13(3):275-286.",
      "Hodgdon JA, Beckett MB. Prediction of percent body fat for U.S. Navy men and women from body circumferences and height. Naval Health Research Center; 1984.",
      "Mifflin MD, St Jeor ST, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241-247.",
      "Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018;52(6):376-384.",
      "EFSA Panel on Dietetic Products, Nutrition and Allergies. Scientific opinion on dietary reference values for water. EFSA Journal. 2010;8(3):1459.",
      "Williams B, et al. 2018 ESC/ESH Guidelines for the management of arterial hypertension. Eur Heart J. 2018;39(33):3021-3104.",
      "Whelton PK, et al. 2017 ACC/AHA guideline for the prevention, detection, evaluation, and management of high blood pressure in adults. Hypertension. 2018;71(6):e13-e115.",
      "Lindstrom J, Tuomilehto J. The Diabetes Risk Score: a practical tool to predict type 2 diabetes risk. Diabetes Care. 2003;26(3):725-731.",
      "Bull FC, et al. World Health Organization 2020 guidelines on physical activity and sedentary behaviour. Br J Sports Med. 2020;54(24):1451-1462.",
      "Watson NF, et al. Recommended amount of sleep for a healthy adult: a joint consensus statement of the AASM and the SRS. Sleep. 2015;38(6):843-844.",
      "Riebe D, et al. Updating ACSM's recommendations for exercise preparticipation health screening. Med Sci Sports Exerc. 2015;47(11):2473-2479."
    ],
    psych: [
      "Kroenke K, Spitzer RL, Williams JBW. The PHQ-9: validity of a brief depression severity measure. J Gen Intern Med. 2001;16(9):606-613.",
      "Spitzer RL, Kroenke K, Williams JBW, Lowe B. A brief measure for assessing generalized anxiety disorder: the GAD-7. Arch Intern Med. 2006;166(10):1092-1097.",
      "Altman EG, Hedeker D, Peterson JL, Davis JM. The Altman Self-Rating Mania Scale. Biol Psychiatry. 1997;42(10):948-955.",
      "Ising HK, et al. The validity of the 16-item version of the Prodromal Questionnaire (PQ-16) to screen for ultra high risk of developing psychosis in the general help-seeking population. Schizophr Bull. 2012;38(6):1288-1296."
    ],
    child: [
      "Gardner W, Murphy M, Childs G, et al. The PSC-17: a brief Pediatric Symptom Checklist including psychosocial problem subscales. Ambulatory Child Health. 1999;5:225-236.",
      "Paruthi S, et al. Recommended amount of sleep for pediatric populations: a consensus statement of the AASM. J Clin Sleep Med. 2016;12(6):785-786.",
      "Tremblay MS, et al. Canadian 24-Hour Movement Guidelines for Children and Youth. Appl Physiol Nutr Metab. 2016;41(6 Suppl 3):S311-S327.",
      "Bull FC, et al. World Health Organization 2020 guidelines on physical activity and sedentary behaviour. Br J Sports Med. 2020;54(24):1451-1462."
    ],
    pers: [
      "Goldberg LR, et al. The International Personality Item Pool and the future of public-domain personality measures. J Res Pers. 2006;40(1):84-96.",
      "Rhodes RE, Smith NEI. Personality correlates of physical activity: a review and meta-analysis. Br J Sports Med. 2006;40(12):958-965."
    ]
  };


  D.refs.reason = [
    "Neisser U, et al. Intelligence: Knowns and unknowns. American Psychologist 1996;51(2):77-101.",
    "Deary IJ. Intelligence. Annual Review of Psychology 2012;63:453-482.",
    "Frederick S. Cognitive reflection and decision making. Journal of Economic Perspectives 2005;19(4):25-42. (The last item follows the style of the cognitive reflection test.)"
  ];
  root.AD = D;
  if (typeof module !== "undefined" && module.exports) module.exports = D;
})(typeof window !== "undefined" ? window : globalThis);
