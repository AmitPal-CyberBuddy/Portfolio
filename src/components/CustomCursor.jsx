import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(query.matches && !reduceMotion.matches && window.innerWidth > 1024);
    sync();
    query.addEventListener('change', sync);
    reduceMotion.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      query.removeEventListener('change', sync);
      reduceMotion.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const point = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { ...point };
    const ring = { ...point };
    let frame;

    const onMove = (event) => { point.x = event.clientX; point.y = event.clientY; };
    const onOver = (event) => {
      const trigger = event.target.closest?.('[data-cursor]');
      setHovering(Boolean(trigger));
      setLabel(trigger?.getAttribute('data-cursor') || '');
    };
    const animate = () => {
      dot.x += (point.x - dot.x) * 0.34;
      dot.y += (point.y - dot.y) * 0.34;
      ring.x += (point.x - ring.x) * 0.13;
      ring.y += (point.y - ring.y) * 0.13;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      frame = window.requestAnimationFrame(animate);
    };

    document.documentElement.classList.add('custom-cursor-on');
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver);
    animate();
    return () => {
      document.documentElement.classList.remove('custom-cursor-on');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div className="cursor-system" aria-hidden="true">
      <span ref={dotRef} className="cursor-dot" />
      <span ref={ringRef} className={`cursor-ring ${hovering ? 'is-hovering' : ''}`}><span>{label}</span></span>
    </div>
  );
}
