import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';

const srOnly: React.CSSProperties = {
  position: 'absolute', width: '1px', height: '1px', padding: 0,
  margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap', border: 0, visibility: 'hidden',
};

interface DecryptedTextProps extends HTMLMotionProps<'span'> {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: 'view' | 'hover' | 'inViewHover' | 'click';
}

export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 8,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'view',
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click');
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availableChars = useMemo(() =>
    useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter(c => c !== ' ')
      : characters.split(''),
    [useOriginalCharsOnly, text, characters]
  );

  const shuffleText = useCallback((orig: string, revealed: Set<number>) =>
    orig.split('').map((char, i) => {
      if (char === ' ') return ' ';
      if (revealed.has(i)) return orig[i];
      return availableChars[Math.floor(Math.random() * availableChars.length)];
    }).join(''),
    [availableChars]
  );

  const triggerDecrypt = useCallback(() => {
    setRevealedIndices(new Set());
    setIsAnimating(true);
  }, []);

  useEffect(() => {
    if (!isAnimating) return;
    let iter = 0;
    intervalRef.current = setInterval(() => {
      setRevealedIndices(prev => {
        if (sequential) {
          if (prev.size < text.length) {
            let next = prev.size;
            if (revealDirection === 'end') next = text.length - 1 - prev.size;
            const newSet = new Set(prev); newSet.add(next);
            setDisplayText(shuffleText(text, newSet));
            return newSet;
          } else {
            clearInterval(intervalRef.current!);
            setIsAnimating(false); setIsDecrypted(true);
            return prev;
          }
        } else {
          setDisplayText(shuffleText(text, prev));
          if (++iter >= maxIterations) {
            clearInterval(intervalRef.current!);
            setIsAnimating(false); setDisplayText(text); setIsDecrypted(true);
          }
          return prev;
        }
      });
    }, speed);
    return () => clearInterval(intervalRef.current!);
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText]);

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'inViewHover') return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting && !hasAnimated) { triggerDecrypt(); setHasAnimated(true); } });
    }, { threshold: 0.1 });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [animateOn, hasAnimated, triggerDecrypt]);

  useEffect(() => { setDisplayText(text); setIsDecrypted(true); }, [text]);

  const animateProps = animateOn === 'hover' || animateOn === 'inViewHover'
    ? {
        onMouseEnter: () => { if (!isAnimating) { setRevealedIndices(new Set()); setIsDecrypted(false); setIsAnimating(true); } },
        onMouseLeave: () => { clearInterval(intervalRef.current!); setIsAnimating(false); setRevealedIndices(new Set()); setDisplayText(text); setIsDecrypted(true); },
      }
    : {};

  return (
    <motion.span ref={containerRef} className={`inline-block whitespace-pre-wrap ${parentClassName}`} {...animateProps} {...props}>
      <span style={srOnly}>{displayText}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, i) => {
          const revealed = revealedIndices.has(i) || (!isAnimating && isDecrypted);
          return <span key={i} className={revealed ? className : encryptedClassName}>{char}</span>;
        })}
      </span>
    </motion.span>
  );
}
