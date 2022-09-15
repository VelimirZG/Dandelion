import React from "react";
import {withRouter} from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getIdea, get_investment_for_idea, get_investment_goal } from "../assets/near/utils";
import { useState } from "react";
import { useEffect } from "react";


const Single = (props) => {

  const [idea, setIdea] = useState(false);

  const ONE_NEAR= 1000000000000000000000000;

  useEffect(() => {
    const ideaId = props.match.params.ideaId;
    getIdea(ideaId).then( idea => {
      console.log('idea: ', idea);
      getIdeaInfo(idea);
    });
  }, [] )

  async function getIdeaInfo(idea) {
    const goal = await get_investment_goal(idea.idea_id);
    idea.inv_goal = goal;

    const inv = await get_investment_for_idea(idea.idea_id)
    idea.inv_total = inv.total_amount / ONE_NEAR;
    setIdea(idea);
  }
  
  if(idea) {
    return (
      <div className="container">
        <div className="row mt-5">
           <div className="col d-flex flex-column">
              <h1 className="mb-3">{idea.metadata.title}</h1>
              <div className="mb-3">
                {
                  idea.metadata.tags.map((element, i) => {
                    return (<Badge pill key={i} bg="secondary" className="me-2" >{element}</Badge>);
                  })
                }
              </div>
              <img className="w-100 mb-3" src={idea.metadata.picture_url} alt="Card image cap" />
              <div>
                <Tabs defaultActiveKey="excerpt" id="uncontrolled-tab-example" className="mb-3" >
                  <Tab eventKey="excerpt" title="Excerpt">
                    <p>{idea.metadata.excerpt}</p>
                  </Tab>
                  <Tab eventKey="description" title="Description">
                    <p>{idea.metadata.description}</p>
                  </Tab>
                </Tabs>
              </div>
           </div>
           <div className="col d-flex flex-column">
            <div className="card mt-3">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">TOTAL DEPOSITED</h6>
                <h3 className="fw-bold">{idea.inv_goal} <span className="text-muted">stNEAR</span></h3>
                <p className="mb-4">~ $842,996.247 USD</p>
                <div className="row">
                  {/* <div className="col">
                    <p className="text-muted">SUPPORTERS</p>
                    <h4 className="fw-bold">86</h4>
                  </div> */}
                  <div className="col">
                    <p className="text-muted">STATUS</p>
                    <h4 className="fw-bold">
                      {
                        ((100 * idea.inv_total) / idea.inv_goal ) >= 100 ? 'FINISHED' : 'IN PROGRESS'
                      }
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <p className="card-subtitle mb-4 text-muted">GOALS</p>
                  <div className="d-flex justify-content-between mb-1">
                    <div className="d-flex justify-content-center align-items-center">
                      <span className="text-success">Goal</span>  
                      <p className="fw-bold ms-2">{idea.inv_goal} stNEAR</p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                      <Badge pill bg="primary">In progress</Badge>
                      <span className="ms-1 fw-bold">{ ((100 * idea.inv_total) / idea.inv_goal ).toFixed(2) + '%' }</span>
                    </div>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: ((100 * idea.inv_total) / idea.inv_goal ) + '%' }} role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
              </div>
            </div>
            <button type="button" className="btn btn-success mt-3">Connect wallet to fund</button>
           </div>
        </div>
      </div>     
    );
  }else {
    return;
  }
  

};

export default withRouter(Single);