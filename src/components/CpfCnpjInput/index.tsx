import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { MaskedInput } from '../MaskedInput';

interface CpfCnpjInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

export function CpfCnpjInput({ 
  label, 
  name, 
  value, 
  onChange, 
  required, 
  className = '' 
}: CpfCnpjInputProps) {
  const [tipo, setTipo] = useState<'cpf' | 'cnpj'>('cpf');
  
  const handleTipoChange = (novoTipo: 'cpf' | 'cnpj') => {
    setTipo(novoTipo);
    // Limpa o valor quando muda o tipo
    const event = {
      target: {
        name,
        value: ''
      }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-4 mb-2">
        <label className="text-sm font-medium text-gray-700">Tipo de Documento:</label>
        <div className="flex rounded-md shadow-sm">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
              tipo === 'cpf'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => handleTipoChange('cpf')}
          >
            CPF
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
              tipo === 'cnpj'
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => handleTipoChange('cnpj')}
          >
            CNPJ
          </button>
        </div>
      </div>

      <MaskedInput
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        mask={tipo === 'cpf' ? '999.999.999-99' : '99.999.999/9999-99'}
        required={required}
        className={className}
        icon={<FileText className="w-5 h-5 text-gray-500" />}
        placeholder={tipo === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00'}
      />
    </div>
  );
}
