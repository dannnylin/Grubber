import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';
import Cookies from 'js-cookie';
import { Redirect, withRouter } from 'react-router-dom';

class NavigationBar extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			redirect: false,
			isLoggedIn: Cookies.get('uuid')
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	redirect(event) {
		if (event._dispatchInstances.memoizedProps.data == "favorites") {
			this.setState({
				location: "favorites"
			});
		} else if (event._dispatchInstances.memoizedProps.data == "friends") {
			this.setState({
				location: "friends"
			});
		} else {
			this.setState({
				location: "messages"
			});
		}
		fetch('/api/getFavorites', {
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({uuid: Cookies.get('uuid')})
		}).then(response => {
			response.json().then(data => {
				this.setState({
					restaurants: data,
					redirect: true
				});
			});
		});
	}
	renderRedirect() {
		if (this.state.redirect) {
			if (this.state.location == "favorites") {
				this.props.history.push({
					pathname: '/favorites',
					state: { restaurants: this.state.restaurants }
				});
			} else if (this.state.location == "friends") {
				this.props.history.push({
					pathname: '/friends'
				});
			} else {
				this.props.history.push({
					pathname: '/messages'
				});
			}
		}
	}
	logout(event) {
		event.preventDefault();
		window.location = '/api/logout';
	}
	render() {
		if (this.state.isLoggedIn) {
			return (
				<div>
					{this.renderRedirect()}
					<Navbar color="dark" dark expand="md">
						<NavbarBrand href="/">Grubber</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink data={"friends"} onClick={this.redirect.bind(this)}>Friends</NavLink>
								</NavItem>
								<NavItem>
									<NavLink data={"messages"} onClick={this.redirect.bind(this)}>Messages</NavLink>
								</NavItem>
								<NavItem>
									<NavLink data={"favorites"} onClick={this.redirect.bind(this)}>Favorites</NavLink>
								</NavItem>
								<UncontrolledDropdown nav inNavbar>
									<DropdownToggle nav caret>
										Profile
                </DropdownToggle>
									<DropdownMenu right>
										<DropdownItem>
										Settings
                  </DropdownItem>
										<DropdownItem divider />
										<DropdownItem onClick={this.logout.bind(this)}>
										Logout
                  </DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							</Nav>
						</Collapse>
					</Navbar>
				</div>
			);
		} else {
			return (
				<div>
					{this.renderRedirect()}
					<Navbar color="dark" dark expand="md">
						<NavbarBrand href="/">Grubber</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
						</Collapse>
					</Navbar>
				</div>
			);
		}
	}
}

export default withRouter(NavigationBar);