import React, { useState } from 'react';

import FeatureCopy from "../components/FeatureContainer/FeatureCopy";
import OlContactBean from '../assets/olLilBean/OlContactBean';
import Input from '../components/Objects/Input/Input';
import TextArea from '../components/Objects/TextArea/TextArea';

  /************************************
   * Constants
   ************************************/

  const TARGET_EMAIL = 'mailto:oneleifdev@gmail.com';
  const ERROR_MESSAGE = 'Please enter a';

export default function ContactUsView() {
  /************************************
  * State
  ************************************/

  const [mailTo, setMailTo] = useState('');
  const [formData, setFormData] = useState({message: {value: '', error: ''}, subject: {value: '', error: ''}});

  /************************************
  * Private Methods
  ************************************/

  /**
   * Passes the id and value of the input into helper functions to be handled
   * @param {Event} value change event from the message textarea
   */
  function handleInput(event) {
    const { id, value } = event.target;
    setData(id, value)
    handleEnteredInput(id, value);
  }

  /**
   * Takes in the event value and id and sets the value based on the id
   * If value is empty then sets error message for element the event occured
   * @param {String} id
   * @param {String} value
   */
  function setData(id, value) {
    if (value.length > 0) {
      setFormData({...formData, [id] : {value : value, error: ''}});
    }
    else {
      setFormData({...formData, [id] : {value : value, error: `${ERROR_MESSAGE} ${id}`}});
    }
  }

  /**
   * Takes in event and sets the mailto value if there is a value to be sent
   * @param {String} id
   * @param {String} value
   */
  function handleEnteredInput(id, value) {
    // handleErrorMessage(event);

    //if value was entered an cleared then reset mailto
    if (value === '') {
      setMailTo('');
      return;
    }
    
    //if event comes from message then input will need to be in message param
    (id === 'message') ? parseAndApplyEmailInput(formData.subject.value, value) : parseAndApplyEmailInput(value, formData.message.value);
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
          <Input id='subject' label='Subject' placeholder='Enter the subject...' errorMessage={formData.subject.error} onValueChange={handleInput}/>
          <TextArea id='message' label='Message' placeholder='Write your message here' errorMessage={formData.message.error} onValueChange={handleInput}/>
          <a aria-label='send' tabIndex={mailTo.length === 0 ? -1 : 0} className={`button ${mailTo.length > 0 ? 'primary' : 'disabled'}`} href={mailTo} target="_top">
            <span>Send</span>
          </a>
        </div>
      </div>
    </div>
  );
}
