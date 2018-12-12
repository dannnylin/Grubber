import React from 'react';
import Cookies from 'js-cookie';
import NavigationBar from './NavigationBar';
import { Jumbotron, Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col, timeoutsShape } from 'reactstrap';

export default class BusinessView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantId: this.props.match.params.id,
      showButton: true
    };
    let id = this.state.restaurantId;
    fetch('/api/getVisited', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({uuid: Cookies.get('uuid')})
    }).then(response => {
      response.json().then(data => {
        if (data.includes(id)) {
          this.setState({
            showButton: false
          });
        }
      });
    });
    this.handleMarkVisited = this.handleMarkVisited.bind(this);
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

  handleMarkVisited(event) {
    event.preventDefault();
    var data = {
      uuid: Cookies.get('uuid')
    };

    if ("id" in this.state.restaurant) {
      data["_id"] = this.state.restaurant["id"]
    } else {
      data["_id"] = this.state.restaurant["_id"]
    }

    fetch('/api/markVisited', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(response => {
      response.text().then(data => {
        console.log("Done added!");
        this.setState({
          showButton: false
        });
      })
    });
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
              <Form>
              { this.state.showButton ?
                <Button color="primary" onClick={this.handleMarkVisited}>Mark as Visited</Button>: null
              }
              </Form>
            </Jumbotron>
          }
      </div>
    )
  }
}