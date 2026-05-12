import type { Meta, StoryObj } from "@storybook/react-vite";

import ProjectCard from "./ProjectCard";
import { GlobalContext } from "@/shared/context/globalContextTypes";
import type { GlobalContextValue } from "@/shared/context/globalContextTypes";

const mockContextValue = {
  setActiveProject: () => {},
  removeProject: () => {},
} as unknown as GlobalContextValue;

const meta = {
  component: ProjectCard,
  decorators: [
    (Story) => (
      <GlobalContext.Provider value={mockContextValue}>
        <Story />
      </GlobalContext.Provider>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    project: {
      id: "1A",
      name: "Test project 1",
      description: "Some project for testing",
      tasksCount: 4,
    },
  },
};
export const NoTasks: Story = {
  args: {
    project: {
      id: "1A",
      name: "Test project 1",
      description: "Some project for testing",
      tasksCount: 0,
    },
  },
};
export const LongText: Story = {
  args: {
    project: {
      id: "1A",
      name: "Test project with a very long title that just goes on an on and on and on...",
      description:
        "Some project with a very long description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, sapiente animi! Libero fugiat ratione necessitatibus rem tenetur iste aliquam, sapiente ad a enim doloremque possimus explicabo est, exercitationem officiis beata. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, sapiente animi! Libero fugiat ratione necessitatibus rem tenetur iste aliquam, sapiente ad a enim doloremque possimus explicabo est, exercitationem officiis beata.",
      tasksCount: 1,
    },
  },
};
export const ManyTasks: Story = {
  args: {
    project: {
      id: "1A",
      name: "Test project",
      description: "Project with extremely many tasks",
      tasksCount: 999998888877777,
    },
  },
};
