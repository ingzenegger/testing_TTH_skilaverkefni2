import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";

import TaskForm from "./TaskForm";
import { GlobalContext } from "@/shared/context/globalContextTypes";
import type { GlobalContextValue } from "@/shared/context/globalContextTypes";
import { Dialog } from "@/shared/components/ui/dialog";

const mockContextValue = {
  activeProject: {
    description: "Project for testing",
    id: "1A",
    name: "Test project 1",
    tasksCount: 0,
  },
  addTask: () => {},
  updateTask: () => {},
} as unknown as GlobalContextValue;

const meta = {
  component: TaskForm,
  decorators: [
    (Story) => (
      <GlobalContext.Provider value={mockContextValue}>
        <Dialog open={true}>
          <Story />
        </Dialog>
      </GlobalContext.Provider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof TaskForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: fn(),
    taskToEdit: null,
  },
};
export const EditTask: Story = {
  args: {
    onClose: fn(),
    taskToEdit: {
      id: "task-1",
      title: "Existing task",
      description: "Existing description",
      completed: false,
      priority: "medium",
      projectId: "1A",
    },
  },
};
