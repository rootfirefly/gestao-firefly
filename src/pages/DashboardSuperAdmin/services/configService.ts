import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

interface ConfiguracaoAsaas {
  apiKey: string;
  ambiente: 'sandbox' | 'producao';
  dataAtualizacao?: Date;
}

const CONFIG_DOC_ID = 'asaas_config';

export async function salvarConfiguracaoAsaas(config: ConfiguracaoAsaas): Promise<void> {
  try {
    const configRef = doc(db, 'configuracoes', CONFIG_DOC_ID);
    await setDoc(configRef, {
      ...config,
      dataAtualizacao: new Date()
    });
  } catch (error) {
    console.error('Erro ao salvar configuração Asaas:', error);
    throw error;
  }
}

export async function obterConfiguracaoAsaas(): Promise<ConfiguracaoAsaas | null> {
  try {
    const configRef = doc(db, 'configuracoes', CONFIG_DOC_ID);
    const configDoc = await getDoc(configRef);
    
    if (configDoc.exists()) {
      const data = configDoc.data();
      return {
        apiKey: data.apiKey,
        ambiente: data.ambiente,
        dataAtualizacao: data.dataAtualizacao?.toDate()
      };
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao obter configuração Asaas:', error);
    throw error;
  }
}
