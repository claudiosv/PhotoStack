import React from 'react';
import PropTypes from 'prop-types';
import {Image, Navbar, NavbarBrand, NavbarItem, NavbarEnd, NavbarMenu, NavbarDropdown, NavbarLink, NavbarBurger, NavbarStart, Field, Input, Control, Title} from 'bloomer';
import {throttle} from 'throttle-debounce';
import logo from '../logo.svg';
import '../stylesheets/header.scss';

export default class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ''
		};
		this.doSearch = throttle(1000, this.props.onSearch);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		const val = event.target.value;
		this.setState({
			input: val
		}, () => {
			this.doSearch(val);
		});
	}

	render() {
		const {type, titleText, isBusy, userName} = this.props;
		const {input} = this.state;
		const title = (
			<Title isSize={3}>{titleText}</Title>
		);
		const search = (
			<Field>
				<Control isLoading={isBusy}>
					<Input type="text" isSize="medium" value={input} placeholder="Search..." onChange={this.handleChange}/>
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
					<NavbarBurger/>
				</NavbarBrand>
				<NavbarMenu>
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
	isBusy: PropTypes.bool,
	userName: PropTypes.string
};

Header.defaultProps = {
	titleText: '',
	onSearch: null,
	isBusy: false,
	userName: ''
};
