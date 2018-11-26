describe("Ariana App Test", () => {
  const quest = {
    name: "Are you hungary?",
    slug: "Are-you-hungary",
  };
  before(() => {
    cy.exec("npm run dev");
  // cy.exec("npm run flush");
  });
  it("should get questionnaire list", () => {
    cy.visit("/");
    cy
      .get('.menu-list > li:first-child > a')
      .should('contain', quest.name)  // yields <a>
      .and('have.attr', 'href')       
      .and('eq', '/' + quest.slug)    // yields string value of href
      .and('not.include', '#') 
    cy
    .get('.menu-list > li:first-child > a')
    .click()
    .url()
    .should('include', '/' + quest.slug);
  });
  // more tests here
});