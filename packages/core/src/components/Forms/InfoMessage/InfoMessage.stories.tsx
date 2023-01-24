import { Meta, StoryObj } from "@storybook/react";
import { HvInfoMessage, HvInfoMessageProps } from "components";

const meta: Meta<typeof HvInfoMessage> = {
  title: "Guides/Forms/Form Element Blocks/Info Message",
  component: HvInfoMessage,
};
export default meta;

export const Main: StoryObj<HvInfoMessageProps> = {
  args: {
    disabled: false,
    disableGutter: false,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: (args) => {
    return <HvInfoMessage {...args}>Info Message</HvInfoMessage>;
  },
};