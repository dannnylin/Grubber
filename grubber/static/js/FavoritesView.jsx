import React from 'react';
import NavigationBar from "./NavigationBar";

export default class FavoritesView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<NavigationBar />
				Hello World!
			</div>
		)
	}
}