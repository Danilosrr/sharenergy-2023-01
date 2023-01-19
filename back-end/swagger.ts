export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Desafio Sharenergy",
    description:
      "Essa documentação registra as rotas da Api construida para o desafio técnico da Sharenergy. Você pode testar a api usando o `token` retornado na rota de usuário(/signin) como authorization para as demais rotas.",
    version: "1.0.0",
    contact: {
      url: "https://github.com/Danilosrr",
    },
  },
  host: "http://localhost:" + process.env.PORT,
  basePath: "/",
  tags: [
    {
      name: "Usuário",
      description: "Ações do usuário",
    },
    {
      name: "Clientes",
      description: "Gestão de clientes",
    },
  ],
  schemes: ["http"],
  paths: {
    "/signin": {
      post: {
        description: "logar na aplicação",
        tags: ["Usuário"],
        requestBody: {
          description: "dados do usuário",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RequestUser",
              },
            },
          },
        },
        responses: {
          200: {
            description: "login realizado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Token",
                },
              },
            },
          },
          403: { description: "usuário ou senha incorretos" },
          404: { description: "usuário não encontrado" },
        },
      },
    },
    "/client": {
      post: {
        description: "Cadastrar cliente",
        tags: ["Clientes"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          description: "dados para cadastro de um cliente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RequestClient",
              },
            },
          },
        },
        responses: {
          200: {
            description: "cadastro realizado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ResponseClient",
                },
              },
            },
          },
          409: { description: "nome, cpf ou email já cadastrados" },
          422: { description: "corpo da requisição inválido" },
        },
      },
      get: {
        description: "Clientes registrados",
        tags: ["Clientes"],
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/ResponseClient",
                  },
                },
              },
            },
          },
          400: { description: "token sem autorização" },
          401: { description: "token ausente" },
          498: { description: "token inválido" },
        },
      },
      put: {
        description: "Atualizar dados do cliente",
        tags: ["Clientes"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          description: "dados para cadastro de um cliente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ResponseClient",
              },
            },
          },
        },
        responses: {
          200: {
            description: "cadastro realizado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ResponseClient",
                },
              },
            },
          },
          404: { description: "cliente não encontrado" },
          409: { description: "nome, cpf ou email já cadastrados" },
          422: { description: "corpo da requisição inválido" },
        },
      },
      delete: {
        description: "Deletar cliente",
        tags: ["Clientes"],
        security: [{ bearerAuth: [] }],
        requestBody: {
          description: "dados para cadastro de um cliente",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Id",
              },
            },
          },
        },
        responses: {
          200: {
            description: "cadastro realizado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ResponseClient",
                },
              },
            },
          },
          404: { description: "cliente não encontrado" },
          422: { description: "corpo da requisição inválido" },
        },
      },
    },
  },
  components: {
    schemas: {
      RequestClient: {
        type: "object",
        required: ["name", "cpf", "email", "phone", "address"],
        properties: {
          name: {
            type: "string",
            description: "nome do cliente",
            example: "John Doe",
          },
          cpf: {
            type: "number",
            description: "cpf do cliente, sem separadores",
            example: 12345678910,
          },
          email: {
            type: "string",
            description: "email do cliente",
            example: "email@email.com",
          },
          phone: {
            type: "number",
            description: "número com DDD sem separadores",
            example: 99999999999,
          },
          address: {
            type: "string",
            description: "endereço do cliente",
            example: "Rua, número, bairro, estado",
          },
        },
      },
      ResponseClient: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "id do cliente",
            format: "objectId",
          },
          name: {
            type: "string",
            description: "nome do cliente",
            example: "John Doe",
          },
          cpf: {
            type: "number",
            description: "cpf do cliente, sem separadores",
            example: 12345678910,
          },
          email: {
            type: "string",
            description: "email do cliente",
            example: "email@email.com",
          },
          phone: {
            type: "number",
            description: "número com DDD sem separadores",
            example: 99999999999,
          },
          address: {
            type: "string",
            description: "endereço do cliente",
            example: "Rua, número, bairro, estado",
          },
        },
      },
      RequestUser: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: {
            type: "string",
            description: "usuário",
            example: process.env.SHARENERGY_ADMIN,
          },
          password: {
            type: "string",
            description: "senha",
            example: process.env.SHARENERGY_PASSWORD,
          },
        },
      },
      Token: {
        type: "object",
        properties: {
          token: {
            type: "string",
            description: "token",
            format: "JWT",
          },
        },
      },
      Id: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "string",
            description: "id do cliente",
            format: "objectId",
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        description: "autenticação utilizando JWT",
        type: "http",
        scheme: "bearer",
        format: "JWT",
      },
    },
  },
};
