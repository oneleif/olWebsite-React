import React, { useState } from 'react';

import FeatureCopy from "../components/FeatureContainer/FeatureCopy";
import OlContactBean from '../assets/olLilBean/OlContactBean';
import Input from '../components/Objects/Input/Input';
import TextArea from '../components/Objects/TextArea/TextArea';

  /************************************
   * Constants
   ************************************/

  const TARGET_EMAIL = 'mailto:oneleifdev@gmail.com';

export default function ContactUsView() {
  /************************************
  * State
  ************************************/

  const [mailTo, setMailTo] = useState('');
  const [formData, setFormData] = useState({message: '', subject: ''});

  /************************************
  * Private Methods
  ************************************/

  /**
   * Takes in the value change event and sets the value based on the id
   * Passes the id and value of the input into a function to be handled
   * @param {Event} value change event from the message textarea
   */
  function handleInput(event) {
    const { id, value } = event.target;
    setFormData({...formData, [id] : value});
    handleEnteredInput(id, value);
  }

  /**
   * Takes in event and sets the mailto value if there is a value to be sent
   * @param {String} id
   * @param {String} value
   */
  function handleEnteredInput(id, value) {
    //if value was entered an cleared then reset mailto
    if (value === '') {
      setMailTo('');
      //TODO: Will need to set error message here based on input ID
      return;
    }
    
    //if event comes from message then input will need to be in message param
    (id === 'message') ? parseAndApplyEmailInput(formData.subject, value) : parseAndApplyEmailInput(value, formData.message);
  }

  /**
   * Sets the subject and message into the href target (mailto)
   * @param {String} subjectInput
   * @param {String} messageInput
   */
  function parseAndApplyEmailInput(subjectInput, messageInput) {
    if (subjectInput.length > 0 && messageInput.length > 0) {
      setMailTo(`${TARGET_EMAIL}?subject=${prepEmailString(subjectInput)}&body=${prepEmailString(messageInput)}`);
    }
  }

  /**
   * Replaces whitespace so email body/messages appears correctly
   * @param {String}
   * @returns {String} with whitspace replaced with '%20'
   */
  function prepEmailString(string) {
    return string.split(' ').join('%20');
  }

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
        <div className='contact-us-form-container'>
          <Input id='subject' label='Subject' placeholder='Enter the subject...' onValueChange={handleInput}/>
          <TextArea id='message' label='Message' placeholder='Write your message here' onValueChange={handleInput}/>
          <a data-testid='send' className={`button ${mailTo.length > 0 ? 'primary' : 'disabled'}`} href={mailTo} target="_top">
            <span>Send</span>
          </a>
        </div>
      </div>
    </div>
  );
}
