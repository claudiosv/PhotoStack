import React from 'react';
import PropTypes from 'prop-types';
import {Hero, HeroBody, Column, HeroHeader, Container, Heading} from 'bloomer';
import HeaderContainer from '../Header';

export default class Session extends React.PureComponent {
	render() {
		const {children} = this.props;
		return (
			<Hero isFullHeight>
				<HeroHeader>
					<HeaderContainer type="empty"/>
				</HeroHeader>
				<HeroBody>
					<Container hasTextAlign="centered" hasTextColor="dark">
						<Column isSize={4} isOffset={4}>
							<Heading>PhotoStack</Heading>
							{children}
						</Column>
					</Container>
				</HeroBody>
			</Hero>
		);
	}
}

Session.propTypes = {
	children: PropTypes.element.isRequired
};
