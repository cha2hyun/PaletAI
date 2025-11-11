import { useCallback } from 'react';
import { WebviewElement } from './useWebviewManager';

export function useAIServices() {
  const sendToAI = useCallback(
    async (
      webviewRef: React.RefObject<WebviewElement>,
      selector: string,
      buttonSelector: string,
      message: string,
      serviceName: string
    ) => {
      if (!webviewRef.current) {
        return;
      }

      // webview DOM이 로드될 때까지 잠시 대기
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 300);
      });

      try {
        const code = `
        (function() {
          try {
            console.log('\\n=== ${serviceName} Send Debug ===');
            console.log('🔍 Searching for textarea with selector: ${selector}');
            
            // 입력창 찾기
            const inputElement = document.querySelector('${selector}');
            if (!inputElement) {
              console.error('❌ Input element NOT found with selector: ${selector}');
              
              // 모든 textarea와 contenteditable 출력
              const allTextareas = document.querySelectorAll('textarea');
              const allContentEditables = document.querySelectorAll('[contenteditable="true"]');
              console.log('📝 Found ' + allTextareas.length + ' textarea(s)');
              console.log('✏️  Found ' + allContentEditables.length + ' contenteditable(s)');
              allContentEditables.forEach((el, i) => {
                console.log('  ContentEditable ' + (i+1) + ':', {
                  id: el.id,
                  tagName: el.tagName,
                  className: el.className
                });
              });
              return false;
            }
            
            console.log('✅ Input element found!');
            console.log('📝 Element info:', {
              id: inputElement.id,
              tagName: inputElement.tagName,
              contentEditable: inputElement.contentEditable
            });
            
            // contenteditable div인지 textarea인지 확인
            const isContentEditable = inputElement.contentEditable === 'true';
            
            if (isContentEditable) {
              console.log('✏️  Detected ContentEditable div');
              
              // Lexical editor 체크 (Perplexity 등)
              const isLexicalEditor = inputElement.closest('[data-lexical-editor]') !== null;
              
              if (isLexicalEditor) {
                console.log('📝 Lexical editor detected (Perplexity)');
                
                // Focus 먼저
                inputElement.focus();
                console.log('🎯 Focused on input');
                
                // 방법 1: innerHTML로 p 태그 설정 (Lexical은 p 태그 사용)
                console.log('⌨️  Setting innerHTML with p tag...');
                inputElement.innerHTML = '<p>' + ${JSON.stringify(message)} + '</p>';
                console.log('📄 innerHTML set');
                
                // InputEvent 트리거 (type: 'insertText')
                const inputEvent = new InputEvent('input', {
                  bubbles: true,
                  cancelable: true,
                  inputType: 'insertText',
                  data: ${JSON.stringify(message)}
                });
                inputElement.dispatchEvent(inputEvent);
                console.log('🎯 InputEvent dispatched');
                
                // 추가 이벤트들
                inputElement.dispatchEvent(new Event('change', { bubbles: true }));
                inputElement.dispatchEvent(new Event('keyup', { bubbles: true }));
                console.log('✅ Additional events dispatched');
              } else {
                // 일반 ContentEditable div (ChatGPT, Gemini)
                console.log('⌨️  Setting textContent...');
                inputElement.textContent = ${JSON.stringify(message)};
                console.log('📄 TextContent set:', inputElement.textContent);
                
                // focus
                inputElement.focus();
                
                // input 이벤트 트리거
                console.log('🎯 Dispatching input event...');
                inputElement.dispatchEvent(new Event('input', { bubbles: true }));
                inputElement.dispatchEvent(new Event('change', { bubbles: true }));
                console.log('✅ Events dispatched');
              }
            } else {
              // Textarea 또는 Input 요소
              const tagName = inputElement.tagName.toLowerCase();
              console.log('📝 Detected ' + tagName + ' element');
              
              // 값 설정
              inputElement.value = ${JSON.stringify(message)};
              
              // React의 이벤트 트리거 (textarea와 input 모두 지원)
              const prototype = tagName === 'textarea' 
                ? window.HTMLTextAreaElement.prototype 
                : window.HTMLInputElement.prototype;
              const nativeInputValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
              
              if (nativeInputValueSetter) {
                nativeInputValueSetter.call(inputElement, ${JSON.stringify(message)});
              }
              
              // Focus 및 이벤트 트리거
              inputElement.focus();
              inputElement.dispatchEvent(new Event('input', { bubbles: true }));
              inputElement.dispatchEvent(new Event('change', { bubbles: true }));
              console.log('✅ Value set and events dispatched');
            }
            
            // 전송 버튼 찾기 및 클릭 (또는 Enter 키 시뮬레이션)
            console.log('⏳ Waiting 100ms before submitting...');
            setTimeout(() => {
              console.log('🔍 Searching for button with selector: ${buttonSelector}');
              const button = document.querySelector('${buttonSelector}');
              if (button) {
                console.log('✅ Button found!');
                console.log('🖱️  Clicking button...');
                button.click();
                console.log('🚀 Button clicked successfully!');
              } else {
                console.log('⚠️  Send button NOT found, trying Enter key instead...');
                
                // Enter 키 시뮬레이션 (Perplexity 등에서 사용)
                console.log('⌨️  Simulating Enter key press...');
                const enterEvent = new KeyboardEvent('keydown', {
                  key: 'Enter',
                  code: 'Enter',
                  keyCode: 13,
                  which: 13,
                  bubbles: true,
                  cancelable: true
                });
                inputElement.dispatchEvent(enterEvent);
                console.log('✅ Enter key dispatched!');
              }
            }, 100);
            
            return true;
          } catch (error) {
            console.error('❌ Error in sendToAI:', error);
            return false;
          }
        })();
      `;

        await webviewRef.current.executeJavaScript(code);
      } catch (error) {
        // Error silently handled
      }
    },
    []
  );

  const searchInBrowser = useCallback(async (browserRef: React.RefObject<WebviewElement>, query: string) => {
    if (!browserRef.current) return;

    try {
      const searchQuery = JSON.stringify(query);
      const code = `
        (function() {
          const currentUrl = window.location.href;
          const hostname = window.location.hostname;
          let searchUrl = '';
          
          // 검색 엔진별 URL 생성
          if (hostname.includes('google')) {
            searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(${searchQuery});
          } else if (hostname.includes('naver')) {
            searchUrl = 'https://search.naver.com/search.naver?query=' + encodeURIComponent(${searchQuery});
          } else if (hostname.includes('daum')) {
            searchUrl = 'https://search.daum.net/search?q=' + encodeURIComponent(${searchQuery});
          } else if (hostname.includes('bing')) {
            searchUrl = 'https://www.bing.com/search?q=' + encodeURIComponent(${searchQuery});
          } else {
            // 기본값: 구글 검색
            searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(${searchQuery});
          }
          
          window.location.href = searchUrl;
          return true;
        })();
      `;
      await browserRef.current.executeJavaScript(code);
    } catch (error) {
      // Error silently handled
    }
  }, []);

  return { sendToAI, searchInBrowser };
}
