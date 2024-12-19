import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useAuthStore } from '../store/authStore';
import { Usuario } from '../types';

export function useAuthLoading() {
  const [loading, setLoading] = useState(true);
  const setUsuario = useAuthStore((state) => state.setUsuario);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsuario({
              id: userDoc.id,
              nome: userData.nome,
              email: userData.email,
              telefone: userData.telefone,
              nomeOrganizacao: userData.nomeOrganizacao,
              tipo: userData.tipo,
              ativo: userData.ativo,
              dataCriacao: userData.dataCriacao.toDate(),
              logo: userData.logo,
              avatar: userData.avatar
            } as Usuario);
          }
        } else {
          setUsuario(null);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setUsuario]);

  return loading;
}
