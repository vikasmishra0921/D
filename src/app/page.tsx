import fs from "node:fs";
import path from "node:path";
import { organisation } from "@/lib/content";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { PhilosophyStrip, AmbedkarLegacy, MissionPillars, GermanyCommunity, Events, Values, Gallery, Resources, GetInvolvedCTA } from "@/components/sections";
export default function Home() {
  const paths = [organisation.images.hero, organisation.images.legacy, organisation.images.community, ...organisation.images.gallery];
  const assets = Object.fromEntries(paths.map(src => [src, fs.existsSync(path.join(process.cwd(), "public", src))]));
  return <><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main"><Hero available={assets[organisation.images.hero]} /><PhilosophyStrip /><AmbedkarLegacy assets={assets} /><MissionPillars /><GermanyCommunity assets={assets} /><Events /><Values /><Gallery assets={assets} /><Resources /><GetInvolvedCTA /></main><Footer /></>;
}
