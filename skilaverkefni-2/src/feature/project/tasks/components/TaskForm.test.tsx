import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Task } from "../model/task";
import TaskForm from "./TaskForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialog } from "@/shared/components/ui/dialog";

//test if the form correctly displays adding/editing versions

const { mockUseGlobalContext } = vi.hoisted(() => ({
  mockUseGlobalContext: vi.fn(),
}));
//mock context
vi.mock("@/shared/context", () => ({
  useGlobalContext: mockUseGlobalContext,
}));

const mockAddTask = vi.fn();
const mockUpdateTask = vi.fn();
const mockOnClose = vi.fn();

const testTask: Task = {
  id: "task-1",
  title: "Existing task",
  description: "Existing description",
  completed: false,
  priority: "medium",
  projectId: "1A",
};

const mockProject = {
  id: "1A",
  name: "Test project",
  description: "A project",
  tasksCount: 1,
};

function renderTaskForm(taskToEdit: Task | null) {
  return render(
    <Dialog open={true}>
      <TaskForm taskToEdit={taskToEdit} onClose={mockOnClose} />
    </Dialog>,
  );
}

describe("TaskForm", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockUseGlobalContext.mockReturnValue({
      addTask: mockAddTask,
      updateTask: mockUpdateTask,
      activeProject: mockProject,
    });

    mockAddTask.mockClear();
    mockUpdateTask.mockClear();
    mockOnClose.mockClear();
  });

  it("renders in add mode when taskToEdit is null", () => {
    renderTaskForm(null);
    const text = screen.getAllByText("Add task");
    expect(text).toHaveLength(2);
    expect(
      screen.getByText("Create a new task for the current project."),
    ).toBeInTheDocument();
  });

  it("renders in edit mode when taskToEdit is present", () => {
    renderTaskForm(testTask);
    expect(screen.getByText("Edit task")).toBeInTheDocument();
    expect(screen.getByText("Update the task below.")).toBeInTheDocument();
  });

  it("pre-fills the form fields with the existing task data in edit mode", () => {
    renderTaskForm(testTask);
    expect(screen.getByDisplayValue("Existing task")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("Existing description"),
    ).toBeInTheDocument();
  });

  it("calls addTask (not updateTask) when submitted in add mode", async () => {
    renderTaskForm(null);
    const titleInput = screen.getByLabelText("Task title");
    await user.type(titleInput, "My new task");
    const submitButton = screen.getByRole("button", { name: /add task/i });
    await user.click(submitButton);
    expect(mockAddTask).toHaveBeenCalledTimes(1);
    expect(mockUpdateTask).not.toHaveBeenCalled();
  });

  it("calls updateTask (not addTask) when submitted in edit mode", async () => {
    renderTaskForm(testTask);
    const submitButton = screen.getByRole("button", { name: /save changes/i });
    await user.click(submitButton);
    expect(mockUpdateTask).toHaveBeenCalledTimes(1);
    expect(mockAddTask).not.toHaveBeenCalled();
  });

  it("does not call addTask or updateTask when title is empty", async () => {
    renderTaskForm(null);
    const submitButton = screen.getByRole("button", { name: /add task/i });
    await user.click(submitButton);
    expect(mockAddTask).not.toHaveBeenCalled();
    expect(mockUpdateTask).not.toHaveBeenCalled();
  });
});
