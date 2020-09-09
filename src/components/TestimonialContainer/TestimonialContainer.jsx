import React from "react";
/**
* Component intented to display text, an image and information
* about user being displayed
*/
export default function TestimonialContainer({ children, name, location, image}) {
  /************************************
   * Render
   ************************************/

  return (
    <div className='testimonial-container'>
      <p>{children}</p>
      <div>
        <h4>{name}</h4>
        <p>{location}</p>
      </div>
      <img src={image} alt={name}/>
    </div>
  );
}
