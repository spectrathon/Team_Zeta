"use client"
import React, { useEffect, useRef, memo } from 'react';
function TradingViewWidget() {
const container = useRef();

useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
            "width": "980",
          "height": "610",
          "symbol": "NASDAQ:AAPL",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": true,
          "withdateranges": true,
          "range": "YTD",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "hotlist": true,
          "calendar": false,
          "studies": [
            "STD;DEMA"
          ],
          "show_popup_button": true,
          "popup_width": "700",
          "popup_height": "1050",
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
      return () => {
        if (container.current && container.current.removeChild) {
          container.current.removeChild(script);
      }
      };
    },
    []);

// useEffect(() => {
//     const currentContainer = container.current;
//     const script = document.createElement("script");
//     script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
//     script.async = true;
//     script.innerHTML = JSON.stringify({
//       // your script properties here
//     });
  
//     currentContainer.appendChild(script);
  
//     // Clean up the effect
//     return () => {
//       currentContainer.removeChild(script);
//     };
//   }, []);
  

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "200%", width: "50%" }}>
      <div className="tradingview-widget-container__widget" style={{ height: "calc(200% - 32px)", width: "50%" }}></div>
      {/* <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div> */}
      
    </div>
  );
}
export default memo(TradingViewWidget);