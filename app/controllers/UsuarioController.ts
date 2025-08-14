import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";

//O controller lida com a requisição e a resposta HTTP
export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  // Método para criar um usuário
  CriarUsuario = async (req: Request, res: Response) => {
    try {
      // Extrai dados do corpo da requisição
      const { nome, email, idade, cpf, senha, criadoEm } = req.body;

      // Chama o serviço para criar
      const usuario = await this.usuarioService.criarUsuario({
        nome,
        email,
        idade,
        cpf,
        senha,
        criadoEm,
      });

      // Retorna com status 201 (criado)
      res.status(201).json(usuario);
    } catch (err) {
      // Em caso de erro, retorna 400 (requisição inválida)
      res.status(400).json({ erro: (err as Error).message });
    }
  };

  // Método para listar usuários
  listarUsuarios = async (req: Request, res: Response) => {
    const usuarios = await this.usuarioService.listarUsuarios();

    // Retorna todos os dados dos usuários, incluindo a senha hash
    res.json(usuarios);
  };

  // Método para autenticar usuário (login)
  autenticarUsuario = async (req: Request, res: Response) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ erro: "Email e senha são obrigatórios" });
      }

      // Busca o usuário pelo email
      const usuario = await this.usuarioService.buscarPorEmail(email);

      if (!usuario) {
        return res.status(401).json({ erro: "Credenciais inválidas" });
      }

      // Verifica se a senha está correta
      const senhaValida = await this.usuarioService.verificarSenha(
        senha,
        usuario.senha
      );

      if (!senhaValida) {
        return res.status(401).json({ erro: "Credenciais inválidas" });
      }

      // Retorna sucesso (sem a senha)
      const { senha: _, ...usuarioSemSenha } = usuario;
      res.json({
        message: "Autenticação realizada com sucesso",
        usuario: usuarioSemSenha,
      });
    } catch (err) {
      res.status(500).json({ erro: (err as Error).message });
    }
  };

  // Método para buscar usuário por ID
  buscarUsuarioPorId = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ erro: "ID é obrigatório" });
      }

      const usuarioId = parseInt(id);

      if (isNaN(usuarioId)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      const usuario = await this.usuarioService.buscarPorId(usuarioId);

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      res.json(usuario);
    } catch (err) {
      res.status(500).json({ erro: (err as Error).message });
    }
  };

  // Método para atualizar usuário
  atualizarUsuario = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ erro: "ID é obrigatório" });
      }

      const usuarioId = parseInt(id);

      if (isNaN(usuarioId)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      const dadosAtualizacao = req.body;

      const usuarioAtualizado = await this.usuarioService.atualizarUsuario(
        usuarioId,
        dadosAtualizacao
      );

      res.json({
        message: "Usuário atualizado com sucesso",
        usuario: usuarioAtualizado,
      });
    } catch (err) {
      res.status(400).json({ erro: (err as Error).message });
    }
  };

  // Método para excluir usuário
  excluirUsuario = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ erro: "ID é obrigatório" });
      }

      const usuarioId = parseInt(id);

      if (isNaN(usuarioId)) {
        return res.status(400).json({ erro: "ID inválido" });
      }

      const sucesso = await this.usuarioService.excluirUsuario(usuarioId);

      if (sucesso) {
        res.json({ message: "Usuário excluído com sucesso" });
      } else {
        res.status(500).json({ erro: "Erro ao excluir usuário" });
      }
    } catch (err) {
      res.status(400).json({ erro: (err as Error).message });
    }
  };
}
