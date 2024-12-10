import React, { useEffect } from "react";

export default function VideoPlayer({ url }) {
  const playerId = "jwplayer-container";

  useEffect(() => {
    const loadJWPlayer = () => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/ErenYeager-AttackTitan/jwplayer/jw.js"; // Your JWPlayer CDN link
      script.onload = initializePlayer;
      document.body.appendChild(script);
    };

    const loadCSS = () => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/gh/erenYeager-AttackTitan/jw-style/style.css"; // Your custom CSS CDN link
      document.head.appendChild(link);
    };

    const initializePlayer = () => {
      if (window.jwplayer) {
        window.jwplayer(playerId).setup({
          file: `https://goodproxy.eren-yeager-founding-titan-9.workers.dev/fetch?url=${url}`,
          width: "100%",
          aspectratio: "16:9",
          controls: true,
          autostart: false,
        });
      } else {
        console.error("JWPlayer failed to load.");
      }
    };

    loadJWPlayer();
    loadCSS();

    return () => {
      const jwScript = document.querySelector(`script[src*="jwplayer"]`);
      const cssLink = document.querySelector(`link[href*="style.css"]`);
      if (jwScript) jwScript.remove();
      if (cssLink) cssLink.remove();
    };
  }, [url]);

  return <div id={playerId}></div>;
}
