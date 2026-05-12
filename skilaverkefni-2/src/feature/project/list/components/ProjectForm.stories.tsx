import { fn } from "storybook/test";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { GlobalContext } from "@/shared/context/globalContextTypes";
import type { GlobalContextValue } from "@/shared/context/globalContextTypes";
import ProjectForm from "./ProjectForm";
import { Dialog } from "@/shared/components/ui/dialog";

const mockContextValue = {
  addProject: () => {},
} as unknown as GlobalContextValue;

const meta = {
  component: ProjectForm,
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
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ProjectForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: fn(),
  },
};
