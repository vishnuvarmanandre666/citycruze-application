import type { SimpleIcon } from "simple-icons";

export default function BrandLogo({ icon, brand }: { icon: SimpleIcon; brand: string }) {
  return <span className="brand-lockup"><svg viewBox="0 0 24 24" role="img" aria-label={`${brand} logo`}><path d={icon.path} fill={`#${icon.hex}`} /></svg><span>{brand}</span></span>;
}
