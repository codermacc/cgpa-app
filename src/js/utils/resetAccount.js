/**
 * Account reset utility
 */
import { clearState } from './storage.js';

/**
 * Wipe all data and redirect to onboarding
 * @param {object} state - app state manager
 * @param {object} router - app router
 */
export function resetAccount(state, router) {
  clearState();
  state.reset();
  router.go('#/onboarding');
}

export default { resetAccount };
