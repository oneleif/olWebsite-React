import React from "react";

export default function Card({ children }) {
  /************************************
   * Render
   ************************************/

  return (
    <div className="card-module">
        {children}
    </div>
  );
}
