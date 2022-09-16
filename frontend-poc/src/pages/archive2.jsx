import { useEffect, useState } from "react";
import React from "react";
import {withRouter, Redirect} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { HeartFill } from 'react-bootstrap-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import 'regenerator-runtime/runtime'

import { Contract } from 'near-api-js'

import './archive2.css';
import { create_idea, idea, ideas_for_owner, login, get_all_ideas, get_investment_goal, total_investments, get_investment_for_idea, invest, add_like_to_idea, logout } from "../assets/near/utils";
import Popup from "./popup";




const Archive2 = () => {
  
  const [ideas, setIdeas] = useState([]);
  const [currentInvValue, setCurrentInvValue] = useState(0.2);
  const ONE_NEAR= 1000000000000000000000000;
  const [popupInfo, setPopupInfo] = useState({open: false, msg: ''});
  const accountId = window.accountId;

  useEffect(() => { 
    get_all_ideas().then( resIdeas => {
      console.log('ideas from all ideas: ', resIdeas);
      get_ideas_info(resIdeas);
    });
  }, [] )


  async function get_ideas_info(ideas) {
    for(const idea of ideas) {
      const goal = await get_investment_goal(idea.idea_id)
      idea.inv_goal = goal;

      const inv = await get_investment_for_idea(idea.idea_id)
      idea.inv_total = inv.total_amount / ONE_NEAR;

      const totalInv = await total_investments();
      idea.investors = totalInv;
    }

    setIdeas(ideas);

  }

  function investInIdea(event) {
    
    if(accountId) {
      const ideaId = event.target.getAttribute('data-idea');
      invest({value: (currentInvValue * ONE_NEAR), acc: accountId, ideaId: ideaId});
    }else {
      setPopupInfo({open: true, msg: 'Please connect wallet to invest into the idea'});
    }
  }


  async function likeIdea(event) {
    console.log(event.target);
    
    if(accountId) {
      const ideaId = event.currentTarget.getAttribute('data-idea');
      const likedIdea = await add_like_to_idea({ideaId: ideaId, accountId: accountId});
      console.log('LIKED IDEA: ', likedIdea);
    }else {
      setPopupInfo({open: true, msg: 'Please connect wallet to like the idea'});
    }
    
  }
  
  return (
    <React.Fragment>
      <div className="container-fluid">
        <button onClick={()=>login()}>Sign in</button>
        <button className="link" style={{ float: 'right' }} onClick={()=>ideas_for_owner().then((response)=>
        console.log('response from create idea: ', response))}>
          List ideas
        </button>
        <button className="link" style={{ float: 'right' }} onClick={()=>create_idea().then((response)=>
        console.log('response from create idea: ', response))}>
          Create ideas
        </button>
         <button className="link" style={{ float: 'right' }} onClick={()=>logout().then((response)=>
        console.log('response from create idea: ', response))}>
          signout
        </button>
    {
      ideas.map((item, id) => {
        console.log('ITEM: ', item);
        return (<div className="row" key={id}>
          <div className="col-12 mt-3">
            <div className="card">
                <div className="card-body d-flex mt-auto flex-sm-column flex-lg-row row">
                  <div className="col-xs-12 col-sm-12 col-lg-3">
                    <img className="w-100" src={item.metadata.picture_url} alt="Card image cap" />
                  </div>
                  <div className="card-content d-flex mt-lg-auto flex-column justify-content-center mt-3 col-xs-12 col-sm-12 col-md-12 col-lg-7">
                    <h4 className="card-title text-center text-md-start text-lg-start" style={{cursor: 'pointer'}} onClick={() => { window.location.href='/' + item.idea_id}}>{item.metadata.title}</h4>
                    <p className="card-text mb-3">
                      {item.metadata.excerpt}
                    </p>
                    <p className="card-tags d-flex justify-content-center align-items-center flex-wrap">
                      {
                        item.metadata.tags.map((element, i) => {
                          if(i === 0) {
                            return (<Button key={i} variant="outline-primary" className="mb-2">{element}</Button>);
                          }else {
                            return (<Button key={i} variant="outline-primary" className="ms-2 mb-2">{element}</Button>);
                          } 
                        })
                      }
                        <button className="ms-auto" style={{height: '35px'}} data-idea={item.idea_id} onClick={(e) => likeIdea(e)} >
                          <HeartFill color="red" size='30px'/>
                        </button>
                    </p>
                  </div>
                  <div className="card-info col-xs-12 col-sm-12 col-lg-2 mt-4 mt-md-0 mt-lg-0">
                    <div className="raised-wrap">
                        <p className="mb-3">Raised</p>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: ((100 * item.inv_total) / item.inv_goal ) + '%' }} role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    {/* <div className="supp-wrap d-flex justify-content-between align-items-center mt-3">
                      <p style={{margin: 0}}>Supporters</p>
                      <Button variant="outline-primary">{item.investors > 0 ? item.investors : 0}</Button>
                    </div> */}
                    <div className="invest-wrap d-flex mt-3  justify-content-start align-items-center">
                      <select className="form-select" defaultValue={0.2} style={{width: '30%'}} aria-label="Default select example" onChange={(e) => setCurrentInvValue(e.target.value)}>
                        <option value="0.1">0.1</option>
                        <option value="0.2">0.2</option>
                        <option value="0.5">0.5</option>
                        <option value="1">1</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                      </select>
                      {/* <p className="me-3 ms-1">NEAR</p> */}
                      <img src="/near-logo.png" className="ms-2" style={{height: '30px', width: 'auto'}}/>
                      <Button variant="outline-primary ms-auto" data-idea={item.idea_id} onClick={(e) => investInIdea(e)}>INVEST</Button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>)
      })
    }
    </div>
    {
      popupInfo.open &&
      <Popup msg={popupInfo.msg} setPopupInfo={setPopupInfo} />
    }
    </React.Fragment>
    
  );

};

export default withRouter(Archive2);
