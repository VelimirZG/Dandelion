import { useEffect, useState } from "react";
import React from "react";
import {withRouter} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { HeartFill } from 'react-bootstrap-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import 'regenerator-runtime/runtime'

import './archive2.css';
import { create_idea, idea, ideas_for_owner, login, get_all_ideas, get_investment_goal, total_investments, get_investment_for_idea } from "../assets/near/utils";




const Archive2 = () => {
  
  const [ideas, setIdeas] = useState([]);
  const ONE_NEAR= 1000000000000000000000000;

  useEffect(() => {
    // ideas_for_owner().then( resIdeas => {
    //   console.log('ideas from get ideas: ', resIdeas);
    //   setIdeas(resIdeas);
    //   console.log(resIdeas)
    // });

    get_all_ideas().then( resIdeas => {
      console.log('ideas from all ideas: ', resIdeas);
      get_ideas_info(resIdeas);
    });
  }, [] )


  async function get_ideas_info(ideas) {
    for(const element of ideas) {
      const idea = element;
      const goal = await get_investment_goal(idea.idea_id)
      element.inv_goal = goal;

      const inv = await get_investment_for_idea(idea.idea_id)
      element.inv_total = inv.total_amount / ONE_NEAR;

      const totalInv = await total_investments();
      element.investors = totalInv;
    }

    setIdeas(ideas);

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
                    <h4 className="card-title text-center text-md-start text-lg-start">{item.metadata.title}</h4>
                    <p className="card-text mb-3">
                      {item.metadata.description}
                    </p>
                    <p className="card-tags d-flex justify-content-center align-items-center flex-wrap">
                      {
                        item.metadata.tags.map((element, i) => {
                          if(i === 0) {
                            return (<Button variant="outline-primary" className="mb-2">{element}</Button>);
                          }else {
                            return (<Button variant="outline-primary" className="ms-2 mb-2">{element}</Button>);
                          }
                        })
                      }
                        <button className="ms-auto" style={{height: '35px'}}>
                          <HeartFill color="red" size='30px'/>
                        </button>
                    </p>
                  </div>
                  <div className="card-info col-xs-12 col-sm-12 col-lg-2 mt-4 mt-md-0 mt-lg-0">
                    <div className="raised-wrap">
                        <p className="mb-3">Raised</p>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: item.inv_goal / item.inv_total + '%' }} role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className="supp-wrap d-flex justify-content-between align-items-center mt-3">
                      <p style={{margin: 0}}>Supporters</p>
                      <Button variant="outline-primary">{item.investors > 0 ? item.investors : 0}</Button>
                    </div>
                    <div className="invest-wrap d-flex justify-content-between mt-3">
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          0.2
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">0.3</Dropdown.Item>
                          <Dropdown.Item href="#/action-2">0.4</Dropdown.Item>
                          <Dropdown.Item href="#/action-3">0.5</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Button variant="outline-primary">INVEST</Button>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>)
      })
    }
    </div>
    </React.Fragment>
    
  );

};

export default withRouter(Archive2);
