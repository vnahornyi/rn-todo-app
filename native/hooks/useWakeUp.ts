import { useEffect, useState } from "react";
import { AppState } from "react-native";

const useWakeUp = (callback: () => Promise<void> | void) => {
  const [status, setStatus] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (status === "background" && nextAppState === "active") {
        callback();
      }

      setStatus(nextAppState);
    });

    return subscription.remove;
  }, [callback, status]);
};

export default useWakeUp;
