/**
 * Predictor Page — CGPA prediction with smart recommendations
 */
import state from '../core/state.js';
import { calculateCGPA, predictCGPA, generateRecommendations, getClassification, CLASSIFICATIONS } from '../services/academic.service.js';
import { $, fmt } from '../utils/dom.js';
import { showToast } from '../components/toast.js';

export function renderPredictor(container) {
  const { semesters } = state.get();
  const { cgpa } = calculateCGPA(semesters);
  const completedCount = semesters.length;

  container.innerHTML = `
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
              placeholder="e.g. 3.75" value="${cgpa > 0 ? cgpa.toFixed(2) : ''}" />
            <p class="form-hint">Your current CGPA</p>
          </div>
          <div class="form-group">
            <label class="form-label" style="color:var(--color-white)" for="pred-completed">Completed Semesters</label>
            <input class="form-control" id="pred-completed" type="number" min="0" max="20"
              placeholder="e.g. 4" value="${completedCount > 0 ? completedCount : ''}" />
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
          <img src="/public/Predicts.svg" style="color:var(--color-white)" alt="Predict"/>
          Predict
        </button>
      </div>

      <!-- Results (shown after calculation) -->
      <div id="pred-results" style="margin-top:var(--space-4)"></div>

      <!-- Classification Reference -->
      <div style="padding:0 var(--page-padding);margin-top:var(--space-4);margin-bottom:var(--space-8)">
        <p class="section-title">Classification Reference</p>
        <div style="background:var(--color-white);border:1px solid var(--color-gray-100);border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-sm)">
          ${CLASSIFICATIONS.slice(0, 5).map((c, i) => `
            <div style="display:flex;align-items:center;justify-content:space-between;
              padding:var(--space-3) var(--space-4);
              ${i < 4 ? 'border-bottom:1px solid var(--color-gray-50)' : ''}">
              <div style="display:flex;align-items:center;gap:var(--space-2)">
                <div style="width:10px;height:10px;border-radius:50%;background:${c.dot};flex-shrink:0"></div>
                <span style="font-size:var(--font-size-sm);font-weight:600;color:var(--color-gray-800)">${c.label}</span>
              </div>
              <span style="font-size:var(--font-size-sm);font-weight:700;color:${c.color}">${c.min.toFixed(2)} – ${c.max.toFixed(2)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  $('#predict-btn', container).addEventListener('click', () => runPrediction(container));

  // Auto-run if we have enough data
  if (cgpa > 0 && completedCount > 0) {
    // Pre-fill and hint
    showToast('Fill in remaining semesters to predict', 'default', 2500);
  }
}

function runPrediction(container) {
  const currentCGPA = parseFloat($('#pred-cgpa', container)?.value);
  const completedSemesters = parseInt($('#pred-completed', container)?.value);
  const remainingSemesters = parseInt($('#pred-remaining', container)?.value);
  const expectedGPA = parseFloat($('#pred-expected', container)?.value);

  if (isNaN(currentCGPA) || currentCGPA < 0 || currentCGPA > 5) {
    showToast('Enter a valid current CGPA (0 – 5)', 'error'); return;
  }
  if (isNaN(completedSemesters) || completedSemesters < 0) {
    showToast('Enter valid completed semesters', 'error'); return;
  }
  if (isNaN(remainingSemesters) || remainingSemesters < 1) {
    showToast('Enter remaining semesters (at least 1)', 'error'); return;
  }
  if (isNaN(expectedGPA) || expectedGPA < 0 || expectedGPA > 5) {
    showToast('Enter a valid expected GPA (0 – 5)', 'error'); return;
  }

  const { projectedCGPA, classification } = predictCGPA({
    currentCGPA, completedSemesters, remainingSemesters, expectedGPA
  });

  const recs = generateRecommendations(currentCGPA, completedSemesters, remainingSemesters);
  const progressPct = Math.min((projectedCGPA / 5) * 100, 100).toFixed(1);
  const totalSemesters = completedSemesters + remainingSemesters;

  // Save prediction
  state.addPrediction({ currentCGPA, completedSemesters, remainingSemesters, expectedGPA, projectedCGPA });

  const resultsEl = document.getElementById('pred-results');
  resultsEl.innerHTML = `
    <div class="slide-up">
      <!-- Projected CGPA Card -->
      <div class="predictor-result" style="margin:0 var(--page-padding) var(--space-4)">
        <p style="font-size:var(--font-size-sm);opacity:0.8;font-weight:500">Projected CGPA</p>
        <p class="predictor-cgpa">${projectedCGPA.toFixed(2)}</p>
        <div style="display:inline-flex;align-items:center;gap:var(--space-2);
          background:rgb(255 255 255/0.18);padding:0.3rem 0.75rem;border-radius:var(--radius-full);
          font-size:var(--font-size-sm);font-weight:600;margin-top:var(--space-2);backdrop-filter:blur(4px)">
          🎓 ${classification.label}
        </div>
        <div style="margin-top:var(--space-4);padding-top:var(--space-4);border-top:1px solid rgb(255 255 255/0.15)">
          <div style="height:6px;background:rgb(255 255 255/0.2);border-radius:var(--radius-full);overflow:hidden">
            <div style="height:100%;width:${progressPct}%;background:var(--color-white);border-radius:var(--radius-full);transition:width 1s ease"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:10px;opacity:0.7;margin-top:var(--space-1)">
            <span>0.00</span><span>2.50</span><span>5.00</span>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3);margin-top:var(--space-4)">
          <div>
            <p style="font-size:10px;opacity:0.7">Current</p>
            <p style="font-size:var(--font-size-base);font-weight:700">${currentCGPA.toFixed(2)}</p>
          </div>
          <div>
            <p style="font-size:10px;opacity:0.7">Semesters Left</p>
            <p style="font-size:var(--font-size-base);font-weight:700">${remainingSemesters}</p>
          </div>
          <div>
            <p style="font-size:10px;opacity:0.7">Total Semesters</p>
            <p style="font-size:var(--font-size-base);font-weight:700">${totalSemesters}</p>
          </div>
        </div>
      </div>

      <!-- Recommendations -->
      <div style="padding:0 var(--page-padding)">
        <p class="section-title">Smart Recommendations</p>
        <div style="display:flex;flex-direction:column;gap:var(--space-3)">
          ${recs.length === 0 ? `
            <div class="recommendation-card">
              <div class="rec-icon" style="background:var(--color-primary-bg);color:var(--color-primary)">✓</div>
              <p class="rec-text">Add remaining semesters data for personalized recommendations.</p>
            </div>
          ` : recs.map(r => `
            <div class="recommendation-card">
              <div class="rec-icon" style="background:${r.color}18;color:${r.color};font-size:16px">${r.icon}</div>
              <div>
                <p class="rec-text">${r.message}</p>
                <span style="font-size:var(--font-size-xs);font-weight:600;color:${r.color};margin-top:4px;display:block">
                  ${r.type === 'achievable' ? '✓ Within reach' : r.type === 'stretch' ? '↑ Requires improvement' : '✗ Not achievable'}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Needed GPA Table -->
      <div style="padding:var(--space-4) var(--page-padding) 0">
        <p class="section-title">Required GPA per Remaining Semester</p>
        <div style="background:var(--color-white);border:1px solid var(--color-gray-100);border-radius:var(--radius-xl);overflow:hidden;box-shadow:var(--shadow-sm)">
          ${CLASSIFICATIONS.slice(0, 4).map((cls, i) => {
            const needed = remainingSemesters > 0
              ? ((cls.min * totalSemesters) - (currentCGPA * completedSemesters)) / remainingSemesters
              : null;
            const isAchievable = needed !== null && needed >= 0 && needed <= 5;
            const display = needed === null ? 'N/A' : needed < 0 ? 'Already achieved' : needed > 5 ? 'Not possible' : needed.toFixed(2);

            return `
              <div style="display:flex;align-items:center;justify-content:space-between;
                padding:var(--space-3) var(--space-4);
                ${i < 3 ? 'border-bottom:1px solid var(--color-gray-50)' : ''}">
                <div style="display:flex;align-items:center;gap:var(--space-2)">
                  <div style="width:8px;height:8px;border-radius:50%;background:${cls.dot}"></div>
                  <span style="font-size:var(--font-size-sm);color:var(--color-gray-700);font-weight:500">${cls.label}</span>
                </div>
                <span style="font-size:var(--font-size-sm);font-weight:700;color:${isAchievable ? cls.color : 'var(--color-gray-400)'}">
                  ${display}
                </span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast('Prediction calculated', 'success');
}

export default { renderPredictor };
