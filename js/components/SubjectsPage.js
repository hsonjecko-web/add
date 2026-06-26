const SubjectsPage = {
  data() {
    return {
      subjects: [
        {
          name: 'الرياضيات',
          description: 'المعادلات، التفاضل، والهندسة',
          tag: 'تحليل وحساب',
          icon: '∑',
          accent: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'
        },
        {
          name: 'العلوم',
          description: 'الفيزياء، الكيمياء، والأحياء',
          tag: 'تجارب ومفاهيم',
          icon: '⚗',
          accent: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)'
        },
        {
          name: 'اللغة العربية',
          description: 'قواعد، أدب، وبلاغة',
          tag: 'إبداع وتعبير',
          icon: '✍',
          accent: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)'
        },
        {
          name: 'الحاسوب',
          description: 'برمجة، شبكات، وتقنية',
          tag: 'تطوير وتكنولوجيا',
          icon: '⌘',
          accent: 'linear-gradient(135deg, #ea580c 0%, #fb923c 100%)'
        }
      ]
    };
  },
  template: `
    <section class="subjects-page">
      <div class="subjects-intro">
        <h2>المواد الدراسية</h2>
        <p>استكشف المواد الأساسية بتصميم احترافي ومميز</p>
      </div>

      <div class="subjects-grid">
        <article v-for="subject in subjects" :key="subject.name" class="subject-card">
          <div class="subject-icon-wrap" :style="{ background: subject.accent }">
            <span class="subject-icon">{{ subject.icon }}</span>
          </div>
          <div class="subject-content">
            <h3>{{ subject.name }}</h3>
            <p>{{ subject.description }}</p>
            <span class="subject-tag">{{ subject.tag }}</span>
          </div>
        </article>
      </div>
    </section>
  `
};
