const AppHeader = {
  data() {
    return {
      isDark: false
    };
  },
  methods: {
    toggleDark() {
      this.isDark = !this.isDark;
      document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
    }
  },
  template: `
    <header class="app-header">
      <div class="header-top">
        <!-- يمين الهيدر: اسم المنصة -->
        <div class="header-right">
          <h1 class="app-title">منصة عراق تكنو</h1>
          <p class="app-subtitle">التعليمية</p>
        </div>

        <!-- يسار الهيدر: زر الاشعارات + زر تغيير المود -->
        <div class="header-left">
          <div class="notification-btn">
            <svg class="notification-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
            <span class="notification-badge">3</span>
          </div>

          <button class="dark-toggle" @click="toggleDark" aria-label="تغيير المود">
            <svg v-if="!isDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
            <svg v-else fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </svg>
          </button>
        </div>
      </div>
      
    </header>
  `
};
