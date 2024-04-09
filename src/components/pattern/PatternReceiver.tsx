import * as React from "react";
import ReactDOMServer from "react-dom/server";

type PatternReceiverProps = {
  Pattern: React.ReactElement;
  children?: React.ReactNode;
  backgroundColor: string;
};

const svgToDataURL = (svgReactComponent: React.ReactElement): string => {
  const svgString = ReactDOMServer.renderToStaticMarkup(svgReactComponent);
  const base64 = window.btoa(unescape(encodeURIComponent(svgString)));
  return `data:image/svg+xml;base64,${base64}`;
};

const PatternReceiver: React.FC<PatternReceiverProps> = ({ Pattern, backgroundColor, children }) => {
  const backgroundImageUrl = svgToDataURL(Pattern);

  return (
    <div
      className="flex w-full flex-grow items-center justify-center relative"
      style={{
        backgroundImage: `url("${backgroundImageUrl}")`,
        backgroundRepeat: "repeat",
        backgroundColor: backgroundColor,
      }}
    >
      {children}
    </div>
  );
};

export default PatternReceiver;

