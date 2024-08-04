import { Template, Option } from "@/types/forms";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(value: string): string {
  //React.ChangeEvent<HTMLInputElement>
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

export function chunk<T>(arr: T[], batchSize: number): T[][] {
  // Utiliza o método reduce no array de entrada (arr)
  return arr.reduce((batches, curr, i) => {
      // Verifica se o índice atual (i) é divisível pelo tamanho do lote (batchSize)
      if (i % batchSize === 0) {
          // Se for divisível, adiciona um novo array vazio ao array de lotes (batches)
          batches.push([]);
      }
      // Adiciona o elemento atual (curr) ao último lote (batch) no array de lotes
      batches[batches.length - 1].push(arr[i]);
      // Retorna os lotes atualizados
      return batches;
  }, [] as T[][]); // Inicializa o array de lotes com um array vazio
}

export function randomizeArray(array: any[]): any[] {
  return array.sort(() => Math.random() - 0.5);
}

export function idGenerator(): string {
  return Math.floor(Math.random() * 10001).toString();
}

export function convertTemplatesToOptions(templates: Template[]): Option[] {
  return templates.map(template => ({
      label: template.title,
      value: template.uid! // uid não pode ser undefined
  }));
};

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear();
}

// Função para transformar texto em negrito usando caracteres Unicode
export function boldify(text: string) {
  const boldMap = {
    'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺',
    'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
    'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠',
    'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵', ' ': ' ',
    'á': '𝗮́', 'é': '𝗲́', 'í': '𝗶́', 'ó': '𝗼́', 'ú': '𝘂́', 'ã': '𝗮̃', 'õ': '𝗼̃', 'â': '𝗮̂', 'ê': '𝗲̂', 'î': '𝗶̂', 'ô': '𝗼̂', 'û': '𝘂̂',
    'à': '𝗮̀', 'è': '𝗲̀', 'ì': '𝗶̀', 'ò': '𝗼̀', 'ù': '𝘂̀', 'ä': '𝗮̈', 'ë': '𝗲̈', 'ï': '𝗶̈', 'ö': '𝗼̈', 'ü': '𝘂̈', 'ç': '𝗰̧',
    'Á': '𝗔́', 'É': '𝗘́', 'Í': '𝗜́', 'Ó': '𝗢́', 'Ú': '𝗨́', 'Ã': '𝗔̃', 'Õ': '𝗢̃', 'Â': '𝗔̂', 'Ê': '𝗘̂', 'Î': '𝗜̂', 'Ô': '𝗢̂', 'Û': '𝗨̂',
    'À': '𝗔̀', 'È': '𝗘̀', 'Ì': '𝗜̀', 'Ò': '𝗢̀', 'Ù': '𝗨̀', 'Ä': '𝗔̈', 'Ë': '𝗘̈', 'Ï': '𝗜̈', 'Ö': '𝗢̈', 'Ü': '𝗨̈', 'Ç': '𝗖̧'
  };
  return text.split('').map(c => boldMap[c] || c).join('');
};

export function convertTimestampToDate(obj: any, keys: string[]) {
  Object.keys(obj).forEach(key => {
    if (keys.includes(key) && obj[key].toDate) {
      obj[key] = obj[key].toDate();
    }
  });
  return obj;
};