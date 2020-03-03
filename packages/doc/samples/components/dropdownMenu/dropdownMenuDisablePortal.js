import React from "react";
import DropDownMenu from "@hv/uikit-react-core/dist/DropDownMenu";

const menuOptions = [
  { label: "Label 1" },
  { label: "Label 2", disabled: true },
  { label: "Label 3" }
];

export default (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <DropDownMenu
      id="dpmDisablePortal"
      dataList={menuOptions}
      //onClick={e => alert(e.label)}
      disablePortal={true}
    />
  </div>
);
