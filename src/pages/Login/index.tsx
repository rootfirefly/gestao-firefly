import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { Lock, Mail } from 'lucide-react';
import { auth, db } from '../../lib/firebase';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { configurarSuperAdmin } from '../../config/setupSuperAdmin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUsuario = useAuthStore((state) => state.setUsuario);

  useEffect(() => {
    configurarSuperAdmin().catch(console.error);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const userDoc = await getDoc(doc(db, 'usuarios', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        if (!userData.ativo && userData.tipo !== 'super_admin') {
          toast.error('Usuário desativado. Entre em contato com o administrador.');
          return;
        }

        setUsuario({
          id: userDoc.id,
          nome: userData.nome,
          email: userData.email,
          telefone: userData.telefone,
          nomeOrganizacao: userData.nomeOrganizacao,
          tipo: userData.tipo,
          ativo: userData.ativo,
          dataCriacao: userData.dataCriacao.toDate()
        });
        
        const redirectMap = {
          super_admin: '/super-admin',
          admin: '/admin',
          vendedor: '/vendedor'
        };

        navigate(redirectMap[userData.tipo]);
        toast.success('Login realizado com sucesso!');
      }
    } catch (error) {
      toast.error('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Gestão FireFly
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sistema de Gestão de Documentos
        </p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-5 h-5 text-gray-500" />}
            required
          />

          <Input
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            icon={<Lock className="w-5 h-5 text-gray-500" />}
            required
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Entrar
          </Button>

          <p className="text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <button
              type="button"
              onClick={() => navigate('/registro')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Cadastre-se aqui
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
