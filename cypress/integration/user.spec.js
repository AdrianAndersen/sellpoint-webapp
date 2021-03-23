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
    cy.getBySel("signUpSubmit").click();

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

    cy.get("input[name=name]").type("Henrik Aasheim");
    cy.get("input[name=phoneNumber]").type("31415");
    cy.get("input[name=username]").type("henrik");
    cy.get("input[name=password]").type("hemmelig");
    cy.getBySel("googleMap").click();
    cy.getBySel("signUpSubmit").click();

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

  it("se min egen profil med annonser/reklamer (U5)", () => {
    cy.login("ola", "ola");
    cy.getBySel("myProfileBtn").click();

    cy.getBySel("userInfo")
      .should("contain", "Ola Halvorsen (ola)")
      .and("contain", "98765432")
      .and("contain", "Privatbruker");

    cy.getBySel("listingOverview").should("exist");
    cy.getBySel("viewListing").should("have.length", 2);
    cy.getBySel("adSlide").should("not.exist");

    cy.login("erna", "erna");
    cy.getBySel("myProfileBtn").click();
    cy.getBySel("listingOverview").should("not.exist");
    cy.getBySel("adSlide").should("exist");

    cy.login("admin", "admin");
    cy.getBySel("myProfileBtn").click();
    cy.getBySel("listingOverview").should("exist");
    cy.getBySel("viewListing").should("have.length", 1);
    cy.getBySel("adSlide").should("exist");
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
    cy.getBySel("categorySelect").click();

    cy.get("[data-value=Kjøretøy]").click();
    cy.getBySel("listingTitle").should("contain", "Volvo");
    cy.getBySel("listingTitle").should("contain", "Lambo");
    cy.getBySel("listingTitle").should("not.contain", "Sykkel");

    cy.get("[data-value=Sykkel]").click();
    cy.getBySel("listingTitle").should("have.length", 3);

    cy.get("[data-value=Kjøretøy]").click();
    cy.get("[data-value=Sykkel]").click();
    cy.getBySel("listingTitle").should("have.length", 3);

    cy.get("[data-value=Hage]").click();
    cy.getBySel("listingTitle").should("not.exist");

    cy.get("[data-value=Hage]").click();

    cy.get("body").type("{esc}"); // Hide the select menu
  });

  it("redigere opplysningene jeg har oppgitt i profilen min (U9)", () => {
    cy.login("lars", "batteryhorsestaple");
    cy.getBySel("myProfileBtn").click();
    cy.getBySel("editUserBtn").click();
    cy.get("input[name=name]").clear().type("Espen Cogitron");
    cy.get("input[name=phoneNumber]").clear().type("1010101");
    cy.get("input[name=username]").clear().type("espen");
    cy.get("input[name=password]").clear().type("espen");
    cy.getBySel("googleMap").click();
    cy.interceptDB();
    cy.interceptDB();
    cy.getBySel("signUpSubmit").click();
    cy.waitDB();
    cy.waitDB();

    cy.getBySel("myProfileBtn").click();
    cy.getBySel("userInfo")
      .should("contain", "Espen Cogitron (espen)")
      .and("contain", "1010101")
      .and("contain", "Privatbruker");

    cy.login("espen", "espen");
    cy.getBySel("loginBtn").should("contain", "Logg ut");

    cy.login("lars", "batteryhorsestaple");
    cy.on("window:alert", (str) => expect(str).to.equal("Feil passord!"));
  });
});
