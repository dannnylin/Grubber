import React from 'react';
import { } from 'reactstrap';
import RestaurantCard from "./RestaurantCard";

export default class TinderView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <RestaurantCard restaurants={this.props.restaurants}/>
    );
  }
}