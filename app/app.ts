import express from "express";
import UsuarioRoutes from "./routes/UsuarioRoutes";
import { AppDataSource } from "./database/data-source";

const app = express();
app.use(express.json()); // Middleware para Json

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API na porta 3000"));

// Rotas de usuário
app.use("/usuarios", UsuarioRoutes);

// Inicializar a conexão com o banco
AppDataSource.initialize()
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar no banco", err);
  });

export default app;
