# Segurança da API - Hash de Senhas

## Implementação de Hash nas Senhas

### O que foi implementado:

1. **Hash de senhas com bcryptjs**:

   - As senhas dos usuários agora são automaticamente criptografadas usando bcryptjs
   - Salt rounds configurado para 10 (nível de segurança adequado)
   - Senhas são hasheadas antes de serem salvas no banco de dados

2. **Verificação de senhas**:

   - Método `verificarSenha()` para comparar senhas fornecidas com os hashes armazenados
   - Utilizado para autenticação de usuários

3. **Endpoint de autenticação**:

   - Nova rota `POST /usuarios/login` para autenticar usuários
   - Recebe email e senha, retorna informações do usuário (sem a senha)

4. **Proteção de dados sensíveis**:
   - Senhas hasheadas não são retornadas nas listagens de usuários
   - Endpoint de login não expõe a senha hasheada

### Como usar:

#### Criar usuário:

```bash
POST /usuarios
{
  "nome": "Rafael Góes",
  "email": "rafaelgoes@email.com",
  "idade": 20,
  "cpf": "123.456.789-00",
  "senha": "MinhaSenh@123"
}
```

#### Fazer login:

```bash
POST /usuarios/login
{
  "email": "rafaelgoes@email.com",
  "senha": "MinhaSenh@123"
}
```

### Segurança:

- **bcryptjs**: Biblioteca reconhecida e segura para hash de senhas
- **Salt automático**: Cada senha tem um salt único, protegendo contra rainbow table attacks
- **Custo computacional**: Salt rounds = 10 oferece boa proteção sem impacto excessivo na performance
- **Validação**: Senhas ainda precisam atender aos critérios de complexidade definidos

### Dependências adicionadas:

- `bcryptjs`: Para hash e verificação de senhas
- `@types/bcryptjs`: Tipos TypeScript para bcryptjs
