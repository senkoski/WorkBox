# Workbox - Sistema de Gestão Patrimonial

Sistema completo de gestão patrimonial com Frontend Angular 17+ e Backend Node.js/PostgreSQL.

## 🚀 Funcionalidades

### 1. Módulo de Autenticação e Usuários
- Login (Username ou Email + Senha)
- Cadastro de novos usuários
- Recuperação de senha
- Gestão de perfis (Admin, Supervisor, Normal)
- Aprovação de novos usuários
- Edição de perfil

### 2. Módulo de Empresas e Filiais
- Cadastro de empresa matriz
- Gestão de filiais/unidades
- Configurações por empresa
- Hierarquia de acessos
- Dashboard por filial

### 3. Módulo Patrimonial
- Cadastro de bens patrimoniais
- Listagem e filtros de patrimônio
- Histórico de movimentações
- Controle de depreciação
- Status (em uso, manutenção, baixado)
- Alertas de manutenção
- QR Code para inventário

### 4. Módulo de Estoque
- Cadastro de produtos/categorias
- Controle de entradas (NF, transferência, doação)
- Controle de saídas (venda, empréstimo, descarte)
- Saldos e estoque mínimo
- Controle de lotes e validades
- Inventário físico

### 5. Módulo Fiscal
- Importação de NF-e (visualização)
- Histórico de notas fiscais
- Conferência NF × produtos
- Relatório de divergências

### 6. Módulo de Relatórios
- Dashboard com KPIs
- Relatórios patrimoniais
- Relatórios de estoque
- Relatórios fiscais
- Exportação de dados

### 7. Módulo de Parceiros
- Cadastro de fornecedores
- Cadastro de clientes
- Prestadores de serviço
- Transportadoras
- Histórico de transações

## 📋 Pré-requisitos

- **Node.js** 18+ (https://nodejs.org/)
- **PostgreSQL** 12+ (https://www.postgresql.org/)
- **Angular CLI** 17+ (`npm install -g @angular/cli`)

## 🔧 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <repository-url>
cd workbox
```

### 2. Configuração do Backend

#### 2.1. Instalar dependências

```bash
cd backend
npm install
```

#### 2.2. Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `backend/`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=workbox_db
DB_USER=postgres
DB_PASSWORD=sua_senha_postgresql

# JWT
JWT_SECRET=sua_chave_secreta_jwt_aqui
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:4200
```

#### 2.3. Criar banco de dados PostgreSQL

```bash
# Acesse o PostgreSQL
psql -U postgres

# Crie o banco de dados
CREATE DATABASE workbox_db;

# Saia do PostgreSQL
\q
```

#### 2.4. Inicializar banco de dados com dados de exemplo

```bash
npm run init-db
```

Este comando irá:
- Criar todas as tabelas
- Criar empresa padrão
- Criar usuários de teste:
  - **Admin:** username: `admin` / senha: `admin123`
  - **Supervisor:** username: `supervisor` / senha: `supervisor123`
  - **Usuário:** username: `user` / senha: `user123`

#### 2.5. Iniciar o servidor backend

```bash
npm start
# ou para desenvolvimento com auto-reload:
npm run dev
```

O backend estará rodando em: **http://localhost:3000**

### 3. Configuração do Frontend

#### 3.1. Instalar dependências

```bash
cd ../frontend
npm install
```

#### 3.2. Configurar API URL (se necessário)

Edite `frontend/src/environments/environment.ts` se precisar alterar a URL da API:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

#### 3.3. Iniciar o servidor frontend

```bash
npm start
# ou
ng serve
```

O frontend estará rodando em: **http://localhost:4200**

## 🎯 Acessando o Sistema

1. Abra o navegador em: **http://localhost:4200**
2. Faça login com uma das credenciais abaixo:

### Credenciais Padrão:

**Administrador:**
- Username: `admin`
- Senha: `admin123`

**Supervisor:**
- Username: `supervisor`
- Senha: `supervisor123`

**Usuário Normal:**
- Username: `user`
- Senha: `user123`

## 📁 Estrutura do Projeto

```
workbox/
├── backend/                    # Backend Node.js
│   ├── src/
│   │   ├── config/            # Configurações (database)
│   │   ├── controllers/       # Controllers da API
│   │   ├── middlewares/       # Middlewares (auth, error, validators)
│   │   ├── models/            # Models Sequelize
│   │   ├── routes/            # Rotas da API
│   │   ├── utils/             # Utilitários (JWT)
│   │   └── server.js          # Arquivo principal
│   ├── package.json
│   └── .env                   # Variáveis de ambiente
│
└── frontend/                   # Frontend Angular 17+
    ├── src/
    │   ├── app/
    │   │   ├── components/    # Componentes standalone
    │   │   ├── guards/        # Guards de rota
    │   │   ├── interceptors/  # Interceptors HTTP
    │   │   ├── models/        # Interfaces TypeScript
    │   │   ├── services/      # Services (API, Auth)
    │   │   ├── app.component.ts
    │   │   ├── app.config.ts
    │   │   └── app.routes.ts
    │   ├── environments/      # Ambientes
    │   └── styles.scss        # Estilos globais
    ├── angular.json
    └── package.json
```

## 🔌 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil do usuário
- `PUT /api/auth/profile` - Atualizar perfil
- `PUT /api/auth/change-password` - Trocar senha

### Usuários
- `GET /api/users` - Listar usuários
- `GET /api/users/:id` - Buscar usuário
- `PUT /api/users/:id/approve` - Aprovar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário

### Empresas
- `GET /api/companies` - Listar empresas
- `GET /api/companies/:id` - Buscar empresa
- `POST /api/companies` - Criar empresa
- `PUT /api/companies/:id` - Atualizar empresa
- `DELETE /api/companies/:id` - Deletar empresa
- `GET /api/companies/:id/branches` - Listar filiais
- `GET /api/companies/:id/dashboard` - Dashboard da empresa

### Patrimônio
- `GET /api/assets` - Listar patrimônios
- `GET /api/assets/:id` - Buscar patrimônio
- `POST /api/assets` - Criar patrimônio
- `PUT /api/assets/:id` - Atualizar patrimônio
- `DELETE /api/assets/:id` - Deletar patrimônio
- `GET /api/assets/:id/movements` - Movimentações
- `POST /api/assets/:id/movements` - Adicionar movimentação
- `POST /api/assets/:id/depreciation` - Calcular depreciação

### Produtos/Estoque
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Buscar produto
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto
- `GET /api/products/low-stock` - Produtos com estoque baixo
- `GET /api/products/:id/movements` - Movimentações
- `POST /api/products/:id/movements` - Adicionar movimentação

### Notas Fiscais
- `GET /api/invoices` - Listar notas fiscais
- `GET /api/invoices/:id` - Buscar nota fiscal
- `POST /api/invoices` - Criar nota fiscal
- `PUT /api/invoices/:id` - Atualizar nota fiscal
- `DELETE /api/invoices/:id` - Deletar nota fiscal
- `POST /api/invoices/:id/verify` - Verificar nota fiscal
- `GET /api/invoices/discrepancies` - Notas com divergências

### Parceiros
- `GET /api/partners` - Listar parceiros
- `GET /api/partners/:id` - Buscar parceiro
- `POST /api/partners` - Criar parceiro
- `PUT /api/partners/:id` - Atualizar parceiro
- `DELETE /api/partners/:id` - Deletar parceiro
- `GET /api/partners/:id/transactions` - Transações do parceiro

### Relatórios
- `GET /api/reports/dashboard` - Dashboard geral
- `GET /api/reports/assets` - Relatório de patrimônio
- `GET /api/reports/stock` - Relatório de estoque
- `GET /api/reports/invoices` - Relatório fiscal

## 🛡️ Segurança

- Autenticação JWT
- Senhas criptografadas com bcrypt
- Guards de rota no frontend
- Middleware de autenticação no backend
- Autorização por perfil (Admin, Supervisor, User)
- CORS configurado

## 🧪 Testes

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📦 Build para Produção

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
ng build --configuration production
```

Os arquivos compilados estarão em `frontend/dist/`

## 🐛 Solução de Problemas

### Erro de conexão com PostgreSQL
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `.env`
- Verifique se o banco de dados foi criado

### Erro de CORS
- Verifique se o `CORS_ORIGIN` no `.env` está correto
- Confirme se o frontend está rodando na porta correta

### Erro "Token inválido"
- Faça logout e login novamente
- Limpe o localStorage do navegador
- Verifique se o `JWT_SECRET` não foi alterado

## 📝 Licença

MIT

## 👥 Suporte

Para suporte, abra uma issue no repositório do projeto.

---

**Desenvolvido com ❤️ usando Angular 17+ e Node.js**
