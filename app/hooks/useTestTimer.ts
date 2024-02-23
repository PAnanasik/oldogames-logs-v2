import { useState, useCallback } from "react";

const useTestTimer = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const startTest = useCallback(() => {
    setStartTime(Date.now());
  }, []);

  const finishTest = useCallback(() => {
    setEndTime(Date.now());
  }, []);

  const getElapsedTime = (time: number | null) => {
    if (!time) return "00:00:00";

    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    const displayHours = hours < 10 ? `0${hours}` : hours;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${displayHours}:${displayMinutes}:${displaySeconds}`;
  };

  const elapsedTime = getElapsedTime(
    endTime && startTime ? endTime - startTime : null
  );

  const getMessage = (elapsedTime: string) => {
    const [hours, minutes] = elapsedTime.split(":").map(Number);
    const totalTimeInMinutes = hours * 60 + minutes;

    if (totalTimeInMinutes < 3) {
      return "Молниеносно!";
    } else if (totalTimeInMinutes < 7) {
      return "Быстро!";
    } else {
      return "Засчитано!";
    }
  };

  const message = getMessage(elapsedTime);

  return {
    startTest,
    finishTest,
    elapsedTime,
    message,
  };
};

export default useTestTimer;
