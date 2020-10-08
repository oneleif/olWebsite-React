import React, { useState } from 'react';

import OlContactBean from '../assets/olLilBean/OlContactBean';
import Input from '../components/Objects/Input/Input';
import TextArea from '../components/Objects/TextArea/TextArea';
import Button from '../components/Objects/Button/Button';
import ReactHelmetWrapper from '../components/ReactHelmetWrapper';
import LinkPreviewImage from '../assets/LinkPreview/ol-socialCard_1.png';

import ReactGA from 'react-ga';

/************************************
 * Constants
 ************************************/

const TARGET_EMAIL = 'mailto:oneleifdev@gmail.com';
const ERROR_MESSAGE = 'Please enter your';

export default function ContactUsView() {
  /************************************
   * State
   ************************************/

  const [nameInput, setNameInput] = useState({ value: '', error: '' });
  const [emailInput, setEmailInput] = useState({ value: '', error: '' });
  const [messageInput, setMessageInput] = useState({ value: '', error: '' });

  /************************************
   * Private Methods
   ************************************/

  function handleNameInput(value) {
    if (value.length > 0) {
      setNameInput({ value: value, error: '' });
    } else {
      setNameInput({ value: value, error: `${ERROR_MESSAGE} name` });
    }
  }

  function handleEmailInput(value) {
    if (value.length === 0) {
      setEmailInput({ value: value, error: `${ERROR_MESSAGE} email` });
    } else {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRegex.test(value)) {
        setEmailInput({ value: value, error: '' });
      } else {
        setEmailInput({ value: value, error: 'Please enter a valid email' });
      }
    }
  }

  function handleMessageInput(value) {
    if (value.length > 0) {
      setMessageInput({ value: value, error: '' });
    } else {
      setMessageInput({ value: value, error: `${ERROR_MESSAGE} message` });
    }
  }

  /**
   * If all required values aren't set then it will prevent button functionality
   * Will set error message where required
   * @param {Event} event
   */
  function handleSendClicked(event) {
    //target for href is set so allow link functionality
    if (nameInput.value && emailInput.value && !emailInput.error && messageInput.value) {
      return;
    }

    //prevents event from propogating to link functionality
    event.preventDefault();
    if (!nameInput.value) {
      setNameInput({ value: '', error: `${ERROR_MESSAGE} name` });
    } 
    
    if (!messageInput.value) {
      setMessageInput({ value: '', error: `${ERROR_MESSAGE} message` });
    } 
    
    if (!emailInput.value) {
      setEmailInput({ value: '', error: `${ERROR_MESSAGE} email` });
    }
  }

  /**
   * Records Analytics for our links provided to reach out to oneleif, this is for the email/phone number
   * @param event
   */
  function handleContactLinkClicked(event) {
    ReactGA.event({ category: 'Contact Us Link', action: 'Clicked', label: event.target.href });
  }

  /************************************
   * Render
   ************************************/

  return (
    <div className='contact-us-view-container'>
      <ReactHelmetWrapper
        title='Contact Us'
        description='Have any questions? Or even a project proposal?'
        image={LinkPreviewImage}
        path='/contact'
      />
      <div className='contact-us-content-container'>
        <div className='contact-us-copy-container'>
          <h1>Contact Us</h1>
          <p className='call-to-action-text'>
            Interested in learning more? Looking to partner with us? We want to hear from you!
          </p>
          <p>
            Email us at:{' '}
            <a
              href={`${TARGET_EMAIL}?Subject=oneleif%20submission%20form`}
              target='_top'
              onClickCapture={handleContactLinkClicked}
            >
              oneleifdev@gmail.com
            </a>
          </p>
          <p>
            Call us:{' '}
            <a href='tel:1-402-536-0377' onClickCapture={handleContactLinkClicked}>
              +1 (402) 536-0377
            </a>
          </p>
          <OlContactBean />
        </div>
        <div className='contact-us-form-container'>
          <form onSubmit={handleSendClicked} action='https://formspree.io/f/mzbkdaqg' method='POST'>
            <Input
              id='name'
              label='Name'
              placeholder='Enter your name...'
              caption='Name Input'
              name="name"
              errorMessage={nameInput.error}
              onValueChange={event => {
                handleNameInput(event.target.value);
              }}
            />
            <Input
              id='email'
              label='Email'
              placeholder='Enter your email address...'
              caption='Email Input'
              name="_replyto"
              errorMessage={emailInput.error}
              onValueChange={event => {
                handleEmailInput(event.target.value);
              }}
            />
            <TextArea
              id='message'
              label='Message'
              placeholder='Write your message here'
              caption='Message Input'
              name="message"
              errorMessage={messageInput.error}
              onValueChange={event => {
                handleMessageInput(event.target.value);
              }}
            />
            <Button
              type='submit'
              value='Send'
              aria-label='send'
              eventLabel='Email Submission Attempted'
              handleClick={() => { /* do nothing */ }}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
