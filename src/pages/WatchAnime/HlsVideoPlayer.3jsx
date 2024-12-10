import React, { useEffect } from "react";

export default function VideoPlayer({ url }) {
  const playerId = "jwplayer-container";

  // Define your custom CSS styles as a string
  const customStyles = `
    
  `;

  useEffect(() => {
    const loadJWPlayer = () => {
      // Load the JWPlayer script from your CDN
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/ErenYeager-AttackTitan/jwplayer/jw.js"; // Your JWPlayer CDN link
      script.onload = initializePlayer;
      document.body.appendChild(script);
      
      // Load your custom CSS from the CDN (if needed)
      const customCSS = document.createElement("link");
      customCSS.rel = "stylesheet";
      customCSS.href = "https://cdn.jsdelivr.net/gh/ErenYeager-AttackTitan/jw-style/player_anikatsu.css"; // Your custom CSS CDN
      document.head.appendChild(customCSS);
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

    return () => {
      const jwScript = document.querySelector(`script[src*="jwplayer"]`);
      const customCSS = document.querySelector(`link[href*="player_anikatsu.css"]`);
      if (jwScript) jwScript.remove();
      if (customCSS) customCSS.remove();
    };
  }, [url]);

  return (
    <div>
      {/* Inject custom CSS directly */}
      <style>{customStyles}</style>
      <div id={playerId} className="wrap"></div>
    </div>
  );
}
