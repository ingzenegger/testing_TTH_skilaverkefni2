import { describe, expect, it, vi } from "vitest";
import Tasks from "./Tasks";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import type { Task } from "../model/task";

//Tasks component is rendered from HomePage when activeProject is truthy
//Tasks renders TaskTable and is the home for the TaskForm Dialog

const { mockUseGlobalContext } = vi.hoisted(() => ({
  mockUseGlobalContext: vi.fn(),
}));
//mock context
vi.mock("@/shared/context/useGlobalContext", () => ({
  useGlobalContext: mockUseGlobalContext,
}));

vi.mock("./task-table/TaskTable", () => ({
  TaskTable: ({ onEditTask }: { onEditTask: (task: Task) => void }) => (
    <button
      onClick={() =>
        onEditTask({
          id: "task-1",
          title: "Test task",
          description: "A task to edit",
          completed: false,
          priority: "low",
          projectId: "1A",
        })
      }
    >
      Trigger edit
    </button>
  ),
}));

const mockProject = {
  description: "Project for testing",
  id: "1A",
  name: "Test project 1",
  tasksCount: 0,
};

describe("Tasks", () => {
  const user = userEvent.setup();

  it("displays project title", () => {
    mockUseGlobalContext.mockReturnValue({ activeProject: mockProject });
    render(<Tasks />);
    expect(screen.getByText("Test project 1")).toBeInTheDocument();
  });
  it("displays project description", () => {
    mockUseGlobalContext.mockReturnValue({ activeProject: mockProject });
    render(<Tasks />);
    expect(screen.getByText("Project for testing")).toBeInTheDocument();
  });

  //if there is no active project (reduntant as the Tasks isn't rendered unless the activeproject is truthy) -CODE SMELL. Still useful though if the app were to be changed.
  it("displays message when no project is selected", () => {
    mockUseGlobalContext.mockReturnValue({ activeProject: null });
    render(<Tasks />);
    expect(screen.getByText("No project selected")).toBeInTheDocument();
  });

  it("renders Task Dialog when AddTask is clicked", async () => {
    mockUseGlobalContext.mockReturnValue({ activeProject: mockProject });
    render(<Tasks />);
    const button = screen.getByRole("button", { name: /add task/i });
    await user.click(button);
    expect(
      screen.getByText("Create a new task for the current project."),
    ).toBeInTheDocument();
  });

  //test exposing a BUG, form doesn't open in edit mode:
  it("opens dialog in edit mode when a task edit is triggered", async () => {
    mockUseGlobalContext.mockReturnValue({ activeProject: mockProject });
    render(<Tasks />);
    const triggerEdit = screen.getByRole("button", { name: /trigger edit/i });
    await user.click(triggerEdit);
    expect(screen.getByText("Edit task")).toBeInTheDocument();
  });
});
