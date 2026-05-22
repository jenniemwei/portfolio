const GLYPHS =
  "ABCDEHKMNPRSTVWXZabcdfhkmnprstvwxz023458";

function randomGlyph(): string {
  return GLYPHS[(Math.random() * GLYPHS.length) | 0]!;
}

/**
 * Animates `from` → `to` with a character scramble. Visible length starts at
 * `from.length` and eases toward `to.length` (shrinks early, grows late) so
 * text does not spill outside a fixed-width box. Calls `onUpdate` each frame;
 * returns a cancel function (stops rAF, does not fire `onUpdate` again).
 */
export function runScrambleAnimation(
  from: string,
  to: string,
  onUpdate: (value: string) => void,
  durationMs: number,
): () => void {
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
    const lenDelta = to.length - from.length;
    const displayLen =
      lenDelta <= 0
        ? Math.ceil(from.length + lenDelta * eased)
        : Math.floor(from.length + lenDelta * eased);

    let out = "";
    for (let i = 0; i < displayLen; i++) {
      if (i >= to.length) {
        const chA = i < from.length ? from[i]! : " ";
        out += p < 0.04 ? chA : randomGlyph();
        continue;
      }
      const charRevealT = (i + 0.45) / (to.length + 0.5);
      if (eased >= charRevealT) {
        out += to[i]!;
      } else {
        const chA = i < from.length ? from[i]! : randomGlyph();
        out += p < 0.04 ? chA : randomGlyph();
      }
    }
    onUpdate(out);
    raf = requestAnimationFrame(tick);
  };

  raf = requestAnimationFrame(tick);
  return () => {
    cancelled = true;
    cancelAnimationFrame(raf);
  };
};
