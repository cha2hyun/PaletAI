import React from 'react';

interface BrowserPanelProps {
  browserRef: React.RefObject<HTMLElement>;
  browserUrl: string;
  browserInputUrl: string;
  setBrowserInputUrl: (url: string) => void;
  handleBrowserNavigate: () => void;
  handleBrowserKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isVisible: boolean;
}

export default function BrowserPanel({
  browserRef,
  browserUrl,
  browserInputUrl,
  setBrowserInputUrl,
  handleBrowserNavigate,
  handleBrowserKeyPress,
  isVisible
}: BrowserPanelProps) {
  return (
    <div className="flex-1 flex flex-col" style={{ display: isVisible ? 'flex' : 'none' }}>
      <div className="flex-none bg-black/90 border-b border-gray-900">
        <div className="flex items-center gap-2 px-4 py-2 h-8">
          <h2 className="text-sm font-medium text-gray-400">Browser</h2>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={browserInputUrl}
              onChange={(e) => setBrowserInputUrl(e.target.value)}
              onKeyPress={handleBrowserKeyPress}
              placeholder="Enter URL..."
              className="flex-1 px-3 py-1 text-xs bg-black/50 text-white border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
            <button
              onClick={handleBrowserNavigate}
              className="px-3 py-1 text-xs bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              title="Go"
            >
              →
            </button>
          </div>
        </div>
      </div>
      <webview ref={browserRef} src={browserUrl} className="flex-1 w-full h-full" style={{ display: 'inline-flex' }} />
    </div>
  );
}
