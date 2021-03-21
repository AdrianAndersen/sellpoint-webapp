describe("Som en admin vil jeg kunne", () => {
  before(() => {
    cy.intercept("/api/*").as("loadPage");
    cy.visit("/");
    cy.wait("@loadPage");
  });

  it("slette annonser (A1)", () => {
    cy.login("admin", "admin");

    cy.getBySel("selSort").click();
    cy.get("[data-value=low]").click();
    cy.getBySel("listingOverview").should("contain", "Sykkel");
    cy.getBySel("deleteListing").eq(0).click();
    cy.getBySel("listingOverview").should("not.contain", "Sykkel");
  });

  it("legge inn kategorier (A2)", () => {
    cy.login("admin", "admin");

    cy.getBySel("navAdminBtn").click();
    cy.getBySel("newCategoryField").type("Elsykkel");
    cy.getBySel("newCategoryBtn").click();
    cy.getBySel("homeBtn").click();
    cy.getBySel("categorySelect").click();
    cy.get("[data-value=Elsykkel]").should("exist");
    cy.get("body").type("{esc}"); // Hide the select menu
  });

  it("slette reklamer (A3)", () => {
    cy.interceptDB();
    cy.getBySel("deleteAdBtn").click();
    cy.waitDB();
    cy.interceptDB();
    cy.getBySel("deleteAdBtn").click();
    cy.waitDB();
    cy.interceptDB();
    cy.getBySel("deleteAdBtn").click();
    cy.waitDB();

    cy.getBySel("deleteAdBtn").should("not.exist");
  });

  it("slette brukere (A4)", () => {
    cy.login("admin", "admin");

    cy.getBySel("navAdminBtn").click();
    cy.get("input[name=userToDelete]").type("Ola Halvorsen{downarrow}{enter}");
    cy.getBySel("deleteUserBtn").click();

    cy.getBySel("homeBtn").click();
    cy.getBySel("listingOverview").should("not.contain", "Volvo 240");

    cy.login("ola", "ola");
    cy.on("window:alert", (str) => expect(str).to.equal("Feil passord!"));
  });
});
