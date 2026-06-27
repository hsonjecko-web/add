const TeacherDash = {
  data() {
    return {
      activeTab: 'overview',
      allStudents: [],
      stages: AppStore.getStages(),
      newSubject: { name: '', stage: '', icon: 'book', chapters: [] },
      newChapter: '',
      newExam: { subjectId: '', title: '', timeLimit: 30, questions: [] },
      newQuestion: { q: '', options: ['', '', '', ''], answer: 0 },
      notifText: '',
      notifType: 'general',
      notifTargetStudent: '',
      notifMessage: '',
      subjectAddedMessage: '',
      examAddedMessage: '',
      notifSentMessage: '',
      slideImage: '',
      slideLink: ''
    };
  },
  computed: {
    teacherUser() { return AppStore.currentUser; },
    studentsCount() { return this.allStudents.length; },
    totalStages() { return Object.keys(window.demoData.subjects).length; },
    stageSubjects() { return AppStore.getSubjects(this.newSubject.stage) || []; },
    allSubjectsList() {
      const subs = [];
      Object.entries(window.demoData.subjects).forEach(([sid, arr]) => {
        arr.forEach(s => subs.push({ ...s, sid }));
      });
      return subs;
    }
  },
  methods: {
    loadData() { this.allStudents = AppStore.getTeacherStudents(); },
    getStageLabel(id) { return AppStore.getStageLabel(id); },
    addChapter() {
      if (this.newChapter.trim()) {
        this.newSubject.chapters.push(this.newChapter.trim());
        this.newChapter = '';
      }
    },
    removeChapter(idx) { this.newSubject.chapters.splice(idx, 1); },
    saveSubject() {
      if (!this.newSubject.name || !this.newSubject.stage) {
        this.subjectAddedMessage = 'الرجاء إدخال اسم المادة والمرحلة'; return;
      }
      AppStore.addSubject(this.newSubject.stage, {
        id: 'subj_' + Date.now(),
        name: this.newSubject.name,
        icon: this.newSubject.icon,
        chapters: this.newSubject.chapters.slice()
      });
      this.subjectAddedMessage = 'تم إضافة المادة بنجاح';
      this.newSubject = { name: '', stage: '', icon: 'book', chapters: [] };
      setTimeout(() => { this.subjectAddedMessage = ''; }, 2000);
    },
    addQuestion() {
      if (!this.newQuestion.q || this.newQuestion.options.some(o => !o)) return;
      this.newExam.questions.push({ ...this.newQuestion });
      this.newQuestion = { q: '', options: ['', '', '', ''], answer: 0 };
    },
    removeQuestion(idx) { this.newExam.questions.splice(idx, 1); },
    saveExam() {
      if (!this.newExam.subjectId || !this.newExam.title || !this.newExam.questions.length) {
        this.examAddedMessage = 'الرجاء إكمال البيانات'; return;
      }
      window.demoData.exams[this.newExam.subjectId] = {
        id: 'e_' + Date.now(),
        title: this.newExam.title,
        subjectId: this.newExam.subjectId,
        timeLimit: this.newExam.timeLimit,
        questions: this.newExam.questions.slice()
      };
      this.examAddedMessage = 'تم إضافة الاختبار بنجاح';
      this.newExam = { subjectId: '', title: '', timeLimit: 30, questions: [] };
      setTimeout(() => { this.examAddedMessage = ''; }, 2000);
    },
    sendNotification() {
      if (!this.notifText) { this.notifSentMessage = 'الرجاء كتابة نص الإشعار'; return; }
      let targets = [];
      if (this.notifType === 'general') targets = this.allStudents.map(s => s.id);
      else if (this.notifTargetStudent) targets = [this.notifTargetStudent];
      AppStore.addNotification({
        id: 'n_' + Date.now(),
        fromUserId: AppStore.currentUser.id,
        toStudentIds: targets,
        text: this.notifText,
        date: new Date().toISOString().split('T')[0],
        type: this.notifType
      });
      this.notifSentMessage = 'تم إرسال الإشعار بنجاح';
      this.notifText = ''; this.notifTargetStudent = '';
      setTimeout(() => { this.notifSentMessage = ''; }, 2000);
    },
    getStudentName(id) { const s = AppStore.getStudentById(id); return s ? s.name : id; }
  },
  mounted() { this.loadData(); },
  template: `
    <div class="teacher-dash">
      <div class="dash-header">
        <h2>مرحباً، {{ teacherUser?.name }}</h2>
        <p class="dash-subtitle">لوحة المدرس</p>
      </div>

      <div class="dash-tabs">
        <button :class="['dash-tab', { active: activeTab === 'overview' }]" @click="activeTab = 'overview'">الملخص</button>
        <button :class="['dash-tab', { active: activeTab === 'subjects' }]" @click="activeTab = 'subjects'">إدارة المواد</button>
        <button :class="['dash-tab', { active: activeTab === 'exams' }]" @click="activeTab = 'exams'">الاختبارات</button>
        <button :class="['dash-tab', { active: activeTab === 'notifs' }]" @click="activeTab = 'notifs'">الإشعارات</button>
      </div>

      <div v-if="activeTab === 'overview'" class="t-overview">
        <div class="stats-row">
          <div class="stat-card"><span class="stat-num">{{ studentsCount }}</span><span>طالب</span></div>
          <div class="stat-card"><span class="stat-num">{{ totalStages }}</span><span>مرحلة</span></div>
        </div>
        <div class="students-mini-list">
          <h4>الطلاب المسجلون</h4>
          <div v-for="s in allStudents" :key="s.id" class="mini-student">
            <span>{{ s.name }}</span>
            <span class="mini-stage">{{ AppStore.getStageLabel(s.stage) }}</span>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'subjects'" class="t-subjects">
        <div class="form-card">
          <h4>إضافة مادة جديدة</h4>
          <select v-model="newSubject.stage" class="t-input">
            <option value="" disabled>اختر المرحلة</option>
            <option v-for="s in stages" :key="s.id" :value="s.id">{{ s.label }}</option>
          </select>
          <input v-model="newSubject.name" class="t-input" placeholder="اسم المادة" />
          <div class="chapters-editor">
            <input v-model="newChapter" class="t-input small" placeholder="أضف فصلاً" @keyup.enter="addChapter" />
            <button class="t-btn sm" @click="addChapter">+</button>
          </div>
          <div class="chapters-tags">
            <span v-for="(ch, i) in newSubject.chapters" :key="i" class="chapter-tag">
              {{ ch }} <button @click="removeChapter(i)">&times;</button>
            </span>
          </div>
          <p v-if="subjectAddedMessage" class="t-msg success">{{ subjectAddedMessage }}</p>
          <button class="t-btn primary" @click="saveSubject">حفظ المادة</button>
        </div>
      </div>

      <div v-if="activeTab === 'exams'" class="t-exams">
        <div class="form-card">
          <h4>إضافة اختبار جديد</h4>
          <select v-model="newExam.subjectId" class="t-input">
            <option value="" disabled>اختر المادة</option>
            <option v-for="s in allSubjectsList" :key="s.id" :value="s.id">{{ s.name }} ({{ AppStore.getStageLabel(s.sid) }})</option>
          </select>
          <input v-model="newExam.title" class="t-input" placeholder="عنوان الاختبار" />
          <input v-model="newExam.timeLimit" type="number" class="t-input small" placeholder="الوقت (دقائق)" />
          <div class="q-editor">
            <h5>الأسئلة</h5>
            <div v-for="(q, qi) in newExam.questions" :key="qi" class="q-preview">
              <span>{{ qi + 1 }}. {{ q.q }}</span>
              <button @click="removeQuestion(qi)">&times;</button>
            </div>
            <input v-model="newQuestion.q" class="t-input" placeholder="نص السؤال" />
            <div v-for="(opt, oi) in newQuestion.options" :key="oi" class="opt-row">
              <input v-model="newQuestion.options[oi]" class="t-input small" :placeholder="'خيار ' + (oi + 1)" />
              <input type="radio" :value="oi" v-model="newQuestion.answer" />
            </div>
            <button class="t-btn sm" @click="addQuestion">+ إضافة سؤال</button>
          </div>
          <p v-if="examAddedMessage" class="t-msg success">{{ examAddedMessage }}</p>
          <button class="t-btn primary" @click="saveExam">حفظ الاختبار</button>
        </div>
      </div>

      <div v-if="activeTab === 'notifs'" class="t-notifs">
        <div class="form-card">
          <h4>إرسال إشعار</h4>
          <select v-model="notifType" class="t-input">
            <option value="general">لجميع الطلاب</option>
            <option value="specific">لطالب محدد</option>
          </select>
          <select v-if="notifType === 'specific'" v-model="notifTargetStudent" class="t-input">
            <option value="" disabled>اختر طالباً</option>
            <option v-for="s in allStudents" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
          <textarea v-model="notifText" class="t-textarea" placeholder="نص الإشعار" rows="3"></textarea>
          <p v-if="notifSentMessage" class="t-msg success">{{ notifSentMessage }}</p>
          <button class="t-btn primary" @click="sendNotification">إرسال</button>
        </div>
      </div>
    </div>
  `
};
