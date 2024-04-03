import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
// Class imports
import { 
  PanasClass, 
  SamClass, 
  SusClass, 
  EazClass, 
  BrumsClass, 
  GdsClass,
  LeapClass
} from '@/types/forms';

// Interface imports
import { 
  Panas, 
  Sam, 
  Sus, 
  Eaz, 
  Brums, 
  Gds,
  Leap,
} from '@/types/forms';

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

export function differentiateKeysFromObjects(keepObject: Object, changeObject: Object, suffixKey: string): void {
  Object.keys(changeObject).forEach((changeObjectKey) => {
    Object.keys(keepObject).forEach((keepObjectKey) => {
      if(keepObjectKey === changeObjectKey) {
        Object.defineProperty(changeObject, changeObjectKey + suffixKey, Object.getOwnPropertyDescriptor(changeObject, changeObjectKey));
      }
    })
  })
}

export function convertStringToDate(dateString: string): number {
  let date = dateString.split('/').map(data => Number(data));
  date[0] *= 365 * 24 * 60 * 60;
  date[1] *= 30 * 24 * 60 * 60;
  date[2] *= 24 * 60 * 60;


  return date.reduce((acc, val) => (acc + val));
}

export function getKeysFromInterface(currentInterface: string): Array<string> | void {
  switch(currentInterface){
    case 'panas':
      return Object.keys(new PanasClass()) as Array<keyof Panas>;
    case 'sam':
      return Object.keys(new SamClass()) as Array<keyof Sam>;
    case 'sus':
      return Object.keys(new SusClass()) as Array<keyof Sus>;
    case 'eaz':
      return Object.keys(new EazClass()) as Array<keyof Eaz>;
    case 'leap':
      return Object.keys(new LeapClass()) as Array<keyof Leap>;
    case 'brums':
      return Object.keys(new BrumsClass()) as Array<keyof Brums>;
    case 'gds':
      return Object.keys(new GdsClass()) as Array<keyof Gds>;
  }
}

export function formatFormDataToChart(formData: Object, formInterface: Array<string>): formatData {
  const arrayData = Object.entries(formData) as [string, string][]

  let textFields: Array<Array<string>> = []

  // Moving all text fields to another array
  arrayData.forEach((value, index) => {
    let spliceCount = 0
    if (!/^[\d]+$/.test(value[1])){ 
      textFields.push(value)
      arrayData.splice(index - spliceCount, 1);
      spliceCount++;
    }
  })


  const newArrayData: Array<Array<string | number | Object>> = arrayData.map((value) => ([value[0], Number(value[1]), formInterface.indexOf(value[0])]));

  newArrayData.sort((a, b) => Number(a[2]) - Number(b[2]));
  const finalArrayData = newArrayData.map((value) => [...value.slice(0, 2)]);
    
  return {textFields: textFields, arrayData: finalArrayData};
}