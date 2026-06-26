const MyExamsPage = {
  data() {
    return {
      examHistory: [],
      selectedExam: null
    };
  },
  computed: {
    stats() {
      const h = this.examHistory;
      if (!h.length) return null;
      return {
        total: h.length,
        avgScore: Math.round(h.reduce((s, e) => s + e.score, 0) / h.length),
        bestScore: Math.max(...h.map(e => e.score)),
        passed: h.filter(e => e.score >= 60).length,
        failed: h.filter(e => e.score < 60).length
      };
    }
  },
  mounted() {
    this.loadHistory();
  },
  methods: {
    loadHistory() {
      this.examHistory = JSON.parse(localStorage.getItem('examHistory') || '[]');
    },
    viewExam(exam) {
      this.selectedExam = exam;
    },
    backToList() {
      this.selectedExam = null;
    },
    clearHistory() {
      if (confirm('هل أنت متأكد من حذف جميع الاختبارات؟')) {
        localStorage.removeItem('examHistory');
        this.examHistory = [];
        this.selectedExam = null;
      }
    },
    getLevel(score) {
      if (score >= 90) return { label: 'ممتاز', color: '#15803d', icon: '🏆' };
      if (score >= 80) return { label: 'جيد جداً', color: '#2563eb', icon: '🌟' };
      if (score >= 70) return { label: 'جيد', color: '#7c3aed', icon: '👍' };
      if (score >= 60) return { label: 'مقبول', color: '#f59e0b', icon: '📌' };
      return { label: 'يحتاج تحسين', color: '#dc2626', icon: '💪' };
    },
    formatDate(ts) {
      return new Intl.DateTimeFormat('ar-IQ', {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      }).format(new Date(ts));
    },
    formatDuration(ts1, ts2) {
      const diff = Math.round((ts2 - ts1) / 1000);
      const m = Math.floor(diff / 60);
      const s = diff % 60;
      return `${m}:${s.toString().padStart(2, '0')} د`;
    }
  },
  template: `
    <section class="myexams-page">
      <div v-if="!selectedExam" class="myexams-list-view">
        <div class="myexams-header">
          <h2>اختباراتي</h2>
          <p>سجل الاختبارات التي قمت بها</p>
        </div>

        <div v-if="!examHistory.length" class="myexams-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="1"/>
            <path d="M9 14l2 2 4-4"/>
          </svg>
          <h3>لا توجد اختبارات بعد</h3>
          <p>قم بحل اختبار أولاً ليظهر هنا</p>
        </div>

        <div v-if="stats" class="myexams-stats">
          <div class="stat-card stat-total">
            <strong>{{ stats.total }}</strong>
            <span>إجمالي</span>
          </div>
          <div class="stat-card stat-avg">
            <strong>{{ stats.avgScore }}%</strong>
            <span>المتوسط</span>
          </div>
          <div class="stat-card stat-best">
            <strong>{{ stats.bestScore }}%</strong>
            <span>الأفضل</span>
          </div>
          <div class="stat-card stat-passed">
            <strong>{{ stats.passed }}</strong>
            <span>نجاح</span>
          </div>
        </div>

        <div v-if="stats" class="myexams-level-bar">
          <div class="level-bar-label">
            <span>تقييم المستوى العام</span>
            <span class="level-tag" :style="{ color: getLevel(stats.avgScore).color }">{{ getLevel(stats.avgScore).label }} {{ getLevel(stats.avgScore).icon }}</span>
          </div>
          <div class="level-bar-track">
            <div class="level-bar-fill" :style="{ width: stats.avgScore + '%', background: getLevel(stats.avgScore).color }"></div>
          </div>
        </div>

        <div v-if="examHistory.length" class="myexams-list">
          <div v-for="exam in examHistory" :key="exam.id" class="myexam-card" @click="viewExam(exam)">
            <div class="myexam-card-top">
              <div class="myexam-score-ring" :style="{ background: 'conic-gradient(' + getLevel(exam.score).color + ' 0 ' + exam.score + '%, var(--border-color) 0 100%)' }">
                <div class="myexam-score-inner">
                  <strong>{{ exam.score }}%</strong>
                </div>
              </div>
              <div class="myexam-info">
                <h4>{{ exam.subjectName }}</h4>
                <p class="myexam-chapter">{{ exam.chapterName }}</p>
                <div class="myexam-meta">
                  <span>{{ exam.correctCount }}/{{ exam.totalQuestions }} صح</span>
                  <span class="meta-dot">•</span>
                  <span>{{ formatDate(exam.date) }}</span>
                </div>
              </div>
              <svg class="myexam-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </div>
            <div class="myexam-card-level">
              <span class="level-badge" :style="{ background: getLevel(exam.score).color }">{{ getLevel(exam.score).label }}</span>
              <span v-if="exam.timeExpired" class="timeout-badge">انتهى الوقت</span>
            </div>
          </div>
        </div>

        <button v-if="examHistory.length" class="clear-btn" @click="clearHistory">حذف السجل</button>
      </div>

      <div v-else class="myexams-detail-view">
        <button class="back-btn" @click="backToList">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          العودة
        </button>

        <div class="detail-summary-card">
          <div class="detail-score-section">
            <div class="detail-score-ring" :style="{ background: 'conic-gradient(' + getLevel(selectedExam.score).color + ' 0 ' + selectedExam.score + '%, var(--border-color) 0 100%)' }">
              <div class="detail-score-inner">
                <strong>{{ selectedExam.score }}%</strong>
              </div>
            </div>
            <div class="detail-level-label" :style="{ color: getLevel(selectedExam.score).color }">{{ getLevel(selectedExam.score).label }} {{ getLevel(selectedExam.score).icon }}</div>
          </div>
          <div class="detail-info">
            <h3>{{ selectedExam.subjectName }}</h3>
            <p class="detail-chapter">{{ selectedExam.chapterName }}</p>
            <div class="detail-stats-row">
              <div class="detail-stat-item">
                <strong>{{ selectedExam.correctCount }}</strong>
                <span>إجابات صحيحة</span>
              </div>
              <div class="detail-stat-divider"></div>
              <div class="detail-stat-item">
                <strong>{{ selectedExam.totalQuestions - selectedExam.correctCount }}</strong>
                <span>أخطاء</span>
              </div>
              <div class="detail-stat-divider"></div>
              <div class="detail-stat-item">
                <strong>{{ selectedExam.totalQuestions }}</strong>
                <span>إجمالي</span>
              </div>
            </div>
            <p class="detail-date">{{ formatDate(selectedExam.date) }}</p>
          </div>
        </div>

        <div class="detail-level-eval">
          <h4>تقييم المستوى</h4>
          <div class="eval-grid">
            <div class="eval-item" v-for="level in [
              { min: 90, label: 'ممتاز', color: '#15803d', desc: 'مستوى متقدم جداً' },
              { min: 80, label: 'جيد جداً', color: '#2563eb', desc: 'مستوى متقدم' },
              { min: 70, label: 'جيد', color: '#7c3aed', desc: 'مستوى جيد' },
              { min: 60, label: 'مقبول', color: '#f59e0b', desc: 'مستوى متوسط' },
              { min: 0, label: 'يحتاج تحسين', color: '#dc2626', desc: 'يحتاج مذاكرة أكثر' }
            ]" :key="level.min" class="eval-item-inner" :class="selectedExam.score >= level.min ? 'eval-active' : ''" :style="selectedExam.score >= level.min ? { borderColor: level.color, background: level.color + '12' } : {}">
              <span class="eval-dot" :style="{ background: level.color }"></span>
              <strong :style="{ color: selectedExam.score >= level.min ? level.color : undefined }">{{ level.label }}</strong>
              <small>{{ level.desc }}</small>
            </div>
          </div>
        </div>

        <div class="detail-review">
          <h4>مراجعة الإجابات</h4>
          <div v-for="(item, index) in selectedExam.review" :key="index" class="detail-review-item" :class="item.isCorrect ? 'detail-review-correct' : 'detail-review-wrong'">
            <div class="review-q-top">
              <span class="review-q-num">{{ index + 1 }}</span>
              <span class="review-q-status-icon" :class="item.isCorrect ? 'rq-correct' : 'rq-wrong'">
                <svg v-if="item.isCorrect" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </span>
              <p>{{ item.text }}</p>
            </div>
            <div class="review-q-answers">
              <span class="rqa-label">إجابتك:</span>
              <span class="rqa-value" :class="item.isCorrect ? 'rqa-correct' : 'rqa-wrong'">{{ item.chosenAnswer }}</span>
            </div>
            <div v-if="!item.isCorrect" class="review-q-answers">
              <span class="rqa-label">الصحيحة:</span>
              <span class="rqa-value rqa-correct">{{ item.correct }}</span>
            </div>
            <p v-if="!item.isCorrect" class="review-q-explain">{{ item.explanation }}</p>
          </div>
        </div>
      </div>
    </section>
  `
};
