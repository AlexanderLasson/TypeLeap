export const calculateWPM = (totalTyped: number, timeElapsed: number, errors: number): number => {
  // Handle edge cases
  if (timeElapsed <= 0) return 0;
  if (totalTyped <= 0) return 0;
  
  // Calculate correct characters (total typed minus errors)
  const correctCharacters = Math.max(0, totalTyped - errors);
  
  // Convert to words (5 characters per word is standard)
  const correctWords = correctCharacters / 5;
  
  // Convert time to minutes (ensure we don't divide by zero)
  const timeInMinutes = Math.max(0.1, timeElapsed / 60); // Minimum 0.1 minutes to avoid division by zero
  
  // Calculate WPM based on correct words only
  const wpm = correctWords / timeInMinutes;
  
  // Apply a more reasonable error penalty (5% per error instead of 10%)
  const errorPenalty = Math.max(0, wpm * (errors * 0.05));
  const finalWpm = Math.max(0, wpm - errorPenalty);
  
  return Math.round(finalWpm);
};

export const calculateTimeElapsed = (timeLeft: number, totalTime: number): number => {
  const elapsed = totalTime - timeLeft;
  // Ensure we don't return negative time or time greater than total
  return Math.max(0, Math.min(elapsed, totalTime));
}; 