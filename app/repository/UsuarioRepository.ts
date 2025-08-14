import { AppDataSource } from "../database/data-source";
import { Usuario } from "../model/Usuario";
import { Repository } from "typeorm";

// Classe responsável por acessar e manipular dados da entidade User no banco
export class UsuarioRepository {
  // Armazena a instância do repositório do TypeORM para User
  private repo: Repository<Usuario>;

  // Obtém o repositório da entidade User a partir do DataSource
  constructor() {
    this.repo = AppDataSource.getRepository(Usuario);
  }

  // Cria um novo usuário no banco
  // Omit<User, "id"> = tipo User sem o campo "id" (pois ele é gerado automaticamente)
  async criar(Dados: Omit<Usuario, "id">): Promise<Usuario> {
    const novoUsuario = this.repo.create(Dados); // Cria uma instância de User (não salva ainda)
    return await this.repo.save(novoUsuario); // Salva no banco e retorna o objeto persistido
  }

  // Busca um usuário pelo e-mail
  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = await this.repo.find({ where: { email } }); // Filtra por e-mail
    return usuario[0] ?? null; // Retorna o primeiro encontrado ou null se não existir
  }

  // Lista todos os usuários cadastrados
  async listar(): Promise<Usuario[]> {
    return this.repo.find(); // Retorna um array com todos os registros de User
  }

  // Busca um usuário pelo ID
  async buscarPorId(id: number): Promise<Usuario | null> {
    return await this.repo.findOne({ where: { id } });
  }

  // Atualiza um usuário existente
  async atualizar(
    id: number,
    dados: Partial<Omit<Usuario, "id">>
  ): Promise<Usuario | null> {
    await this.repo.update(id, dados);
    return await this.buscarPorId(id);
  }

  // Remove um usuário pelo ID
  async excluir(id: number): Promise<boolean> {
    const resultado = await this.repo.delete(id);
    return (resultado.affected ?? 0) > 0;
  }
}
