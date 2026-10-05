import type Lenis from "lenis";
import { ScrollTrigger } from "./gsap";

const SECTION_IDS = new Set(["hero", "about", "services", "cases", "team", "clients"]);

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null): void {
  lenis = instance;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function scrollToSection(id: string): void {
  if (!SECTION_IDS.has(id)) {
    return;
  }
  rememberSection(id);
  const pinned = ScrollTrigger.getById(id);
  if (pinned) {
    scrollToTarget(pinned.start + 2);
    return;
  }
  scrollToTarget(`#${id}`);
}

export function scrollToTarget(target: string | number | HTMLElement): void {
  if (lenis) {
    lenis.start();
    lenis.scrollTo(target, {
      offset: 0,
      onComplete: () => {
        ScrollTrigger.update();
      },
    });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "auto" });
    return;
  }
  if (typeof target === "string") {
    const id = target.startsWith("#") ? target.slice(1) : target;
    if (!SECTION_IDS.has(id)) {
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
  }
}

export function scrollToProgress(triggerId: string, index: number, count: number): void {
  const trigger = ScrollTrigger.getById(triggerId);
  if (!trigger || count <= 1) {
    return;
  }
  const clamped = Math.min(Math.max(index, 0), count - 1);
  const progress = clamped / (count - 1);
  scrollToTarget(trigger.start + (trigger.end - trigger.start) * progress);
}

export function rememberSection(id: string): void {
  if (!SECTION_IDS.has(id)) {
    return;
  }
  const next = `#${id}`;
  if (window.location.hash === next) {
    return;
  }
  window.history.replaceState(null, "", next);
}
