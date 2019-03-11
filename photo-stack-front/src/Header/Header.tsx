import React from 'react';
import PropTypes from 'prop-types';
import {Image, Navbar, NavbarBrand, NavbarItem, NavbarEnd, NavbarMenu, NavbarDropdown, NavbarLink, NavbarBurger, NavbarStart, Field, Control, Title} from 'bloomer';
import logo from '../logo.svg';
import HeaderSearch from './HeaderSearch.jsx';
import {navigate} from '@reach/router';
import '../stylesheets/header.scss';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mobileIsActive: false
		};
		this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
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
			<Title isSize={4}>{titleText}</Title>
		);

		const search = (
			<Field>
				<Control>
					<HeaderSearch onEnter={value => 
						navigate('/search/'+ value.map(v => v.value).join('&'))
					} onEmpty={() => navigate('/')}/>
				</Control>
			</Field>
		);

		const menu = (
			<NavbarItem hasDropdown isHoverable>
				<NavbarLink>{userName}</NavbarLink>
				<NavbarDropdown>
					<NavbarItem href="/preferences">Preferences</NavbarItem>
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
							title: <NavbarItem href="javascript:window.history.back()">Go Back</NavbarItem>,
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
	onModal: PropTypes.func.isRequired,
	userName: PropTypes.string
};

Header.defaultProps = {
	titleText: '',
	onSearch: null,
	userName: ''
};
