const StudentDash = {
  data() {
    return {
      subjects: [],
      selectedSubject: null,
      currentExam: null,
      examAnswers: [],
      examScore: null,
      examSubmitted: false,
      examTimeLeft: 0,
      examTimer: null,
      showSubscribe: false,
      subCode: '',
      subMessage: '',
      subSuccess: false,
      userNotifs: [],
      activeTab: 'subjects'
    };
  },
  computed: {
    stageSubjects() {
      return AppStore.getSubjects(AppStore.selectedStage);
    },
    stageLabel() {
      return AppStore.getStageLabel(AppStore.selectedStage);
    },
    allStages() {
      return AppStore.getStages();
    },
    currentUser() {
      return AppStore.currentUser;
    },
    isSubscribed() {
      return AppStore.currentUser && AppStore.currentUser.isSubscribed;
    }
  },
  watch: {
    'AppStore.selectedStage'() {
      this.loadSubjects();
    }
  },
  methods: {
    loadSubjects() {
      this.subjects = this.stageSubjects;
      this.selectedSubject = null;
      this.currentExam = null;
      this.examSubmitted = false;
      this.examScore = null;
    },
    selectSubject(subj) {
      this.selectedSubject = subj;
      this.currentExam = null;
      this.examSubmitted = false;
      this.examScore = null;
      this.activeTab = 'exam';
    },
    startExam() {
      const exam = AppStore.getExam(this.selectedSubject.id);
      if (!exam) return;
      if (!AppStore.canAccessSubject(this.selectedSubject.id)) {
        this.showSubscribe = true;
        return;
      }
      this.currentExam = exam;
      this.examAnswers = new Array(exam.questions.length).fill(null);
      this.examSubmitted = false;
      this.examScore = null;
      this.examTimeLeft = exam.timeLimit * 60;
      this.startTimer();
    },
    startTimer() {
      if (this.examTimer) clearInterval(this.examTimer);
      this.examTimer = setInterval(() => {
        if (this.examTimeLeft <= 0) {
          this.submitExam();
          return;
        }
        this.examTimeLeft--;
      }, 1000);
    },
    formatTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return m + ':' + (s < 10 ? '0' : '') + s;
    },
    selectAnswer(index, value) {
      this.examAnswers[index] = value;
    },
    submitExam() {
      if (this.examTimer) clearInterval(this.examTimer);
      let correct = 0;
      this.currentExam.questions.forEach((q, i) => {
        if (this.examAnswers[i] === q.answer) correct++;
      });
      const total = this.currentExam.questions.length;
      this.examScore = Math.round((correct / total) * 100);
      this.examSubmitted = true;
      AppStore.markTrialDone(this.selectedSubject.id);
    },
    backToSubjects() {
      this.selectedSubject = null;
      this.currentExam = null;
      this.examSubmitted = false;
      this.examScore = null;
      if (this.examTimer) clearInterval(this.examTimer);
    },
    stageSubjectsCount(stageId) {
      return (AppStore.getSubjects(stageId) || []).length;
    },
    changeStage(stageId) {
      AppStore.selectStage(stageId);
    },
    subscribeNow() {
      const result = AppStore.subscribe(this.subCode);
      this.subMessage = result.message;
      this.subSuccess = result.success;
      if (result.success) {
        setTimeout(() => { this.showSubscribe = false; this.subCode = ''; }, 1500);
      }
    },
    closeSubscribe() {
      this.showSubscribe = false;
      this.subCode = '';
      this.subMessage = '';
    }
  },
  mounted() {
    this.loadSubjects();
    this.userNotifs = AppStore.getStudentNotifications(AppStore.currentUser.id);
  },
  template: `
    <div class="student-dash">
      <div class="dash-header">
        <div class="dash-welcome">
          <h2>مرحباً، {{ currentUser?.name }}</h2>
          <span class="dash-stage">{{ stageLabel }}</span>
        </div>
        <div class="dash-stage-select">
          <select v-model="AppStore.selectedStage" @change="changeStage(AppStore.selectedStage)" class="stage-picker">
            <option v-for="s in allStages" :key="s.id" :value="s.id">{{ s.label }}</option>
          </select>
        </div>
      </div>

      <div v-if="!isSubscribed" class="dash-sub-banner" @click="showSubscribe = true">
        <span>اشترك الآن للحصول على المحتوى الكامل - الكود: 002200</span>
      </div>

      <div class="dash-tabs">
        <button :class="['dash-tab', { active: activeTab === 'subjects' }]" @click="activeTab = 'subjects'; backToSubjects()">المواد</button>
        <button :class="['dash-tab', { active: activeTab === 'notifs' }]" @click="activeTab = 'notifs'">الإشعارات</button>
      </div>

      <div v-if="activeTab === 'subjects' && !selectedSubject" class="subjects-grid">
        <div v-for="subj in stageSubjects" :key="subj.id" class="dash-subject-card" @click="selectSubject(subj)">
          <div class="dash-subj-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
          </div>
          <div class="dash-subj-info">
            <h4>{{ subj.name }}</h4>
            <p>{{ subj.chapters?.length || 0 }} فصول</p>
          </div>
          <div class="dash-subj-arrow">
            <span v-if="AppStore.canAccessSubject(subj.id)">&#8592;</span>
            <span v-else class="locked-icon">&#128274;</span>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'subjects' && selectedSubject && !currentExam" class="subject-detail">
        <button class="back-btn" @click="backToSubjects">&rarr; رجوع للمواد</button>
        <h3>{{ selectedSubject.name }}</h3>
        <div class="chapters-list">
          <div v-for="(ch, i) in selectedSubject.chapters" :key="i" class="chapter-item">
            <span class="chapter-num">{{ i + 1 }}</span>
            <span>{{ ch }}</span>
          </div>
        </div>
        <button class="start-exam-btn" @click="startExam">
          {{ AppStore.canAccessSubject(selectedSubject.id) ? 'ابدأ الاختبار التجريبي' : 'مشاهدة المحتوى' }}
        </button>
      </div>

      <div v-if="activeTab === 'subjects' && currentExam && !examSubmitted" class="exam-view">
        <div class="exam-timer">{{ formatTime(examTimeLeft) }}</div>
        <h3>{{ currentExam.title }}</h3>
        <div v-for="(q, qi) in currentExam.questions" :key="qi" class="exam-question">
          <p class="q-text">{{ qi + 1 }}. {{ q.q }}</p>
          <div class="q-options">
            <label v-for="(opt, oi) in q.options" :key="oi" :class="['q-option', { selected: examAnswers[qi] === oi }]">
              <input type="radio" :name="'q_' + qi" :value="oi" v-model="examAnswers[qi]" @change="selectAnswer(qi, oi)" />
              <span>{{ opt }}</span>
            </label>
          </div>
        </div>
        <button class="submit-exam-btn" @click="submitExam" :disabled="examAnswers.some(a => a === null)">تسليم الاختبار</button>
      </div>

      <div v-if="examSubmitted" class="exam-result">
        <div :class="['result-circle', examScore >= 70 ? 'pass' : 'fail']">
          <span class="result-score">{{ examScore }}%</span>
        </div>
        <p>{{ examScore >= 70 ? 'ممتاز! أداء جيد' : 'حاول مرة أخرى' }}</p>
        <button class="back-btn" @click="backToSubjects">العودة للمواد</button>
      </div>

      <div v-if="activeTab === 'notifs'" class="notifs-list">
        <div v-for="n in userNotifs" :key="n.id" class="notif-item">
          <div class="notif-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg>
          </div>
          <div class="notif-body">
            <p>{{ n.text }}</p>
            <span class="notif-date">{{ n.date }}</span>
          </div>
        </div>
        <p v-if="userNotifs.length === 0" class="empty-state">لا توجد إشعارات</p>
      </div>

      <div v-if="showSubscribe" class="modal-overlay" @click.self="closeSubscribe">
        <div class="modal-box">
          <h3>تفعيل الاشتراك</h3>
          <p v-if="!subMessage">أدخل كود الاشتراك (التجريبي: 002200)</p>
          <input v-model="subCode" class="modal-input" placeholder="كود الاشتراك" maxlength="10" />
          <p v-if="subMessage" :class="['sub-msg', subSuccess ? 'success' : 'error']">{{ subMessage }}</p>
          <div class="modal-actions">
            <button class="modal-btn primary" @click="subscribeNow">تفعيل</button>
            <button class="modal-btn" @click="closeSubscribe">إلغاء</button>
          </div>
        </div>
      </div>
    </div>
  `
};
