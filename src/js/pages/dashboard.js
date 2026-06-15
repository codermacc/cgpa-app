/**
 * Dashboard Page
 */
import state from '../core/state.js';
import router from '../core/router.js';
import { calculateCGPA, calculateGPA, getClassification, generateInsights, CLASSIFICATIONS } from '../services/academic.service.js';
import { getInitials } from '../utils/dom.js';
import { emptyState } from '../components/empty-state.js';

export function renderDashboard(container) {
  const { profile, semesters } = state.get();
  const { cgpa, totalUnits, totalQualityPoints } = calculateCGPA(semesters);
  const classification = getClassification(cgpa);
  const insights = generateInsights(semesters);
  const progressPct = Math.min((cgpa / 5) * 100, 100).toFixed(1);
  const initials = getInitials(profile?.name || '');
  const firstName = profile?.name?.split(' ')[0] || 'Student';

  // Best GPA across semesters
  let bestGPA = 0;
  semesters.forEach(s => {
    const { gpa } = calculateGPA(s.courses || []);
    if (gpa > bestGPA) bestGPA = gpa;
  });

  const recentSemesters = [...semesters]
    .sort((a, b) => b.createdAt?.localeCompare(a.createdAt || '') || 0)
    .slice(0, 3);

  container.innerHTML = `
    <div class="fade-in">
      <!-- Header -->
      <div class="dashboard-header" style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <p class="dashboard-greeting">Good ${getGreeting()},</p>
          <h1 class="dashboard-name">${firstName} 👋</h1>
        </div>
        <button onclick="window.location.hash='#/profile'"
          style="width:44px;height:44px;border-radius:50%;background:var(--color-primary-bg);border:2px solid var(--color-primary-lighter);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:var(--color-primary-darker);cursor:pointer;border:none;">
          ${initials || '👤'}
        </button>
      </div>

     <div class="cgpa-hero-card slide-up">
  <div class="cgpa-content">
    <div class="cgpa-header">
      <span class="cgpa-label">Current CGPA</span>
    </div>

    <h1 class="cgpa-value">${cgpa.toFixed(2)}</h1>

    <p class="cgpa-classification">
      ${classification.label}
    </p>

    <div class="cgpa-progress">
      <div
        class="cgpa-progress-fill"
        style="width:${progressPct}%"
      ></div>
    </div>

    <p class="cgpa-target">
  You are
  <span>${Math.max(4.5 - cgpa, 0).toFixed(2)}</span>
  away from
  <strong>First Class</strong>
</p>
  </div>

  <div class="cgpa-badge">
  <button href="#/history" class="view-details-btn" onclick="window.location.hash='#/history'"> View Details </button>
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
            <p class="stat-card-value">${semesters.length}</p>
            <p class="stat-card-label">Semesters</p>
          </div>
          <div class="stat-card-dashboard">
            <div class="stat-icon">
              <img src="/public/Units.svg" alt="Units"/>
            </div>
            <p class="stat-card-value">${totalUnits}</p>
            <p class="stat-card-label">Total Units</p>
          </div>
          <div class="stat-card-dashboard">
            <div class="stat-icon" >
              <img src="/public/Points.svg" alt="Quality Points"/>
            </div>
            <p class="stat-card-value">${totalQualityPoints}</p>
            <p class="stat-card-label">Quality Points</p>
          </div>
          <div class="stat-card-dashboard">
            <div class="stat-icon">
              <img src="/public/Best-semester.svg" alt="Best-semester"/>
            </div>
            <p class="stat-card-value">${bestGPA.toFixed(2)}</p>
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
              Current: <span style="color:${classification.color}">${classification.label}</span>
            </span>
            <span style="font-size:var(--font-size-sm);font-weight:var(--font-weight-bold);color:var(--color-gray-300)">${cgpa.toFixed(2)} / 5.00</span>
          </div>
          <div class="progress-bar" style="height:12px;position:relative;background:var(--color-gray-100)">
            <div class="progress-fill" style="width:${progressPct}%;background:${classification.color || 'var(--color-primary)'}"></div>
          </div>
          <div class="class-ranges">
            ${CLASSIFICATIONS.slice(0, 5).map(c => `
              <div class="class-range-item">
                <div class="class-range-dot" style="background:${c.dot}"></div>
                <span class="class-range-name">${c.label}</span>
                <span class="class-range-value">${c.min.toFixed(2)} – ${c.max.toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Recent Semesters -->
      <div class="recent-history">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-3)">
          <p class="section-title" style="margin:0">Recent Semesters</p>
          ${semesters.length > 0 ? `<button onclick="window.location.hash='#/history'" style="font-size:var(--font-size-xs);color:var(--color-primary);font-weight:600;background:none;border:none;cursor:pointer;">View all</button>` : ''}
        </div>
        ${recentSemesters.length === 0 ? `
          ${emptyState({
            icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>`,
            title: 'No semesters added yet',
            text: 'Add your first semester to start tracking your CGPA.',
            actionLabel: 'Add Semester',
            actionId: 'dash-add-sem'
          })}
        ` : `
          <div style="display:flex;flex-direction:column;gap:var(--space-2)">
            ${recentSemesters.map(s => {
              const { gpa } = calculateGPA(s.courses || []);
              const cls = getClassification(gpa);
              return `
                <div class="semester-card" onclick="window.location.hash='#/history'">
                  <div class="semester-info">
                    <p class="semester-name">${s.semester} Semester, ${s.year}</p>
                    <p class="semester-meta">${(s.courses || []).length} courses · ${s.courses?.reduce((a, c) => a + parseInt(c.units || 0), 0) || 0} units</p>
                  </div>
                  <div style="text-align:right">
                    <p class="semester-gpa">${gpa.toFixed(2)}</p>
                    <span class="badge" style="background:${cls.dot}18;color:${cls.color};font-size:10px;">${cls.label}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <!-- Insights (if data exists) -->
      ${insights ? `
      <div style="padding:0 var(--page-padding);margin-bottom:var(--space-5)">
        <p class="section-title">Academic Insights</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3)">
          <div class="stat-card-dashboard">
            <p class="stat-card-label">Best Semester</p>
            <p class="stat-card-value" style="font-size:var(--font-size-xm)">${insights.bestSemester?.semester} ${insights.bestSemester?.year}</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-primary);font-weight:600">GPA: ${insights.bestSemester?.gpa?.toFixed(2)}</p>
          </div>
          <div class="stat-card-dashboard">
            <p class="stat-card-label">Average GPA</p>
            <p class="stat-card-value">${insights.averageGPA.toFixed(2)}</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-gray-400)">across all semesters</p>
          </div>
        </div>
      </div>
      ` : ''}

      <div style="height:var(--space-6)"></div>
    </div>
  `;

  // Bind empty state action
  const addBtn = document.getElementById('dash-add-sem');
  if (addBtn) addBtn.addEventListener('click', () => router.go('#/calculator'));
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

export default { renderDashboard };
