"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { useInView } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

// Active scramble timer per letter, so overlapping runs don't fight each other
const timers = new WeakMap<HTMLSpanElement, ReturnType<typeof setInterval>>();

interface ShuffleProps {
  /** The text to display and animate */
  text: string;
  /** Direction the characters shuffle in: "left" | "right" | "center" */
  shuffleDirection?: "left" | "right" | "center";
  /** Total duration of the shuffle animation per character (seconds) */
  duration?: number;
  /** Animation mode: "all" animates every char; "evenodd" alternates */
  animationMode?: "all" | "evenodd";
  /** Number of random character swaps before settling */
  shuffleTimes?: number;
  /** GSAP ease string */
  ease?: string;
  /** Stagger delay between characters (seconds) */
  stagger?: number;
  /** IntersectionObserver threshold */
  threshold?: number;
  /** Only trigger the animation once */
  triggerOnce?: boolean;
  /** Also trigger on mouse hover */
  triggerOnHover?: boolean;
  /** Respect prefers-reduced-motion */
  respectReducedMotion?: boolean;
  /** Loop the animation */
  loop?: boolean;
  /** Delay between loops (seconds) */
  loopDelay?: number;
  /** Extra class names for the wrapper */
  className?: string;
}

export default function Shuffle({
  text,
  shuffleDirection = "right",
  duration = 0.35,
  animationMode = "evenodd",
  shuffleTimes = 1,
  ease = "power3.out",
  stagger = 0.03,
  threshold = 0.1,
  triggerOnce = true,
  triggerOnHover = false,
  respectReducedMotion = true,
  loop = false,
  loopDelay = 0,
  className = "",
}: ShuffleProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const hasPlayed = useRef(false);
  const loopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isInView = useInView(wrapperRef, { once: triggerOnce, amount: threshold });

  // Check reduced-motion preference
  const prefersReduced =
    respectReducedMotion &&
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const runShuffle = useCallback(() => {
    if (prefersReduced) return;

    const spans = spanRefs.current.filter(Boolean) as HTMLSpanElement[];

    spans.forEach((span, i) => {
      // evenodd: only animate even or odd indices based on direction
      if (animationMode === "evenodd" && i % 2 !== (shuffleDirection === "right" ? 0 : 1)) return;

      const originalChar = span.dataset.original ?? span.textContent ?? "";

      // Lock the letter's real width so random glyphs can't re-flow the line.
      // Measure only while the real letter is showing (a re-run mid-scramble reuses it).
      if (span.textContent === originalChar || !span.dataset.w) {
        span.dataset.w = String(span.getBoundingClientRect().width);
      }
      span.style.width = `${span.dataset.w}px`;
      span.style.textAlign = "center";

      let count = 0;
      const totalSwaps = shuffleTimes * 3; // more swaps = longer scramble

      const baseDelay =
        shuffleDirection === "right"
          ? i * stagger
          : shuffleDirection === "left"
          ? (spans.length - 1 - i) * stagger
          : Math.abs(i - Math.floor(spans.length / 2)) * stagger;

      gsap.to(span, {
        duration,
        ease,
        delay: baseDelay,
        onStart() {
          // A re-run (e.g. hover mid-scramble) replaces this letter's previous timer
          const prev = timers.get(span);
          if (prev) clearInterval(prev);

          const interval = setInterval(() => {
            if (count >= totalSwaps) {
              clearInterval(interval);
              timers.delete(span);
              span.textContent = originalChar;
              span.style.width = "";
              return;
            }
            span.textContent =
              originalChar === " "
                ? " "
                : CHARS[Math.floor(Math.random() * CHARS.length)];
            count++;
          }, (duration * 1000) / totalSwaps);
          timers.set(span, interval);
        },
        // The interval above restores the letter and its width once it finishes.
      });
    });

    if (loop) {
      const totalTime =
        (spans.length * stagger + duration) * 1000 + loopDelay * 1000;
      loopTimer.current = setTimeout(runShuffle, totalTime);
    }
  }, [
    animationMode,
    duration,
    ease,
    loop,
    loopDelay,
    prefersReduced,
    shuffleDirection,
    shuffleTimes,
    stagger,
  ]);

  // Trigger on scroll into view
  useEffect(() => {
    if (!isInView) return;
    if (triggerOnce && hasPlayed.current) return;
    hasPlayed.current = true;
    runShuffle();
    return () => {
      if (loopTimer.current) clearTimeout(loopTimer.current);
    };
  }, [isInView, runShuffle, triggerOnce]);

  const handleMouseEnter = useCallback(() => {
    if (!triggerOnHover) return;
    runShuffle();
  }, [runShuffle, triggerOnHover]);

  // Group characters by word so lines only wrap between words, never mid-word.
  // Character indexes stay global so stagger/direction work across the whole text.
  let charIndex = 0;
  const words = text.split(" ");

  return (
    <span ref={wrapperRef} className={className} onMouseEnter={handleMouseEnter}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, w) => (
          <span key={w}>
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char) => {
                const i = charIndex++;
                return (
                  <span
                    key={i}
                    ref={(el) => {
                      spanRefs.current[i] = el;
                    }}
                    data-original={char}
                    className="inline-block"
                  >
                    {char}
                  </span>
                );
              })}
            </span>
            {w < words.length - 1 && " "}
          </span>
        ))}
      </span>
    </span>
  );
}
