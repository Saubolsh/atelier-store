import { Albert_Sans, Bodoni_Moda } from "next/font/google";

// Primary typeface for all UI and titles: a geometric sans with a full
// 100-900 weight range, so large titles can go light and small labels bold.
export const sans = Albert_Sans({
  subsets: ["latin"],
  variable: "--typeface-sans",
});

// Editorial accent only (campaign headlines, quotes). Not preloaded because
// most pages never render it.
export const serif = Bodoni_Moda({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--typeface-serif",
  preload: false,
});
