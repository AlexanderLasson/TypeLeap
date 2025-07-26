import RestartButton from './components/RestartButton';
import Results from './components/Results';
import UserTypings from './components/UserTypings';
import Frog from './components/Frog';
import useEngine from './hooks/useEngine';
import { calculatAccuracyPercentage } from './utils/helpers';

const App = () => {

const {state, words, timeLeft, typed, errors, restart, totalTyped, shouldHop, resetHop } = useEngine();


  return (
    <>
      <CountDownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords words={words} />
        <UserTypings className="absolute inset-0" words={words} userInput={typed} />
      </WordsContainer>
      <RestartButton
        className={"mx-auto mt-10 text-slate-500"}
        onRestart={restart}
      />
      <Results
        state={state}
        className="mt-10"
        errors={errors}
        accuracyPercentage={calculatAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
      />
      <Frog isHopping={shouldHop} onHopComplete={resetHop} />
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
