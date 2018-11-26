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
			redirect: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	redirect() {
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
			this.props.history.push({
				pathname: '/favorites',
				state: { restaurants: this.state.restaurants }
			});
		}
	}
	render() {
		return (
			<div>
				{ this.renderRedirect() }
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">Grubber</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink onClick={this.redirect.bind(this)}>Favorites</NavLink>
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
									<DropdownItem>
										Logout
                  </DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

export default withRouter(NavigationBar);