describe("Som en admin vil jeg kunne", () => {
  before(() => {
    cy.visit("/");
  });

  it("slette annonser (A1)", () => {
    cy.login("admin", "admin");

    cy.getBySel("listingOverview").should("contain", "Sykkel");
    cy.getBySel("listingOverview").contains("Slett").click();
    cy.getBySel("listingOverview").should("not.contain", "Sykkel");
  });

  it("slette brukere (A4)", () => {
    cy.login("admin", "admin");

    cy.getBySel("navAdminBtn").click();

    cy.get("input[name=userToDelete]").type("Ola Halvorsen{downarrow}{enter}");
    cy.getBySel("deleteUserBtn").click();

    cy.login("ola", "ola");
    cy.on("window:alert", (str) => expect(str).to.equal("Feil passord!"));
  });
});
