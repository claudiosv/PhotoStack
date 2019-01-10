import React from 'react';
import PropTypes from 'prop-types';
import {Image, Navbar, NavbarBrand, NavbarItem, NavbarEnd, NavbarMenu, NavbarDropdown, NavbarLink, NavbarBurger, NavbarStart, Field, Control, Title} from 'bloomer';
import logo from '../logo.svg';
import HeaderSearch from './HeaderSearch.jsx';
import '../stylesheets/header.scss';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mobileIsActive: false
		};
	}

	toggleMobileMenu() {
		this.setState(state => ({
			mobileIsActive: !state.mobileIsActive
		}));
	}

	render() {
		const {type, titleText, userName, onSearch} = this.props;
		const {mobileIsActive} = this.state;

		const title = (
			<Title isSize={3}>{titleText}</Title>
		);

		const search = (
			<Field>
				<Control>
					<HeaderSearch onSearch={onSearch}/>
				</Control>
			</Field>
		);

		const menu = (
			<NavbarItem hasDropdown isHoverable>
				<NavbarLink>{userName}</NavbarLink>
				<NavbarDropdown>
					<NavbarItem href="#">Preferences</NavbarItem>
					<NavbarItem href="/signout">Sign out</NavbarItem>
				</NavbarDropdown>
			</NavbarItem>
		);
		return (
			<Navbar className="is-fixed-top">
				<NavbarBrand>
					<NavbarItem href="/">
						<Image isSize="32x32" src={logo}/>
					</NavbarItem>
					<NavbarBurger isActive={mobileIsActive} onClick={this.toggleMobileMenu}/>
				</NavbarBrand>
				<NavbarMenu isActive={mobileIsActive}>
					<NavbarStart style={{justifyContent: 'center'}}>
						<NavbarItem>
							{{
								empty: null,
								title,
								search
							}[type]}
						</NavbarItem>
					</NavbarStart>
					<NavbarEnd>
						{{
							empty: null,
							title: null,
							search: menu
						}[type]}
					</NavbarEnd>
				</NavbarMenu>
			</Navbar>
		);
	}
}

Header.propTypes = {
	type: PropTypes.oneOf(['empty', 'search', 'title']).isRequired,
	titleText: PropTypes.string,
	onSearch: PropTypes.func,
	userName: PropTypes.string
};

Header.defaultProps = {
	titleText: '',
	onSearch: null,
	userName: ''
};
