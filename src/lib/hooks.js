import { useEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from '../content';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function getFocusableElements(container) {
  if (!container) return [];
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
    if (!(element instanceof HTMLElement)) return false;
    if (element.hasAttribute('hidden') || element.getAttribute('aria-hidden') === 'true') return false;
    return !element.inert;
  });
}

export function useCurrentTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date()));
    };
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a1019' : '#f4f7fb');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))];
}

export function useActiveSection() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const update = () => {
      const offset = window.innerHeight * 0.35;
      let current = '';
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return active;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}

/**
 * Whether the page has been scrolled past `offset` — used to switch the fixed
 * header into its compact, elevated state. Scroll events are passive and the
 * state only flips at the threshold, so this never thrashes the main thread.
 */
export function useScrolled(offset = 28) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > offset);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [offset]);

  return scrolled;
}

/**
 * Fit-text: shrinks the referenced element's font-size until every
 * `[data-fit-line]` child fits horizontally. Display headings built from one
 * long unbreakable word ("Vulnerabilities") would otherwise clip inside
 * overflow masks (or overflow the shell) on narrow screens and with real
 * font metrics. Re-measures on container resize and once web fonts finish
 * loading — fallback metrics and real metrics differ, so the first pass is
 * provisional. Writes are guarded so ResizeObserver height feedback cannot
 * bounce the size back and forth.
 */
export function useFitText(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    let fittedWidth = 0;

    const fit = (force = false) => {
      const available = root.clientWidth;
      if (!available) return;
      // Height-only changes (e.g. our own scaling) must not retrigger a pass.
      if (!force && fittedWidth === available) return;

      root.style.fontSize = '';
      const lines = root.querySelectorAll('[data-fit-line]');
      if (!lines.length) return;
      const base = parseFloat(window.getComputedStyle(root).fontSize) || 0;
      let widest = 0;
      lines.forEach((line) => {
        widest = Math.max(widest, line.scrollWidth);
      });

      fittedWidth = available;
      if (base > 0 && widest > available) {
        root.style.fontSize = `${Math.max(base * (available / widest), 16).toFixed(2)}px`;
      }
    };

    fit(true);
    const observer = new ResizeObserver(() => fit());
    observer.observe(root);

    const onFontsReady = () => fit(true);
    if (document.fonts) {
      document.fonts.ready.then(onFontsReady);
      document.fonts.addEventListener('loadingdone', onFontsReady);
      document.fonts.addEventListener('loadingerror', onFontsReady);
    }

    return () => {
      observer.disconnect();
      document.fonts?.removeEventListener('loadingdone', onFontsReady);
      document.fonts?.removeEventListener('loadingerror', onFontsReady);
    };
  }, [ref]);
}

export function useFocusTrap(containerRef, active, { onEscape, initialFocusSelector } = {}) {
  const returnFocusRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const focusInitial = () => {
      const focusables = getFocusableElements(container);
      const initialTarget = initialFocusSelector
        ? container.querySelector(initialFocusSelector)
        : focusables[0];

      if (initialTarget instanceof HTMLElement) initialTarget.focus();
    };

    const frame = window.requestAnimationFrame(focusInitial);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onEscape?.();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusables = getFocusableElements(container);
      if (!focusables.length) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      returnFocusRef.current?.focus?.();
    };
  }, [active, containerRef, initialFocusSelector, onEscape]);
}
