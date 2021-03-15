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
});
