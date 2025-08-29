beforeEach(() => {
  cy.visit("http://localhost:3000/");
  cy.clearAllLocalStorage();
});

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

    const randomEmail = `user_${Date.now()}@example.com`;
    const randomLogin = `user${Date.now()}`;

    cy.register({
      full_name: "Test User",
      login: randomLogin,
      email: randomEmail,
      password: "password123@",
      confirmPassword: "password123@",
    });
    cy.wait("@register").its("response.statusCode").should("eq", 200);
  });
});
