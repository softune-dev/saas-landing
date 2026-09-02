/** Same catalog the dashboard theme editor searches — loaded on demand
 * via the Google Fonts CSS API so the signup wizard can preview faces
 * without next/font-preloading every family. */
export const GOOGLE_FONTS: string[] = [
  "Fraunces", "Playfair Display", "Cormorant", "Libre Baskerville",
  "DM Serif Display", "Spectral", "Bodoni Moda", "Newsreader",
  "Instrument Serif", "Prata", "Archivo Black", "Big Shoulders Display",
  "Inter", "Manrope", "Work Sans", "Outfit", "Karla", "Sora",
  "Plus Jakarta Sans", "Space Grotesk", "Urbanist", "Figtree", "DM Sans",
  "Nunito Sans",
  "Merriweather", "Lora", "PT Serif", "Crimson Text", "Crimson Pro",
  "Source Serif 4", "Domine", "Bitter", "Cardo", "EB Garamond",
  "Cormorant Garamond", "Vollkorn", "Alegreya", "Alegreya Sans",
  "Zilla Slab", "Noto Serif", "Frank Ruhl Libre", "Gelasio",
  "Literata", "Bree Serif", "Rufina", "Marcellus", "Cinzel",
  "Abril Fatface", "Fjalla One", "Yeseva One", "Josefin Slab",
  "Roboto Slab", "Arvo", "Josefin Sans", "Oswald", "Anton",
  "Bebas Neue", "Chivo", "Barlow Condensed",
  "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Nunito",
  "Rubik", "Mulish", "Raleway", "Barlow", "Heebo", "Source Sans 3",
  "IBM Plex Sans", "Noto Sans", "Public Sans", "Be Vietnam Pro",
  "Epilogue", "Jost", "Cabin", "Assistant", "Lexend",
];

const loaded = new Set<string>();

export function ensureGoogleFont(family: string, weights = "400;500;600;700") {
  if (!family || typeof document === "undefined") return;
  if (loaded.has(family)) return;
  loaded.add(family);
  const existing = document.head.querySelector(`link[data-gf="${family}"]`);
  if (existing) return;
  const encoded = encodeURIComponent(family).replace(/%20/g, "+");
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@${weights}&display=swap`;
  link.dataset.gf = family;
  document.head.appendChild(link);
}
