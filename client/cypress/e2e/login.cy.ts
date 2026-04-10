describe("login", () => {
   beforeEach(() => {
      cy.visit("/");
   });

   it("affiche le formulaire login", () => {
      cy.get('input[name="email"]').should("be.visible");
      cy.get('input[name="password"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
   });

   it("login reussi avec bon identifiants", () => {
      cy.get('input[name="email"]').type("test@yahoo.fr");
      cy.get('input[name="password"]').type("admin");
      cy.get('button[type="submit"]').click();

      cy.url().should("include", "/dashboard");
   });

   it("affiche une alerte si indentifiants invalides", () => {
      cy.get('input[name="email"]').type("wrongmail@yahoo.fr");
      cy.get('input[name="password"]').type("wrongpassword");
      cy.get('button[type="submit"]').click();

      cy.get(".alert").should("be.visible");
   });
});
