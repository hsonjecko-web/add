const LoginPage = {
  data() {
    return {
      selectedRole: null,
      stages: AppStore.getStages(),
      selectedStudent: null,
      password: '',
      error: ''
    };
  },
  computed: {
    demoStudents() {
      return AppStore.getAllStudents();
    }
  },
  methods: {
    selectRole(role) {
      this.selectedRole = role;
      this.error = '';
      if (role === 'teacher') {
        const t = window.demoData.teacher;
        if (t) AppStore.login(t);
      } else if (role === 'owner') {
        const o = window.demoData.owner;
        if (o) AppStore.login(o);
      } else if (role === 'parent') {
        const p = window.demoData.parent;
        if (p) AppStore.login(p);
      }
    },
    loginAsStudent() {
      if (!this.selectedStudent || !this.password) {
        this.error = 'الرجاء اختيار الطالب وإدخال كلمة المرور';
        return;
      }
      const student = this.demoStudents.find(s => s.id === this.selectedStudent);
      if (student && student.password === this.password) {
        AppStore.login(student);
      } else {
        this.error = 'كلمة المرور غير صحيحة';
      }
    },
    getStageName(stageId) {
      return AppStore.getStageLabel(stageId);
    },
    goBack() {
      this.selectedRole = null;
      this.selectedStudent = null;
      this.password = '';
      this.error = '';
    }
  },
  template: `
    <div class="login-page">
      <div class="login-hero">
        <div class="login-logo">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 14l9-5-9-5-9 5 9 5z"/>
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
          </svg>
        </div>
        <h1 class="login-title">منصة عراق تكنو</h1>
        <p class="login-subtitle">اختر نوع الدخول للتجربة</p>
      </div>

      <template v-if="!selectedRole">
        <div class="login-roles">
          <div class="login-role-card" @click="selectRole('student')">
            <div class="role-icon student-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 6 3 9 0v-5"/></svg>
            </div>
            <span class="role-label">طالب</span>
            <span class="role-desc">دخول تجريبي</span>
          </div>
          <div class="login-role-card" @click="selectRole('parent')">
            <div class="role-icon parent-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
            </div>
            <span class="role-label">ولي أمر</span>
            <span class="role-desc">متابعة الأبناء</span>
          </div>
          <div class="login-role-card" @click="selectRole('teacher')">
            <div class="role-icon teacher-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><path d="M9 7h7"/><path d="M9 11h5"/></svg>
            </div>
            <span class="role-label">مدرس</span>
            <span class="role-desc">إدارة المحتوى</span>
          </div>
          <div class="login-role-card" @click="selectRole('owner')">
            <div class="role-icon owner-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            </div>
            <span class="role-label">مدير المنصة</span>
            <span class="role-desc">تحكم كامل</span>
          </div>
        </div>
        <p class="login-hint">نسخة تجريبية - جميع البيانات للعرض فقط</p>
      </template>

      <template v-else-if="selectedRole === 'student'">
        <div class="login-form">
          <button class="login-back" @click="goBack">&rarr; رجوع</button>
          <h3>اختر الطالب التجريبي</h3>
          <select v-model="selectedStudent" class="login-select">
            <option value="" disabled>اختر طالباً</option>
            <option v-for="s in demoStudents" :key="s.id" :value="s.id">{{ s.name }} - {{ getStageName(s.stage) }}</option>
          </select>
          <div v-if="selectedStudent" class="login-student-preview">
            <p>{{ demoStudents.find(s => s.id === selectedStudent)?.name }}</p>
            <p class="preview-stage">{{ getStageName(demoStudents.find(s => s.id === selectedStudent)?.stage) }}</p>
          </div>
          <input v-model="password" type="password" class="login-input" placeholder="كلمة المرور (123)" />
          <p v-if="error" class="login-error">{{ error }}</p>
          <button class="login-btn" @click="loginAsStudent">دخول</button>
        </div>
      </template>
    </div>
  `
};
