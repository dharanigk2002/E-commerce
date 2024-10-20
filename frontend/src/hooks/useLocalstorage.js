import { useEffect, useState } from "react";

export function useLocalstorage(key, defaultVal = {}) {
  const [state, setState] = useState(() => {
    const storage = window.localStorage.getItem(key);
    return storage ? JSON.parse(storage) : defaultVal;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, setState];
}
