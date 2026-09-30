"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Sydney",
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 10_000);
  return () => clearInterval(timer);
}

export function SydneyTime() {
  const time = useSyncExternalStore(
    subscribe,
    () => formatter.format(Date.now()),
    () => null,
  );

  return (
    <time className="mono tabular-nums">
      {time ?? "--:--"}
    </time>
  );
}
