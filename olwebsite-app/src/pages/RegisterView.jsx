import React from "react";

import Input from '../components/Objects/Input/Input';
import homeLogo from "../images/homeLogo.png";

export default function RegisterView() {
  /************************************
   * Render
   ************************************/

  return (
    <div className="register-view-body ">
        <div className="register-input-container"> 
            <img src={homeLogo} alt="oneleif logo" />
            <form>
                <Input className={'auth'} label={'Email'}/>
                <Input className={'auth'} label={'Password'} type={"password"}/>
                <Input className={'auth'} label={'Reenter Password'} type={"password"}/>
                <button type="submit">Sign up</button>
            </form>
        </div>
    </div>
  );
};
