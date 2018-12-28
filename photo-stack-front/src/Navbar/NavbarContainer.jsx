import React from 'react';
import PropTypes from 'prop-types';
import {Navbar, NavbarBrand, NavbarItem, NavbarEnd, NavbarMenu, NavbarDropdown, NavbarLink, NavbarBurger, NavbarStart, Field, Input, Control, Title} from 'bloomer';
import logo from '../logo.svg';

export default class NavbarContainer extends React.Component {
	render() {
		let item;
		let menu;
		if (this.props.title !== '') {
			item = <Title isSize={3}>{this.props.title}</Title>;
		} else if (this.props.username !== '') {
			item = (
				<Field>
					<Control isLoading={this.props.isLoading}>
						<Input type="text" isSize="medium" placeholder="Search..." onChange={e => this.props.onSearch(e.target.value)}/>
					</Control>
				</Field>
			);
			menu = (
				<NavbarItem hasDropdown isHoverable>
					<NavbarLink>{this.props.username}</NavbarLink>
					<NavbarDropdown>
						<NavbarItem href="#">Preferences</NavbarItem>
						<NavbarItem href="#">Sign out</NavbarItem>
					</NavbarDropdown>
				</NavbarItem>
			);
		}

		return (
			<Navbar className="is-fixed-top">
				<NavbarBrand>
					<NavbarItem href="/">
						<img src={logo} alt="Ooopsie!" width="48" height="32"/>
					</NavbarItem>
					<NavbarBurger/>
				</NavbarBrand>
				<NavbarMenu>
					<NavbarStart style={{flexGrow: 1, justifyContent: 'center'}}>
						<NavbarItem>
							{item}
						</NavbarItem>
					</NavbarStart>
					<NavbarEnd>
						{menu}
					</NavbarEnd>
				</NavbarMenu>
			</Navbar>
		);
	}
}

NavbarContainer.propTypes = {
	title: PropTypes.string,
	username: PropTypes.string,
	onSearch: PropTypes.func,
	isLoading: PropTypes.bool
	// O onSubmit: PropTypes.func.isRequired
};
NavbarContainer.defaultProps = {
	title: '',
	username: '',
	onSearch: () => {},
	isLoading: false
};
