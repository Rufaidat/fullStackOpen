describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("user can login", function () {
    cy.get("input:first").type("Qiyamat");
    cy.get("input:last").type("Qiyam'arht");
    cy.contains("login").click();
    cy.contains("blogs");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.get("input:first").type("Qiyamat");
      cy.get("input:last").type("Qiyam'arht");
      cy.contains("login").click();
      cy.contains("blogs");
    });

    it("a new blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("cypress");
      cy.get("#url").type("cypressblog.com");
      cy.contains("create").click();
      cy.contains("a blog created by cypress");
    });
  });
});
