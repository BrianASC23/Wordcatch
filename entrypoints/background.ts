export default defineBackground(() => {
  // Listen for messages from the popup
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'TRANSLATE') {
      // Write the API call here
      // message.text contains the word to translate
      // message.from and message.to contain language codes
      // Call sendResponse({ translation: '...' }) with the result

      // Text
      const text = message.text;

      // languages
      const srcLang = message.from;
      const dstLang = message.to;

      // API
      const url = 'https://api.mymemory.translated.net/get?q=${text}&langpair=${srcLang}|${dstLang}';
      async function fetchData(){
        try {
          const response = await fetch(url);

          if (!response.ok){
            throw new Error(`HTTP Error! Status: ${response.status}`);
          }
        } catch (error){
          console.error('Failed to fetch API response');
        }
      }
      fetchData();
    }

    // Return true to indicate async response
    return true;
  });
});
