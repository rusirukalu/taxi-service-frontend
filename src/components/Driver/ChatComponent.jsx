import React, { useEffect } from 'react';

const ChatComponent = () => {
  useEffect(() => {
    // Ensure Tawk.to is not loaded more than once
    if (!window.Tawk_API) {
      var Tawk_API = Tawk_API || {};
      var Tawk_LoadStart = new Date();

      // Create the script element
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://embed.tawk.to/66f700b3e5982d6c7bb5c57b/1i8qdlflh'; // Replace with your property ID
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');

      // Append the script to the body
      document.body.appendChild(script);

      // Clean up the script when the component is unmounted
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return null;
};

export default ChatComponent;
