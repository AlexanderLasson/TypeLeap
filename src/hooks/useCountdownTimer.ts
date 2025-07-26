import { useCallback, useEffect, useRef, useState } from "react";

const useCountdownTimer = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const intervalRef = useRef<number | null>(null);

  const startCountdown = useCallback(() => {
    console.log("Starting countdown");

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
  }, [setTimeLeft]);

  const resetCountdown = useCallback(() => {
    console.log("Resetting countdown");

    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    setTimeLeft(seconds);
  }, [seconds]);

useEffect(() => {
  if(!timeLeft && intervalRef.current) {
  console.log("clearing timer...)");
  window.clearInterval(intervalRef.current);
  }
}, [timeLeft, intervalRef]);

  return { timeLeft, startCountdown, resetCountdown };
};

export default useCountdownTimer;
