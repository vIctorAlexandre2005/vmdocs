beforeEach(() => {
  cy.clearLocalStorage();
  cy.visit("http://localhost:3000");
});

describe("Auth Flow", () => {
  describe("Register", () => {
    // Cenário: Registro com usuário já existente
    it("User: Usuario ja cadastrado", () => {
      cy.contains("Registre-se").click();

      cy.get('[data-cy="input-full-name"]').type("Test User", { delay: 100 });
      cy.get('[data-cy="input-user"]').type("testuser", { delay: 100 });
      cy.get('[data-cy="input-email"]').type("testuser@test.com", {
        delay: 100,
      });
      cy.get('[data-cy="input-password"]').type("password123@", { delay: 100 });
      cy.get('[data-cy="input-confirm-password"]').type("password123@", {
        delay: 100,
      });

      cy.get('[data-cy="button-register"]').click();
      cy.contains("Error: Usuário já existe");
    });

    // Cenário: Registro com senhas diferentes
    it("Senha: senhas diferentes", () => {
      cy.wait(5000);
      cy.contains("Registre-se").click();

      cy.get('[data-cy="input-full-name"]').type("Test User", { delay: 100 });
      cy.get('[data-cy="input-user"]').type("testuser", { delay: 100 });
      cy.get('[data-cy="input-email"]').type("testuser@test.com", {
        delay: 100,
      });
      cy.get('[data-cy="input-password"]').type("password123@", { delay: 100 });
      cy.get('[data-cy="input-confirm-password"]').type("password456@", {
        delay: 100,
      });

      cy.get('[data-cy="button-register"]').click();
      cy.contains("Senhas não coincidem!");
    });

    // Cenário: Registro com email inválido
    it("Email: Formato inválido", () => {
      cy.intercept("POST", "**/api/register").as("register");
      cy.contains("Registre-se").click();

      cy.get('[data-cy="input-full-name"]').type("Test User", { delay: 100 });
      cy.get('[data-cy="input-user"]').type("testuser", { delay: 100 });
      cy.get('[data-cy="input-email"]').type("testuser", { delay: 100 });
      cy.get('[data-cy="input-password"]').type("password123@", { delay: 100 });
      cy.get('[data-cy="input-confirm-password"]').type("password123@", {
        delay: 100,
      });

      cy.get('[data-cy="button-register"]').click();
      cy.wait("@register").its("response.statusCode").should("eq", 500);
      cy.contains(
        "Error: Falha no registro, tente novamente. Verifique se todos os campos estão preenchidos corretamente."
      );
    });

    // Cenário: Registro com senha sem caractere especial
    it("Senha: sem caractere especial", () => {
      cy.contains("Registre-se").click();

      cy.get('[data-cy="input-full-name"]').type("Test User", { delay: 100 });
      cy.get('[data-cy="input-user"]').type("testuser", { delay: 100 });
      cy.get('[data-cy="input-email"]').type("testuser@test.com", {
        delay: 100,
      });
      cy.get('[data-cy="input-password"]').type("password123", { delay: 100 });
      cy.get('[data-cy="input-confirm-password"]').type("password123", {
        delay: 100,
      });

      cy.get('[data-cy="button-register"]').click();
      cy.contains("Error: Senha deve conter pelo menos um caractere especial");
    });

    // Cenário: Registro com sucesso
    it(" Success: Successful registration", () => {
      cy.intercept("POST", "**/api/register").as("register");
      cy.contains("Registre-se").click();

      const randomEmail = `user_${Date.now()}@example.com`;
      const randomUsername = `user${Date.now()}`;

      cy.get('[data-cy="input-full-name"]').type("Test User", { delay: 100 });
      cy.get('[data-cy="input-user"]').type(randomUsername, { delay: 100 });
      cy.get('[data-cy="input-email"]').type(randomEmail, { delay: 100 });
      cy.get('[data-cy="input-password"]').type("password123@", { delay: 100 });
      cy.get('[data-cy="input-confirm-password"]').type("password123@", {
        delay: 100,
      });

      cy.get('[data-cy="button-register"]').click();

      cy.wait("@register").its("response.statusCode").should("eq", 200);
    });
  });

  describe("Login", () => {
    before(() => {
      // garante que o usuário existe no banco
      cy.request({
        method: "POST",
        url: "http://localhost:8080/api/register",
        body: {
          full_name: "Test User",
          login: "testuser",
          email: "testuser@test.com",
          password: "password123@",
        },
        failOnStatusCode: false, // não quebra se já existir (400)
      }).then((res) => {
        expect([200, 400]).to.include(res.status);
      });
    });

    it("Login with existing user", () => {
      cy.get('[data-cy="input-user"]').type("testuser", {
        delay: 100,
      });
      cy.get('[data-cy="input-password"]').type("password123@", { delay: 100 });

      cy.intercept("POST", "**/api/login").as("login");
      cy.get('[data-cy="button-login"]').click();

      cy.wait("@login").its("response.statusCode").should("eq", 200);
      cy.url().should("include", "/");
      cy.contains("Meus uploads");
    });
  });
});
