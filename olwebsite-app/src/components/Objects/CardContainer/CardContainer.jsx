import React from "react";

export default function CardContainer({ children }) {
  /************************************
   * Render
   ************************************/

  return (
    <div className="card-container">
        {children}
    </div>
  );
}
