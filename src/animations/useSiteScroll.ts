import { type RefObject, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, useGSAP } from "./gsap";
import { palettes, paletteToVars, type Palette } from "./palettes";
import { setLenis } from "./scrollTo";

const SECTION_ORDER = ["hero", "about", "services", "cases", "team", "clients"] as const;

type SectionId = (typeof SECTION_ORDER)[number];

function isSectionId(id: string): id is SectionId {
  return SECTION_ORDER.includes(id as SectionId);
}

export function useSiteScroll(
  scopeRef: RefObject<HTMLElement | null>,
  onSectionChange: (sectionId: string) => void,
): void {
  const onSectionRef = useRef(onSectionChange);
  onSectionRef.current = onSectionChange;

  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope || !document.documentElement.classList.contains("motion")) {
        return;
      }

      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        touchMultiplier: 1.15,
      });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      gsap.set(document.documentElement, paletteToVars(palettes.hero));

      const sections = SECTION_ORDER.map((id) => scope.querySelector<HTMLElement>(`#${id}`)).filter(
        (section): section is HTMLElement => section !== null,
      );

      gsap.from(gsap.utils.toArray<HTMLElement>(".hero-line", scope), {
        yPercent: 110,
        duration: 1.15,
        stagger: 0.08,
        ease: "power3.out",
      });

      const aboutCopy = scope.querySelector(".about-copy");
      if (aboutCopy) {
        gsap.from(aboutCopy, {
          y: 72,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: scope.querySelector("#about"),
            start: "top 80%",
            end: "top 42%",
            scrub: true,
          },
        });
      }

      setupServices(scope);
      setupCases(scope);
      setupTeam(scope);
      setupClients(scope);
      bindPalette(scope, sections);

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 45%",
          invalidateOnRefresh: true,
          onToggle: (self) => {
            if (self.isActive) {
              onSectionRef.current(section.id);
            }
          },
        });
      });

      const hash = window.location.hash.replace("#", "");
      if (isSectionId(hash)) {
        requestAnimationFrame(() => {
          lenis.scrollTo(`#${hash}`, { immediate: true });
          ScrollTrigger.update();
        });
      }

      ScrollTrigger.refresh();

      let alive = true;
      void document.fonts.ready.then(() => {
        if (alive) {
          ScrollTrigger.refresh();
        }
      });

      return () => {
        alive = false;
        gsap.ticker.remove(onTick);
        lenis.destroy();
        setLenis(null);
      };
    },
    { scope: scopeRef },
  );
}

function setupServices(scope: HTMLElement): void {
  const section = scope.querySelector<HTMLElement>("#services");
  const stack = scope.querySelector<HTMLElement>(".services-stack");
  if (!section || !stack) {
    return;
  }
  const groups = gsap.utils.toArray<HTMLElement>(".service-group", section);
  const labels = gsap.utils.toArray<HTMLElement>(".service-label", section);
  if (groups.length < 2) {
    return;
  }

  gsap.set(groups, {
    opacity: (index) => (index === 0 ? 1 : 0.28),
  });
  gsap.set(labels, {
    opacity: (index) => (index === 0 ? 1 : 0.38),
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "services",
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${window.innerHeight * (groups.length - 1)}`,
      scrub: 0.65,
      invalidateOnRefresh: true,
      refreshPriority: 40,
      snap: snapSteps(groups.length),
    },
  });

  groups.forEach((_, index) => {
    if (index === 0) {
      return;
    }
    const at = index - 1;
    timeline.to(
      stack,
      { y: () => -groups[index].offsetTop, ease: "none", duration: 1 },
      at,
    );
    groups.forEach((group, groupIndex) => {
      timeline.to(
        group,
        { opacity: groupIndex === index ? 1 : 0.28, ease: "none", duration: 1 },
        at,
      );
    });
    labels.forEach((label, labelIndex) => {
      timeline.to(
        label,
        { opacity: labelIndex === index ? 1 : 0.38, ease: "none", duration: 1 },
        at,
      );
    });
  });
}

function setupCases(scope: HTMLElement): void {
  const section = scope.querySelector<HTMLElement>("#cases");
  if (!section) {
    return;
  }
  const panels = gsap.utils.toArray<HTMLElement>(".case-panel", section);
  const thumbs = gsap.utils.toArray<HTMLElement>(".case-thumb", section);
  if (panels.length < 2) {
    return;
  }

  gsap.set(panels, { autoAlpha: 0 });
  gsap.set(panels[0], { autoAlpha: 1 });
  gsap.set(thumbs, { opacity: 0.42 });
  if (thumbs[0]) {
    gsap.set(thumbs[0], { opacity: 1 });
  }

  panels.forEach((panel, index) => {
    const image = panel.querySelector("img");
    if (image && index > 0) {
      gsap.set(image, { scale: 1.06 });
    }
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "cases",
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${window.innerHeight * (panels.length - 1)}`,
      scrub: 0.6,
      invalidateOnRefresh: true,
      refreshPriority: 30,
      snap: snapSteps(panels.length),
    },
  });

  panels.forEach((panel, index) => {
    if (index === 0) {
      return;
    }
    const at = index - 1;
    timeline.to(panels[index - 1], { autoAlpha: 0, ease: "none", duration: 1 }, at);
    timeline.to(panel, { autoAlpha: 1, ease: "none", duration: 1 }, at);
    const image = panel.querySelector("img");
    if (image) {
      timeline.to(image, { scale: 1, ease: "none", duration: 1 }, at);
    }
    if (thumbs[index - 1]) {
      timeline.to(thumbs[index - 1], { opacity: 0.42, ease: "none", duration: 1 }, at);
    }
    if (thumbs[index]) {
      timeline.to(thumbs[index], { opacity: 1, ease: "none", duration: 1 }, at);
    }
  });
}

function setupTeam(scope: HTMLElement): void {
  const section = scope.querySelector<HTMLElement>("#team");
  const track = scope.querySelector<HTMLElement>(".team-track");
  if (!section || !track) {
    return;
  }
  const slides = gsap.utils.toArray<HTMLElement>(".team-slide", track);
  if (slides.length < 2) {
    return;
  }

  gsap.to(track, {
    x: () => -Math.max(0, track.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      id: "team",
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, window.innerHeight)}`,
      scrub: 0.7,
      invalidateOnRefresh: true,
      refreshPriority: 20,
      snap: snapSteps(slides.length),
    },
  });
}

function setupClients(scope: HTMLElement): void {
  const section = scope.querySelector<HTMLElement>("#clients");
  if (!section) {
    return;
  }
  const names = gsap.utils.toArray<HTMLElement>(".client-name", section);
  const details = gsap.utils.toArray<HTMLElement>(".client-detail", section);
  if (names.length < 2 || details.length !== names.length) {
    return;
  }

  const offsets = () => {
    const gap = 10;
    let cursor = 0;
    return names.map((name) => {
      const start = cursor;
      cursor += name.getBoundingClientRect().height + gap;
      return start;
    });
  };

  gsap.set(names, { rotation: -7, transformOrigin: "left center" });
  gsap.set(names, {
    y: (index) => offsets()[index],
    opacity: (index) => (index === 0 ? 1 : index === 1 ? 0.3 : 0.12),
  });
  gsap.set(details, { autoAlpha: 0 });
  gsap.set(details[0], { autoAlpha: 1 });

  const timeline = gsap.timeline({
    scrollTrigger: {
      id: "clients",
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${window.innerHeight * 0.72 * (names.length - 1)}`,
      scrub: 0.65,
      invalidateOnRefresh: true,
      refreshPriority: 10,
      snap: snapSteps(names.length),
    },
  });

  names.forEach((_, index) => {
    if (index === 0) {
      return;
    }
    const at = index - 1;
    names.forEach((name, nameIndex) => {
      const distance = Math.abs(nameIndex - index);
      timeline.to(
        name,
        {
          y: () => offsets()[nameIndex] - offsets()[index],
          opacity: distance === 0 ? 1 : distance === 1 ? 0.3 : 0.12,
          ease: "none",
          duration: 1,
        },
        at,
      );
    });
    timeline.to(details[index - 1], { autoAlpha: 0, ease: "none", duration: 0.65 }, at);
    timeline.to(details[index], { autoAlpha: 1, ease: "none", duration: 0.65 }, at);
  });
}

function bindPalette(scope: HTMLElement, sections: HTMLElement[]): void {
  const apply = () => {
    const tops = sections.map(sectionTop);
    const y = window.scrollY || document.documentElement.scrollTop;
    let index = 0;
    for (let cursor = 1; cursor < tops.length; cursor += 1) {
      if (y >= tops[cursor] - 1) {
        index = cursor;
      }
    }
    const current = sections[index];
    const next = sections[index + 1];
    if (!current || !isSectionId(current.id)) {
      return;
    }
    const vars =
      !next || !isSectionId(next.id)
        ? paletteToVars(palettes[current.id])
        : mixPalette(
            palettes[current.id],
            palettes[next.id],
            gsap.utils.clamp(0, 1, (y - (tops[index + 1] - window.innerHeight * 0.28)) / (window.innerHeight * 0.28)),
          );
    gsap.set(document.documentElement, vars);
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const reveal = gsap.utils.clamp(0, 1, (y - (maxScroll - window.innerHeight)) / Math.max(window.innerHeight, 1));
    const chromeMix = current.id === "clients" ? gsap.utils.clamp(0, 1, (reveal - 0.78) / 0.22) : 0;
    const ink = String(vars["--ink"]);
    gsap.set(document.documentElement, {
      "--chrome": chromeMix > 0 ? gsap.utils.interpolate(ink, "#f4efe4", chromeMix) : ink,
      ...(chromeMix > 0
        ? {
            "--logo-base": gsap.utils.interpolate(palettes.clients["--logo-base"], "#ffffff", chromeMix),
            "--logo-accent": gsap.utils.interpolate(palettes.clients["--logo-accent"], "#E9855A", chromeMix),
          }
        : {}),
    });
    const field = scope.querySelector<HTMLElement>(".blob-field");
    if (field) {
      gsap.set(field, { opacity: 1 - reveal });
    }
    const rail = scope.querySelector<HTMLElement>(".rail");
    if (rail) {
      const hidden = reveal > 0.35;
      gsap.set(rail, {
        opacity: 1 - gsap.utils.clamp(0, 1, reveal / 0.35),
        pointerEvents: hidden ? "none" : "auto",
      });
    }
    const stage = scope.querySelector<HTMLElement>(".footer-stage");
    const mark = stage?.querySelector<HTMLElement>(".footer-mark:not(.footer-mark-echo)");
    if (stage && mark) {
      const shift = (window.innerHeight + mark.getBoundingClientRect().height) / 2;
      gsap.set(stage, { y: (1 - reveal) * shift });
    }
  };

  ScrollTrigger.create({
    start: 0,
    end: "max",
    refreshPriority: -100,
    onUpdate: apply,
    onRefresh: apply,
  });
}

function sectionTop(section: HTMLElement): number {
  const parent = section.parentElement;
  if (parent?.classList.contains("pin-spacer")) {
    return parent.offsetTop;
  }
  return section.offsetTop;
}

function mixPalette(from: Palette, to: Palette, progress: number): Record<string, string | number> {
  const mixed: Record<string, string | number> = {};
  (Object.keys(from) as (keyof Palette)[]).forEach((key) => {
    mixed[key] = gsap.utils.interpolate(from[key], to[key], progress);
  });
  return mixed;
}

function snapSteps(count: number): ScrollTrigger.Vars["snap"] {
  return {
    snapTo: 1 / (count - 1),
    directional: false,
    inertia: false,
    duration: { min: 0.15, max: 0.35 },
    delay: 0.04,
    ease: "power1.inOut",
  };
}
