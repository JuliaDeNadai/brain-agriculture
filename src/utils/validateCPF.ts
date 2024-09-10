export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, ''); 

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; 

  let sum: number = 0;
  let rest: number;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }
  rest = (sum * 10) % 11;
  rest = rest === 10 || rest === 11 ? 0 : rest;
  if (rest !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }
  rest = (sum * 10) % 11;
  rest = rest === 10 || rest === 11 ? 0 : rest;
  return rest === parseInt(cpf.charAt(10));
}