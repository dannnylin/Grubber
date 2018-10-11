import React from 'react';
import { Card, CardImg, CardSubtitle, CardTitle, Button, CardBody, CardText } from 'reactstrap';

export default class RestaurantCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantName: "Restaurant Name",
      restaurantCuisine: "American",
      restaurantPrice: "$$"
    };
  }
  render() {
    return (
      <div>
        <Card>
          <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
          <CardBody>
            <CardTitle> { this.state.restaurantName }</CardTitle>
            <CardSubtitle> { this.state.restaurantCuisine } { this.state.restaurantPrice }</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}