import { doc, updateDoc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Documento } from '../../../types';

export async function listarDocumentos(idAdmin: string): Promise<(Documento & { nomeVendedor: string })[]> {
  try {
    // Primeiro, busca os vendedores deste admin
    const vendedoresRef = collection(db, 'usuarios');
    const vendedoresQuery = query(
      vendedoresRef,
      where('tipo', '==', 'vendedor'),
      where('idAdmin', '==', idAdmin)
    );
    const vendedoresSnapshot = await getDocs(vendedoresQuery);
    
    // Se não houver vendedores, retorna array vazio
    if (vendedoresSnapshot.empty) {
      return [];
    }

    const idsVendedores = vendedoresSnapshot.docs.map(doc => doc.id);

    // Busca os documentos desses vendedores
    const documentosRef = collection(db, 'documentos');
    const q = query(documentosRef, where('idVendedor', 'in', idsVendedores));
    const snapshot = await getDocs(q);
    
    const documentos = await Promise.all(
      snapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        const vendedorRef = doc(db, 'usuarios', data.idVendedor);
        const vendedorDoc = await getDoc(vendedorRef);
        const vendedorData = vendedorDoc.data();
        
        return {
          id: docSnapshot.id,
          ...data,
          nomeVendedor: vendedorData?.nome || 'Vendedor não encontrado',
          dataCriacao: data.dataCriacao.toDate(),
          dataAtualizacao: data.dataAtualizacao.toDate()
        };
      })
    );

    return documentos as (Documento & { nomeVendedor: string })[];
  } catch (error) {
    console.error('Erro ao listar documentos:', error);
    throw error;
  }
}

export async function atualizarStatusDocumento(
  documentoId: string,
  novoStatus: Documento['status']
): Promise<void> {
  try {
    const documentoRef = doc(db, 'documentos', documentoId);
    await updateDoc(documentoRef, {
      status: novoStatus,
      dataAtualizacao: new Date()
    });
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    throw error;
  }
}
