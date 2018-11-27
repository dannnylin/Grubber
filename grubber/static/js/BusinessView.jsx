import React from 'react';
import Cookies from 'js-cookie';
import NavigationBar from './NavigationBar';
import { Jumbotron, Button } from 'reactstrap';

export default class BusinessView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantId: this.props.match.params.id
    };
  }

  async componentDidMount() {
    const response = await fetch("/api/restaurant/" + this.state.restaurantId);
    const json = await response.json();
    this.setState({ restaurant: json });
  }

  redirect(event) {
    event.preventDefault();
    window.location = this.state.restaurant.url;
  }

  render() {
    let imageStyle = {
      maxWidth: "100%",
      height: "auto"
    }
    return (
      <div>
        <NavigationBar/>
          { this.state && this.state.restaurant &&
            <Jumbotron>
              <h1 className="display-3">{this.state.restaurant.name}</h1>
              <img src={this.state.restaurant.image_url} style={imageStyle} />
              <hr className="my-2" />
              <b>Price</b>: {this.state.restaurant.price} <br/>
              <b>Reviews</b>: {this.state.restaurant.review_count} <br/>
              <b>Rating</b>: {this.state.restaurant.rating} &#9733; <br/>
              <b>Distance</b>: {(this.state.restaurant.distance / 1609.34).toFixed(2) } miles <br/>
              <b>Address</b>: {this.state.restaurant.location.address1} {this.state.restaurant.location.city}, {this.state.restaurant.location.state} {this.state.restaurant.location.zip_code}
              <p className="lead">
                <Button color="danger" onClick={this.redirect.bind(this)}>View On Yelp!</Button>
              </p>
            </Jumbotron>
          }
      </div>
    )
  }
}