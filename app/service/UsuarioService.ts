import { UsuarioRepository } from "../repository/UsuarioRepository";
import { Usuario } from "../model/Usuario";
import * as bcrypt from "bcryptjs";

//A service implementa as regras de negócio
export class UsuarioService {
  private usuarioRepo: UsuarioRepository;

  constructor() {
    this.usuarioRepo = new UsuarioRepository();
  }

  async criarUsuario(Dados: Omit<Usuario, "id">): Promise<Usuario> {
    //Verifica se já existe um usuário com o email informado
    const exite = await this.usuarioRepo.buscarPorEmail(Dados.email);
    if (exite) {
      throw new Error("E-mail já cadastrado");
    }

    // Verifica se o nome tem no mínimo 3 caracteres e no máximo 50 caracteres
    if (!Dados.nome || Dados.nome.length < 3 || Dados.nome.length > 50) {
      throw new Error("O nome deve ter entre 3 e 50 caracteres.");
    }

    // Validação de formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Dados.email)) {
      throw new Error("Formato de e-mail inválido.");
    }

    // Verifica se a senha tem no mínimo 8 caracteres
    const senhaRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaRegex.test(Dados.senha)) {
      throw new Error(
        "A senha deve ter no mínimo 8 caracteres, contendo letras maiúsculas, minúsculas, número e caractere especial."
      );
    }

    // Validação de CPF (formato 000.000.000-00)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(Dados.cpf)) {
      throw new Error("CPF inválido. Formato esperado: 000.000.000-00");
    }

    // Validação de idade
    if (Dados.idade < 18) {
      throw new Error("O usuário deve ser maior ou igual a 18 anos.");
    }

    // Hash da senha antes de salvar
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Dados.senha, saltRounds);

    // Cria objeto com senha hasheada
    const dadosComSenhaHash = {
      ...Dados,
      senha: hashedPassword,
    };

    // Cria e salva o usuário no banco
    return await this.usuarioRepo.criar(dadosComSenhaHash);
  }

  async listarUsuarios(): Promise<Usuario[]> {
    return await this.usuarioRepo.listar();
  }

  async verificarSenha(
    senhaFornecida: string,
    senhaHash: string
  ): Promise<boolean> {
    return await bcrypt.compare(senhaFornecida, senhaHash);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepo.buscarPorEmail(email);
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    return await this.usuarioRepo.buscarPorId(id);
  }

  async atualizarUsuario(
    id: number,
    dados: Partial<Omit<Usuario, "id">>
  ): Promise<Usuario | null> {
    // Verifica se o usuário existe
    const usuarioExistente = await this.usuarioRepo.buscarPorId(id);
    if (!usuarioExistente) {
      throw new Error("Usuário não encontrado");
    }

    // Se está tentando atualizar o email, verifica se já não existe outro usuário com esse email
    if (dados.email && dados.email !== usuarioExistente.email) {
      const emailExiste = await this.usuarioRepo.buscarPorEmail(dados.email);
      if (emailExiste) {
        throw new Error("E-mail já cadastrado");
      }

      // Validação de formato do e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(dados.email)) {
        throw new Error("Formato de e-mail inválido.");
      }
    }

    // Validações para outros campos se estiverem sendo atualizados
    if (dados.nome !== undefined) {
      if (!dados.nome || dados.nome.length < 3 || dados.nome.length > 50) {
        throw new Error("O nome deve ter entre 3 e 50 caracteres.");
      }
    }

    if (dados.cpf !== undefined) {
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      if (!cpfRegex.test(dados.cpf)) {
        throw new Error("CPF inválido. Formato esperado: 000.000.000-00");
      }
    }

    if (dados.idade !== undefined) {
      if (dados.idade < 18) {
        throw new Error("O usuário deve ser maior ou igual a 18 anos.");
      }
    }

    // Se está atualizando a senha, aplica hash
    if (dados.senha) {
      const senhaRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!senhaRegex.test(dados.senha)) {
        throw new Error(
          "A senha deve ter no mínimo 8 caracteres, contendo letras maiúsculas, minúsculas, número e caractere especial."
        );
      }

      const saltRounds = 10;
      dados.senha = await bcrypt.hash(dados.senha, saltRounds);
    }

    return await this.usuarioRepo.atualizar(id, dados);
  }

  async excluirUsuario(id: number): Promise<boolean> {
    // Verifica se o usuário existe
    const usuarioExistente = await this.usuarioRepo.buscarPorId(id);
    if (!usuarioExistente) {
      throw new Error("Usuário não encontrado");
    }

    return await this.usuarioRepo.excluir(id);
  }
}
