import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlobalContext } from "@/shared/context/globalContextTypes";
import type { GlobalContextValue } from "@/shared/context/globalContextTypes";
import { Dialog } from "@/shared/components/ui/dialog";

import AddTask from "./AddTask";

const mockContextValue = {
  activeProject: {
    description: "Project for testing",
    id: "1A",
    name: "Test project 1",
    tasksCount: 0,
  },
} as unknown as GlobalContextValue;

const meta = {
  component: AddTask,
  decorators: [
    (Story) => (
      <GlobalContext.Provider value={mockContextValue}>
        <Dialog open={true}>
          <Story />
        </Dialog>
      </GlobalContext.Provider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AddTask>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onOpen: fn(),
  },
};
