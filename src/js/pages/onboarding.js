/**
 * Onboarding Page — 4 slides + profile setup
 */
import state from '../core/state.js';
import router from '../core/router.js';
import { $ } from '../utils/dom.js';
import { showToast } from '../components/toast.js';
import { getInitials } from '../utils/dom.js';

const SLIDES = [
  {
    eyebrow: 'Welcome',
    title: 'Track Your <span>Academic</span> Journey',
    desc: 'Monitor your GPA, manage semesters, and stay on top of your academic performance in one place.',
    illustration: `
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
      </div>`
  },
  {
    eyebrow: 'GPA Tracking',
    title: 'Monitor Your <span>Progress</span> Over Time',
    desc: 'Add courses each semester, see your GPA calculated instantly, and watch your CGPA grow with every achievement.',
    illustration: `
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
      </div>`
  },
  {
    eyebrow: 'Smart Prediction',
    title: 'Predict Your <span>Final CGPA</span>',
    desc: 'Use our intelligent predictor to forecast your graduation CGPA and get personalized recommendations to achieve your target class.',
    illustration: `
      <div class="illustration-circle">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" class="illustration-icon">
          <circle cx="50" cy="50" r="32" stroke="#bbf7d0" stroke-width="8"/>
          <circle cx="50" cy="50" r="32" stroke="#16a34a" stroke-width="8" stroke-dasharray="140 60" stroke-linecap="round" transform="rotate(-90 50 50)"/>
          <text x="50" y="46" text-anchor="middle" font-size="14" font-weight="700" fill="#166534">4.62</text>
          <text x="50" y="58" text-anchor="middle" font-size="8" fill="#6b7280">Projected</text>
        </svg>
        <div class="float-card top-right">First Class 🏆</div>
        <div class="float-card bottom-left">3 sems left</div>
      </div>`
  }
];

let currentSlide = 0;
let containerEl = null;

export function renderOnboarding(container) {
  containerEl = container;
  currentSlide = 0;
  renderSlide(container, currentSlide);
}

function renderSlide(container, index) {
  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  container.innerHTML = `
    <div class="onboarding-container fade-in">
      <div class="onboarding-progress">
        <div class="progress-dots">
          ${SLIDES.map((_, i) => `
            <div class="progress-dot ${i === index ? 'active' : i < index ? 'done' : ''}"></div>
          `).join('')}
          <div class="progress-dot ${index >= SLIDES.length ? 'active' : ''}"></div>
        </div>
        <button class="skip-btn" id="skip-btn">Skip</button>
      </div>

      <div class="onboarding-slide">
        <div class="illustration-wrap">${slide.illustration}</div>
        <div class="slide-text">
          <p class="slide-eyebrow">${slide.eyebrow}</p>
          <h1 class="slide-title">${slide.title}</h1>
          <p class="slide-desc">${slide.desc}</p>
        </div>
      </div>

      <div class="onboarding-footer">
        <button class="btn btn-primary btn-full" id="next-btn">
          ${isLast ? 'Set Up Profile' : 'Continue'}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
        ${index > 0 ? `<button class="btn btn-ghost btn-full" id="back-btn">Back</button>` : ''}
      </div>
    </div>
  `;

  $('#next-btn', container).addEventListener('click', () => {
    if (isLast) {
      renderProfileSetup(container);
    } else {
      currentSlide++;
      renderSlide(container, currentSlide);
    }
  });

  $('#skip-btn', container)?.addEventListener('click', () => renderProfileSetup(container));
  $('#back-btn', container)?.addEventListener('click', () => {
    currentSlide--;
    renderSlide(container, currentSlide);
  });
}

function renderProfileSetup(container) {
  container.innerHTML = `
    <div class="onboarding-container fade-in">
      <div class="onboarding-progress">
        <div class="progress-dots">
          ${SLIDES.map(() => `<div class="progress-dot done"></div>`).join('')}
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
  `;

  // Live avatar preview
  const nameInput = $('#p-name', container);
  const avatarPreview = $('#avatar-preview', container);
  const namePreview = $('#avatar-name-preview', container);

  nameInput.addEventListener('input', () => {
    const val = nameInput.value.trim();
    const initials = getInitials(val);
    avatarPreview.textContent = initials || '👤';
    namePreview.textContent = val || 'Your Name';
  });

  $('#save-profile-btn', container).addEventListener('click', () => {
    const name = $('#p-name', container).value.trim();
    const university = $('#p-uni', container).value.trim();

    if (!name) { showToast('Please enter your name', 'error'); return; }
    if (!university) { showToast('Please enter your university', 'error'); return; }

    state.setProfile({
      name,
      university,
      faculty: $('#p-faculty', container).value.trim(),
      department: $('#p-dept', container).value.trim(),
      level: $('#p-level', container).value
    });
    state.completeOnboarding();

    showToast(`Welcome, ${name.split(' ')[0]}! 🎉`, 'success');
    router.go('#/dashboard');
  });

  $('#back-to-slides-btn', container).addEventListener('click', () => {
    renderSlide(container, SLIDES.length - 1);
  });
}

export default { renderOnboarding };
