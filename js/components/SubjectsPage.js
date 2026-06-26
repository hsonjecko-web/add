const SubjectsPage = {
  data() {
    return {
      subjects: [
        {
          name: 'الرياضيات',
          description: 'المعادلات، التفاضل، والهندسة',
          tag: 'تحليل وحساب',
          icon: '∑',
          accent: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
          image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80'
        },
        {
          name: 'العلوم',
          description: 'الفيزياء، الكيمياء، والأحياء',
          tag: 'تجارب ومفاهيم',
          icon: '⚗',
          accent: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
          image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=80'
        },
        {
          name: 'اللغة العربية',
          description: 'قواعد، أدب، وبلاغة',
          tag: 'إبداع وتعبير',
          icon: '✍',
          accent: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80'
        },
        {
          name: 'الحاسوب',
          description: 'برمجة، شبكات، وتقنية',
          tag: 'تطوير وتكنولوجيا',
          icon: '⌘',
          accent: 'linear-gradient(135deg, #ea580c 0%, #fb923c 100%)',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'
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
          <img class="subject-image" :src="subject.image" :alt="subject.name" />
          <div class="subject-content">
            <span class="subject-tag" :style="{ background: subject.accent }">{{ subject.tag }}</span>
            <h3>{{ subject.name }}</h3>
            <p>{{ subject.description }}</p>
          </div>
        </article>
      </div>
    </section>
  `
};
