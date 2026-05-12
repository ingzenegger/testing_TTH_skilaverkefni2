import type { Meta, StoryObj } from "@storybook/react-vite";

import ProjectList from "./ProjectList";
import { GlobalContext } from "@/shared/context/globalContextTypes";
import type { GlobalContextValue } from "@/shared/context/globalContextTypes";

const mockContextWithoutProjects = {
  projects: [],
  tasks: [],
} as unknown as GlobalContextValue;
const mockContextWithProjects = {
  projects: [
    {
      description: "Project for testing",
      id: "1A",
      name: "Test project 1",
      tasksCount: 0,
    },
    {
      description: "Project for testing",
      id: "1B",
      name: "Test project 2",
      tasksCount: 2,
    },
    {
      description: "Project for testing",
      id: "1C",
      name: "Test project 3",
      tasksCount: 3,
    },
  ],
  tasks: [],
} as unknown as GlobalContextValue;

const meta = {
  component: ProjectList,
  decorators: [
    (Story) => (
      <GlobalContext.Provider value={mockContextWithoutProjects}>
        <Story />
      </GlobalContext.Provider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithProjects: Story = {
  decorators: [
    (Story) => (
      <GlobalContext.Provider value={mockContextWithProjects}>
        <Story />
      </GlobalContext.Provider>
    ),
  ],
};
