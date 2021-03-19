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
    cy.getBySel("viewListing").eq(3).click();

    cy.getBySel("title").should("contain", "Volvo 240");
    cy.getBySel("price").should("contain", "20000");
    cy.getBySel("ownerName").should("contain", "Ola Halvorsen");
    cy.getBySel("ownerPhone").should("contain", "98765432");

    cy.getBySel("homeBtn").click();

    cy.getBySel("listingOverview").should("contain", "Volvo 240");
    cy.getBySel("listingOverview").should("contain", "20000");
  });

  it("redigere annonsene mine (P3)", () => {
    cy.getBySel("homeBtn").click();

    cy.getBySel("editListing").eq(0).click();
    cy.get("input[name=title]").type(" veldig fin");
    cy.getBySel("submit").click();

    cy.getBySel("listingTitle").should("contain", "Sykkel veldig fin");
  });

  it("slette annonsene mine (P3)", () => {
    cy.getBySel("deleteListing").eq(0).click();
    cy.getBySel("listingTitle")
      .eq(0)
      .should("not.contain", "Sykkel veldig fin");
    cy.getBySel("deleteListing").should("have.length", 2);
  });

  it("markere annonsen min som solgt (P5)", () => {
    cy.logout();
    cy.get("input[name=sold]").should("not.exist");
    cy.login("ola", "ola");

    cy.get("input[name=sold]").should("have.length", 2);
    cy.get("input[name=sold]").eq(0).should("not.be.checked");
    cy.get("input[name=sold]").eq(0).check();
    cy.get("input[name=sold]").eq(0).should("be.checked");
    cy.get("input[name=sold]").eq(0).uncheck();
    cy.get("input[name=sold]").eq(0).should("not.be.checked");
  });
});
