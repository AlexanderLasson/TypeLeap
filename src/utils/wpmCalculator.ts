export const calculateWPM = (totalTyped: number, timeElapsed: number, errors: number): number => {
  if (timeElapsed === 0) return 0;
  
  // Calculate correct characters (total typed minus errors)
  const correctCharacters = Math.max(0, totalTyped - errors);
  
  // Convert to words (5 characters per word is standard)
  const correctWords = correctCharacters / 5;
  
  // Convert time to minutes
  const timeInMinutes = timeElapsed / 60;
  
  // Calculate WPM based on correct words only
  const wpm = correctWords / timeInMinutes;
  
  // Apply penalty for errors (reduce WPM by 10% for each error)
  const errorPenalty = Math.max(0, wpm * (errors * 0.1));
  const finalWpm = Math.max(0, wpm - errorPenalty);
  
  return Math.round(finalWpm);
};

export const calculateTimeElapsed = (timeLeft: number, totalTime: number): number => {
  return totalTime - timeLeft;
}; 