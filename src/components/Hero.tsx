import { lazy, Suspense } from "react";
import { site } from "../content/site";
import { scrollToSection } from "../animations/scrollTo";

const HeroDither = lazy(() => import("../effects/HeroDither").then((module) => ({ default: module.HeroDither })));

export function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <Suspense fallback={null}>
        <HeroDither />
      </Suspense>
      <div className="hero-copy">
        <h1 id="hero-title">
          {site.hero.lines.map((line) => (
            <span className="line-mask" key={line}>
              <span className="hero-line">{line}</span>
            </span>
          ))}
        </h1>
        <p className="hero-lead">{site.hero.lead}</p>
      </div>
      <button
        type="button"
        className="scroll-cue"
        aria-label="Ir para About"
        onClick={() => {
          scrollToSection("about");
        }}
      >
        <span className="scroll-cue-orb" />
        <span className="scroll-cue-line" />
      </button>
    </section>
  );
}
