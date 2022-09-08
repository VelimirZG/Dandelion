import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Archive from "./pages/archive";
import Single from "./pages/single";
import './index.css';
import Archive2 from "./pages/archive2";

const Main = () => {

  return (
    <BrowserRouter>
      <Route exact path="/" render={() => <Archive2/> } />
      <Route exact path="/:ideaId"  render={() => <Single/> } />
    </BrowserRouter>
  );

};

export default Main;
