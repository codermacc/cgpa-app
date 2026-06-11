const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jspdf.es.min-C64vflvN.js","assets/typeof-B5XbjTb1.js"])))=>i.map(i=>d[i]);
var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,n)=>{let r={};for(var i in e)t(r,i,{get:e[i],enumerable:!0});return n||t(r,Symbol.toStringTag,{value:`Module`}),r},c=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},l=(n,r,a)=>(a=n==null?{}:e(i(n)),c(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var u=new class{constructor(){this._routes={},this._currentRoute=null,this._beforeEach=null,window.addEventListener(`hashchange`,()=>this._resolve())}on(e,t){return this._routes[e]=t,this}beforeEach(e){return this._beforeEach=e,this}go(e){if(!e.startsWith(`#/`)){console.warn(`Invalid route: ${e}`);return}window.location.hash=e}replace(e){history.replaceState(null,``,e),this._resolve()}current(){return this._currentRoute||`#/`}start(){window.location.hash||(window.location.hash=`#/onboarding`),this._resolve()}_resolve(){let e=window.location.hash||`#/onboarding`,t=this._routes[e]||this._routes[`#/404`]||this._routes[`*`];if(!t){console.error(`No route registered for "${e}"`);return}if(!(this._beforeEach&&this._beforeEach(e,this._currentRoute)===!1)){this._currentRoute=e;try{t(e)}catch(t){console.error(`Router failed for route "${e}"`,t)}}}},d=`cgpa-app`;function f(){try{let e=localStorage.getItem(d);return e?JSON.parse(e):null}catch{return null}}function p(e){try{return localStorage.setItem(d,JSON.stringify(e)),!0}catch{return!1}}function m(){localStorage.removeItem(d)}var h={profile:null,semesters:[],predictions:[],settings:{theme:`light`,gradeScale:5},analytics:{},onboardingDone:!1},g=new class{constructor(){this._state=this._load(),this._listeners=[]}_load(){let e=f();return e?{...h,...e}:{...h}}_persist(){p(this._state)}subscribe(e){return this._listeners.push(e),()=>{this._listeners=this._listeners.filter(t=>t!==e)}}_notify(e){this._listeners.forEach(t=>t(e,this._state))}get(){return this._state}getKey(e){return this._state[e]}setProfile(e){this._state.profile={...this._state.profile,...e},this._persist(),this._notify(`profile`)}completeOnboarding(){this._state.onboardingDone=!0,this._persist(),this._notify(`onboardingDone`)}addSemester(e){let t={id:Date.now().toString(),createdAt:new Date().toISOString(),...e};return this._state.semesters=[...this._state.semesters,t],this._persist(),this._notify(`semesters`),t}updateSemester(e,t){this._state.semesters=this._state.semesters.map(n=>n.id===e?{...n,...t,updatedAt:new Date().toISOString()}:n),this._persist(),this._notify(`semesters`)}deleteSemester(e){this._state.semesters=this._state.semesters.filter(t=>t.id!==e),this._persist(),this._notify(`semesters`)}getSemesters(){return[...this._state.semesters].sort((e,t)=>e.year===t.year?e.semester===`First`?-1:1:e.year-t.year)}addPrediction(e){let t={id:Date.now().toString(),createdAt:new Date().toISOString(),...e};return this._state.predictions=[t,...this._state.predictions].slice(0,20),this._persist(),this._notify(`predictions`),t}setSettings(e){this._state.settings={...this._state.settings,...e},this._persist(),this._notify(`settings`)}reset(){this._state={...h},m(),this._notify(`reset`)}exportJSON(){return JSON.stringify(this._state,null,2)}importJSON(e){try{let t=JSON.parse(e);return this._state={...h,...t},this._persist(),this._notify(`import`),!0}catch{return!1}}},ee=[{route:`#/dashboard`,label:`Home`,icon:`<img src="/public/Home.svg" alt="Home"/>`},{route:`#/calculator`,label:`Calculate`,icon:`<img src="/public/Calculator.svg" alt="Calculator"/>`},{route:`#/history`,label:`History`,icon:`<img src="/public/History1.svg" alt="History"/>`},{route:`#/predictor`,label:`Predict`,icon:`<img src="/public/Predictor.svg" alt="Predictor"/>`},{route:`#/profile`,label:`Profile`,icon:`<img src="/public/Profile.svg" alt="Profile"/>`}];function te(e,t){e.innerHTML=ee.map(e=>`
    <button class="nav-item ${t===e.route?`active`:``}"
            onclick="window.location.hash='${e.route}'"
            aria-label="${e.label}"
            ${t===e.route?`aria-current="page"`:``}>
      <span class="nav-icon-wrap">${e.icon}</span>
      <span>${e.label}</span>
    </button>
  `).join(``)}var _=(e,t=document)=>t.querySelector(e),v=(e,t=document)=>[...t.querySelectorAll(e)];function y(e=``){return e.trim().split(` `).slice(0,2).map(e=>e[0]?.toUpperCase()).join(``)}function b(e,t=`default`,n=3e3){let r=document.getElementById(`toast-container`),i={success:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`,error:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>`,warning:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`,default:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>`},a=document.createElement(`div`);a.className=`toast ${t==="default"?``:t}`,a.innerHTML=`${i[t]||i.default}<span>${e}</span>`,r.appendChild(a),setTimeout(()=>{a.style.animation=`none`,a.style.opacity=`0`,a.style.transform=`translateY(-8px) scale(0.95)`,a.style.transition=`all 0.2s ease`,setTimeout(()=>a.remove(),200)},n)}var x=[{eyebrow:`Welcome`,title:`Track Your <span>Academic</span> Journey`,desc:`Monitor your GPA, manage semesters, and stay on top of your academic performance in one place.`,illustration:`
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
      </div>`},{eyebrow:`GPA Tracking`,title:`Monitor Your <span>Progress</span> Over Time`,desc:`Add courses each semester, see your GPA calculated instantly, and watch your CGPA grow with every achievement.`,illustration:`
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
      </div>`},{eyebrow:`Smart Prediction`,title:`Predict Your <span>Final CGPA</span>`,desc:`Use our intelligent predictor to forecast your graduation CGPA and get personalized recommendations to achieve your target class.`,illustration:`
      <div class="illustration-circle">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" class="illustration-icon">
          <circle cx="50" cy="50" r="32" stroke="#bbf7d0" stroke-width="8"/>
          <circle cx="50" cy="50" r="32" stroke="#16a34a" stroke-width="8" stroke-dasharray="140 60" stroke-linecap="round" transform="rotate(-90 50 50)"/>
          <text x="50" y="46" text-anchor="middle" font-size="14" font-weight="700" fill="#166534">4.62</text>
          <text x="50" y="58" text-anchor="middle" font-size="8" fill="#6b7280">Projected</text>
        </svg>
        <div class="float-card top-right">First Class 🏆</div>
        <div class="float-card bottom-left">3 sems left</div>
      </div>`}],S=0;function ne(e){S=0,C(e,S)}function C(e,t){let n=x[t],r=t===x.length-1;e.innerHTML=`
    <div class="onboarding-container fade-in">
      <div class="onboarding-progress">
        <div class="progress-dots">
          ${x.map((e,n)=>`
            <div class="progress-dot ${n===t?`active`:n<t?`done`:``}"></div>
          `).join(``)}
          <div class="progress-dot ${t>=x.length?`active`:``}"></div>
        </div>
        <button class="skip-btn" id="skip-btn">Skip</button>
      </div>

      <div class="onboarding-slide">
        <div class="illustration-wrap">${n.illustration}</div>
        <div class="slide-text">
          <p class="slide-eyebrow">${n.eyebrow}</p>
          <h1 class="slide-title">${n.title}</h1>
          <p class="slide-desc">${n.desc}</p>
        </div>
      </div>

      <div class="onboarding-footer">
        <button class="btn btn-primary btn-full" id="next-btn">
          ${r?`Set Up Profile`:`Continue`}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        ${t>0?`<button class="btn btn-ghost btn-full" id="back-btn">Back</button>`:``}
      </div>
    </div>
  `,_(`#next-btn`,e).addEventListener(`click`,()=>{r?w(e):(S++,C(e,S))}),_(`#skip-btn`,e)?.addEventListener(`click`,()=>w(e)),_(`#back-btn`,e)?.addEventListener(`click`,()=>{S--,C(e,S)})}function w(e){e.innerHTML=`
    <div class="onboarding-container fade-in">
      <div class="onboarding-progress">
        <div class="progress-dots">
          ${x.map(()=>`<div class="progress-dot done"></div>`).join(``)}
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
  `;let t=_(`#p-name`,e),n=_(`#avatar-preview`,e),r=_(`#avatar-name-preview`,e);t.addEventListener(`input`,()=>{let e=t.value.trim();n.textContent=y(e)||`👤`,r.textContent=e||`Your Name`}),_(`#save-profile-btn`,e).addEventListener(`click`,()=>{let t=_(`#p-name`,e).value.trim(),n=_(`#p-uni`,e).value.trim();if(!t){b(`Please enter your name`,`error`);return}if(!n){b(`Please enter your university`,`error`);return}g.setProfile({name:t,university:n,faculty:_(`#p-faculty`,e).value.trim(),department:_(`#p-dept`,e).value.trim(),level:_(`#p-level`,e).value}),g.completeOnboarding(),b(`Welcome, ${t.split(` `)[0]}! 🎉`,`success`),u.go(`#/dashboard`)}),_(`#back-to-slides-btn`,e).addEventListener(`click`,()=>{C(e,x.length-1)})}var T={A:5,B:4,C:3,D:2,E:1,F:0},E={A:{bg:`#f0fdf4`,text:`#166534`},B:{bg:`#eff6ff`,text:`#1e40af`},C:{bg:`#fffbeb`,text:`#92400e`},D:{bg:`#fff7ed`,text:`#9a3412`},E:{bg:`#fef2f2`,text:`#991b1b`},F:{bg:`#fef2f2`,text:`#7f1d1d`}},D=[{label:`First Class`,min:4.5,max:5,color:`#16a34a`,dot:`#16a34a`},{label:`Second Class Upper`,min:3.5,max:4.49,color:`#2563eb`,dot:`#2563eb`},{label:`Second Class Lower`,min:2.4,max:3.49,color:`#d97706`,dot:`#d97706`},{label:`Third Class`,min:1.5,max:2.39,color:`#ea580c`,dot:`#ea580c`},{label:`Pass`,min:1,max:1.49,color:`#6b7280`,dot:`#6b7280`},{label:`Fail`,min:0,max:.99,color:`#dc2626`,dot:`#dc2626`}];function O(e){if(!e||e.length===0)return{gpa:0,totalUnits:0,qualityPoints:0};let t=0,n=0;e.forEach(e=>{let r=parseInt(e.units)||0,i=T[e.grade?.toUpperCase()]??0;t+=r,n+=r*i});let r=t>0?n/t:0;return{gpa:parseFloat(r.toFixed(2)),totalUnits:t,qualityPoints:n}}function k(e){if(!e||e.length===0)return{cgpa:0,totalUnits:0,totalQualityPoints:0};let t=0,n=0;e.forEach(e=>{let{totalUnits:r,qualityPoints:i}=O(e.courses||[]);t+=r,n+=i});let r=t>0?n/t:0;return{cgpa:parseFloat(r.toFixed(2)),totalUnits:t,totalQualityPoints:n}}function A(e){return e===0?{label:`No Data Available`,color:`#9ca3af`,dot:`#9ca3af`}:D.find(t=>e>=t.min&&e<=t.max)||D[D.length-1]}function re({currentCGPA:e,completedSemesters:t,remainingSemesters:n,expectedGPA:r}){let i=t+n;if(i===0)return{projectedCGPA:0,classification:A(0),neededGPA:[]};let a=parseFloat(((e*t+r*n)/i).toFixed(2)),o=D.slice(0,4).map(r=>{let a=n>0?(r.min*i-e*t)/n:null;return{...r,needed:a?parseFloat(a.toFixed(2)):null}});return{projectedCGPA:a,classification:A(a),neededGPA:o}}function ie(e){if(!e||e.length===0)return null;let t=e.map(e=>{let{gpa:t}=O(e.courses||[]);return{...e,gpa:t}}),n=t.map(e=>e.gpa),r=n.reduce((e,t)=>e+t,0)/n.length,i=t.reduce((e,t)=>e.gpa>=t.gpa?e:t),a=t.reduce((e,t)=>e.gpa<=t.gpa?e:t),o=null;for(let e=1;e<t.length;e++){let n=t[e].gpa-t[e-1].gpa;(!o||n>o.diff)&&(o={semester:t[e],diff:parseFloat(n.toFixed(2))})}return{bestSemester:i,worstSemester:a,mostImproved:o?.semester,mostImprovedDiff:o?.diff,averageGPA:parseFloat(r.toFixed(2)),trend:t.map(e=>({label:`${e.semester} ${e.year}`,gpa:e.gpa}))}}function ae(e,t,n){let r=[];if(!n)return r;let i=t+n;return D.slice(0,4).forEach(a=>{let o=(a.min*i-e*t)/n;o>=0&&o<=5?r.push({type:o<=e?`achievable`:`stretch`,icon:o<=e?`✓`:`↑`,message:`You need a GPA of ${o.toFixed(2)} in remaining ${n} semester${n>1?`s`:``} to graduate with ${a.label}.`,color:a.color}):o>5&&r.push({type:`unachievable`,icon:`✗`,message:`${a.label} is no longer achievable (would need ${o.toFixed(2)} GPA).`,color:`#6b7280`})}),r}function j({icon:e,title:t,text:n,actionLabel:r,actionId:i}){return`
    <div class="empty-state">
      <div class="empty-icon">${e}</div>
      <p class="empty-title">${t}</p>
      <p class="empty-text">${n}</p>
      ${r?`<button class="btn btn-primary btn-sm mt-3" id="${i||`empty-action`}">${r}</button>`:``}
    </div>
  `}function oe(e){let{profile:t,semesters:n}=g.get(),{cgpa:r,totalUnits:i,totalQualityPoints:a}=k(n),o=A(r),s=ie(n),c=Math.min(r/5*100,100).toFixed(1),l=y(t?.name||``),d=t?.name?.split(` `)[0]||`Student`,f=0;n.forEach(e=>{let{gpa:t}=O(e.courses||[]);t>f&&(f=t)});let p=[...n].sort((e,t)=>t.createdAt?.localeCompare(e.createdAt||``)||0).slice(0,3);e.innerHTML=`
    <div class="fade-in">
      <!-- Header -->
      <div class="dashboard-header" style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <p class="dashboard-greeting">Good ${se()},</p>
          <h1 class="dashboard-name">${d} 👋</h1>
        </div>
        <button onclick="window.location.hash='#/profile'"
          style="width:44px;height:44px;border-radius:50%;background:var(--color-primary-bg);border:2px solid var(--color-primary-lighter);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:var(--color-primary-darker);cursor:pointer;border:none;">
          ${l||`👤`}
        </button>
      </div>

     <div class="cgpa-hero-card slide-up">
  <div class="cgpa-content">
    <div class="cgpa-header">
      <span class="cgpa-label">Current CGPA</span>
    </div>

    <h1 class="cgpa-value">${r.toFixed(2)}</h1>

    <p class="cgpa-classification">
      ${o.label}
    </p>

    <div class="cgpa-progress">
      <div
        class="cgpa-progress-fill"
        style="width:${c}%"
      ></div>
    </div>

    <p class="cgpa-target">
  You are
  <span>${Math.max(4.5-r,0).toFixed(2)}</span>
  away from
  <strong>First Class</strong>
</p>
  </div>

  <div class="cgpa-badge">
  <button href="#/history" class="view-details-btn"> View Details </button>
      <div class="cap-ring" aria-hidden="true">
      <img src="/public/Cap.svg" alt="Graduation Cap"/>
    </div>
  </div>
</div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <p class="section-title">Quick Actions</p>
        <div class="quick-actions-grid">
          <button class="action-item" onclick="window.location.hash='#/calculator'">
            <div class="action-icon">
              <img src="/public/Add.svg" alt="Graduation Cap"/>
            </div>
            <span class="action-label">Add</span>
          </button>
          <button class="action-item" onclick="window.location.hash='#/predictor'">
            <div class="action-icon">
              <img src="/public/Predict.svg" alt="Predict CGPA"/>
            </div>
            <span class="action-label">Predict</span>
          </button>
          <button class="action-item" onclick="window.location.hash='#/history'">
            <div class="action-icon">
              <img src="/public/History.svg" alt="View History"/>
            </div>
            <span class="action-label">History</span>
          </button>
          <button class="action-item" onclick="window.location.hash='#/settings'">
            <div class="action-icon">
              <img src="/public/Share.svg" alt="Settings"/>
            </div>
            <span class="action-label">Share</span>
          </button>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="quick-stats">
        <p class="section-title">Quick Stats</p>
        <div class="stats-grid">
          <div class="stat-card-dashboard">
            <div class="stat-icon" style="background:var(--color-primary-bg);color:var(--color-primary)">
              <img src="/public/Semester.svg" alt="Semester"/>
            </div>
            <p class="stat-card-value">${n.length}</p>
            <p class="stat-card-label">Semesters</p>
          </div>
          <div class="stat-card-dashboard">
            <div class="stat-icon">
              <img src="/public/Units.svg" alt="Units"/>
            </div>
            <p class="stat-card-value">${i}</p>
            <p class="stat-card-label">Total Units</p>
          </div>
          <div class="stat-card-dashboard">
            <div class="stat-icon" >
              <img src="/public/Points.svg" alt="Quality Points"/>
            </div>
            <p class="stat-card-value">${a}</p>
            <p class="stat-card-label">Quality Points</p>
          </div>
          <div class="stat-card-dashboard">
            <div class="stat-icon">
              <img src="/public/Best-semester.svg" alt="Best-semester"/>
            </div>
            <p class="stat-card-value">${f.toFixed(2)}</p>
            <p class="stat-card-label">Best GPA</p>
          </div>
        </div>
      </div>

      <!-- Degree Progress -->
      <div class="degree-progress">
        <p class="section-title">Degree Classification Scale</p>
        <div class="degree-progress-card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-3)">
            <span style="font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);color:var(--color-white)">
              Current: <span style="color:${o.color}">${o.label}</span>
            </span>
            <span style="font-size:var(--font-size-sm);font-weight:var(--font-weight-bold);color:var(--color-gray-300)">${r.toFixed(2)} / 5.00</span>
          </div>
          <div class="progress-bar" style="height:12px;position:relative;background:var(--color-gray-100)">
            <div class="progress-fill" style="width:${c}%;background:${o.color||`var(--color-primary)`}"></div>
          </div>
          <div class="class-ranges">
            ${D.slice(0,5).map(e=>`
              <div class="class-range-item">
                <div class="class-range-dot" style="background:${e.dot}"></div>
                <span class="class-range-name">${e.label}</span>
                <span class="class-range-value">${e.min.toFixed(2)} – ${e.max.toFixed(2)}</span>
              </div>
            `).join(``)}
          </div>
        </div>
      </div>

      <!-- Recent Semesters -->
      <div class="recent-history">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-3)">
          <p class="section-title" style="margin:0">Recent Semesters</p>
          ${n.length>0?`<button onclick="window.location.hash='#/history'" style="font-size:var(--font-size-xs);color:var(--color-primary);font-weight:600;background:none;border:none;cursor:pointer;">View all</button>`:``}
        </div>
        ${p.length===0?`
          ${j({icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>`,title:`No semesters added yet`,text:`Add your first semester to start tracking your CGPA.`,actionLabel:`Add Semester`,actionId:`dash-add-sem`})}
        `:`
          <div style="display:flex;flex-direction:column;gap:var(--space-2)">
            ${p.map(e=>{let{gpa:t}=O(e.courses||[]),n=A(t);return`
                <div class="semester-card" onclick="window.location.hash='#/history'">
                  <div class="semester-info">
                    <p class="semester-name">${e.semester} Semester, ${e.year}</p>
                    <p class="semester-meta">${(e.courses||[]).length} courses · ${e.courses?.reduce((e,t)=>e+parseInt(t.units||0),0)||0} units</p>
                  </div>
                  <div style="text-align:right">
                    <p class="semester-gpa">${t.toFixed(2)}</p>
                    <span class="badge" style="background:${n.dot}18;color:${n.color};font-size:10px;">${n.label}</span>
                  </div>
                </div>
              `}).join(``)}
          </div>
        `}
      </div>

      <!-- Insights (if data exists) -->
      ${s?`
      <div style="padding:0 var(--page-padding);margin-bottom:var(--space-5)">
        <p class="section-title">Academic Insights</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
          <div class="stat-card-dashboard">
            <p class="stat-card-label">Best Semester</p>
            <p class="stat-card-value" style="font-size:var(--font-size-base)">${s.bestSemester?.semester} ${s.bestSemester?.year}</p>
            <p style="font-size:var(--font-size-sm);color:var(--color-primary);font-weight:600">GPA: ${s.bestSemester?.gpa?.toFixed(2)}</p>
          </div>
          <div class="stat-card-dashboard">
            <p class="stat-card-label">Average GPA</p>
            <p class="stat-card-value">${s.averageGPA.toFixed(2)}</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-gray-400)">across all semesters</p>
          </div>
        </div>
      </div>
      `:``}

      <div style="height:var(--space-6)"></div>
    </div>
  `;let m=document.getElementById(`dash-add-sem`);m&&m.addEventListener(`click`,()=>u.go(`#/calculator`))}function se(){let e=new Date().getHours();return e<12?`morning`:e<17?`afternoon`:`evening`}var M=()=>document.getElementById(`modal-overlay`);function N(e,t={}){let n=M();n.innerHTML=`
    <div class="modal ${t.center?`center-modal`:``}">
      <div class="modal-handle"></div>
      ${e}
    </div>
  `,n.classList.remove(`hidden`),t.center?n.classList.add(`center`):n.classList.remove(`center`),n.addEventListener(`click`,e=>{e.target===n&&(P(),t.onClose?.())},{once:!0})}function P(){let e=M();e.classList.add(`hidden`),e.innerHTML=``}function F({title:e,message:t,confirmLabel:n=`Confirm`,confirmClass:r=`btn-primary`,onConfirm:i,onCancel:a}){N(`
    <h2 class="modal-title">${e}</h2>
    <p style="font-size:var(--font-size-sm);color:var(--color-gray-600);line-height:1.6;">${t}</p>
    <div class="modal-actions">
      <button class="btn btn-ghost" id="modal-cancel">Cancel</button>
      <button class="btn ${r}" id="modal-confirm">${n}</button>
    </div>
  `,{center:!0}),document.getElementById(`modal-cancel`).addEventListener(`click`,()=>{P(),a?.()}),document.getElementById(`modal-confirm`).addEventListener(`click`,()=>{P(),i?.()})}var ce=s({renderCalculator:()=>R}),I=[{code:``,units:``,grade:``}],L=null;function R(e,t=null){L=t;let n=t?g.getSemesters().find(e=>e.id===t):null;I=n?n.courses.map(e=>({...e})):[{code:``,units:``,grade:``}],e.innerHTML=`
    <div class="fade-in">
      <!-- Header -->
      <div class="page-header" style="background:var(--color-surface); flex-direction:column; gap:var(--space-1);">
        <div class="page-header-inner">
          <div>
            <h1 class="page-title" style="color:var(--color-white)">${L?`Edit Semester`:`Add Semester`}</h1>
            <p class="page-subtitle">Enter your courses and grades</p>
          </div>
          <button class="btn-icon" style="background:var(--color-white); color:var(--color-white)" id="calc-help-btn" aria-label="Grade scale">
            <img src="/public/Add-Sem.svg" alt="Info"/>
          </button>
        </div>
      </div>

      <!-- Semester Info -->
      <div style="padding:var(--space-4) var(--page-padding) 0">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
          <div class="form-group">
            <label class="form-label" style="color:var(--color-white)" for="sem-type">Semester <span style="color:var(--color-danger)">*</span></label>
            <select class="form-control" id="sem-type">
              <option value="">Select</option>
              <option value="First" ${n?.semester===`First`?`selected`:``}>First</option>
              <option value="Second" ${n?.semester===`Second`?`selected`:``}>Second</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" style="color:var(--color-white)" for="sem-year">Year / Session <span style="color:var(--color-danger)">*</span></label>
            <input class="form-control" id="sem-year" type="text"
              placeholder="e.g. 2024"
              value="${n?.year||``}" />
          </div>
        </div>
      </div>

      <!-- Live Result Card -->
      <div style="padding:var(--space-4) var(--page-padding);">
        <div class="result-card" style="background:
    radial-gradient(circle at 70% 45%, rgba(0, 230, 118, 0.18), transparent 40%),
    var(--color-primary-bg); border-radius:var(--radius-lg); margin-top:var(--space-4); id="result-card">
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
          <span id="course-count" style="font-size:var(--font-size-xs);color:var(--color-gray-300);font-weight:500">
            ${I.length} course${I.length===1?``:`s`}
          </span>
        </div>

        <div id="courses-container" style="display:flex;flex-direction:column;gap:var(--space-3)">
          ${I.map((e,t)=>z(e,t)).join(``)}
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
          ${L?`Update Semester`:`Save Semester`}
        </button>
        ${L?`<button class="btn btn-ghost btn-full mt-3" id="cancel-edit-btn">Cancel</button>`:``}
      </div>
    </div>
  `,B(e),_(`#calc-help-btn`,e).addEventListener(`click`,ue),_(`#save-semester-btn`,e).addEventListener(`click`,()=>le(e)),_(`#cancel-edit-btn`,e)?.addEventListener(`click`,()=>u.go(`#/history`)),_(`#add-course-btn`,e).addEventListener(`click`,()=>{I.push({code:``,units:``,grade:``}),V(e)}),H(e)}function z(e,t){let n=Object.keys(T).map(t=>`<option value="${t}" ${e.grade===t?`selected`:``}>${t} (${T[t]} pts)</option>`).join(``);return`
    <div class="course-row" data-index="${t}">
      <div class="course-row-header">
        <div class="course-number">${t+1}</div>
        ${I.length>1?`
          <button class="delete-course-btn" data-delete="${t}" aria-label="Remove course">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        `:``}
      </div>
      <div class="course-row-fields">
        <div class="form-group">
          <input class="form-control" type="text" placeholder="Course code"
            value="${e.code||``}" data-field="code" data-index="${t}"
            style="font-size:var(--font-size-xs);text-transform:uppercase" />
        </div>
        <div class="form-group">
          <select class="form-control" data-field="units" data-index="${t}">
            <option value="">Units</option>
            ${[1,2,3,4,5,6].map(t=>`<option value="${t}" ${parseInt(e.units)===t?`selected`:``}>${t}</option>`).join(``)}
          </select>
        </div>
        <div class="form-group">
          <select class="form-control" data-field="grade" data-index="${t}"
            style="background-color:${e.grade?E[e.grade]?.bg:``}">
            <option value="">Grade</option>
            ${n}
          </select>
        </div>
      </div>
    </div>
  `}function B(e){let t=_(`#courses-container`,e);t.addEventListener(`input`,t=>{let{field:n,index:r}=t.target.dataset;if(n&&r!==void 0){let i=t.target.value;I[r][n]=n===`code`?i.toUpperCase():i,n===`grade`&&(t.target.style.backgroundColor=i?E[i]?.bg:``),H(e)}}),t.addEventListener(`click`,t=>{let n=t.target.closest(`[data-delete]`);if(n){let t=parseInt(n.dataset.delete);I.splice(t,1),V(e)}})}function V(e){let t=_(`#courses-container`,e);t.innerHTML=I.map((e,t)=>z(e,t)).join(``);let n=_(`#course-count`,e);n&&(n.textContent=`${I.length} course${I.length===1?``:`s`}`),B(e),H(e)}function H(e){let{gpa:t,totalUnits:n,qualityPoints:r}=O(I),{totalUnits:i,totalQualityPoints:a}=g.getSemesters().filter(e=>e.id!==L).reduce((e,t)=>{let n=O(t.courses||[]);return{totalUnits:e.totalUnits+n.totalUnits,totalQualityPoints:e.totalQualityPoints+n.qualityPoints}},{totalUnits:0,totalQualityPoints:0}),o=i+n>0?(a+r)/(i+n):0,s=A(o),c=_(`#live-gpa`,e),l=_(`#live-cgpa`,e),u=_(`#live-units`,e),d=_(`#live-qp`,e),f=_(`#live-class`,e);c&&(c.textContent=t.toFixed(2)),l&&(l.textContent=o>0?o.toFixed(2):`–`),u&&(u.textContent=n),d&&(d.textContent=r),f&&(f.textContent=o>0?s.label:`–`)}function le(e){let t=_(`#sem-type`,e)?.value,n=_(`#sem-year`,e)?.value?.trim();if(!t){b(`Please select a semester (First/Second)`,`error`);return}if(!n){b(`Please enter the year/session`,`error`);return}let r=I.filter(e=>e.units&&e.grade);if(r.length===0){b(`Add at least one course with units and grade`,`error`);return}let i={semester:t,year:n,courses:r};L?(g.updateSemester(L,i),b(`Semester updated successfully`,`success`)):(g.addSemester(i),b(`Semester saved successfully! 🎉`,`success`)),u.go(`#/history`)}function ue(){N(`
    <h2 class="modal-title">Grade Scale (5-Point)</h2>
    <div style="display:flex;flex-direction:column;gap:var(--space-2)">
      ${Object.entries(T).map(([e,t])=>`
        <div style="display:flex;align-items:center;justify-content:space-between;
          padding:var(--space-3) var(--space-4);
          border-radius:var(--radius-lg);
          background:${E[e].bg}">
          <span style="font-size:var(--font-size-base);font-weight:700;color:${E[e].text}">Grade ${e}</span>
          <span style="font-size:var(--font-size-sm);color:${E[e].text};font-weight:600">${t} point${t===1?``:`s`}</span>
        </div>
      `).join(``)}
    </div>
    <div style="margin-top:var(--space-4);padding:var(--space-3);background:var(--color-gray-50);border-radius:var(--radius-lg)">
      <p style="font-size:var(--font-size-xs);color:var(--color-gray-500);line-height:1.6">
        GPA = Total Quality Points ÷ Total Credit Units<br>
        Quality Points = Grade Point × Credit Units per course
      </p>
    </div>
    <button class="btn btn-primary btn-full mt-3" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Got it</button>
  `)}var de=`modulepreload`,fe=function(e){return`/`+e},U={},W=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=fe(t,n),t in U)return;U[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:de,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},G=``,K=`newest`;function pe(e){G=``,K=`newest`,e.innerHTML=`
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
        ${q(e)}
      </div>

      <div style="height:var(--space-6)"></div>
    </div>
  `,ge(e)}function q(){let e=g.getSemesters();if(G){let t=G.toLowerCase();e=e.filter(e=>e.semester?.toLowerCase().includes(t)||String(e.year).includes(t)||e.courses?.some(e=>e.code?.toLowerCase().includes(t)))}let t=document.querySelector(`.filter-chip.active[data-filter]`)?.dataset.filter;t&&t!==`all`&&(e=e.filter(e=>e.semester===t)),e=he(e,K);let n=document.getElementById(`history-subtitle`);return n&&(n.textContent=`${e.length} semester${e.length===1?``:`s`} found`),e.length===0?j({icon:`<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>`,title:G?`No results found`:`No semesters yet`,text:G?`No semester matches "${G}"`:`Add your first semester to start building your academic history.`,actionLabel:G?null:`Add Semester`,actionId:`hist-add-sem`}):e.map(e=>me(e)).join(``)}function me(e){let{gpa:t,totalUnits:n,qualityPoints:r}=O(e.courses||[]),i=A(t),a=e.courses||[];return`
    <div class="semester-detail-card" data-id="${e.id}">
      <div class="semester-detail-header">
        <div style="flex:1">
          <p style="font-size:var(--font-size-base);font-weight:700;color:var(--color-gray-900)">
            ${e.semester} Semester, ${e.year}
          </p>
          <p style="font-size:var(--font-size-xs);color:var(--color-gray-400);margin-top:2px">
            ${a.length} course${a.length===1?``:`s`} · ${n} units · ${r} QP
          </p>
        </div>
        <div style="display:flex;align-items:flex-start;gap:var(--space-3)">
          <div style="text-align:right">
            <p style="font-size:var(--font-size-xl);font-weight:800;color:${i.color};letter-spacing:-0.02em">${t.toFixed(2)}</p>
            <span class="badge" style="background:${i.dot}18;color:${i.color};font-size:10px">${i.label}</span>
          </div>
          <div class="semester-detail-actions">
            <button class="btn-icon edit-sem-btn" data-id="${e.id}" title="Edit semester" style="width:32px;height:32px">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="btn-icon delete-sem-btn" data-id="${e.id}" title="Delete semester"
              style="width:32px;height:32px;background:var(--color-danger-bg);color:var(--color-danger)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Courses list -->
      <div class="semester-courses">
        ${a.map(e=>{let t={A:5,B:4,C:3,D:2,E:1,F:0}[e.grade?.toUpperCase()]??0,n=E[e.grade?.toUpperCase()]||{bg:`#f3f4f6`,text:`#374151`};return`
            <div class="course-item">
              <div style="flex:1">
                <p class="course-code">${e.code||`—`}</p>
                <p class="course-units">${e.units} unit${parseInt(e.units)===1?``:`s`} · ${t*parseInt(e.units)} QP</p>
              </div>
              <span class="course-grade-badge" style="background:${n.bg};color:${n.text}">${e.grade}</span>
            </div>
          `}).join(``)}
      </div>
    </div>
  `}function he(e,t){return[...e].sort((e,n)=>{if(t===`newest`)return new Date(n.createdAt||0)-new Date(e.createdAt||0);if(t===`oldest`)return new Date(e.createdAt||0)-new Date(n.createdAt||0);if(t===`gpa-high`){let t=O(e.courses||[]).gpa;return O(n.courses||[]).gpa-t}return t===`gpa-low`?O(e.courses||[]).gpa-O(n.courses||[]).gpa:0})}function J(){let e=document.getElementById(`semester-list`);if(e){e.innerHTML=q(),Y(e);let t=document.getElementById(`hist-add-sem`);t&&t.addEventListener(`click`,()=>u.go(`#/calculator`))}}function ge(e){_(`#history-search`,e)?.addEventListener(`input`,e=>{G=e.target.value.trim(),J()}),e.addEventListener(`click`,t=>{let n=t.target.closest(`.filter-chip`);n&&(n.dataset.filter&&(v(`.filter-chip[data-filter]`,e).forEach(e=>e.classList.remove(`active`)),n.classList.add(`active`),J()),n.dataset.sort&&(v(`.filter-chip[data-sort]`,e).forEach(e=>e.classList.remove(`active`)),n.classList.add(`active`),K=n.dataset.sort,J()))}),Y(document.getElementById(`semester-list`));let t=document.getElementById(`hist-add-sem`);t&&t.addEventListener(`click`,()=>u.go(`#/calculator`))}function Y(e){e&&(e.querySelectorAll(`.edit-sem-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.id;W(async()=>{let{renderCalculator:e}=await Promise.resolve().then(()=>ce);return{renderCalculator:e}},void 0).then(({renderCalculator:e})=>{e(document.getElementById(`page-content`),n)})})}),e.querySelectorAll(`.delete-sem-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=e.dataset.id,r=g.getSemesters().find(e=>e.id===n);F({title:`Delete Semester`,message:`Delete <strong>${r?.semester} Semester ${r?.year}</strong>? This will recalculate your CGPA and cannot be undone.`,confirmLabel:`Delete`,confirmClass:`btn-danger`,onConfirm:()=>{g.deleteSemester(n),b(`Semester deleted`,`success`),J()}})})}))}function _e(e){let{semesters:t}=g.get(),{cgpa:n}=k(t),r=t.length;e.innerHTML=`
    <div class="fade-in">
      <!-- Header -->
      <div class="page-header">
        <div class="page-header-inner">
          <div>
            <h1 class="page-title">CGPA Predictor</h1>
            <p class="page-subtitle">Forecast your graduation CGPA</p>
          </div>
          <div style="width:40px;height:40px;border-radius:var(--radius-lg);background:var(--color-white);display:flex;align-items:center;justify-content:center;color:var(--color-info)">
            <img src="/public/Predicts.svg" alt="Predict"/>
          </div>
        </div>
      </div>

      <!-- Inputs -->
      <div style="padding:var(--space-4) var(--page-padding) 0">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-3)">
          <div class="form-group">
            <label class="form-label" style="color:var(--color-white)" for="pred-cgpa">Current CGPA</label>
            <input class="form-control" id="pred-cgpa" type="number" step="0.01" min="0" max="5"
              placeholder="e.g. 3.75" value="${n>0?n.toFixed(2):``}" />
            <p class="form-hint">Your current CGPA</p>
          </div>
          <div class="form-group">
            <label class="form-label" style="color:var(--color-white)" for="pred-completed">Completed Semesters</label>
            <input class="form-control" id="pred-completed" type="number" min="0" max="20"
              placeholder="e.g. 4" value="${r>0?r:``}" />
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-3)">
          <div class="form-group">
            <label class="form-label" style="color:var(--color-white)" for="pred-remaining">Remaining Semesters</label>
            <input class="form-control" id="pred-remaining" type="number" min="1" max="20"
              placeholder="e.g. 4" />
          </div>
          <div class="form-group">
            <label class="form-label" style="color:var(--color-white)" for="pred-expected">Expected GPA</label>
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
          ${D.slice(0,5).map((e,t)=>`
            <div style="display:flex;align-items:center;justify-content:space-between;
              padding:var(--space-3) var(--space-4);
              ${t<4?`border-bottom:1px solid var(--color-gray-50)`:``}">
              <div style="display:flex;align-items:center;gap:var(--space-2)">
                <div style="width:10px;height:10px;border-radius:50%;background:${e.dot};flex-shrink:0"></div>
                <span style="font-size:var(--font-size-sm);font-weight:600;color:var(--color-gray-800)">${e.label}</span>
              </div>
              <span style="font-size:var(--font-size-sm);font-weight:700;color:${e.color}">${e.min.toFixed(2)} – ${e.max.toFixed(2)}</span>
            </div>
          `).join(``)}
        </div>
      </div>
    </div>
  `,_(`#predict-btn`,e).addEventListener(`click`,()=>ve(e)),n>0&&r>0&&b(`Fill in remaining semesters to predict`,`default`,2500)}function ve(e){let t=parseFloat(_(`#pred-cgpa`,e)?.value),n=parseInt(_(`#pred-completed`,e)?.value),r=parseInt(_(`#pred-remaining`,e)?.value),i=parseFloat(_(`#pred-expected`,e)?.value);if(isNaN(t)||t<0||t>5){b(`Enter a valid current CGPA (0 – 5)`,`error`);return}if(isNaN(n)||n<0){b(`Enter valid completed semesters`,`error`);return}if(isNaN(r)||r<1){b(`Enter remaining semesters (at least 1)`,`error`);return}if(isNaN(i)||i<0||i>5){b(`Enter a valid expected GPA (0 – 5)`,`error`);return}let{projectedCGPA:a,classification:o}=re({currentCGPA:t,completedSemesters:n,remainingSemesters:r,expectedGPA:i}),s=ae(t,n,r),c=Math.min(a/5*100,100).toFixed(1),l=n+r;g.addPrediction({currentCGPA:t,completedSemesters:n,remainingSemesters:r,expectedGPA:i,projectedCGPA:a});let u=document.getElementById(`pred-results`);u.innerHTML=`
    <div class="slide-up">
      <!-- Projected CGPA Card -->
      <div class="predictor-result" style="margin:0 var(--page-padding) var(--space-4)">
        <p style="font-size:var(--font-size-sm);opacity:0.8;font-weight:500">Projected CGPA</p>
        <p class="predictor-cgpa">${a.toFixed(2)}</p>
        <div style="display:inline-flex;align-items:center;gap:var(--space-2);
          background:rgb(255 255 255/0.18);padding:0.3rem 0.75rem;border-radius:var(--radius-full);
          font-size:var(--font-size-sm);font-weight:600;margin-top:var(--space-2);backdrop-filter:blur(4px)">
          🎓 ${o.label}
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
            <p style="font-size:var(--font-size-base);font-weight:700">${t.toFixed(2)}</p>
          </div>
          <div>
            <p style="font-size:10px;opacity:0.7">Semesters Left</p>
            <p style="font-size:var(--font-size-base);font-weight:700">${r}</p>
          </div>
          <div>
            <p style="font-size:10px;opacity:0.7">Total Semesters</p>
            <p style="font-size:var(--font-size-base);font-weight:700">${l}</p>
          </div>
        </div>
      </div>

      <!-- Recommendations -->
      <div style="padding:0 var(--page-padding)">
        <p class="section-title">Smart Recommendations</p>
        <div style="display:flex;flex-direction:column;gap:var(--space-3)">
          ${s.length===0?`
            <div class="recommendation-card">
              <div class="rec-icon" style="background:var(--color-primary-bg);color:var(--color-primary)">✓</div>
              <p class="rec-text">Add remaining semesters data for personalized recommendations.</p>
            </div>
          `:s.map(e=>`
            <div class="recommendation-card">
              <div class="rec-icon" style="background:${e.color}18;color:${e.color};font-size:16px">${e.icon}</div>
              <div>
                <p class="rec-text">${e.message}</p>
                <span style="font-size:var(--font-size-xs);font-weight:600;color:${e.color};margin-top:4px;display:block">
                  ${e.type===`achievable`?`✓ Within reach`:e.type===`stretch`?`↑ Requires improvement`:`✗ Not achievable`}
                </span>
              </div>
            </div>
          `).join(``)}
        </div>
      </div>

      <!-- Needed GPA Table -->
      <div style="padding:var(--space-4) var(--page-padding) 0">
        <p class="section-title">Required GPA per Remaining Semester</p>
        <div style="background:var(--color-white);border:1px solid var(--color-gray-100);border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-sm)">
          ${D.slice(0,4).map((e,i)=>{let a=r>0?(e.min*l-t*n)/r:null,o=a!==null&&a>=0&&a<=5,s=a===null?`N/A`:a<0?`Already achieved`:a>5?`Not possible`:a.toFixed(2);return`
              <div style="display:flex;align-items:center;justify-content:space-between;
                padding:var(--space-3) var(--space-4);
                ${i<3?`border-bottom:1px solid var(--color-gray-50)`:``}">
                <div style="display:flex;align-items:center;gap:var(--space-2)">
                  <div style="width:8px;height:8px;border-radius:50%;background:${e.dot}"></div>
                  <span style="font-size:var(--font-size-sm);color:var(--color-gray-700);font-weight:500">${e.label}</span>
                </div>
                <span style="font-size:var(--font-size-sm);font-weight:700;color:${o?e.color:`var(--color-gray-400)`}">
                  ${s}
                </span>
              </div>
            `}).join(``)}
        </div>
      </div>
    </div>
  `,u.scrollIntoView({behavior:`smooth`,block:`start`}),b(`Prediction calculated`,`success`)}function X(e){let{profile:t,semesters:n}=g.get(),{cgpa:r,totalUnits:i}=k(n),a=A(r);e.innerHTML=`
    <div class="fade-in">
      <!-- Header -->
      <div class="page-header">
  <div class="page-header-inner">
    <h1 class="page-title">Profile</h1>

    <div class="header-actions">
    <button class="btn btn-secondary btn-sm" id="edit-profile-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        Edit
        </button>
      <button class="btn btn-icon btn-settings"
      id="settings-btn" aria-label="Settings">
      <img src="/public/Settings.svg" alt="Settings"/>
      </button>
      </div>
      </div>
      </div>

      <!-- Profile Hero -->
      <div class="profile-hero" style="background: radial-gradient(circle at 95% 45%, var(--color-primary-light),transparent 135%), var(--color-primary-dark) --effect-glow-primary:
  0 0 20px rgba(0, 230, 118, 0.25);">
        <div class="profile-avatar-large" style="width: 100px; height: 100px;">
          ${y(t?.name||``)||`<img src="/public/Profile.svg" alt="Avatar"/>`}
        </div>
        <div style="text-align:center">
          <p class="profile-full-name" style="color:var(--color-white);">${t?.name||`Student`}</p>
          <p class="profile-university">${t?.university||`—`}</p>
          ${t?.department?`<p style="font-size:var(--font-size-xs);color:var(--color-gray-400);margin-top:2px">${t.department}${t.faculty?` · ${t.faculty}`:``}</p>`:``}
          ${t?.level?`
            <span class="badge badge-success" style="margin-top:var(--space-2)">Level ${t.level}</span>
          `:``}
        </div>
      </div>

      <!-- Academic Summary -->
      <div style="padding:var(--space-5) var(--page-padding) 0">
        <p class="section-title">Academic Summary</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3)">
          <div style="background:var(--color-primary-bg);border-radius:var(--radius-xl);padding:var(--space-4);text-align:center;border:1px solid var(--color-primary-lighter)">
            <p style="font-size:var(--font-size-2xl);font-weight:800;color:var(--color-primary-darker);letter-spacing:-0.03em">${r.toFixed(2)}</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-primary-dark);font-weight:600">CGPA</p>
          </div>
          <div style="background:var(--color-info-bg);border-radius:var(--radius-xl);padding:var(--space-4);text-align:center;border:1px solid #bfdbfe">
            <p style="font-size:var(--font-size-2xl);font-weight:800;color:#1e40af;letter-spacing:-0.03em">${n.length}</p>
            <p style="font-size:var(--font-size-xs);color:#1e40af;font-weight:600">Semesters</p>
          </div>
          <div style="background:var(--color-warning-bg);border-radius:var(--radius-xl);padding:var(--space-4);text-align:center;border:1px solid #fde68a">
            <p style="font-size:var(--font-size-2xl);font-weight:800;color:#92400e;letter-spacing:-0.03em">${i}</p>
            <p style="font-size:var(--font-size-xs);color:#92400e;font-weight:600">Units</p>
          </div>
        </div>
        ${r>0?`
          <div style="margin-top:var(--space-3);padding:var(--space-3) var(--space-4);
            background:${a.dot}10;border:1px solid ${a.dot}30;
            border-radius:var(--radius-lg);text-align:center">
            <span style="font-size:var(--font-size-sm);font-weight:700;color:${a.color}">
              🎓 ${a.label}
            </span>
          </div>
        `:``}
      </div>

      <!-- Profile Details -->
      <div id="profile-view" style="padding:var(--space-5) var(--page-padding) 0">
        <p class="section-title">Personal Information</p>
        <div style="background:var(--color-white);border:1px solid var(--color-gray-100);border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-sm);">
          ${Z(`Full Name`,t?.name||`—`,`user`)}
          ${Z(`University`,t?.university||`—`,`building`)}
          ${Z(`Faculty`,t?.faculty||`—`,`book`)}
          ${Z(`Department`,t?.department||`—`,`layers`)}
          ${Z(`Current Level`,t?.level?`${t.level} Level`:`—`,`award`,!0)}
        </div>
      </div>

      <!-- Edit Form (hidden by default) -->
      <div id="profile-edit" style="padding:var(--space-5) var(--page-padding) 0;display:none">
        <p class="section-title">Edit Information</p>
        <div style="display:flex;flex-direction:column;gap:var(--space-4)">
          <div class="form-group">
            <label class="form-label" for="ep-name">Full Name <span style="color:var(--color-danger)">*</span></label>
            <input class="form-control" id="ep-name" value="${t?.name||``}" placeholder="Your full name" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ep-uni">University <span style="color:var(--color-danger)">*</span></label>
            <input class="form-control" id="ep-uni" value="${t?.university||``}" placeholder="Your university" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ep-faculty">Faculty</label>
            <input class="form-control" id="ep-faculty" value="${t?.faculty||``}" placeholder="e.g. Engineering" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ep-dept">Department</label>
            <input class="form-control" id="ep-dept" value="${t?.department||``}" placeholder="e.g. Computer Science" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ep-level">Current Level</label>
            <select class="form-control" id="ep-level">
              <option value="">Select level</option>
              ${[100,200,300,400,500,600].map(e=>`<option value="${e}" ${t?.level==e?`selected`:``}>${e} Level</option>`).join(``)}
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
  `;let o=_(`#edit-profile-btn`,e),s=_(`#profile-view`,e),c=_(`#profile-edit`,e);_(`#settings-btn`,e)?.addEventListener(`click`,()=>{console.log(`Settings clicked`),window.location.hash=`#/settings`}),o.addEventListener(`click`,()=>{s.style.display=`none`,c.style.display=`block`,o.style.display=`none`,c.scrollIntoView({behavior:`smooth`})}),_(`#cancel-edit-btn`,e)?.addEventListener(`click`,()=>{s.style.display=`block`,c.style.display=`none`,o.style.display=``}),_(`#save-profile-btn`,e)?.addEventListener(`click`,()=>{let t=_(`#ep-name`,e).value.trim(),n=_(`#ep-uni`,e).value.trim();if(!t){b(`Name is required`,`error`);return}if(!n){b(`University is required`,`error`);return}g.setProfile({name:t,university:n,faculty:_(`#ep-faculty`,e).value.trim(),department:_(`#ep-dept`,e).value.trim(),level:_(`#ep-level`,e).value}),b(`Profile updated`,`success`),X(e)})}function Z(e,t,n,r=!1){return`
    <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-4);
      ${r?``:`border-bottom:1px solid var(--color-gray-50)`}">
      <div style="width:36px;height:36px;border-radius:var(--radius-md);background:var(--color-gray-50);
        display:flex;align-items:center;justify-content:center;color:var(--color-gray-400);flex-shrink:0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" color="var(--color-primary)" stroke-width="1.5">${{user:`<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,building:`<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,book:`<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`,layers:`<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`,award:`<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>`}[n]||``}</svg>
      </div>
      <div>
        <p style="font-size:var(--font-size-xs);color:var(--color-gray-400);font-weight:500">${e}</p>
        <p style="font-size:var(--font-size-sm);font-weight:600;color:var(--color-gray-800);margin-top:1px">${t}</p>
      </div>
    </div>
  `}function ye(e,t){m(),e.reset(),t.go(`#/onboarding`)}function be(){let e=g.exportJSON(),t=new Blob([e],{type:`application/json`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`cgpa-data-${new Date().toISOString().split(`T`)[0]}.json`,r.click(),URL.revokeObjectURL(n)}function xe(e){return new Promise(t=>{let n=new FileReader;n.onload=e=>{t(g.importJSON(e.target.result))},n.onerror=()=>t(!1),n.readAsText(e)})}async function Se(){let{default:e}=await W(async()=>{let{default:e}=await import(`./jspdf.es.min-C64vflvN.js`);return{default:e}},__vite__mapDeps([0,1])),{profile:t,semesters:n}=g.get(),{cgpa:r,totalUnits:i,totalQualityPoints:a}=k(n),o=A(r),s=new e({orientation:`portrait`,unit:`mm`,format:`a4`}),c=s.internal.pageSize.getWidth();s.setFillColor(22,163,74),s.rect(0,0,c,40,`F`),s.setTextColor(255,255,255),s.setFontSize(22),s.setFont(`helvetica`,`bold`),s.text(`CGPA Calculator`,20,18),s.setFontSize(11),s.setFont(`helvetica`,`normal`),s.text(`Academic Performance Report`,20,28),s.text(new Date().toLocaleDateString(`en-NG`,{dateStyle:`long`}),c-20,28,{align:`right`}),s.setTextColor(31,41,55);let l=55;t&&(s.setFontSize(16),s.setFont(`helvetica`,`bold`),s.text(t.name||`Student`,20,l),l+=8,s.setFontSize(10),s.setFont(`helvetica`,`normal`),s.setTextColor(107,114,128),t.university&&s.text(t.university,20,l),l+=6,t.department&&s.text(`${t.department} · ${t.faculty||``}`,20,l),l+=6,t.level&&s.text(`Level ${t.level}`,20,l),l+=10),s.setFillColor(240,253,244),s.roundedRect(15,l,c-30,30,4,4,`F`),s.setTextColor(22,101,52),s.setFontSize(28),s.setFont(`helvetica`,`bold`),s.text(`${r.toFixed(2)}`,35,l+20),s.setFontSize(11),s.setFont(`helvetica`,`normal`),s.text(`CGPA`,35,l+27),s.setFontSize(14),s.setFont(`helvetica`,`bold`),s.text(o.label,80,l+18),s.setFontSize(10),s.setFont(`helvetica`,`normal`),s.setTextColor(107,114,128),s.text(`${i} total units · ${a} quality points`,80,l+26),l+=40,s.setTextColor(31,41,55),s.setFontSize(13),s.setFont(`helvetica`,`bold`),s.text(`Semester Records`,20,l),l+=8,n.forEach(e=>{let t=e.courses?.reduce((e,t)=>{let n={A:5,B:4,C:3,D:2,E:1,F:0}[t.grade?.toUpperCase()]??0;return{qp:e.qp+n*t.units,u:e.u+parseInt(t.units)}},{qp:0,u:0}),n=t.u?(t.qp/t.u).toFixed(2):`0.00`;l>260&&(s.addPage(),l=20),s.setFillColor(249,250,251),s.roundedRect(15,l,c-30,8,2,2,`F`),s.setFontSize(10),s.setFont(`helvetica`,`bold`),s.setTextColor(31,41,55),s.text(`${e.semester} Semester ${e.year}`,20,l+5.5),s.text(`GPA: ${n}`,c-25,l+5.5,{align:`right`}),l+=12,e.courses?.forEach(e=>{s.setFont(`helvetica`,`normal`),s.setTextColor(107,114,128),s.setFontSize(9),s.text(`  ${e.code||`Course`} — ${e.units} units — Grade ${e.grade}`,20,l),l+=6}),l+=4}),s.save(`cgpa-report-${t?.name?.replace(/\s+/g,`-`)||`student`}.pdf`)}async function Ce(){let{default:e}=await W(async()=>{let{default:e}=await import(`./html2canvas-B1Crt_9J.js`).then(e=>l(e.default,1));return{default:e}},[]),t=(await e(document.getElementById(`page-content`),{scale:2,backgroundColor:`#f9fafb`,logging:!1})).toDataURL(`image/png`),n=document.createElement(`a`);n.href=t,n.download=`cgpa-dashboard-${new Date().toISOString().split(`T`)[0]}.png`,n.click()}function we(e){let{profile:t,settings:n,semesters:r}=g.get();e.innerHTML=`
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
            ${y(t?.name||``)||`👤`}
          </div>
          <div>
            <p style="font-size:var(--font-size-base);font-weight:700;color:var(--color-gray-900)">${t?.name||`Student`}</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-gray-400)">${t?.university||`—`}</p>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:auto;color:var(--color-gray-300)"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>

      <!-- Data Section -->
      <div style="margin-top:var(--space-4)">
        <p class="section-title" style="padding:0 var(--page-padding);margin-bottom:var(--space-2)">Data & Export</p>
        <div class="settings-list">
          ${Q(`export-json`,`#22c55e`,Ee,`Export as JSON`,`Download all your data`,`green`)}
          ${Q(`export-pdf`,`#2563eb`,De,`Export as PDF`,`Generate academic report`,`blue`)}
          ${Q(`export-png`,`#7c3aed`,Oe,`Export as Image`,`Screenshot your dashboard`,`purple`)}
          ${Q(`import-data`,`#d97706`,ke,`Import Data`,`Restore from JSON backup`,`orange`)}
        </div>
      </div>

      <!-- App Section -->
      <div style="margin-top:var(--space-4)">
        <p class="section-title" style="padding:0 var(--page-padding);margin-bottom:var(--space-2)">App</p>
        <div class="settings-list">
          ${Q(`view-profile`,`#16a34a`,Ae,`Edit Profile`,`Update your information`,`green`)}
          ${Q(`about-app`,`#6b7280`,je,`About App`,`Version 1.0.0 · CGPA Calculator`,`gray`)}
          ${Q(`privacy`,`#6b7280`,Me,`Privacy`,`How your data is stored`,`gray`)}
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
  `,Te(e)}function Q(e,t,n,r,i,a){return`
    <div class="settings-item" id="${e}">
      <div class="settings-icon" style="background:${{green:`var(--color-primary-bg)`,blue:`var(--color-info-bg)`,purple:`#ede9fe`,orange:`var(--color-warning-bg)`,gray:`var(--color-gray-100)`}[a]};color:${{green:`var(--color-primary)`,blue:`var(--color-info)`,purple:`#7c3aed`,orange:`var(--color-warning)`,gray:`var(--color-gray-500)`}[a]}">
        ${n}
      </div>
      <div class="settings-info">
        <p class="settings-label">${r}</p>
        <p class="settings-desc">${i}</p>
      </div>
      <svg class="settings-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </div>
  `}function Te(e){_(`#export-json`,e)?.addEventListener(`click`,async()=>{try{be(),b(`JSON exported`,`success`)}catch{b(`Export failed`,`error`)}}),_(`#export-pdf`,e)?.addEventListener(`click`,async()=>{b(`Generating PDF…`,`default`);try{await Se(),b(`PDF downloaded`,`success`)}catch(e){b(`PDF export failed`,`error`),console.error(e)}}),_(`#export-png`,e)?.addEventListener(`click`,async()=>{b(`Capturing screen…`,`default`);try{await Ce(),b(`Image downloaded`,`success`)}catch{b(`Image export failed`,`error`)}}),_(`#import-data`,e)?.addEventListener(`click`,()=>{_(`#import-file-input`,e)?.click()}),_(`#import-file-input`,e)?.addEventListener(`change`,async e=>{let t=e.target.files[0];t&&(F({title:`Import Data`,message:`This will <strong>replace all current data</strong> with the imported file. This cannot be undone. Proceed?`,confirmLabel:`Import & Replace`,confirmClass:`btn-danger`,onConfirm:async()=>{await xe(t)?(b(`Data imported successfully`,`success`),u.go(`#/dashboard`)):b(`Import failed — invalid file`,`error`)}}),e.target.value=``)}),_(`#view-profile`,e)?.addEventListener(`click`,()=>u.go(`#/profile`)),_(`#about-app`,e)?.addEventListener(`click`,()=>{N(`
      <h2 class="modal-title">About CGPA Calculator</h2>
      <div style="display:flex;flex-direction:column;gap:var(--space-3)">
        <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-4);background:var(--color-primary-bg);border-radius:var(--radius-xl)">
          <div style="width:52px;height:52px;border-radius:var(--radius-lg);background:var(--color-primary);display:flex;align-items:center;justify-content:center">
            <img src="/public/About.svg" alt="App Icon" style="width:24px;height:24px"/>
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
    `)}),_(`#privacy`,e)?.addEventListener(`click`,()=>{N(`
      <h2 class="modal-title">Privacy Policy</h2>
      <div style="display:flex;flex-direction:column;gap:var(--space-3)">
        ${[[`🔒 Local Storage Only`,`All your academic data — semesters, grades, profile, predictions — is stored exclusively in your browser's localStorage. Nothing is sent to any server.`],[`📵 No Tracking`,`We do not collect analytics, usage data, or any personally identifiable information.`],[`📤 Your Data, Your Control`,`Export your data anytime as JSON. Delete everything instantly with Account Reset. You are in complete control.`],[`🌐 Works Offline`,`Once installed as a PWA, the app works fully offline. No internet connection required to use any feature.`]].map(([e,t])=>`
          <div style="padding:var(--space-3);background:var(--color-gray-50);border-radius:var(--radius-lg)">
            <p style="font-size:var(--font-size-sm);font-weight:700;color:var(--color-gray-800);margin-bottom:4px">${e}</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-gray-500);line-height:1.6">${t}</p>
          </div>
        `).join(``)}
      </div>
      <button class="btn btn-primary btn-full mt-3" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Got it</button>
    `)}),_(`#reset-account-btn`,e)?.addEventListener(`click`,()=>{F({title:`⚠️ Reset Account`,message:`This will permanently delete all academic records and profile information. You will be redirected to onboarding. <br><br><strong>This cannot be undone.</strong>`,confirmLabel:`Yes, Reset Everything`,confirmClass:`btn-danger`,onConfirm:()=>{ye(g,u),b(`Account reset successfully`,`success`)}})})}var Ee=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,De=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,Oe=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,ke=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,Ae=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,je=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,Me=`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,Ne=[`#/dashboard`,`#/calculator`,`#/history`,`#/predictor`,`#/profile`,`#/settings`];function $(e){let t=_(`#bottom-nav`);Ne.includes(e)?(t.classList.remove(`hidden`),te(t,e)):t.classList.add(`hidden`)}function Pe(){u.beforeEach(e=>{let{onboardingDone:t}=g.get();return!t&&e!==`#/onboarding`?(u.replace(`#/onboarding`),!1):!0}),u.on(`#/onboarding`,()=>{let e=_(`#page-content`);e.classList.add(`no-nav`),$(`#/onboarding`),ne(e)}),u.on(`#/dashboard`,()=>{let e=_(`#page-content`);e.classList.remove(`no-nav`),$(`#/dashboard`),oe(e)}),u.on(`#/calculator`,()=>{let e=_(`#page-content`);e.classList.remove(`no-nav`),$(`#/calculator`),R(e)}),u.on(`#/history`,()=>{let e=_(`#page-content`);e.classList.remove(`no-nav`),$(`#/history`),pe(e)}),u.on(`#/predictor`,()=>{let e=_(`#page-content`);e.classList.remove(`no-nav`),$(`#/predictor`),_e(e)}),u.on(`#/profile`,()=>{let e=_(`#page-content`);e.classList.remove(`no-nav`),$(`#/profile`),X(e)}),u.on(`#/settings`,()=>{let e=_(`#page-content`);e.classList.remove(`no-nav`),$(`#/settings`),we(e)}),u.on(`*`,()=>{let{onboardingDone:e}=g.get();u.replace(e?`#/dashboard`:`#/onboarding`)})}function Fe(){Pe(),_(`#app-container`).classList.remove(`hidden`);let{onboardingDone:e}=g.get(),t=window.location.hash;!t||t===`#/`?u.replace(e?`#/dashboard`:`#/onboarding`):u.start()}var Ie=1700;function Le(){let e=document.getElementById(`splash-screen`);e&&(e.style.transition=`opacity 0.4s ease, transform 0.4s ease`,e.style.opacity=`0`,e.style.transform=`scale(1.04)`,setTimeout(()=>e.remove(),400))}setTimeout(()=>{Le(),Fe()},Ie),`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`/sw.js`).catch(()=>{})});export{o as n,l as r,W as t};