import { useState, useEffect } from 'react';

function App() {
  // 1. Create state for the translation result
  // 2. Hardcode a word (e.g. "bonjour")
  // 3. Send a message to the background script to translate it:
  //    browser.runtime.sendMessage({ type: 'TRANSLATE', text: 'bonjour', from: 'fr', to: 'en' })
  // 4. Display the result


  const [ translation, setTranslation ] = useState("")

  useEffect(() => {
    const translate = async () => {
      try {
        const response = await browser.runtime.sendMessage({
          type: 'TRANSLATE',
          text: 'bonjour',
          from: 'fr',
          to: 'en',
        });
        setTranslation(response.translation ?? response.error);
      } catch (error) {
        console.error('Error sending message to background script:', error);
        setTranslation('Translation failed');
      }
    };
    translate();
  }, [])

  return (
    <div className="w-80 p-4">
      <h1 className="text-2xl font-bold">Wordcatch</h1>
        <p className="mt-2 text-lg">
          {translation || 'Translating...'}
        </p>
    </div>
  );
}

export default App;
