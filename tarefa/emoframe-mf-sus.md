# 🧩 emoframe-mf-sus — Micro Frontend do Instrumento SUS

## 1. Contexto e Objetivo

O **EmoFrame** é uma plataforma de pesquisa acadêmica (Next.js 14 + Firebase) para avaliação de Usabilidade, UX e Respostas Emocionais. Pesquisadores (Specialist) criam avaliações com instrumentos validados (SUS, SAM, PANAS, etc.) e respondentes (User) preenchem os formulários.

### SUS hoje (legado)

O SUS é um componente React monolítico em `src/components/form/instrument/SusForm.tsx` que:
- Usa `react-hook-form` + `zod` para validação
- Renderiza 10 questões Likert (1–5) definidas em `src/types/forms.tsx` (`susQuestions`)
- Salva respostas via `saveAnswer(values, evaluationId, userId)` em `src/lib/firebase.ts`
- É renderizado por um `switch/case` em `src/app/(authenticated)/user/evaluations/fill/page.tsx` (linha 34)

### Objetivo desta tarefa

Criar um **micro frontend Web Component** (`emoframe-mf-sus`) em repositório separado e integrá-lo ao Next.js via **Strangler Fig Pattern**: a opção `"SUS MF"` coexiste com o `"SUS"` legado no seletor de instrumentos.

---

## 2. Arquitetura Adotada

| Decisão | Justificativa |
|---------|--------------|
| **React + TypeScript + Vite** (build lib ES Module) | Mesmo ecossistema do EmoFrame, build rápido |
| **Web Components** via `customElements.define` | Agnóstico de framework, sem Module Federation |
| **Comunicação via atributos HTML** | `evaluation-id`, `user-id` passados como atributos |
| **Custom Event `sus-completed`** | `composed: true, bubbles: true` para atravessar Shadow DOM |
| **Persistência no Host** | O MF **não** acessa Firebase; apenas emite `{ answers, score }` |
| **Strangler Fig** | `"sus"` (legado) e `"sus_mf"` (novo) coexistem até migração completa |

### Contrato do Custom Event

```typescript
// Evento disparado pelo MF quando o usuário finaliza
interface SusCompletedDetail {
  answers: {
    use_frequency: string;  // "1" a "5"
    use_complex: string;
    use_easy: string;
    need_help: string;
    function_integration: string;
    inconsistency: string;
    learning_curve: string;
    jumbled: string;
    confidence: string;
    learn_system: string;
  };
  score: number; // 0–100, calculado pelo MF
}

// Disparo:
this.dispatchEvent(new CustomEvent<SusCompletedDetail>('sus-completed', {
  detail: { answers, score },
  bubbles: true,
  composed: true,
}));
```

---

## 3. Estrutura do Repositório `emoframe-mf-sus`

```
emoframe-mf-sus/
├── index.html              # Página de dev/teste local
├── package.json
├── tsconfig.json
├── vite.config.ts          # Build de biblioteca (ES Module)
├── src/
│   ├── main.tsx            # Entry: registra o Custom Element
│   ├── SusFormElement.tsx   # Wrapper Web Component (classe HTMLElement)
│   ├── SusFormApp.tsx       # Componente React principal (UI do SUS)
│   ├── calcularScoreSus.ts # Função pura de cálculo do score
│   ├── tipos.ts            # Interfaces (SusRespostas, SusQuestion, etc.)
│   ├── perguntas.ts        # Array das 10 questões SUS
│   └── estilos.css         # Estilos do formulário
```

---

## 4. Passo a Passo de Criação do Repositório MF

### 4.1 Scaffold

```bash
mkdir emoframe-mf-sus && cd emoframe-mf-sus
npm create vite@latest ./ -- --template react-ts
npm install
```

### 4.2 `vite.config.ts`

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.tsx',
      formats: ['es'],
      fileName: () => 'sus-form.js',
    },
    rollupOptions: {
      // React é bundled junto (o MF é autocontido)
    },
  },
  server: {
    port: 5173,
    cors: true, // Permite que o Next.js (porta 3000) carregue o script
  },
});
```

### 4.3 `src/tipos.ts`

```typescript
export interface SusRespostas {
  use_frequency: string;
  use_complex: string;
  use_easy: string;
  need_help: string;
  function_integration: string;
  inconsistency: string;
  learning_curve: string;
  jumbled: string;
  confidence: string;
  learn_system: string;
}

export interface SusQuestion {
  index: number;
  field: keyof SusRespostas;
  label: string;
}
```

### 4.4 `src/perguntas.ts`

```typescript
import { SusQuestion } from './tipos';

// Texto em PT-BR hardcoded (sem i18n no MF por enquanto)
export const susPerguntas: SusQuestion[] = [
  { index: 1,  field: 'use_frequency',       label: 'Eu acho que gostaria de usar esse sistema com frequência.' },
  { index: 2,  field: 'use_complex',          label: 'Eu acho o sistema desnecessariamente complexo.' },
  { index: 3,  field: 'use_easy',             label: 'Eu achei o sistema fácil de usar.' },
  { index: 4,  field: 'need_help',            label: 'Eu acho que precisaria de ajuda de uma pessoa com conhecimentos técnicos para usar o sistema.' },
  { index: 5,  field: 'function_integration', label: 'Eu acho que as várias funções do sistema estão muito bem integradas.' },
  { index: 6,  field: 'inconsistency',        label: 'Eu acho que o sistema apresenta muita inconsistência.' },
  { index: 7,  field: 'learning_curve',       label: 'Eu imagino que as pessoas aprenderão como usar esse sistema rapidamente.' },
  { index: 8,  field: 'jumbled',              label: 'Eu achei o sistema atrapalhado de usar.' },
  { index: 9,  field: 'confidence',           label: 'Eu me senti confiante ao usar o sistema.' },
  { index: 10, field: 'learn_system',         label: 'Eu precisei aprender várias coisas novas antes de conseguir usar o sistema.' },
];
```

### 4.5 `src/calcularScoreSus.ts`

```typescript
import { SusRespostas } from './tipos';
import { susPerguntas } from './perguntas';

/**
 * Cálculo oficial do SUS Score:
 * - Questões ímpares (1,3,5,7,9): X = soma - 5
 * - Questões pares (2,4,6,8,10): Y = 25 - soma
 * - Score = (X + Y) * 2.5
 */
export function calcularScoreSus(respostas: SusRespostas): number {
  const impares = susPerguntas
    .filter(q => q.index % 2 !== 0)
    .map(q => parseInt(respostas[q.field], 10));

  const pares = susPerguntas
    .filter(q => q.index % 2 === 0)
    .map(q => parseInt(respostas[q.field], 10));

  const X = impares.reduce((s, v) => s + v, 0) - 5;
  const Y = 25 - pares.reduce((s, v) => s + v, 0);

  return (X + Y) * 2.5;
}
```

### 4.6 `src/SusFormApp.tsx`

```tsx
import React, { useState } from 'react';
import { SusRespostas } from './tipos';
import { susPerguntas } from './perguntas';
import { calcularScoreSus } from './calcularScoreSus';
import './estilos.css';

const opcoes = [
  { value: '1', label: 'Discordo totalmente' },
  { value: '2', label: 'Discordo' },
  { value: '3', label: 'Neutro' },
  { value: '4', label: 'Concordo' },
  { value: '5', label: 'Concordo totalmente' },
];

const valoresIniciais: SusRespostas = {
  use_frequency: '', use_complex: '', use_easy: '', need_help: '',
  function_integration: '', inconsistency: '', learning_curve: '',
  jumbled: '', confidence: '', learn_system: '',
};

interface Props {
  evaluationId: string;
  userId: string;
  onCompleted: (detail: { answers: SusRespostas; score: number }) => void;
}

export default function SusFormApp({ evaluationId, userId, onCompleted }: Props) {
  const [respostas, setRespostas] = useState<SusRespostas>({ ...valoresIniciais });
  const [erros, setErros] = useState<Partial<Record<keyof SusRespostas, string>>>({});

  const handleChange = (field: keyof SusRespostas, value: string) => {
    setRespostas(prev => ({ ...prev, [field]: value }));
    setErros(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validação
    const novosErros: typeof erros = {};
    susPerguntas.forEach(q => {
      if (!respostas[q.field]) novosErros[q.field] = 'Escolha uma opção';
    });
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }
    const score = calcularScoreSus(respostas);
    onCompleted({ answers: respostas, score });
  };

  const handleReset = () => {
    setRespostas({ ...valoresIniciais });
    setErros({});
  };

  return (
    <form onSubmit={handleSubmit} className="sus-mf-form">
      <h1 className="sus-mf-titulo">SUS — Questionário de Usabilidade</h1>
      {susPerguntas.map(q => (
        <fieldset key={q.field} className="sus-mf-questao">
          <legend><strong>{q.index}. {q.label}</strong></legend>
          <div className="sus-mf-opcoes">
            {opcoes.map(op => (
              <label key={op.value} className="sus-mf-opcao">
                <input
                  type="radio"
                  name={q.field}
                  value={op.value}
                  checked={respostas[q.field] === op.value}
                  onChange={() => handleChange(q.field, op.value)}
                />
                <span>{op.label}</span>
              </label>
            ))}
          </div>
          {erros[q.field] && <p className="sus-mf-erro">{erros[q.field]}</p>}
        </fieldset>
      ))}
      <div className="sus-mf-acoes">
        <button type="button" onClick={handleReset}>Limpar</button>
        <button type="submit">Finalizar</button>
      </div>
    </form>
  );
}
```

### 4.7 `src/SusFormElement.tsx` — Web Component Wrapper

```tsx
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import SusFormApp from './SusFormApp';
import { SusRespostas } from './tipos';

class SusFormElement extends HTMLElement {
  private root: Root | null = null;
  private mountPoint: HTMLDivElement | null = null;

  static get observedAttributes() {
    return ['evaluation-id', 'user-id'];
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    this.root = createRoot(this.mountPoint);
    this.renderReact();
  }

  attributeChangedCallback() {
    this.renderReact();
  }

  disconnectedCallback() {
    this.root?.unmount();
  }

  private renderReact() {
    if (!this.root) return;
    const evaluationId = this.getAttribute('evaluation-id') || '';
    const userId = this.getAttribute('user-id') || '';

    this.root.render(
      <SusFormApp
        evaluationId={evaluationId}
        userId={userId}
        onCompleted={(detail) => {
          this.dispatchEvent(
            new CustomEvent<{ answers: SusRespostas; score: number }>(
              'sus-completed',
              { detail, bubbles: true, composed: true }
            )
          );
        }}
      />
    );
  }
}

export default SusFormElement;
```

### 4.8 `src/main.tsx` — Entry Point

```tsx
import SusFormElement from './SusFormElement';

if (!customElements.get('sus-form')) {
  customElements.define('sus-form', SusFormElement);
}
```

### 4.9 `src/estilos.css` (mínimo funcional)

```css
.sus-mf-form { max-width: 720px; margin: 0 auto; font-family: Inter, sans-serif; display: flex; flex-direction: column; gap: 1.5rem; padding: 2rem; }
.sus-mf-titulo { font-size: 1.75rem; font-weight: 700; text-align: center; }
.sus-mf-questao { border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem 1.25rem; }
.sus-mf-questao legend { font-size: 1rem; margin-bottom: 0.75rem; }
.sus-mf-opcoes { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: space-between; }
.sus-mf-opcao { display: flex; align-items: center; gap: 0.35rem; cursor: pointer; }
.sus-mf-erro { color: #e53e3e; font-size: 0.875rem; margin-top: 0.5rem; }
.sus-mf-acoes { display: flex; justify-content: space-around; gap: 1rem; margin-top: 1rem; }
.sus-mf-acoes button { padding: 0.75rem 2rem; border-radius: 6px; font-weight: 600; cursor: pointer; border: none; }
.sus-mf-acoes button[type="submit"] { background: #4f46e5; color: white; }
.sus-mf-acoes button[type="button"] { background: #e2e8f0; }
```

### 4.10 `index.html` (dev/teste)

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8" /><title>SUS MF Dev</title></head>
<body>
  <sus-form evaluation-id="test-123" user-id="user-456"></sus-form>
  <script type="module" src="/src/main.tsx"></script>
  <script>
    document.querySelector('sus-form')
      .addEventListener('sus-completed', e => {
        console.log('SUS completado:', e.detail);
        alert(`Score: ${e.detail.score}`);
      });
  </script>
</body>
</html>
```

### 4.11 Scripts no `package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

---

## 5. Integração no `emoframe-frontend` (Next.js)

### 5.1 Variável de ambiente

Adicione ao `.env.local`:

```env
NEXT_PUBLIC_MF_SUS_URL=http://localhost:5173/sus-form.js
```

### 5.2 Criar `SusFormMF.tsx`

Caminho: `src/components/form/instrument/SusFormMF.tsx`

```tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { saveAnswer } from '@/lib/firebase';
import { useToast } from '@/components/ui/use-toast';
import { FillEvaluationForm } from '@/types/forms';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sus-form': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'evaluation-id'?: string;
          'user-id'?: string;
        },
        HTMLElement
      >;
    }
  }
}

const SusFormMF = (params: FillEvaluationForm) => {
  const ref = useRef<HTMLElement>(null);
  const { push } = useRouter();
  const { toast } = useToast();

  // Carrega o script do MF dinamicamente
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_MF_SUS_URL;
    if (!url) return;

    const existe = document.querySelector(`script[src="${url}"]`);
    if (!existe) {
      const script = document.createElement('script');
      script.src = url;
      script.type = 'module';
      document.head.appendChild(script);
    }
  }, []);

  // Escuta o Custom Event
  useEffect(() => {
    const el = ref.current;
    if (!el || 'isViewable' in params) return;

    const handler = async (e: Event) => {
      const { answers, score } = (e as CustomEvent).detail;
      try {
        await saveAnswer(answers, params.evaluationId, params.userId);
        toast({
          title: 'Avaliação enviada!',
          description: `Score SUS: ${score}`,
        });
        push('/user/evaluations');
      } catch (err) {
        toast({
          title: 'Erro',
          description: 'Falha ao salvar a avaliação.',
          variant: 'destructive',
        });
      }
    };

    el.addEventListener('sus-completed', handler);
    return () => el.removeEventListener('sus-completed', handler);
  }, [params, push, toast]);

  if ('isViewable' in params) {
    return <sus-form evaluation-id="" user-id="" ref={ref} />;
  }

  return (
    <sus-form
      evaluation-id={params.evaluationId}
      user-id={params.userId}
      ref={ref}
    />
  );
};

export default SusFormMF;
```

### 5.3 Registrar `"SUS MF"` no seletor de instrumentos

**Arquivo:** `src/types/forms.tsx` — array `instruments` (linha ~400)

Adicione após o item `"sus"`:

```typescript
// forms.tsx — dentro do array instruments[], após o item SUS (linha ~405)
{
    value: "sus_mf",
    label: "SUS MF",
    description: "specialist_services_instruments:sus_mf",
    locales: ["en", "pt"],
},
```

### 5.4 Renderizar `<SusFormMF />` no switch do respondente

**Arquivo:** `src/app/(authenticated)/user/evaluations/fill/page.tsx`

1. Adicione o import (após linha 8):
```typescript
import SusFormMF from '@/components/form/instrument/SusFormMF';
```

2. Adicione o case no switch (após o case `"sus"`, linha 35):
```typescript
case "sus_mf":
  return <SusFormMF {...commonProps} />;
```

### 5.5 Renderizar resultado do SUS MF no switch do especialista

**Arquivo:** `src/app/(authenticated)/specialist/evaluations/results/answer/page.tsx`

Adicione no switch (após o case `'sus'`, linha 33):

```typescript
case 'sus_mf':
  return <SusResult user={user} evaluation={evaluation} data={data as Sus} />;
```

> O resultado reutiliza o mesmo `SusResult.tsx` pois os dados salvos têm o mesmo formato.

---

## 6. Rodando Localmente (Dois Repos em Paralelo)

### Terminal 1 — Micro Frontend

```bash
cd emoframe-mf-sus
npm run dev
# Roda em http://localhost:5173
# O script fica disponível em http://localhost:5173/src/main.tsx (dev mode)
```

> **Nota:** Em modo dev o Vite serve o source diretamente. Para testar o bundle buildado use `npm run build && npm run preview` (porta 4173).

### Terminal 2 — EmoFrame (Next.js)

```bash
cd Emoframe
npm run dev
# Roda em http://localhost:3000
```

### URL do MF em dev vs build

| Modo | `NEXT_PUBLIC_MF_SUS_URL` |
|------|--------------------------|
| Dev (Vite serve source) | `http://localhost:5173/src/main.tsx` |
| Preview (bundle) | `http://localhost:4173/sus-form.js` |
| Produção (CDN) | `https://cdn.exemplo.com/mf/sus-form.js` |

### Possíveis problemas de CORS

O `vite.config.ts` já tem `cors: true`. Se mesmo assim houver bloqueio:

```typescript
// vite.config.ts — server
server: {
  port: 5173,
  cors: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
  },
},
```

---

## 7. Checklist de Validação

- [ ] O MF renderiza isolado em `http://localhost:5173` sem erros no console
- [ ] Ao preencher todas as 10 questões e clicar "Finalizar", o evento `sus-completed` é disparado com `answers` e `score`
- [ ] O `score` é calculado corretamente (ex: todas as respostas = 5 → score = 100; todas = 1 → score = 0)
- [ ] No Next.js, a opção `"SUS MF"` aparece no seletor de instrumentos ao criar uma avaliação
- [ ] O especialista consegue criar uma avaliação com instrumento `"sus_mf"`
- [ ] O respondente acessa a avaliação e vê o formulário do MF renderizado
- [ ] Ao finalizar, as respostas são salvas no Firebase no caminho `evaluation/{id}/answers/{userId}`
- [ ] O usuário é marcado no array `answered` da avaliação
- [ ] O toast de sucesso aparece e o usuário é redirecionado para `/user/evaluations`
- [ ] O especialista consegue visualizar o resultado via `SusResult` (reutilizado)
- [ ] O SUS **legado** (`instrument: "sus"`) continua funcionando normalmente
- [ ] O MF não quebra se os atributos `evaluation-id` ou `user-id` forem alterados dinamicamente

---

## 8. Próximos Passos (Pós-MVP)

1. **Deploy do MF em CDN** — Build + upload do `sus-form.js` para um bucket (Firebase Hosting, S3, Vercel, etc.)
2. **Variável de ambiente de produção** — Atualizar `NEXT_PUBLIC_MF_SUS_URL` para a URL da CDN
3. **Aposentar o SUS legado** — Após validação, remover o case `"sus"` e manter apenas `"sus_mf"` (renomear para `"sus"`)
4. **Adicionar i18n ao MF** — Receber o locale via atributo HTML `lang` e trocar os textos
5. **Shadow DOM** — Encapsular estilos com Shadow DOM para evitar conflitos com o host
6. **Outros MFs** — Replicar o padrão para `emoframe-mf-sam`, `emoframe-mf-panas`, etc.
7. **Testes E2E** — Cypress/Playwright testando o fluxo completo (MF + Host)
8. **Versionamento semântico** — Publicar versões do MF para rollback seguro
