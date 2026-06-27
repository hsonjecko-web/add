const SubjectsPage = {
  data() {
    return {};
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
          description: s.chapters?.length + ' فصول دراسية',
          tag: this.stageLabel,
          lessons: s.chapters?.length + ' فصل',
          tests: (AppStore.getExam(s.id) ? '1' : '0') + ' اختبار',
          accent: 'linear-gradient(135deg, var(--brand-blue), var(--brand-secondary))',
          image: ''
        }));
      }
      return [
        {
          name: 'الرياضيات', description: 'المعادلات، التفاضل، والهندسة', tag: 'تحليل وحساب',
          lessons: '12 فصل', tests: '8 اختبارات',
          accent: 'linear-gradient(135deg, #dbeafe 0%, #2563eb 50%, #1d4ed8 100%)',
          image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80'
        },
        {
          name: 'العلوم', description: 'الفيزياء، الكيمياء، والأحياء', tag: 'تجارب ومفاهيم',
          lessons: '10 فصول', tests: '6 اختبارات',
          accent: 'linear-gradient(135deg, #ccfbf1 0%, #14b8a6 50%, #0f766e 100%)',
          image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80'
        },
        {
          name: 'اللغة العربية', description: 'قواعد، أدب، وبلاغة', tag: 'إبداع وتعبير',
          lessons: '9 فصول', tests: '7 اختبارات',
          accent: 'linear-gradient(135deg, #ede9fe 0%, #8b5cf6 50%, #6d28d9 100%)',
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
        },
        {
          name: 'الحاسوب', description: 'برمجة، شبكات، وتقنية', tag: 'تطوير وتكنولوجيا',
          lessons: '11 فصل', tests: '9 اختبارات',
          accent: 'linear-gradient(135deg, #ffedd5 0%, #fb923c 50%, #ea580c 100%)',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'
        }
      ];
    }
  },
  methods: {
    openSubject(subj) {
      if (this.isStudent) {
        AppStore.viewSubject(subj);
      }
    }
  },
  template: `
    <section class="subjects-page">
      <div class="subjects-intro">
        <h2 v-if="isStudent">المواد الدراسية - {{ stageLabel }}</h2>
        <h2 v-else>المواد الدراسية</h2>
        <p>استكشف المواد المتاحة حسب مرحلتك الدراسية</p>
      </div>
      <div class="subjects-grid">
        <article v-for="subject in subjects" :key="subject.name" class="subject-card" :style="{ background: subject.accent }" @click="openSubject(subject)">
          <img v-if="subject.image" class="subject-image" :src="subject.image" :alt="subject.name" />
          <div class="subject-content">
            <span class="subject-tag" :style="{ background: subject.accent }">{{ subject.tag }}</span>
            <h3>{{ subject.name }}</h3>
            <p>{{ subject.description }}</p>
            <div class="subject-stats">
              <span>{{ subject.lessons }}</span>
              <span>{{ subject.tests }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  `
};
