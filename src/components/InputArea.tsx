import React, { useCallback } from 'react';
import { Button, Spinner, Textarea } from '@heroui/react';

interface InputAreaProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isSending: boolean;
  onSend: () => void;
}

export default function InputArea({ prompt, setPrompt, isSending, onSend }: InputAreaProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    },
    [onSend]
  );

  return (
    <div className="relative">
      <Textarea
        value={prompt}
        onValueChange={setPrompt}
        onKeyDown={handleKeyDown}
        placeholder={'Enter your prompt... (Enter to send, Shift+Enter for new line)\nby. @cha2hyun'}
        minRows={5}
        maxRows={15}
        classNames={{
          base: 'w-full',
          input: 'bg-transparent text-white text-sm placeholder:text-gray-500 focus:outline-none',
          inputWrapper:
            'bg-black/80 backdrop-blur-sm border border-gray-700 hover:border-gray-600 focus-within:border-gray-600 rounded-lg pr-16 !shadow-none data-[focus=true]:!shadow-none group-data-[focus=true]:!shadow-none data-[hover=true]:!bg-black/80 data-[focus=true]:!bg-black/80'
        }}
        disableAnimation
      />

      <Button
        onPress={onSend}
        isDisabled={isSending || !prompt.trim()}
        isLoading={isSending}
        isIconOnly
        className="absolute bottom-3 right-3 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 rounded-lg min-w-0 w-10 h-10"
        spinner={<Spinner size="sm" color="white" />}
      >
        {!isSending && (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        )}
      </Button>
    </div>
  );
}
