/**
 * Calculator Page — Add/Edit Semester with Courses
 */
import state from '../core/state.js';
import router from '../core/router.js';
import { calculateGPA, calculateCGPA, getClassification, GRADE_POINTS, GRADE_COLORS } from '../services/academic.service.js';
import { $, $$ } from '../utils/dom.js';
import { showToast } from '../components/toast.js';
import { showModal, closeModal } from '../components/modal.js';

let courses = [{ code: '', units: '', grade: '' }];
let editingId = null;

export function renderCalculator(container, semesterId = null) {
  editingId = semesterId;
  const existingSemester = semesterId ? state.getSemesters().find(s => s.id === semesterId) : null;

  if (existingSemester) {
    courses = existingSemester.courses.map(c => ({ ...c }));
  } else {
    courses = [{ code: '', units: '', grade: '' }];
  }

  container.innerHTML = `
    <div class="fade-in">
      <!-- Header -->
      <div class="page-header" style="background:var(--color-surface); flex-direction:column; gap:var(--space-1);">
        <div class="page-header-inner">
          <div>
            <h1 class="page-title" style="color:var(--color-white)">${editingId ? 'Edit Semester' : 'Add Semester'}</h1>
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
              <option value="First" ${existingSemester?.semester === 'First' ? 'selected' : ''}>First</option>
              <option value="Second" ${existingSemester?.semester === 'Second' ? 'selected' : ''}>Second</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" style="color:var(--color-white)" for="sem-year">Year / Session <span style="color:var(--color-danger)">*</span></label>
            <input class="form-control" id="sem-year" type="text"
              placeholder="e.g. 2024"
              value="${existingSemester?.year || ''}" />
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
            ${courses.length} course${courses.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div id="courses-container" style="display:flex;flex-direction:column;gap:var(--space-3)">
          ${courses.map((c, i) => renderCourseRowHTML(c, i)).join('')}
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
          ${editingId ? 'Update Semester' : 'Save Semester'}
        </button>
        ${editingId ? `<button class="btn btn-ghost btn-full mt-3" id="cancel-edit-btn">Cancel</button>` : ''}
      </div>
    </div>
  `;

  bindCourseEvents(container);

  // Help modal
  $('#calc-help-btn', container).addEventListener('click', showGradeScaleModal);

  // Save
  $('#save-semester-btn', container).addEventListener('click', () => saveSemester(container));

  // Cancel edit
  $('#cancel-edit-btn', container)?.addEventListener('click', () => router.go('#/history'));

  // Add course
  $('#add-course-btn', container).addEventListener('click', () => {
    courses.push({ code: '', units: '', grade: '' });
    rebuildCourses(container);
  });

  updateLiveCalc(container);
}

function renderCourseRowHTML(course, index) {
  const gradeOptions = Object.keys(GRADE_POINTS).map(g =>
    `<option value="${g}" ${course.grade === g ? 'selected' : ''}>${g} (${GRADE_POINTS[g]} pts)</option>`
  ).join('');

  return `
    <div class="course-row" data-index="${index}">
      <div class="course-row-header">
        <div class="course-number">${index + 1}</div>
        ${courses.length > 1 ? `
          <button class="delete-course-btn" data-delete="${index}" aria-label="Remove course">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        ` : ''}
      </div>
      <div class="course-row-fields">
        <div class="form-group">
          <input class="form-control" type="text" placeholder="Course code"
            value="${course.code || ''}" data-field="code" data-index="${index}"
            style="font-size:var(--font-size-xs);text-transform:uppercase" />
        </div>
        <div class="form-group">
          <select class="form-control" data-field="units" data-index="${index}">
            <option value="">Units</option>
            ${[1,2,3,4,5,6].map(u => `<option value="${u}" ${parseInt(course.units) === u ? 'selected' : ''}>${u}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <select class="form-control" data-field="grade" data-index="${index}"
            style="background-color:${course.grade ? GRADE_COLORS[course.grade]?.bg : ''}">
            <option value="">Grade</option>
            ${gradeOptions}
          </select>
        </div>
      </div>
    </div>
  `;
}

function bindCourseEvents(container) {
  const coursesContainer = $('#courses-container', container);

  coursesContainer.addEventListener('input', (e) => {
    const { field, index } = e.target.dataset;
    if (field && index !== undefined) {
      const val = e.target.value;
      courses[index][field] = field === 'code' ? val.toUpperCase() : val;
      if (field === 'grade') {
        e.target.style.backgroundColor = val ? GRADE_COLORS[val]?.bg : '';
      }
      updateLiveCalc(container);
    }
  });

  coursesContainer.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('[data-delete]');
    if (deleteBtn) {
      const idx = parseInt(deleteBtn.dataset.delete);
      courses.splice(idx, 1);
      rebuildCourses(container);
    }
  });
}

function rebuildCourses(container) {
  const coursesContainer = $('#courses-container', container);
  coursesContainer.innerHTML = courses.map((c, i) => renderCourseRowHTML(c, i)).join('');

  const countEl = $('#course-count', container);
  if (countEl) countEl.textContent = `${courses.length} course${courses.length !== 1 ? 's' : ''}`;

  bindCourseEvents(container);
  updateLiveCalc(container);
}

function updateLiveCalc(container) {
  const { gpa, totalUnits, qualityPoints } = calculateGPA(courses);

  // Project new CGPA including this semester
  const existingSemesters = state.getSemesters().filter(s => s.id !== editingId);
  const { totalUnits: existingUnits, totalQualityPoints: existingQP } = existingSemesters.reduce(
    (acc, s) => {
      const r = calculateGPA(s.courses || []);
      return { totalUnits: acc.totalUnits + r.totalUnits, totalQualityPoints: acc.totalQualityPoints + r.qualityPoints };
    },
    { totalUnits: 0, totalQualityPoints: 0 }
  );

  const projectedCGPA = (existingUnits + totalUnits) > 0
    ? (existingQP + qualityPoints) / (existingUnits + totalUnits)
    : 0;

  const cls = getClassification(projectedCGPA);

  const liveGpa = $('#live-gpa', container);
  const liveCgpa = $('#live-cgpa', container);
  const liveUnits = $('#live-units', container);
  const liveQp = $('#live-qp', container);
  const liveClass = $('#live-class', container);

  if (liveGpa) liveGpa.textContent = gpa.toFixed(2);
  if (liveCgpa) liveCgpa.textContent = projectedCGPA > 0 ? projectedCGPA.toFixed(2) : '–';
  if (liveUnits) liveUnits.textContent = totalUnits;
  if (liveQp) liveQp.textContent = qualityPoints;
  if (liveClass) liveClass.textContent = projectedCGPA > 0 ? cls.label : '–';
}

function saveSemester(container) {
  const semester = $('#sem-type', container)?.value;
  const year = $('#sem-year', container)?.value?.trim();

  if (!semester) { showToast('Please select a semester (First/Second)', 'error'); return; }
  if (!year) { showToast('Please enter the year/session', 'error'); return; }

  const validCourses = courses.filter(c => c.units && c.grade);
  if (validCourses.length === 0) {
    showToast('Add at least one course with units and grade', 'error');
    return;
  }

  const semesterData = { semester, year, courses: validCourses };

  if (editingId) {
    state.updateSemester(editingId, semesterData);
    showToast('Semester updated successfully', 'success');
  } else {
    state.addSemester(semesterData);
    showToast('Semester saved successfully! 🎉', 'success');
  }

  router.go('#/history');
}

function showGradeScaleModal() {
  showModal(`
    <h2 class="modal-title">Grade Scale (5-Point)</h2>
    <div style="display:flex;flex-direction:column;gap:var(--space-2)">
      ${Object.entries(GRADE_POINTS).map(([g, p]) => `
        <div style="display:flex;align-items:center;justify-content:space-between;
          padding:var(--space-3) var(--space-4);
          border-radius:var(--radius-lg);
          background:${GRADE_COLORS[g].bg}">
          <span style="font-size:var(--font-size-base);font-weight:700;color:${GRADE_COLORS[g].text}">Grade ${g}</span>
          <span style="font-size:var(--font-size-sm);color:${GRADE_COLORS[g].text};font-weight:600">${p} point${p !== 1 ? 's' : ''}</span>
        </div>
      `).join('')}
    </div>
    <div style="margin-top:var(--space-4);padding:var(--space-3);background:var(--color-gray-50);border-radius:var(--radius-lg)">
      <p style="font-size:var(--font-size-xs);color:var(--color-gray-500);line-height:1.6">
        GPA = Total Quality Points ÷ Total Credit Units<br>
        Quality Points = Grade Point × Credit Units per course
      </p>
    </div>
    <button class="btn btn-primary btn-full mt-3" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Got it</button>
  `);
}

export default { renderCalculator };
