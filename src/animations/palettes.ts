export type Palette = {
  "--bg": string;
  "--ink": string;
  "--muted": string;
  "--blob-1": string;
  "--blob-2": string;
  "--blob-3": string;
  "--blob-opacity": number;
  "--logo-base": string;
  "--logo-accent": string;
};

export const palettes = {
  hero: {
    "--bg": "#000000",
    "--ink": "#f4efe4",
    "--muted": "#c4beb2",
    "--blob-1": "#1a1a1a",
    "--blob-2": "#111111",
    "--blob-3": "#242424",
    "--blob-opacity": 0.55,
    "--logo-base": "#ffffff",
    "--logo-accent": "#E9855A",
  },
  about: {
    "--bg": "#000000",
    "--ink": "#f4efe4",
    "--muted": "#b9b4aa",
    "--blob-1": "#1a1a1a",
    "--blob-2": "#111111",
    "--blob-3": "#242424",
    "--blob-opacity": 0.55,
    "--logo-base": "#ffffff",
    "--logo-accent": "#E9855A",
  },
  services: {
    "--bg": "#071A2B",
    "--ink": "#f4efe4",
    "--muted": "#b7c4d0",
    "--blob-1": "#0d3050",
    "--blob-2": "#123a5c",
    "--blob-3": "#1a4a72",
    "--blob-opacity": 0.5,
    "--logo-base": "#ffffff",
    "--logo-accent": "#E9855A",
  },
  cases: {
    "--bg": "#0B0B0B",
    "--ink": "#f4efe4",
    "--muted": "#b9b4aa",
    "--blob-1": "#1c1c1c",
    "--blob-2": "#141414",
    "--blob-3": "#262626",
    "--blob-opacity": 0.45,
    "--logo-base": "#ffffff",
    "--logo-accent": "#E9855A",
  },
  team: {
    "--bg": "#E9855A",
    "--ink": "#1a0a06",
    "--muted": "#5c3a12",
    "--blob-1": "#e86a12",
    "--blob-2": "#ff9444",
    "--blob-3": "#ffc08a",
    "--blob-opacity": 0.32,
    "--logo-base": "#1a0a06",
    "--logo-accent": "#fff6ef",
  },
  clients: {
    "--bg": "#F5F5F3",
    "--ink": "#161410",
    "--muted": "#5c574e",
    "--blob-1": "#e7e4dc",
    "--blob-2": "#f0ece4",
    "--blob-3": "#ffffff",
    "--blob-opacity": 0.4,
    "--logo-base": "#161410",
    "--logo-accent": "#C2410C",
  },
} as const satisfies Record<string, Palette>;

export function paletteToVars(palette: Palette): Record<string, string | number> {
  return { ...palette };
}
