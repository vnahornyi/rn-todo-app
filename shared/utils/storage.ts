import PLATFORM from "../constants/platform";
import errorAlert from "./errorAlert";

export async function getFromStorage<T = any>(key: string): Promise<T | null> {
  try {
    let jsonValue: string | null = null;

    if (PLATFORM.isWeb) {
      jsonValue = localStorage.getItem(key);
    } else {
      const AsyncStorage = (
        await import("@react-native-async-storage/async-storage")
      ).default;
      jsonValue = await AsyncStorage.getItem(key);
    }

    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    if (e instanceof Error) {
      errorAlert(e.message);
    }

    return null;
  }
}

export async function setToStorage(key: string, value: any): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);

    if (PLATFORM.isWeb) {
      localStorage.setItem(key, jsonValue);
    } else {
      const AsyncStorage = (
        await import("@react-native-async-storage/async-storage")
      ).default;

      await AsyncStorage.setItem(key, jsonValue);
    }
  } catch (e) {
    if (e instanceof Error) {
      errorAlert(e.message);
    }
  }
}
