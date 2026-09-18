export {};

declare global {
  interface Window {
    // Set by the Meta Pixel base code in components/analytics.tsx — undefined
    // until that script has loaded, hence the optional call everywhere it's used.
    fbq?: (...args: unknown[]) => void;
  }
}
