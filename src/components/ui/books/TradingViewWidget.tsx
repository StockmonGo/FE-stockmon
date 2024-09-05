"use client";
import React, { memo, useEffect, useRef } from "react";

export default memo(function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      const chartScript = document.createElement("script");
      chartScript.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      chartScript.type = "text/javascript";
      chartScript.async = true;
      chartScript.innerHTML = `
          {
            "symbols": [
              [
                "Apple",
                "AAPL|1D"
              ],
              [
                "Google",
                "GOOGL|1D"
              ],
              [
                "Microsoft",
                "MSFT|1D"
              ]
            ],
            "chartOnly": false,
            "width": "100%",
            "height": "100%",
            "locale": "en",
            "colorTheme": "light",
            "autosize": true,
            "showVolume": false,
            "showMA": false,
            "hideDateRanges": false,
            "hideMarketStatus": false,
            "hideSymbolLogo": false,
            "scalePosition": "right",
            "scaleMode": "Normal",
            "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
            "fontSize": "10",
            "noTimeScale": false,
            "valuesTracking": "1",
            "changeMode": "price-and-percent",
            "chartType": "area",
            "maLineColor": "#2962FF",
            "maLineWidth": 1,
            "maLength": 9,
            "headerFontSize": "medium",
            "lineWidth": 2,
            "lineType": 0,
            "dateRanges": [
              "1d|1",
              "1m|30",
              "3m|60",
              "12m|1D",
              "60m|1W",
              "all|1M"
            ]
          }`;
      container.current.appendChild(chartScript);
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
});
