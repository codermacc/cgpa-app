/**
 * Bottom Navigation Component
 */

const NAV_ITEMS = [
  {
    route: '#/dashboard',
    label: 'Home',
    icon: `<img src="/public/Home.svg" alt="Home"/>`
  },
  {
    route: '#/calculator',
    label: 'Calculate',
    icon: `<img src="/public/Calculator.svg" alt="Calculator"/>`
  },
  {
    route: '#/history',
    label: 'History',
    icon: `<img src="/public/History1.svg" alt="History"/>`
  },
  {
    route: '#/predictor',
    label: 'Predict',
    icon: `<img src="/public/Predictor.svg" alt="Predictor"/>`
  },
  {
    route: '#/profile',
    label: 'Profile',
    icon: `<img src="/public/Profile.svg" alt="Profile"/>`
  }
];

/**
 * Render bottom navigation
 * @param {HTMLElement} container
 * @param {string} activeRoute
 */
export function renderBottomNav(container, activeRoute) {
  container.innerHTML = NAV_ITEMS.map(item => `
    <button class="nav-item ${activeRoute === item.route ? 'active' : ''}"
            onclick="window.location.hash='${item.route}'"
            aria-label="${item.label}"
            ${activeRoute === item.route ? 'aria-current="page"' : ''}>
      <span class="nav-icon-wrap">${item.icon}</span>
      <span>${item.label}</span>
    </button>
  `).join('');
}

export default { renderBottomNav };
