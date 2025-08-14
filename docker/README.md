# Docker Configuration

Esta pasta contém todos os arquivos relacionados ao Docker para o projeto.

## Arquivos

- `docker-compose.yml` - Configuração completa (API + PostgreSQL)
- `docker-compose.dev.yml` - Configuração para desenvolvimento (apenas PostgreSQL)
- `Dockerfile` - Imagem Docker para a aplicação Node.js
- `init-db/` - Scripts de inicialização do banco de dados

## Como usar

### Apenas PostgreSQL (Desenvolvimento)
```bash
# A partir da raiz do projeto
npm run docker:dev

# Ver logs
npm run docker:logs:dev

# Parar
npm run docker:dev:down
```

### Aplicação Completa
```bash
# A partir da raiz do projeto
npm run docker:full

# Ver logs
npm run docker:logs

# Parar
npm run docker:full:down
```

### Comandos diretos (a partir da raiz do projeto)
```bash
# Apenas PostgreSQL
docker-compose -f docker/docker-compose.dev.yml up -d

# Aplicação completa
docker-compose -f docker/docker-compose.yml up -d
```

## Portas

- **PostgreSQL**: 5433 (host) → 5432 (container)
- **API**: 3000 (host) → 3000 (container)

## Variáveis de Ambiente

As variáveis de ambiente são configuradas no arquivo `.env` na raiz do projeto.

Para usar com Docker, configure:
- `DB_HOST=localhost`
- `DB_PORT=5433`
