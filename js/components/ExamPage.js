const ExamPage = {
  data() {
    return {
      cooldownSeconds: 30,
      currentStep: 'setup',
      currentQuestionIndex: 0,
      selectedSubjectId: null,
      selectedChapterIndex: null,
      answers: [],
      score: 0,
      correctCount: 0,
      review: [],
      examStartedAt: null,
      examFinishedAt: null,
      timeExpired: false,
      now: Date.now(),
      timerInterval: null,
      lastWarningSecond: null,
      lockedExams: {},
      subjects: []
    };
  },
  computed: {
    isStudent() {
      return AppStore.userRole === 'student';
    },
    stageSubjects() {
      if (!this.isStudent) return [];
      return AppStore.getSubjects(AppStore.selectedStage).map(s => ({
        ...s,
        color: 'linear-gradient(135deg, var(--brand-blue), var(--brand-secondary))'
      }));
    },
    selectedSubject() {
      if (!this.selectedSubjectId) return null;
      return this.stageSubjects.find(s => s.id === this.selectedSubjectId);
    },
    selectedChapterName() {
      if (!this.selectedSubject || this.selectedChapterIndex === null) return null;
      return this.selectedSubject.chapters[this.selectedChapterIndex];
    },
    currentExam() {
      if (!this.selectedSubjectId || this.selectedChapterIndex === null) return null;
      return AppStore.getChapterExam(this.selectedSubjectId, this.selectedChapterIndex);
    },
    currentQuestion() {
      return this.currentExam ? this.currentExam.questions[this.currentQuestionIndex] : null;
    },
    totalQuestions() {
      return this.currentExam ? this.currentExam.questions.length : 0;
    },
    progressPercent() {
      return this.totalQuestions ? ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100 : 0;
    },
    timerPercent() {
      const duration = this.currentExam ? this.currentExam.timeLimit * 60 : 180;
      return duration ? (this.timeRemainingSeconds / duration) * 100 : 0;
    },
    isLocked() {
      if (!this.selectedSubjectId || this.selectedChapterIndex === null) return false;
      const key = this.selectedSubjectId + ':' + this.selectedChapterIndex;
      return this.lockedExams[key] && Date.now() < this.lockedExams[key];
    },
    lockKey() {
      if (!this.selectedSubjectId || this.selectedChapterIndex === null) return null;
      return this.selectedSubjectId + ':' + this.selectedChapterIndex;
    },
    timeRemainingSeconds() {
      if (this.currentStep !== 'quiz' || !this.examStartedAt) {
        const duration = this.currentExam ? this.currentExam.timeLimit * 60 : 180;
        return duration;
      }
      const remainingMs = this.examStartedAt + (this.currentExam ? this.currentExam.timeLimit * 60 : 180) * 1000 - this.now;
      return Math.max(0, Math.ceil(remainingMs / 1000));
    },
    timerToneClass() {
      if (this.timeRemainingSeconds <= 10) return 'timer-pill-danger';
      if (this.timeRemainingSeconds <= 30) return 'timer-pill-warning';
      return 'timer-pill-normal';
    },
    completionTitle() {
      if (this.timeExpired) return 'انتهى الوقت';
      if (this.score >= 70) return 'تهانينا! اجتزت الاختبار';
      return 'يمكنك المحاولة مرة أخرى';
    },
    completionMessage() {
      if (this.timeExpired) return 'انتهى الوقت قبل إكمال الأسئلة';
      return 'راجع إجاباتك لتعرف أخطاءك';
    },
    correctCount() {
      return this.review.filter(item => item.isCorrect).length;
    },
    wrongCount() {
      return this.review.filter(item => !item.isCorrect).length;
    },
    elapsedSeconds() {
      if (!this.examStartedAt) return 0;
      const end = this.examFinishedAt || Date.now();
      return Math.round((end - this.examStartedAt) / 1000);
    }
  },
  created() {
    this.loadLockedState();
    this.loadSubjects();
    if (AppStore.selectedSubject && AppStore.selectedChapter !== null) {
      this.selectedSubjectId = AppStore.selectedSubject.id;
      this.selectedChapterIndex = AppStore.selectedChapter;
    }
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    this.stopTimer();
  },
  methods: {
    loadSubjects() {
      this.subjects = this.stageSubjects;
    },
    loadLockedState() {
      try {
        const saved = localStorage.getItem('examLockedState');
        if (saved) this.lockedExams = JSON.parse(saved);
      } catch(e) {}
    },
    saveLockedState() {
      try {
        localStorage.setItem('examLockedState', JSON.stringify(this.lockedExams));
      } catch(e) {}
    },
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
      } catch (e) {}
    },
    brandColor() {
      return getComputedStyle(document.documentElement).getPropertyValue('--brand-blue').trim() || '#1e5ba3';
    },
    selectSubject(subjectId) {
      this.selectedSubjectId = subjectId;
      this.selectedChapterIndex = null;
      this.resetExam();
      AppStore.selectedSubject = this.stageSubjects.find(s => s.id === subjectId);
      AppStore.selectedChapter = null;
    },
    selectChapter(chapterIndex) {
      this.selectedChapterIndex = chapterIndex;
      AppStore.selectedChapter = chapterIndex;
      this.resetExam();
    },
    resetSelection() {
      this.selectedSubjectId = null;
      this.selectedChapterIndex = null;
      this.resetExam();
      AppStore.selectedSubject = null;
      AppStore.selectedChapter = null;
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
      if (this.answers[this.currentQuestionIndex] === undefined) return;
      if (this.currentQuestionIndex < this.totalQuestions - 1) {
        this.currentQuestionIndex += 1;
      } else {
        this.finishExam();
      }
    },
    finishExam(forceTimeOut = false) {
      if (this.currentStep !== 'quiz' || !this.currentExam) return;
      const questions = this.currentExam.questions;
      let correct = 0;
      const review = [];

      questions.forEach((question, index) => {
        const chosen = this.answers[index];
        const isCorrect = chosen === question.correct;
        if (isCorrect) correct += 1;
        review.push({
          text: question.text,
          options: question.options,
          correct: question.correct,
          chosenAnswer: chosen || 'لم يجيب',
          isCorrect
        });
      });

      this.score = Math.round((correct / questions.length) * 100);
      this.review = review;
      this.currentStep = 'result';
      this.examFinishedAt = Date.now();
      this.timeExpired = forceTimeOut;

      if (this.lockKey) {
        this.lockedExams[this.lockKey] = Date.now() + this.cooldownSeconds * 1000;
        this.saveLockedState();
      }
      this.stopTimer();

      const elapsed = this.elapsedSeconds;
      const examRecord = {
        id: Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        subjectId: this.selectedSubjectId,
        chapterIndex: this.selectedChapterIndex,
        subjectName: this.selectedSubject ? this.selectedSubject.name : '',
        chapterName: this.selectedChapterName || '',
        score: this.score,
        correctCount: correct,
        totalQuestions: questions.length,
        wrongCount: questions.length - correct,
        date: this.examFinishedAt,
        duration: elapsed,
        durationFormatted: this.formatDuration(elapsed),
        timeExpired: forceTimeOut,
        review: review
      };

      const history = JSON.parse(localStorage.getItem('examHistory') || '[]');
      history.unshift(examRecord);
      localStorage.setItem('examHistory', JSON.stringify(history));
    },
    getResultText() {
      if (this.score >= 80) return 'ممتاز جداً';
      if (this.score >= 60) return 'جيد';
      if (this.score >= 40) return 'مقبول';
      return 'يحتاج مزيد من التدريب';
    },
    formatTimeRemaining() {
      const seconds = this.timeRemainingSeconds;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return mins + ':' + (secs < 10 ? '0' : '') + secs;
    },
    formatDuration(seconds) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return m + ':' + (s < 10 ? '0' : '') + s;
    },
    formatClock(ts) {
      return new Intl.DateTimeFormat('ar-SA', { hour: '2-digit', minute: '2-digit' }).format(new Date(ts));
    },
    getLockRemaining() {
      if (!this.lockKey) return 0;
      const until = this.lockedExams[this.lockKey];
      if (!until) return 0;
      return Math.max(0, Math.ceil((until - Date.now()) / 1000));
    },
    formatLockRemaining() {
      const seconds = this.getLockRemaining();
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return m + ':' + (s < 10 ? '0' : '') + s;
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
        <h2>{{ currentStep === 'setup' ? 'الامتحانات' : currentStep === 'quiz' ? 'الاختبار' : 'النتيجة' }}</h2>
        <p>{{ currentStep === 'setup' ? 'اختر المادة ثم الفصل لبدء الاختبار' : currentStep === 'quiz' ? 'أجب على الأسئلة التالية' : 'نتيجة الاختبار' }}</p>
      </div>

      <template v-if="currentStep === 'setup'">

        <div v-if="!selectedSubjectId" class="exam-setup-card">
          <div class="exam-section-title">اختر المادة</div>
          <div class="subject-selector-grid">
            <button
              v-for="subject in stageSubjects"
              :key="subject.id"
              class="subject-choice-card"
              :style="{ background: subject.color }"
              @click="selectSubject(subject.id)"
            >
              <span class="subject-choice-title">{{ subject.name }}</span>
              <span class="subject-choice-sub">{{ subject.chapters.length }} فصول</span>
            </button>
          </div>
        </div>

        <div v-else-if="selectedSubject && selectedChapterIndex === null" class="exam-setup-card">
          <div class="selected-subject-row">
            <div>
              <div class="exam-section-title">المادة: {{ selectedSubject.name }}</div>
            </div>
            <button class="text-link-btn" @click="resetSelection">تغيير</button>
          </div>
          <div class="exam-section-title" style="margin-top:0.75rem">اختر الفصل</div>
          <div class="chapter-selector-grid">
            <button
              v-for="(chapter, index) in selectedSubject.chapters"
              :key="index"
              class="chapter-choice-card"
              :style="{ background: getChapterGradient(index) }"
              @click="selectChapter(index)"
            >
              <span class="chapter-icon">{{ index + 1 }}</span>
              <span>{{ chapter }}</span>
            </button>
          </div>
        </div>

        <div v-else-if="selectedChapterName" class="exam-setup-card">
          <div style="text-align:center;padding:1rem">
            <div class="exam-section-title">{{ selectedSubject.name }}</div>
            <h3 style="font-size:1.1rem;margin:0.5rem 0;color:var(--text-primary)">{{ selectedChapterName }}</h3>
            <p style="color:var(--text-secondary);font-size:0.85rem;margin:0.25rem 0 1rem">
              {{ currentExam ? currentExam.questions.length : 0 }} أسئلة • {{ currentExam ? currentExam.timeLimit : 0 }} دقائق
            </p>
            <div class="exam-actions" style="justify-content:center">
              <button class="exam-btn secondary" @click="selectedChapterIndex = null; AppStore.selectedChapter = null">تغيير الفصل</button>
              <button class="exam-btn primary" @click="startExam" :disabled="isLocked">
                {{ isLocked ? 'انتظر ' + formatLockRemaining() : 'ابدأ الاختبار' }}
              </button>
            </div>
          </div>
        </div>

      </template>

      <div v-if="currentStep === 'quiz'" class="exam-quiz-card">
        <div class="exam-progress">
          <div class="exam-progress-bar">
            <div :style="{ width: progressPercent + '%' }"></div>
          </div>
          <div class="progress-info">
            <span class="progress-text">السؤال {{ currentQuestionIndex + 1 }} من {{ totalQuestions }}</span>
            <span class="progress-pill" :class="timerToneClass">{{ formatTimeRemaining() }}</span>
          </div>
        </div>

        <div class="exam-question-shell">
          <div class="question-header">
            <div class="question-badge">سؤال {{ currentQuestionIndex + 1 }}</div>
            <div class="question-dots">
              <span v-for="i in totalQuestions" :key="i"
                class="q-dot"
                :class="i - 1 < currentQuestionIndex ? 'q-dot-done' : (i - 1 === currentQuestionIndex ? 'q-dot-active' : '')"
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
          <div></div>
          <button class="exam-btn primary" @click="nextQuestion" :disabled="answers[currentQuestionIndex] === undefined">
            {{ currentQuestionIndex < totalQuestions - 1 ? 'التالي' : 'إنهاء الاختبار' }}
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
              <span>صحيح</span>
            </div>
            <div class="result-stat-card danger">
              <strong>{{ wrongCount }}</strong>
              <span>خطأ</span>
            </div>
          </div>
        </div>

        <div class="result-badge">{{ completionTitle }}</div>
        <h3>{{ getResultText() }}</h3>
        <p>{{ completionMessage }}</p>
        <div class="result-meta">
          <div>
            <span>المدة: {{ formatDuration(elapsedSeconds) }} دقيقة</span>
          </div>
          <div>
            <span>التاريخ: {{ formatClock(examFinishedAt) }}</span>
          </div>
        </div>

        <div class="review-list" v-if="review.length">
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
              </div>
            </div>
          </div>
        </div>

        <div class="exam-actions">
          <button class="exam-btn primary" @click="startExam" :disabled="isLocked">
            {{ isLocked ? 'الانتظار ' + formatLockRemaining() : 'إعادة الاختبار' }}
          </button>
          <button class="exam-btn secondary" @click="resetSelection">مادة أخرى</button>
        </div>
      </div>
    </section>
  `
};
