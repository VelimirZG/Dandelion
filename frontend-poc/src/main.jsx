import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Archive from "./pages/archive";
import Single from "./pages/single";

const Main = () => {

  return (
    <BrowserRouter>
      <Route exact path="/" render={() => <Archive/> } />
      <Route exact path="/:ideaId"  render={() => <Single/> } />
    </BrowserRouter>
  );

};

export default Main;
