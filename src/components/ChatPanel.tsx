import { useEffect, useId, useRef } from "react";
import { site } from "../content/site";

type ChatPanelProps = {
  onClose: () => void;
};

export function ChatPanel({ onClose }: ChatPanelProps) {
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
      className="overlay chat-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="overlay-bar">
        <button ref={closeRef} type="button" className="text-button" onClick={onClose}>
          Close
        </button>
        <p className="brand">{site.brand}</p>
        <span />
      </div>
      <div className="chat-copy">
        <p className="client-kicker">Let's chat</p>
        <h2 id={titleId}>Vamos conversar.</h2>
        <p>{site.contact.note}</p>
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
      </div>
    </div>
  );
}
