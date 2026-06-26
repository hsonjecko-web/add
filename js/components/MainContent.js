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
  mounted() {
    this.slideInterval = setInterval(() => {
      this.activeSlide = (this.activeSlide + 1) % this.slides.length;
    }, 3000);

    this.teacherInterval = setInterval(() => {
      this.activeTeacher = (this.activeTeacher + 1) % this.teachers.length;
    }, 3000);
  },
  beforeUnmount() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.teacherInterval) {
      clearInterval(this.teacherInterval);
    }
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
            <div class="course-info">
              <div class="course-details">
                <h3 class="course-title">"فيزياء - السادس العلمي (المنهج الكامل)"</h3>
                <p class="course-teacher">الأستاذ أحمد الجبوري</p>
                <div class="course-stats">
                  <span class="course-stat-item">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                    65 دروس
                  </span>
                  <span class="course-stat-item course-stat-divider">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    </svg>
                    52 ساعة
                  </span>
                </div>
              </div>
              <div class="course-thumb">
                <img class="course-thumb-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADIynwl6kkSGa6HpdmGJfH19ATzceEXHxxXFcyby26vRcMqvCCK1Oe3PtdC7goAPBCNj4GQfmuuZBR7e7IzbhF4UrN8vvR1IuZDXrrBo3LE3Fh_FfudO5AuxOOWsoQV4JgHQ3T4J1s-fzXc-OygbFpgPMsQD0SBM5RwTGOi1cQcbNS6hjsfy99qubI5GRY_g12xH6btYaQNERDa0cVKCY7snXFHdK6IoU9bUQbE4AL8ynlSgR5B5uCxnrLLSPe8zcxOpkEerftdcA2" alt="Course Thumbnail"/>
                <div class="course-thumb-rating">
                  <svg viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  4.9
                </div>
              </div>
            </div>
            <div class="course-footer">
              <div class="course-footer-item">
                <p class="course-footer-value">6,432</p>
                <div class="course-footer-label">
                  <span>إعجاب</span>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
                </div>
              </div>
              <div class="course-footer-item">
                <p class="course-footer-value">25.1k</p>
                <div class="course-footer-label">
                  <span>مشاهدة</span>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
                </div>
              </div>
              <div class="course-footer-item">
                <p class="course-footer-value">410</p>
                <div class="course-footer-label">
                  <span>أسئلة تم الإجابة عليها</span>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
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
