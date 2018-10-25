import React from 'react';
import NavigationBar from "./NavigationBar";

export default class RestaurantsView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <NavigationBar />
      </div>
    )
  }
}