const app = Vue.createApp({
  data() {
    return {
      currentView: 'home'
    };
  }
});

app.component('app-header', AppHeader);
app.component('main-content', MainContent);
app.component('app-footer', AppFooter);

app.mount('#app');
