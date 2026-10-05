import { useEffect, useRef } from "react";
import {
  Color,
  GLSL3,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";
import fragmentShader from "./shaders/fragment.glsl?raw";
import vertexShader from "./shaders/vertex.glsl?raw";

const MAX_CLICKS = 10;
const INK = "#E9855A";
const PIXEL_SIZE = 4;

export function HeroDither() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const section = host?.parentElement;
    if (!host || !section) {
      return;
    }

    const canvas = document.createElement("canvas");
    host.appendChild(canvas);

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      canvas.remove();
      return;
    }

    if (!renderer.capabilities.isWebGL2) {
      renderer.dispose();
      canvas.remove();
      return;
    }

    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);

    const clickPositions = Array.from({ length: MAX_CLICKS }, () => new Vector2(-1, -1));
    const clickTimes = new Float32Array(MAX_CLICKS);
    const uniforms = {
      uResolution: { value: new Vector2(1, 1) },
      uTime: { value: 0 },
      uColor: { value: new Color(INK) },
      uClickPos: { value: clickPositions },
      uClickTimes: { value: clickTimes },
      uShapeType: { value: 0 },
      uPixelSize: { value: PIXEL_SIZE },
    };

    const geometry = new PlaneGeometry(2, 2);
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      glslVersion: GLSL3,
      transparent: true,
    });
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    scene.add(new Mesh(geometry, material));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let clickIndex = 0;
    let elapsed = 0;
    let lastFrame = performance.now();
    let visible = true;
    let alive = true;
    let frame = 0;

    const resize = () => {
      const width = Math.max(1, Math.round(host.clientWidth));
      const height = Math.max(1, Math.round(host.clientHeight));
      renderer.setSize(width, height, false);
      uniforms.uResolution.value.set(width, height);
    };

    const render = () => {
      if (renderer.getContext().isContextLost()) {
        return;
      }
      renderer.render(scene, camera);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (reducedMotion || renderer.getContext().isContextLost()) {
        return;
      }
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }
      const x = (event.clientX - rect.left) * (canvas.width / rect.width);
      const y = (rect.height - (event.clientY - rect.top)) * (canvas.height / rect.height);
      clickPositions[clickIndex].set(x, y);
      clickTimes[clickIndex] = elapsed;
      clickIndex = (clickIndex + 1) % MAX_CLICKS;
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      alive = false;
    };

    const tick = (now: number) => {
      if (!alive) {
        return;
      }
      frame = window.requestAnimationFrame(tick);
      const delta = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;
      if (!visible || document.hidden) {
        return;
      }
      elapsed += delta;
      uniforms.uTime.value = elapsed;
      render();
    };

    resize();
    render();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
    });
    visibilityObserver.observe(section);
    canvas.addEventListener("webglcontextlost", onContextLost);

    if (!reducedMotion) {
      section.addEventListener("pointerdown", onPointerDown);
      frame = window.requestAnimationFrame(tick);
    }

    return () => {
      alive = false;
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("webglcontextlost", onContextLost);
      section.removeEventListener("pointerdown", onPointerDown);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="hero-dither" aria-hidden="true" />;
}
