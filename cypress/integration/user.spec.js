describe("Som en privatperson / bedrift vil jeg kunne", () => {
  before(() => {
    cy.visit("/");
  });
  beforeEach(() => {
    cy.logout();
  });

  it("logge inn som en eksisterende bruker (U1)", () => {
    cy.login("erna", "erna");

    cy.url().should("include", "/");

    cy.getBySel("loginBtn").should("contain", "Logg ut");
  });

  it("opprette en privatbruker og logge inn (U1)", () => {
    cy.getBySel("loginBtn").click();
    cy.getBySel("registerLink").click();

    cy.get("input[name=name]").type("Lars");
    cy.get("input[name=phoneNumber]").type("567890");
    cy.get("input[name=username]").type("lars");
    cy.get("input[name=password]").type("batteryhorsestaple");
    cy.getBySel("googleMap").click()
    cy.getBySel("signUpPrivateSubmit").click();

    cy.url().should("include", "/");
    cy.getBySel("loginBtn").should("contain", "Logg ut");
    cy.getBySel("navNewListingBtn").should("contain", "Ny annonse");
    cy.getBySel("navNewAdBtn").should("not.exist");

    cy.login("lars", "batteryhorsestaple");

    cy.getBySel("loginBtn").should("contain", "Logg ut");
    cy.getBySel("navNewListingBtn").should("contain", "Ny annonse");
    cy.getBySel("navNewAdBtn").should("not.exist");
  });

  it("opprette en bedriftsbruker og logge inn (U1)", () => {
    cy.getBySel("loginBtn").click();
    cy.getBySel("registerLink").click();
    cy.getBySel("accountSwitch").click();

    cy.get("input[name=companyName]").type("Henrik Aasheim");
    cy.get("input[name=phone]").type("31415");
    cy.get("input[name=username]").type("henrik");
    cy.get("input[name=password]").type("hemmelig");
    cy.getBySel("googleMap").click()
    cy.getBySel("signUpBusinessSubmit").click();

    cy.url().should("include", "/");
    cy.getBySel("loginBtn").should("contain", "Logg ut");
    cy.getBySel("navNewAdBtn").should("contain", "Ny reklame");
    cy.getBySel("navNewListingBtn").should("not.exist");
  });

  it("se en annonse samt kontaktinfo til privatbrukeren som har annonsen (U7)", () => {
    cy.getBySel("listingOverview").contains("Se mer").click();

    cy.url().should("include", "/listings/1");

    cy.getBySel("title").should("contain", "Sykkel");
    cy.getBySel("price").should("contain", "600");
    cy.getBySel("ownerName").should("contain", "Ola Halvorsen");
    cy.getBySel("ownerPhone").should("contain", "98765432");
  });
});
