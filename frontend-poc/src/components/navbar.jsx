import { useEffect, useState } from "react";
import React from "react";
import {withRouter, Redirect} from "react-router-dom";

import { login, logout } from "../assets/near/utils";
import IdeaForm from "./ideaForm";
import { colors } from "@material-ui/core";




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
          <img src={`${process.env.PUBLIC_URL}/logo.png`} className="ms-2" style={{width: 'auto'}}/>
        </a>
      </div>
      {
        accountId && 
        <div className="col d-flex justify-content-center align-items-center">
          <button className="btn btn-primary" style={{ float: 'right', backgroundColor:'white', borderColor:'#8275ff', color: '#8275ff' }} onClick={()=> setOpenIdeaForm(true)}>
              Create idea
          </button>
        </div>
      }
      <div className="col ms-auto">
        {accountId ? 
          <button className="btn btn-danger" style={{ float: 'right'}} onClick={()=> walletLogout()}>Disconnect wallet</button>
            :
          <button className="btn btn-primary" style={{ float: 'right', color:'#8275ff', backgroundColor:'white', borderColor:'#8275ff'}} onClick={()=>login()}>Connect wallet</button>
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
