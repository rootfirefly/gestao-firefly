import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const SUPER_ADMIN_CONFIG = {
  email: 'super@admin.com',
  senha: 'superadmin123',
  nome: 'Super Administrador',
  nomeOrganizacao: 'Sistema Principal',
  telefone: '(11) 99999-9999',
  tipo: 'super_admin',
  ativo: true
};

export async function configurarSuperAdmin() {
  try {
    // Verifica se já existe um super admin
    const usersRef = collection(db, 'usuarios');
    const q = query(usersRef, where('tipo', '==', 'super_admin'));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      // Cria o usuário no Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        SUPER_ADMIN_CONFIG.email,
        SUPER_ADMIN_CONFIG.senha
      );

      // Cria o documento do super admin no Firestore
      await setDoc(doc(db, 'usuarios', userCredential.user.uid), {
        nome: SUPER_ADMIN_CONFIG.nome,
        email: SUPER_ADMIN_CONFIG.email,
        nomeOrganizacao: SUPER_ADMIN_CONFIG.nomeOrganizacao,
        telefone: SUPER_ADMIN_CONFIG.telefone,
        tipo: SUPER_ADMIN_CONFIG.tipo,
        ativo: SUPER_ADMIN_CONFIG.ativo,
        dataCriacao: new Date()
      });

      console.log('Super Admin configurado com sucesso!');
      return true;
    }
    
    console.log('Super Admin já existe');
    return false;
  } catch (error) {
    console.error('Erro ao configurar Super Admin:', error);
    throw error;
  }
}
