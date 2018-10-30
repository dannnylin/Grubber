import React from 'react';
import { Container, Card, CardImg, CardSubtitle, CardTitle, Button, CardBody, CardText } from 'reactstrap';
import Swipeable from 'react-swipy';

const appStyles = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  minHeight: "100vh",
  fontFamily: "sans-serif",
  overflow: "hidden"
};

const wrapperStyles = { position: "relative", width: "250px", height: "250px" };
const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12
};

export default class RestaurantCard extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.restaurants);
    this.remove = this.remove.bind(this);
    this.restaurants = this.props.restaurants;
  }

  remove() {
    this.restaurants = this.restaurants.splice(1, this.restaurants.length);
  };

  render() {
    return (
      <div style={appStyles}>
        <div style={wrapperStyles}>
          {this.restaurants.length > 0 ? (
            <div>
              <Swipeable
                buttons={({ left, right }) => (
                  <div>
                    <Button onClick={left}>Reject</Button>
                    <Button onClick={right}>Accept</Button>
                  </div>
                )}
                onAfterSwipe={this.remove}
              >
                <Card>
                  <CardBody>
                    {/* <CardImg width="25%" src="https://www.nextpittsburgh.com/wp-content/uploads/2017/03/1U6A2894-1.jpg"/> */}
                    <CardTitle>{this.restaurants[0].name}</CardTitle>
                    <Button>Learn More</Button>
                  </CardBody>
                </Card>
              </Swipeable>
              {this.restaurants.length > 1 && <Card zindex={-1}>{this.restaurants[1].name}</Card>}
            </div>
          ) : (
              <Card zindex={-2}>No more cards</Card>
            )}
      </div>
      </div>
    );
  }
}