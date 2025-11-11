import React from 'react';
import { AIServiceConfig } from '../constants/aiServices';

interface WebviewPanelProps {
  service: AIServiceConfig;
  webviewRef: React.RefObject<HTMLElement>;
  isVisible: boolean;
}

export default function WebviewPanel({ service, webviewRef, isVisible }: WebviewPanelProps) {
  return (
    <div className="flex-1 flex flex-col border-r border-gray-900" style={{ display: isVisible ? 'flex' : 'none' }}>
      <div className="h-8 flex-none px-4 py-2 bg-black/80 border-b border-gray-900">
        <h2 className="text-sm font-medium text-gray-400">{service.displayName}</h2>
      </div>
      <webview
        ref={webviewRef}
        src={service.url}
        partition={service.partition}
        className="flex-1 w-full h-full"
        style={{ display: 'inline-flex' }}
      />
    </div>
  );
}
