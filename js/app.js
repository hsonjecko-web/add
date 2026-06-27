const app = Vue.createApp({
  data() {
    return {};
  },
  computed: {
    store() {
      return AppStore;
    },
    currentView() {
      return this.store.view;
    },
    isLoggedIn() {
      return this.store.isLoggedIn;
    }
  },
  methods: {
    showHome() { AppStore.view = 'home'; },
    showSubjects() { AppStore.view = 'subjects'; },
    showExam() { AppStore.view = 'exam'; },
    showMyExams() { AppStore.view = 'myexams'; },
    showSettings() { AppStore.view = 'settings'; },
    goBack() {
      if (this.isLoggedIn) {
        AppStore.view = 'home';
      }
    }
  },
  template: `
    <div>
      <app-header></app-header>
      <login-page v-if="!isLoggedIn || !currentView"></login-page>
      <student-dash v-else-if="currentView === 'studentDash'"></student-dash>
      <parent-dash v-else-if="currentView === 'parentDash'"></parent-dash>
      <teacher-dash v-else-if="currentView === 'teacherDash'"></teacher-dash>
      <owner-dash v-else-if="currentView === 'ownerDash'"></owner-dash>
      <main-content v-else-if="currentView === 'home'"></main-content>
      <subjects-page v-else-if="currentView === 'subjects'"></subjects-page>
      <exam-page v-else-if="currentView === 'exam'"></exam-page>
      <my-exams-page v-else-if="currentView === 'myexams'"></my-exams-page>
      <settings-page v-else-if="currentView === 'settings'"></settings-page>
      <app-footer></app-footer>
    </div>
  `
});

app.mixin({
  computed: {
    AppStore() { return window.AppStore; },
    demoData() { return window.demoData; }
  }
});

app.component('app-header', AppHeader);
app.component('main-content', MainContent);
app.component('subjects-page', SubjectsPage);
app.component('exam-page', ExamPage);
app.component('my-exams-page', MyExamsPage);
app.component('settings-page', SettingsPage);
app.component('app-footer', AppFooter);
app.component('login-page', LoginPage);
app.component('student-dash', StudentDash);
app.component('parent-dash', ParentDash);
app.component('teacher-dash', TeacherDash);
app.component('owner-dash', OwnerDash);

// استعادة الإعدادات المحفوظة
const savedTheme = localStorage.getItem('app-theme') || 'light';
const savedColor = localStorage.getItem('app-color') || 'default';
document.documentElement.setAttribute('data-theme', savedTheme);
document.documentElement.setAttribute('data-color', savedColor);

app.mount('#app');
