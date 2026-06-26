const app = Vue.createApp({
  data() {
    return {
      currentView: 'home'
    };
  },
  methods: {
    showHome() {
      this.currentView = 'home';
    },
    showSubjects() {
      this.currentView = 'subjects';
    },
    showExam() {
      this.currentView = 'exam';
    },
    showMyExams() {
      this.currentView = 'myexams';
    },
    showSettings() {
      this.currentView = 'settings';
    }
  },
  template: `
    <div>
      <app-header></app-header>
      <main-content v-if="currentView === 'home'"></main-content>
      <subjects-page v-else-if="currentView === 'subjects'"></subjects-page>
      <exam-page v-else-if="currentView === 'exam'"></exam-page>
      <my-exams-page v-else-if="currentView === 'myexams'"></my-exams-page>
      <settings-page v-else-if="currentView === 'settings'"></settings-page>
      <app-footer :current-view="currentView" @show-home="showHome" @show-subjects="showSubjects" @show-exam="showExam" @show-myexams="showMyExams" @show-settings="showSettings"></app-footer>
    </div>
  `
});

app.component('app-header', AppHeader);
app.component('main-content', MainContent);
app.component('subjects-page', SubjectsPage);
app.component('exam-page', ExamPage);
app.component('my-exams-page', MyExamsPage);
app.component('settings-page', SettingsPage);
app.component('app-footer', AppFooter);

// استعادة الإعدادات المحفوظة
const savedTheme = localStorage.getItem('app-theme') || 'light';
const savedColor = localStorage.getItem('app-color') || 'default';
document.documentElement.setAttribute('data-theme', savedTheme);
document.documentElement.setAttribute('data-color', savedColor);

app.mount('#app');
