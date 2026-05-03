# Relatório Técnico: Migração do Instrumento SUS para Micro Frontend (Web Component)

> **Projeto:** EmoFrame — Plataforma de Avaliação de Usabilidade, UX e Respostas Emocionais  
> **Data:** 02 de Maio de 2026  
> **Padrão Aplicado:** Strangler Fig Pattern  
> **Resultado:** Coexistência pacífica entre o SUS legado e o novo MF-SUS

---

## 1. Contexto e Objetivo

O EmoFrame possui diversos instrumentos de avaliação (PANAS, SAM, SUS, EAZ, BRUMS, GDS, LEAP) implementados como componentes React acoplados diretamente ao monolito Next.js. Cada instrumento depende fortemente de bibliotecas internas do projeto (Shadcn/UI, i18next, react-hook-form, Firebase SDK) e não pode ser executado fora do contexto da aplicação principal.

O objetivo desta tarefa foi **extrair o instrumento SUS (System Usability Scale) para um repositório independente**, empacotado como um **Web Component** (Custom Element nativo do navegador), utilizando Vite como bundler. A motivação acadêmica exige que **ambas as versões coexistam** no sistema para fins de comparação, sem que uma quebre a outra.

---

## 2. Arquitetura ANTES da Migração (SUS Legado)

Antes da migração, o fluxo completo do instrumento SUS envolvia **7 arquivos** dentro do monolito Next.js, todos fortemente acoplados entre si:

### 2.1. Definição de Dados e Tipagem

**Arquivo:** `Emoframe/src/types/forms.tsx` (linhas 189–213)

Este arquivo centraliza TODAS as tipagens e constantes de TODOS os instrumentos do EmoFrame. O SUS possui:

- **`interface Sus`** — Define a estrutura de dados com os 10 campos (`use_frequency`, `use_complex`, `use_easy`, `need_help`, `function_integration`, `inconsistency`, `learning_curve`, `jumbled`, `confidence`, `learn_system`), todos do tipo `string`.
- **`const susQuestions`** — Array com os 10 objetos `{ index, field, label }` que mapeiam cada pergunta a uma chave de tradução i18next e a um campo do formulário.
- **`const instruments`** — Array global que lista todos os instrumentos disponíveis para o Especialista selecionar ao criar uma avaliação. O SUS estava registrado como `{ value: "sus", label: "SUS", ... }`.

**Papel no fluxo:** Este arquivo é o "contrato" central. Ele define a forma dos dados que o formulário coleta, que o Firebase armazena e que os gráficos de resultado consomem. Todos os outros arquivos importam daqui.

### 2.2. Criação da Avaliação pelo Especialista

**Arquivo:** `Emoframe/src/components/form/SetEvaluationForm.tsx`

Este é o formulário multi-step que o perfil **Specialist** utiliza para criar uma nova avaliação. No Step 2, ele renderiza um `<Combobox>` alimentado pela constante `instruments` importada de `types/forms.tsx`. Quando o Especialista seleciona "SUS", o valor `"sus"` é gravado no campo `instrument` do documento da avaliação no Firestore.

**Papel no fluxo:** É o ponto de entrada do ciclo. Ele grava no Firebase um documento na coleção `evaluation` com `instrument: "sus"`, a lista de `users` selecionados, a `date` da avaliação, e o `specialist` proprietário.

### 2.3. Roteamento do Formulário para o Respondente

**Arquivo:** `Emoframe/src/app/(authenticated)/user/evaluations/fill/page.tsx`

Esta é uma **Server Component** do Next.js (App Router). Quando o perfil **User** acessa a rota `/user/evaluations/fill?evaluation=<ID>`, esta página:

1. Valida a sessão do usuário via `getServerSession`.
2. Busca o documento da avaliação no Firebase via `getById`.
3. Verifica se o usuário está autorizado, se a data é válida, e se ele ainda não respondeu.
4. Passa o campo `evaluation.instrument` para o componente `<RenderComponent>`, que contém um `switch/case` decidindo qual formulário renderizar.

**O case do SUS legado:**
```tsx
case "sus":
  return <SusForm {...commonProps} identification={identification} />;
```

**Papel no fluxo:** É o "roteador" que conecta a avaliação criada pelo Especialista ao formulário correto que o Respondente deve preencher.

### 2.4. O Formulário SUS Legado (Componente de Coleta)

**Arquivo:** `Emoframe/src/components/form/instrument/SusForm.tsx` (190 linhas)

Este é o componente React que renderiza as 10 questões Likert (escala 1–5) para o respondente. Ele é um Client Component (`'use client'`) que:

- Importa `susQuestions` e `RadioItem` de `types/forms.tsx`.
- Constrói um schema de validação Zod dinamicamente a partir de `susQuestions`.
- Usa `react-hook-form` com `zodResolver` para gerenciar o estado do formulário.
- Renderiza componentes Shadcn/UI (`Form`, `FormField`, `RadioGroup`, `RadioGroupItem`, `Button`, `Separator`).
- Utiliza `useTranslation('specialist_services_instruments_sus')` do i18next para internacionalizar os textos.
- **No `onSubmit`:** chama diretamente `saveAnswer(values, evaluationId, userId)` da lib do Firebase, exibe um toast de sucesso e redireciona com `push('/user/evaluations')`.

**Acoplamentos diretos:** Shadcn/UI, i18next, react-hook-form, zod, next/navigation, Firebase SDK, useToast. **Nenhum desses pode ser utilizado fora do Next.js.**

### 2.5. Persistência no Firebase

**Arquivo:** `Emoframe/src/lib/firebase.ts` — função `saveAnswer` (linha 84)

```typescript
export async function saveAnswer(
  data: Panas | Sam | Sus | Eaz | Brums | Gds | Leap | TemplateAnswers,
  EvaluationId: string,
  UserId: string
): Promise<any>
```

Esta função:
1. Grava os dados da resposta como um subdocumento em `evaluation/{EvaluationId}/answers/{UserId}`.
2. Atualiza o array `answered` no documento pai da avaliação com `arrayUnion(UserId)`, marcando o usuário como "já respondeu".

**Papel no fluxo:** É o guardião da persistência. Todo formulário de instrumento chama esta função ao finalizar.

### 2.6. Visualização de Resultados (Individual)

**Arquivo:** `Emoframe/src/components/result/SusResult.tsx` (176 linhas)

Componente do painel do **Specialist** que recebe os dados de uma resposta individual e:

- Calcula a pontuação SUS (fórmula: `(X + Y) * 2.5`, onde X = soma ímpares - 5 e Y = 25 - soma pares).
- Renderiza um gráfico de linha (Google Charts) com a variação por questão.
- Exibe tabela de interpretação da pontuação (< 60 = Inaceitável, 60-70 = Ok, 70-80 = Bom, 80-90 = Excelente, > 90 = Melhor possível).
- Exibe tabela de respostas com destaque visual na coluna selecionada.

**Arquivo roteador:** `Emoframe/src/app/(authenticated)/specialist/evaluations/results/answer/page.tsx`  
Contém o `switch(evaluation.instrument)` que decide qual componente de resultado renderizar. O case `'sus'` renderiza `<SusResult>`.

### 2.7. Visualização de Resultados (Grupo)

**Arquivo:** `Emoframe/src/components/result/SusResultMultiple.tsx` (204 linhas)

Semelhante ao `SusResult`, mas para **múltiplos respondentes**. Renderiza uma tabela comparativa com a pontuação de cada usuário e um gráfico de linha sobreposto mostrando as curvas individuais.

**Arquivo roteador:** `Emoframe/src/app/(authenticated)/specialist/evaluations/results/groupanswer/page.tsx`  
Contém o `switch(evaluation.instrument)` para resultados em grupo. O case `'sus'` renderiza `<SusResultMultiple>`.

### 2.8. Diagrama do Fluxo Legado

```
Specialist cria avaliação
    │
    ▼
SetEvaluationForm.tsx ──► instruments[] (forms.tsx) ──► Firebase: instrument="sus"
    │
    ▼
User acessa /fill?evaluation=ID
    │
    ▼
fill/page.tsx ──► switch("sus") ──► SusForm.tsx
    │                                    │
    │                    ┌───────────────┘
    │                    ▼
    │              susQuestions[] (forms.tsx)
    │              + Shadcn/UI + i18next + Zod
    │                    │
    │                    ▼ onSubmit
    │              saveAnswer() ──► Firebase: evaluation/{id}/answers/{userId}
    │
    ▼
Specialist visualiza resultados
    │
    ▼
answer/page.tsx ──► switch("sus") ──► SusResult.tsx ──► Gráficos + Tabelas
groupanswer/page.tsx ──► switch("sus") ──► SusResultMultiple.tsx ──► Gráficos comparativos
```

---

## 3. Arquitetura DEPOIS da Migração (MF-SUS)

A migração criou um **novo repositório independente** (`emoframe-mf-sus/`) e adicionou **4 novos arquivos** ao monolito Next.js, além de modificar **4 arquivos existentes**. O código legado permaneceu 100% intacto.

### 3.1. O Repositório do Micro Frontend (`emoframe-mf-sus/`)

Um projeto Vite + React completamente independente, com seu próprio `package.json`, `tsconfig.json` e dependências isoladas.

#### 3.1.1. Entry Point — `src/main.tsx`
```typescript
import SusFormElement from './SusFormElement';

if (!customElements.get('emoframe-mf-sus')) {
  customElements.define('emoframe-mf-sus', SusFormElement);
}
```
**Papel:** Registra o Custom Element `<emoframe-mf-sus>` no navegador. A verificação com `customElements.get()` previne duplo registro caso o script seja carregado mais de uma vez.

#### 3.1.2. Web Component Bridge — `src/SusFormElement.tsx`
```typescript
class SusFormElement extends HTMLElement {
  static get observedAttributes() { return ['evaluation-id', 'user-id']; }

  connectedCallback() {
    // Cria um div interno, monta o React nele
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    this.root = createRoot(this.mountPoint);
    this.renderReact();
  }

  attributeChangedCallback() { this.renderReact(); }
  disconnectedCallback() { this.root?.unmount(); }

  private renderReact() {
    this.root.render(
      <SusFormApp evaluationId={...} userId={...} />
    );
  }
}
```
**Papel:** É a "ponte" entre o mundo dos Web Components (API nativa do navegador) e o mundo do React. Ele:
- Observa mudanças nos atributos HTML `evaluation-id` e `user-id`.
- Cria uma árvore React isolada dentro de si usando `createRoot`.
- Repassa os atributos como props para o componente React interno.
- Desmonta o React ao ser removido do DOM (`disconnectedCallback`).

#### 3.1.3. Componente React do Formulário — `src/SusFormApp.tsx`
Este é o "coração" visual do Micro Frontend. Ele replica a mesma lógica do `SusForm.tsx` legado, porém **completamente desacoplado**:

- **Sem dependência do Shadcn/UI:** Usa HTML nativo (`<input type="radio">`, `<button>`, `<label>`) com estilos inline.
- **Sem dependência do i18next:** Os textos das 10 questões estão hardcoded em PT-BR diretamente no componente.
- **Mesma validação Zod:** O schema é construído dinamicamente da mesma forma, garantindo que o formulário só submete com todas as 10 questões preenchidas.
- **Mesma estrutura de dados:** Os campos (`use_frequency`, `use_complex`, etc.) e valores (`'1'` a `'5'`) são idênticos ao legado. Isso é **crítico** para a compatibilidade com os gráficos de resultado.

**Diferença fundamental no `onSubmit`:** Em vez de chamar `saveAnswer()` diretamente (o que exigiria o Firebase SDK), o componente emite um **Custom Event**:
```typescript
const event = new CustomEvent('sus-form-submitted', {
  detail: { values, evaluationId, userId },
  bubbles: true,
  composed: true,
});
window.dispatchEvent(event);
```
O MF não sabe onde está sendo executado, não conhece o Firebase, não conhece o Next.js. Ele simplesmente "grita" para a janela: _"Alguém aí, eu terminei, aqui estão os dados!"_

#### 3.1.4. Configuração do Vite — `vite.config.ts`
```typescript
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production')
  },
  build: {
    lib: {
      entry: 'src/main.tsx',
      formats: ['es'],
      fileName: () => 'sus-form.js',
    },
  },
  server: { port: 5173, cors: true },
});
```
**Decisões técnicas importantes:**
- **`build.lib`:** Compila o projeto como uma biblioteca JavaScript (não como um site), gerando um único arquivo `sus-form.js`.
- **`define: { 'process.env.NODE_ENV' }`:** O React internamente usa `process.env.NODE_ENV` para decidir entre modo dev/prod. Como o bundle roda diretamente no navegador (que não tem `process`), essa substituição em tempo de build evita o `ReferenceError: process is not defined`.
- **`server.cors: true`:** Permite que o Next.js (porta 3000) carregue scripts do Vite (porta 5173) sem bloqueio de CORS.

### 3.2. Novos Arquivos no Host Next.js (`Emoframe/`)

#### 3.2.1. Tipagem para Custom Element — `types/custom-elements.d.ts`
```typescript
declare namespace JSX {
    interface IntrinsicElements {
        'emoframe-mf-sus': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>, HTMLElement
        > & {
            'evaluation-id'?: string;
            'user-id'?: string;
        };
    }
}
```
**Por que é necessário:** O TypeScript/React não reconhece tags HTML que não fazem parte do padrão (como `<emoframe-mf-sus>`). Sem essa declaração, o compilador emitiria erro ao encontrar a tag no JSX. Este arquivo estende o namespace `JSX.IntrinsicElements` para registrar a tag e seus atributos aceitos.

#### 3.2.2. Componente Wrapper — `src/components/form/instrument/MfSusForm.tsx`
Este é o componente **mais importante** da integração. Ele é um Client Component (`'use client'`) que atua como a "cola" entre o Web Component externo e o ecossistema Next.js:

```tsx
export function SusInstrument({ evaluationId, userId }: SusInstrumentProps) {
    const { push } = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const handleMfEvent = (event: Event) => {
            const { values, evaluationId, userId } = (event as CustomEvent).detail;

            saveAnswer(values, evaluationId, userId).then(() => {
                toast({ title: "Avaliação salva com sucesso!" });
                push('/user/evaluations');
            });
        };

        window.addEventListener('sus-form-submitted', handleMfEvent);
        return () => window.removeEventListener('sus-form-submitted', handleMfEvent);
    }, []);

    return (
        <div>
            <Script src="http://localhost:5173/@vite/client" strategy="lazyOnload" type="module" />
            <Script src="http://localhost:5173/src/main.tsx" strategy="lazyOnload" type="module" />
            <emoframe-mf-sus evaluation-id={evaluationId} user-id={userId}></emoframe-mf-sus>
        </div>
    );
}
```

**Responsabilidades:**
1. **Carrega os scripts do MF** via `next/script` apontando para o servidor Vite de desenvolvimento.
2. **Renderiza a tag `<emoframe-mf-sus>`** passando os atributos HTML nativos.
3. **Escuta o Custom Event** `sus-form-submitted` na `window` e, ao recebê-lo:
   - Chama `saveAnswer()` do Firebase (mesma função que o legado usa).
   - Exibe notificação de sucesso via `useToast`.
   - Redireciona o usuário para `/user/evaluations` via `useRouter`.

**Insight arquitetural:** Este wrapper preserva a separação de responsabilidades. O MF não precisa conhecer o Firebase; o Host não precisa conhecer a UI do formulário. A comunicação acontece via evento.

#### 3.2.3. Página de Teste — `src/app/test-mf/page.tsx`
Página pública criada exclusivamente para testar o carregamento do Web Component sem precisar estar logado, ter uma avaliação válida no Firebase ou navegar pelo fluxo completo do sistema. Renderiza o `<SusInstrument>` com IDs fictícios.

### 3.3. Arquivos Existentes Modificados no Host

#### 3.3.1. `src/types/forms.tsx` — Adição do novo instrumento
```diff
 {  value: "sus", label: "SUS", ... },
+{  value: "sus_mf", label: "MF-SUS (Web Component)", description: "specialist_services_instruments:sus", locales: ["pt"] },
 {  value: "eaz", label: "EAZ", ... },
```
**Efeito cascata automático:** Como o `SetEvaluationForm.tsx` consome a constante `instruments` diretamente, o novo instrumento `"sus_mf"` apareceu automaticamente no dropdown de seleção do Especialista, sem necessidade de alterar o formulário de criação.

#### 3.3.2. `src/app/(authenticated)/user/evaluations/fill/page.tsx` — Novo case no roteador
```diff
 case "sus":
   return <SusForm {...commonProps} identification={identification} />;
+case "sus_mf":
+  return <MfSusForm {...commonProps} />;
 case "eaz":
```
**Impacto:** Quando o Firebase retorna `instrument: "sus_mf"` para uma avaliação, o roteador agora sabe renderizar o componente Wrapper que carrega o Web Component.

#### 3.3.3. `.../results/answer/page.tsx` — Resultado individual
```diff
 case 'sus':
+case 'sus_mf':
   return <SusResult user={user} evaluation={evaluation} data={data as Sus} />;
```

#### 3.3.4. `.../results/groupanswer/page.tsx` — Resultado em grupo
```diff
 case 'sus':
+case 'sus_mf':
   return <SusResultMultiple evaluation={evaluation} answers={answers as SusAnswer[]} />;
```

**Decisão crítica nos resultados:** Como o payload do MF-SUS é estruturalmente idêntico ao do SUS legado (mesmos campos, mesmos valores), os componentes de gráfico e tabela (`SusResult` e `SusResultMultiple`) funcionam perfeitamente para ambos, sem nenhuma alteração nos componentes de visualização.

### 3.4. Diagrama do Fluxo Novo (MF-SUS)

```
Specialist cria avaliação
    │
    ▼
SetEvaluationForm.tsx ──► instruments[] (forms.tsx) ──► Firebase: instrument="sus_mf"
    │                      (agora inclui "sus_mf")
    ▼
User acessa /fill?evaluation=ID
    │
    ▼
fill/page.tsx ──► switch("sus_mf") ──► MfSusForm.tsx (Wrapper Next.js)
    │                                       │
    │                          ┌────────────┘
    │                          ▼
    │                    <Script> carrega Vite (porta 5173)
    │                          │
    │                          ▼
    │                    <emoframe-mf-sus> (Custom Element)
    │                          │
    │                          ▼
    │               ┌── SusFormElement.tsx (Bridge)
    │               │         │
    │               │         ▼
    │               │   SusFormApp.tsx (React isolado no Vite)
    │               │   + react-hook-form + zod (próprios)
    │               │   + HTML/CSS inline (sem Shadcn/UI)
    │               │   + Textos hardcoded PT-BR (sem i18next)
    │               │         │
    │               │         ▼ onSubmit
    │               │   CustomEvent('sus-form-submitted')
    │               │         │
    │               └─────────┘
    │                          │ window.dispatchEvent
    │                          ▼
    │                    MfSusForm.tsx (Wrapper) escuta o evento
    │                          │
    │                          ▼
    │                    saveAnswer() ──► Firebase (mesmo path)
    │                          │
    │                          ▼
    │                    toast() + push('/user/evaluations')
    │
    ▼
Specialist visualiza resultados
    │
    ▼
answer/page.tsx ──► switch("sus_mf") ──► SusResult.tsx (MESMO do legado!)
groupanswer/page.tsx ──► switch("sus_mf") ──► SusResultMultiple.tsx (MESMO do legado!)
```

---

## 4. Comparação Direta: Legado vs. Micro Frontend

| Aspecto | SUS Legado (`SusForm.tsx`) | MF-SUS (`SusFormApp.tsx` + Wrapper) |
|---|---|---|
| **Localização** | Dentro do monolito Next.js | Repositório Vite independente |
| **Bundler** | Webpack (via Next.js) | Vite (library mode) |
| **Componentes de UI** | Shadcn/UI (RadioGroup, Button, Form...) | HTML nativo + CSS inline |
| **Internacionalização** | i18next (`useTranslation`) | Textos hardcoded PT-BR |
| **Validação** | Zod + react-hook-form | Zod + react-hook-form (próprios) |
| **Persistência** | Chama `saveAnswer()` diretamente | Emite `CustomEvent`, o Host salva |
| **Navegação pós-submit** | `useRouter().push()` direto | Wrapper faz `push()` após evento |
| **Portabilidade** | Apenas Next.js | Qualquer framework (Vue, Angular, vanilla) |
| **Identificador no Firebase** | `instrument: "sus"` | `instrument: "sus_mf"` |
| **Estrutura dos dados salvos** | `{ use_frequency: "5", ... }` | `{ use_frequency: "5", ... }` (idêntico) |
| **Componentes de resultado** | `SusResult` + `SusResultMultiple` | Os mesmos (reaproveitados) |

---

## 5. Ganhos Arquiteturais

### A. Desacoplamento Total (Portabilidade)
O Web Component `<emoframe-mf-sus>` é um "cidadão de primeira classe" do navegador. Ele pode ser inserido em qualquer página HTML com uma tag `<script>` e uma tag custom. Se o EmoFrame migrar para Vue, Angular, ou até um site estático, o formulário SUS funcionará sem alteração.

### B. Deploy Independente
O MF pode ser versionado, testado e implantado separadamente do monolito. Uma correção na UI do formulário SUS não exige rebuild do Next.js inteiro.

### C. Isolamento de Falhas
Se o servidor Vite do MF estiver fora do ar, apenas avaliações do tipo `"sus_mf"` são afetadas. As avaliações do `"sus"` legado continuam funcionando normalmente.

### D. Compatibilidade de Dados
A decisão de manter a estrutura do payload idêntica ao legado eliminou a necessidade de:
- Criar novos componentes de gráfico.
- Alterar a fórmula de cálculo do score SUS.
- Migrar dados antigos.

### E. Developer Experience (DX)
O carregamento via `@vite/client` no modo de desenvolvimento habilita Hot Module Replacement entre repositórios: o desenvolvedor edita o formulário no Vite e vê a alteração refletida instantaneamente dentro do Next.js, sem rebuild manual.

---

## 6. Inventário Completo de Arquivos

### Arquivos Criados (novos)
| Arquivo | Repositório | Propósito |
|---|---|---|
| `src/main.tsx` | `emoframe-mf-sus` | Entry point: registra o Custom Element |
| `src/SusFormElement.tsx` | `emoframe-mf-sus` | Bridge: HTMLElement ↔ React |
| `src/SusFormApp.tsx` | `emoframe-mf-sus` | UI do formulário SUS (10 questões Likert) |
| `vite.config.ts` | `emoframe-mf-sus` | Configuração de build em library mode |
| `package.json` | `emoframe-mf-sus` | Dependências isoladas (React, Zod, RHF) |
| `types/custom-elements.d.ts` | `Emoframe` | Tipagem JSX para `<emoframe-mf-sus>` |
| `src/components/form/instrument/MfSusForm.tsx` | `Emoframe` | Wrapper: carrega scripts + escuta evento |
| `src/app/test-mf/page.tsx` | `Emoframe` | Página de teste isolada do MF |

### Arquivos Modificados (existentes)
| Arquivo | Repositório | Mudança |
|---|---|---|
| `src/types/forms.tsx` | `Emoframe` | Adição de `"sus_mf"` no array `instruments` |
| `src/app/(authenticated)/user/evaluations/fill/page.tsx` | `Emoframe` | Novo `case "sus_mf"` no switch de instrumentos |
| `src/app/(authenticated)/specialist/evaluations/results/answer/page.tsx` | `Emoframe` | Novo `case 'sus_mf'` apontando para `SusResult` |
| `src/app/(authenticated)/specialist/evaluations/results/groupanswer/page.tsx` | `Emoframe` | Novo `case 'sus_mf'` apontando para `SusResultMultiple` |

### Arquivos NÃO Modificados (legado preservado)
| Arquivo | Repositório | Status |
|---|---|---|
| `src/components/form/instrument/SusForm.tsx` | `Emoframe` | ✅ Intacto |
| `src/components/result/SusResult.tsx` | `Emoframe` | ✅ Intacto |
| `src/components/result/SusResultMultiple.tsx` | `Emoframe` | ✅ Intacto |
| `src/components/form/SetEvaluationForm.tsx` | `Emoframe` | ✅ Intacto (herda `instruments[]` automaticamente) |
| `src/lib/firebase.ts` | `Emoframe` | ✅ Intacto (função `saveAnswer` reutilizada) |
