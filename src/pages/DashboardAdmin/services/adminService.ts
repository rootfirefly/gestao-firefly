import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';
import { Usuario } from '../../../types';

interface DadosAtualizacao {
  nome?: string;
  nomeOrganizacao?: string;
  logo?: string;
  avatar?: string;
}

export async function atualizarPerfilAdmin(id: string, dados: DadosAtualizacao): Promise<void> {
  try {
    const adminRef = doc(db, 'usuarios', id);
    await updateDoc(adminRef, dados);
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    throw error;
  }
}

export async function uploadImagem(file: File, tipo: 'logo' | 'avatar', adminId: string): Promise<string> {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('O arquivo deve ser uma imagem');
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('A imagem deve ter no máximo 5MB');
    }

    const storageRef = ref(storage, `${tipo}s/${adminId}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw error;
  }
}

export async function obterPerfilAdmin(id: string): Promise<Usuario> {
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
    console.error('Erro ao obter perfil:', error);
    throw error;
  }
}
