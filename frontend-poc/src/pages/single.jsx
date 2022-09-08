import React from "react";
import {withRouter} from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


const Single = () => {

  return (
    <div className="container">
      <div className="row">
         <div className="col d-flex flex-column">
            <h1 className="mb-3">Project title</h1>
            <div className="mb-3">
              <Badge pill bg="secondary" className="me-2" >Primary</Badge>
              <Badge pill bg="secondary" className="me-2">Tag 1</Badge>
              <Badge pill bg="secondary" className="me-2">the bulk</Badge>
              <Badge pill bg="secondary" className="me-2">Secondary</Badge>
            </div>
            <img className="w-100 mb-3" src="http://via.placeholder.com/300x180" alt="Card image cap" />
            <div>
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" >
                <Tab eventKey="home" title="Home">
                  <p>O! lest the world should task you to recite What merit lived in me, that you should love After my death,--dear love, forget me quite, For you in me can nothing worthy prove; Unless you would devise some virtuous lie, To do more for me than mine own desert, And hang more praise upon deceased I Than niggard truth would willingly impart: O! lest your true love may seem false in this That you for love speak well of me untrue,</p>
                </Tab>
                <Tab eventKey="profile" title="Profile">
                  <p>O! lest the world should task you to recite What merit lived in me, that you should love After my death,--dear love, forget me quite, For you in me can nothing worthy prove; Unless you would devise some virtuous lie, To do more for me than mine own desert, And hang more praise upon deceased I Than niggard truth would willingly impart: O! lest your true love may seem false in this That you for love speak well of me untrue,</p>
                </Tab>
                <Tab eventKey="contact" title="Contact">
                  <p>O! lest the world should task you to recite What merit lived in me, that you should love After my death,--dear love, forget me quite, For you in me can nothing worthy prove; Unless you would devise some virtuous lie, To do more for me than mine own desert, And hang more praise upon deceased I Than niggard truth would willingly impart: O! lest your true love may seem false in this That you for love speak well of me untrue,</p>
                </Tab>
              </Tabs>
            </div>
         </div>
         <div className="col d-flex flex-column">
          <div className="card mt-3">
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">TOTAL DEPOSITED</h6>
              <h3 className="fw-bold">168,963.6647 <span className="text-muted">stNEAR</span></h3>
              <p className="mb-4">~ $842,996.247 USD</p>
              <div className="row">
                <div className="col">
                  <p className="text-muted">SUPPORTERS</p>
                  <h4 className="fw-bold">86</h4>
                </div>
                <div className="col">
                  <p className="text-muted">STATUS</p>
                  <h4 className="fw-bold">Finished</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <p className="card-subtitle mb-4 text-muted">GOALS</p>
                <div className="d-flex justify-content-between mb-1">
                  <div className="d-flex justify-content-center align-items-center">
                    <span className="text-success">Goal 1</span>  
                    <p className="fw-bold ms-4">125,000 stNEAR</p>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <Badge pill bg="primary">In progress</Badge>
                    <span className="ms-1 fw-bold">25.00%</span>
                  </div>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: "25%"}} role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
          </div>
          <button type="button" class="btn btn-success mt-3">Connect wallet to fund</button>
         </div>
      </div>
    </div>     
  );

};

export default withRouter(Single);