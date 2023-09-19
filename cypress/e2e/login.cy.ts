describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5000/");
  });

  it("should display error message when fields are empty", () => {
    cy.get("form").submit();
    cy.on("window:alert", (message) => {
      expect(message).to.equal("Por favor, preencha todos os campos!");
    });
  });

  it("should display success message and redirect to dashboard on successful login", () => {
    cy.intercept("POST", "http://localhost:3000/auth/login", {
      statusCode: 200,
    }).as("loginRequest");

    cy.get('input[name="username"]').type("myusername");
    cy.get('input[name="password"]').type("mypassword");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");
    cy.url().should("include", "/dashboard");
  });

  it("should display error message when user is not found", () => {
    cy.intercept("POST", "http://localhost:3000/auth/login", {
      statusCode: 404,
    }).as("loginRequest");

    cy.get('input[name="username"]').type("nonexistentuser");
    cy.get('input[name="password"]').type("mypassword");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");
    cy.on("window:alert", (message) => {
      expect(message).to.equal("Utilizador não encontrado!");
    });
  });

  it("should display error message when credentials are invalid", () => {
    cy.intercept("POST", "http://localhost:3000/auth/login", {
      statusCode: 401,
    }).as("loginRequest");

    cy.get('input[name="username"]').type("myusername");
    cy.get('input[name="password"]').type("invalidpassword");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");
    cy.on("window:alert", (message) => {
      expect(message).to.equal("Credenciais inválidas!");
    });
  });

  it("should display error message when there is a server problem", () => {
    cy.intercept("POST", "http://localhost:3000/auth/login", {
      statusCode: 500,
    }).as("loginRequest");

    cy.get('input[name="username"]').type("myusername");
    cy.get('input[name="password"]').type("mypassword");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginRequest");
    cy.on("window:alert", (message) => {
      expect(message).to.equal("Foi encontrado um problema com o servidor!");
    });
  });
});
export {}