import React from 'react';
import { VERSION } from '../../config/version';

export function Footer() {
  return (
    <footer className="py-4 text-center text-sm text-gray-500 border-t border-gray-200 mt-auto">
      <div className="flex flex-col items-center space-y-1">
        <p>
          Criado por{' '}
          <a
            href="https://github.com/rootfirefly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2da44e] hover:text-[#2c974b] transition-colors"
          >
            @rootfirefly
          </a>{' '}
          - Todos direitos reservados
        </p>
        <p className="text-xs text-gray-400">
          Versão {VERSION.full}
        </p>
      </div>
    </footer>
  );
}
