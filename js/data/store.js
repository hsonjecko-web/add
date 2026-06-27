var AppStore = Vue.reactive({
  currentUser: null,
  isLoggedIn: false,
  userRole: null,
  selectedStage: null,
  selectedSubject: null,
  selectedChapter: null,
  view: 'login',

  login(user) {
    this.currentUser = user;
    this.isLoggedIn = true;
    this.userRole = user.role;
    if (user.role === 'student') {
      this.selectedStage = user.stage;
    }
    this.view = 'home';
    localStorage.setItem('app-user-role', user.role);
    localStorage.setItem('app-user-id', user.id);
  },

  logout() {
    this.currentUser = null;
    this.isLoggedIn = false;
    this.userRole = null;
    this.selectedStage = null;
    this.selectedSubject = null;
    this.selectedChapter = null;
    this.view = 'login';
    localStorage.removeItem('app-user-role');
    localStorage.removeItem('app-user-id');
  },

  goTo(view) {
    this.view = view;
  },

  selectStage(stageId) {
    this.selectedStage = stageId;
    this.selectedSubject = null;
    if (this.currentUser) {
      this.currentUser.stage = stageId;
    }
  },

  viewSubject(subject) {
    this.selectedSubject = subject;
    this.selectedChapter = null;
    this.view = 'subjects';
  },

  selectChapter(chapterIndex) {
    this.selectedChapter = chapterIndex;
  },

  getChapterExam(subjectId, chapterIndex) {
    const subj = this.getSubjectById(subjectId);
    if (!subj) return null;
    const chapterName = subj.chapters[chapterIndex];
    if (!chapterName) return null;
    const existing = window.demoData.exams[subjectId];
    const baseQuestions = existing ? existing.questions : [];
    const questions = baseQuestions.length > 0
      ? baseQuestions.map((q, i) => ({
          text: q.q,
          options: q.options,
          correct: q.options[q.answer],
          explanation: 'راجع درس ' + chapterName
        }))
      : [
          { text: 'سؤال حول ' + chapterName + ' - اختر الإجابة الصحيحة:', options: ['الخيار الأول', 'الخيار الثاني', 'الخيار الثالث', 'الخيار الرابع'], correct: 'الخيار الأول', explanation: 'راجع درس ' + chapterName },
          { text: 'ما هو المفهوم الرئيسي في ' + chapterName + '؟', options: ['المفهوم الأول', 'المفهوم الثاني', 'المفهوم الثالث', 'المفهوم الرابع'], correct: 'المفهوم الأول', explanation: 'راجع درس ' + chapterName },
          { text: 'أي مما يلي يتعلق بـ ' + chapterName + '؟', options: ['الخيار الأول', 'الخيار الثاني', 'الخيار الثالث', 'الخيار الرابع'], correct: 'الخيار الثاني', explanation: 'راجع درس ' + chapterName },
          { text: 'تطبيقات ' + chapterName + ' تشمل:', options: ['التطبيق الأول', 'التطبيق الثاني', 'التطبيق الثالث', 'كل ما سبق'], correct: 'كل ما سبق', explanation: 'راجع درس ' + chapterName },
          { text: 'مستوى فهمك لـ ' + chapterName + ':', options: ['مبتدئ', 'متوسط', 'متقدم', 'يحتاج دراسة'], correct: 'يحتاج دراسة', explanation: 'ادرس الدرس جيداً' }
        ];
    return {
      id: 'ce_' + subjectId + '_' + chapterIndex,
      title: 'اختبار ' + chapterName,
      subjectId: subjectId,
      chapterIndex: chapterIndex,
      chapterName: chapterName,
      timeLimit: existing ? existing.timeLimit : 15,
      questions: questions
    };
  },

  getSubjectById(subjectId) {
    for (const sid in window.demoData.subjects) {
      const found = window.demoData.subjects[sid].find(s => s.id === subjectId);
      if (found) return found;
    }
    return null;
  },

  getSubjects(stageId) {
    return window.demoData.subjects[stageId] || [];
  },

  getExam(subjectId) {
    if (window.demoData.exams[subjectId]) return window.demoData.exams[subjectId];
    const subjName = this.subjectNameById(subjectId) || subjectId;
    window.demoData.exams[subjectId] = {
      id: 'e_' + subjectId,
      title: 'اختبار ' + subjName,
      timeLimit: 15,
      questions: this.generateExamQuestions(subjName)
    };
    return window.demoData.exams[subjectId];
  },

  subjectNameById(subjectId) {
    for (const sid in window.demoData.subjects) {
      const found = window.demoData.subjects[sid].find(s => s.id === subjectId);
      if (found) return found.name;
    }
    return null;
  },

  generateExamQuestions(subjectName) {
    const questions = [
      { q: 'ما هي أساسيات ' + subjectName + '؟', options: ['المفاهيم الأساسية', 'النظريات', 'التطبيقات', 'كل ما سبق'], answer: 3 },
      { q: 'أهم تطبيقات ' + subjectName + ' في الحياة:', options: ['التعليم', 'الصناعة', 'الطب', 'كل ما سبق'], answer: 3 },
      { q: 'دراسة ' + subjectName + ' تساعد على:', options: ['تنمية المهارات', 'فهم الظواهر', 'حل المشكلات', 'كل ما سبق'], answer: 3 },
      { q: 'من فروع ' + subjectName + ':', options: ['الفرع الأول', 'الفرع الثاني', 'الفرع الثالث', 'كل ما سبق'], answer: 3 },
      { q: 'مستوى تقدمك في ' + subjectName + ':', options: ['مبتدئ', 'متوسط', 'متقدم', 'يحدد بعد الدراسة'], answer: 3 }
    ];
    return questions;
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
