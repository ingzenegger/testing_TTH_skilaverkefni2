import { describe, expect, it, vi } from "vitest";
import ProjectList from "./ProjectList";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";

//projectList reads projects , activeproject and clearactive project from global context
//also has a useState for addProjectOpen for the add project Dialog
//header differs if there is active project or not.
//card content is different if there is no project
//renders ProjectCard components for each project in state.

//CODE SMELL ProjectList has conditional rendering of buttons in the header that is useless as the ProjectList itself is only rendered from the HomePage if there is no activeProject.
const { mockUseGlobalContext } = vi.hoisted(() => ({
  mockUseGlobalContext: vi.fn(),
}));
//mock context
vi.mock("@/shared/context/useGlobalContext", () => ({
  useGlobalContext: mockUseGlobalContext,
}));

vi.mock("@/feature/project/chart/components/Chart", () => ({
  ProjectTasksChart: () => null,
}));

const mockClearActiveProject = vi.fn();

//test keep complaining about the "key" not being unique (still pass, but logs look annoying), claude suggested to have a function in the ID instead of "1A", "1B" etc but that is useless because the key is still project.id in the map...:
const createMockProjectsArray = () => [
  {
    description: "Project for testing",
    id: crypto.randomUUID(),
    name: "Test project 1",
    tasksCount: 0,
  },
  {
    description: "Project for testing",
    id: crypto.randomUUID(),
    name: "Test project 2",
    tasksCount: 0,
  },
  {
    description: "Project for testing",
    id: crypto.randomUUID(),
    name: "Test project 3",
    tasksCount: 0,
  },
];

describe("ProjectList", () => {
  const user = userEvent.setup();

  it("displays message when no projects", () => {
    mockUseGlobalContext.mockReturnValue({
      projects: [],
      activeProject: null,
      clearActiveProject: mockClearActiveProject,
    });
    render(<ProjectList />);

    expect(
      screen.queryByText("Add a project to get started"),
    ).toBeInTheDocument();
  });

  it("displays correct number of ProjectCards", () => {
    mockUseGlobalContext.mockReturnValue({
      projects: createMockProjectsArray(),
      activeProject: null,
      clearActiveProject: mockClearActiveProject,
    });
    render(<ProjectList />);
    const cards = screen.getAllByTestId("project-card");
    expect(cards.length).toBe(3);
  });
  //redundant as this component only renders if there is no activeProject:
  it("renders back button when activeProject is truthy", () => {
    const projects = createMockProjectsArray();
    mockUseGlobalContext.mockReturnValue({
      projects: projects,
      activeProject: projects[0],
      clearActiveProject: mockClearActiveProject,
    });
    render(<ProjectList />);
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  it("renders Form Dialog when AddProject is clicked", async () => {
    mockUseGlobalContext.mockReturnValue({
      projects: createMockProjectsArray(),
      activeProject: null,
      clearActiveProject: mockClearActiveProject,
    });
    render(<ProjectList />);
    const button = screen.getByRole("button", { name: /Add project/i });
    expect(button).toBeInTheDocument();
    await user.click(button);
    expect(
      screen.getByText(
        "Create a new project. You can add tasks after it is created.",
      ),
    ).toBeInTheDocument();
  });
});
