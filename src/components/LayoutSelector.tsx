import React from 'react';
import { RadioGroup, Radio, Chip } from '@heroui/react';
import { LayoutType } from '../hooks/useLocalStorage';

interface LayoutSelectorProps {
  layoutType: LayoutType;
  setLayoutType: (type: LayoutType) => void;
}

export default function LayoutSelector({ layoutType, setLayoutType }: LayoutSelectorProps) {
  return (
    <div className="h-10 flex items-center gap-3 py-2 px-4 bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800">
      <Chip size="md" variant="flat" className="text-gray-500 bg-transparent">
        Layout:
      </Chip>

      <RadioGroup
        orientation="horizontal"
        value={layoutType}
        onValueChange={(value) => setLayoutType(value as LayoutType)}
        size="sm"
        classNames={{
          base: 'p-0',
          wrapper: 'gap-3'
        }}
      >
        <Radio
          value="column"
          classNames={{
            base: 'inline-flex m-0 p-0 items-center',
            wrapper: 'w-4 h-4',
            label: 'text-sm font-medium text-gray-300 ml-1 mr-2'
          }}
        >
          Column
        </Radio>
        <Radio
          value="row"
          classNames={{
            base: 'inline-flex m-0 p-0 items-center',
            wrapper: 'w-4 h-4',
            label: 'text-sm font-medium text-gray-300 ml-1 mr-2'
          }}
        >
          Row
        </Radio>
        <Radio
          value="grid"
          classNames={{
            base: 'inline-flex m-0 p-0 items-center',
            wrapper: 'w-4 h-4',
            label: 'text-sm font-medium text-gray-300 ml-1 mr-2'
          }}
        >
          Grid (2 x 2)
        </Radio>
      </RadioGroup>
    </div>
  );
}
