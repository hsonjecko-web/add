var AppStore = Vue.reactive({
  currentUser: null,
  isLoggedIn: false,
  userRole: null,
  selectedStage: null,
  view: 'login',

  login(user) {
    this.currentUser = user;
    this.isLoggedIn = true;
    this.userRole = user.role;
    if (user.role === 'student') {
      this.selectedStage = user.stage;
      this.view = 'studentDash';
    } else if (user.role === 'parent') {
      this.view = 'parentDash';
    } else if (user.role === 'teacher') {
      this.view = 'teacherDash';
    } else if (user.role === 'owner') {
      this.view = 'ownerDash';
    }
    localStorage.setItem('app-user-role', user.role);
    localStorage.setItem('app-user-id', user.id);
  },

  logout() {
    this.currentUser = null;
    this.isLoggedIn = false;
    this.userRole = null;
    this.selectedStage = null;
    this.view = 'login';
    localStorage.removeItem('app-user-role');
    localStorage.removeItem('app-user-id');
  },

  goTo(view) {
    this.view = view;
  },

  selectStage(stageId) {
    this.selectedStage = stageId;
    if (this.currentUser) {
      this.currentUser.stage = stageId;
    }
  },

  getSubjects(stageId) {
    return window.demoData.subjects[stageId] || [];
  },

  getExam(subjectId) {
    return window.demoData.exams[subjectId] || null;
  },

  getStudentByUserId(userId) {
    return window.demoData.users.find(u => u.generatedUserId === userId);
  },

  getStudentById(id) {
    return window.demoData.users.find(u => u.id === id);
  },

  getResults(studentId) {
    return window.demoData.results.filter(r => r.studentId === studentId);
  },

  getStages() {
    return window.demoData.stages;
  },

  getStageLabel(stageId) {
    const s = window.demoData.stages.find(st => st.id === stageId);
    return s ? s.label : stageId;
  },

  subscribe(code) {
    if (code === '002200') {
      if (this.currentUser) {
        this.currentUser.isSubscribed = true;
        const realUser = window.demoData.users.find(u => u.id === this.currentUser.id);
        if (realUser) realUser.isSubscribed = true;
      }
      return { success: true, message: 'تم تفعيل الاشتراك بنجاح' };
    }
    return { success: false, message: 'رمز الاشتراك غير صحيح' };
  },

  studentTrialDone(subjectId) {
    const key = 'trial_' + this.currentUser.id + '_' + subjectId;
    const done = localStorage.getItem(key);
    return done === 'true';
  },

  markTrialDone(subjectId) {
    const key = 'trial_' + this.currentUser.id + '_' + subjectId;
    localStorage.setItem(key, 'true');
  },

  canAccessSubject(subjectId) {
    if (this.currentUser.isSubscribed) return true;
    return !this.studentTrialDone(subjectId);
  },

  addNotification(notif) {
    window.demoData.notifications.push(notif);
  },

  getStudentNotifications(studentId) {
    return window.demoData.notifications.filter(n =>
      n.toStudentIds.includes(studentId) || n.toStudentIds.includes('all')
    );
  },

  getAllStudents() {
    return window.demoData.users.filter(u => u.role === 'student');
  },

  getAllTeachers() {
    return [window.demoData.teacher];
  },

  getTeacherStudents() {
    return window.demoData.users.filter(u => u.role === 'student');
  },

  addSubject(stageId, subject) {
    if (!window.demoData.subjects[stageId]) {
      window.demoData.subjects[stageId] = [];
    }
    window.demoData.subjects[stageId].push(subject);
  },

  addUser(user) {
    window.demoData.users.push(user);
  },

  generateUserId() {
    const count = window.demoData.users.length + 1;
    return 'STU-' + String(count).padStart(3, '0');
  },

  getSlides() {
    return window.demoData.slides;
  },

  updateSlide(slideId, data) {
    const slide = window.demoData.slides.find(s => s.id === slideId);
    if (slide) Object.assign(slide, data);
  }
});
