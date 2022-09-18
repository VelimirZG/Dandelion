import { useEffect, useState } from "react";
import React from "react";
import {withRouter, Redirect} from "react-router-dom";

import { login, logout } from "../assets/near/utils";
import IdeaForm from "./ideaForm";




const Navbar = () => {
  
  const [openIdeaForm, setOpenIdeaForm] = useState(false);
  const accountId = window.accountId;
  
  function walletLogout() {
    logout();
    console.log('AFTER LOGUT: ', accountId)
  }
  return (
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col">
        <a href="/">
          <img src="/logo.png" className="ms-2" style={{width: 'auto'}}/>
        </a>
      </div>
      {
        accountId && 
        <div className="col d-flex justify-content-center align-items-center">
          <button className="btn btn-primary" style={{ float: 'right' }} onClick={()=> setOpenIdeaForm(true)}>
              Create idea
          </button>
        </div>
      }
      <div className="col ms-auto">
        {accountId ? 
          <button className="btn btn-danger" style={{ float: 'right' }} onClick={()=> walletLogout()}>Sign out</button>
            :
          <button className="btn btn-primary" style={{ float: 'right' }} onClick={()=>login()}>Connect wallet</button>
        }
      </div>
      {
      openIdeaForm &&
        <IdeaForm setOpenIdeaForm={setOpenIdeaForm} />
      }
    </div>
  );

};

export default Navbar;
