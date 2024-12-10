import React, { useEffect } from "react";

export default function VideoPlayer({ url }) {
  const playerId = "jwplayer-container";

  useEffect(() => {
    const loadJWPlayer = () => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/ErenYeager-AttackTitan/jwplayer/jw.js"; // Your CDN link
      script.onload = initializePlayer;
      document.body.appendChild(script);
    };

    const initializePlayer = () => {
      if (window.jwplayer) {
        window.jwplayer(playerId).setup({
          file: `https://goodproxy.eren-yeager-founding-titan-9.workers.dev/fetch?url=${url}`, // Correct string concatenation
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

    return () => {
      const jwScript = document.querySelector(`script[src*="jwplayer"]`);
      if (jwScript) jwScript.remove();
    };
  }, [url]);

  return <div id={playerId}></div>;
}
