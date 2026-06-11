(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}})();class ue{constructor(){this._routes={},this._currentRoute=null,this._beforeEach=null,window.addEventListener("hashchange",()=>this._resolve())}on(e,s){return this._routes[e]=s,this}beforeEach(e){return this._beforeEach=e,this}go(e){window.location.hash=e}replace(e){window.location.replace(e)}start(){this._resolve()}current(){return window.location.hash||"#/"}_resolve(){const e=window.location.hash||"#/",s=this._routes[e]||this._routes["*"];s&&(this._beforeEach&&!this._beforeEach(e,this._currentRoute)||(this._currentRoute=e,s(e)))}}const f=new ue,V="cgpa-app";function ge(){try{const t=localStorage.getItem(V);return t?JSON.parse(t):null}catch{return null}}function fe(t){try{return localStorage.setItem(V,JSON.stringify(t)),!0}catch{return!1}}function te(){localStorage.removeItem(V)}const j={profile:null,semesters:[],predictions:[],settings:{theme:"light",gradeScale:5},analytics:{},onboardingDone:!1};class he{constructor(){this._state=this._load(),this._listeners=[]}_load(){const e=ge();return e?{...j,...e}:{...j}}_persist(){fe(this._state)}subscribe(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(s=>s!==e)}}_notify(e){this._listeners.forEach(s=>s(e,this._state))}get(){return this._state}getKey(e){return this._state[e]}setProfile(e){this._state.profile={...this._state.profile,...e},this._persist(),this._notify("profile")}completeOnboarding(){this._state.onboardingDone=!0,this._persist(),this._notify("onboardingDone")}addSemester(e){const o={id:Date.now().toString(),createdAt:new Date().toISOString(),...e};return this._state.semesters=[...this._state.semesters,o],this._persist(),this._notify("semesters"),o}updateSemester(e,s){this._state.semesters=this._state.semesters.map(o=>o.id===e?{...o,...s,updatedAt:new Date().toISOString()}:o),this._persist(),this._notify("semesters")}deleteSemester(e){this._state.semesters=this._state.semesters.filter(s=>s.id!==e),this._persist(),this._notify("semesters")}getSemesters(){return[...this._state.semesters].sort((e,s)=>e.year!==s.year?e.year-s.year:e.semester==="First"?-1:1)}addPrediction(e){const o={id:Date.now().toString(),createdAt:new Date().toISOString(),...e};return this._state.predictions=[o,...this._state.predictions].slice(0,20),this._persist(),this._notify("predictions"),o}setSettings(e){this._state.settings={...this._state.settings,...e},this._persist(),this._notify("settings")}reset(){this._state={...j},te(),this._notify("reset")}exportJSON(){return JSON.stringify(this._state,null,2)}importJSON(e){try{const s=JSON.parse(e);return this._state={...j,...s},this._persist(),this._notify("import"),!0}catch{return!1}}}const h=new he,me=[{route:"#/dashboard",label:"Home",icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>`},{route:"#/calculator",label:"Calculate",icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/>
      <line x1="16" y1="14" x2="16" y2="18"/><line x1="8" y1="10" x2="8" y2="18"/>
      <line x1="12" y1="10" x2="12" y2="18"/><line x1="8" y1="14" x2="14" y2="14"/>
    </svg>`},{route:"#/history",label:"History",icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/>
    </svg>`},{route:"#/predictor",label:"Predict",icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>`},{route:"#/profile",label:"Profile",icon:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>`}];function ye(t,e){t.innerHTML=me.map(s=>`
    <button class="nav-item ${e===s.route?"active":""}"
            onclick="window.location.hash='${s.route}'"
            aria-label="${s.label}"
            ${e===s.route?'aria-current="page"':""}>
      <span class="nav-icon-wrap">${s.icon}</span>
      <span>${s.label}</span>
    </button>
  `).join("")}const l=(t,e=document)=>e.querySelector(t),Z=(t,e=document)=>[...e.querySelectorAll(t)];function U(t=""){return t.trim().split(" ").slice(0,2).map(e=>{var s;return(s=e[0])==null?void 0:s.toUpperCase()}).join("")}function v(t,e="default",s=3e3){const o=document.getElementById("toast-container"),i={success:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>',error:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>',warning:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>',default:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>'},r=document.createElement("div");r.className=`toast ${e!=="default"?e:""}`,r.innerHTML=`${i[e]||i.default}<span>${t}</span>`,o.appendChild(r),setTimeout(()=>{r.style.animation="none",r.style.opacity="0",r.style.transform="translateY(-8px) scale(0.95)",r.style.transition="all 0.2s ease",setTimeout(()=>r.remove(),200)},s)}const M=[{eyebrow:"Welcome",title:"Track Your <span>Academic</span> Journey",desc:"Monitor your GPA, manage semesters, and stay on top of your academic performance in one place.",illustration:`
      <div class="illustration-circle">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" class="illustration-icon">
          <rect x="15" y="25" width="70" height="55" rx="8" fill="#bbf7d0"/>
          <rect x="25" y="35" width="50" height="8" rx="3" fill="#16a34a"/>
          <rect x="25" y="48" width="35" height="5" rx="2" fill="#86efac"/>
          <rect x="25" y="57" width="25" height="5" rx="2" fill="#86efac"/>
          <rect x="25" y="66" width="30" height="5" rx="2" fill="#86efac"/>
          <circle cx="72" cy="28" r="14" fill="#16a34a"/>
          <path d="M66 28l4 4 8-8" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="float-card top-right">CGPA 4.75 🎓</div>
        <div class="float-card bottom-left">5 Semesters</div>
      </div>`},{eyebrow:"GPA Tracking",title:"Monitor Your <span>Progress</span> Over Time",desc:"Add courses each semester, see your GPA calculated instantly, and watch your CGPA grow with every achievement.",illustration:`
      <div class="illustration-circle">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" class="illustration-icon">
          <rect x="10" y="55" width="14" height="30" rx="3" fill="#bbf7d0"/>
          <rect x="28" y="45" width="14" height="40" rx="3" fill="#86efac"/>
          <rect x="46" y="35" width="14" height="50" rx="3" fill="#4ade80"/>
          <rect x="64" y="25" width="14" height="60" rx="3" fill="#16a34a"/>
          <path d="M17 55 L35 45 L53 35 L71 25" stroke="#166534" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="17" cy="55" r="3" fill="#166534"/>
          <circle cx="35" cy="45" r="3" fill="#166534"/>
          <circle cx="53" cy="35" r="3" fill="#166534"/>
          <circle cx="71" cy="25" r="3" fill="#166534"/>
        </svg>
        <div class="float-card top-right">↑ 0.3 GPA</div>
        <div class="float-card bottom-left">Best: 4.83</div>
      </div>`},{eyebrow:"Smart Prediction",title:"Predict Your <span>Final CGPA</span>",desc:"Use our intelligent predictor to forecast your graduation CGPA and get personalized recommendations to achieve your target class.",illustration:`
      <div class="illustration-circle">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" class="illustration-icon">
          <circle cx="50" cy="50" r="32" stroke="#bbf7d0" stroke-width="8"/>
          <circle cx="50" cy="50" r="32" stroke="#16a34a" stroke-width="8" stroke-dasharray="140 60" stroke-linecap="round" transform="rotate(-90 50 50)"/>
          <text x="50" y="46" text-anchor="middle" font-size="14" font-weight="700" fill="#166534">4.62</text>
          <text x="50" y="58" text-anchor="middle" font-size="8" fill="#6b7280">Projected</text>
        </svg>
        <div class="float-card top-right">First Class 🏆</div>
        <div class="float-card bottom-left">3 sems left</div>
      </div>`}];let G=0;function be(t){G=0,N(t,G)}function N(t,e){var i,r;const s=M[e],o=e===M.length-1;t.innerHTML=`
    <div class="onboarding-container fade-in">
      <div class="onboarding-progress">
        <div class="progress-dots">
          ${M.map((n,a)=>`
            <div class="progress-dot ${a===e?"active":a<e?"done":""}"></div>
          `).join("")}
          <div class="progress-dot ${e>=M.length?"active":""}"></div>
        </div>
        <button class="skip-btn" id="skip-btn">Skip</button>
      </div>

      <div class="onboarding-slide">
        <div class="illustration-wrap">${s.illustration}</div>
        <div class="slide-text">
          <p class="slide-eyebrow">${s.eyebrow}</p>
          <h1 class="slide-title">${s.title}</h1>
          <p class="slide-desc">${s.desc}</p>
        </div>
      </div>

      <div class="onboarding-footer">
        <button class="btn btn-primary btn-full" id="next-btn">
          ${o?"Set Up Profile":"Continue"}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        ${e>0?'<button class="btn btn-ghost btn-full" id="back-btn">Back</button>':""}
      </div>
    </div>
  `,l("#next-btn",t).addEventListener("click",()=>{o?X(t):(G++,N(t,G))}),(i=l("#skip-btn",t))==null||i.addEventListener("click",()=>X(t)),(r=l("#back-btn",t))==null||r.addEventListener("click",()=>{G--,N(t,G)})}function X(t){t.innerHTML=`
    <div class="onboarding-container fade-in">
      <div class="onboarding-progress">
        <div class="progress-dots">
          ${M.map(()=>'<div class="progress-dot done"></div>').join("")}
          <div class="progress-dot active"></div>
        </div>
        <span style="font-size:var(--font-size-xs);color:var(--color-gray-400);font-weight:500;">Almost done!</span>
      </div>

      <div class="onboarding-slide">
        <div class="profile-avatar-section">
          <div class="avatar-circle" id="avatar-preview">👤</div>
          <p class="avatar-name" id="avatar-name-preview">Your Name</p>
        </div>

        <div class="profile-setup-form">
          <div class="form-group">
            <label class="form-label" for="p-name">Full Name <span style="color:var(--color-danger)">*</span></label>
            <input class="form-control" id="p-name" type="text" placeholder="e.g. Chioma Adeyemi" autocomplete="name" />
          </div>
          <div class="form-group">
            <label class="form-label" for="p-uni">University <span style="color:var(--color-danger)">*</span></label>
            <input class="form-control" id="p-uni" type="text" placeholder="e.g. University of Lagos" />
          </div>
          <div class="form-group">
            <label class="form-label" for="p-faculty">Faculty</label>
            <input class="form-control" id="p-faculty" type="text" placeholder="e.g. Engineering" />
          </div>
          <div class="form-group">
            <label class="form-label" for="p-dept">Department</label>
            <input class="form-control" id="p-dept" type="text" placeholder="e.g. Computer Science" />
          </div>
          <div class="form-group">
            <label class="form-label" for="p-level">Current Level</label>
            <select class="form-control" id="p-level">
              <option value="">Select level</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
              <option value="500">500 Level</option>
              <option value="600">600 Level</option>
            </select>
          </div>
        </div>
      </div>

      <div class="onboarding-footer">
        <button class="btn btn-primary btn-full" id="save-profile-btn">
          Get Started
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        <button class="btn btn-ghost btn-full" id="back-to-slides-btn">Back</button>
      </div>
    </div>
  `;const e=l("#p-name",t),s=l("#avatar-preview",t),o=l("#avatar-name-preview",t);e.addEventListener("input",()=>{const i=e.value.trim(),r=U(i);s.textContent=r||"👤",o.textContent=i||"Your Name"}),l("#save-profile-btn",t).addEventListener("click",()=>{const i=l("#p-name",t).value.trim(),r=l("#p-uni",t).value.trim();if(!i){v("Please enter your name","error");return}if(!r){v("Please enter your university","error");return}h.setProfile({name:i,university:r,faculty:l("#p-faculty",t).value.trim(),department:l("#p-dept",t).value.trim(),level:l("#p-level",t).value}),h.completeOnboarding(),v(`Welcome, ${i.split(" ")[0]}! 🎉`,"success"),f.go("#/dashboard")}),l("#back-to-slides-btn",t).addEventListener("click",()=>{N(t,M.length-1)})}const H={A:5,B:4,C:3,D:2,E:1,F:0},I={A:{bg:"#f0fdf4",text:"#166534"},B:{bg:"#eff6ff",text:"#1e40af"},C:{bg:"#fffbeb",text:"#92400e"},D:{bg:"#fff7ed",text:"#9a3412"},E:{bg:"#fef2f2",text:"#991b1b"},F:{bg:"#fef2f2",text:"#7f1d1d"}},P=[{label:"First Class",min:4.5,max:5,color:"#16a34a",dot:"#16a34a"},{label:"Second Class Upper",min:3.5,max:4.49,color:"#2563eb",dot:"#2563eb"},{label:"Second Class Lower",min:2.4,max:3.49,color:"#d97706",dot:"#d97706"},{label:"Third Class",min:1.5,max:2.39,color:"#ea580c",dot:"#ea580c"},{label:"Pass",min:1,max:1.49,color:"#6b7280",dot:"#6b7280"},{label:"Fail",min:0,max:.99,color:"#dc2626",dot:"#dc2626"}];function C(t){if(!t||t.length===0)return{gpa:0,totalUnits:0,qualityPoints:0};let e=0,s=0;t.forEach(i=>{var a;const r=parseInt(i.units)||0,n=H[(a=i.grade)==null?void 0:a.toUpperCase()]??0;e+=r,s+=r*n});const o=e>0?s/e:0;return{gpa:parseFloat(o.toFixed(2)),totalUnits:e,qualityPoints:s}}function R(t){if(!t||t.length===0)return{cgpa:0,totalUnits:0,totalQualityPoints:0};let e=0,s=0;t.forEach(i=>{const{totalUnits:r,qualityPoints:n}=C(i.courses||[]);e+=r,s+=n});const o=e>0?s/e:0;return{cgpa:parseFloat(o.toFixed(2)),totalUnits:e,totalQualityPoints:s}}function L(t){return t===0?{label:"Unclassified",color:"#9ca3af",dot:"#9ca3af"}:P.find(e=>t>=e.min&&t<=e.max)||P[P.length-1]}function xe({currentCGPA:t,completedSemesters:e,remainingSemesters:s,expectedGPA:o}){const i=e+s;if(i===0)return{projectedCGPA:0,classification:L(0),neededGPA:[]};const r=parseFloat(((t*e+o*s)/i).toFixed(2)),n=P.slice(0,4).map(a=>{const c=s>0?(a.min*i-t*e)/s:null;return{...a,needed:c?parseFloat(c.toFixed(2)):null}});return{projectedCGPA:r,classification:L(r),neededGPA:n}}function we(t){if(!t||t.length===0)return null;const e=t.map(a=>{const{gpa:c}=C(a.courses||[]);return{...a,gpa:c}}),s=e.map(a=>a.gpa),o=s.reduce((a,c)=>a+c,0)/s.length,i=e.reduce((a,c)=>a.gpa>=c.gpa?a:c),r=e.reduce((a,c)=>a.gpa<=c.gpa?a:c);let n=null;for(let a=1;a<e.length;a++){const c=e[a].gpa-e[a-1].gpa;(!n||c>n.diff)&&(n={semester:e[a],diff:parseFloat(c.toFixed(2))})}return{bestSemester:i,worstSemester:r,mostImproved:n==null?void 0:n.semester,mostImprovedDiff:n==null?void 0:n.diff,averageGPA:parseFloat(o.toFixed(2)),trend:e.map(a=>({label:`${a.semester} ${a.year}`,gpa:a.gpa}))}}function ke(t,e,s){const o=[];if(!s)return o;const i=e+s;return P.slice(0,4).forEach(r=>{const n=(r.min*i-t*e)/s;n>=0&&n<=5?o.push({type:n<=t?"achievable":"stretch",icon:n<=t?"✓":"↑",message:`You need a GPA of ${n.toFixed(2)} in remaining ${s} semester${s>1?"s":""} to graduate with ${r.label}.`,color:r.color}):n>5&&o.push({type:"unachievable",icon:"✗",message:`${r.label} is no longer achievable (would need ${n.toFixed(2)} GPA).`,color:"#6b7280"})}),o}function se({icon:t,title:e,text:s,actionLabel:o,actionId:i}){return`
    <div class="empty-state">
      <div class="empty-icon">${t}</div>
      <p class="empty-title">${e}</p>
      <p class="empty-text">${s}</p>
      ${o?`<button class="btn btn-primary btn-sm mt-3" id="${i||"empty-action"}">${o}</button>`:""}
    </div>
  `}function $e(t){var $,m,x,w,_;const{profile:e,semesters:s}=h.get(),{cgpa:o,totalUnits:i,totalQualityPoints:r}=R(s),n=L(o),a=we(s),c=Math.min(o/5*100,100).toFixed(1),d=U((e==null?void 0:e.name)||""),u=(($=e==null?void 0:e.name)==null?void 0:$.split(" ")[0])||"Student";let p=0;s.forEach(y=>{const{gpa:A}=C(y.courses||[]);A>p&&(p=A)});const g=[...s].sort((y,A)=>{var B;return((B=A.createdAt)==null?void 0:B.localeCompare(y.createdAt||""))||0}).slice(0,3);t.innerHTML=`
    <div class="fade-in">
      <!-- Header -->
      <div class="dashboard-header" style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <p class="dashboard-greeting">Good ${Ce()},</p>
          <h1 class="dashboard-name">${u} 👋</h1>
        </div>
        <button onclick="window.location.hash='#/profile'"
          style="width:44px;height:44px;border-radius:50%;background:var(--color-primary-bg);border:2px solid var(--color-primary-lighter);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:var(--color-primary-darker);cursor:pointer;border:none;">
          ${d||"👤"}
        </button>
      </div>

      <!-- CGPA Hero Card -->
      <div class="cgpa-hero-card slide-up">
        <p class="cgpa-label">Current CGPA</p>
        <p class="cgpa-value">${o.toFixed(2)}</p>
        <div class="cgpa-class">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          ${n.label}
        </div>
        <div class="cgpa-progress-section">
          <div class="cgpa-progress-bar">
            <div class="cgpa-progress-fill" style="width:${c}%"></div>
          </div>
          <div class="cgpa-progress-labels">
            <span>0.00</span><span>Pass (1.00)</span><span>2nd Lower</span><span>1st Class (4.50)</span><span>5.00</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <p class="section-title">Quick Actions</p>
        <div class="quick-actions-grid">
          <button class="action-item" onclick="window.location.hash='#/calculator'">
            <div class="action-icon green">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <span class="action-label">Add Semester</span>
          </button>
          <button class="action-item" onclick="window.location.hash='#/predictor'">
            <div class="action-icon blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <span class="action-label">Predict CGPA</span>
          </button>
          <button class="action-item" onclick="window.location.hash='#/history'">
            <div class="action-icon orange">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
            </div>
            <span class="action-label">View History</span>
          </button>
          <button class="action-item" onclick="window.location.hash='#/settings'">
            <div class="action-icon purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <span class="action-label">Export Data</span>
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="quick-stats">
        <p class="section-title">Quick Stats</p>
        <div class="stats-grid">
          <div class="stat-card-dashboard">
            <div class="stat-icon" style="background:var(--color-primary-bg);color:var(--color-primary)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
            <p class="stat-card-value">${s.length}</p>
            <p class="stat-card-label">Semesters</p>
          </div>
          <div class="stat-card-dashboard">
            <div class="stat-icon" style="background:var(--color-info-bg);color:var(--color-info)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <p class="stat-card-value">${i}</p>
            <p class="stat-card-label">Total Units</p>
          </div>
          <div class="stat-card-dashboard">
            <div class="stat-icon" style="background:var(--color-warning-bg);color:var(--color-warning)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
            <p class="stat-card-value">${r}</p>
            <p class="stat-card-label">Quality Points</p>
          </div>
          <div class="stat-card-dashboard">
            <div class="stat-icon" style="background:#ede9fe;color:#7c3aed">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            </div>
            <p class="stat-card-value">${p.toFixed(2)}</p>
            <p class="stat-card-label">Best GPA</p>
          </div>
        </div>
      </div>

      <!-- Degree Progress -->
      <div class="degree-progress">
        <p class="section-title">Degree Classification Scale</p>
        <div class="degree-progress-card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-3)">
            <span style="font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);color:var(--color-gray-700)">
              Current: <span style="color:${n.color}">${n.label}</span>
            </span>
            <span style="font-size:var(--font-size-sm);font-weight:var(--font-weight-bold);color:var(--color-gray-900)">${o.toFixed(2)} / 5.00</span>
          </div>
          <div class="progress-bar" style="height:12px;position:relative;background:var(--color-gray-100)">
            <div class="progress-fill" style="width:${c}%;background:${n.color||"var(--color-primary)"}"></div>
          </div>
          <div class="class-ranges">
            ${P.slice(0,5).map(y=>`
              <div class="class-range-item">
                <div class="class-range-dot" style="background:${y.dot}"></div>
                <span class="class-range-name">${y.label}</span>
                <span class="class-range-value">${y.min.toFixed(2)} – ${y.max.toFixed(2)}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- Recent Semesters -->
      <div class="recent-history">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-3)">
          <p class="section-title" style="margin:0">Recent Semesters</p>
          ${s.length>0?`<button onclick="window.location.hash='#/history'" style="font-size:var(--font-size-xs);color:var(--color-primary);font-weight:600;background:none;border:none;cursor:pointer;">View all</button>`:""}
        </div>
        ${g.length===0?`
          ${se({icon:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>',title:"No semesters added yet",text:"Add your first semester to start tracking your CGPA.",actionLabel:"Add Semester",actionId:"dash-add-sem"})}
        `:`
          <div style="display:flex;flex-direction:column;gap:var(--space-2)">
            ${g.map(y=>{var K;const{gpa:A}=C(y.courses||[]),B=L(A);return`
                <div class="semester-card" onclick="window.location.hash='#/history'">
                  <div class="semester-info">
                    <p class="semester-name">${y.semester} Semester, ${y.year}</p>
                    <p class="semester-meta">${(y.courses||[]).length} courses · ${((K=y.courses)==null?void 0:K.reduce((pe,ve)=>pe+parseInt(ve.units||0),0))||0} units</p>
                  </div>
                  <div style="text-align:right">
                    <p class="semester-gpa">${A.toFixed(2)}</p>
                    <span class="badge" style="background:${B.dot}18;color:${B.color};font-size:10px;">${B.label}</span>
                  </div>
                </div>
              `}).join("")}
          </div>
        `}
      </div>

      <!-- Insights (if data exists) -->
      ${a?`
      <div style="padding:0 var(--page-padding);margin-bottom:var(--space-5)">
        <p class="section-title">Academic Insights</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
          <div class="stat-card-dashboard">
            <p class="stat-card-label">Best Semester</p>
            <p class="stat-card-value" style="font-size:var(--font-size-base)">${(m=a.bestSemester)==null?void 0:m.semester} ${(x=a.bestSemester)==null?void 0:x.year}</p>
            <p style="font-size:var(--font-size-sm);color:var(--color-primary);font-weight:600">GPA: ${(_=(w=a.bestSemester)==null?void 0:w.gpa)==null?void 0:_.toFixed(2)}</p>
          </div>
          <div class="stat-card-dashboard">
            <p class="stat-card-label">Average GPA</p>
            <p class="stat-card-value">${a.averageGPA.toFixed(2)}</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-gray-400)">across all semesters</p>
          </div>
        </div>
      </div>
      `:""}

      <div style="height:var(--space-6)"></div>
    </div>
  `;const b=document.getElementById("dash-add-sem");b&&b.addEventListener("click",()=>f.go("#/calculator"))}function Ce(){const t=new Date().getHours();return t<12?"morning":t<17?"afternoon":"evening"}const ie=()=>document.getElementById("modal-overlay");function O(t,e={}){const s=ie();s.innerHTML=`
    <div class="modal ${e.center?"center-modal":""}">
      <div class="modal-handle"></div>
      ${t}
    </div>
  `,s.classList.remove("hidden"),e.center?s.classList.add("center"):s.classList.remove("center"),s.addEventListener("click",o=>{var i;o.target===s&&(q(),(i=e.onClose)==null||i.call(e))},{once:!0})}function q(){const t=ie();t.classList.add("hidden"),t.innerHTML=""}function Q({title:t,message:e,confirmLabel:s="Confirm",confirmClass:o="btn-primary",onConfirm:i,onCancel:r}){O(`
    <h2 class="modal-title">${t}</h2>
    <p style="font-size:var(--font-size-sm);color:var(--color-gray-600);line-height:1.6;">${e}</p>
    <div class="modal-actions">
      <button class="btn btn-ghost" id="modal-cancel">Cancel</button>
      <button class="btn ${o}" id="modal-confirm">${s}</button>
    </div>
  `,{center:!0}),document.getElementById("modal-cancel").addEventListener("click",()=>{q(),r==null||r()}),document.getElementById("modal-confirm").addEventListener("click",()=>{q(),i==null||i()})}let k=[{code:"",units:"",grade:""}],F=null;function ae(t,e=null){var o;F=e;const s=e?h.getSemesters().find(i=>i.id===e):null;s?k=s.courses.map(i=>({...i})):k=[{code:"",units:"",grade:""}],t.innerHTML=`
    <div class="fade-in">
      <!-- Header -->
      <div class="page-header">
        <div class="page-header-inner">
          <div>
            <h1 class="page-title">${F?"Edit Semester":"Add Semester"}</h1>
            <p class="page-subtitle">Enter your courses and grades</p>
          </div>
          <button class="btn-icon" id="calc-help-btn" aria-label="Grade scale">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
          </button>
        </div>
      </div>

      <!-- Semester Info -->
      <div style="padding:var(--space-4) var(--page-padding) 0">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
          <div class="form-group">
            <label class="form-label" for="sem-type">Semester <span style="color:var(--color-danger)">*</span></label>
            <select class="form-control" id="sem-type">
              <option value="">Select</option>
              <option value="First" ${(s==null?void 0:s.semester)==="First"?"selected":""}>First</option>
              <option value="Second" ${(s==null?void 0:s.semester)==="Second"?"selected":""}>Second</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="sem-year">Year / Session <span style="color:var(--color-danger)">*</span></label>
            <input class="form-control" id="sem-year" type="text"
              placeholder="e.g. 2024"
              value="${(s==null?void 0:s.year)||""}" />
          </div>
        </div>
      </div>

      <!-- Live Result Card -->
      <div style="padding:var(--space-4) var(--page-padding)">
        <div class="result-card" id="result-card">
          <div style="display:flex;align-items:flex-start;justify-content:space-between">
            <div>
              <p class="result-label">Semester GPA</p>
              <p class="result-gpa" id="live-gpa">0.00</p>
            </div>
            <div style="text-align:right">
              <p class="result-label">After this semester</p>
              <p style="font-size:var(--font-size-xl);font-weight:700;letter-spacing:-0.02em" id="live-cgpa">–</p>
            </div>
          </div>
          <div class="result-meta">
            <div class="result-meta-item">
              <span class="result-meta-label">Units</span>
              <span class="result-meta-value" id="live-units">0</span>
            </div>
            <div class="result-meta-item">
              <span class="result-meta-label">Quality Points</span>
              <span class="result-meta-value" id="live-qp">0</span>
            </div>
            <div class="result-meta-item">
              <span class="result-meta-label">Class</span>
              <span class="result-meta-value" id="live-class">–</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Courses -->
      <div style="padding:0 var(--page-padding)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-3)">
          <p class="section-title" style="margin:0">Courses</p>
          <span id="course-count" style="font-size:var(--font-size-xs);color:var(--color-gray-400);font-weight:500">
            ${k.length} course${k.length!==1?"s":""}
          </span>
        </div>

        <div id="courses-container" style="display:flex;flex-direction:column;gap:var(--space-3)">
          ${k.map((i,r)=>oe(i,r)).join("")}
        </div>

        <!-- Add Course -->
        <button class="add-course-btn mt-3" id="add-course-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          Add Course
        </button>
      </div>

      <!-- Save Button -->
      <div style="padding:var(--space-6) var(--page-padding) var(--space-8)">
        <button class="btn btn-primary btn-full" id="save-semester-btn" style="height:52px;font-size:var(--font-size-lg)">
          ${F?"Update Semester":"Save Semester"}
        </button>
        ${F?'<button class="btn btn-ghost btn-full mt-3" id="cancel-edit-btn">Cancel</button>':""}
      </div>
    </div>
  `,re(t),l("#calc-help-btn",t).addEventListener("click",Pe),l("#save-semester-btn",t).addEventListener("click",()=>Se(t)),(o=l("#cancel-edit-btn",t))==null||o.addEventListener("click",()=>f.go("#/history")),l("#add-course-btn",t).addEventListener("click",()=>{k.push({code:"",units:"",grade:""}),ne(t)}),Y(t)}function oe(t,e){var o;const s=Object.keys(H).map(i=>`<option value="${i}" ${t.grade===i?"selected":""}>${i} (${H[i]} pts)</option>`).join("");return`
    <div class="course-row" data-index="${e}">
      <div class="course-row-header">
        <div class="course-number">${e+1}</div>
        ${k.length>1?`
          <button class="delete-course-btn" data-delete="${e}" aria-label="Remove course">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        `:""}
      </div>
      <div class="course-row-fields">
        <div class="form-group">
          <input class="form-control" type="text" placeholder="Course code"
            value="${t.code||""}" data-field="code" data-index="${e}"
            style="font-size:var(--font-size-xs);text-transform:uppercase" />
        </div>
        <div class="form-group">
          <select class="form-control" data-field="units" data-index="${e}">
            <option value="">Units</option>
            ${[1,2,3,4,5,6].map(i=>`<option value="${i}" ${parseInt(t.units)===i?"selected":""}>${i}</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <select class="form-control" data-field="grade" data-index="${e}"
            style="background-color:${t.grade?(o=I[t.grade])==null?void 0:o.bg:""}">
            <option value="">Grade</option>
            ${s}
          </select>
        </div>
      </div>
    </div>
  `}function re(t){const e=l("#courses-container",t);e.addEventListener("input",s=>{var r;const{field:o,index:i}=s.target.dataset;if(o&&i!==void 0){const n=s.target.value;k[i][o]=o==="code"?n.toUpperCase():n,o==="grade"&&(s.target.style.backgroundColor=n?(r=I[n])==null?void 0:r.bg:""),Y(t)}}),e.addEventListener("click",s=>{const o=s.target.closest("[data-delete]");if(o){const i=parseInt(o.dataset.delete);k.splice(i,1),ne(t)}})}function ne(t){const e=l("#courses-container",t);e.innerHTML=k.map((o,i)=>oe(o,i)).join("");const s=l("#course-count",t);s&&(s.textContent=`${k.length} course${k.length!==1?"s":""}`),re(t),Y(t)}function Y(t){const{gpa:e,totalUnits:s,qualityPoints:o}=C(k),i=h.getSemesters().filter($=>$.id!==F),{totalUnits:r,totalQualityPoints:n}=i.reduce(($,m)=>{const x=C(m.courses||[]);return{totalUnits:$.totalUnits+x.totalUnits,totalQualityPoints:$.totalQualityPoints+x.qualityPoints}},{totalUnits:0,totalQualityPoints:0}),a=r+s>0?(n+o)/(r+s):0,c=L(a),d=l("#live-gpa",t),u=l("#live-cgpa",t),p=l("#live-units",t),g=l("#live-qp",t),b=l("#live-class",t);d&&(d.textContent=e.toFixed(2)),u&&(u.textContent=a>0?a.toFixed(2):"–"),p&&(p.textContent=s),g&&(g.textContent=o),b&&(b.textContent=a>0?c.label:"–")}function Se(t){var r,n,a;const e=(r=l("#sem-type",t))==null?void 0:r.value,s=(a=(n=l("#sem-year",t))==null?void 0:n.value)==null?void 0:a.trim();if(!e){v("Please select a semester (First/Second)","error");return}if(!s){v("Please enter the year/session","error");return}const o=k.filter(c=>c.units&&c.grade);if(o.length===0){v("Add at least one course with units and grade","error");return}const i={semester:e,year:s,courses:o};F?(h.updateSemester(F,i),v("Semester updated successfully","success")):(h.addSemester(i),v("Semester saved successfully! 🎉","success")),f.go("#/history")}function Pe(){O(`
    <h2 class="modal-title">Grade Scale (5-Point)</h2>
    <div style="display:flex;flex-direction:column;gap:var(--space-2)">
      ${Object.entries(H).map(([t,e])=>`
        <div style="display:flex;align-items:center;justify-content:space-between;
          padding:var(--space-3) var(--space-4);
          border-radius:var(--radius-lg);
          background:${I[t].bg}">
          <span style="font-size:var(--font-size-base);font-weight:700;color:${I[t].text}">Grade ${t}</span>
          <span style="font-size:var(--font-size-sm);color:${I[t].text};font-weight:600">${e} point${e!==1?"s":""}</span>
        </div>
      `).join("")}
    </div>
    <div style="margin-top:var(--space-4);padding:var(--space-3);background:var(--color-gray-50);border-radius:var(--radius-lg)">
      <p style="font-size:var(--font-size-xs);color:var(--color-gray-500);line-height:1.6">
        GPA = Total Quality Points ÷ Total Credit Units<br>
        Quality Points = Grade Point × Credit Units per course
      </p>
    </div>
    <button class="btn btn-primary btn-full mt-3" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Got it</button>
  `)}const Le=Object.freeze(Object.defineProperty({__proto__:null,renderCalculator:ae},Symbol.toStringTag,{value:"Module"})),Ae="modulepreload",ze=function(t){return"/"+t},ee={},J=function(e,s,o){let i=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),a=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));i=Promise.allSettled(s.map(c=>{if(c=ze(c),c in ee)return;ee[c]=!0;const d=c.endsWith(".css"),u=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":Ae,d||(p.as="script"),p.crossOrigin="",p.href=c,a&&p.setAttribute("nonce",a),document.head.appendChild(p),d)return new Promise((g,b)=>{p.addEventListener("load",g),p.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(n){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=n,window.dispatchEvent(a),!a.defaultPrevented)throw n}return i.then(n=>{for(const a of n||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};let S="",W="newest";function Ee(t){S="",W="newest",t.innerHTML=`
    <div class="fade-in">
      <!-- Header -->
      <div class="page-header">
        <div class="page-header-inner">
          <div>
            <h1 class="page-title">History</h1>
            <p class="page-subtitle" id="history-subtitle">All semesters</p>
          </div>
          <button class="btn btn-primary btn-sm" onclick="window.location.hash='#/calculator'">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Add
          </button>
        </div>
      </div>

      <!-- Search -->
      <div class="history-search" style="padding:var(--space-3) var(--page-padding)">
        <div style="position:relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--color-gray-400)">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input class="form-control search-input" id="history-search"
            placeholder="Search by year or semester…"
            style="padding-left:40px" />
        </div>
      </div>

      <!-- Filters -->
      <div class="history-filters">
        <button class="filter-chip active" data-filter="all">All</button>
        <button class="filter-chip" data-filter="First">First Semester</button>
        <button class="filter-chip" data-filter="Second">Second Semester</button>
        <button class="filter-chip" data-sort="newest">Newest First</button>
        <button class="filter-chip" data-sort="oldest">Oldest First</button>
        <button class="filter-chip" data-sort="gpa-high">Highest GPA</button>
        <button class="filter-chip" data-sort="gpa-low">Lowest GPA</button>
      </div>

      <!-- List -->
      <div class="semester-list" id="semester-list">
        ${le()}
      </div>

      <div style="height:var(--space-6)"></div>
    </div>
  `,Be(t)}function le(){var o;let t=h.getSemesters();if(S){const i=S.toLowerCase();t=t.filter(r=>{var n,a;return((n=r.semester)==null?void 0:n.toLowerCase().includes(i))||String(r.year).includes(i)||((a=r.courses)==null?void 0:a.some(c=>{var d;return(d=c.code)==null?void 0:d.toLowerCase().includes(i)}))})}const e=(o=document.querySelector(".filter-chip.active[data-filter]"))==null?void 0:o.dataset.filter;e&&e!=="all"&&(t=t.filter(i=>i.semester===e)),t=_e(t,W);const s=document.getElementById("history-subtitle");return s&&(s.textContent=`${t.length} semester${t.length!==1?"s":""} found`),t.length===0?se({icon:'<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>',title:S?"No results found":"No semesters yet",text:S?`No semester matches "${S}"`:"Add your first semester to start building your academic history.",actionLabel:S?null:"Add Semester",actionId:"hist-add-sem"}):t.map(i=>Fe(i)).join("")}function Fe(t){const{gpa:e,totalUnits:s,qualityPoints:o}=C(t.courses||[]),i=L(e),r=t.courses||[];return`
    <div class="semester-detail-card" data-id="${t.id}">
      <div class="semester-detail-header">
        <div style="flex:1">
          <p style="font-size:var(--font-size-base);font-weight:700;color:var(--color-gray-900)">
            ${t.semester} Semester, ${t.year}
          </p>
          <p style="font-size:var(--font-size-xs);color:var(--color-gray-400);margin-top:2px">
            ${r.length} course${r.length!==1?"s":""} · ${s} units · ${o} QP
          </p>
        </div>
        <div style="display:flex;align-items:flex-start;gap:var(--space-3)">
          <div style="text-align:right">
            <p style="font-size:var(--font-size-xl);font-weight:800;color:${i.color};letter-spacing:-0.02em">${e.toFixed(2)}</p>
            <span class="badge" style="background:${i.dot}18;color:${i.color};font-size:10px">${i.label}</span>
          </div>
          <div class="semester-detail-actions">
            <button class="btn-icon edit-sem-btn" data-id="${t.id}" title="Edit semester" style="width:32px;height:32px">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="btn-icon delete-sem-btn" data-id="${t.id}" title="Delete semester"
              style="width:32px;height:32px;background:var(--color-danger-bg);color:var(--color-danger)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Courses list -->
      <div class="semester-courses">
        ${r.map(n=>{var d,u;const a={A:5,B:4,C:3,D:2,E:1,F:0}[(d=n.grade)==null?void 0:d.toUpperCase()]??0,c=I[(u=n.grade)==null?void 0:u.toUpperCase()]||{bg:"#f3f4f6",text:"#374151"};return`
            <div class="course-item">
              <div style="flex:1">
                <p class="course-code">${n.code||"—"}</p>
                <p class="course-units">${n.units} unit${parseInt(n.units)!==1?"s":""} · ${a*parseInt(n.units)} QP</p>
              </div>
              <span class="course-grade-badge" style="background:${c.bg};color:${c.text}">${n.grade}</span>
            </div>
          `}).join("")}
      </div>
    </div>
  `}function _e(t,e){return[...t].sort((s,o)=>{if(e==="newest")return new Date(o.createdAt||0)-new Date(s.createdAt||0);if(e==="oldest")return new Date(s.createdAt||0)-new Date(o.createdAt||0);if(e==="gpa-high"){const i=C(s.courses||[]).gpa;return C(o.courses||[]).gpa-i}if(e==="gpa-low"){const i=C(s.courses||[]).gpa,r=C(o.courses||[]).gpa;return i-r}return 0})}function T(){const t=document.getElementById("semester-list");if(t){t.innerHTML=le(),ce(t);const e=document.getElementById("hist-add-sem");e&&e.addEventListener("click",()=>f.go("#/calculator"))}}function Be(t){const e=l("#history-search",t);e==null||e.addEventListener("input",i=>{S=i.target.value.trim(),T()}),t.addEventListener("click",i=>{const r=i.target.closest(".filter-chip");r&&(r.dataset.filter&&(Z(".filter-chip[data-filter]",t).forEach(n=>n.classList.remove("active")),r.classList.add("active"),T()),r.dataset.sort&&(Z(".filter-chip[data-sort]",t).forEach(n=>n.classList.remove("active")),r.classList.add("active"),W=r.dataset.sort,T()))});const s=document.getElementById("semester-list");ce(s);const o=document.getElementById("hist-add-sem");o&&o.addEventListener("click",()=>f.go("#/calculator"))}function ce(t){t&&(t.querySelectorAll(".edit-sem-btn").forEach(e=>{e.addEventListener("click",s=>{s.stopPropagation();const o=e.dataset.id;J(async()=>{const{renderCalculator:i}=await Promise.resolve().then(()=>Le);return{renderCalculator:i}},void 0).then(({renderCalculator:i})=>{const r=document.getElementById("page-content");i(r,o)})})}),t.querySelectorAll(".delete-sem-btn").forEach(e=>{e.addEventListener("click",s=>{s.stopPropagation();const o=e.dataset.id,i=h.getSemesters().find(r=>r.id===o);Q({title:"Delete Semester",message:`Delete <strong>${i==null?void 0:i.semester} Semester ${i==null?void 0:i.year}</strong>? This will recalculate your CGPA and cannot be undone.`,confirmLabel:"Delete",confirmClass:"btn-danger",onConfirm:()=>{h.deleteSemester(o),v("Semester deleted","success"),T()}})})}))}function Me(t){const{semesters:e}=h.get(),{cgpa:s}=R(e),o=e.length;t.innerHTML=`
    <div class="fade-in">
      <!-- Header -->
      <div class="page-header">
        <div class="page-header-inner">
          <div>
            <h1 class="page-title">CGPA Predictor</h1>
            <p class="page-subtitle">Forecast your graduation CGPA</p>
          </div>
          <div style="width:40px;height:40px;border-radius:var(--radius-lg);background:var(--color-info-bg);display:flex;align-items:center;justify-content:center;color:var(--color-info)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
        </div>
      </div>

      <!-- Inputs -->
      <div style="padding:var(--space-4) var(--page-padding) 0">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-3)">
          <div class="form-group">
            <label class="form-label" for="pred-cgpa">Current CGPA</label>
            <input class="form-control" id="pred-cgpa" type="number" step="0.01" min="0" max="5"
              placeholder="e.g. 3.75" value="${s>0?s.toFixed(2):""}" />
            <p class="form-hint">Your current CGPA</p>
          </div>
          <div class="form-group">
            <label class="form-label" for="pred-completed">Completed Semesters</label>
            <input class="form-control" id="pred-completed" type="number" min="0" max="20"
              placeholder="e.g. 4" value="${o>0?o:""}" />
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-3)">
          <div class="form-group">
            <label class="form-label" for="pred-remaining">Remaining Semesters</label>
            <input class="form-control" id="pred-remaining" type="number" min="1" max="20"
              placeholder="e.g. 4" />
          </div>
          <div class="form-group">
            <label class="form-label" for="pred-expected">Expected GPA</label>
            <input class="form-control" id="pred-expected" type="number" step="0.01" min="0" max="5"
              placeholder="e.g. 4.50" />
            <p class="form-hint">Per remaining semester</p>
          </div>
        </div>

        <button class="btn btn-primary btn-full" id="predict-btn" style="height:50px">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Calculate Prediction
        </button>
      </div>

      <!-- Results (shown after calculation) -->
      <div id="pred-results" style="margin-top:var(--space-4)"></div>

      <!-- Classification Reference -->
      <div style="padding:0 var(--page-padding);margin-top:var(--space-4);margin-bottom:var(--space-8)">
        <p class="section-title">Classification Reference</p>
        <div style="background:var(--color-white);border:1px solid var(--color-gray-100);border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-sm)">
          ${P.slice(0,5).map((i,r)=>`
            <div style="display:flex;align-items:center;justify-content:space-between;
              padding:var(--space-3) var(--space-4);
              ${r<4?"border-bottom:1px solid var(--color-gray-50)":""}">
              <div style="display:flex;align-items:center;gap:var(--space-2)">
                <div style="width:10px;height:10px;border-radius:50%;background:${i.dot};flex-shrink:0"></div>
                <span style="font-size:var(--font-size-sm);font-weight:600;color:var(--color-gray-800)">${i.label}</span>
              </div>
              <span style="font-size:var(--font-size-sm);font-weight:700;color:${i.color}">${i.min.toFixed(2)} – ${i.max.toFixed(2)}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `,l("#predict-btn",t).addEventListener("click",()=>Ge(t)),s>0&&o>0&&v("Fill in remaining semesters to predict","default",2500)}function Ge(t){var p,g,b,$;const e=parseFloat((p=l("#pred-cgpa",t))==null?void 0:p.value),s=parseInt((g=l("#pred-completed",t))==null?void 0:g.value),o=parseInt((b=l("#pred-remaining",t))==null?void 0:b.value),i=parseFloat(($=l("#pred-expected",t))==null?void 0:$.value);if(isNaN(e)||e<0||e>5){v("Enter a valid current CGPA (0 – 5)","error");return}if(isNaN(s)||s<0){v("Enter valid completed semesters","error");return}if(isNaN(o)||o<1){v("Enter remaining semesters (at least 1)","error");return}if(isNaN(i)||i<0||i>5){v("Enter a valid expected GPA (0 – 5)","error");return}const{projectedCGPA:r,classification:n}=xe({currentCGPA:e,completedSemesters:s,remainingSemesters:o,expectedGPA:i}),a=ke(e,s,o),c=Math.min(r/5*100,100).toFixed(1),d=s+o;h.addPrediction({currentCGPA:e,completedSemesters:s,remainingSemesters:o,expectedGPA:i,projectedCGPA:r});const u=document.getElementById("pred-results");u.innerHTML=`
    <div class="slide-up">
      <!-- Projected CGPA Card -->
      <div class="predictor-result" style="margin:0 var(--page-padding) var(--space-4)">
        <p style="font-size:var(--font-size-sm);opacity:0.8;font-weight:500">Projected CGPA</p>
        <p class="predictor-cgpa">${r.toFixed(2)}</p>
        <div style="display:inline-flex;align-items:center;gap:var(--space-2);
          background:rgb(255 255 255/0.18);padding:0.3rem 0.75rem;border-radius:var(--radius-full);
          font-size:var(--font-size-sm);font-weight:600;margin-top:var(--space-2);backdrop-filter:blur(4px)">
          🎓 ${n.label}
        </div>
        <div style="margin-top:var(--space-4);padding-top:var(--space-4);border-top:1px solid rgb(255 255 255/0.15)">
          <div style="height:6px;background:rgb(255 255 255/0.2);border-radius:var(--radius-full);overflow:hidden">
            <div style="height:100%;width:${c}%;background:var(--color-white);border-radius:var(--radius-full);transition:width 1s ease"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:10px;opacity:0.7;margin-top:var(--space-1)">
            <span>0.00</span><span>2.50</span><span>5.00</span>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3);margin-top:var(--space-4)">
          <div>
            <p style="font-size:10px;opacity:0.7">Current</p>
            <p style="font-size:var(--font-size-base);font-weight:700">${e.toFixed(2)}</p>
          </div>
          <div>
            <p style="font-size:10px;opacity:0.7">Semesters Left</p>
            <p style="font-size:var(--font-size-base);font-weight:700">${o}</p>
          </div>
          <div>
            <p style="font-size:10px;opacity:0.7">Total Semesters</p>
            <p style="font-size:var(--font-size-base);font-weight:700">${d}</p>
          </div>
        </div>
      </div>

      <!-- Recommendations -->
      <div style="padding:0 var(--page-padding)">
        <p class="section-title">Smart Recommendations</p>
        <div style="display:flex;flex-direction:column;gap:var(--space-3)">
          ${a.length===0?`
            <div class="recommendation-card">
              <div class="rec-icon" style="background:var(--color-primary-bg);color:var(--color-primary)">✓</div>
              <p class="rec-text">Add remaining semesters data for personalized recommendations.</p>
            </div>
          `:a.map(m=>`
            <div class="recommendation-card">
              <div class="rec-icon" style="background:${m.color}18;color:${m.color};font-size:16px">${m.icon}</div>
              <div>
                <p class="rec-text">${m.message}</p>
                <span style="font-size:var(--font-size-xs);font-weight:600;color:${m.color};margin-top:4px;display:block">
                  ${m.type==="achievable"?"✓ Within reach":m.type==="stretch"?"↑ Requires improvement":"✗ Not achievable"}
                </span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Needed GPA Table -->
      <div style="padding:var(--space-4) var(--page-padding) 0">
        <p class="section-title">Required GPA per Remaining Semester</p>
        <div style="background:var(--color-white);border:1px solid var(--color-gray-100);border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-sm)">
          ${P.slice(0,4).map((m,x)=>{const w=o>0?(m.min*d-e*s)/o:null,_=w!==null&&w>=0&&w<=5,y=w===null?"N/A":w<0?"Already achieved":w>5?"Not possible":w.toFixed(2);return`
              <div style="display:flex;align-items:center;justify-content:space-between;
                padding:var(--space-3) var(--space-4);
                ${x<3?"border-bottom:1px solid var(--color-gray-50)":""}">
                <div style="display:flex;align-items:center;gap:var(--space-2)">
                  <div style="width:8px;height:8px;border-radius:50%;background:${m.dot}"></div>
                  <span style="font-size:var(--font-size-sm);color:var(--color-gray-700);font-weight:500">${m.label}</span>
                </div>
                <span style="font-size:var(--font-size-sm);font-weight:700;color:${_?m.color:"var(--color-gray-400)"}">
                  ${y}
                </span>
              </div>
            `}).join("")}
        </div>
      </div>
    </div>
  `,u.scrollIntoView({behavior:"smooth",block:"start"}),v("Prediction calculated","success")}function de(t){var u,p;const{profile:e,semesters:s}=h.get(),{cgpa:o,totalUnits:i}=R(s),r=L(o),n=U((e==null?void 0:e.name)||"");t.innerHTML=`
    <div class="fade-in">
      <!-- Header -->
      <div class="page-header">
        <div class="page-header-inner">
          <h1 class="page-title">Profile</h1>
          <button class="btn btn-secondary btn-sm" id="edit-profile-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit
          </button>
        </div>
      </div>

      <!-- Profile Hero -->
      <div class="profile-hero">
        <div class="profile-avatar-large">${n||"👤"}</div>
        <div style="text-align:center">
          <p class="profile-full-name">${(e==null?void 0:e.name)||"Student"}</p>
          <p class="profile-university">${(e==null?void 0:e.university)||"—"}</p>
          ${e!=null&&e.department?`<p style="font-size:var(--font-size-xs);color:var(--color-gray-400);margin-top:2px">${e.department}${e.faculty?` · ${e.faculty}`:""}</p>`:""}
          ${e!=null&&e.level?`
            <span class="badge badge-success" style="margin-top:var(--space-2)">Level ${e.level}</span>
          `:""}
        </div>
      </div>

      <!-- Academic Summary -->
      <div style="padding:var(--space-5) var(--page-padding) 0">
        <p class="section-title">Academic Summary</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3)">
          <div style="background:var(--color-primary-bg);border-radius:var(--radius-xl);padding:var(--space-4);text-align:center;border:1px solid var(--color-primary-lighter)">
            <p style="font-size:var(--font-size-2xl);font-weight:800;color:var(--color-primary-darker);letter-spacing:-0.03em">${o.toFixed(2)}</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-primary-dark);font-weight:600">CGPA</p>
          </div>
          <div style="background:var(--color-info-bg);border-radius:var(--radius-xl);padding:var(--space-4);text-align:center;border:1px solid #bfdbfe">
            <p style="font-size:var(--font-size-2xl);font-weight:800;color:#1e40af;letter-spacing:-0.03em">${s.length}</p>
            <p style="font-size:var(--font-size-xs);color:#1e40af;font-weight:600">Semesters</p>
          </div>
          <div style="background:var(--color-warning-bg);border-radius:var(--radius-xl);padding:var(--space-4);text-align:center;border:1px solid #fde68a">
            <p style="font-size:var(--font-size-2xl);font-weight:800;color:#92400e;letter-spacing:-0.03em">${i}</p>
            <p style="font-size:var(--font-size-xs);color:#92400e;font-weight:600">Units</p>
          </div>
        </div>
        ${o>0?`
          <div style="margin-top:var(--space-3);padding:var(--space-3) var(--space-4);
            background:${r.dot}10;border:1px solid ${r.dot}30;
            border-radius:var(--radius-lg);text-align:center">
            <span style="font-size:var(--font-size-sm);font-weight:700;color:${r.color}">
              🎓 ${r.label}
            </span>
          </div>
        `:""}
      </div>

      <!-- Profile Details -->
      <div id="profile-view" style="padding:var(--space-5) var(--page-padding) 0">
        <p class="section-title">Personal Information</p>
        <div style="background:var(--color-white);border:1px solid var(--color-gray-100);border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-sm)">
          ${D("Full Name",(e==null?void 0:e.name)||"—","user")}
          ${D("University",(e==null?void 0:e.university)||"—","building")}
          ${D("Faculty",(e==null?void 0:e.faculty)||"—","book")}
          ${D("Department",(e==null?void 0:e.department)||"—","layers")}
          ${D("Current Level",e!=null&&e.level?`${e.level} Level`:"—","award",!0)}
        </div>
      </div>

      <!-- Edit Form (hidden by default) -->
      <div id="profile-edit" style="padding:var(--space-5) var(--page-padding) 0;display:none">
        <p class="section-title">Edit Information</p>
        <div style="display:flex;flex-direction:column;gap:var(--space-4)">
          <div class="form-group">
            <label class="form-label" for="ep-name">Full Name <span style="color:var(--color-danger)">*</span></label>
            <input class="form-control" id="ep-name" value="${(e==null?void 0:e.name)||""}" placeholder="Your full name" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ep-uni">University <span style="color:var(--color-danger)">*</span></label>
            <input class="form-control" id="ep-uni" value="${(e==null?void 0:e.university)||""}" placeholder="Your university" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ep-faculty">Faculty</label>
            <input class="form-control" id="ep-faculty" value="${(e==null?void 0:e.faculty)||""}" placeholder="e.g. Engineering" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ep-dept">Department</label>
            <input class="form-control" id="ep-dept" value="${(e==null?void 0:e.department)||""}" placeholder="e.g. Computer Science" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ep-level">Current Level</label>
            <select class="form-control" id="ep-level">
              <option value="">Select level</option>
              ${[100,200,300,400,500,600].map(g=>`<option value="${g}" ${(e==null?void 0:e.level)==g?"selected":""}>${g} Level</option>`).join("")}
            </select>
          </div>
          <div style="display:flex;gap:var(--space-3)">
            <button class="btn btn-ghost" id="cancel-edit-btn" style="flex:1">Cancel</button>
            <button class="btn btn-primary" id="save-profile-btn" style="flex:2">Save Changes</button>
          </div>
        </div>
      </div>

      <div style="height:var(--space-8)"></div>
    </div>
  `;const a=l("#edit-profile-btn",t),c=l("#profile-view",t),d=l("#profile-edit",t);a.addEventListener("click",()=>{c.style.display="none",d.style.display="block",a.style.display="none",d.scrollIntoView({behavior:"smooth"})}),(u=l("#cancel-edit-btn",t))==null||u.addEventListener("click",()=>{c.style.display="block",d.style.display="none",a.style.display=""}),(p=l("#save-profile-btn",t))==null||p.addEventListener("click",()=>{const g=l("#ep-name",t).value.trim(),b=l("#ep-uni",t).value.trim();if(!g){v("Name is required","error");return}if(!b){v("University is required","error");return}h.setProfile({name:g,university:b,faculty:l("#ep-faculty",t).value.trim(),department:l("#ep-dept",t).value.trim(),level:l("#ep-level",t).value}),v("Profile updated","success"),de(t)})}function D(t,e,s,o=!1){return`
    <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-4);
      ${o?"":"border-bottom:1px solid var(--color-gray-50)"}">
      <div style="width:36px;height:36px;border-radius:var(--radius-md);background:var(--color-gray-50);
        display:flex;align-items:center;justify-content:center;color:var(--color-gray-400);flex-shrink:0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${{user:'<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',building:'<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',award:'<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>'}[s]||""}</svg>
      </div>
      <div>
        <p style="font-size:var(--font-size-xs);color:var(--color-gray-400);font-weight:500">${t}</p>
        <p style="font-size:var(--font-size-sm);font-weight:600;color:var(--color-gray-800);margin-top:1px">${e}</p>
      </div>
    </div>
  `}function Ie(t,e){te(),t.reset(),e.go("#/onboarding")}function De(){const t=h.exportJSON(),e=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(e),o=document.createElement("a");o.href=s,o.download=`cgpa-data-${new Date().toISOString().split("T")[0]}.json`,o.click(),URL.revokeObjectURL(s)}function je(t){return new Promise(e=>{const s=new FileReader;s.onload=o=>{const i=h.importJSON(o.target.result);e(i)},s.onerror=()=>e(!1),s.readAsText(t)})}async function Te(){var u;const{default:t}=await J(async()=>{const{default:p}=await import("./jspdf.es.min-D4xeYeW6.js").then(g=>g.j);return{default:p}},[]),{profile:e,semesters:s}=h.get(),{cgpa:o,totalUnits:i,totalQualityPoints:r}=R(s),n=L(o),a=new t({orientation:"portrait",unit:"mm",format:"a4"}),c=a.internal.pageSize.getWidth();a.setFillColor(22,163,74),a.rect(0,0,c,40,"F"),a.setTextColor(255,255,255),a.setFontSize(22),a.setFont("helvetica","bold"),a.text("CGPA Calculator",20,18),a.setFontSize(11),a.setFont("helvetica","normal"),a.text("Academic Performance Report",20,28),a.text(new Date().toLocaleDateString("en-NG",{dateStyle:"long"}),c-20,28,{align:"right"}),a.setTextColor(31,41,55);let d=55;e&&(a.setFontSize(16),a.setFont("helvetica","bold"),a.text(e.name||"Student",20,d),d+=8,a.setFontSize(10),a.setFont("helvetica","normal"),a.setTextColor(107,114,128),e.university&&a.text(e.university,20,d),d+=6,e.department&&a.text(`${e.department} · ${e.faculty||""}`,20,d),d+=6,e.level&&a.text(`Level ${e.level}`,20,d),d+=10),a.setFillColor(240,253,244),a.roundedRect(15,d,c-30,30,4,4,"F"),a.setTextColor(22,101,52),a.setFontSize(28),a.setFont("helvetica","bold"),a.text(`${o.toFixed(2)}`,35,d+20),a.setFontSize(11),a.setFont("helvetica","normal"),a.text("CGPA",35,d+27),a.setFontSize(14),a.setFont("helvetica","bold"),a.text(n.label,80,d+18),a.setFontSize(10),a.setFont("helvetica","normal"),a.setTextColor(107,114,128),a.text(`${i} total units · ${r} quality points`,80,d+26),d+=40,a.setTextColor(31,41,55),a.setFontSize(13),a.setFont("helvetica","bold"),a.text("Semester Records",20,d),d+=8,s.forEach(p=>{var $,m;const g=($=p.courses)==null?void 0:$.reduce((x,w)=>{var y;const _={A:5,B:4,C:3,D:2,E:1,F:0}[(y=w.grade)==null?void 0:y.toUpperCase()]??0;return{qp:x.qp+_*w.units,u:x.u+parseInt(w.units)}},{qp:0,u:0}),b=g.u?(g.qp/g.u).toFixed(2):"0.00";d>260&&(a.addPage(),d=20),a.setFillColor(249,250,251),a.roundedRect(15,d,c-30,8,2,2,"F"),a.setFontSize(10),a.setFont("helvetica","bold"),a.setTextColor(31,41,55),a.text(`${p.semester} Semester ${p.year}`,20,d+5.5),a.text(`GPA: ${b}`,c-25,d+5.5,{align:"right"}),d+=12,(m=p.courses)==null||m.forEach(x=>{a.setFont("helvetica","normal"),a.setTextColor(107,114,128),a.setFontSize(9),a.text(`  ${x.code||"Course"} — ${x.units} units — Grade ${x.grade}`,20,d),d+=6}),d+=4}),a.save(`cgpa-report-${((u=e==null?void 0:e.name)==null?void 0:u.replace(/\s+/g,"-"))||"student"}.pdf`)}async function Ne(){const{default:t}=await J(async()=>{const{default:r}=await import("./html2canvas.esm-CBrSDip1.js");return{default:r}},[]),e=document.getElementById("page-content"),o=(await t(e,{scale:2,backgroundColor:"#f9fafb",logging:!1})).toDataURL("image/png"),i=document.createElement("a");i.href=o,i.download=`cgpa-dashboard-${new Date().toISOString().split("T")[0]}.png`,i.click()}function He(t){const{profile:e,settings:s,semesters:o}=h.get(),i="1.0.0";t.innerHTML=`
    <div class="fade-in">
      <!-- Header -->
      <div class="page-header">
        <div class="page-header-inner">
          <h1 class="page-title">Settings</h1>
        </div>
      </div>

      <!-- Profile Quick View -->
      <div style="padding:var(--space-4) var(--page-padding);background:var(--color-white);
        border-bottom:1px solid var(--color-gray-100);cursor:pointer"
        onclick="window.location.hash='#/profile'">
        <div style="display:flex;align-items:center;gap:var(--space-3)">
          <div style="width:48px;height:48px;border-radius:50%;background:var(--color-primary-bg);
            border:2px solid var(--color-primary-lighter);display:flex;align-items:center;justify-content:center;
            font-size:var(--font-size-base);font-weight:800;color:var(--color-primary-darker)">
            ${U((e==null?void 0:e.name)||"")||"👤"}
          </div>
          <div>
            <p style="font-size:var(--font-size-base);font-weight:700;color:var(--color-gray-900)">${(e==null?void 0:e.name)||"Student"}</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-gray-400)">${(e==null?void 0:e.university)||"—"}</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:auto;color:var(--color-gray-300)"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>

      <!-- Data Section -->
      <div style="margin-top:var(--space-4)">
        <p class="section-title" style="padding:0 var(--page-padding);margin-bottom:var(--space-2)">Data & Export</p>
        <div class="settings-list">
          ${z("export-json","#22c55e",Ue,"Export as JSON","Download all your data","green")}
          ${z("export-pdf","#2563eb",Re,"Export as PDF","Generate academic report","blue")}
          ${z("export-png","#7c3aed",qe,"Export as Image","Screenshot your dashboard","purple")}
          ${z("import-data","#d97706",Qe,"Import Data","Restore from JSON backup","orange")}
        </div>
      </div>

      <!-- App Section -->
      <div style="margin-top:var(--space-4)">
        <p class="section-title" style="padding:0 var(--page-padding);margin-bottom:var(--space-2)">App</p>
        <div class="settings-list">
          ${z("view-profile","#16a34a",Ve,"Edit Profile","Update your information","green")}
          ${z("about-app","#6b7280",Ye,"About App",`Version ${i} · CGPA Calculator`,"gray")}
          ${z("privacy","#6b7280",Je,"Privacy","How your data is stored","gray")}
        </div>
      </div>

      <!-- Danger Zone -->
      <div style="margin:var(--space-6) var(--page-padding) var(--space-4)">
        <div class="danger-zone">
          <div class="danger-zone-header">
            <p class="danger-zone-title">⚠️ Danger Zone</p>
          </div>
          <div style="padding:var(--space-4)">
            <p style="font-size:var(--font-size-sm);color:var(--color-gray-600);margin-bottom:var(--space-4);line-height:1.6">
              Resetting your account will permanently delete all academic records, semester data, predictions, and profile information. This action cannot be undone.
            </p>
            <button class="btn btn-danger btn-full" id="reset-account-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              Reset Account
            </button>
          </div>
        </div>
      </div>

      <!-- Hidden import input -->
      <input type="file" id="import-file-input" accept=".json" style="display:none" />

      <div style="height:var(--space-8)"></div>
    </div>
  `,Oe(t)}function z(t,e,s,o,i,r){const n={green:"var(--color-primary-bg)",blue:"var(--color-info-bg)",purple:"#ede9fe",orange:"var(--color-warning-bg)",gray:"var(--color-gray-100)"},a={green:"var(--color-primary)",blue:"var(--color-info)",purple:"#7c3aed",orange:"var(--color-warning)",gray:"var(--color-gray-500)"};return`
    <div class="settings-item" id="${t}">
      <div class="settings-icon" style="background:${n[r]};color:${a[r]}">
        ${s}
      </div>
      <div class="settings-info">
        <p class="settings-label">${o}</p>
        <p class="settings-desc">${i}</p>
      </div>
      <svg class="settings-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </div>
  `}function Oe(t){var e,s,o,i,r,n,a,c,d;(e=l("#export-json",t))==null||e.addEventListener("click",async()=>{try{De(),v("JSON exported","success")}catch{v("Export failed","error")}}),(s=l("#export-pdf",t))==null||s.addEventListener("click",async()=>{v("Generating PDF…","default");try{await Te(),v("PDF downloaded","success")}catch(u){v("PDF export failed","error"),console.error(u)}}),(o=l("#export-png",t))==null||o.addEventListener("click",async()=>{v("Capturing screen…","default");try{await Ne(),v("Image downloaded","success")}catch{v("Image export failed","error")}}),(i=l("#import-data",t))==null||i.addEventListener("click",()=>{var u;(u=l("#import-file-input",t))==null||u.click()}),(r=l("#import-file-input",t))==null||r.addEventListener("change",async u=>{const p=u.target.files[0];p&&(Q({title:"Import Data",message:"This will <strong>replace all current data</strong> with the imported file. This cannot be undone. Proceed?",confirmLabel:"Import & Replace",confirmClass:"btn-danger",onConfirm:async()=>{await je(p)?(v("Data imported successfully","success"),f.go("#/dashboard")):v("Import failed — invalid file","error")}}),u.target.value="")}),(n=l("#view-profile",t))==null||n.addEventListener("click",()=>f.go("#/profile")),(a=l("#about-app",t))==null||a.addEventListener("click",()=>{O(`
      <h2 class="modal-title">About CGPA Calculator</h2>
      <div style="display:flex;flex-direction:column;gap:var(--space-3)">
        <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-4);background:var(--color-primary-bg);border-radius:var(--radius-xl)">
          <div style="width:52px;height:52px;border-radius:var(--radius-lg);background:var(--color-primary);display:flex;align-items:center;justify-content:center">
            <svg width="28" height="28" viewBox="0 0 64 64" fill="none"><path d="M20 44L32 20L44 44" stroke="white" stroke-width="3" stroke-linecap="round"/><path d="M24 37H40" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>
          </div>
          <div>
            <p style="font-weight:700;color:var(--color-primary-darker)">CGPA Calculator</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-primary-dark)">Version 1.0.0</p>
          </div>
        </div>
        <p style="font-size:var(--font-size-sm);color:var(--color-gray-600);line-height:1.7">
          A progressive web app for Nigerian university students to track, calculate, and predict their Cumulative Grade Point Average using the 5-point grading system.
        </p>
        <p style="font-size:var(--font-size-xs);color:var(--color-gray-400);text-align:center">
          All data stored locally on your device.<br>No account needed. Works offline.
        </p>
      </div>
      <button class="btn btn-primary btn-full mt-3" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Close</button>
    `)}),(c=l("#privacy",t))==null||c.addEventListener("click",()=>{O(`
      <h2 class="modal-title">Privacy Policy</h2>
      <div style="display:flex;flex-direction:column;gap:var(--space-3)">
        ${[["🔒 Local Storage Only","All your academic data — semesters, grades, profile, predictions — is stored exclusively in your browser's localStorage. Nothing is sent to any server."],["📵 No Tracking","We do not collect analytics, usage data, or any personally identifiable information."],["📤 Your Data, Your Control","Export your data anytime as JSON. Delete everything instantly with Account Reset. You are in complete control."],["🌐 Works Offline","Once installed as a PWA, the app works fully offline. No internet connection required to use any feature."]].map(([u,p])=>`
          <div style="padding:var(--space-3);background:var(--color-gray-50);border-radius:var(--radius-lg)">
            <p style="font-size:var(--font-size-sm);font-weight:700;color:var(--color-gray-800);margin-bottom:4px">${u}</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-gray-500);line-height:1.6">${p}</p>
          </div>
        `).join("")}
      </div>
      <button class="btn btn-primary btn-full mt-3" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Got it</button>
    `)}),(d=l("#reset-account-btn",t))==null||d.addEventListener("click",()=>{Q({title:"⚠️ Reset Account",message:"This will permanently delete all academic records and profile information. You will be redirected to onboarding. <br><br><strong>This cannot be undone.</strong>",confirmLabel:"Yes, Reset Everything",confirmClass:"btn-danger",onConfirm:()=>{Ie(h,f),v("Account reset successfully","success")}})})}const Ue='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',Re='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',qe='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',Qe='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',Ve='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',Ye='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',Je='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',We=["#/dashboard","#/calculator","#/history","#/predictor","#/profile"];function E(t){const e=l("#bottom-nav");We.includes(t)?(e.classList.remove("hidden"),ye(e,t)):e.classList.add("hidden")}function Ke(){f.beforeEach(t=>{const{onboardingDone:e}=h.get();return!e&&t!=="#/onboarding"?(f.replace("#/onboarding"),!1):!0}),f.on("#/onboarding",()=>{const t=l("#page-content");t.classList.add("no-nav"),E("#/onboarding"),be(t)}),f.on("#/dashboard",()=>{const t=l("#page-content");t.classList.remove("no-nav"),E("#/dashboard"),$e(t)}),f.on("#/calculator",()=>{const t=l("#page-content");t.classList.remove("no-nav"),E("#/calculator"),ae(t)}),f.on("#/history",()=>{const t=l("#page-content");t.classList.remove("no-nav"),E("#/history"),Ee(t)}),f.on("#/predictor",()=>{const t=l("#page-content");t.classList.remove("no-nav"),E("#/predictor"),Me(t)}),f.on("#/profile",()=>{const t=l("#page-content");t.classList.remove("no-nav"),E("#/profile"),de(t)}),f.on("#/settings",()=>{const t=l("#page-content");t.classList.remove("no-nav"),E("#/settings"),He(t)}),f.on("*",()=>{const{onboardingDone:t}=h.get();f.replace(t?"#/dashboard":"#/onboarding")})}function Ze(){Ke(),l("#app-container").classList.remove("hidden");const{onboardingDone:e}=h.get(),s=window.location.hash;!s||s==="#/"?f.replace(e?"#/dashboard":"#/onboarding"):f.start()}const Xe=1700;function et(){const t=document.getElementById("splash-screen");t&&(t.style.transition="opacity 0.4s ease, transform 0.4s ease",t.style.opacity="0",t.style.transform="scale(1.04)",setTimeout(()=>t.remove(),400))}setTimeout(()=>{et(),Ze()},Xe);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").catch(()=>{})});export{J as _};
