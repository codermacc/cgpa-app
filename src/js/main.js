/**
 * Main entry point — bootstraps CGPA Calculator app
 */
import { initApp } from './core/app.js';

// Boot after splash animation
const SPLASH_DURATION = 1700;

function hideSplash() {
  const splash = document.getElementById('splash-screen');
  if (splash) {
    splash.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    splash.style.opacity = '0';
    splash.style.transform = 'scale(1.04)';
    setTimeout(() => splash.remove(), 400);
  }
}

// Start app
setTimeout(() => {
  hideSplash();
  initApp();
}, SPLASH_DURATION);

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}
