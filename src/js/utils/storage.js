/**
 * Storage utility — single key localStorage persistence
 * All app data lives under 'cgpa-app'
 */

const STORAGE_KEY = 'cgpa-app';

/** @returns {object} Full app state */
export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** @param {object} state - Full app state to persist */
export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

/** Wipes everything */
export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

export default { loadState, saveState, clearState };
