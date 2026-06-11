/**
 * History Page — semester records with search, filter, edit, delete
 */
import state from '../core/state.js';
import router from '../core/router.js';
import { calculateGPA, getClassification, GRADE_COLORS } from '../services/academic.service.js';
import { $, $$ } from '../utils/dom.js';
import { showToast } from '../components/toast.js';
import { showConfirm } from '../components/modal.js';
import { emptyState } from '../components/empty-state.js';

let searchQuery = '';
let sortOrder = 'newest';

export function renderHistory(container) {
  searchQuery = '';
  sortOrder = 'newest';

  container.innerHTML = `
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
        ${renderSemesterList(container)}
      </div>

      <div style="height:var(--space-6)"></div>
    </div>
  `;

  bindHistoryEvents(container);
}

function renderSemesterList() {
  let semesters = state.getSemesters();

  // Search filter
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    semesters = semesters.filter(s =>
      s.semester?.toLowerCase().includes(q) ||
      String(s.year).includes(q) ||
      s.courses?.some(c => c.code?.toLowerCase().includes(q))
    );
  }

  // Active semester filter
  const activeFilter = document.querySelector('.filter-chip.active[data-filter]')?.dataset.filter;
  if (activeFilter && activeFilter !== 'all') {
    semesters = semesters.filter(s => s.semester === activeFilter);
  }

  // Sort
  semesters = sortSemesters(semesters, sortOrder);

  // Update subtitle
  const subtitle = document.getElementById('history-subtitle');
  if (subtitle) subtitle.textContent = `${semesters.length} semester${semesters.length !== 1 ? 's' : ''} found`;

  if (semesters.length === 0) {
    return emptyState({
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>`,
      title: searchQuery ? 'No results found' : 'No semesters yet',
      text: searchQuery
        ? `No semester matches "${searchQuery}"`
        : 'Add your first semester to start building your academic history.',
      actionLabel: searchQuery ? null : 'Add Semester',
      actionId: 'hist-add-sem'
    });
  }

  return semesters.map(s => renderSemesterCard(s)).join('');
}

function renderSemesterCard(semester) {
  const { gpa, totalUnits, qualityPoints } = calculateGPA(semester.courses || []);
  const cls = getClassification(gpa);
  const courses = semester.courses || [];
  const expanded = false;

  return `
    <div class="semester-detail-card" data-id="${semester.id}">
      <div class="semester-detail-header">
        <div style="flex:1">
          <p style="font-size:var(--font-size-base);font-weight:700;color:var(--color-gray-900)">
            ${semester.semester} Semester, ${semester.year}
          </p>
          <p style="font-size:var(--font-size-xs);color:var(--color-gray-400);margin-top:2px">
            ${courses.length} course${courses.length !== 1 ? 's' : ''} · ${totalUnits} units · ${qualityPoints} QP
          </p>
        </div>
        <div style="display:flex;align-items:flex-start;gap:var(--space-3)">
          <div style="text-align:right">
            <p style="font-size:var(--font-size-xl);font-weight:800;color:${cls.color};letter-spacing:-0.02em">${gpa.toFixed(2)}</p>
            <span class="badge" style="background:${cls.dot}18;color:${cls.color};font-size:10px">${cls.label}</span>
          </div>
          <div class="semester-detail-actions">
            <button class="btn-icon edit-sem-btn" data-id="${semester.id}" title="Edit semester" style="width:32px;height:32px">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="btn-icon delete-sem-btn" data-id="${semester.id}" title="Delete semester"
              style="width:32px;height:32px;background:var(--color-danger-bg);color:var(--color-danger)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Courses list -->
      <div class="semester-courses">
        ${courses.map(c => {
          const gp = { A:5,B:4,C:3,D:2,E:1,F:0 }[c.grade?.toUpperCase()] ?? 0;
          const colors = GRADE_COLORS[c.grade?.toUpperCase()] || { bg: '#f3f4f6', text: '#374151' };
          return `
            <div class="course-item">
              <div style="flex:1">
                <p class="course-code">${c.code || '—'}</p>
                <p class="course-units">${c.units} unit${parseInt(c.units) !== 1 ? 's' : ''} · ${gp * parseInt(c.units)} QP</p>
              </div>
              <span class="course-grade-badge" style="background:${colors.bg};color:${colors.text}">${c.grade}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function sortSemesters(semesters, order) {
  return [...semesters].sort((a, b) => {
    if (order === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    if (order === 'oldest') return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    if (order === 'gpa-high') {
      const ga = calculateGPA(a.courses || []).gpa;
      const gb = calculateGPA(b.courses || []).gpa;
      return gb - ga;
    }
    if (order === 'gpa-low') {
      const ga = calculateGPA(a.courses || []).gpa;
      const gb = calculateGPA(b.courses || []).gpa;
      return ga - gb;
    }
    return 0;
  });
}

function refreshList() {
  const list = document.getElementById('semester-list');
  if (list) {
    list.innerHTML = renderSemesterList();
    // Re-bind actions inside list
    bindListItemEvents(list);

    const addBtn = document.getElementById('hist-add-sem');
    if (addBtn) addBtn.addEventListener('click', () => router.go('#/calculator'));
  }
}

function bindHistoryEvents(container) {
  // Search
  const searchInput = $('#history-search', container);
  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    refreshList();
  });

  // Filter chips
  container.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;

    if (chip.dataset.filter) {
      $$('.filter-chip[data-filter]', container).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      refreshList();
    }
    if (chip.dataset.sort) {
      $$('.filter-chip[data-sort]', container).forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      sortOrder = chip.dataset.sort;
      refreshList();
    }
  });

  const list = document.getElementById('semester-list');
  bindListItemEvents(list);

  const addBtn = document.getElementById('hist-add-sem');
  if (addBtn) addBtn.addEventListener('click', () => router.go('#/calculator'));
}

function bindListItemEvents(list) {
  if (!list) return;

  // Edit
  list.querySelectorAll('.edit-sem-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      // Import calculator dynamically to avoid circular dep
      import('./calculator.js').then(({ renderCalculator }) => {
        const content = document.getElementById('page-content');
        renderCalculator(content, id);
      });
    });
  });

  // Delete
  list.querySelectorAll('.delete-sem-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const sem = state.getSemesters().find(s => s.id === id);
      showConfirm({
        title: 'Delete Semester',
        message: `Delete <strong>${sem?.semester} Semester ${sem?.year}</strong>? This will recalculate your CGPA and cannot be undone.`,
        confirmLabel: 'Delete',
        confirmClass: 'btn-danger',
        onConfirm: () => {
          state.deleteSemester(id);
          showToast('Semester deleted', 'success');
          refreshList();
        }
      });
    });
  });
}

export default { renderHistory };
