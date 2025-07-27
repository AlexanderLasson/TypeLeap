export const calculateWPM = (totalTyped: number, timeElapsed: number, errors: number): number => {
  // some edge cases
  if (timeElapsed <= 0) return 0;
  if (totalTyped <= 0) return 0;
  

  const correctCharacters = Math.max(0, totalTyped - errors);

  const correctWords = correctCharacters / 5;

  const timeInMinutes = Math.max(0.1, timeElapsed / 60); // Minimum 0.1 minutes to avoid division by zero

  const wpm = correctWords / timeInMinutes;

  const errorPenalty = Math.max(0, wpm * (errors * 0.05));

  const finalWpm = Math.max(0, wpm - errorPenalty);

  return Math.round(finalWpm);
};

export const calculateTimeElapsed = (timeLeft: number, totalTime: number): number => {
  const elapsed = totalTime - timeLeft;

  return Math.max(0, Math.min(elapsed, totalTime));
}; 
