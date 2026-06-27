const AppHeader = {
  data() {
    return {
      isDark: (document.documentElement.getAttribute('data-theme') || localStorage.getItem('app-theme') || 'light') === 'dark'
    };
  },
  computed: {
    user() {
      return AppStore.currentUser;
    },
    isLoggedIn() {
      return AppStore.isLoggedIn;
    },
    notificationCount() {
      if (!this.isLoggedIn || !this.user) return 0;
      return AppStore.getStudentNotifications(this.user.id).length;
    }
  },
  methods: {
    toggleDark() {
      this.isDark = !this.isDark;
      document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
      localStorage.setItem('app-theme', this.isDark ? 'dark' : 'light');
    },
    logout() {
      AppStore.logout();
    },
    goHome() {
      if (this.isLoggedIn) {
        AppStore.view = 'home';
      }
    },
    roleLabel() {
      const labels = { student: 'طالب', parent: 'ولي أمر', teacher: 'مدرس', owner: 'مدير المنصة' };
      return labels[this.user?.role] || '';
    }
  },
  template: `
    <header class="app-header">
      <div class="header-top">
        <div class="header-right">
          <button class="header-icon-btn" aria-label="التعليم" @click="goHome">
            <svg class="education-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14l9-5-9-5-9 5 9 5z"/>
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
              <path d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill="none" stroke="currentColor"/>
            </svg>
          </button>
        </div>
        <div class="header-center">
          <div class="text-center">
            <h1 class="app-title">منصة عراق تكنو</h1>
            <p class="app-subtitle">التعليمية</p>
          </div>
        </div>
        <div class="header-left">
          <button class="notification-btn" aria-label="الإشعارات">
            <svg class="notification-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
          </button>
          <button class="dark-toggle" @click="toggleDark" aria-label="تغيير المظهر">
            <svg v-if="isDark" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
            <svg v-else fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          </button>
          <template v-if="isLoggedIn">
            <div class="header-user-info" @click="logout" title="تسجيل خروج">
              <span class="header-user-name">{{ user.name }}</span>
              <span class="header-user-role">{{ roleLabel() }}</span>
            </div>
          </template>
        </div>
      </div>
    </header>
  `
};
