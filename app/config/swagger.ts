import * as swaggerJSDoc from "swagger-jsdoc";
import * as swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js TypeScript API",
      version: "1.0.0",
      description:
        "API RESTful desenvolvida com Node.js, TypeScript, Express e PostgreSQL",
      contact: {
        name: "Rafael Góes",
        email: "rafael.goes@email.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desenvolvimento",
      },
      {
        url: "https://api.rafaelgoes.dev",
        description: "Servidor de produção",
      },
    ],
    components: {
      schemas: {
        Usuario: {
          type: "object",
          required: ["nome", "email", "cpf", "senha"],
          properties: {
            id: {
              type: "integer",
              description: "ID único do usuário",
              example: 1,
            },
            nome: {
              type: "string",
              description: "Nome completo do usuário",
              example: "Rafael Góes",
              minLength: 2,
              maxLength: 100,
            },
            email: {
              type: "string",
              format: "email",
              description: "Email único do usuário",
              example: "rafael.goes@email.com",
            },
            idade: {
              type: "integer",
              description: "Idade do usuário",
              example: 28,
              minimum: 18,
              maximum: 120,
            },
            cpf: {
              type: "string",
              description: "CPF do usuário (formato: 000.000.000-00)",
              example: "123.456.789-00",
              pattern: "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$",
            },
            senha: {
              type: "string",
              description: "Senha do usuário (mínimo 6 caracteres)",
              example: "MinhaSenh@123",
              minLength: 6,
              writeOnly: true,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Data de criação do usuário",
              example: "2024-01-15T10:30:00.000Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Data da última atualização",
              example: "2024-01-15T10:30:00.000Z",
            },
          },
        },
        UsuarioCreate: {
          type: "object",
          required: ["nome", "email", "cpf", "senha"],
          properties: {
            nome: {
              type: "string",
              description: "Nome completo do usuário",
              example: "Rafael Góes",
              minLength: 2,
              maxLength: 100,
            },
            email: {
              type: "string",
              format: "email",
              description: "Email único do usuário",
              example: "rafael.goes@email.com",
            },
            idade: {
              type: "integer",
              description: "Idade do usuário",
              example: 28,
              minimum: 18,
              maximum: 120,
            },
            cpf: {
              type: "string",
              description: "CPF do usuário (formato: 000.000.000-00)",
              example: "123.456.789-00",
              pattern: "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$",
            },
            senha: {
              type: "string",
              description: "Senha do usuário (mínimo 6 caracteres)",
              example: "MinhaSenh@123",
              minLength: 6,
            },
          },
        },
        UsuarioLogin: {
          type: "object",
          required: ["email", "senha"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "Email do usuário",
              example: "rafael.goes@email.com",
            },
            senha: {
              type: "string",
              description: "Senha do usuário",
              example: "MinhaSenh@123",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Mensagem de erro",
              example: "Erro interno do servidor",
            },
            status: {
              type: "integer",
              description: "Código de status HTTP",
              example: 500,
            },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Mensagem de erro de validação",
              example: "Dados inválidos",
            },
            errors: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Lista de erros de validação",
              example: ["Email é obrigatório", "CPF deve ter formato válido"],
            },
          },
        },
      },
      responses: {
        NotFound: {
          description: "Recurso não encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message: "Usuário não encontrado",
                status: 404,
              },
            },
          },
        },
        ValidationError: {
          description: "Erro de validação",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ValidationError",
              },
            },
          },
        },
        InternalServerError: {
          description: "Erro interno do servidor",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
              example: {
                message: "Erro interno do servidor",
                status: 500,
              },
            },
          },
        },
      },
    },
  },
  apis: ["./app/routes/*.ts", "./app/controllers/*.ts"], // Caminhos para os arquivos com anotações Swagger
};

const specs = swaggerJSDoc(options);

export const setupSwagger = (app: Application): void => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "API Documentation - Rafael Góes",
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  );

  // Endpoint para obter a especificação JSON
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(specs);
  });
};

export default specs;
