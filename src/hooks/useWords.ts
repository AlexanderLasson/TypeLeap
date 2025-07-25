import { faker } from "@faker-js/faker";
import { useCallback, useState } from "react";

const generateWords = (count: number) => {

  let faker_words = faker.word.words(count).toLowerCase();
  faker_words =  faker_words.replace(/-/g, "");
  if (faker_words.includes("-")) {
  console.log("Has a -!");
  }

  return faker_words
}

const useWords = (count:number) => {
  const [words, setWords] = useState<string>(generateWords(count));

  const updateWords = useCallback(() => {
    setWords(generateWords(count));
  }, [count]);

  return { words, updateWords };
}

export default useWords;
