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
    this.state = {rightSwiped: []};
    this.remove = this.remove.bind(this);
    this.right = this.right.bind(this);
    this.state.cards = this.props.restaurants;
  }

  remove() {
    this.setState(({ cards }) => ({
      cards: cards.slice(1, cards.length),
    }))
  };

  right() {
    this.state.rightSwiped.push(this.state.cards[0]);
  }

  render() {
    const { cards } = this.state;
    return (
      <div style={appStyles}>
        <div style={wrapperStyles}>
          {cards.length > 0 ? (
            <div>
              <Swipeable
                buttons={({ left, right }) => (
                  <div style={actionsStyles}>
                    <Button onClick={left}>Reject</Button>
                    <Button onClick={right}>Accept</Button>
                  </div>
                )}
                onAfterSwipe={this.remove}
              >
                <Card>
                  <CardBody>
                    {<CardImg width="25%" src={cards[0].image_url}/>}
                    <CardTitle>{cards[0].name}</CardTitle>
                    <Button>Learn More</Button>
                  </CardBody>
                </Card>
              </Swipeable>
            </div>
          ) : (
              <Card zindex={-2}>No more cards</Card>
            )}
      </div>
      </div>
    );
  }
}