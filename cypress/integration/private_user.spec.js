describe("Som privatbruker vil jeg kunne", () => {
  before(() => {
    cy.visit("/");
  });

  it("legge ut en annonse med bilde og tekst (P1)", () => {
    cy.login("ola", "ola");

    cy.getBySel("navNewListingBtn").click();

    cy.get("input[name=title]").type("Volvo 240");
    cy.get("textarea[name=desc]").type("En ganske nais Volvo 240.");
    cy.get("input[name=price]").type("20000");
    cy.get("textarea[name=imageURL]").type(
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/1990_volvo_240dl_wagon_4.jpg"
    );
    cy.getBySel("submit").click();
    cy.getBySel("viewListing").eq(2).click();

    cy.getBySel("title").should("contain", "Volvo 240");
    cy.getBySel("price").should("contain", "20000");
    cy.getBySel("ownerName").should("contain", "Ola Halvorsen");
    cy.getBySel("ownerPhone").should("contain", "98765432");

    cy.getBySel("homeBtn").click();

    cy.getBySel("listingOverview").should("contain", "Volvo 240");
    cy.getBySel("listingOverview").should("contain", "20000");
  });
});
