import type { CSSProperties, ReactElement } from "react";

type TextLoopProps = {
  text?: string;
  shape?: "wave" | "circle" | "infinity" | "arch" | "line";
  path?: string;
  speed?: number;
  direction?: "forward" | "reverse";
  separator?: string;
  curviness?: number;
  tilt?: number;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  uppercase?: boolean;
  color?: string;
  ribbon?: boolean;
  ribbonColor?: string;
  ribbonWidth?: number;
  edgeFade?: number;
  pauseOnHover?: boolean;
  cross?: boolean;
  crossColor?: string;
  crossAngle?: number;
  draggable?: boolean;
  scrollBoost?: number;
  outline?: boolean;
  outlineWidth?: number;
  preserveAspectRatio?: string;
  className?: string;
  style?: CSSProperties;
};

export default function TextLoop(props: TextLoopProps): ReactElement;
