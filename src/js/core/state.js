/**
 * Centralized state management
 * Single source of truth persisted to localStorage
 */
import { loadState, saveState, clearState } from '../utils/storage.js';

const DEFAULT_STATE = {
  profile: null,
  semesters: [],
  predictions: [],
  settings: {
    theme: 'light',
    gradeScale: 5
  },
  analytics: {},
  onboardingDone: false
};

class StateManager {
  constructor() {
    this._state = this._load();
    this._listeners = [];
  }

  _load() {
    const saved = loadState();
    if (saved) return { ...DEFAULT_STATE, ...saved };
    return { ...DEFAULT_STATE };
  }

  _persist() {
    saveState(this._state);
  }

  /** Subscribe to state changes */
  subscribe(fn) {
    this._listeners.push(fn);
    return () => { this._listeners = this._listeners.filter(l => l !== fn); };
  }

  _notify(key) {
    this._listeners.forEach(fn => fn(key, this._state));
  }

  /** Get full state */
  get() { return this._state; }

  /** Get specific key */
  getKey(key) { return this._state[key]; }

  /** Update profile */
  setProfile(profile) {
    this._state.profile = { ...this._state.profile, ...profile };
    this._persist();
    this._notify('profile');
  }

  /** Mark onboarding complete */
  completeOnboarding() {
    this._state.onboardingDone = true;
    this._persist();
    this._notify('onboardingDone');
  }

  /** Add a semester */
  addSemester(semester) {
    const id = Date.now().toString();
    const newSemester = { id, createdAt: new Date().toISOString(), ...semester };
    this._state.semesters = [...this._state.semesters, newSemester];
    this._persist();
    this._notify('semesters');
    return newSemester;
  }

  /** Update a semester */
  updateSemester(id, updates) {
    this._state.semesters = this._state.semesters.map(s =>
      s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
    );
    this._persist();
    this._notify('semesters');
  }

  /** Delete a semester */
  deleteSemester(id) {
    this._state.semesters = this._state.semesters.filter(s => s.id !== id);
    this._persist();
    this._notify('semesters');
  }

  /** Get all semesters sorted by year/session */
  getSemesters() {
    return [...this._state.semesters].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.semester === 'First' ? -1 : 1;
    });
  }

  /** Save a prediction */
  addPrediction(prediction) {
    const id = Date.now().toString();
    const newPrediction = { id, createdAt: new Date().toISOString(), ...prediction };
    this._state.predictions = [newPrediction, ...this._state.predictions].slice(0, 20);
    this._persist();
    this._notify('predictions');
    return newPrediction;
  }

  /** Update settings */
  setSettings(updates) {
    this._state.settings = { ...this._state.settings, ...updates };
    this._persist();
    this._notify('settings');
  }

  /** Full reset */
  reset() {
    this._state = { ...DEFAULT_STATE };
    clearState();
    this._notify('reset');
  }

  /** Export full state as JSON */
  exportJSON() {
    return JSON.stringify(this._state, null, 2);
  }

  /** Import state from JSON */
  importJSON(json) {
    try {
      const imported = JSON.parse(json);
      this._state = { ...DEFAULT_STATE, ...imported };
      this._persist();
      this._notify('import');
      return true;
    } catch {
      return false;
    }
  }
}

export const state = new StateManager();
export default state;
