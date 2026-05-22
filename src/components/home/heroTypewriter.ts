/**
 * Deletes `from` one character at a time (end → start), then types `to` one character
 * at a time (start → end). Returns a cancel function.
 */
export function runTypewriterTransition(
  from: string,
  to: string,
  onUpdate: (value: string) => void,
  options: {
    deleteMsPerChar?: number;
    typeMsPerChar?: number;
    pauseMs?: number;
  } = {},
): () => void {
  if (from === to) {
    onUpdate(to);
    return () => {};
  }

  const deleteMs = options.deleteMsPerChar ?? 28;
  const typeMs = options.typeMsPerChar ?? 28;
  const pauseMs = options.pauseMs ?? 100;

  let cancelled = false;
  const timeouts: number[] = [];

  const schedule = (fn: () => void, delay: number) => {
    timeouts.push(
      window.setTimeout(() => {
        if (!cancelled) fn();
      }, delay),
    );
  };

  let delay = 0;

  for (let len = from.length; len >= 0; len--) {
    const snapshot = len;
    schedule(() => onUpdate(from.slice(0, snapshot)), delay);
    delay += deleteMs;
  }

  delay += pauseMs;

  for (let len = 1; len <= to.length; len++) {
    const snapshot = len;
    schedule(() => onUpdate(to.slice(0, snapshot)), delay);
    delay += typeMs;
  }

  schedule(() => onUpdate(to), delay);

  return () => {
    cancelled = true;
    timeouts.forEach((id) => window.clearTimeout(id));
  };
}

/** Total ms for delete + pause + type (used to schedule the next hold). */
export function typewriterTransitionDuration(
  from: string,
  to: string,
  options: {
    deleteMsPerChar?: number;
    typeMsPerChar?: number;
    pauseMs?: number;
  } = {},
): number {
  if (from === to) return 0;
  const deleteMs = options.deleteMsPerChar ?? 28;
  const typeMs = options.typeMsPerChar ?? 28;
  const pauseMs = options.pauseMs ?? 100;
  return (from.length + 1) * deleteMs + pauseMs + (to.length + 1) * typeMs;
}
