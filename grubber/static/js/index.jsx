import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Main from "./Main";
import RestaurantsView from "./RestaurantsView";
import FavoritesView from "./FavoritesView";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import BusinessView from "./BusinessView";
import FriendsView from "./FriendsView";

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Main} />
      <Route path="/register" exact component={RegistrationForm} />
      <Route path="/login" exact component={LoginForm} />
      <Route path="/restaurantsView" exact component={RestaurantsView} />
      <Route path="/favorites" exact component={FavoritesView} />
      <Route path="/restaurant/:id" exact component={BusinessView} />
      <Route path="/friends" exact component={FriendsView} />
    </div>
  </BrowserRouter>
  ),
  document.getElementById('content') 
);