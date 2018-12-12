import React, {Component} from 'react'
import {render} from 'react-dom'
import { Card, CardWrapper } from 'react-swipeable-cards'
import Cookies from 'js-cookie';
import { Row, Container } from 'reactstrap';

class MyEndCard extends Component {
  render() {
    return(
      <div>You Finished Swiping!</div>
    );
  }
}

export default class RestaurantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messageButton: "Add End Card",
      showEndCard: false,
      restaurants: this.props.restaurants,
      seenRestaurants: this.props.restaurants,
      likedRestaurants: []
    }
    window.addEventListener('beforeunload', this.onUnmount, false);
  }

  onUnmount() {
    data = {
      restaurants: this.state.restaurants,
      uuid: Cookies.get('uuid')
    };
    console.log(data);
    fetch('/api/setLastStack', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(response => {
      console.log("done");
    });
  }

  compomentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnmount, false);
    this.onUnmount();
  }

  onSwipeLeft(data) {
    data["uuid"] = Cookies.get('uuid');
    this.setState({
      message: ""
    });
    this.setState({
      restaurants: this.state.restaurants.slice(1)
    });
    fetch('/api/addSeenRestaurant', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(response => {
      // console.log(response);
    });
  }

  onSwipeRight(data) {
    data["uuid"] = Cookies.get('uuid');
    this.setState({
      message: "You liked " + data.name,
      likedRestaurants: this.state.likedRestaurants.concat(data)
    });
    fetch('/api/addFavorite', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    }).then(response => {
      // console.log(response);
    });
    this.setState({
      restaurants: this.state.restaurants.slice(1)
    });
    fetch('/api/addSeenRestaurant', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(response => {
      // console.log(response);
    });
  }

  onDoubleTap(data) {
    this.setState({
      message: ""
    });
  }

  addEndCard() {
    let titleStyle = {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "50px",
      fontFamily: "Sans-Serif",
      marginTop: "10px"
    };
    return(
      <div>
      </div>
    );
  }

  renderCards() {
    let data = this.state.restaurants;
    let titleStyle = {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "20px",
      fontFamily: "Sans-Serif",
      marginTop: "10px"
    };
    let imageStyle = {
      width: "200px",
      height: "200px",
      marginTop: "15px"
    }
    let containerStyle = {
      textAlign: "center"
    }
    return data.map((d) => {
      const categories = d.categories.slice(0,2).map((category) =>
        <li key={category.title}>{category.title}</li> 
      );
      return(
        <Card 
          key={d.id}
          data={d}
          onSwipeLeft={this.onSwipeLeft.bind(this)}
          onSwipeRight={this.onSwipeRight.bind(this)}
          onDoubleTap={this.onDoubleTap.bind(this)}
        >
          <div style={titleStyle}>
            {d.name}
          </div>
          <div style={containerStyle}>
            <img src={d.image_url} style={imageStyle} />
          </div>
          <Container style={{ padding: 20, textAlign: "center"}}>
            <strong>Price</strong> {d.price} <br/>
            <strong>Rating</strong> {d.rating} <br/>
            <strong>Reviews</strong> {d.review_count} <br/>
            <strong>Distance</strong> {(d.distance / 1609.34).toFixed(2) } miles away <br/>
            <strong>Categories</strong>
            <ul>{categories}</ul>
          </Container>
        </Card>
      );
    });
  }

  render() {
    let wrapperStyle = {
      backgroundColor: "#e9ecef",
      height: "80vh",
      margin: "5px"
    };
    let containerStyle = {
      backgroundColor: "#ffffff",
      height: "calc(100vh - 16px)"
    }
    let messageStyle = {
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "2vw",
      fontFamily: "Sans-Serif",
    }
    return(
      <div style={containerStyle}>
        <CardWrapper style={wrapperStyle} addEndCard={this.addEndCard.bind(this)}>
          {this.renderCards()}
        </CardWrapper>
        <div style={messageStyle}>{this.state.message}</div>
      </div>
    );
  }
}