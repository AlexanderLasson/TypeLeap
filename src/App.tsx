import { fakerDE as faker } from '@faker-js/faker';
import RestartButton from './components/RestartButton';
import Results from './components/Results';
  
const words = faker.lorem.words(10);

const App = () => {
  return (
    <>
    <CountDownTimer timeLeft={30} />
    <GeneratedWords words={words} />
    <RestartButton
      className={"mx-auto mt-10 text-slate-900"}
      onRestart={() => null}
      />
      <Results
        className="mt-10"
        errors={10}
        accuracyPercentage={100}
        total={200}
        />
    </>
  );
};


const GeneratedWords = ({ words }: {words: string}) => {
  return (
    <div className="text-4xl text-center text-slate-500 ">{words}</div>
  )
}

const CountDownTimer = ({timeLeft}: {timeLeft: number }) => {
  return <h2 className="text-primary-500 font-medium text-center text-xl text-slate-600"> Time: {timeLeft}</h2>;
}

export default App
