# Node.js TypeScript API

Uma API RESTful moderna desenvolvida com Node.js, TypeScript, Express e PostgreSQL, utilizando TypeORM para gerenciamento de banco de dados e bcryptjs para hash de senhas.

## 🚀 Características

- ✅ **TypeScript** - Tipagem estática
- ✅ **Express.js** - Framework web minimalista  
- ✅ **PostgreSQL** - Banco de dados robusto
- ✅ **TypeORM** - ORM TypeScript/JavaScript
- ✅ **bcryptjs** - Hash seguro de senhas
- ✅ **Docker** - Containerização completa
- ✅ **Validações** - Validações rigorosas de dados
- ✅ **Arquitetura em camadas** - Controller, Service, Repository

## 📋 Pré-requisitos

- Node.js (v18+)
- PostgreSQL (v15+)
- Docker & Docker Compose (opcional)

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/rafaelgoesti/node-typescript-api.git
cd node-typescript-api
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=api_node_db
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
NODE_ENV=development
PORT=3000
```

### 4. Configuração do Banco de Dados

#### Opção A: PostgreSQL Local
1. Instale o PostgreSQL
2. Crie um banco de dados:
```sql
CREATE DATABASE api_node_db;
```

#### Opção B: PostgreSQL com Docker
```bash
npm run docker:dev
```

### 5. Execute a aplicação
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

A API estará disponível em `http://localhost:3000`

## 🐳 Configuração com Docker

### Pré-requisitos
- Docker
- Docker Compose

### Estrutura Docker
Todos os arquivos Docker estão organizados na pasta `docker/`:
- `docker/docker-compose.yml` - Configuração completa (API + PostgreSQL)
- `docker/docker-compose.dev.yml` - Configuração para desenvolvimento (apenas PostgreSQL)
- `docker/Dockerfile` - Imagem Docker para a aplicação Node.js
- `docker/init-db/` - Scripts de inicialização do banco
- `docker/.env` - Variáveis de ambiente específicas para Docker

### Opções de Execução

#### 1. Apenas PostgreSQL (Desenvolvimento Local)
Para executar apenas o banco PostgreSQL e rodar a API localmente:

```bash
# Iniciar apenas o PostgreSQL
npm run docker:dev

# Rodar a API localmente
npm run dev

# Parar o PostgreSQL
npm run docker:dev:down
```

#### 2. Aplicação Completa (API + PostgreSQL)
Para executar toda a aplicação em containers:

```bash
# Iniciar toda a aplicação
npm run docker:full

# Ver logs em tempo real
npm run docker:logs

# Parar toda a aplicação
npm run docker:full:down
```

### Configuração de Ambiente

1. As variáveis de ambiente são automaticamente carregadas do arquivo `.env` na raiz do projeto
2. Para Docker, você pode também ajustar as variáveis em `docker/.env`

### Variáveis de Ambiente

| Variável | Descrição | Valor Padrão |
|----------|-----------|--------------|
| `DB_HOST` | Host do banco de dados | localhost |
| `DB_PORT` | Porta do banco de dados | 5432 |
| `DB_NAME` | Nome do banco de dados | api_node_db |
| `DB_USER` | Usuário do banco | postgres |
| `DB_PASSWORD` | Senha do banco | postgres123 |
| `NODE_ENV` | Ambiente da aplicação | development |
| `PORT` | Porta da aplicação | 3000 |

## 📋 Endpoints da API

### Usuários

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/usuarios` | Criar novo usuário |
| `GET` | `/usuarios` | Listar todos os usuários |
| `GET` | `/usuarios/:id` | Buscar usuário por ID |
| `PUT` | `/usuarios/:id` | Atualizar usuário |
| `DELETE` | `/usuarios/:id` | Excluir usuário |
| `POST` | `/usuarios/login` | Autenticar usuário |

### Exemplo de Uso

#### Criar Usuário
```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@email.com",
    "idade": 25,
    "cpf": "123.456.789-00",
    "senha": "MinhaSenh@123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:3000/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "senha": "MinhaSenh@123"
  }'
```

## 🔐 Segurança

- As senhas são automaticamente hasheadas usando bcryptjs
- Validações rigorosas de entrada de dados
- Verificação de email único

## 🚀 Desenvolvimento

### Instalação
```bash
npm install
```

### Executar em modo desenvolvimento
```bash
npm run dev
```

### Build para produção
```bash
npm run build
npm start
```
