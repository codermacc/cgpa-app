/**
 * Settings Page — theme, export, import, reset account
 */
import state from '../core/state.js';
import router from '../core/router.js';
import { $, getInitials } from '../utils/dom.js';
import { showToast } from '../components/toast.js';
import { showConfirm, showModal, closeModal } from '../components/modal.js';
import { resetAccount } from '../utils/resetAccount.js';
import { exportJSON, exportPDF, exportPNG, importJSON } from '../services/export.service.js';

export function renderSettings(container) {
  const { profile, settings, semesters } = state.get();
  const version = '1.0.0';

  container.innerHTML = `
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
            ${getInitials(profile?.name || '') || '👤'}
          </div>
          <div>
            <p style="font-size:var(--font-size-base);font-weight:700;color:var(--color-gray-900)">${profile?.name || 'Student'}</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-gray-400)">${profile?.university || '—'}</p>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:auto;color:var(--color-gray-300)"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>

      <!-- Data Section -->
      <div style="margin-top:var(--space-4)">
        <p class="section-title" style="padding:0 var(--page-padding);margin-bottom:var(--space-2)">Data & Export</p>
        <div class="settings-list">
          ${settingsItem('export-json', '#22c55e', exportIcon, 'Export as JSON', 'Download all your data', 'green')}
          ${settingsItem('export-pdf', '#2563eb', pdfIcon, 'Export as PDF', 'Generate academic report', 'blue')}
          ${settingsItem('export-png', '#7c3aed', imageIcon, 'Export as Image', 'Screenshot your dashboard', 'purple')}
          ${settingsItem('import-data', '#d97706', importIcon, 'Import Data', 'Restore from JSON backup', 'orange')}
        </div>
      </div>

      <!-- App Section -->
      <div style="margin-top:var(--space-4)">
        <p class="section-title" style="padding:0 var(--page-padding);margin-bottom:var(--space-2)">App</p>
        <div class="settings-list">
          ${settingsItem('view-profile', '#16a34a', profileIcon, 'Edit Profile', 'Update your information', 'green')}
          ${settingsItem('about-app', '#6b7280', infoIcon, 'About App', `Version ${version} · CGPA Calculator`, 'gray')}
          ${settingsItem('privacy', '#6b7280', privacyIcon, 'Privacy', 'How your data is stored', 'gray')}
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
  `;

  bindSettingsEvents(container);
}

function settingsItem(id, color, icon, label, desc, colorName) {
  const bgMap = { green: 'var(--color-primary-bg)', blue: 'var(--color-info-bg)', purple: '#ede9fe', orange: 'var(--color-warning-bg)', gray: 'var(--color-gray-100)' };
  const fgMap = { green: 'var(--color-primary)', blue: 'var(--color-info)', purple: '#7c3aed', orange: 'var(--color-warning)', gray: 'var(--color-gray-500)' };
  return `
    <div class="settings-item" id="${id}">
      <div class="settings-icon" style="background:${bgMap[colorName]};color:${fgMap[colorName]}">
        ${icon}
      </div>
      <div class="settings-info">
        <p class="settings-label">${label}</p>
        <p class="settings-desc">${desc}</p>
      </div>
      <svg class="settings-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </div>
  `;
}

function bindSettingsEvents(container) {
  $('#export-json', container)?.addEventListener('click', async () => {
    try { exportJSON(); showToast('JSON exported', 'success'); } catch { showToast('Export failed', 'error'); }
  });

  $('#export-pdf', container)?.addEventListener('click', async () => {
    showToast('Generating PDF…', 'default');
    try { await exportPDF(); showToast('PDF downloaded', 'success'); } catch (e) { showToast('PDF export failed', 'error'); console.error(e); }
  });

  $('#export-png', container)?.addEventListener('click', async () => {
    showToast('Capturing screen…', 'default');
    try { await exportPNG(); showToast('Image downloaded', 'success'); } catch { showToast('Image export failed', 'error'); }
  });

  $('#import-data', container)?.addEventListener('click', () => {
    $('#import-file-input', container)?.click();
  });

  $('#import-file-input', container)?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    showConfirm({
      title: 'Import Data',
      message: 'This will <strong>replace all current data</strong> with the imported file. This cannot be undone. Proceed?',
      confirmLabel: 'Import & Replace',
      confirmClass: 'btn-danger',
      onConfirm: async () => {
        const success = await importJSON(file);
        if (success) {
          showToast('Data imported successfully', 'success');
          router.go('#/dashboard');
        } else {
          showToast('Import failed — invalid file', 'error');
        }
      }
    });
    e.target.value = '';
  });

  $('#view-profile', container)?.addEventListener('click', () => router.go('#/profile'));

  $('#about-app', container)?.addEventListener('click', () => {
    showModal(`
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
    `);
  });

  $('#privacy', container)?.addEventListener('click', () => {
    showModal(`
      <h2 class="modal-title">Privacy Policy</h2>
      <div style="display:flex;flex-direction:column;gap:var(--space-3)">
        ${[
          ['🔒 Local Storage Only', 'All your academic data — semesters, grades, profile, predictions — is stored exclusively in your browser\'s localStorage. Nothing is sent to any server.'],
          ['📵 No Tracking', 'We do not collect analytics, usage data, or any personally identifiable information.'],
          ['📤 Your Data, Your Control', 'Export your data anytime as JSON. Delete everything instantly with Account Reset. You are in complete control.'],
          ['🌐 Works Offline', 'Once installed as a PWA, the app works fully offline. No internet connection required to use any feature.']
        ].map(([title, body]) => `
          <div style="padding:var(--space-3);background:var(--color-gray-50);border-radius:var(--radius-lg)">
            <p style="font-size:var(--font-size-sm);font-weight:700;color:var(--color-gray-800);margin-bottom:4px">${title}</p>
            <p style="font-size:var(--font-size-xs);color:var(--color-gray-500);line-height:1.6">${body}</p>
          </div>
        `).join('')}
      </div>
      <button class="btn btn-primary btn-full mt-3" onclick="document.getElementById('modal-overlay').classList.add('hidden')">Got it</button>
    `);
  });

  $('#reset-account-btn', container)?.addEventListener('click', () => {
    showConfirm({
      title: '⚠️ Reset Account',
      message: `This will permanently delete all academic records and profile information. You will be redirected to onboarding. <br><br><strong>This cannot be undone.</strong>`,
      confirmLabel: 'Yes, Reset Everything',
      confirmClass: 'btn-danger',
      onConfirm: () => {
        resetAccount(state, router);
        showToast('Account reset successfully', 'success');
      }
    });
  });
}

// SVG icons
const exportIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`;
const pdfIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`;
const imageIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;
const importIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
const profileIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
const infoIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
const privacyIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;

export default { renderSettings };
