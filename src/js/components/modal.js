/**
 * Modal component
 */

const overlay = () => document.getElementById('modal-overlay');

/**
 * Show a modal
 * @param {string} html - Modal inner HTML
 * @param {{ center?: boolean, onClose?: Function }} [options]
 */
export function showModal(html, options = {}) {
  const el = overlay();
  el.innerHTML = `
    <div class="modal ${options.center ? 'center-modal' : ''}">
      <div class="modal-handle"></div>
      ${html}
    </div>
  `;
  el.classList.remove('hidden');
  if (options.center) el.classList.add('center');
  else el.classList.remove('center');

  // Close on backdrop click
  el.addEventListener('click', (e) => {
    if (e.target === el) {
      closeModal();
      options.onClose?.();
    }
  }, { once: true });
}

/** Close modal */
export function closeModal() {
  const el = overlay();
  el.classList.add('hidden');
  el.innerHTML = '';
}

/**
 * Show a confirmation dialog
 * @param {{ title, message, confirmLabel, confirmClass, onConfirm, onCancel }}
 */
export function showConfirm({ title, message, confirmLabel = 'Confirm', confirmClass = 'btn-primary', onConfirm, onCancel }) {
  showModal(`
    <h2 class="modal-title">${title}</h2>
    <p style="font-size:var(--font-size-sm);color:var(--color-gray-600);line-height:1.6;">${message}</p>
    <div class="modal-actions">
      <button class="btn btn-ghost" id="modal-cancel">Cancel</button>
      <button class="btn ${confirmClass}" id="modal-confirm">${confirmLabel}</button>
    </div>
  `, { center: true });

  document.getElementById('modal-cancel').addEventListener('click', () => {
    closeModal();
    onCancel?.();
  });
  document.getElementById('modal-confirm').addEventListener('click', () => {
    closeModal();
    onConfirm?.();
  });
}

export default { showModal, closeModal, showConfirm };
