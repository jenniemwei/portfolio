/**
 * Empty grid column: `display: none` below `md` (not a grid item), visible from `md` up.
 * Use inside `Row` when the desktop layout includes an empty gutter column; hidden below `md` so `Row` can stack remaining cells in one column.
 */
export function Spacer() {
  return (
    <div
      aria-hidden
      className="hidden min-h-0 min-w-0 md:block"
    />
  );
}
