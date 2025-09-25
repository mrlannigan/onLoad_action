import { useEffect, useMemo } from 'react';
import {
  useConfig,
  useEditorPanelConfig,
  useActionTrigger,
} from '@sigmacomputing/plugin';

function App() {
  useEditorPanelConfig([
    { type: 'text', name: 'BackgroundColorHex', allowedTypes: ['text', 'string'], defaultValue: 'ffffff' },
    { type: 'text', name: 'BackgroundColorHex2', allowedTypes: ['text', 'string'], defaultValue: 'ffffff' },
    {
      type: 'action-trigger',
      name: 'onLoadAction',
      label: 'onLoad',
    },
  ]);

  const config = useConfig();
  const triggerOnLoadAction = useActionTrigger(config.onLoadAction);

  const backgroundColor = config.BackgroundColorHex;

  useEffect(() => {
    triggerOnLoadAction();
  }, [triggerOnLoadAction]);

  // Memoize the condition for rendering the div
  const shouldRenderDiv = useMemo(() => {
    // Check if backgroundColor is not null and any other conditions related to API data
    return backgroundColor !== null; // Add more conditions if needed
  }, [backgroundColor]);

  return (
    <>
      {shouldRenderDiv && (
        <div
          style={{
            backgroundColor: `#${backgroundColor}`, // dynamically set background color, default to 'ffffff' if null
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            pointerEvents: 'none',
            padding: 0,
            margin: 0,
            border: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1,
          }}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
    </>
  );
}

export default App;