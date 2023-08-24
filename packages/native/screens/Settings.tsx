import { Alert } from "react-native";
import WebView from "../components/WebView";

const Settings: React.FC = () => {
  return (
    <WebView
      uri="https://memcrab.com/"
      CSSString="h1 { color: red !important; }"
      injectedJSString={`
        const h1 = document.querySelector("h1");
        h1.innerText = "CLICK ME!";
        h1.onclick = () => {
          window.ReactNativeWebView.postMessage('Hi from WEB!');
        };
      `}
      onPostMesage={(event) => {
        Alert.alert("RN Alert", event.nativeEvent.data);
      }}
    />
  );
};

export default Settings;
