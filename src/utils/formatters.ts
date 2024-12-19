export function formatarTelefone(telefone: string): string {
  // Remove todos os caracteres não numéricos
  const numeros = telefone.replace(/\D/g, '');
  
  // Aplica a máscara (XX) XXXXX-XXXX
  if (numeros.length === 11) {
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  // Retorna o número original se não tiver o formato esperado
  return telefone;
}
