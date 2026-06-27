window.demoData = {
  stages: [
    { id: 'primary_5', label: 'الخامس الابتدائي', category: 'primary' },
    { id: 'primary_6', label: 'السادس الابتدائي', category: 'primary' },
    { id: 'middle_1', label: 'الأول متوسط', category: 'middle' },
    { id: 'middle_2', label: 'الثاني متوسط', category: 'middle' },
    { id: 'middle_3', label: 'الثالث متوسط', category: 'middle' },
    { id: 'sec_sci_4', label: 'الرابع علمي', category: 'secondary', branch: 'scientific' },
    { id: 'sec_sci_5', label: 'الخامس علمي', category: 'secondary', branch: 'scientific' },
    { id: 'sec_sci_6', label: 'السادس علمي', category: 'secondary', branch: 'scientific' },
    { id: 'sec_lit_4', label: 'الرابع أدبي', category: 'secondary', branch: 'literary' },
    { id: 'sec_lit_5', label: 'الخامس أدبي', category: 'secondary', branch: 'literary' },
    { id: 'sec_lit_6', label: 'السادس أدبي', category: 'secondary', branch: 'literary' },
    { id: 'voc_1', label: 'مهني - كهرباء', category: 'vocational' },
    { id: 'voc_2', label: 'مهني - ميكانيك', category: 'vocational' },
    { id: 'voc_3', label: 'مهني - حاسوب', category: 'vocational' }
  ],

  subjects: {
    primary_5: [
      { id: 'p5_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'الإملاء', 'القراءة'] },
      { id: 'p5_math', name: 'الرياضيات', icon: 'calc', chapters: ['الأعداد', 'الهندسة', 'الكسور'] },
      { id: 'p5_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Unit 1', 'Unit 2', 'Unit 3'] }
    ],
    primary_6: [
      { id: 'p6_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'الإملاء', 'البلاغة'] },
      { id: 'p6_math', name: 'الرياضيات', icon: 'calc', chapters: ['الجبر', 'الهندسة', 'الإحصاء'] },
      { id: 'p6_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Unit 1', 'Unit 2', 'Unit 3'] },
      { id: 'p6_sc', name: 'العلوم', icon: 'flask', chapters: ['الأحياء', 'الكيمياء', 'الفيزياء'] }
    ],
    middle_1: [
      { id: 'm1_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'الأدب', 'النصوص'] },
      { id: 'm1_math', name: 'الرياضيات', icon: 'calc', chapters: ['الجبر', 'الهندسة'] },
      { id: 'm1_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Grammar', 'Reading', 'Writing'] },
      { id: 'm1_sc', name: 'العلوم', icon: 'flask', chapters: ['الأحياء', 'الكيمياء', 'الفيزياء'] },
      { id: 'm1_ss', name: 'الاجتماعيات', icon: 'map', chapters: ['التاريخ', 'الجغرافية'] }
    ],
    middle_2: [
      { id: 'm2_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'الأدب', 'النصوص'] },
      { id: 'm2_math', name: 'الرياضيات', icon: 'calc', chapters: ['الجبر', 'الهندسة'] },
      { id: 'm2_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Grammar', 'Reading', 'Writing'] },
      { id: 'm2_sc', name: 'العلوم', icon: 'flask', chapters: ['الأحياء', 'الكيمياء', 'الفيزياء'] }
    ],
    middle_3: [
      { id: 'm3_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'الأدب', 'النصوص', 'البلاغة'] },
      { id: 'm3_math', name: 'الرياضيات', icon: 'calc', chapters: ['الجبر', 'الهندسة', 'التفاضل'] },
      { id: 'm3_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Grammar', 'Reading', 'Vocabulary'] },
      { id: 'm3_sc', name: 'العلوم', icon: 'flask', chapters: ['الأحياء', 'الكيمياء', 'الفيزياء'] },
      { id: 'm3_ss', name: 'الاجتماعيات', icon: 'map', chapters: ['التاريخ', 'الجغرافية', 'الاقتصاد'] }
    ],
    sec_sci_4: [
      { id: 's4_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'الأدب', 'البلاغة', 'النصوص'] },
      { id: 's4_math', name: 'الرياضيات', icon: 'calc', chapters: ['التفاضل', 'التكامل', 'المصفوفات'] },
      { id: 's4_ph', name: 'الفيزياء', icon: 'zap', chapters: ['الميكانيك', 'الكهرباء', 'الحرارة'] },
      { id: 's4_ch', name: 'الكيمياء', icon: 'flask', chapters: ['الذرية', 'الروابط', 'المحاليل'] },
      { id: 's4_bio', name: 'الأحياء', icon: 'heart', chapters: ['الخلية', 'الوراثة', 'التصنيف'] },
      { id: 's4_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Grammar', 'Reading', 'Essay'] }
    ],
    sec_sci_5: [
      { id: 's5_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'الأدب', 'البلاغة', 'النصوص'] },
      { id: 's5_math', name: 'الرياضيات', icon: 'calc', chapters: ['التفاضل', 'التكامل', 'المتجهات'] },
      { id: 's5_ph', name: 'الفيزياء', icon: 'zap', chapters: ['الكهرباء', 'المغناطيسية', 'البصريات'] },
      { id: 's5_ch', name: 'الكيمياء', icon: 'flask', chapters: ['العضوية', 'الحرارية', 'التوازن'] },
      { id: 's5_bio', name: 'الأحياء', icon: 'heart', chapters: ['الخلية', 'الوراثة', 'التنوع'] },
      { id: 's5_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Grammar', 'Reading', 'Composition'] }
    ],
    sec_sci_6: [
      { id: 's6_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'الأدب', 'البلاغة'] },
      { id: 's6_math', name: 'الرياضيات', icon: 'calc', chapters: ['التفاضل', 'التكامل', 'الأعداد المركبة'] },
      { id: 's6_ph', name: 'الفيزياء', icon: 'zap', chapters: ['الكهرباء', 'المغناطيسية', 'النووية'] },
      { id: 's6_ch', name: 'الكيمياء', icon: 'flask', chapters: ['العضوية', 'التحليلية', 'الكهروكيمياء'] },
      { id: 's6_bio', name: 'الأحياء', icon: 'heart', chapters: ['الوراثة', 'التطور', 'البيئة'] },
      { id: 's6_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Grammar', 'Composition', 'Literature'] }
    ],
    sec_lit_4: [
      { id: 'l4_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'الأدب', 'البلاغة', 'النصوص'] },
      { id: 'l4_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Grammar', 'Reading', 'Vocabulary'] },
      { id: 'l4_fr', name: 'الفرنسي', icon: 'globe', chapters: ['Grammaire', 'Lecture', 'Vocabulaire'] },
      { id: 'l4_his', name: 'التاريخ', icon: 'book-open', chapters: ['القديم', 'الإسلامي', 'الحديث'] },
      { id: 'l4_geo', name: 'الجغرافية', icon: 'map', chapters: ['الطبيعية', 'البشرية', 'الاقتصادية'] }
    ],
    sec_lit_5: [
      { id: 'l5_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'الأدب', 'البلاغة', 'النصوص'] },
      { id: 'l5_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Grammar', 'Reading', 'Translation'] },
      { id: 'l5_fr', name: 'الفرنسي', icon: 'globe', chapters: ['Grammaire', 'Lecture', 'Vocabulaire'] },
      { id: 'l5_his', name: 'التاريخ', icon: 'book-open', chapters: ['القديم', 'الإسلامي', 'الحديث'] },
      { id: 'l5_geo', name: 'الجغرافية', icon: 'map', chapters: ['الطبيعية', 'البشرية', 'الاقتصادية'] }
    ],
    sec_lit_6: [
      { id: 'l6_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'الأدب', 'البلاغة', 'النقد'] },
      { id: 'l6_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Grammar', 'Translation', 'Literature'] },
      { id: 'l6_fr', name: 'الفرنسي', icon: 'globe', chapters: ['Grammaire', 'Lecture', 'Civilisation'] },
      { id: 'l6_his', name: 'التاريخ', icon: 'book-open', chapters: ['القديم', 'الإسلامي', 'الحديث', 'المعاصر'] },
      { id: 'l6_geo', name: 'الجغرافية', icon: 'map', chapters: ['الطبيعية', 'البشرية', 'الاقتصادية', 'الجيوسياسية'] }
    ],
    voc_1: [
      { id: 'v1_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'المطالعة'] },
      { id: 'v1_math', name: 'الرياضيات', icon: 'calc', chapters: ['الأساسيات', 'التطبيقات'] },
      { id: 'v1_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Technical English', 'Basics'] },
      { id: 'v1_spec', name: 'الاختصاص', icon: 'tool', chapters: ['نظري', 'عملي', 'ورشة'] }
    ],
    voc_2: [
      { id: 'v2_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'المطالعة', 'التعبير'] },
      { id: 'v2_math', name: 'الرياضيات', icon: 'calc', chapters: ['التفاضل', 'التكامل', 'التطبيقات'] },
      { id: 'v2_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Technical English', 'Communication'] },
      { id: 'v2_spec', name: 'الاختصاص', icon: 'tool', chapters: ['نظري', 'عملي', 'مشروع'] }
    ],
    voc_3: [
      { id: 'v3_ar', name: 'اللغة العربية', icon: 'book', chapters: ['النحو', 'البلاغة', 'النصوص'] },
      { id: 'v3_math', name: 'الرياضيات', icon: 'calc', chapters: ['التفاضل', 'التكامل', 'الإحصاء'] },
      { id: 'v3_en', name: 'الإنكليزي', icon: 'globe', chapters: ['Technical English', 'Professional'] },
      { id: 'v3_spec', name: 'الاختصاص', icon: 'tool', chapters: ['نظري', 'عملي', 'تطبيقي'] }
    ]
  },

  exams: {
    p5_ar: { id: 'e_p5_ar', title: 'اختبار اللغة العربية', timeLimit: 30, questions: [
      { q: 'ما علامة رفع الفعل المضارع؟', options: ['الضمة', 'الفتحة', 'الكسرة', 'السكون'], answer: 0 },
      { q: '"الطالب المجتهد" تعرب كلمة "المجتهد":', options: ['نعت مرفوع', 'مضاف إليه', 'مفعول به', 'فاعل'], answer: 0 },
      { q: 'الفعل الماضي من "يكتب" هو:', options: ['كتب', 'يكتب', 'كاتب', 'مكتوب'], answer: 0 },
      { q: 'جمع كلمة "كتاب" هو:', options: ['كتب', 'كتابة', 'كاتب', 'مكتوب'], answer: 0 },
      { q: 'الحرف الناسخ من الأحرف التالية هو:', options: ['إن', 'ذهب', 'كتاب', 'جميل'], answer: 0 }
    ]},
    p6_ar: { id: 'e_p6_ar', title: 'اختبار اللغة العربية', timeLimit: 30, questions: [
      { q: 'الهمزة المتوسطة تكتب على:', options: ['حرف علة يناسب حركتها', 'الألف فقط', 'الواو فقط', 'الياء فقط'], answer: 0 },
      { q: 'الاستعارة هي تشبيه حذف أحد طرفيه:', options: ['صح', 'خطأ'], answer: 0 },
      { q: 'المبتدأ مرفوع بالضمة', options: ['صح', 'خطأ'], answer: 0 },
      { q: 'كلمة "استغفار" مصدر:', options: ['رباعي', 'ثلاثي', 'خماسي', 'سداسي'], answer: 0 }
    ]},
    m3_ar: { id: 'e_m3_ar', title: 'اختبار اللغة العربية', timeLimit: 30, questions: [
      { q: 'التمييز هو اسم منصوب يوضح المبهم', options: ['صح', 'خطأ'], answer: 0 },
      { q: 'المفعول لأجله يذكر لبيان سبب الفعل', options: ['صح', 'خطأ'], answer: 0 },
      { q: 'الحال هو اسم منصوب يبين هيئة الفاعل', options: ['صح', 'خطأ'], answer: 0 },
      { q: 'أسلوب التعجب القياسي يبدأ بـ:', options: ['ما أفعله', 'أفعل به', 'كلاهما', 'لا شيء'], answer: 0 },
      { q: '"نعم الطالب المجتهد" نعم فعل:', options: ['مدح', 'ذم', 'ناسخ', 'ناقص'], answer: 0 }
    ]},
    s6_ph: { id: 'e_s6_ph', title: 'اختبار الفيزياء', timeLimit: 45, questions: [
      { q: 'قانون أوم هو:', options: ['V=IR', 'F=ma', 'E=mc²', 'PV=nRT'], answer: 0 },
      { q: 'وحدة قياس التيار الكهربائي:', options: ['أمبير', 'فولت', 'أوم', 'واط'], answer: 0 },
      { q: 'المجال المغناطيسي يقاس بـ:', options: ['تسلا', 'نيوتن', 'جول', 'باسكال'], answer: 0 },
      { q: 'شحنة الإلكترون:', options: ['سالبة', 'موجبة', 'متعادلة', 'متغيرة'], answer: 0 },
      { q: 'التردد يقاس بـ:', options: ['هرتز', 'ثانية', 'متر', 'نيوتن'], answer: 0 }
    ]},
    s6_ar: { id: 'e_s6_ar', title: 'اختبار اللغة العربية', timeLimit: 30, questions: [
      { q: 'المعلقات من الشعر:', options: ['الجاهلي', 'الأموي', 'العباسي', 'الحديث'], answer: 0 },
      { q: 'الطباق هو الجمع بين معنيين متضادين', options: ['صح', 'خطأ'], answer: 0 },
      { q: 'المصدر الصناعي ينتهي بـ:', options: ['ية', 'اء', 'ان', 'ون'], answer: 0 },
      { q: 'صاحب معلقة "قفا نبك" هو:', options: ['امرؤ القيس', 'عنترة', 'زهير', 'النابغة'], answer: 0 }
    ]},
    l5_ar: { id: 'e_l5_ar', title: 'اختبار اللغة العربية', timeLimit: 30, questions: [
      { q: 'الجناس هو تشابه لفظين مع اختلاف المعنى', options: ['صح', 'خطأ'], answer: 0 },
      { q: 'المذهب الأدبي الذي يهتم بالواقع هو:', options: ['الواقعية', 'الرومانسية', 'الكلاسيكية', 'الرمزية'], answer: 0 },
      { q: 'الرواية فن:', options: ['نثري', 'شعري', 'مسرحي', 'خطابي'], answer: 0 },
      { q: 'الضمير المستتر في "اكتب" هو:', options: ['أنت', 'هو', 'أنا', 'نحن'], answer: 0 }
    ]},
    v1_ar: { id: 'e_v1_ar', title: 'اختبار اللغة العربية', timeLimit: 30, questions: [
      { q: 'الفاعل دائماً مرفوع', options: ['صح', 'خطأ'], answer: 0 },
      { q: 'جمع المذكر السالم ينصب بـ:', options: ['الياء', 'الفتحة', 'الكسرة', 'الواو'], answer: 0 },
      { q: 'الأفعال الخمسة ترفع بـ:', options: ['ثبوت النون', 'الضمة', 'الواو', 'الياء'], answer: 0 },
      { q: 'من أدوات الشرط:', options: ['إن', 'ثم', 'الفاء', 'الواو'], answer: 0 }
    ]}
  },

  users: [
    { id: 'u1', role: 'student', name: 'أحمد محمد', phone: '07701234567', address: 'بغداد', stage: 'primary_6', password: '123', school: 'مدرسة المنصور', generatedUserId: 'STU-001', deviceId: null, isSubscribed: false },
    { id: 'u2', role: 'student', name: 'عمر علي', phone: '07702345678', address: 'البصرة', stage: 'middle_3', password: '123', school: 'متوسطة الخليل', generatedUserId: 'STU-002', deviceId: null, isSubscribed: false },
    { id: 'u3', role: 'student', name: 'نور حسين', phone: '07703456789', address: 'أربيل', stage: 'sec_sci_6', password: '123', school: 'إعدادية العلم', generatedUserId: 'STU-003', deviceId: null, isSubscribed: false },
    { id: 'u4', role: 'student', name: 'ليلى خالد', phone: '07704567890', address: 'الموصل', stage: 'sec_lit_5', password: '123', school: 'إعدادية الأديب', generatedUserId: 'STU-004', deviceId: null, isSubscribed: false },
    { id: 'u5', role: 'student', name: 'حسن كريم', phone: '07705678901', address: 'النجف', stage: 'voc_1', password: '123', school: 'معهد الكهرباء', generatedUserId: 'STU-005', deviceId: null, isSubscribed: false },
    { id: 'u6', role: 'student', name: 'سارة أحمد', phone: '07706789012', address: 'بغداد', stage: 'primary_5', password: '123', school: 'مدرسة المنصور', generatedUserId: 'STU-006', deviceId: null, isSubscribed: false },
    { id: 'u7', role: 'student', name: 'علي رضا', phone: '07707890123', address: 'كربلاء', stage: 'middle_1', password: '123', school: 'متوسطة الحسين', generatedUserId: 'STU-007', deviceId: null, isSubscribed: false }
  ],

  parent: { id: 'p1', role: 'parent', name: 'محمد أحمد', phone: '07708901234', studentUserId: 'STU-001', studentName: 'أحمد محمد', password: '123', generatedUserId: 'STU-001' },

  teacher: { id: 't1', role: 'teacher', name: 'أستاذ علي', phone: '07709012345', password: '123', specialty: 'اللغة العربية', studentsCount: 7 },

  owner: { id: 'o1', role: 'owner', name: 'مؤسس المنصة', phone: '07700000000', password: 'admin123' },

  results: [
    { studentId: 'u3', examId: 'e_s6_ph', score: 80, total: 100, date: '2026-05-15', answers: [0,0,0,0,0] },
    { studentId: 'u3', examId: 'e_s6_ar', score: 75, total: 100, date: '2026-05-20', answers: [0,0,0,0] },
    { studentId: 'u2', examId: 'e_m3_ar', score: 90, total: 100, date: '2026-06-01', answers: [0,0,0,0,0] },
    { studentId: 'u4', examId: 'e_l5_ar', score: 85, total: 100, date: '2026-06-05', answers: [0,0,0,0] }
  ],

  notifications: [
    { id: 'n1', fromUserId: 't1', toStudentIds: ['u1','u2','u3','u4','u5','u6','u7'], text: 'تذكير: الاختبار القادم يوم الأحد', date: '2026-06-20', type: 'general' },
    { id: 'n2', fromUserId: 'o1', toStudentIds: ['u3'], text: 'تهانينا! حصلت على أعلى درجة في الفيزياء', date: '2026-06-21', type: 'specific' }
  ],

  slides: [
    { id: 's1', image: 'https://placehold.co/600x200/1e5ba3/white?text=مرحباً+بكم+في+منصة+عراق+تكنو', link: '#' },
    { id: 's2', image: 'https://placehold.co/600x200/e91e63/white?text=دوراتنا+التعليمية+لجميع+المراحل', link: '#' },
    { id: 's3', image: 'https://placehold.co/600x200/16a34a/white?text=اشترك+الآن+واستمتع+بالمحتوى+الكامل', link: '#' }
  ]
};
