"use client";

import { useState, useEffect } from "react";

function getSavedValue(key: string, initialValue: string) {
  if (typeof window !== "undefined") {
    const savedValue = localStorage.getItem(key);
    try {
      if (savedValue !== null) {
        return JSON.parse(savedValue);
      }
    } catch (error) {
      console.error("Error parsing saved value from localStorage:", error);
    }
  }

  return initialValue;
}

export default function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
