import { useCallback, useState } from "react";
const useToggle = (
  initialState: boolean = false
): [boolean, (value?: boolean) => void] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback((value?: boolean) => {
    if (typeof value === "boolean") {
      setState(value);
    } else {
      setState((prev) => !prev);
    }
  }, []);

  return [state, toggle];
};

export default useToggle;
