import React from "react";

import Toolbar from "./Toolbar";
import HamburgerToolBar from "./HamburgerToolbar";

export default function ToolbarContainer() {
  /************************************
   * Render
   ************************************/

  return (
    <>
        <div className="toolbar-container">
            <Toolbar/>
        </div>
        <div className="hamburger-toolbar-container">
            <HamburgerToolBar/>
        </div>
    </>
  );
}
