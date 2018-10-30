import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, timeoutsShape } from 'reactstrap';
import NavigationBar from "./NavigationBar";
import TinderView from "./TinderView";

export default class RestaurantsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: this.props.location.state.restaurants
    };
  }
  render() {
    return (
      <div>
        <NavigationBar />
        <Container>
          <TinderView restaurants={this.state.restaurants.businesses} />
        </Container>
      </div>
    )
  }
}