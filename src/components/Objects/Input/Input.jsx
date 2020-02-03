import React from "react";

export default function Input({ className, label, type='text' }) {
  /************************************
   * Render
   ************************************/

  return (
    <label className={`${className}-input-container`}>
        <p>{label}</p>
        <input type={type}/>
    </label>
  );
};
