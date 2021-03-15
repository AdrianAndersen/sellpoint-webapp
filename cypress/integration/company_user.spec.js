describe("Som bedrift vil jeg kunne", () => {
  before(() => {
    cy.visit("/");
  });

  it("lage reklamer (B1)", () => {
    cy.login("erna", "erna");

    cy.getBySel("navNewAdBtn").click();
    cy.get("input[name=title]").type("Elkjøp");
    cy.get("textarea[name=link]").type("https://www.elkjop.no");
    cy.get("textarea[name=imageURL]").type(
      "https://upload.wikimedia.org/wikipedia/commons/4/42/Elkjop_logo_blue.png"
    );
    cy.getBySel("submit").click();
  });

  it("slette reklamer (B3)", () => {
    cy.getBySel("deleteAdBtn").click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.getBySel("deleteAdBtn").should("not.exist");
  });
});
