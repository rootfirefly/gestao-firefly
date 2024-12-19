interface FormData {
  nome: string;
  whatsapp: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export function validarFormulario(data: FormData): string | null {
  if (data.senha.length < 6) {
    return 'A senha deve ter pelo menos 6 caracteres';
  }

  if (data.senha !== data.confirmarSenha) {
    return 'As senhas não coincidem';
  }

  if (!data.whatsapp.replace(/\D/g, '').match(/^\d{11}$/)) {
    return 'WhatsApp inválido';
  }

  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return 'E-mail inválido';
  }

  return null;
}
