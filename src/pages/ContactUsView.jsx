import React from 'react';

import FeatureCopy from "../components/FeatureContainer/FeatureCopy";
import OlContactBean from '../assets/olLilBean/OlContactBean';
import Input from '../components/Objects/Input/Input';
import TextArea from '../components/Objects/TextArea/TextArea';
import Button from '../components/Objects/Button/Button';

  /************************************
   * Constants
   ************************************/

  const BODY_TEXT = 'body';
  const MESSAGE_TEXT = 'Message';
  const SUBJECT_TEXT = 'Subject';
  const TARGET_EMAIL = 'mailto:oneleifdev@gmail.com';

export default function ContactUsView() {
  /************************************
   * Render
   ************************************/

  return (
    <div className="contact-us-view-container">
      <div className='contact-us-content-container'>
        <div className='contact-us-copy-container'>
          <h1>Contact Us</h1>
          <FeatureCopy>
            Interested in learning more?  
            Looking to partner with us? We want to hear from you! 
          </FeatureCopy>
          <p>Email us at: <a href={`${TARGET_EMAIL}?Subject=oneleif%20submission%20form`} target="_top">oneleifdev@gmail.com</a></p>
          <p>Call us: <a href="tel:1-402-536-0377">+1 (402) 536-0377</a></p>
          <OlContactBean />
        </div>
        <form className='contact-us-form-container' action={TARGET_EMAIL} method="GET">
          <Input name={SUBJECT_TEXT} label={SUBJECT_TEXT} placeholder='Enter the subject...' onValueChange={() => {/*do nothing*/}}/>
          <TextArea name={BODY_TEXT} label={MESSAGE_TEXT} placeholder='Write your message here' onValueChange={() => {/*do nothing*/}}/>
          <Button>Send</Button>
        </form>
      </div>
    </div>
  );
}
