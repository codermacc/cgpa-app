/**
 * Academic Suite Router
 * Hash-based SPA Navigation
 */

class Router {
  constructor() {
    this._routes = {};
    this._currentRoute = null;
    this._beforeEach = null;

    window.addEventListener('hashchange', () => this._resolve());
  }

  /**
   * Register route
   */
  on(hash, handler) {
    this._routes[hash] = handler;
    return this;
  }

  /**
   * Route guard
   */
  beforeEach(callback) {
    this._beforeEach = callback;
    return this;
  }

  /**
   * Navigate
   */
  go(hash) {
    if (!hash.startsWith('#/')) {
      console.warn(`Invalid route: ${hash}`);
      return;
    }

    window.location.hash = hash;
  }

  /**
   * Replace route
   */
  replace(hash) {
    history.replaceState(null, '', hash);
    this._resolve();
  }

  /**
   * Current route
   */
  current() {
    return this._currentRoute || '#/';
  }

  /**
   * Start router
   */
  start() {
    if (!window.location.hash) {
      window.location.hash = '#/onboarding';
    }

    this._resolve();
  }

  /**
   * Route resolver
   */
  _resolve() {
    const hash = window.location.hash || '#/onboarding';

    const route =
      this._routes[hash] ||
      this._routes['#/404'] ||
      this._routes['*'];

    if (!route) {
      console.error(`No route registered for "${hash}"`);
      return;
    }

    if (this._beforeEach) {
      const allowed = this._beforeEach(
        hash,
        this._currentRoute
      );

      if (allowed === false) {
        return;
      }
    }

    this._currentRoute = hash;

    try {
      route(hash);
    } catch (error) {
      console.error(
        `Router failed for route "${hash}"`,
        error
      );
    }
  }
}

const router = new Router();

export { router };
export default router;