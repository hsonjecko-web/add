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
    }
  },
  template: `
    <div>
      <app-header></app-header>
      <main-content v-if="currentView === 'home'"></main-content>
      <subjects-page v-else-if="currentView === 'subjects'"></subjects-page>
      <app-footer :current-view="currentView" @show-home="showHome" @show-subjects="showSubjects"></app-footer>
    </div>
  `
});

app.component('app-header', AppHeader);
app.component('main-content', MainContent);
app.component('subjects-page', SubjectsPage);
app.component('app-footer', AppFooter);

app.mount('#app');
