import { useState } from "react";

type ClientLogoProps = {
  src: string;
  alt: string;
};

export function ClientLogo({ src, alt }: ClientLogoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <span className="logo-fallback">{alt}</span>;
  }

  return (
    <img
      src={src}
      alt=""
      width={220}
      height={80}
      loading="lazy"
      decoding="async"
      onError={() => {
        setFailed(true);
      }}
    />
  );
}
