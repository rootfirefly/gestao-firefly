import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Documento } from '../../../types';

export async function cadastrarDocumento(dados: Omit<Documento, 'id' | 'dataCriacao' | 'dataAtualizacao'>) {
  const docRef = await addDoc(collection(db, 'documentos'), {
    ...dados,
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  });
  return docRef.id;
}

export async function listarDocumentosVendedor(idVendedor: string): Promise<Documento[]> {
  const documentosRef = collection(db, 'documentos');
  const q = query(documentosRef, where('idVendedor', '==', idVendedor));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    dataCriacao: doc.data().dataCriacao.toDate(),
    dataAtualizacao: doc.data().dataAtualizacao.toDate()
  })) as Documento[];
}

export async function obterDocumento(id: string): Promise<Documento> {
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
}

export async function atualizarDocumento(
  id: string,
  dados: Partial<Omit<Documento, 'id' | 'dataCriacao' | 'dataAtualizacao'>>
): Promise<void> {
  const docRef = doc(db, 'documentos', id);
  await updateDoc(docRef, {
    ...dados,
    dataAtualizacao: new Date()
  });
}