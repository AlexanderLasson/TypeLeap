export const calculateWPM = (totalTyped: number, timeElapsed: number): number => {
  if (timeElapsed === 0) return 0;
  
  // Standard WPM calculation: (total characters / 5) / (time in minutes)
  // We divide by 5 because the average English word is 5 characters long
  const wordsTyped = totalTyped / 5;
  const timeInMinutes = timeElapsed / 60;
  
  return Math.round(wordsTyped / timeInMinutes);
};

export const calculateTimeElapsed = (timeLeft: number, totalTime: number): number => {
  return totalTime - timeLeft;
}; 