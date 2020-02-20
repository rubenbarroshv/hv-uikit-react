import React from "react";
import HvTextArea from "@hv/uikit-react-core/dist/TextArea";

const labels = {
  inputLabel: "Label",
  placeholder: "Enter value"
};

export default (
  <HvTextArea rows={5} labels={labels} maxCharQuantity={10} />
);
