# Adopets Monorepo

Este monorepo utiliza [Turborepo](https://turborepo.com/) para gerenciar múltiplos aplicativos e pacotes TypeScript de forma eficiente. Abaixo está a documentação detalhada das principais features e estrutura do projeto.

---

## Estrutura do Projeto

O monorepo está organizado em três principais diretórios dentro de `apps/`:

- **docs/**: Aplicação Next.js para documentação.
- **web/**: Aplicação Next.js/Vite para frontend principal.
- **server/**: API backend em Node.js com Fastify e Prisma.

Além disso, há pacotes compartilhados em `packages/` (ex: `@adopets/ui`, `@adopets/eslint-config`, `@adopets/typescript-config`).

---

## Principais Features

### 1. **Frontend Web (`apps/web`)**

- **Stack:** Next.js/Vite + React + TypeScript.
- **Componentização:** Componentes reutilizáveis em `src/components/ui/`, incluindo Sidebar, Button, Input, etc.
- **Hooks customizados:** Exemplo: `useIsMobile` para responsividade.
- **Rotas e páginas:** Estruturadas em `src/pages/` e `src/routes/`.
- **Store:** Gerenciamento de estado global em `src/store/`.
- **Integração com backend:** Serviços em `src/service/` para comunicação com a API.
- **Alias TypeScript:** Configuração de alias `@` para facilitar imports (`tsconfig.json`).
- **Estilização:** CSS modular e integração com Tailwind (se aplicável).
- **Testes:** Suporte a testes unitários e integração contínua.

### 2. **Backend Server (`apps/server`)**

- **Stack:** Node.js + Fastify + TypeScript.
- **ORM:** Prisma para modelagem e acesso ao banco de dados.
- **Autenticação:** Middleware de autenticação JWT em `middlewares/auth.ts`.
- **Rotas REST:** Organizadas por domínio (`auth`, `user`, `product`, `transaction`, etc.) em `routes/`.
- **Validação e tratamento de erros:** Centralizado em `src/error-handler.ts`.
- **Env config:** Variáveis de ambiente em `src/env.ts`.
- **Geradores utilitários:** Funções auxiliares em `src/utils/`.
- **Migrations:** Controle de versões do banco via Prisma Migrations.
- **Docker:** Suporte a desenvolvimento e deploy com Docker Compose.

### 3. **Documentação (`apps/docs`)**

- **Stack:** Next.js + TypeScript.
- **Conteúdo:** Documentação dos módulos, APIs e features do projeto.
- **Estático:** Assets e ícones em `public/`.

### 4. **Pacotes Compartilhados**

- **@adopets/eslint-config:** Configuração de linting para todo o monorepo.
- **@adopets/typescript-config:** Configuração base do TypeScript para todos os apps/pacotes.

---

## Como rodar o projeto

### Instalação

```sh
npm install
```

### Build

```sh
npm run build
```

### Desenvolvimento

```sh
npm run dev
```

### Rodando o Backend (`apps/server`)

Para iniciar o backend, siga os passos abaixo:

1. **Configurar variáveis de ambiente:**  
   Crie um arquivo `.env` em na raiz do projeto com as variáveis necessárias (exemplo: conexão com banco de dados, JWT secret, etc).  
   Consulte o arquivo `.env.example` para referência.

2. **Subir containers com Docker:**  
   Execute o comando abaixo dentro de `apps/server/` para iniciar os serviços necessários (ex: banco de dados):

```sh
docker compose up -d
```

3. **Iniciar o servidor:**  
   Com os containers rodando e as variáveis configuradas, execute:

```sh
npm run dev --filter=server
```

### Rodar apenas um app/pacote

```sh
npm run dev --filter=web
npm run dev --filter=server
npm run dev --filter=docs
```

---

## Principais Comandos

- **Build:** `pnpm exec turbo build`
- **Dev:** `pnpm exec turbo dev`
- **Testes:** `pnpm test` (em cada app/pacote)
- **Lint:** `pnpm lint`
- **Migrations Prisma:** `pnpm exec prisma migrate dev` (dentro de `apps/server`)
- **Docker:** `docker-compose up` (dentro de `apps/server`)

---

## Remote Caching

O Turborepo suporta cache remoto via Vercel para acelerar builds e CI/CD. Veja [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) para detalhes.

---

## Links Úteis

- [Documentação Turborepo](https://turborepo.com/docs)
- [Documentação Prisma](https://www.prisma.io/docs)
- [Documentação Fastify](https://www.fastify.io/docs/latest/)
- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Vite](https://vitejs.dev/guide/)

---

## Observações

- Todas as aplicações e pacotes utilizam TypeScript.
- O monorepo está pronto para CI/CD, testes e deploy em múltiplos ambientes.
- Para dúvidas sobre componentes, consulte a documentação em `apps/docs`.
