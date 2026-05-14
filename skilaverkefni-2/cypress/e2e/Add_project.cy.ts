describe("Add project", () => {
  it("adds a project", () => {
    cy.visit("http://localhost:5173/");
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
