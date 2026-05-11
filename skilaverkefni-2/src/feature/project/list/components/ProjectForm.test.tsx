import { describe, expect, it, vi } from "vitest";
import ProjectForm from "./ProjectForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialog } from "@/shared/components/ui/dialog";

const { mockUseGlobalContext } = vi.hoisted(() => ({
  mockUseGlobalContext: vi.fn(),
}));
//mock context
vi.mock("@/shared/context", () => ({
  useGlobalContext: mockUseGlobalContext,
}));

const mockAddProject = vi.fn();
const mockOnClose = vi.fn();

function renderProjectForm() {
  return render(
    <Dialog open={true}>
      <ProjectForm onClose={mockOnClose} />
    </Dialog>,
  );
}

describe("ProjectForm", () => {
  const user = userEvent.setup();

  it("does not call addProject when title is empty", async () => {
    mockUseGlobalContext.mockReturnValue({
      addProject: mockAddProject,
    });
    renderProjectForm();
    const submitButton = screen.getByRole("button", { name: /add project/i });
    await user.click(submitButton);
    expect(mockAddProject).not.toHaveBeenCalled();
  });
});
