/**
 * App core — bootstraps the application
 */
import { router } from './router.js';
import { state } from './state.js';
import { renderBottomNav } from '../components/bottom-nav.js';
import { renderOnboarding } from '../pages/onboarding.js';
import { renderDashboard } from '../pages/dashboard.js';
import { renderCalculator } from '../pages/calculator.js';
import { renderHistory } from '../pages/history.js';
import { renderPredictor } from '../pages/predictor.js';
import { renderProfile } from '../pages/profile.js';
import { renderSettings } from '../pages/settings.js';
import { $ } from '../utils/dom.js';

const NAV_ROUTES = ['#/dashboard', '#/calculator', '#/history', '#/predictor', '#/profile', '#/settings'];

/** Pages that show bottom nav */
function showNav(route) {
  const nav = $('#bottom-nav');
  if (NAV_ROUTES.includes(route)) {
    nav.classList.remove('hidden');
    renderBottomNav(nav, route);
  } else {
    nav.classList.add('hidden');
  }
}

/** Set page content */
function setPage(html) {
  const content = $('#page-content');
  content.innerHTML = html;
  content.scrollTop = 0;
}

function setupRoutes() {
  // Guard: redirect to onboarding if no profile
  router.beforeEach((to) => {
    const { onboardingDone } = state.get();
    if (!onboardingDone && to !== '#/onboarding') {
      router.replace('#/onboarding');
      return false;
    }
    return true;
  });

  router.on('#/onboarding', () => {
    const content = $('#page-content');
    content.classList.add('no-nav');
    showNav('#/onboarding');
    renderOnboarding(content);
  });

  router.on('#/dashboard', () => {
    const content = $('#page-content');
    content.classList.remove('no-nav');
    showNav('#/dashboard');
    renderDashboard(content);
  });

  router.on('#/calculator', () => {
    const content = $('#page-content');
    content.classList.remove('no-nav');
    showNav('#/calculator');
    renderCalculator(content);
  });

  router.on('#/history', () => {
    const content = $('#page-content');
    content.classList.remove('no-nav');
    showNav('#/history');
    renderHistory(content);
  });

  router.on('#/predictor', () => {
    const content = $('#page-content');
    content.classList.remove('no-nav');
    showNav('#/predictor');
    renderPredictor(content);
  });

  router.on('#/profile', () => {
    const content = $('#page-content');
    content.classList.remove('no-nav');
    showNav('#/profile');
    renderProfile(content);
  });

  router.on('#/settings', () => {
    const content = $('#page-content');
    content.classList.remove('no-nav');
    showNav('#/settings');
    renderSettings(content);
  });

  // Fallback: go to dashboard or onboarding
  router.on('*', () => {
    const { onboardingDone } = state.get();
    router.replace(onboardingDone ? '#/dashboard' : '#/onboarding');
  });
}

export function initApp() {
  setupRoutes();

  // Show app container
  const appContainer = $('#app-container');
  appContainer.classList.remove('hidden');

  // Start routing
  const { onboardingDone } = state.get();
  const currentHash = window.location.hash;
  if (!currentHash || currentHash === '#/') {
    router.replace(onboardingDone ? '#/dashboard' : '#/onboarding');
  } else {
    router.start();
  }
}

export default { initApp };
