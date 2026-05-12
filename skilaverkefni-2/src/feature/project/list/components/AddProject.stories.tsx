import type { Meta, StoryObj } from "@storybook/react-vite";

import AddProject from "./AddProject";

import { Dialog } from "@/shared/components/ui/dialog";

const meta = {
  component: AddProject,
  decorators: [
    (Story) => (
      <Dialog open={true}>
        <Story />
      </Dialog>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AddProject>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
