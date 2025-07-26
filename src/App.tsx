import { useState } from 'react';
import RestartButton from './components/RestartButton';
import Results from './components/Results';
import UserTypings from './components/UserTypings';
import Frog from './components/Frog';
import Leaderboard from './components/Leaderboard';
import useEngine from './hooks/useEngine';
import { calculatAccuracyPercentage } from './utils/helpers';
import { calculateWPM, calculateTimeElapsed } from './utils/wpmCalculator';

const App = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const {state, words, timeLeft, typed, errors, restart, totalTyped, shouldHop, resetHop } = useEngine();


  const accuracyPercentage = calculatAccuracyPercentage(errors, totalTyped);
  const timeElapsed = calculateTimeElapsed(timeLeft, 30); // 30 seconds is the total time
  const wpm = calculateWPM(totalTyped, timeElapsed);

  return (
    <>
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
        <button
          onClick={() => setShowLeaderboard(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Leaderboard
        </button>
      </div>
      <Results
        state={state}
        className="mt-10"
        errors={errors}
        accuracyPercentage={accuracyPercentage}
        total={totalTyped}
      />
      <Frog isHopping={shouldHop} onHopComplete={resetHop} />
      <Leaderboard
        isVisible={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        userWpm={wpm}
        userAccuracy={accuracyPercentage}
      />
    </>
  );
};


const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-4xl leading-relaxed break-all mt-3">
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
