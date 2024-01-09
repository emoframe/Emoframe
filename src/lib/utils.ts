import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(value: string): string {
  //React.ChangeEvent<HTMLInputElement>
  console.log(value)
  if (!value) return value;

  const onlyNums: string = value.replace(/[^\d]/g, '');
  let newValue = onlyNums;

  if (onlyNums.length > 2)
    newValue = `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 6)}`;

  if (onlyNums.length > 6) newValue += `-${onlyNums.slice(6)}`;

  if (onlyNums.length > 10) newValue = `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7)}`;

  if (newValue.length > 7) return newValue.slice(0, 15);

  return newValue;
}

type Valuable<T> = { [K in keyof T as T[K] extends null | undefined ? never : K]: T[K] };

export function getValuable<
  T extends {},
  V = Valuable<T>,
>(obj: T): V {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, v]) =>
        !(
          (typeof v === 'string' && !v.length) ||
          v === null ||
          typeof v === 'undefined'
        ),
    ),
  ) as V;
}

export function createQueryString(name: string, value: string): string {
  const params = new URLSearchParams();
  params.set(name, value);

  return params.toString();
};

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function groupBy(arr, property) {
  // Utiliza o método reduce para iterar sobre o array e acumular o resultado
  return arr.reduce((acc, cur) => {
    
    // Utiliza a propriedade fornecida para acessar o valor correspondente no elemento atual
    // Cria uma entrada no objeto de acumulador (acc) com a chave sendo o valor da propriedade
    // Se a chave já existe, adiciona o elemento atual ao array existente, senão cria um novo array
    acc[cur[property]] = [...acc[cur[property]] || [], cur];
    
    // Retorna o objeto acumulador atualizado para a próxima iteração
    return acc;
  }, {}); // O objeto inicial para acumulação é um objeto vazio
}