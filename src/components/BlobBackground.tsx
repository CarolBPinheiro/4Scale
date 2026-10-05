import { useRef } from "react";
import { gsap, useGSAP } from "../animations/gsap";

export function BlobBackground() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!document.documentElement.classList.contains("motion")) {
        return;
      }
      const blobs = gsap.utils.toArray<HTMLElement>(".blob", fieldRef.current);
      blobs.forEach((blob, index) => {
        gsap.to(blob, {
          x: index % 2 === 0 ? 48 : -42,
          y: index % 2 === 0 ? -28 : 34,
          scale: 1.08,
          duration: 7 + index * 1.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
    },
    { scope: fieldRef },
  );

  return (
    <div ref={fieldRef} className="blob-field" aria-hidden="true">
      <span className="blob blob-a" />
      <span className="blob blob-b" />
      <span className="blob blob-c" />
    </div>
  );
}
