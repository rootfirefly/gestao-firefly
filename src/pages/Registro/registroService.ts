import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';

interface DadosRegistro {
  nome: string;
  whatsapp: string;
  email: string;
  senha: string;
}

export async function registrarUsuario(dados: DadosRegistro) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      dados.email,
      dados.senha
    );

    await setDoc(doc(db, 'usuarios', userCredential.user.uid), {
      nome: dados.nome,
      email: dados.email,
      telefone: dados.whatsapp,
      tipo: 'vendedor',
      idAdmin: null, // Agora usando null ao invés de "null"
      ativo: true,
      dataCriacao: new Date()
    });

    return userCredential.user;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
}
