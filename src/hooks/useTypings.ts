import { useCallback, useEffect, useRef, useState } from "react";

const isKeyboardCodeAllowed = (code: string) => {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space"
  );
};

const useTypings = (enabled: boolean) => {
  const [cursor, setCursor] = useState(0);
  const [typed, setTyped] = useState<string>("");
  const totalTyped = useRef(0);
  const [shouldHop, setShouldHop] = useState(false);

  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      if (!enabled || !isKeyboardCodeAllowed(code)) {
        return;
      }
      switch (key) {
        case "Backspace":
          setTyped((prev) => prev.slice(0, -1));
          setCursor((prev) => Math.max(0, prev - 1));
          // Don't decrement totalTyped for backspace - it should only count forward progress
          break;
        case " ":
          setTyped((prev) => prev.concat(key));
          setCursor((prev) => prev + 1);
          totalTyped.current += 1;
          setShouldHop(true);
          break;
        default:
          setTyped((prev) => prev.concat(key));
          setCursor((prev) => prev + 1);
          totalTyped.current += 1;
      }
    },
    [enabled]
  );

  const clearTyped = useCallback(() => {
    setTyped("");
    setCursor(0);
  }, []);

  const resetTotalTyped = useCallback(() => {
    totalTyped.current = 0;
  }, []);

  const resetHop = useCallback(() => {
    setShouldHop(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  return {
    typed,
    cursor,
    clearTyped,
    resetTotalTyped: resetTotalTyped,
    totalTyped: totalTyped.current,
    shouldHop,
    resetHop,
  }
};

export default useTypings;
