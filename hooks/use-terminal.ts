"use client";

import { useCallback, useEffect, useRef } from "react";

interface TerminalFrag {
  t: string;
  c?: string;
  instant?: boolean;
}

interface TerminalEntry {
  kind: "prompt" | "output";
  frags: TerminalFrag[];
  wait?: number;
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

// Manages the typing-terminal animation imperatively via DOM refs
export function useTerminal(script: TerminalEntry[], containerRef: React.RefObject<HTMLDivElement | null>) {
  const abortRef = useRef(false);

  const run = useCallback(async () => {
    const target = containerRef.current;
    if (!target) return;

    abortRef.current = false;
    target.innerHTML = "";

    for (const entry of script) {
      if (abortRef.current) return;

      const line = document.createElement("div");
      line.className = "line";
      target.appendChild(line);

      // Shared cursor element
      let cursor: HTMLSpanElement | null = null;

      function attachCursor() {
        if (cursor?.parentNode) cursor.remove();
        cursor = document.createElement("span");
        cursor.className = "cursor";
        line.appendChild(cursor);
      }

      function detachCursor() {
        if (cursor?.parentNode) cursor.remove();
        cursor = null;
      }

      if (entry.kind === "prompt") {
        // Prompt symbol appears instantly
        const promptSpan = document.createElement("span");
        if (entry.frags[0].c) promptSpan.className = entry.frags[0].c;
        promptSpan.textContent = entry.frags[0].t;
        line.appendChild(promptSpan);
        attachCursor();

        // Type the rest of the frags character-by-character
        for (let i = 1; i < entry.frags.length; i++) {
          if (abortRef.current) return;
          detachCursor();
          const frag = entry.frags[i];
          const span = document.createElement("span");
          if (frag.c) span.className = frag.c;
          line.appendChild(span);

          if (frag.instant) {
            span.textContent = frag.t;
          } else {
            for (const char of frag.t) {
              if (abortRef.current) return;
              span.textContent += char;
              await sleep(14 + Math.random() * 16);
            }
          }
          attachCursor();
        }
        await sleep(300);
      } else {
        // Output lines appear instantly
        for (const frag of entry.frags) {
          const span = document.createElement("span");
          if (frag.c) span.className = frag.c;
          span.textContent = frag.t;
          line.appendChild(span);
        }
        attachCursor();
        await sleep(entry.wait ?? 150);
      }

      detachCursor();
    }

    // Loop after a pause
    await sleep(3000);
    if (!abortRef.current) run();
  }, [script, containerRef]);

  useEffect(() => {
    // Respect reduced-motion preference
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const target = containerRef.current;
      if (!target) return;
      target.innerHTML = "";
      for (const entry of script) {
        const line = document.createElement("div");
        line.className = "line";
        for (const frag of entry.frags) {
          const span = document.createElement("span");
          if (frag.c) span.className = frag.c;
          span.textContent = frag.t;
          line.appendChild(span);
        }
        target.appendChild(line);
      }
      return;
    }

    run();
    return () => { abortRef.current = true; };
  }, [run, script, containerRef]);
}
