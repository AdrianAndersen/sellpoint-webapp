describe("Som en privatperson / bedrift vil jeg kunne", () => {
  before(() => {
    cy.intercept("/api/*").as("loadPage");
    cy.visit("/");
    cy.wait("@loadPage");
    cy.setupDB();
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
    cy.getBySel("googleMap").click();
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
    cy.getBySel("googleMap").click();
    cy.getBySel("signUpBusinessSubmit").click();

    cy.url().should("include", "/");
    cy.getBySel("loginBtn").should("contain", "Logg ut");
    cy.getBySel("navNewAdBtn").should("contain", "Ny reklame");
    cy.getBySel("navNewListingBtn").should("not.exist");
  });

  it("sortere etter pris, avstand, etc. (U3)", () => {
    cy.getBySel("distanceOverview").should("have.length", 3);
    cy.getBySel("priceOverview").should("have.length", 3);

    cy.getBySel("selSort").click();
    cy.get("[data-value=low]").click();

    cy.getBySel("priceOverview").eq(0).should("contain", "600");
    cy.getBySel("priceOverview").eq(1).should("contain", "33690");
    cy.getBySel("priceOverview").eq(2).should("contain", "999000");

    cy.getBySel("selSort").click();
    cy.get("[data-value=high]").click();

    cy.getBySel("priceOverview").eq(0).should("contain", "999000");
    cy.getBySel("priceOverview").eq(1).should("contain", "33690");
    cy.getBySel("priceOverview").eq(2).should("contain", "600");

    cy.login("erna", "erna");

    cy.getBySel("selSort").click();
    cy.get("[data-value=dist_high]").click();

    cy.getBySel("distanceOverview").eq(0).should("contain", "2.06");
    cy.getBySel("distanceOverview").eq(1).should("contain", "2.06");
    cy.getBySel("distanceOverview").eq(2).should("contain", "0.99");

    cy.getBySel("selSort").click();
    cy.get("[data-value=dist_low]").click();

    cy.getBySel("distanceOverview").eq(0).should("contain", "0.99");
    cy.getBySel("distanceOverview").eq(1).should("contain", "2.06");
    cy.getBySel("distanceOverview").eq(2).should("contain", "2.06");
  });

  it("det kommer tydelig frem hvilke annonser som er nærmest (U4)", () => {
    cy.getBySel("distanceOverview").eq(0).should("contain", "Du må logge inn");

    cy.login("ola", "ola");

    cy.getBySel("distanceOverview").eq(0).should("contain", "1.50");
    cy.getBySel("distanceOverview").eq(1).should("contain", "0.00");
    cy.getBySel("distanceOverview").eq(2).should("contain", "0.00");
  });

  it("se en annonse samt kontaktinfo til privatbrukeren som har annonsen (U7)", () => {
    cy.getBySel("viewListing").eq(2).click();

    cy.url().should("include", "/listings/1");

    cy.getBySel("title").should("contain", "Sykkel");
    cy.getBySel("price").should("contain", "600");
    cy.getBySel("ownerName").should("contain", "Ola Halvorsen");
    cy.getBySel("ownerPhone").should("contain", "98765432");
    cy.getBySel("homeBtn").click();
  });

  it("filtrere annonser etter kategorier (U8)", () => {
    cy.getBySel("listingTitle").should("have.length", 3);
    cy.getBySel("categoryButtons").contains("Kjøretøy").click();
    cy.getBySel("listingTitle").should("contain", "Volvo");
    cy.getBySel("listingTitle").should("contain", "Lambo");
    cy.getBySel("listingTitle").should("not.contain", "Sykkel");

    cy.getBySel("categoryButtons").contains("Sykkel").click();
    cy.getBySel("listingTitle").should("have.length", 3);

    cy.getBySel("categoryButtons").contains("Kjøretøy").click();
    cy.getBySel("categoryButtons").contains("Sykkel").click();
    cy.getBySel("listingTitle").should("have.length", 3);

    cy.getBySel("categoryButtons").contains("Hage").click();
    cy.getBySel("listingTitle").should("not.exist");

    cy.getBySel("categoryButtons").contains("Hage").click();
  });
});
