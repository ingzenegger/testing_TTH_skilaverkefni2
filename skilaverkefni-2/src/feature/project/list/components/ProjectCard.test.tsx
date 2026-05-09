import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import ProjectCard from "./ProjectCard";
import { beforeEach, describe, expect, it, vi } from "vitest";

//what does the project card do?
//it takes in a project object and displays:
////project title ✔️
////project description ✔️
////taskscount ✔️
////delete button...confirmed by clicking test ✔️
//what states does it affect?
////clicking card sets active project✔️
////clicking trash icon/button deletes project✔️

const { mockRemoveProject, mockSetActiveProject } = vi.hoisted(() => ({
  mockRemoveProject: vi.fn(),
  mockSetActiveProject: vi.fn(),
}));
//mock context
vi.mock("@/shared/context", () => ({
  useGlobalContext: () => ({
    setActiveProject: mockSetActiveProject,
    removeProject: mockRemoveProject,
  }),
}));

const testProject = {
  description: "Some project for testing",
  id: "1A",
  name: "Test project 1",
  tasksCount: 4,
};

describe("ProjectCard", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    render(<ProjectCard project={testProject} />);
  });

  it("displays project title", () => {
    expect(screen.getByText("Test project 1"));
  });
  it("displays project description", () => {
    expect(screen.getByText("Some project for testing"));
  });
  it("displays project tasksCount", () => {
    expect(screen.getByText("4 tasks"));
  });

  it("calls removeProject when button is clicked", async () => {
    const button = screen.getByRole("button", { name: /Delete project/i });
    await user.click(button);
    expect(mockRemoveProject).toHaveBeenCalledWith("1A");
  });
  it("calls setActiveProject when card is clicked", async () => {
    const card = screen.getByTestId("project-card");
    await user.click(card);
    expect(mockSetActiveProject).toHaveBeenCalledWith(testProject);
  });
});
