# Módulos e Features do Sistema Adopets

## 1. Módulo de Consultas Médicas

**Descrição**: Gerencia consultas veterinárias, incluindo agendamento, histórico clínico e relatórios.

**Features**:

- Cadastro de consultas: Registrar consultas com data, hora, veterinário, animal e observações.
- Histórico clínico: Visualizar histórico de consultas e tratamentos de cada animal.
- Agendamento: Criar, editar e cancelar agendamentos de consultas com notificações para clientes.
- Relatórios: Gerar relatórios de consultas por período, veterinário ou animal.

## 2. Módulo de Farmácia

**Descrição**: Controla o estoque de medicamentos e vendas na farmácia do petshop.

**Features**:

- Gestão de estoque: Cadastrar, atualizar e monitorar medicamentos (entrada, saída, validade, estoque mínimo).
- Venda de medicamentos: Registrar vendas de medicamentos, vinculando ao histórico do animal.
- Prescrições: Integrar prescrições médicas das consultas ao registro de vendas.
- Alertas de validade: Notificar sobre medicamentos próximos do vencimento.

## 3. Módulo de Loja

**Descrição**: Gerencia produtos de varejo (ex.: ração, acessórios) e vendas na loja.

**Features**:

- Gestão de produtos: Cadastrar e atualizar produtos com preço, estoque e categorias (ex.: ração, acessórios).
- Registro de vendas: Registrar vendas de produtos, atualizando o estoque automaticamente.
- Promoções e descontos: Criar e gerenciar promoções ou descontos em produtos.
- Relatórios de vendas: Gerar relatórios de vendas por produto, categoria ou período.

## 4. Módulo de Gerenciamento de Usuários e Permissões

**Descrição**: Controla acesso e permissões de usuários, com suporte a multi-loja e diferentes níveis de acesso.

**Features**:

**Níveis de acesso**:

- Superadmin: Criar redes de petshops ou lojas independentes, gerenciar todas as lojas e permissões.
- Administrador: Gerenciar permissões de usuários em lojas de uma rede e acessar relatórios consolidados.
- Usuário comum: Acessar funcionalidades específicas de uma loja (ex.: registrar vendas ou consultas).
- Gestão de permissões: Atribuir permissões granulares por loja (ex.: leitura/escrita em consultas, farmácia ou loja).
- Acesso multi-loja: Permitir que administradores alternem entre lojas de uma mesma rede.
- Autenticação: Login seguro com JWT (JSON Web Token).
- Recuperação de senha: Solicitar recuperação via e-mail e redefinir senha com token temporário.

## 5. Módulo de Clientes e Animais

**Descrição**: Gerencia informações de clientes e seus animais, vinculando-os a lojas específicas.

**Features**:

- Cadastro de clientes: Registrar nome, e-mail, telefone e endereço.
- Cadastro de animais: Incluir nome, espécie, raça, idade e histórico médico.
- Vinculação: Associar animais a clientes, permitindo rastreamento de consultas e vendas.
- Histórico do cliente: Visualizar compras e consultas associadas a um cliente ou animal.

## 6. Módulo de Relatórios e Dashboards

**Descrição**: Fornece relatórios e visualizações para monitoramento do desempenho do petshop.

**Features**:

- Relatórios financeiros: Faturamento por loja, módulo (consultas, farmácia, loja) ou período.
- Relatórios operacionais: Consultas agendadas, estoque de produtos e vendas realizadas.
- Dashboards: Exibir resumos visuais (ex.: vendas diárias, consultas pendentes, estoque baixo).
- Exportação de dados: Gerar relatórios em formatos como CSV ou PDF.

## 7. Módulo de Autenticação e Segurança

**Descrição**: Gerencia autenticação de usuários e segurança da API.

**Features**:

- Login: Autenticar usuários com e-mail e senha, retornando um JWT.
- Recuperação de senha:
- Solicitação de recuperação via e-mail com envio de token JWT.
- Redefinição de senha com validação do token.
- Validação de permissões: Verificar permissões por loja (ex.: sales:read, consultations:write) antes de executar ações.
- Rate limiting: Limitar tentativas de login ou recuperação de senha para evitar abusos.

## 8. Módulo de Gerenciamento de Redes e Lojas

**Descrição**: Permite criar e gerenciar redes de petshops e lojas independentes.

**Features**:

- Criação de redes: Superadmin pode criar redes de petshops (ex.: franquias).
- Criação de lojas: Superadmin ou admin pode criar lojas vinculadas a uma rede ou independentes.
- Gerenciamento de lojas: Visualizar e editar informações de lojas (ex.: nome, endereço).
- Relatórios consolidados: Administradores podem visualizar dados agregados de todas as lojas de uma rede.
