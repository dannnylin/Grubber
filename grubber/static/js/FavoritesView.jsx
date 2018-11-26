import React from 'react';
import NavigationBar from "./NavigationBar";
import Cookies from 'js-cookie';
import { Table } from 'reactstrap';

export default class FavoritesView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
	      restaurants: this.props.location.state.restaurants
	    };
	}

	render() {
		let data = this.state.restaurants;
		return (
			<div>
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
							<tr key={restaurant.name.toLowerCase()}>
								<td>{restaurant.name}</td>
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

// {data.map((restaurant) => {
// 		   				<Row>
// 		   					<Col key={restaurant.id}>
// 		   						{restaurant.name}
// 		   					</Col>
// 		   				</Row>
// 		   			})}