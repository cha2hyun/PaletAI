// Electron webview 태그의 타입 정의
import * as React from 'react';

declare namespace JSX {
  interface IntrinsicElements {
    webview: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        partition?: string;
        preload?: string;
        httpreferrer?: string;
        useragent?: string;
        disablewebsecurity?: string;
        allowpopups?: string;
        webpreferences?: string;
      },
      HTMLElement
    >;
  }
}
