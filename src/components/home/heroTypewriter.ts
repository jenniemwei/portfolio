type TypewriterOptions = {
  granularity?: "char" | "word";
  deleteMsPerChar?: number;
  typeMsPerChar?: number;
  deleteMsPerWord?: number;
  typeMsPerWord?: number;
  pauseMs?: number;
};

function splitWords(text: string): string[] {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/) : [];
}

function joinWords(words: string[]): string {
  return words.join(" ");
}

/**
 * Deletes `from`, then types `to`. `word` granularity updates on word boundaries
 * (fewer mid-animation line-wrap jumps). Returns a cancel function.
 */
export function runTypewriterTransition(
  from: string,
  to: string,
  onUpdate: (value: string) => void,
  options: TypewriterOptions = {},
): () => void {
  if (from === to) {
    onUpdate(to);
    return () => {};
  }

  const granularity = options.granularity ?? "word";
  const pauseMs = options.pauseMs ?? 100;

  if (granularity === "word") {
    const deleteMs = options.deleteMsPerWord ?? 90;
    const typeMs = options.typeMsPerWord ?? 90;
    const fromWords = splitWords(from);
    const toWords = splitWords(to);

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

    for (let len = fromWords.length; len >= 0; len--) {
      const snapshot = len;
      schedule(() => onUpdate(joinWords(fromWords.slice(0, snapshot))), delay);
      delay += deleteMs;
    }

    delay += pauseMs;

    for (let len = 1; len <= toWords.length; len++) {
      const snapshot = len;
      schedule(() => onUpdate(joinWords(toWords.slice(0, snapshot))), delay);
      delay += typeMs;
    }

    schedule(() => onUpdate(to), delay);

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }

  const deleteMs = options.deleteMsPerChar ?? 28;
  const typeMs = options.typeMsPerChar ?? 28;

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
  options: TypewriterOptions = {},
): number {
  if (from === to) return 0;

  const pauseMs = options.pauseMs ?? 100;
  const granularity = options.granularity ?? "word";

  if (granularity === "word") {
    const deleteMs = options.deleteMsPerWord ?? 90;
    const typeMs = options.typeMsPerWord ?? 90;
    const fromWords = splitWords(from);
    const toWords = splitWords(to);
    return (
      (fromWords.length + 1) * deleteMs +
      pauseMs +
      (toWords.length + 1) * typeMs
    );
  }

  const deleteMs = options.deleteMsPerChar ?? 28;
  const typeMs = options.typeMsPerChar ?? 28;
  return (from.length + 1) * deleteMs + pauseMs + (to.length + 1) * typeMs;
}
