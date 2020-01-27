import React from "react";

import Input from '../components/Objects/Input/Input';
import homeLogo from "../images/homeLogo.png";

export default function LoginView() {
  /************************************
   * Render
   ************************************/

  return (
    <div className="authentication-view-body ">
        <div className="authentication-input-container"> 
            <img src={homeLogo} alt="oneleif logo" />
            <form>
                <Input className={'auth'} label={'Email'}/>
                <Input className={'auth'} label={'Password'} type={"password"}/>
                <div className="authentication-actions-module">
                  <span>Forgot your password?</span>
                  <button>Log in</button>
                </div>
            </form>
        </div>
    </div>
  );
};
