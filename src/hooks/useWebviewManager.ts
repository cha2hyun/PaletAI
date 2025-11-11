import { useRef, useState, useEffect } from 'react';

export interface WebviewElement extends HTMLElement {
  src: string;
  partition: string;
  executeJavaScript: (code: string) => Promise<unknown>;
  openDevTools: () => void;
  reload: () => void;
  loadURL: (url: string) => Promise<void>;
}

export interface WebviewRefs {
  chatgptRef: React.RefObject<WebviewElement>;
  geminiRef: React.RefObject<WebviewElement>;
  perplexityRef: React.RefObject<WebviewElement>;
  claudeRef: React.RefObject<WebviewElement>;
  browserRef: React.RefObject<WebviewElement>;
}

export interface WebviewsReady {
  chatgpt: boolean;
  gemini: boolean;
  perplexity: boolean;
  claude: boolean;
  browser: boolean;
}

export function useWebviewManager() {
  const chatgptRef = useRef<WebviewElement>(null);
  const geminiRef = useRef<WebviewElement>(null);
  const perplexityRef = useRef<WebviewElement>(null);
  const claudeRef = useRef<WebviewElement>(null);
  const browserRef = useRef<WebviewElement>(null);

  const [webviewsReady, setWebviewsReady] = useState<WebviewsReady>({
    chatgpt: false,
    gemini: false,
    perplexity: false,
    claude: false,
    browser: false
  });

  useEffect(() => {
    if (window.Main) {
      window.Main.removeLoading();
    }

    const checkWebviewsReady = () => {
      const chatgptReady = chatgptRef.current !== null;
      const geminiReady = geminiRef.current !== null;
      const perplexityReady = perplexityRef.current !== null;
      const claudeReady = claudeRef.current !== null;
      const browserReady = browserRef.current !== null;

      setWebviewsReady({
        chatgpt: chatgptReady,
        gemini: geminiReady,
        perplexity: perplexityReady,
        claude: claudeReady,
        browser: browserReady
      });
    };

    const interval = setInterval(checkWebviewsReady, 500);
    checkWebviewsReady();

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return {
    refs: { chatgptRef, geminiRef, perplexityRef, claudeRef, browserRef },
    webviewsReady
  };
}
