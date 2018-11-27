import React, {Component} from 'react'
import {render} from 'react-dom'
import { Card, CardWrapper } from 'react-swipeable-cards'
import Cookies from 'js-cookie';

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
  }

  onSwipeLeft(data) {
    this.setState({
      message: ""
    });
    this.setState({
      restaurants: this.state.restaurants.slice(1)
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
      console.log(response);
    });
    this.setState({
      restaurants: this.state.restaurants.slice(1)
    });
  }

  onDoubleTap(data) {
    this.setState({
      message: ""
    });
  }

  addEndCard() {
    if (this.state.restaurants.length == 0) {
      let data = {
        restaurants: this.state.seenRestaurants,
        uuid: Cookies.get('uuid')
      };
      fetch('/api/addSeenRestaurants', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      }).then(response => {
        console.log(response);
      });
    }
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