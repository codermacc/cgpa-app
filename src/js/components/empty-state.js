/**
 * Empty state component
 */

/**
 * Render empty state HTML
 * @param {{ icon, title, text, actionLabel, actionFn }}
 */
export function emptyState({ icon, title, text, actionLabel, actionId }) {
  return `
    <div class="empty-state">
      <div class="empty-icon">${icon}</div>
      <p class="empty-title">${title}</p>
      <p class="empty-text">${text}</p>
      ${actionLabel ? `<button class="btn btn-primary btn-sm mt-3" id="${actionId || 'empty-action'}">${actionLabel}</button>` : ''}
    </div>
  `;
}

export default { emptyState };
