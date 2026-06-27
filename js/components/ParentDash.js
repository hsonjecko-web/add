const ParentDash = {
  data() {
    return {
      student: null,
      results: [],
      notifications: []
    };
  },
  computed: {
    parentUser() {
      return AppStore.currentUser;
    }
  },
  methods: {
    loadStudentData() {
      if (!AppStore.currentUser) return;
      const pu = AppStore.currentUser;
      this.student = AppStore.getStudentByUserId(pu.generatedUserId);
      if (this.student) {
        this.results = AppStore.getResults(this.student.id);
        this.notifications = AppStore.getStudentNotifications(this.student.id);
      }
    },
    getExamTitle(examId) {
      const exam = Object.values(window.demoData.exams).find(e => e.id === examId);
      return exam ? exam.title : examId;
    },
    getScoreColor(score) {
      if (score >= 85) return '#16a34a';
      if (score >= 65) return '#d97706';
      return '#dc2626';
    }
  },
  mounted() {
    this.loadStudentData();
  },
  template: `
    <div class="parent-dash">
      <div class="dash-header">
        <h2>مرحباً، {{ parentUser?.name }}</h2>
        <p class="dash-subtitle">متابعة الأداء الدراسي</p>
      </div>

      <div v-if="student" class="parent-student-card">
        <div class="ps-header">
          <div class="ps-avatar">{{ student.name.charAt(0) }}</div>
          <div class="ps-info">
            <h3>{{ student.name }}</h3>
            <p>{{ AppStore.getStageLabel(student.stage) }}</p>
            <p class="ps-school">{{ student.school }}</p>
          </div>
        </div>
      </div>

      <div class="parent-section">
        <h3 class="section-title">نتائج الاختبارات</h3>
        <div v-if="results.length > 0" class="results-list">
          <div v-for="r in results" :key="r.examId" class="result-card">
            <div class="rc-left">
              <h4>{{ getExamTitle(r.examId) }}</h4>
              <span class="rc-date">{{ r.date }}</span>
            </div>
            <div class="rc-score" :style="{ color: getScoreColor(r.score), background: getScoreColor(r.score) + '18' }">
              {{ r.score }}%
            </div>
          </div>
        </div>
        <p v-else class="empty-state">لا توجد نتائج بعد</p>
      </div>

      <div class="parent-section">
        <h3 class="section-title">الإشعارات</h3>
        <div v-if="notifications.length > 0" class="notifs-list">
          <div v-for="n in notifications" :key="n.id" class="notif-item">
            <div class="notif-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg>
            </div>
            <div class="notif-body">
              <p>{{ n.text }}</p>
              <span class="notif-date">{{ n.date }}</span>
            </div>
          </div>
        </div>
        <p v-else class="empty-state">لا توجد إشعارات</p>
      </div>
    </div>
  `
};
