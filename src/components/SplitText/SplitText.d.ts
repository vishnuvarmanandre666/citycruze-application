import type { CSSProperties, ReactElement } from "react";

type SplitTextProps = {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  text: string;
  className?: string;
  effect?: "rise" | "fade" | "blur" | "flip" | "pop" | "skew" | "wave";
  trigger?: "view" | "load" | "hover" | "click";
  loop?: boolean;
  loopDelay?: number;
  hoverEffect?: "none" | "lift" | "wave";
  color?: string;
  accentColor?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "words, chars";
  staggerFrom?: "start" | "center" | "end" | "edges" | "random";
  mask?: boolean;
  threshold?: number;
  rootMargin?: string;
  textAlign?: CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
};

export default function SplitText(props: SplitTextProps): ReactElement;
