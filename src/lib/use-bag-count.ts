import { useSyncExternalStore } from "react";

import { bagCookie, countItems, parseBag } from "@/lib/bag";

// Cookies fire no change events, so bag controls announce their own changes
// and other tabs are picked up when this one becomes visible again.
const bagChange = "bag-change";

export function announceBagChange() {
  window.dispatchEvent(new Event(bagChange));
}

function subscribe(onChange: () => void) {
  window.addEventListener(bagChange, onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.removeEventListener(bagChange, onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}

function readCount() {
  const prefix = `${bagCookie}=`;
  const raw = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(prefix))
    ?.slice(prefix.length);
  try {
    return countItems(parseBag(raw && decodeURIComponent(raw)));
  } catch {
    return 0;
  }
}

/** Items in the bag as the cookie records them; 0 during prerendering. */
export function useBagCount() {
  return useSyncExternalStore(subscribe, readCount, () => 0);
}
