const SettingsPage = {
  data() {
    return {
      activeSection: null,
      isDark: document.documentElement.getAttribute('data-theme') === 'dark',
      selectedColor: localStorage.getItem('app-color') || 'default',
      profile: {
        name: 'أحمد الجبوري',
        email: 'ahmed@example.com',
        phone: '+964 770 123 4567',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAw4a4AH6wj8hkAYYHhgQ-DVzu086NDQ2EAmxpgzRVMYwxNa6rsQEpyTLNBct0WEgXIVsHa2z9JxyBxMg3RJ6yd7zHdte6CdXTuZow8OYekvty6g6ZVcpBF-NcHkEkCmivGLg8crVOcnfCurgkh6_uPMsvjmJnSZP-jUKlgTOLjHroHP12_LJsuDACIrB0LQKKhtf7K1zByfdl0K_lONQ961mWhMdd88lMUqRpodnan0ktG0gp6WebTfhG6cSiSwOs6-C2Oxw2whTCw'
      },
      subscription: {
        plan: 'المميز',
        status: 'نشط',
        expires: '2026-12-31',
        features: ['جميع المواد', 'اختبارات غير محدودة', 'دعم فني 24/7', 'محاضرات مسجلة']
      },
      competitions: [
        { name: 'مسابقة الرياضيات', date: '2026-07-15', status: 'قادمة', prize: 'جائزة 500$' },
        { name: 'مسابقة العلوم', date: '2026-08-01', status: 'قادمة', prize: 'جائزة 300$' },
        { name: 'مسابقة اللغة العربية', date: '2026-06-30', status: 'مكتملة', prize: 'شهادة تقدير' }
      ],
      supportItems: [
        { q: 'كيف يمكنني تغيير كلمة المرور؟', a: 'يمكنك تغيير كلمة المرور من الملف الشخصي.' },
        { q: 'كيف أتواصل مع الدعم الفني؟', a: 'يمكنك التواصل عبر البريد الإلكتروني أو الواتساب.' },
        { q: 'هل يمكنني استرداد المبلغ؟', a: 'نعم، خلال 14 يوماً من الاشتراك.' }
      ],
      openSupport: null,
      themes: [
        { id: 'default', label: 'أساسي', swatch: '#1e5ba3' },
        { id: 'pink', label: 'وردي', swatch: '#d63384' },
        { id: 'purple', label: 'بنفسجي', swatch: '#7c3aed' },
        { id: 'super', label: 'سوبر', swatch: '#6366f1' },
        { id: 'ocean', label: 'أوقيانوسي', swatch: '#0d9488' }
      ]
    };
  },
  methods: {
    toggleSection(section) {
      this.activeSection = this.activeSection === section ? null : section;
    },
    toggleTheme() {
      this.isDark = !this.isDark;
      document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
      localStorage.setItem('app-theme', this.isDark ? 'dark' : 'light');
    },
    setColorTheme(color) {
      this.selectedColor = color;
      document.documentElement.setAttribute('data-color', color);
      localStorage.setItem('app-color', color);
    },
    toggleSupport(index) {
      this.openSupport = this.openSupport === index ? null : index;
    }
  },
  template: `
    <section class="settings-page">
      <div class="settings-header">
        <h2>الإعدادات</h2>
        <p>إدارة حسابك وتفضيلاتك</p>
      </div>

      <div class="settings-section" @click="toggleSection('profile')">
        <div class="settings-section-header">
          <div class="settings-section-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div class="settings-section-info">
            <h3>الملف الشخصي</h3>
            <p>الاسم، البريد، رقم الهاتف</p>
          </div>
          <svg class="settings-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :style="{ transform: activeSection === 'profile' ? 'rotate(-90deg)' : 'rotate(0)' }"><polyline points="15 18 9 12 15 6"/></svg>
        </div>
        <div v-if="activeSection === 'profile'" class="settings-section-body">
          <div class="profile-card">
            <img :src="profile.avatar" alt="avatar" class="profile-avatar"/>
            <div class="profile-fields">
              <div class="pf-row"><label>الاسم</label><span>{{ profile.name }}</span></div>
              <div class="pf-row"><label>البريد</label><span>{{ profile.email }}</span></div>
              <div class="pf-row"><label>الهاتف</label><span>{{ profile.phone }}</span></div>
            </div>
            <button class="settings-action-btn">تعديل الملف الشخصي</button>
          </div>
        </div>
      </div>

      <div class="settings-section" @click="toggleSection('subscription')">
        <div class="settings-section-header">
          <div class="settings-section-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </div>
          <div class="settings-section-info">
            <h3>الاشتراك</h3>
            <p>الخطة الحالية: {{ subscription.plan }}</p>
          </div>
          <span class="status-badge active">{{ subscription.status }}</span>
          <svg class="settings-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :style="{ transform: activeSection === 'subscription' ? 'rotate(-90deg)' : 'rotate(0)' }"><polyline points="15 18 9 12 15 6"/></svg>
        </div>
        <div v-if="activeSection === 'subscription'" class="settings-section-body">
          <div class="sub-card">
            <div class="sub-plan-name">{{ subscription.plan }}</div>
            <div class="sub-expiry">تاريخ الانتهاء: {{ subscription.expires }}</div>
            <div class="sub-features">
              <div v-for="f in subscription.features" :key="f" class="sub-feature">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{{ f }}</span>
              </div>
            </div>
            <button class="settings-action-btn primary">ترقية الاشتراك</button>
          </div>
        </div>
      </div>

      <div class="settings-section" @click="toggleSection('competitions')">
        <div class="settings-section-header">
          <div class="settings-section-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5C7 4 8 6 8 6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5C17 4 16 6 16 6"/><path d="M4 22h16"/><path d="M10 22V9"/><path d="M14 22V9"/><path d="M12 4a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>
          </div>
          <div class="settings-section-info">
            <h3>المسابقات</h3>
            <p>المسابقات المتاحة والقادمة</p>
          </div>
          <svg class="settings-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :style="{ transform: activeSection === 'competitions' ? 'rotate(-90deg)' : 'rotate(0)' }"><polyline points="15 18 9 12 15 6"/></svg>
        </div>
        <div v-if="activeSection === 'competitions'" class="settings-section-body">
          <div v-for="c in competitions" :key="c.name" class="comp-card">
            <div class="comp-top">
              <h4>{{ c.name }}</h4>
              <span class="comp-status" :class="c.status === 'قادمة' ? 'comp-upcoming' : 'comp-done'">{{ c.status }}</span>
            </div>
            <div class="comp-bottom">
              <span>{{ c.date }}</span>
              <span>{{ c.prize }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-section" @click="toggleSection('support')">
        <div class="settings-section-header">
          <div class="settings-section-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div class="settings-section-info">
            <h3>الدعم الفني</h3>
            <p>مساعدة وتواصل</p>
          </div>
          <svg class="settings-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :style="{ transform: activeSection === 'support' ? 'rotate(-90deg)' : 'rotate(0)' }"><polyline points="15 18 9 12 15 6"/></svg>
        </div>
        <div v-if="activeSection === 'support'" class="settings-section-body">
          <div class="support-contact">
            <div class="support-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>support@elite-platform.com</span>
            </div>
            <div class="support-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+964 770 123 4567</span>
            </div>
          </div>
          <div class="support-faq">
            <div v-for="(item, index) in supportItems" :key="index" class="faq-item" @click.stop="toggleSupport(index)">
              <div class="faq-q">
                <span>{{ item.q }}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :style="{ transform: openSupport === index ? 'rotate(180deg)' : 'rotate(0)' }"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              <div v-if="openSupport === index" class="faq-a">{{ item.a }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <div class="settings-section-header" @click="toggleSection('themes')">
          <div class="settings-section-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          </div>
          <div class="settings-section-info">
            <h3>الأنماط والتصميم</h3>
            <p>الوضع الفاتح / الداكن والألوان</p>
          </div>
          <svg class="settings-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :style="{ transform: activeSection === 'themes' ? 'rotate(-90deg)' : 'rotate(0)' }"><polyline points="15 18 9 12 15 6"/></svg>
        </div>
        <div v-if="activeSection === 'themes'" class="settings-section-body">
          <!-- الوضع الفاتح/داكن -->
          <div class="theme-toggle-card" @click.stop="toggleTheme" style="margin-bottom:1rem">
            <div class="theme-toggle-info">
              <svg width="20" height="20" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" v-if="isDark" fill="none"/>
                <g v-else fill="none">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </g>
              </svg>
              <span>{{ isDark ? 'الوضع الداكن' : 'الوضع الفاتح' }}</span>
            </div>
            <div class="toggle-switch" :class="isDark ? 'toggle-on' : ''">
              <div class="toggle-knob"></div>
            </div>
          </div>
          <!-- منتقي الألوان -->
          <div style="font-size:0.78rem;font-weight:700;color:var(--text-primary);margin-bottom:0.5rem">السمة اللونية</div>
          <div class="theme-picker">
            <div class="theme-picker-item" v-for="t in themes" :key="t.id" @click.stop="setColorTheme(t.id)">
              <div class="theme-option" :class="selectedColor === t.id ? 'theme-active' : ''" :style="{ background: t.swatch }"></div>
              <span class="theme-label">{{ t.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
};
