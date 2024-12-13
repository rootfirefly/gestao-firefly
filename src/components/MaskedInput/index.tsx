import React from 'react';
import InputMask from 'react-input-mask';

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  mask: string;
  icon?: React.ReactNode;
}

export function MaskedInput({ 
  label, 
  mask, 
  icon, 
  className = '', 
  ...props 
}: MaskedInputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <InputMask
          mask={mask}
          {...props}
          className={`
            block w-full rounded-md border-gray-300 shadow-sm
            focus:border-blue-500 focus:ring-blue-500
            ${icon ? 'pl-10' : 'pl-4'}
            ${className}
          `}
        />
      </div>
    </div>
  );
}