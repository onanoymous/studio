'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TimerProps {
  endTime: number;
  onComplete: () => void;
}

const FIVE_MINUTES = 5 * 60;
const ONE_MINUTE = 1 * 60;

function formatTime(seconds: number): string {
  if (seconds <= 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function Timer({ endTime, onComplete }: TimerProps) {
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

  useEffect(() => {
    const calculateRemaining = () => {
      const now = new Date().getTime();
      const secondsLeft = Math.round((endTime - now) / 1000);
      return secondsLeft > 0 ? secondsLeft : 0;
    };

    setRemainingSeconds(calculateRemaining());

    const interval = setInterval(() => {
      const secondsLeft = calculateRemaining();
      setRemainingSeconds(secondsLeft);
      if (secondsLeft <= 0) {
        clearInterval(interval);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, onComplete]);

  const timerColor = cn({
    'text-destructive': remainingSeconds !== null && remainingSeconds <= ONE_MINUTE,
    'text-accent': remainingSeconds !== null && remainingSeconds > ONE_MINUTE && remainingSeconds <= FIVE_MINUTES,
    'text-primary': remainingSeconds !== null && remainingSeconds > FIVE_MINUTES,
  });

  if (remainingSeconds === null) {
    return <div className="text-8xl md:text-9xl font-mono font-bold tabular-nums text-primary">--:--</div>;
  }
  
  return (
    <div 
      className={cn(
        'text-8xl md:text-9xl font-mono font-bold tabular-nums transition-colors duration-500', 
        timerColor
      )}
      role="timer"
      aria-live="assertive"
    >
      {formatTime(remainingSeconds)}
    </div>
  );
}
