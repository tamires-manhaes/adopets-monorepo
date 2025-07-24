# Todo List API Adopets

### legendas:

```
[?]: em andamento
[x]: finalizada
```

## Fase 1: Configuração Inicial

### [x] Tarefa 1.1: Configurar Ambiente da API

- **Descrição**: Configurar o projeto Node.js com Fastify, Prisma, PostgreSQL, Zod, jsonwebtoken, bcrypt e nodemailer.
- **Critérios de Aceite**:
  - Projeto inicializado com `npm init` e dependências instaladas.
  - Fastify configurado com `@fastify/type-provider-zod`.
  - Prisma inicializado com `npx prisma init` e conexão com PostgreSQL testada.
  - Variáveis de ambiente definidas (`.env` com `DATABASE_URL`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`).
  - Endpoint `/health` retornando status 200.

### [x] Tarefa 1.2: Aplicar Esquema do Banco de Dados

- **Descrição**: Aplicar o esquema Prisma definido (tabelas: Network, Store, User, UserStorePermission, Client, Animal, Consultation, Product, Sale, PasswordResetToken).
- **Critérios de Aceite**:
  - Script `schema.prisma` aplicado com `npx prisma migrate dev --name init`.
  - Tabelas criadas no PostgreSQL com índices e chaves estrangeiras.
  - Cliente Prisma gerado com `npx prisma generate`.

## Fase 2: Autenticação e Segurança

### [ ] Tarefa 2.1: Implementar Rota de Login

- **Descrição**: Criar a rota `POST /auth/login` para autenticar usuários com e-mail e senha, retornando um JWT.
- **Critérios de Aceite**:
  - Validação de e-mail e senha com Zod.
  - Verificação de credenciais com bcrypt.
  - Geração de JWT com `jsonwebtoken` contendo `userId` e `role`.
  - Testes unitários para login válido, e-mail inválido e senha incorreta.

### [ ] Tarefa 2.2: Implementar Middleware de Autenticação

- **Descrição**: Criar middleware `verifyJwt` para validar tokens JWT em rotas protegidas.
- **Critérios de Aceite**:
  - Middleware verifica JWT com `jsonwebtoken` e adiciona `user` ao `request`.
  - Retorna erro 401 para tokens inválidos ou expirados.
  - Testes unitários para cenários de token válido, inválido e ausente.

### [ ] Tarefa 2.3: Implementar Middleware de Permissões

- **Descrição**: Criar middleware `verifyUserPermission` para verificar permissões por loja com base em `UserStorePermission`.
- **Critérios de Aceite**:
  - Middleware consulta `UserStorePermission` e valida permissões (ex.: `sales:read`, `consultations:write`).
  - Retorna erro 403 para permissões insuficientes.
  - Testes unitários para diferentes roles (`superadmin`, `admin`, `employee`).

### [ ] Tarefa 2.4: Implementar Recuperação de Senha

- **Descrição**: Criar rotas `POST /auth/forgot-password` e `POST /auth/reset-password` para recuperação de senha.
- **Critérios de Aceite**:
  - `POST /auth/forgot-password`: Gera token JWT, salva em `PasswordResetToken` e envia e-mail com `nodemailer`.
  - `POST /auth/reset-password`: Valida token, atualiza senha com bcrypt e deleta token.
  - Validação com Zod para e-mail, token e nova senha.
  - Testes unitários para cenários de sucesso e erro (ex.: token expirado).

## Fase 3: Gerenciamento de Redes e Lojas

### [ ] Tarefa 3.1: Implementar Rotas de Redes

- **Descrição**: Criar rotas `POST /networks` e `GET /networks` para criar e listar redes de petshops.
- **Critérios de Aceite**:
  - `POST /networks`: Restrito a `superadmin`, cria uma rede em `Network`.
  - `GET /networks`: Lista redes acessíveis ao usuário (superadmin vê todas, admin vê apenas sua rede).
  - Validação com Zod para nome da rede.
  - Testes unitários para criação e listagem.

### [ ] Tarefa 3.2: Implementar Rotas de Lojas

- **Descrição**: Criar rotas `POST /stores`, `GET /stores`, `PUT /stores/:id` para gerenciar lojas.
- **Critérios de Aceite**:
  - `POST /stores`: Restrito a `superadmin` ou `admin` com permissão, cria loja em `Store`.
  - `GET /stores`: Lista lojas acessíveis ao usuário com base em `UserStorePermission`.
  - `PUT /stores/:id`: Atualiza informações da loja (ex.: nome, endereço).
  - Validação com Zod para campos obrigatórios.
  - Testes unitários para todos os cenários.

## Fase 4: Gerenciamento de Usuários e Permissões

### [ ] Tarefa 4.1: Implementar Rotas de Usuários

- **Descrição**: Criar rotas `POST /users`, `GET /users`, `PUT /users/:id` para gerenciar usuários.
- **Critérios de Aceite**:
  - `POST /users`: Restrito a `superadmin` ou `admin`, cria usuário com senha hasheada (bcrypt).
  - `GET /users`: Lista usuários por loja ou rede, respeitando permissões.
  - `PUT /users/:id`: Atualiza dados do usuário (ex.: nome, e-mail, role).
  - Validação com Zod para todos os campos.
  - Testes unitários para criação, listagem e atualização.

### [ ] Tarefa 4.2: Implementar Rotas de Permissões

- **Descrição**: Criar rotas `POST /permissions`, `GET /permissions`, `PUT /permissions/:userId/:storeId` para gerenciar permissões por loja.
- **Critérios de Aceite**:
  - `POST /permissions`: Restrito a `admin` ou `superadmin`, atribui permissões em `UserStorePermission`.
  - `GET /permissions`: Lista permissões de usuários por loja.
  - `PUT /permissions/:userId/:storeId`: Atualiza permissões granulares (JSON).
  - Validação com Zod para formato JSON de permissões.
  - Testes unitários para todos os cenários.

## Fase 5: Clientes e Animais

### [ ] Tarefa 5.1: Implementar Rotas de Clientes

- **Descrição**: Criar rotas `POST /clients`, `GET /clients`, `PUT /clients/:id` para gerenciar clientes.
- **Critérios de Aceite**:
  - `POST /clients`: Cria cliente vinculado a uma loja, com validação de campos (nome, e-mail, telefone, endereço).
  - `GET /clients`: Lista clientes por loja, respeitando permissões.
  - `PUT /clients/:id`: Atualiza dados do cliente.
  - Validação com Zod para todos os campos.
  - Testes unitários para criação, listagem e atualização.

### [ ] Tarefa 5.2: Implementar Rotas de Animais

- **Descrição**: Criar rotas `POST /animals`, `GET /animals`, `PUT /animals/:id` para gerenciar animais.
- **Critérios de Aceite**:
  - `POST /animals`: Cria animal vinculado a um cliente, com validação de campos (nome, espécie, raça, data de nascimento).
  - `GET /animals`: Lista animais por cliente ou loja, respeitando permissões.
  - `PUT /animals/:id`: Atualiza dados do animal.
  - Validação com Zod para todos os campos.
  - Testes unitários para criação, listagem e atualização.

## Fase 6: Consultas Médicas

### [ ] Tarefa 6.1: Implementar Rotas de Consultas

- **Descrição**: Criar rotas `POST /consultations`, `GET /consultations`, `PUT /consultations/:id`, `DELETE /consultations/:id` para gerenciar consultas.
- **Critérios de Aceite**:
  - `POST /consultations`: Cria consulta com data, veterinário, animal e observações, respeitando permissões (`consultations:write`).
  - `GET /consultations`: Lista consultas por loja, animal ou veterinário, com filtros (ex.: período).
  - `PUT /consultations/:id`: Atualiza consulta, respeitando permissões.
  - `DELETE /consultations/:id`: Cancela consulta, respeitando permissões.
  - Validação com Zod para todos os campos.
  - Testes unitários para todos os cenários.

## Fase 7: Farmácia e Loja

### [ ] Tarefa 7.1: Implementar Rotas de Produtos

- **Descrição**: Criar rotas `POST /products`, `GET /products`, `PUT /products/:id`, `DELETE /products/:id` para gerenciar produtos (farmácia e loja).
- **Critérios de Aceite**:
  - `POST /products`: Cria produto com nome, categoria, preço, estoque e data de validade (opcional), respeitando permissões (`products:write`).
  - `GET /products`: Lista produtos por loja, com filtros (ex.: categoria, estoque baixo).
  - `PUT /products/:id`: Atualiza produto, respeitando permissões.
  - `DELETE /products/:id`: Remove produto, respeitando permissões.
  - Validação com Zod para todos os campos.
  - Testes unitários para todos os cenários.

### [ ] Tarefa 7.2: Implementar Rotas de Vendas

- **Descrição**: Criar rotas `POST /sales`, `GET /sales`, `GET /sales/:id` para gerenciar vendas.
- **Critérios de Aceite**:
  - `POST /sales`: Registra venda, atualiza estoque e vincula a cliente (opcional), respeitando permissões (`sales:write`).
  - `GET /sales`: Lista vendas por loja, com filtros (ex.: período, cliente).
  - `GET /sales/:id`: Retorna detalhes de uma venda específica.
  - Validação com Zod para todos os campos.
  - Testes unitários para criação, listagem e validação de estoque.

### [ ] Tarefa 7.3: Implementar Rotas de Prescrições

- **Descrição**: Criar rotas `POST /prescriptions`, `GET /prescriptions` para vincular prescrições a consultas.
- **Critérios de Aceite**:
  - `POST /prescriptions`: Vincula medicamento (produto) a uma consulta, respeitando permissões (`consultations:write`).
  - `GET /prescriptions`: Lista prescrições por consulta ou animal.
  - Validação com Zod para campos obrigatórios.
  - Testes unitários para criação e listagem.

## Fase 8: Relatórios e Dashboards

### [ ] Tarefa 8.1: Implementar Rotas de Relatórios Financeiros

- **Descrição**: Criar rotas `GET /reports/financial` para relatórios financeiros.
- **Critérios de Aceite**:
  - Retorna faturamento por loja, módulo (consultas, farmácia, loja) ou período.
  - Respeita permissões (`reports:read`).
  - Suporta filtros (ex.: data inicial/final, loja).
  - Testes unitários para diferentes filtros.

### [ ] Tarefa 8.2: Implementar Rotas de Relatórios Operacionais

- **Descrição**: Criar rotas `GET /reports/operational` para relatórios de consultas, estoque e vendas.
- **Critérios de Aceite**:
  - Retorna dados de consultas agendadas, estoque baixo e vendas por período.
  - Respeita permissões (`reports:read`).
  - Suporta filtros (ex.: loja, categoria de produto).
  - Testes unitários para diferentes filtros.

## Fase 9: Testes e Documentação

### [ ] Tarefa 9.1: Escrever Testes Unitários

- **Descrição**: Criar testes unitários para todas as rotas da API.
- **Critérios de Aceite**:
  - Cobertura de testes de pelo menos 80% para endpoints.
  - Testes para cenários de sucesso, erros e permissões negadas.
  - Relatório de cobertura gerado.

### [ ] Tarefa 9.2: Escrever Testes de Integração

- **Descrição**: Testar fluxos completos da API (ex.: login → criar venda).
- **Critérios de Aceite**:
  - Pelo menos 3 fluxos completos testados (ex.: autenticação → gerenciar loja → registrar venda).
  - Relatório de testes gerado.
  - Correção de bugs identificados.

### [ ] Tarefa 9.3: Documentar a API

- **Descrição**: Criar documentação da API com `@fastify/swagger`.
- **Critérios de Aceite**:
  - Documentação gerada para todas as rotas (endpoints, schemas, exemplos).
  - Interface Swagger acessível em `/api/docs`.
  - Documentação exportada.

## Fase 10: Implantação

### [ ] Tarefa 10.1: Configurar Ambiente de Produção

- **Descrição**: Configurar hospedagem para a API (ex.: Heroku, AWS).
- **Critérios de Aceite**:
  - API acessível via URL pública.
  - Banco de dados PostgreSQL configurado em produção.
  - Variáveis de ambiente seguras (ex.: `JWT_SECRET`, `DATABASE_URL`).

### [ ] Tarefa 10.2: Configurar Monitoramento e Logs

- **Descrição**: Implementar logs e monitoramento para a API.
- **Critérios de Aceite**:
  - Logs configurados para registrar erros e requisições.
  - Monitoramento de uptime e performance (ex.: com New Relic ou Sentry).
  - Relatórios de logs gerados.
