// Arquivos principais do servidor
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "../model/Usuario";
import * as dotenv from "dotenv";

// Carrega as variáveis de ambiente
dotenv.config();

// Configurações de conexão
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres123",
  database: process.env.DB_NAME || "api_node_db",
  synchronize: true,
  logging: false,
  entities: [Usuario], // Registrar entidade
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
