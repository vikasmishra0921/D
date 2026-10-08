"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, BookOpen, FileText, Lightbulb, Megaphone, Scale, UsersRound } from "lucide-react";

export function Icon({ name, size = 28 }: { name: string; size?: number }) {
  const Component = ({ book: BookOpen, voice: Megaphone, people: UsersRound, scale: Scale, document: FileText, light: Lightbulb } as const)[name as "book"] || BookOpen;
  return <Component size={size} strokeWidth={1.4} aria-hidden="true" />;
}
export function Arrow() { return <ArrowUpRight size={19} strokeWidth={1.7} aria-hidden="true" />; }
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only hide offscreen sections after hydration; content remains readable without JS.
    if (node.getBoundingClientRect().top > window.innerHeight) node.classList.add("reveal-pending");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.remove("reveal-pending"); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
export function SectionHeading({ eyebrow, title, supporting, children }: { eyebrow: string; title: string; supporting?: string; children?: ReactNode }) {
  return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{supporting && <p className="section-supporting">{supporting}</p>}</div>{children}</div>;
}
// Unavailable destinations remain non-interactive and outside the keyboard tab order.
// Real destinations are ordinary links; this homepage never opens a demo popup.
export function PreviewLink({ title, children, className = "text-link", href }: { title: string; children: ReactNode; className?: string; href?: string }) {
  return href
    ? <a className={className} href={href}>{children}</a>
    : <div className={`${className} link-unavailable`} role="link" aria-disabled="true" aria-label={`${title} ? available after launch`}>{children}</div>;
}
export function Asset({ src, available, variant = "community", label, className = "" }: { src: string; available: boolean; variant?: string; label: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return <div className={`visual visual-${variant} ${className}`}>
    {available && !failed ? <img src={src} alt={label} onError={() => setFailed(true)} loading={variant === "hero" ? "eager" : "lazy"} /> : <>
      <div className="visual-geometry" aria-hidden="true"><i /><i /><i /><i /></div>
      {(variant === "hero" || variant === "legacy") ? <div className="portrait-placeholder"><span className="portrait-dates">1891 — 1956</span><div className="portrait-initials" aria-hidden="true">B<span>R</span></div><span className="portrait-name">DR. B. R.<br /><strong>AMBEDKAR</strong></span><span className="asset-caption">Portrait to be added</span></div> : <div className="community-placeholder"><UsersRound strokeWidth={0.7} aria-hidden="true" /><span>{label}</span><small>Photograph to be added</small></div>}
    </>}
  </div>;
}
