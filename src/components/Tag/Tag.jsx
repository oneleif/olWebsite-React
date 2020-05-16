import React from "react";

export default function Tag({ text, target=' ' }) {
  /************************************
   * Render
   ************************************/

  return (
    <a className='tag-module' href={target} >{text}</a>
  );
}
