import { useCallback, useState } from "react";
import { countErrors } from "../utils/helpers";
import useWords from "./useWords";
import useCountdown from "./useCountdownTimer";
import useTypings from "./useTypings";
import { useEffect } from "react";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const { timeLeft, startCountdown, resetCountdown } = useCountdown(COUNTDOWN_SECONDS);
  const { typed, cursor, clearTyped, resetTotalTyped: resetTotalTyped, totalTyped, shouldHop, resetHop } = useTypings(state !== "finish");


  const [errors, setErrors] = useState(0);

  const isStarting = state === "start" && cursor > 0;
  const areWordsFinished = cursor === words.length;



  const sumErrors = useCallback(() => {
    const wordsReached = words.substring(0, cursor);
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown, cursor]);

  useEffect(() => {
    if (!timeLeft) {
      console.log("Time is up!");
      setState("finish");
      sumErrors();
    }
  }, [timeLeft, sumErrors]);


  useEffect(() => {
    if (areWordsFinished) {
      console.log("Words finished!");
      sumErrors();
      updateWords();
      clearTyped();
    }
    }, [
      cursor,
      words,
      clearTyped,
      typed,
      areWordsFinished,
      updateWords,
      sumErrors,
    ]);

  const restart = useCallback(() => {
    console.log("Restarting...");
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  return { state, words, timeLeft, typed, errors, totalTyped, restart, shouldHop, resetHop };
};

export default useEngine;

