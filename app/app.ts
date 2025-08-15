import "reflect-metadata";
import * as express from "express";
import UsuarioRoutes from "./routes/UsuarioRoutes";
import { AppDataSource } from "./database/data-source";
import { setupSwagger } from "./config/swagger";

const app = express();
app.use(express.json()); // Middleware para Json

const PORT = process.env.PORT || 3000;

// Configurar Swagger
setupSwagger(app);

// Rotas de usuário
app.use("/usuarios", UsuarioRoutes);

// Rota de status da API
app.get("/", (req, res) => {
  res.json({
    message: "🚀 Node.js TypeScript API está funcionando!",
    version: "1.0.0",
    author: "Rafael Góes",
    documentation: "/api-docs",
    endpoints: {
      users: "/usuarios",
      documentation: "/api-docs",
      health: "/health"
    }
  });
});

// Rota de health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Inicializar a conexão com o banco
AppDataSource.initialize()
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs`);
      console.log(`🔍 API Health Check: http://localhost:${PORT}/health`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco", err);
  });

export default app;
