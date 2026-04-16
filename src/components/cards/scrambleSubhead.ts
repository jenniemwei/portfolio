const GLYPHS =
  "ABCDEHKMNPRSTVWXZabcdfhkmnprstvwxz023458";

/**
 * Animates `from` → `to` with a short character scramble. Calls `onUpdate` each frame;
 * returns a cancel function (stops rAF, does not fire `onUpdate` again).
 */
export function runScrambleAnimation(
  from: string,
  to: string,
  onUpdate: (value: string) => void,
  durationMs: number,
): () => void {
  const maxLen = Math.max(from.length, to.length);
  const a = from.padEnd(maxLen, " ");
  const b = to.padEnd(maxLen, " ");
  const start = performance.now();
  let raf = 0;
  let cancelled = false;

  const tick = (now: number) => {
    if (cancelled) return;
    const elapsed = now - start;
    const p = Math.min(1, elapsed / durationMs);
    if (p >= 1) {
      onUpdate(to);
      return;
    }
    const eased = 1 - (1 - p) ** 2.2;
    let out = "";
    for (let i = 0; i < maxLen; i++) {
      const charRevealT = (i + 0.45) / (maxLen + 0.5);
      if (eased >= charRevealT) {
        out += b[i] ?? " ";
      } else {
        const chA = a[i] ?? " ";
        out += p < 0.04 ? chA : GLYPHS[(Math.random() * GLYPHS.length) | 0]!;
      }
    }
    onUpdate(out.replace(/\s+$/, ""));
    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
  return () => {
    cancelled = true;
    cancelAnimationFrame(raf);
  };
}
