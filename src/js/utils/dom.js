/**
 * DOM utilities
 */

/** @param {string} selector @param {Element} [ctx] */
export const $ = (selector, ctx = document) => ctx.querySelector(selector);

/** @param {string} selector @param {Element} [ctx] */
export const $$ = (selector, ctx = document) => [...ctx.querySelectorAll(selector)];

/**
 * Create element with attributes and children
 * @param {string} tag
 * @param {object} [attrs]
 * @param {string|Element|Array} [children]
 */
export function el(tag, attrs = {}, children = '') {
  const element = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') element.className = v;
    else if (k === 'data') Object.entries(v).forEach(([dk, dv]) => element.dataset[dk] = dv);
    else if (k.startsWith('on')) element.addEventListener(k.slice(2), v);
    else element.setAttribute(k, v);
  });
  if (Array.isArray(children)) {
    children.forEach(c => c && element.append(typeof c === 'string' ? c : c));
  } else if (children instanceof Element) {
    element.append(children);
  } else if (children) {
    element.innerHTML = children;
  }
  return element;
}

/** Set inner HTML safely */
export function setHTML(selector, html, ctx = document) {
  const el = $(selector, ctx);
  if (el) el.innerHTML = html;
}

/** Show element */
export function show(selector, ctx = document) {
  const el = $(selector, ctx);
  if (el) el.classList.remove('hidden');
}

/** Hide element */
export function hide(selector, ctx = document) {
  const el = $(selector, ctx);
  if (el) el.classList.add('hidden');
}

/** Add class */
export function addClass(selector, cls, ctx = document) {
  const el = $(selector, ctx);
  if (el) el.classList.add(cls);
}

/** Remove class */
export function removeClass(selector, cls, ctx = document) {
  const el = $(selector, ctx);
  if (el) el.classList.remove(cls);
}

/** Animate element */
export function animate(el, cls, duration = 300) {
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), duration);
}

/** Format number to fixed decimals */
export function fmt(n, d = 2) {
  return parseFloat(n).toFixed(d);
}

/** Get initials from name */
export function getInitials(name = '') {
  return name.trim().split(' ').slice(0, 2).map(w => w[0]?.toUpperCase()).join('');
}

export default { $, $$, el, setHTML, show, hide, addClass, removeClass, animate, fmt, getInitials };
