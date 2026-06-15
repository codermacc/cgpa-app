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
        <img src="/public/Splash 1.svg" alt="Graduation Cap"/>
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
        <img src="/public/Splash 4.svg" alt="Illustration 2"/>
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
        <img src="/public/Splash-3.svg" alt="Illustration 3"/>
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
          <div class="avatar-circle" id="avatar-preview">
          <img src="/public/Profile-setup.svg" alt="Illustration 2"/>
          </div>
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
