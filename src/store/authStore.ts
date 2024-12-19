import { create } from 'zustand';
import { Usuario } from '../types';

interface AuthStore {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  usuario: null,
  setUsuario: (usuario) => set({ usuario }),
}));
