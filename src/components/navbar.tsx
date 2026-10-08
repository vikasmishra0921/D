"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation, organisation } from "@/lib/content";
import { Arrow, PreviewLink } from "./ui";
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    handle(); window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (e.key === "Tab") {
        const items = [toggle.current, ...Array.from(panel.current?.querySelectorAll<HTMLElement>("a,button") || [])].filter(Boolean) as HTMLElement[];
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    const media = window.matchMedia("(min-width: 1200px)");
    const resize = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", resize); document.addEventListener("keydown", key);
    return () => { document.body.style.overflow = old; document.removeEventListener("keydown", key); media.removeEventListener("change", resize); };
  }, [open]);
  return <header className={`navbar ${scrolled || open ? "navbar-solid" : ""}`}>
    <div className="nav-inner"><a className="wordmark" href="#home" aria-label={`${organisation.name} home`}><span>AIM<span className="wordmark-dot">.</span></span><span className="wordmark-country">GERMANY</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <div className="nav-actions"><div className="languages"><PreviewLink title="German edition" className="language">DE</PreviewLink><span>/</span><span aria-label="Current language: English">EN</span></div><a className="button nav-join" href="#get-involved">Join the Community <Arrow /></a></div>
      <button ref={toggle} className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    <div id="mobile-navigation" ref={panel} className={`mobile-panel ${open ? "is-open" : ""}`} inert={!open} aria-hidden={!open}>
      <nav aria-label="Mobile navigation">{navigation.map(([label,id], i) => <a key={id} href={`#${id}`} style={{ transitionDelay: `${i * 35}ms` }} onClick={() => { setOpen(false); requestAnimationFrame(() => { document.getElementById(id)?.focus({ preventScroll: true }); }); }}><span className="menu-number">0{i+1}</span>{label}<Arrow /></a>)}</nav>
      <p className="eyebrow">Liberty · Equality · Fraternity</p>
    </div>
  </header>;
}
