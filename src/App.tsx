import { useState, useEffect } from 'react';
import RestartButton from './components/RestartButton';
import Results from './components/Results';
import UserTypings from './components/UserTypings';
import Frog from './components/Frog';
import Leaderboard from './components/Leaderboard';
import TypingBenefits from './components/TypingBenefits';
import useEngine from './hooks/useEngine';
import { calculatAccuracyPercentage } from './utils/helpers';
import { calculateWPM, calculateTimeElapsed } from './utils/wpmCalculator';

const App = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const [finalWpm, setFinalWpm] = useState(0);
  const [finalAccuracy, setFinalAccuracy] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const {state, words, timeLeft, typed, errors, restart, totalTyped, shouldHop, resetHop } = useEngine();
  const accuracyPercentage = calculatAccuracyPercentage(errors, totalTyped);
  const timeElapsed = calculateTimeElapsed(timeLeft, 30); // 30 seconds is the total time
  const wpm = calculateWPM(totalTyped, timeElapsed, errors);

  // Store final values when test finishes
  useEffect(() => {
    if (state === "finish") {
      setFinalWpm(wpm);
      setFinalAccuracy(accuracyPercentage);
    }
  }, [state, wpm, accuracyPercentage]);

  // Detect when user starts typing
  useEffect(() => {
    // Only consider it "not typing" if the game hasn't started or if we're at the very beginning
    if (state === "start" && totalTyped === 0) {
      setIsTyping(false);
    } else if (state === "run" || state === "finish") {
      // Once the game is running or finished, keep the dark background
      setIsTyping(true);
    }
  }, [state, totalTyped]);

  return (
    <>
      {/* Background elements */}
      <div className="water-ripple"></div>
      <div className={`typing-overlay ${isTyping ? 'active' : ''}`}></div>
      
      {/* Floating particles */}
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i} className="floating-particle"></div>
      ))}

      <CountDownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords words={words} />
        <UserTypings className="absolute inset-0" words={words} userInput={typed} />
      </WordsContainer>
      <div className="flex gap-4 justify-center mt-10">
        <RestartButton
          className={"text-slate-500"}
          onRestart={restart}
        />
      </div>
      <Results
        state={state}
        className="mt-10"
        errors={errors}
        accuracyPercentage={accuracyPercentage}
        total={totalTyped}
        wpm={finalWpm}
      />
      <Frog isHopping={shouldHop} onHopComplete={resetHop} />
      
      {/* Bottom Leaderboard Button */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <button
          onClick={() => setShowLeaderboard(true)}
          className={`px-6 py-3 rounded-lg transition-all duration-300 shadow-lg border font-medium ${
            state === "run" 
              ? "bg-gray-900 text-gray-400 border-gray-800 opacity-60" 
              : "bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600"
          }`}
        >
          {state === "finish" ? "Submit Score" : "Leaderboard"}
        </button>
      </div>
      
      <Leaderboard
        isVisible={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        userWpm={finalWpm}
        userAccuracy={finalAccuracy}
      />
      <TypingBenefits
        isVisible={showBenefits}
        onClose={() => setShowBenefits(false)}
      />
      
      {/* Bottom Right Links */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <button
          onClick={() => setShowBenefits(true)}
          className={`text-gray-400 hover:text-gray-600 transition-colors duration-200 ${
            state === "run" ? "opacity-60" : ""
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <a
          href="https://github.com/AlexanderLasson/TypeLeap"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </>
  );
};


const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-4xl leading-relaxed whitespace-nowrap mt-3">
      {children}
    </div>
  )
}



const GeneratedWords = ({ words }: { words: string }) => {
  return (
    <div className="text-slate-500 ">{words}</div>
  )
}

const CountDownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-primary-500 font-medium text-center text-xl text-slate-600"> Time: {timeLeft}</h2>;
}

export default App
