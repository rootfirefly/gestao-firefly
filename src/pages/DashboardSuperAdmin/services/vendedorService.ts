import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Usuario } from '../../../types';

export async function listarVendedoresSemAdmin(): Promise<Usuario[]> {
  try {
    const vendedoresRef = collection(db, 'usuarios');
    // Busca vendedores onde idAdmin é "null" ou não existe
    const q = query(
      vendedoresRef,
      where('tipo', '==', 'vendedor'),
      where('idAdmin', 'in', [null, "null"])
    );
    
    const snapshot = await getDocs(q);
    const vendedores = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      dataCriacao: doc.data().dataCriacao.toDate()
    })) as Usuario[];
    
    return vendedores;
  } catch (error) {
    console.error('Erro ao listar vendedores:', error);
    throw error;
  }
}

export async function associarVendedorAdmin(vendedorId: string, adminId: string): Promise<void> {
  try {
    const vendedorRef = doc(db, 'usuarios', vendedorId);
    await updateDoc(vendedorRef, {
      idAdmin: adminId,
      dataAssociacao: new Date()
    });
  } catch (error) {
    console.error('Erro ao associar vendedor:', error);
    throw error;
  }
}
