# Palet AI - User Guide

An Electron-based application that allows you to use four major AI services (ChatGPT, Google Gemini, Claude, Perplexity) and a browser simultaneously in one desktop app.

## 🚀 Features

- **Single Input Field**: Send one prompt to multiple AI services simultaneously
- **Multi-Panel View**: Compare responses from ChatGPT, Gemini, Claude, and Perplexity at once
- **Session Persistence**: Automatically save login information for each service
- **Security**: Safe execution environment with contextIsolation and sandbox enabled

## 📦 Installation & Running

### Development Mode

```bash
# Install dependencies
npm install

# Build Electron
npm run build:electron

# Start development server (Terminal 1)
npm run dev

# Run Electron app (Terminal 2, after dev server starts)
npm run dev:electron
```

### Production Build

```bash
# Full build
npm run build

# Create macOS app
npm run dist:mac

# Create Windows app
npm run dist:win

# Create Linux app
npm run dist:linux
```

## 🎯 How to Use

1. **First-Time Login**

   - When you launch the app, webviews will display login pages for ChatGPT, Gemini, Claude, and Perplexity
   - Once you log in to each service, the session is automatically saved for auto-login on next launch

2. **Sending Prompts**

   - Enter your prompt in the input field at the bottom
   - Click the "Send" button or press `Enter` to send to all services simultaneously
   - Use `Shift + Enter` for line breaks

3. **Viewing Responses**
   - Compare each AI's responses simultaneously in multiple panels

## ⚙️ Tech Stack

- **Electron 30**: Cross-platform desktop app framework
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Fast development build tool
- **Tailwind CSS 3**: Utility-first styling

## 🔧 Key Implementation Details

### Webview Session Persistence

```typescript
<webview src="https://chat.openai.com" partition="persist:chatgpt" />
```

The `partition="persist:*"` attribute maintains each service's session independently.

### Automatic Prompt Injection

Uses the `executeJavaScript` API to directly access each webview's DOM, inject text, and trigger the send button.

### Security Settings

```typescript
webPreferences: {
  webviewTag: true,
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true
}
```

## ⚠️ Important Notes

### DOM Selector Updates Required

Each AI service frequently updates their UI, so if automatic prompt sending stops working, you'll need to update the selectors in `src/constants/aiServices.ts`:

```typescript
// ChatGPT selector (example)
'#prompt-textarea, textarea[placeholder*="Message"]';
'button[data-testid="send-button"], button[aria-label="Send prompt"]';

// Gemini selector (example)
'.ql-editor[contenteditable="true"], textarea[aria-label*="chat"]';
'button[aria-label*="Send"], button.send-button';

// Perplexity selector (example)
'textarea[aria-label="Ask anything"], #userInput';
'button[aria-label="Submit"], button.submit';

// Claude selector (example)
'div[contenteditable="true"][role="textbox"][data-testid="chat-input"]';
'button[aria-label="Send message"], button[aria-label*="Send"]';
```

**How to Find Selectors:**

1. Run the Electron app and open DevTools for each webview (shortcut needs to be implemented)
2. Check CSS selectors for the input field and send button in the Elements tab
3. Update selectors in the `src/constants/aiServices.ts` file

### Terms of Service Compliance

- This app may violate automation policies of each AI service
- **Use only for personal testing and learning purposes**
- Do not use for commercial purposes or mass automation

### CORS & Security

- Electron webviews bypass CORS policies of each service
- While less risky than direct API calls, you must comply with each service's terms of use

## 🐛 Troubleshooting

### Webview Not Loading

- Check `webviewTag: true` setting in `electron/index.ts`
- Verify network connection

### Prompt Not Sending

- The DOM structure of each service may have changed
- Check and update the latest selectors using browser DevTools

### Session Not Persisting

- Verify `partition="persist:*"` attribute
- Check Electron userData folder permissions

## 📝 Developer Notes

### Adding a New AI Service

1. Add the service to `src/constants/aiServices.ts`
2. Update layout configurations in components
3. Add appropriate selectors for the new service

### Enabling Developer Tools

To open DevTools in a webview, add this code:

```typescript
webviewRef.current?.openDevTools();
```

## 📄 License

MIT License - Free to use, modify, and distribute.

## 🙏 Contributing

Bug reports, feature suggestions, and Pull Requests are always welcome!

---

**Disclaimer**: This project is created for educational and personal use purposes. Please use it in compliance with the terms of service of each AI service provider.
