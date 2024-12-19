import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Documento } from '../../../types';

export async function cadastrarDocumento(dados: Omit<Documento, 'id' | 'dataCriacao' | 'dataAtualizacao'>) {
  try {
    const docRef = await addDoc(collection(db, 'documentos'), {
      ...dados,
      dataCriacao: new Date(),
      dataAtualizacao: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Erro ao cadastrar documento:', error);
    throw error;
  }
}

export async function listarDocumentosVendedor(idVendedor: string): Promise<Documento[]> {
  try {
    const documentosRef = collection(db, 'documentos');
    const q = query(documentosRef, where('idVendedor', '==', idVendedor));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      dataCriacao: doc.data().dataCriacao.toDate(),
      dataAtualizacao: doc.data().dataAtualizacao.toDate()
    })) as Documento[];
  } catch (error) {
    console.error('Erro ao listar documentos:', error);
    throw error;
  }
}

export async function obterDocumento(id: string): Promise<Documento> {
  try {
    const docRef = doc(db, 'documentos', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Documento não encontrado');
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
      dataCriacao: docSnap.data().dataCriacao.toDate(),
      dataAtualizacao: docSnap.data().dataAtualizacao.toDate()
    } as Documento;
  } catch (error) {
    console.error('Erro ao obter documento:', error);
    throw error;
  }
}

export async function atualizarDocumento(
  id: string,
  dados: Partial<Omit<Documento, 'id' | 'dataCriacao' | 'dataAtualizacao'>>
): Promise<void> {
  try {
    const docRef = doc(db, 'documentos', id);
    await updateDoc(docRef, {
      ...dados,
      dataAtualizacao: new Date()
    });
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    throw error;
  }
}

export async function excluirDocumento(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'documentos', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    throw error;
  }
}
