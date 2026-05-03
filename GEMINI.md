# 🎨 Diretrizes de Engenharia e UI/UX: Frontend EmoFrame

> **ATENÇÃO:** Este arquivo contém as regras específicas e inegociáveis para o desenvolvimento do Frontend (diretório `Emoframe`). Estas regras complementam a Constituição Global localizada na raiz (`../GEMINI.md`). Ao atuar nesta camada do projeto, você **DEVE** seguir rigorosamente estes padrões.

---

## 1. Stack Tecnológico e Regras de Código

*   **Framework Core:** **Next.js (App Router)**. Utilize os padrões mais recentes (Server Components onde possível, Client Components apenas quando necessário usando a diretiva `'use client'`).
*   **Linguagem:** **TypeScript Estrito**.
    *   🚨 **PROIBIDO:** O uso da tipagem `any` é estritamente proibido.
    *   **Padrão:** Crie interfaces e tipagens explícitas na pasta `src/types` para todas as estruturas de dados, respostas de API e props de componentes.
*   **Estilização e Design System:**
    *   Utilize **TailwindCSS** para utilitários de estilo.
    *   Componentes base devem ser construídos com **Shadcn UI** e **Radix UI** (para garantir acessibilidade nativa e consistência comportamental).
    *   Mantenha um design limpo, responsivo e que transmita profissionalismo e clareza, adequado a uma ferramenta de pesquisa científica.

---

## 2. Diretrizes de Interação Humano-Computador (IHC)

Sendo o EmoFrame uma plataforma focada em avaliar usabilidade e emoções, a interface da própria ferramenta deve ser um modelo de excelência em IHC:
*   **Acessibilidade Obrigatória (a11y):**
    *   Absolutamente todos os formulários, botões, inputs e componentes de instrumentos (como as escalas do SUS) **DEVEM** conter atributos de acessibilidade (ex: `aria-labels`, `aria-describedby`, papéis semânticos e suporte total à navegação via teclado).
*   **Ergonomia e Lei de Fitts (Foco Mobile):**
    *   **Área de Toque:** Elementos clicáveis (especialmente em instrumentos de avaliação com escalas Likert, botões de rádio e checkboxes) devem ter um tamanho mínimo seguro para dispositivos móveis (ex: mínimo de 44x44 pixels ou `min-h-[44px] min-w-[44px]` com padding adequado). O respondente não deve ter dificuldade física para selecionar uma opção.

---

## 3. Arquitetura de Componentes e Instrumentos (Padrão SUS)

O desenvolvimento de novos instrumentos de pesquisa ou refatoração dos existentes (como o SUS - System Usability Scale) deve obedecer estritamente ao **Fluxo Modular de 3 Camadas**:

1.  **Camada de Tipagem (`src/types/forms.tsx` ou equivalente):**
    *   Defina com clareza as interfaces (schemas) dos dados que o instrumento exige para ser configurado e os dados que ele coleta do respondente.
2.  **Camada de UI / Componentização (`src/components/form/instrument/`):**
    *   Crie componentes puramente visuais e isolados (Micro Frontends). A UI do instrumento não deve estar acoplada a regras complexas de banco de dados; ela deve apenas renderizar o estado e emitir os dados preenchidos via callbacks/props.
3.  **Camada de Persistência (Serviços e Firebase):**
    *   A lógica de comunicação com o Firebase (leitura da configuração do instrumento e gravação das respostas) deve ocorrer em uma camada de serviço ou via hooks customizados no nível da página/container, mantendo o componente da UI limpo e testável.

> 🔍 **Contexto Atual e Referência Obrigatória:**
> Se o seu objetivo atual envolve entender a arquitetura, adicionar um novo instrumento ou modificar o fluxo existente, **NUNCA IGNORE** o documento `notas/mapeamento_tecnico_sus.md`. Ele mapeia exatamente a conexão entre o formulário administrativo (do Especialista) e a interface de coleta (do Usuário/Respondente). Use-o como o gabarito arquitetural do Frontend.
