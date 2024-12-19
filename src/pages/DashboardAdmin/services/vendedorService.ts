import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';
import { Usuario } from '../../../types';

interface DadosVendedor {
  nome: string;
  telefone: string;
  email: string;
  senha: string;
}

export async function cadastrarVendedor(dados: DadosVendedor, idAdmin: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      dados.email,
      dados.senha
    );

    await setDoc(doc(db, 'usuarios', userCredential.user.uid), {
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      tipo: 'vendedor',
      idAdmin: idAdmin, // Vincula o vendedor ao admin
      ativo: true,
      dataCriacao: new Date()
    });

    return userCredential.user;
  } catch (error) {
    console.error('Erro ao cadastrar vendedor:', error);
    throw error;
  }
}

export async function listarVendedores(idAdmin: string): Promise<Usuario[]> {
  try {
    const vendedoresRef = collection(db, 'usuarios');
    const q = query(
      vendedoresRef, 
      where('tipo', '==', 'vendedor'),
      where('idAdmin', '==', idAdmin)
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      dataCriacao: doc.data().dataCriacao.toDate()
    })) as Usuario[];
  } catch (error) {
    console.error('Erro ao listar vendedores:', error);
    throw error;
  }
}

export async function alterarStatusVendedor(id: string, novoStatus: boolean): Promise<void> {
  try {
    const vendedorRef = doc(db, 'usuarios', id);
    await updateDoc(vendedorRef, {
      ativo: novoStatus
    });
  } catch (error) {
    console.error('Erro ao alterar status do vendedor:', error);
    throw error;
  }
}
