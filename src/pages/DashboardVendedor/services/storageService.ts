import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../lib/firebase';

export async function uploadArquivos(arquivos: File[]): Promise<string[]> {
  const urls: string[] = [];

  for (const arquivo of arquivos) {
    const storageRef = ref(storage, `documentos/${Date.now()}_${arquivo.name}`);
    await uploadBytes(storageRef, arquivo);
    const url = await getDownloadURL(storageRef);
    urls.push(url);
  }

  return urls;
}

export async function uploadComprovante(arquivo: File): Promise<string> {
  const storageRef = ref(storage, `comprovantes/${Date.now()}_${arquivo.name}`);
  await uploadBytes(storageRef, arquivo);
  return getDownloadURL(storageRef);
}
