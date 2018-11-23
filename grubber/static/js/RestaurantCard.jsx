import React, {Component} from 'react'
import {render} from 'react-dom'
import { Card, CardWrapper } from 'react-swipeable-cards'

export default class RestaurantCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messageButton: "Add End Card",
      showEndCard: false,
      restaurants: this.props.restaurants,
      likedRestaurants: []
    }
    console.log(this.state.restaurants);
  }

  onSwipeLeft(data) {
    this.setState({
      message: ""
    });
  }

  onSwipeRight(data) {
    this.setState({
      message: "You liked " + data.name,
      likedRestaurants: this.state.likedRestaurants.concat(data)
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
      <div style={titleStyle}>
        You Finished Swiping!
      </div>
    );
  }

  changeEndCardState(e) {
    e.preventDefault();
    let showingEndCard = this.state.showEndCard;
    let message = showingEndCard ? "Add End Card" : "Remove End Card";
    this.setState({
      messageButton: message,
      showEndCard: !showingEndCard
    });
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
      maxWidth: "100%",
      height: "auto"
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
          <div>
            <img src={d.image_url} style={imageStyle} />
          </div>
        </Card>
      );
    });
  }

  render() {
    let wrapperStyle = {
      backgroundColor: "#024773",
      height: "80vh"
    };
    let containerStyle = {
      backgroundColor: "#024773",
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
        <CardWrapper style={wrapperStyle} addEndCard={this.state.showEndCard ? this.addEndCard.bind(this) : null}>
          {this.renderCards()}
        </CardWrapper>
        <div style={messageStyle}>{this.state.message}</div>
      </div>
    );
  }
}