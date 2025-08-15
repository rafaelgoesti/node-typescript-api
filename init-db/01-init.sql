-- Script de inicialização do banco de dados
-- Este arquivo será executado automaticamente quando o container PostgreSQL for criado

-- Criar o banco de dados se não existir
CREATE DATABASE api_node_db;

-- Garantir que o usuário postgres tem permissões
GRANT ALL PRIVILEGES ON DATABASE api_node_db TO postgres;
