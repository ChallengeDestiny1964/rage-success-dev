import type { CSSProperties, ReactNode } from "react";

export function ScaledCanvas({
  children,
  width = 1280,
  height = 800,
}: {
  children: ReactNode;
  width?: number;
  height?: number;
}) {
  const style = { "--canvas-w": `${width}px`, "--canvas-h": `${height}px` } as CSSProperties;

  return (
    <div className="scaled-canvas" style={style}>
      <div className="scaled-canvas-inner">{children}</div>
    </div>
  );
}
