const MainContent = {
  data() {
    return {
      slides: [
        {
          title: 'مستجدات المنصة',
          text: 'اكتشف أحدث الدورات والفعاليات التعليمية',
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80'
        },
        {
          title: 'دورة الفيزياء',
          text: 'شروحات مفصلة وأسئلة تدريبية لكل المستويات',
          image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80'
        },
        {
          title: 'ورش العمل',
          text: 'جلسات مباشرة مع أساتذة مميزين',
          image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80'
        }
      ],
      teachers: [
        {
          name: 'الأستاذ أحمد الجبوري',
          description: 'مدرس مادة الفيزياء للصف السادس العلمي',
          students: '12k+ طالب',
          rating: '4.9',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzO6YnZeW_WMkN5qG9KRe_3YXdBvi0lUWCHYwtAXTaHHEJ9GB7-NansHfYIMRgolPNmdL5W8yWHatS7tjQw83TigVegxj17E0zxX4ou5Nmim1oECzJzN_XCto3f-35GLpz5CqxEOsfVeENdCo_FOiCxhW_1T_Rj1co0ANOAex3NWycxabj8J_CCxILlYygfqgL55QoW-PCM_igsqIcYTigRK91G0JoMee7ACL2jQCLv683eTdQ3tOkTWfrKEGm-F6pgHK6mmrTm2kB'
        },
        {
          name: 'الأستاذة سارة محمد',
          description: 'مدرسة مادة الكيمياء للصف الثاني الثانوي',
          students: '8k+ طالب',
          rating: '4.8',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80'
        },
        {
          name: 'الأستاذ زيد الكبيسي',
          description: 'مدرس مادة الرياضيات للصف الخامس المتوسط',
          students: '10k+ طالب',
          rating: '4.7',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
        }
      ],
      activeSlide: 0,
      activeTeacher: 0,
      slideInterval: null,
      teacherInterval: null
    };
  },
  computed: {
    isStudent() { return AppStore.userRole === 'student'; },
    stageSubjects() { return AppStore.getSubjects(AppStore.selectedStage); },
    stageLabel() { return AppStore.getStageLabel(AppStore.selectedStage); },
    examExists() { return (id) => !!AppStore.getExam(id); }
  },
  methods: {
    openSubject(subj) {
      AppStore.viewSubject(subj);
    },
    subjectIcon(name) {
      const icons = {
        'اللغة العربية': '&#1571;&#1569;',
        'الرياضيات': '&#1585;&#1610;&#1575;&#1590;',
        'الإنكليزي': 'EN',
        'العلوم': '&#1593;&#1604;&#1608;&#1605;',
        'الاجتماعيات': '&#1575;&#1580;&#1578;&#1605;&#1575;&#1593;',
        'الفيزياء': '&#1601;&#1610;&#1586;&#1610;&#1575;&#1569;',
        'الكيمياء': '&#1603;&#1610;&#1605;&#1610;&#1575;&#1569;',
        'الأحياء': '&#1571;&#1581;&#1610;&#1575;&#1569;',
        'التاريخ': '&#1578;&#1575;&#1585;&#1610;&#1582;',
        'الجغرافية': '&#1580;&#1594;&#1585;&#1575;&#1601;&#1610;&#1575;',
        'الفرنسي': 'FR',
        'الحاسوب': '&#1581;&#1575;&#1587;&#1608;&#1576;',
        'الاختصاص': '&#1575;&#1582;&#1578;&#1589;&#1575;&#1589;'
      };
      return icons[name] || name.substring(0, 2);
    }
  },
  mounted() {
    this.slideInterval = setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % this.slides.length;
    }, 3000);
    this.teacherInterval = setInterval(() => {
      this.activeTeacher = (this.activeTeacher + 1) % this.teachers.length;
    }, 3000);
  },
  beforeUnmount() {
    if (this.slideInterval) clearInterval(this.slideInterval);
    if (this.teacherInterval) clearInterval(this.teacherInterval);
  },
  template: `
    <div class="main-content">
      <section class="quick-actions">
        <div class="slider-wrapper">
          <img :src="slides[activeSlide].image" :alt="slides[activeSlide].title" class="slider-image" />
          <div class="slider-overlay">
            <h3 class="slider-title">{{ slides[activeSlide].title }}</h3>
            <p class="slider-desc">{{ slides[activeSlide].text }}</p>
          </div>
          <div class="slider-dots">
            <span v-for="(slide, index) in slides" :key="index" :class="['slider-dot', { active: index === activeSlide }]" />
          </div>
        </div>
      </section>

      <section class="news-section">
        <div class="news-ticker">
          <span class="news-label">أخبار</span>
          <div class="news-track">
            <span>انطلاق دورة جديدة في الفيزياء •</span>
            <span>مباراة تعليمية جديدة للطلاب •</span>
            <span>تحديث جديد في المنصة</span>
          </div>
        </div>
      </section>

      <section v-if="isStudent" class="subjects-section">
        <div class="subjects-header">
          <h2>موادي الدراسية</h2>
          <span class="stage-badge">{{ stageLabel }}</span>
        </div>
        <div class="home-subjects-grid">
          <div v-for="subj in stageSubjects" :key="subj.id" class="home-subject-card" @click="openSubject(subj)">
            <div class="hs-icon">
              <span v-html="subjectIcon(subj.name)" style="font-size:1.2rem;font-weight:700"></span>
            </div>
            <div class="hs-info">
              <h4>{{ subj.name }}</h4>
              <p>{{ subj.chapters?.length || 0 }} فصول</p>
            </div>
            <div class="hs-arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </div>
          </div>
        </div>
      </section>

      <section class="featured-section">
        <h2 class="section-title">الأستاذ المتميز</h2>
        <div class="featured-card">
          <img class="featured-img" :src="teachers[activeTeacher].image" :alt="teachers[activeTeacher].name"/>
          <div class="featured-info">
            <h3 class="featured-name">{{ teachers[activeTeacher].name }}</h3>
            <p class="featured-desc">{{ teachers[activeTeacher].description }}</p>
            <div class="featured-meta">
              <span class="featured-students">{{ teachers[activeTeacher].students }}</span>
              <div class="featured-rating">
                <span>{{ teachers[activeTeacher].rating }}</span>
                <svg viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="course-card">
        <div class="course-inner">
          <div class="course-body">
            <div class="top-students-header">
              <h3 class="top-students-title">الطالب المتفوق</h3>
              <p class="top-students-subtitle">أعلى طالب حصل على درجات كاملة ومميز وفاز بالمسابقات</p>
            </div>
            <div class="top-students-list">
              <div class="top-student gold">
                <div class="medal">🥇</div>
                <div>
                  <p class="student-name">أحمد الساعدي</p>
                  <p class="student-detail">المركز الأول · 100/100</p>
                </div>
              </div>
              <div class="top-student silver">
                <div class="medal">🥈</div>
                <div>
                  <p class="student-name">سارة الهاشمي</p>
                  <p class="student-detail">المركز الثاني · 98/100</p>
                </div>
              </div>
              <div class="top-student bronze">
                <div class="medal">🥉</div>
                <div>
                  <p class="student-name">زيد النعيمي</p>
                  <p class="student-detail">المركز الثالث · 96/100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="upcoming-section">
        <div class="upcoming-header">
          <h2>جدول المحاضرات القادمة</h2>
          <button class="view-all-btn">رؤية الجميع</button>
        </div>
        <div class="upcoming-item">
          <div class="upcoming-item-left">
            <img class="upcoming-teacher-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAOUrtB5iHXdOHAuRGzmD2Mea1CVyUnFRWfpmERW6zI9CJn9OEAUaLap91n0vjhjkRIle6KShsMxQVM8jDigf2q8a3fVMrseaA8R-vPaHVKjMTKEWPsebCfm14AmVUIxnavV3Q2s-UKgapl05H3msP1txuRvtenjd-h5hZUxQ3sCov17rMq9vlZ3wh5cRyL3KexYDKL4VUuyhcie7wrGorHfDlSkEbWoq9VD6kZn2rGZpBWrin2OY0Uu3NPnBijUDraCJxxPIfwNVv" alt="Teacher"/>
            <div>
              <p class="upcoming-teacher-name">خالد علي (المنهج الكامل مدرس)</p>
              <p class="upcoming-time">اليوم 10:00 - 11:00</p>
            </div>
          </div>
          <div class="upcoming-more">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
          </div>
        </div>
      </section>
    </div>
  `
};
