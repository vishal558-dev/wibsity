import React from 'react';

export interface CursorMarksProps {
  /** Must match the `windowWidth`/`windowHeight` passed to the enclosing
   *  `CursorWindow` — both size the same reveal window from one call site, and
   *  drifting them apart would frame the wrong area. */
  width?: number;
  height?: number;
}

/**
 * Four corner brackets that track the cursor field's current position — a
 * viewfinder frame around `CursorWindow`'s reveal, drawn in the same 1.5px
 * stroke, flat caps and mitred joints as the rest of the icon set, rather than
 * a generic ring or glow. It is what turns "a blurry patch follows your mouse"
 * into "you are looking through an instrument."
 *
 * Positioning is pure CSS (`.cursor-marks`, `transform: translate(...)` off
 * the inherited `--cx`/`--cy`) — this component only supplies the marks
 * themselves, sized to match the window exactly via `width`/`height`. It only
 * ever renders correctly inside a `.cursor-field` ancestor (see
 * `useCursorField`), since that is what supplies `--cx`/`--cy` in the first
 * place.
 */
export const CursorMarks: React.FC<CursorMarksProps> = ({ width = 170, height = 100 }) => {
  const arm = 9;
  return (
    <svg
      className="cursor-marks"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      <path d={`M1.5 ${arm + 1.5}V1.5H${arm + 1.5}`} />
      <path d={`M${width - 1.5} ${arm + 1.5}V1.5H${width - arm - 1.5}`} />
      <path d={`M1.5 ${height - arm - 1.5}V${height - 1.5}H${arm + 1.5}`} />
      <path d={`M${width - 1.5} ${height - arm - 1.5}V${height - 1.5}H${width - arm - 1.5}`} />
    </svg>
  );
};
