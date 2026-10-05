import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter-tight/400.css";
import "@fontsource/inter-tight/500.css";
import "@fontsource/inter-tight/600.css";
import "@fontsource/inter-tight/700.css";
import "@fontsource/instrument-serif/400.css";
import "lenis/dist/lenis.css";
import "./styles/global.css";
import "./animations/gsap";
import { App } from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.classList.add("motion");
}

const root = document.getElementById("root");
if (!root) {
  throw new Error("Elemento raiz ausente.");
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
