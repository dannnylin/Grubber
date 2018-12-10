import React from 'react';
import NavigationBar from "./NavigationBar";
import Cookies from 'js-cookie';
import { Table } from 'reactstrap';

export default class FavoritesView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				restaurants: this.props.location.state.restaurants,
				redirect: false
	  };
	}

	redirect(data) {
		if ("id" in data) {
			this.setState({
				restaurantId: data["id"],
				redirect: true
			});
		} else {
			this.setState({
				restaurantId: data["_id"],
				redirect: true
			});
		}
	}

	renderRedirect() {
		if (this.state.redirect) {
			this.props.history.push({
				pathname: '/restaurant/' + this.state.restaurantId
			});
		}
	}

	render() {
		let data = this.state.restaurants;
		return (
			<div>
				{this.renderRedirect()}
				<NavigationBar/>
				<Table>
					<thead>
						<tr>
							<th>Restaurant Name</th>
							<th>Price</th>
							<th>Rating & Reviews</th>
						</tr>
					</thead>
		   			<tbody>
	   					{data.map((restaurant) =>
							<tr>
								<td key={restaurant.name.toLowerCase()} onClick={this.redirect.bind(this, restaurant)}>{restaurant.name}</td>
								<td>{restaurant.price}</td>
								<td>{restaurant.review_count} reviews - {restaurant.rating} &#9733;</td>
							</tr>
	   					)}
		   			</tbody>
				</Table>
			</div>
		)
	}
}