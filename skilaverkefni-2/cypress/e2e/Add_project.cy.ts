describe("Project and task workflow", () => {
  it("creates a project, adds a task to it and marks the task complete", () => {
    cy.visit("/");
    cy.get("body").should("be.visible"); //wait for page to load
    cy.contains("Add project").click();
    cy.contains("Project name").parent().find("input").type("My project");
    cy.contains("Description")
      .parent()
      .find("input")
      .type("Describing the project");
    cy.get('button[type="submit"]').click();
    cy.contains("My project").click();
    cy.get("button").contains("Add task").click();
    cy.contains("Task title").parent().find("input").type("My task title");
    cy.get('input[placeholder="Short summary"]').type("My task description");
    cy.get('button[type="submit"]').click();
    cy.contains("My task title");
    cy.get('button[role="checkbox"]').click();
  });
});
