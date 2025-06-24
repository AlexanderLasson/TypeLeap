import { useState } from "react";
import useWords from "./useWords";
import useCountdown from "./useCountdownTimer";
import useTypings from "./useTypings";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
  const [state, setState] = useState<State>("start");
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const { timeLeft, startCountdown, resetCountdown } = useCountdown(COUNTDOWN_SECONDS);
  const { typed, cursor, clearTyped, resestTotalTyped, totalTyped } = useTypings(state !== "finish");

  return { state, words, timeLeft, typed };
}

export default useEngine;

