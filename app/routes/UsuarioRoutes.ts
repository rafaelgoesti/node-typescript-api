import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

// Criar o roteador
const router = Router();
const usuarioController = new UsuarioController();

// POST /usuarios -> criar novo usuário
router.post("/", usuarioController.CriarUsuario);

//GET /usuarios -> listar usuários
router.get("/", usuarioController.listarUsuarios);

// GET /usuarios/:id -> buscar usuário por ID
router.get("/:id", usuarioController.buscarUsuarioPorId);

// PUT /usuarios/:id -> atualizar usuário
router.put("/:id", usuarioController.atualizarUsuario);

// DELETE /usuarios/:id -> excluir usuário
router.delete("/:id", usuarioController.excluirUsuario);

// POST /usuarios/login -> autenticar usuário
router.post("/login", usuarioController.autenticarUsuario);

export default router;
