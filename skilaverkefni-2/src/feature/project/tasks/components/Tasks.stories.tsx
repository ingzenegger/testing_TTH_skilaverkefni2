import type { Meta, StoryObj } from "@storybook/react-vite";

import { GlobalContext } from "@/shared/context/globalContextTypes";
import type { GlobalContextValue } from "@/shared/context/globalContextTypes";
import Tasks from "./Tasks";

const mockContextValue = {
  activeProject: {
    description: "Project for testing",
    id: "1A",
    name: "Test project 1",
    tasksCount: 0,
  },
  tasks: [],
} as unknown as GlobalContextValue;

const mockContextWithTasks = {
  activeProject: {
    description: "Project for testing",
    id: "1A",
    name: "Test project 1",
    tasksCount: 0,
  },
  tasks: [
    {
      id: "task-1",
      title: "Test task",
      description: "A task to edit",
      completed: false,
      priority: "low",
      projectId: "1A",
    },
    {
      id: "task-2",
      title: "Test task 2",
      description: "A task to edit",
      completed: false,
      priority: "medium",
      projectId: "1A",
    },
    {
      id: "task-3",
      title: "Test task 3",
      description: "A task to edit",
      completed: true,
      priority: "high",
      projectId: "1A",
    },
  ],
} as unknown as GlobalContextValue;

const meta = {
  component: Tasks,
} satisfies Meta<typeof Tasks>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <GlobalContext.Provider value={mockContextValue}>
        <Story />
      </GlobalContext.Provider>
    ),
  ],
};

export const WithTasks: Story = {
  decorators: [
    (Story) => (
      <GlobalContext.Provider value={mockContextWithTasks}>
        <Story />
      </GlobalContext.Provider>
    ),
  ],
};

export const NoProject: Story = {
  decorators: [
    (Story) => (
      <GlobalContext.Provider value={{ activeProject: null }}>
        <Story />
      </GlobalContext.Provider>
    ),
  ],
};
