beforeEach(() => {
  cy.visit("http://localhost:3000/");
  cy.clearAllLocalStorage();
});

describe("Login", () => {
  
  // Cenário: Login com usuário inexistente
  it("User: Usuário não existe", () => {
    cy.get('[data-cy="input-user"]').type("testuser123", {
      delay: 100,
    });
    cy.get('[data-cy="input-password"]').type("password123", { delay: 100 });
    cy.get('[data-cy="button-login"]').click();
    cy.contains("Usuário ou senha incorretos!");
  });

  // Cenário: Login com usuário inexistente
  it("Password: Invalid password", () => {
    cy.get('[data-cy="input-user"]').type("testuser", {
      delay: 100,
    });
    cy.get('[data-cy="input-password"]').type("password123", { delay: 100 });
    cy.get('[data-cy="button-login"]').click();
    cy.contains("Usuário ou senha incorretos!");
  });
  
    // Cenário: Login com usuário existente
  it("Successful login", () => {
    cy.get('[data-cy="input-user"]').type("testuser", {
      delay: 100,
    });
    cy.get('[data-cy="input-password"]').type("password123@", { delay: 100 });

    cy.intercept("POST", "**/api/login").as("login");
    cy.intercept("POST", "**/api/getMyUser").as("myUser");
    cy.get('[data-cy="button-login"]').click();

    cy.wait("@login").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "/");
    cy.wait("@myUser").its("response.statusCode").should("eq", 200);
    cy.contains("Meus uploads");
  });
});
