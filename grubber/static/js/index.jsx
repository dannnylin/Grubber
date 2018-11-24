import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Main from "./Main";
import RestaurantsView from "./RestaurantsView";
import FavoritesView from "./FavoritesView";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Main} />
      <Route path="/restaurantsView" exact component={RestaurantsView} />
      <Route path="/favorites" exact component={FavoritesView} />
    </div>
  </BrowserRouter>
  ),
  document.getElementById('content') 
);