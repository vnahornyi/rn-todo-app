import RNWebView, { WebViewMessageEvent } from "react-native-webview";

type WebViewSharedProps = {
  injectedJSString: string;
  CSSString: string;
  onPostMesage?: (event: WebViewMessageEvent) => void;
  ref?: React.RefObject<RNWebView>;
};

type WhenURIPropsType = WebViewSharedProps & {
  uri: string;
  html?: never;
};

type WhenHMTLPropsType = WebViewSharedProps & {
  html: string;
  uri?: never;
};

type WebViewPropsType = WhenHMTLPropsType | WhenURIPropsType;

const generateJSToInject = (css: string, js: string) => {
  return `
    (() => {
    const style = document.createElement("style");
    style.innerHTML = "${css}";
    document.head.appendChild(style);

    ${js}
  })();
  true;`;
};

const WebView: React.FC<WebViewPropsType> = ({
  injectedJSString,
  CSSString,
  uri,
  html,
  onPostMesage,
  ref,
}) => {
  const source = uri ? { uri: uri as string } : { html: html as string };

  return (
    <RNWebView
      source={source}
      javaScriptEnabled={true}
      injectedJavaScript={generateJSToInject(CSSString, injectedJSString)}
      onMessage={onPostMesage ? onPostMesage : () => {}}
      ref={ref ? ref : () => {}}
    />
  );
};

export default WebView;
