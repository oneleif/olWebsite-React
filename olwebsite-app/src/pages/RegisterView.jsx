import React from "react";
import { Link, withRouter } from "react-router-dom";

import Input from '../components/Objects/Input/Input';
import homeLogo from "../images/homeLogo.png";

function RegisterView() {
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
                <Input className={'auth'} label={'Reenter Password'} type={"password"}/>
                <div className="authentication-actions-module">
                  <Link to="/login">
                    Already have an account?
                  </Link>
                  <button>Sign up</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default withRouter(RegisterView);
