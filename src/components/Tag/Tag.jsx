import React from "react";

function Tag({ children, target='/' }) {
  /************************************
   * Render
   ************************************/

  return (
    <div className='tag-module' >
      {children}
    </div>
  );
}

export default Tag;