import { useEffect, useRef, useCallback } from 'react';

export function useDwell(gazeRef, dwellTime = 1500, onDwell, onProgress) {
  const currentTarget = useRef(null);
  const dwellStart = useRef(null);
  const rafRef = useRef(null);

  const tick = useCallback(() => {
    const gaze = gazeRef.current;

    if (!gaze || gaze.x == null) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    // Find which data-dwell element the gaze is over
    const allTargets = document.querySelectorAll('[data-dwell]');
    let hitId = null;

    for (const el of allTargets) {
      const r = el.getBoundingClientRect();
      if (gaze.x >= r.left && gaze.x <= r.right &&
          gaze.y >= r.top  && gaze.y <= r.bottom) {
        hitId = el.getAttribute('data-dwell');
        break;
      }
    }

    if (hitId) {
      if (currentTarget.current !== hitId) {
        // New target — reset timer
        currentTarget.current = hitId;
        dwellStart.current = Date.now();
        onProgress?.(hitId, 0);
      } else {
        const elapsed = Date.now() - dwellStart.current;
        const progress = Math.min(100, (elapsed / dwellTime) * 100);
        onProgress?.(hitId, progress);

        if (elapsed >= dwellTime) {
          onDwell(hitId);
          currentTarget.current = null;
          dwellStart.current = null;
          onProgress?.(hitId, 0);
          
          // Cooldown — pause dwell detection for 800ms after a selection
          cancelAnimationFrame(rafRef.current);
          setTimeout(() => {
            rafRef.current = requestAnimationFrame(tick);
          }, 800);
          return;
        }
      }
    } else {
      if (currentTarget.current !== null) {
        if (onProgress) onProgress(currentTarget.current, 0);
        currentTarget.current = null;
        dwellStart.current = null;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  }, [gazeRef, dwellTime, onDwell, onProgress]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);
}
