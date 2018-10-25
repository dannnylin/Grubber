import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Main from "./Main";
import RestaurantsView from "./RestaurantsView";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route path="/" component={Main} />
      <Route path="/restaurantsView" component={RestaurantsView} />
    </div>
  </BrowserRouter>
  ),
  document.getElementById('content') 
);