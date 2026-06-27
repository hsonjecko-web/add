const OwnerDash = {
  data() {
    return {
      activeTab: 'overview',
      allStudents: [],
      allStages: AppStore.getStages(),
      targetStage: '',
      targetSubject: '',
      newSubjName: '',
      newSubjIcon: 'book',
      newSubjChapters: [],
      newSubjChapter: '',
      subjectAddedMessage: '',
      examSubjectId: '',
      examTitle: '',
      examTimeLimit: 30,
      examQuestions: [],
      examQ: { q: '', options: ['', '', '', ''], answer: 0 },
      examAddedMessage: '',
      notifText: '',
      notifTargetType: 'all',
      notifTargetStudentId: '',
      notifSentMessage: '',
      slides: []
    };
  },
  computed: {
    ownerUser() { return AppStore.currentUser; },
    totalStudents() { return this.allStudents.length; },
    totalSubjects() {
      let c = 0; Object.values(window.demoData.subjects).forEach(a => c += a.length); return c;
    },
    totalExams() { return Object.keys(window.demoData.exams).length; },
    subscribedStudents() { return this.allStudents.filter(s => s.isSubscribed).length; },
    stageSubjects() { return AppStore.getSubjects(this.targetStage) || []; },
    allSubjectsList() {
      const subs = [];
      Object.entries(window.demoData.subjects).forEach(([sid, arr]) => {
        arr.forEach(s => subs.push({ ...s, sid }));
      });
      return subs;
    },
    allNotifs() { return window.demoData.notifications; }
  },
  methods: {
    loadData() {
      this.allStudents = AppStore.getAllStudents();
      this.slides = AppStore.getSlides();
    },
    getStageLabel(id) { return AppStore.getStageLabel(id); },
    getStudentName(id) { const s = AppStore.getStudentById(id); return s ? s.name : id; },
    stageSubjectsCount(stageId) { return (AppStore.getSubjects(stageId) || []).length; },
    addSubjectChapter() {
      if (this.newSubjChapter.trim()) {
        this.newSubjChapters.push(this.newSubjChapter.trim());
        this.newSubjChapter = '';
      }
    },
    removeSubjectChapter(idx) { this.newSubjChapters.splice(idx, 1); },
    saveSubject() {
      if (!this.targetStage || !this.newSubjName) {
        this.subjectAddedMessage = 'الرجاء اختيار المرحلة واسم المادة'; return;
      }
      AppStore.addSubject(this.targetStage, {
        id: 'subj_' + Date.now(), name: this.newSubjName, icon: this.newSubjIcon, chapters: this.newSubjChapters.slice()
      });
      this.subjectAddedMessage = 'تم إضافة المادة بنجاح';
      this.newSubjName = ''; this.newSubjChapters = [];
      setTimeout(() => { this.subjectAddedMessage = ''; }, 2000);
    },
    addExamQuestion() {
      if (!this.examQ.q || this.examQ.options.some(o => !o)) return;
      this.examQuestions.push({ ...this.examQ });
      this.examQ = { q: '', options: ['', '', '', ''], answer: 0 };
    },
    removeExamQuestion(idx) { this.examQuestions.splice(idx, 1); },
    saveExam() {
      if (!this.examSubjectId || !this.examTitle || !this.examQuestions.length) {
        this.examAddedMessage = 'الرجاء إكمال البيانات'; return;
      }
      window.demoData.exams[this.examSubjectId] = {
        id: 'e_' + Date.now(), title: this.examTitle, subjectId: this.examSubjectId,
        timeLimit: this.examTimeLimit, questions: this.examQuestions.slice()
      };
      this.examAddedMessage = 'تم إضافة الاختبار بنجاح';
      this.examTitle = ''; this.examQuestions = [];
      setTimeout(() => { this.examAddedMessage = ''; }, 2000);
    },
    sendNotif() {
      if (!this.notifText) { this.notifSentMessage = 'الرجاء كتابة النص'; return; }
      let targets = [];
      if (this.notifTargetType === 'all') targets = this.allStudents.map(s => s.id);
      else if (this.notifTargetType === 'student' && this.notifTargetStudentId) targets = [this.notifTargetStudentId];
      AppStore.addNotification({
        id: 'n_' + Date.now(), fromUserId: AppStore.currentUser.id,
        toStudentIds: targets, text: this.notifText,
        date: new Date().toISOString().split('T')[0], type: this.notifTargetType
      });
      this.notifSentMessage = 'تم إرسال الإشعار';
      this.notifText = '';
      setTimeout(() => { this.notifSentMessage = ''; }, 2000);
    },
    removeSlide(slideId) {
      const idx = window.demoData.slides.findIndex(s => s.id === slideId);
      if (idx > -1) { window.demoData.slides.splice(idx, 1); this.slides = AppStore.getSlides(); }
    }
  },
  mounted() { this.loadData(); },
  template: `
    <div class="owner-dash">
      <div class="dash-header">
        <h2>لوحة الإدارة - {{ ownerUser?.name }}</h2>
      </div>

      <div class="dash-tabs owner-tabs">
        <button :class="['dash-tab', { active: activeTab === 'overview' }]" @click="activeTab = 'overview'">الإحصائيات</button>
        <button :class="['dash-tab', { active: activeTab === 'students' }]" @click="activeTab = 'students'">الطلاب</button>
        <button :class="['dash-tab', { active: activeTab === 'subjects' }]" @click="activeTab = 'subjects'">المواد</button>
        <button :class="['dash-tab', { active: activeTab === 'exams' }]" @click="activeTab = 'exams'">الاختبارات</button>
        <button :class="['dash-tab', { active: activeTab === 'notifs' }]" @click="activeTab = 'notifs'">الإشعارات</button>
        <button :class="['dash-tab', { active: activeTab === 'slides' }]" @click="activeTab = 'slides'">السلايدر</button>
      </div>

      <div v-if="activeTab === 'overview'" class="t-overview">
        <div class="stats-grid">
          <div class="stat-card big"><span class="stat-num">{{ totalStudents }}</span><span>إجمالي الطلاب</span></div>
          <div class="stat-card big"><span class="stat-num">{{ subscribedStudents }}</span><span>مشترك</span></div>
          <div class="stat-card big"><span class="stat-num">{{ totalSubjects }}</span><span>مادة</span></div>
          <div class="stat-card big"><span class="stat-num">{{ totalExams }}</span><span>اختبار</span></div>
        </div>
        <div class="students-mini-list">
          <h4>قائمة الطلاب</h4>
          <div v-for="s in allStudents" :key="s.id" class="mini-student">
            <span>{{ s.name }}</span>
            <span class="mini-stage">{{ AppStore.getStageLabel(s.stage) }}</span>
            <span :class="['mini-sub', s.isSubscribed ? 'yes' : 'no']">{{ s.isSubscribed ? 'مشترك' : 'تجريبي' }}</span>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'students'" class="t-students">
        <div v-for="s in allStudents" :key="s.id" class="student-card-admin">
          <div class="sc-header">
            <span class="sc-name">{{ s.name }}</span>
            <span class="sc-userid">{{ s.generatedUserId }}</span>
          </div>
          <div class="sc-details">
            <span>الهاتف: {{ s.phone }}</span>
            <span>{{ AppStore.getStageLabel(s.stage) }}</span>
            <span>المدرسة: {{ s.school }}</span>
          </div>
          <span :class="['sc-sub', s.isSubscribed ? 'yes' : 'no']">{{ s.isSubscribed ? 'مشترك' : 'غير مشترك' }}</span>
        </div>
      </div>

      <div v-if="activeTab === 'subjects'" class="t-subjects">
        <div class="form-card">
          <h4>إضافة مادة لمرحلة</h4>
          <select v-model="targetStage" class="t-input">
            <option value="" disabled>اختر المرحلة</option>
            <option v-for="s in allStages" :key="s.id" :value="s.id">{{ s.label }}</option>
          </select>
          <div v-if="targetStage" class="existing-subs">
            <small>المواد الموجودة: {{ stageSubjects.map(s => s.name).join('، ') || 'لا توجد' }}</small>
          </div>
          <input v-model="newSubjName" class="t-input" placeholder="اسم المادة الجديدة" />
          <div class="chapters-editor">
            <input v-model="newSubjChapter" class="t-input small" placeholder="فصل" @keyup.enter="addSubjectChapter" />
            <button class="t-btn sm" @click="addSubjectChapter">+</button>
          </div>
          <div class="chapters-tags">
            <span v-for="(ch, i) in newSubjChapters" :key="i" class="chapter-tag">{{ ch }} <button @click="removeSubjectChapter(i)">&times;</button></span>
          </div>
          <p v-if="subjectAddedMessage" class="t-msg success">{{ subjectAddedMessage }}</p>
          <button class="t-btn primary" @click="saveSubject">إضافة المادة</button>
        </div>
        <div class="stages-list">
          <div v-for="s in allStages" :key="s.id" class="stage-mini-card">
            <h5>{{ s.label }}</h5>
            <p>{{ stageSubjectsCount(s.id) }} مادة</p>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'exams'" class="t-exams">
        <div class="form-card">
          <h4>إضافة اختبار</h4>
          <select v-model="examSubjectId" class="t-input">
            <option value="" disabled>اختر المادة</option>
            <option v-for="s in allSubjectsList" :key="s.id" :value="s.id">{{ s.name }} ({{ AppStore.getStageLabel(s.sid) }})</option>
          </select>
          <input v-model="examTitle" class="t-input" placeholder="عنوان الاختبار" />
          <input v-model="examTimeLimit" type="number" class="t-input small" placeholder="الوقت (دقائق)" />
          <div class="q-editor">
            <h5>الأسئلة</h5>
            <div v-for="(q, qi) in examQuestions" :key="qi" class="q-preview">{{ qi + 1 }}. {{ q.q }} <button @click="removeExamQuestion(qi)">&times;</button></div>
            <input v-model="examQ.q" class="t-input" placeholder="السؤال" />
            <div v-for="(opt, oi) in examQ.options" :key="oi" class="opt-row">
              <input v-model="examQ.options[oi]" class="t-input small" :placeholder="'خيار ' + (oi + 1)" />
              <input type="radio" :value="oi" v-model="examQ.answer" />
            </div>
            <button class="t-btn sm" @click="addExamQuestion">+ سؤال</button>
          </div>
          <p v-if="examAddedMessage" class="t-msg success">{{ examAddedMessage }}</p>
          <button class="t-btn primary" @click="saveExam">حفظ</button>
        </div>
      </div>

      <div v-if="activeTab === 'notifs'" class="t-notifs">
        <div class="form-card">
          <h4>إرسال إشعار</h4>
          <select v-model="notifTargetType" class="t-input">
            <option value="all">جميع الطلاب</option>
            <option value="student">طالب محدد</option>
            <option value="parents">أولياء الأمور</option>
          </select>
          <select v-if="notifTargetType === 'student'" v-model="notifTargetStudentId" class="t-input">
            <option value="" disabled>اختر طالباً</option>
            <option v-for="s in allStudents" :key="s.id" :value="s.id">{{ s.name }}</option>
          </select>
          <textarea v-model="notifText" class="t-textarea" rows="3" placeholder="نص الإشعار"></textarea>
          <p v-if="notifSentMessage" class="t-msg success">{{ notifSentMessage }}</p>
          <button class="t-btn primary" @click="sendNotif">إرسال</button>
        </div>
        <div class="existing-notifs">
          <h4>الإشعارات السابقة</h4>
          <div v-for="n in allNotifs" :key="n.id" class="notif-card">
            <p>{{ n.text }}</p>
            <span class="notif-date">{{ n.date }}</span>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'slides'" class="t-slides">
        <div class="form-card">
          <h4>إدارة صور السلايدر</h4>
          <div v-for="s in slides" :key="s.id" class="slide-admin-card">
            <img :src="s.image" class="slide-thumb" />
            <div class="slide-info">
              <input v-model="s.image" class="t-input small" placeholder="رابط الصورة" />
              <input v-model="s.link" class="t-input small" placeholder="الرابط" />
            </div>
            <button class="t-btn danger sm" @click="removeSlide(s.id)">حذف</button>
          </div>
        </div>
      </div>
    </div>
  `
};
