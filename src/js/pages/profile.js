/**
 * Profile Page — view and edit user profile
 */
import state from '../core/state.js';
import router from '../core/router.js';
import { calculateCGPA, getClassification } from '../services/academic.service.js';
import { $, getInitials } from '../utils/dom.js';
import { showToast } from '../components/toast.js';

export function renderProfile(container) {
  const { profile, semesters } = state.get();
  const { cgpa, totalUnits } = calculateCGPA(semesters);
  const classification = getClassification(cgpa);
  const initials = getInitials(profile?.name || '');

  container.innerHTML = `
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
          ${initials || '<img src="/public/Profile.svg" alt="Avatar"/>'}
        </div>
        <div style="text-align:center">
          <p class="profile-full-name" style="color:var(--color-white);">${profile?.name || 'Student'}</p>
          <p class="profile-university">${profile?.university || '—'}</p>
          ${profile?.department ? `<p style="font-size:var(--font-size-xs);color:var(--color-gray-400);margin-top:2px">${profile.department}${profile.faculty ? ` · ${profile.faculty}` : ''}</p>` : ''}
          ${profile?.level ? `
            <span class="badge badge-success" style="margin-top:var(--space-2)">Level ${profile.level}</span>
          ` : ''}
        </div>
      </div>

      <!-- Academic Summary -->
      <div style="padding:var(--space-5) var(--page-padding) 0">
        <p class="section-title">Academic Summary</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3)">
          <div style="background:var(--color-primary-bg);border-radius:var(--radius-xl);padding:var(--space-4);text-align:center;border:1px solid var(--color-primary-lighter)">
            <p style="font-size:var(--font-size-2xl);font-weight:800;color:var(--color-primary-darker);letter-spacing:-0.03em">${cgpa.toFixed(2)}</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-primary-dark);font-weight:600">CGPA</p>
          </div>
          <div style="background:var(--color-info-bg);border-radius:var(--radius-xl);padding:var(--space-4);text-align:center;border:1px solid #bfdbfe">
            <p style="font-size:var(--font-size-2xl);font-weight:800;color:#1e40af;letter-spacing:-0.03em">${semesters.length}</p>
            <p style="font-size:var(--font-size-xs);color:#1e40af;font-weight:600">Semesters</p>
          </div>
          <div style="background:var(--color-warning-bg);border-radius:var(--radius-xl);padding:var(--space-4);text-align:center;border:1px solid #fde68a">
            <p style="font-size:var(--font-size-2xl);font-weight:800;color:#92400e;letter-spacing:-0.03em">${totalUnits}</p>
            <p style="font-size:var(--font-size-xs);color:#92400e;font-weight:600">Units</p>
          </div>
        </div>
        ${cgpa > 0 ? `
          <div style="margin-top:var(--space-3);padding:var(--space-3) var(--space-4);
            background:${classification.dot}10;border:1px solid ${classification.dot}30;
            border-radius:var(--radius-lg);text-align:center">
            <span style="font-size:var(--font-size-sm);font-weight:700;color:${classification.color}">
              🎓 ${classification.label}
            </span>
          </div>
        ` : ''}
      </div>

      <!-- Profile Details -->
      <div id="profile-view" style="padding:var(--space-5) var(--page-padding) 0">
        <p class="section-title">Personal Information</p>
        <div style="background:var(--color-white);border:1px solid var(--color-gray-100);border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-sm);">
          ${renderProfileField('Full Name', profile?.name || '—', 'user')}
          ${renderProfileField('University', profile?.university || '—', 'building')}
          ${renderProfileField('Faculty', profile?.faculty || '—', 'book')}
          ${renderProfileField('Department', profile?.department || '—', 'layers')}
          ${renderProfileField('Current Level', profile?.level ? `${profile.level} Level` : '—', 'award', true)}
        </div>
      </div>

      <!-- Edit Form (hidden by default) -->
      <div id="profile-edit" style="padding:var(--space-5) var(--page-padding) 0;display:none">
        <p class="section-title">Edit Information</p>
        <div style="display:flex;flex-direction:column;gap:var(--space-4)">
          <div class="form-group">
            <label class="form-label" for="ep-name">Full Name <span style="color:var(--color-danger)">*</span></label>
            <input class="form-control" id="ep-name" value="${profile?.name || ''}" placeholder="Your full name" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ep-uni">University <span style="color:var(--color-danger)">*</span></label>
            <input class="form-control" id="ep-uni" value="${profile?.university || ''}" placeholder="Your university" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ep-faculty">Faculty</label>
            <input class="form-control" id="ep-faculty" value="${profile?.faculty || ''}" placeholder="e.g. Engineering" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ep-dept">Department</label>
            <input class="form-control" id="ep-dept" value="${profile?.department || ''}" placeholder="e.g. Computer Science" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ep-level">Current Level</label>
            <select class="form-control" id="ep-level">
              <option value="">Select level</option>
              ${[100,200,300,400,500,600].map(l =>
                `<option value="${l}" ${profile?.level == l ? 'selected' : ''}>${l} Level</option>`
              ).join('')}
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
  `;

  // Edit toggle
  const editBtn = $('#edit-profile-btn', container);
  const profileView = $('#profile-view', container);
  const profileEdit = $('#profile-edit', container);
  const settingsBtn = $('#settings-btn', container);

  settingsBtn?.addEventListener('click', () => {
  console.log('Settings clicked');
  window.location.hash = '#/settings';
});

  editBtn.addEventListener('click', () => {
    profileView.style.display = 'none';
    profileEdit.style.display = 'block';
    editBtn.style.display = 'none';
    profileEdit.scrollIntoView({ behavior: 'smooth' });
  });

  $('#cancel-edit-btn', container)?.addEventListener('click', () => {
    profileView.style.display = 'block';
    profileEdit.style.display = 'none';
    editBtn.style.display = '';
  });

  $('#save-profile-btn', container)?.addEventListener('click', () => {
    const name = $('#ep-name', container).value.trim();
    const university = $('#ep-uni', container).value.trim();
    if (!name) { showToast('Name is required', 'error'); return; }
    if (!university) { showToast('University is required', 'error'); return; }

    state.setProfile({
      name,
      university,
      faculty: $('#ep-faculty', container).value.trim(),
      department: $('#ep-dept', container).value.trim(),
      level: $('#ep-level', container).value
    });

    showToast('Profile updated', 'success');
    renderProfile(container); // re-render
  });
}

function renderProfileField(label, value, icon, isLast = false) {
  const icons = {
    user: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    building: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
    book: `<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`,
    layers: `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`,
    award: `<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>`
  };

  return `
    <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-4);
      ${!isLast ? 'border-bottom:1px solid var(--color-gray-50)' : ''}">
      <div style="width:36px;height:36px;border-radius:var(--radius-md);background:var(--color-gray-50);
        display:flex;align-items:center;justify-content:center;color:var(--color-gray-400);flex-shrink:0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" color="var(--color-primary)" stroke-width="1.5">${icons[icon] || ''}</svg>
      </div>
      <div>
        <p style="font-size:var(--font-size-xs);color:var(--color-gray-400);font-weight:500">${label}</p>
        <p style="font-size:var(--font-size-sm);font-weight:600;color:var(--color-gray-800);margin-top:1px">${value}</p>
      </div>
    </div>
  `;
}

export default { renderProfile };
