import { organisation } from "@/lib/content";
import { Arrow, Asset } from "./ui";
import { ArrowDown } from "lucide-react";
export function Hero({ available }: { available: boolean }) {
  return <section className={`hero ${available ? "hero-with-portrait" : ""}`} id="home" tabIndex={-1}>
    <div className="hero-grid" aria-hidden="true" /><div className="hero-orbit" aria-hidden="true" />
    <div className="container hero-content"><div className="hero-copy"><p className="eyebrow light"><span />JAI BHIM · GERMANY</p>
      <h1>Equality.<br />Education.<br />Dignity.<br /><span>Together.</span></h1>
      <p className="hero-description">Building a stronger Ambedkarite community in Germany, inspired by the vision of Dr. B. R. Ambedkar.</p>
      <div className="hero-buttons"><a href="#mission" className="button button-white">Explore Our Mission <Arrow /></a><a href="#get-involved" className="button button-outline">Get Involved <Arrow /></a></div>
      <p className="hero-values">LIBERTY <b>·</b> EQUALITY <b>·</b> FRATERNITY</p>
    </div><div className="hero-art"><div className="portrait-orbits" aria-hidden="true" /><Asset src={organisation.images.hero} available={available} variant="hero" label="Dr. B. R. Ambedkar" /><div className="hero-art-caption"><span>THE VISION LIVES ON</span><p>Ideas that transcend borders.<br />Values that bring us together.</p></div></div></div>
    <div className="container hero-bottom"><a href="#principles"><ArrowDown size={15} aria-hidden="true" /> Discover our purpose</a><span>A COMMUNITY WEBSITE CONCEPT</span></div>
  </section>;
}
