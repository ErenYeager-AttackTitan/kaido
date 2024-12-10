// components/DisqusComments.js

import React, { useEffect } from 'react';

const DisqusComments = ({ identifier }) => {
  useEffect(() => {
    const loadDisqus = () => {
      window.disqus_config = function () {
        this.page.identifier = identifier; // Unique identifier for this page (episode ID)
        this.page.url = window.location.href; // Use current page URL
      };

      if (!document.getElementById('disqus-script')) {
        const script = document.createElement('script');
        script.src = 'https://katsu.disqus.com/embed.js'; // Disqus embed script
        script.id = 'disqus-script';
        script.setAttribute('data-timestamp', +new Date());
        document.body.appendChild(script);
      } else {
        window.DISQUS.reset({ reload: true });
      }
    };

    loadDisqus();

  }, [identifier]);

  return <div id="disqus_thread"></div>;
};

export default DisqusComments;
