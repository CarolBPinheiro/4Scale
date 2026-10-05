import { useEffect, useId, useRef } from "react";
import { rail, site } from "../content/site";
import { scrollToSection } from "../animations/scrollTo";

const menuLinks = [{ id: "hero", label: "Início" }, ...rail];

type MenuOverlayProps = {
  onClose: () => void;
  onChat: () => void;
};

export function MenuOverlay({ onClose, onChat }: MenuOverlayProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="overlay-bar">
        <button ref={closeRef} type="button" className="text-button" onClick={onClose}>
          <CloseIcon />
          Close
        </button>
        <p id={titleId} className="brand">
          {site.brand}
        </p>
        <button type="button" className="text-button" onClick={onChat}>
          Let's chat <span aria-hidden="true">→</span>
        </button>
      </div>
      <nav aria-label="Menu">
        {menuLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(event) => {
              event.preventDefault();
              onClose();
              window.setTimeout(() => {
                scrollToSection(link.id);
              }, 60);
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
