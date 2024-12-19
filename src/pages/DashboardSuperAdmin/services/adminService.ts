import { createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';
import { Usuario } from '../../../types';

interface DadosAdmin {
  nome: string;
  nomeOrganizacao: string;
  telefone: string;
  email: string;
  senha: string;
}

function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'Este e-mail já está em uso. Por favor, use outro e-mail.';
    case AuthErrorCodes.WEAK_PASSWORD:
      return 'A senha é muito fraca. Use pelo menos 6 caracteres com letras e números.';
    case AuthErrorCodes.INVALID_EMAIL:
      return 'O e-mail informado é inválido. Por favor, verifique.';
    default:
      return 'Ocorreu um erro ao cadastrar o administrador. Tente novamente.';
  }
}

export async function cadastrarAdmin(dados: DadosAdmin) {
  try {
    // Verifica se já existe um usuário com este e-mail
    const usersRef = collection(db, 'usuarios');
    const q = query(usersRef, where('email', '==', dados.email));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      throw new Error('Este e-mail já está em uso. Por favor, use outro e-mail.');
    }

    // Validações adicionais
    if (dados.senha.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres.');
    }

    if (!dados.email.includes('@')) {
      throw new Error('Por favor, insira um e-mail válido.');
    }

    if (!dados.telefone.replace(/\D/g, '').match(/^\d{10,11}$/)) {
      throw new Error('Por favor, insira um número de telefone válido.');
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      dados.email,
      dados.senha
    );

    await setDoc(doc(db, 'usuarios', userCredential.user.uid), {
      nome: dados.nome,
      nomeOrganizacao: dados.nomeOrganizacao,
      email: dados.email,
      telefone: dados.telefone,
      tipo: 'admin',
      ativo: true,
      dataCriacao: new Date()
    });

    return userCredential.user;
  } catch (error: any) {
    // Trata erros específicos do Firebase Auth
    if (error?.code) {
      throw new Error(getAuthErrorMessage(error.code));
    }
    // Se for um erro personalizado nosso, repassa a mensagem
    if (error?.message) {
      throw error;
    }
    // Para outros tipos de erro, usa mensagem genérica
    throw new Error('Ocorreu um erro ao cadastrar o administrador. Tente novamente.');
  }
}

export async function listarAdmins(): Promise<Usuario[]> {
  try {
    const adminsRef = collection(db, 'usuarios');
    const q = query(adminsRef, where('tipo', '==', 'admin'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      dataCriacao: doc.data().dataCriacao.toDate()
    })) as Usuario[];
  } catch (error) {
    console.error('Erro ao listar administradores:', error);
    throw error;
  }
}

export async function obterAdmin(id: string): Promise<Usuario> {
  try {
    const adminRef = doc(db, 'usuarios', id);
    const adminDoc = await getDoc(adminRef);
    
    if (!adminDoc.exists()) {
      throw new Error('Administrador não encontrado');
    }

    return {
      id: adminDoc.id,
      ...adminDoc.data(),
      dataCriacao: adminDoc.data().dataCriacao.toDate()
    } as Usuario;
  } catch (error) {
    console.error('Erro ao obter administrador:', error);
    throw error;
  }
}

export async function atualizarAdmin(id: string, dados: Partial<DadosAdmin>): Promise<void> {
  try {
    const adminRef = doc(db, 'usuarios', id);
    const dadosAtualizacao: any = {
      nome: dados.nome,
      nomeOrganizacao: dados.nomeOrganizacao,
      telefone: dados.telefone,
      email: dados.email
    };

    // Só atualiza a senha se uma nova senha foi fornecida
    if (dados.senha) {
      if (dados.senha.length < 6) {
        throw new Error('A senha deve ter pelo menos 6 caracteres.');
      }
      // Aqui você pode adicionar a lógica para atualizar a senha no Authentication
      // Por enquanto, vamos apenas atualizar os outros dados
    }

    await updateDoc(adminRef, dadosAtualizacao);
  } catch (error) {
    console.error('Erro ao atualizar administrador:', error);
    throw error;
  }
}

export async function alterarStatusAdmin(id: string, novoStatus: boolean): Promise<void> {
  try {
    const adminRef = doc(db, 'usuarios', id);
    await updateDoc(adminRef, {
      ativo: novoStatus
    });
  } catch (error) {
    console.error('Erro ao alterar status do administrador:', error);
    throw error;
  }
}
