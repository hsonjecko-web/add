const SubjectsPage = {
  data() {
    return {
      selectedSubjectId: null
    };
  },
  computed: {
    isStudent() {
      return AppStore.userRole === 'student';
    },
    stageLabel() {
      return AppStore.getStageLabel(AppStore.selectedStage);
    },
    subjects() {
      if (this.isStudent) {
        return AppStore.getSubjects(AppStore.selectedStage).map(s => ({
          ...s,
          accent: 'linear-gradient(135deg, var(--brand-blue), var(--brand-secondary))'
        }));
      }
      return [];
    },
    selectedSubject() {
      if (!this.selectedSubjectId) return null;
      return this.subjects.find(s => s.id === this.selectedSubjectId);
    },
    chapters() {
      return this.selectedSubject ? this.selectedSubject.chapters : [];
    }
  },
  methods: {
    selectSubject(subjectId) {
      this.selectedSubjectId = subjectId;
    },
    backToSubjects() {
      this.selectedSubjectId = null;
      AppStore.selectedChapter = null;
    },
    startExam(chapterIndex) {
      AppStore.selectedChapter = chapterIndex;
      AppStore.selectedSubject = this.selectedSubject;
      AppStore.view = 'exam';
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
    <section class="subjects-page">
      <div v-if="!selectedSubjectId" class="subjects-list-view">
        <div class="subjects-intro">
          <h2>المواد الدراسية - {{ stageLabel }}</h2>
          <p>اختر المادة لعرض فصولها الدراسية</p>
        </div>
        <div class="subjects-grid">
          <article v-for="subject in subjects" :key="subject.id" class="subject-card" :style="{ background: subject.accent }" @click="selectSubject(subject.id)">
            <div class="subject-content">
              <span class="subject-tag" :style="{ background: subject.accent }">{{ stageLabel }}</span>
              <h3>{{ subject.name }}</h3>
              <p>{{ subject.chapters?.length || 0 }} فصول دراسية</p>
              <div class="subject-stats">
                <span>{{ subject.chapters?.length || 0 }} فصل</span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div v-else class="chapters-view">
        <button class="back-btn" @click="backToSubjects">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          العودة للمواد
        </button>

        <div class="subjects-intro">
          <h2>{{ selectedSubject.name }}</h2>
          <p>اختر الفصل لبدء الاختبار</p>
        </div>

        <div class="chapter-selector-grid">
          <button
            v-for="(chapter, index) in chapters"
            :key="index"
            class="chapter-choice-card"
            :style="{ background: getChapterGradient(index) }"
            @click="startExam(index)"
          >
            <span class="chapter-icon">{{ index + 1 }}</span>
            <span>{{ chapter }}</span>
          </button>
        </div>
      </div>
    </section>
  `
};
