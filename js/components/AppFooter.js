const AppFooter = {
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return AppStore.isLoggedIn;
    },
    userRole() {
      return AppStore.userRole;
    },
    currentView() {
      return AppStore.view;
    }
  },
  methods: {
    goHome() {
      if (this.userRole === 'student') AppStore.view = 'studentDash';
      else if (this.userRole === 'parent') AppStore.view = 'parentDash';
      else if (this.userRole === 'teacher') AppStore.view = 'teacherDash';
      else if (this.userRole === 'owner') AppStore.view = 'ownerDash';
    },
    goSubjects() {
      AppStore.view = 'subjects';
    },
    goExam() {
      AppStore.view = 'exam';
    },
    goMyExams() {
      AppStore.view = 'myexams';
    },
    goSettings() {
      AppStore.view = 'settings';
    },
    roleDashView() {
      if (this.userRole === 'student') return 'studentDash';
      if (this.userRole === 'parent') return 'parentDash';
      if (this.userRole === 'teacher') return 'teacherDash';
      if (this.userRole === 'owner') return 'ownerDash';
      return 'home';
    },
    isActive(viewName) {
      return this.currentView === viewName;
    }
  },
  template: `
    <nav class="bottom-nav" v-if="isLoggedIn">
      <button class="nav-item nav-home" :class="isActive(roleDashView()) ? 'nav-active' : 'nav-inactive'" @click="goHome">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 10.5 12 4l8 6.5"/>
          <path d="M6.5 9.8V20h11V9.8"/>
          <path d="M9.5 20v-4.5h5V20"/>
        </svg>
        <span>الرئيسية</span>
      </button>
      <button v-if="userRole === 'student'" class="nav-item nav-subjects" :class="isActive('subjects') ? 'nav-active' : 'nav-inactive'" @click="goSubjects">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 4h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/>
          <path d="M15 7h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2"/>
          <path d="M8 8h4"/>
          <path d="M8 12h4"/>
        </svg>
        <span>المواد</span>
      </button>
      <button v-if="userRole === 'student'" class="nav-item nav-questions" :class="isActive('exam') ? 'nav-active' : 'nav-inactive'" @click="goExam">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 5.5a3.5 3.5 0 1 1 0 7"/>
          <path d="M8 13.5v1.5"/>
          <path d="M18 5v10a2 2 0 0 1-2 2H9l-3 3V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2Z"/>
        </svg>
        <span>اختبار</span>
      </button>
      <button v-if="userRole === 'student'" class="nav-item nav-myexams" :class="isActive('myexams') ? 'nav-active' : 'nav-inactive'" @click="goMyExams">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
          <rect x="9" y="3" width="6" height="4" rx="1"/>
          <path d="M9 14l2 2 4-4"/>
        </svg>
        <span>اختباراتي</span>
      </button>
      <button class="nav-item nav-settings" :class="isActive('settings') ? 'nav-active' : 'nav-inactive'" @click="goSettings">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3.5"/>
          <path d="M19 12a7 7 0 0 0-.1-1.1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.9-1.1L14 3h-4l-.6 2.4a7 7 0 0 0-1.9 1.1l-2.4-1-2 3.4 2 1.5A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.1l-2 1.5 2 3.4 2.4-1a7 7 0 0 0 1.9 1.1L10 21h4l.6-2.4a7 7 0 0 0 1.9-1.1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1.1Z"/>
        </svg>
        <span>الإعدادات</span>
      </button>
    </nav>
  `
};
