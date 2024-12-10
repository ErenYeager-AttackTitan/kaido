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
        const playerInstance = window.jwplayer(playerId).setup({
          file: `https://goodproxy.eren-yeager-founding-titan-9.workers.dev/fetch?url=${url}`, // Proxy URL with the video file
          width: "100%",
          aspectratio: "16:9",
          controls: true,
          autostart: false,
        });

        playerInstance.on("ready", () => {
          const playerContainer = document.getElementById(playerId);

          // Forward Seek Button Creation
          const forwardContainer = document.createElement("div");
          forwardContainer.classList.add("jw-icon-forward");
          forwardContainer.style.cursor = "pointer";
          forwardContainer.innerHTML = "Forward 10s"; // Button Text
          forwardContainer.style.fontSize = "14px";
          forwardContainer.style.color = "#fff";
          forwardContainer.style.position = "absolute";
          forwardContainer.style.top = "10px";
          forwardContainer.style.right = "10px";

          // Insert forward button into player container
          playerContainer.appendChild(forwardContainer);

          // On Click: Seek forward 10 seconds
          forwardContainer.onclick = () => {
            playerInstance.seek(playerInstance.getPosition() + 10);
          };

          // Control bar customizations
          const controlBar = playerContainer.querySelector(".jw-controls");
          if (controlBar) {
            const rewindControlBarButton = controlBar.querySelector(".jw-icon-rewind");
            const forwardControlBarButton = rewindControlBarButton.cloneNode(true);
            forwardControlBarButton.style.transform = "scaleX(-1)"; // Flip icon
            forwardControlBarButton.ariaLabel = "Forward 10 Seconds";
            rewindControlBarButton.parentNode.insertBefore(forwardControlBarButton, rewindControlBarButton.nextElementSibling);

            // Seek forward button handler in control bar
            forwardControlBarButton.onclick = () => {
              playerInstance.seek(playerInstance.getPosition() + 10);
            };
          }
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
