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
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  /************************************
  * Private Methods
  ************************************/

  /* Takes in the value change event and sets the subject;
   * Passes the event and other input into a function to be handled
   *
   * @param subjectEvent - value change event from the subject input
   */
  function handleSubjectInput(subjectEvent) {
    setSubject(subjectEvent.target.value);
    handleEnteredInput(subjectEvent, message);
  } 

  /* Takes in the value change event and sets the message;
   * Passes the event and other input into a function to be handled
   *
   * @param messageEvent - value change event from the message textarea
   */
  function handleMessageInput(messageEvent) {
    setMessage(messageEvent.target.value);
    handleEnteredInput(messageEvent, subject);
  } 


  /* Takes in event and sets the mailto value if there is a value to be sent
   *
   * @param event - value change event
   * @param additionalInput - input not being changed (could be subject or message)
   */
  function handleEnteredInput(event, additionalInput) {
    const input = event.target.value;
    //if value was entered an cleared then reset mailto
    if (input === '') {
      setMailTo('');
      //TODO: Will need to set error message here based on input ID
      return;
    }
    
    if (additionalInput.length > 0) {
      //if event comes from message then input will need to be in message param
      (event.target.id === 'messageInput') ? parseAndApplyEmailInput(additionalInput, input) : parseAndApplyEmailInput(input, additionalInput);
    }
  }

  /* Sets the subject and message into the href target (mailto)
   *
   * @param subjectInput
   * @param messageInput
   */
  function parseAndApplyEmailInput(subjectInput, messageInput) {
    if (subjectInput.length > 0 && messageInput.length > 0) {
      setMailTo(`${TARGET_EMAIL}?subject=${prepEmailString(subjectInput)}&body=${prepEmailString(messageInput)}`);
    }
  }

  /* Replaces whitespace so email body/messages appears correctly
   *
   * @param string
   * @returns {@link String} - with whitspace replaced with '%20'
   */
  function prepEmailString(string) {
    return string.replace(' ', '%20');
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
          <Input id='subjectInput' label='Subject' placeholder='Enter the subject...' onValueChange={handleSubjectInput}/>
          <TextArea id='messageInput' label='Message' placeholder='Write your message here' onValueChange={handleMessageInput}/>
          <a className={`button ${mailTo.length > 0 ? 'primary' : 'disabled'}`} href={mailTo} target="_top">
            <span>Send</span>
          </a>
        </div>
      </div>
    </div>
  );
}
