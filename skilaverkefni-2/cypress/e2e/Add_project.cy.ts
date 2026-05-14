describe("Add project", () => {
  it("adds a project", () => {
    cy.visit("/");
    cy.get("body").should("be.visible"); //wait for page to load
    cy.contains("Add project").click();
    cy.contains("Project name").parent().find("input").type("My project");
    cy.contains("Description")
      .parent()
      .find("input")
      .type("Describing the project");
    cy.get('button[type="submit"]').click();
    cy.contains("My project");
  });
});
