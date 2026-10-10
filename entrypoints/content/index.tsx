import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './style.css';


/**
 * WXT function that defines the content script for the ext. 
 * Specifies the matches for the content script, the CSS injection mode,
 * and the main function that creates and mounts the shadow root UI.
 */
export default defineContentScript({
  matches: ['<all_urls>'],
  // Inject the CSS into the shadow root instead of the host page
  cssInjectionMode: 'ui',
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {            // Shadow Root is private to the extension (away from the host page's DOM) and won't affect the host page's styles. 
      name: 'wordcatch-ui',
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        root.render(<App />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });
    ui.mount();
  },
});
