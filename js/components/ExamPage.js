const ExamPage = {
  data() {
    return {
      cooldownSeconds: 45,
      lockUntil: null,
      currentStep: 'setup',
      currentQuestionIndex: 0,
      selectedSubjectId: null,
      selectedChapterId: null,
      answers: [],
      score: 0,
      review: [],
      examStartedAt: null,
      examFinishedAt: null,
      timeExpired: false,
      now: Date.now(),
      timerInterval: null,
      lastWarningSecond: null,
      examDurationSeconds: 180,
      lockedExams: {},
      subjects: [
        {
          id: 'math',
          name: 'الرياضيات',
          color: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          chapters: [
            { id: 'chapter1', title: 'الفصل الأول: الأعداد والعمليات', questions: [
              { text: 'ما قيمة 7 + 8؟', options: ['13', '14', '15', '16'], correct: '15', explanation: '7 + 8 = 15.' },
              { text: 'ما ناتج 12 ÷ 3؟', options: ['2', '3', '4', '5'], correct: '4', explanation: '12 ÷ 3 = 4.' },
              { text: 'ما هو الرقم التالي في المتتابعة 2، 4، 6، 8، ؟', options: ['9', '10', '11', '12'], correct: '10', explanation: 'المتتابعة تزداد بمقدار 2.' },
              { text: 'ما قيمة 5 × 6؟', options: ['25', '30', '35', '40'], correct: '30', explanation: '5 × 6 = 30.' },
              { text: 'ما هو نصف العدد 20؟', options: ['5', '10', '15', '20'], correct: '10', explanation: 'نصف 20 يساوي 10.' }
            ]},
            { id: 'chapter2', title: 'الفصل الثاني: المعادلات البسيطة', questions: [
              { text: 'إذا كانت x + 3 = 8، فما قيمة x؟', options: ['3', '5', '8', '11'], correct: '5', explanation: 'x = 8 - 3 = 5.' },
              { text: 'إذا كانت 2x = 10، فما قيمة x؟', options: ['3', '4', '5', '6'], correct: '5', explanation: 'x = 10 ÷ 2 = 5.' },
              { text: 'ما قيمة 4 + 2 × 3؟', options: ['10', '12', '14', '18'], correct: '10', explanation: 'أولًا الضرب ثم الجمع.' },
              { text: 'ما قيمة 15 - 7؟', options: ['7', '8', '9', '10'], correct: '8', explanation: '15 - 7 = 8.' },
              { text: 'إذا كانت x - 4 = 1، فما قيمة x؟', options: ['3', '4', '5', '6'], correct: '5', explanation: 'x = 1 + 4 = 5.' }
            ]}
          ]
        },
        {
          id: 'science',
          name: 'العلوم',
          color: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
          chapters: [
            { id: 'chapter1', title: 'الفصل الأول: المادة والطاقة', questions: [
              { text: 'ما هي الحالة التي تكون فيها المادة على شكل سائل؟', options: ['الثلج', 'الماء', 'البخار', 'الهواء'], correct: 'الماء', explanation: 'الماء مثال على المادة في الحالة السائلة.' },
              { text: 'ما هو مصدر الضوء الطبيعي؟', options: ['المصباح', 'الشمس', 'الشمعة', 'الهواء'], correct: 'الشمس', explanation: 'الشمس هي مصدر الضوء الطبيعي الرئيسي.' },
              { text: 'ما الذي يجعل الأشياء تسقط نحو الأرض؟', options: ['الحرارة', 'الجاذبية', 'الضغط', 'الضوء'], correct: 'الجاذبية', explanation: 'الجاذبية هي القوة التي تسحب الأجسام نحو الأرض.' },
              { text: 'ما هي المادة التي تتبخر بسرعة؟', options: ['الثلج', 'الماء', 'البخار', 'الحديد'], correct: 'البخار', explanation: 'البخار هو الماء في حالة غازية.' },
              { text: 'ما هي الطاقة التي تنتج من الشمس؟', options: ['طاقة حرارية', 'طاقة صوتية', 'طاقة كهربائية', 'طاقة كيميائية'], correct: 'طاقة حرارية', explanation: 'الشمس تعطينا طاقة حرارية وضوئية.' }
            ]},
            { id: 'chapter2', title: 'الفصل الثاني: الكائنات الحية', questions: [
              { text: 'ما الذي تحتاجه النباتات لتصنع غذائها؟', options: ['الرماد', 'الماء والضوء', 'الحديد', 'الثلج'], correct: 'الماء والضوء', explanation: 'النباتات تحتاج الماء والضوء لإجراء البناء الضوئي.' },
              { text: 'ما هي الوظيفة الأساسية للجذور؟', options: ['التنفس', 'امتصاص الماء', 'التكاثر', 'التحرك'], correct: 'امتصاص الماء', explanation: 'الجذور تمتص الماء والعناصر الغذائية من التربة.' },
              { text: 'أي كائن حي يستطيع الحركة بنفسه؟', options: ['الحجر', 'الورقة', 'الحيوان', 'الصخر'], correct: 'الحيوان', explanation: 'الحيوانات تتحرك وتستجيب للبيئة.' },
              { text: 'ما هي الوحدة الأساسية للحياة؟', options: ['الخلية', 'النسيج', 'العضو', 'الجهاز'], correct: 'الخلية', explanation: 'الخلية هي الوحدة الأساسية لجميع الكائنات الحية.' },
              { text: 'ما الذي يحتاجه الإنسان للتنفس؟', options: ['الماء فقط', 'الأكسجين', 'الملح', 'السكر'], correct: 'الأكسجين', explanation: 'الإنسان يحتاج الأكسجين للتنفس.' }
            ]}
          ]
        },
        {
          id: 'arabic',
          name: 'اللغة العربية',
          color: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
          chapters: [
            { id: 'chapter1', title: 'الفصل الأول: القواعد', questions: [
              { text: 'ما اسم الفعل في الجملة: "الطالب يقرأ"؟', options: ['الطالب', 'يقرأ', 'في', 'الكتاب'], correct: 'يقرأ', explanation: 'الفعل هو الكلمة التي تدل على الحدث.' },
              { text: 'ما نوع الكلمة "كتاب"؟', options: ['فعل', 'اسم', 'حرف', 'ظرف'], correct: 'اسم', explanation: 'الكتاب اسم يدل على شيء معين.' },
              { text: 'ما الحرف الذي يربط كلمتين؟', options: ['الاسم', 'الفعل', 'الحرف', 'العدد'], correct: 'الحرف', explanation: 'الحرف يربط الكلمات في الجملة.' },
              { text: 'ما جمع كلمة "طالب"؟', options: ['طالبات', 'طلاب', 'طالبون', 'طالبين'], correct: 'طلاب', explanation: 'جمع كلمة طالب هو طلاب.' },
              { text: 'ما نوع الجملة: "الجو جميل"؟', options: ['سؤال', 'أمر', 'خبر', 'تعجب'], correct: 'خبر', explanation: 'الجملة هنا تخبرنا بحقيقة.' }
            ]},
            { id: 'chapter2', title: 'الفصل الثاني: البلاغة', questions: [
              { text: 'ما هو التشبيه في: "الولد كالبرق"؟', options: ['الولد', 'البرق', 'كالبرق', 'لا شيء'], correct: 'كالبرق', explanation: 'التشبيه يستخدم أداة تشبيه مثل الكاف.' },
              { text: 'ما هو المقصود بالاستفهام؟', options: ['طلب الفهم', 'طلب السلوك', 'طلب العطاء', 'طلب النوم'], correct: 'طلب الفهم', explanation: 'الاستفهام هو طلب المعرفة أو الفهم.' },
              { text: 'ما معنى الكلمة "أمل"؟', options: ['قلق', 'رجاء', 'حزن', 'غضب'], correct: 'رجاء', explanation: 'الأمل يعني الرجاء والتوقع.' },
              { text: 'ما هو جمع كلمة "كتاب"؟', options: ['كتب', 'كتابات', 'كتبون', 'كتبنا'], correct: 'كتب', explanation: 'جمع كلمة كتاب هو كتب.' },
              { text: 'ما نوع الجملة: "هل تدرس"؟', options: ['خبر', 'سؤال', 'أمر', 'نداء'], correct: 'سؤال', explanation: 'الجملة هنا تطرح سؤالاً.' }
            ]}
          ]
        },
        {
          id: 'computer',
          name: 'الحاسوب',
          color: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
          chapters: [
            { id: 'chapter1', title: 'الفصل الأول: أساسيات الحاسوب', questions: [
              { text: 'ما هي أداة إدخال البيانات؟', options: ['المعالج', 'الماوس', 'الشاشة', 'الطابعة'], correct: 'الماوس', explanation: 'الماوس هو جهاز إدخال.' },
              { text: 'ما هي وحدة المعالجة المركزية؟', options: ['CPU', 'RAM', 'ROM', 'SSD'], correct: 'CPU', explanation: 'CPU هي وحدة المعالجة المركزية.' },
              { text: 'ما هي الذاكرة المؤقتة؟', options: ['ROM', 'SSD', 'RAM', 'HD'], correct: 'RAM', explanation: 'RAM هي الذاكرة المؤقتة التي يعمل بها النظام.' },
              { text: 'ما الذي يُستخدم لحفظ البيانات بشكل دائم؟', options: ['الذاكرة المؤقتة', 'القرص الصلب', 'المعالج', 'الشاشة'], correct: 'القرص الصلب', explanation: 'القرص الصلب يستخدم لحفظ البيانات بشكل دائم.' },
              { text: 'ما هي شاشة العرض؟', options: ['جهاز إدخال', 'جهاز إخراج', 'جهاز تخزين', 'جهاز معالجة'], correct: 'جهاز إخراج', explanation: 'الشاشة تعرض المعلومات للمستخدم.' }
            ]},
            { id: 'chapter2', title: 'الفصل الثاني: الإنترنت والأمان', questions: [
              { text: 'ما هو المتصفح؟', options: ['برنامج تشغيل', 'متصفح ويب', 'برنامج ترميز', 'محرر صور'], correct: 'متصفح ويب', explanation: 'المتصفح يسمح بفتح صفحات الإنترنت.' },
              { text: 'ما المقصود بكلمة URL؟', options: ['عنوان صفحة ويب', 'نوع ملف', 'كلمة مرور', 'برنامج'], correct: 'عنوان صفحة ويب', explanation: 'URL هو عنوان الصفحة على الإنترنت.' },
              { text: 'ما هو الهدف من كلمة المرور القوية؟', options: ['تسهيل الدخول', 'زيادة السرعة', 'الحماية', 'تغيير اللغة'], correct: 'الحماية', explanation: 'كلمة المرور القوية تحمي الحساب.' },
              { text: 'ما هو البريد الإلكتروني؟', options: ['أداة تسجيل', 'رسالة رقمية', 'برنامج تشغيل', 'متصفح'], correct: 'رسالة رقمية', explanation: 'البريد الإلكتروني يُستخدم لإرسال الرسائل إلكترونيًا.' },
              { text: 'ما هي أفضل طريقة للحفاظ على البيانات؟', options: ['إيقاف الجهاز', 'النسخ الاحتياطي', 'إغلاق المتصفح', 'إيقاف الإنترنت'], correct: 'النسخ الاحتياطي', explanation: 'النسخ الاحتياطي يحافظ على البيانات من الضياع.' }
            ]}
          ]
        }
      ]
    };
  },
  created() {
    if (AppStore.userRole === 'student') {
      AppStore.view = 'studentDash';
    }
  },
  computed: {
    selectedSubject() {
      return this.selectedSubjectId ? this.subjects.find(subject => subject.id === this.selectedSubjectId) : null;
    },
    selectedChapter() {
      return this.selectedSubject && this.selectedChapterId
        ? this.selectedSubject.chapters.find(chapter => chapter.id === this.selectedChapterId)
        : null;
    },
    currentQuestion() {
      return this.selectedChapter ? this.selectedChapter.questions[this.currentQuestionIndex] : null;
    },
    totalQuestions() {
      return this.selectedChapter ? this.selectedChapter.questions.length : 0;
    },
    progressPercent() {
      return this.totalQuestions ? ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100 : 0;
    },
    timerPercent() {
      return this.examDurationSeconds ? (this.timeRemainingSeconds / this.examDurationSeconds) * 100 : 0;
    },
    isLocked() {
      if (!this.selectedSubject || !this.selectedChapter) return false;
      const key = `${this.selectedSubject.id}:${this.selectedChapter.id}`;
      return this.lockedExams[key] && Date.now() < this.lockedExams[key];
    },
    timeRemainingSeconds() {
      if (this.currentStep !== 'quiz' || !this.examStartedAt) {
        return this.examDurationSeconds;
      }
      const remainingMs = this.examStartedAt + this.examDurationSeconds * 1000 - this.now;
      return Math.max(0, Math.ceil(remainingMs / 1000));
    },
    timerToneClass() {
      if (this.timeRemainingSeconds <= 10) return 'timer-pill-danger';
      if (this.timeRemainingSeconds <= 30) return 'timer-pill-warning';
      return 'timer-pill-normal';
    },
    completionTitle() {
      if (this.timeExpired) return 'انتهى الوقت';
      if (this.score >= 70) return 'تم اجتياز الاختبار';
      return 'تم إنهاء الاختبار';
    },
    completionMessage() {
      if (this.timeExpired) return 'انتهى الوقت قبل إكمال الأسئلة، يمكنك المحاولة لاحقًا.';
      return 'أحسنت، يمكنك مراجعة الإجابات والأخطاء أدناه.';
    },
    correctCount() {
      return this.review.filter(item => item.isCorrect).length;
    },
    wrongCount() {
      return this.review.filter(item => !item.isCorrect).length;
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    this.stopTimer();
  },
  methods: {
    startTimer() {
      this.stopTimer();
      this.timerInterval = setInterval(() => {
        this.now = Date.now();
        if (this.currentStep === 'quiz') {
          const remaining = this.timeRemainingSeconds;
          if (remaining <= 0) {
            this.finishExam(true);
          } else if (remaining <= 10 && this.lastWarningSecond !== remaining) {
            this.playBeep();
            this.lastWarningSecond = remaining;
          }
        }
      }, 1000);
    },
    stopTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    },
    playBeep() {
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = 'triangle';
        oscillator.frequency.value = 880;
        gain.gain.value = 0.06;
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start();
        oscillator.stop(context.currentTime + 0.15);
      } catch (error) {
        console.warn('Audio not supported', error);
      }
    },
    brandColor() {
      return getComputedStyle(document.documentElement).getPropertyValue('--brand-blue').trim() || '#1e5ba3';
    },
    selectSubject(subjectId) {
      this.selectedSubjectId = subjectId;
      this.selectedChapterId = null;
      this.resetExam();
    },
    selectChapter(chapterId) {
      this.selectedChapterId = chapterId;
      this.resetExam();
    },
    resetSelection() {
      this.selectedSubjectId = null;
      this.selectedChapterId = null;
      this.resetExam();
    },
    startExam() {
      if (this.isLocked || this.currentStep === 'quiz') return;
      this.currentStep = 'quiz';
      this.currentQuestionIndex = 0;
      this.answers = [];
      this.score = 0;
      this.review = [];
      this.examStartedAt = Date.now();
      this.examFinishedAt = null;
      this.timeExpired = false;
      this.now = Date.now();
      this.lastWarningSecond = null;
      this.startTimer();
    },
    resetExam() {
      this.currentStep = 'setup';
      this.currentQuestionIndex = 0;
      this.answers = [];
      this.score = 0;
      this.review = [];
      this.examStartedAt = null;
      this.examFinishedAt = null;
      this.timeExpired = false;
      this.now = Date.now();
      this.lastWarningSecond = null;
      this.startTimer();
    },
    chooseAnswer(option) {
      if (this.currentStep !== 'quiz') return;
      this.answers[this.currentQuestionIndex] = option;
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.totalQuestions - 1) {
        this.currentQuestionIndex += 1;
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex -= 1;
      }
    },
    finishExam(forceTimeOut = false) {
      if (this.currentStep !== 'quiz' || !this.selectedSubject || !this.selectedChapter) return;
      const questions = this.selectedChapter.questions;
      let correctAnswers = 0;
      const review = [];

      questions.forEach((question, index) => {
        const chosenAnswer = this.answers[index];
        const isCorrect = chosenAnswer === question.correct;
        if (isCorrect) correctAnswers += 1;
        review.push({
          ...question,
          chosenAnswer: chosenAnswer || 'لم يختار إجابة',
          isCorrect
        });
      });

      this.score = Math.round((correctAnswers / questions.length) * 100);
      this.review = review;
      this.currentStep = 'result';
      this.examFinishedAt = Date.now();
      this.timeExpired = forceTimeOut;
      const key = `${this.selectedSubject.id}:${this.selectedChapter.id}`;
      this.lockedExams[key] = Date.now() + this.cooldownSeconds * 1000;
      this.stopTimer();

      const examRecord = {
        id: Date.now(),
        subjectName: this.selectedSubject.name,
        chapterName: this.selectedChapter.title,
        score: this.score,
        correctCount: correctAnswers,
        totalQuestions: questions.length,
        date: this.examFinishedAt,
        timeExpired: forceTimeOut,
        review: review.map(r => ({
          text: r.text,
          options: r.options,
          correct: r.correct,
          chosenAnswer: r.chosenAnswer,
          isCorrect: r.isCorrect,
          explanation: r.explanation
        }))
      };
      const history = JSON.parse(localStorage.getItem('examHistory') || '[]');
      history.unshift(examRecord);
      localStorage.setItem('examHistory', JSON.stringify(history));
    },
    getResultText() {
      if (this.score >= 80) return 'ممتاز جدًا';
      if (this.score >= 60) return 'جيد';
      if (this.score >= 40) return 'مقبول';
      return 'يحتاج إلى مزيد من التدريب';
    },
    formatTimeRemaining() {
      const seconds = this.timeRemainingSeconds;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
    formatClock(timestamp) {
      return new Intl.DateTimeFormat('ar-SA', { hour: '2-digit', minute: '2-digit' }).format(timestamp);
    },
    getExamLockRemaining() {
      if (!this.selectedSubject || !this.selectedChapter) return 0;
      const key = `${this.selectedSubject.id}:${this.selectedChapter.id}`;
      const until = this.lockedExams[key];
      if (!until) return 0;
      return Math.max(0, Math.ceil((until - Date.now()) / 1000));
    },
    formatLockRemaining() {
      const seconds = this.getExamLockRemaining();
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    },
    getChapterGradient(index) {
      const palettes = [
        'linear-gradient(135deg, #3b82f6, #1d4ed8)',
        'linear-gradient(135deg, #60a5fa, #3b82f6)',
        'linear-gradient(135deg, #10b981, #059669)',
        'linear-gradient(135deg, #34d399, #10b981)',
        'linear-gradient(135deg, #f59e0b, #d97706)',
        'linear-gradient(135deg, #fbbf24, #f59e0b)',
        'linear-gradient(135deg, #8b5cf6, #6d28d9)',
        'linear-gradient(135deg, #a78bfa, #8b5cf6)',
        'linear-gradient(135deg, #ec4899, #db2777)',
        'linear-gradient(135deg, #f472b6, #ec4899)',
      ];
      return palettes[index % palettes.length];
    }
  },
  template: `
    <section class="exam-page">
      <div class="exam-intro">
        <h2>اختبار ذكي ومنافس</h2>
        <p>اختر المادة ثم اختر الاختبار، وابدأ رحلة حل الأسئلة مع مؤقت حي ورسالة تحفيزية بعد كل إنجاز.</p>
      </div>

      <div class="exam-hero-card">
        <div>
          <div class="exam-badge">اختبار تفاعلي</div>
          <h3>أنت جاهز للانطلاق</h3>
          <p>5 أسئلة لكل اختبار • مؤقت واضح • نتائج فورية</p>
        </div>
        <div class="timer-ring-wrap">
          <div class="timer-ring" :style="{ background: 'conic-gradient(' + brandColor() + ' ' + timerPercent + '%, rgba(255,255,255,0.2) 0)' }">
            <div class="timer-ring-inner">
              <strong>{{ currentStep === 'quiz' ? formatTimeRemaining() : '03:00' }}</strong>
              <small>{{ currentStep === 'quiz' ? 'الوقت المتبقي' : 'المدة' }}</small>
            </div>
          </div>
        </div>
      </div>

      <div class="exam-setup-card">
        <div v-if="!selectedSubjectId" class="subject-selector-grid">
          <button
            v-for="subject in subjects"
            :key="subject.id"
            class="subject-choice-card"
            :style="{ background: subject.color }"
            @click="selectSubject(subject.id)"
          >
            <span class="subject-choice-title">{{ subject.name }}</span>
            <span class="subject-choice-sub">{{ subject.chapters.length }} اختبارات</span>
          </button>
        </div>

        <div v-else class="selected-subject-panel">
          <div class="selected-subject-row">
            <div>
              <div class="exam-section-title">المادة المختارة</div>
              <h3>{{ selectedSubject.name }}</h3>
            </div>
            <button class="text-link-btn" @click="resetSelection">تغيير المادة</button>
          </div>

          <div v-if="!selectedChapterId" class="chapter-selector-grid">
            <button
              v-for="(chapter, index) in selectedSubject.chapters"
              :key="chapter.id"
              class="chapter-choice-card"
              :style="{ background: getChapterGradient(index) }"
              @click="selectChapter(chapter.id)"
            >
              <span class="chapter-icon">{{ index + 1 }}</span>
              <span>{{ chapter.title }}</span>
            </button>
          </div>

          <div v-else class="selected-chapter-card">
            <div>
              <div class="exam-section-title">الاختبار المختار</div>
              <h3>{{ selectedChapter.title }}</h3>
            </div>
            <div class="exam-actions">
              <button class="exam-btn secondary" @click="selectChapter(null)">تغيير الاختبار</button>
              <button class="exam-btn primary" @click="startExam" :disabled="isLocked">
                {{ isLocked ? 'سيتم التفعيل بعد ' + formatLockRemaining() : 'ابدأ الاختبار' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentStep === 'quiz'" class="exam-quiz-card">
        <div class="exam-progress">
          <div class="exam-progress-bar">
            <div :style="{ width: progressPercent + '%' }"></div>
          </div>
          <div class="progress-info">
            <span class="progress-text">السؤال {{ currentQuestionIndex + 1 }} من {{ totalQuestions }}</span>
            <span class="progress-pill">{{ currentQuestionIndex + 1 }}/{{ totalQuestions }}</span>
          </div>
        </div>

        <div class="exam-question-shell">
          <div class="question-header">
            <div class="question-badge">سؤال {{ currentQuestionIndex + 1 }}</div>
            <div class="question-dots">
              <span v-for="i in totalQuestions" :key="i"
                class="q-dot"
                :class="i <= currentQuestionIndex ? 'q-dot-done' : (i === currentQuestionIndex + 1 ? 'q-dot-active' : '')"
              ></span>
            </div>
          </div>
          <h3>{{ currentQuestion.text }}</h3>
          <div class="exam-options">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="option"
              class="exam-option"
              :class="answers[currentQuestionIndex] === option ? 'exam-option-selected' : ''"
              @click="chooseAnswer(option)"
            >
              <span class="option-radio" :class="answers[currentQuestionIndex] === option ? 'option-radio-checked' : ''"></span>
              <span class="option-letter">{{ ['أ', 'ب', 'ج', 'د'][index] }}</span>
              <span class="option-text">{{ option }}</span>
            </button>
          </div>
        </div>

        <div class="exam-actions">
          <button class="exam-btn secondary" @click="prevQuestion" :disabled="currentQuestionIndex === 0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            السابق
          </button>
          <button v-if="currentQuestionIndex < totalQuestions - 1" class="exam-btn primary" @click="nextQuestion">
            التالي
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
          <button v-else class="exam-btn primary" @click="finishExam">
            إنهاء الاختبار
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>

      <div v-else-if="currentStep === 'result'" class="exam-result-card">
        <div class="result-summary">
          <div class="result-score-ring">
            <strong>{{ score }}%</strong>
            <span>النتيجة</span>
          </div>
          <div class="result-stats-grid">
            <div class="result-stat-card success">
              <strong>{{ correctCount }}</strong>
              <span>إجابات صحيحة</span>
            </div>
            <div class="result-stat-card danger">
              <strong>{{ wrongCount }}</strong>
              <span>أخطاء</span>
            </div>
          </div>
        </div>

        <div class="result-badge">{{ completionTitle }}</div>
        <h3>{{ getResultText() }}</h3>
        <p>{{ completionMessage }}</p>
        <div class="result-meta">
          <div class="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>البداية: {{ formatClock(examStartedAt) }}</span>
          </div>
          <div class="meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>النهاية: {{ formatClock(examFinishedAt) }}</span>
          </div>
        </div>

        <div class="review-list">
          <div v-for="(item, index) in review" :key="index" class="review-item" :class="item.isCorrect ? 'review-item-correct' : 'review-item-wrong'">
            <div class="review-item-top">
              <div class="review-status-icon" :class="item.isCorrect ? 'status-correct' : 'status-wrong'">
                <svg v-if="item.isCorrect" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </div>
              <div class="review-content">
                <p class="review-question">{{ index + 1 }}. {{ item.text }}</p>
                <div class="review-answers">
                  <span class="review-answer-label">إجابتك:</span>
                  <span class="review-answer-val" :class="item.isCorrect ? 'answer-correct' : 'answer-wrong'">{{ item.chosenAnswer }}</span>
                </div>
                <div v-if="!item.isCorrect" class="review-answers">
                  <span class="review-answer-label">الصحيحة:</span>
                  <span class="review-answer-val answer-correct">{{ item.correct }}</span>
                </div>
                <p v-if="!item.isCorrect" class="review-explanation">{{ item.explanation }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="exam-actions">
          <button class="exam-btn primary" @click="startExam" :disabled="isLocked">
            {{ isLocked ? 'سيتم التفعيل بعد ' + formatLockRemaining() : 'إعادة الاختبار' }}
          </button>
          <button class="exam-btn secondary" @click="resetSelection">اختيار مادة أخرى</button>
        </div>
      </div>
    </section>
  `
};
