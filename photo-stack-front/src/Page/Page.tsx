import React from 'react';
import PropTypes from 'prop-types';
import {Hero, HeroBody, Column, HeroHeader, Container, Heading} from 'bloomer';
import Header from '../Header';

export default class Page extends React.PureComponent {
	render() {
		const {children, title} = this.props;
		return (
			<Hero isFullHeight>
				<HeroHeader>
					<Header type="title" titleText={title}/>
				</HeroHeader>
				<HeroBody>
					<Container hasTextAlign="centered" hasTextColor="dark">
						<Column isSize={5} isOffset={4}>
							{children}
						</Column>
					</Container>
				</HeroBody>
			</Hero>
		);
	}
}

Page.propTypes = {
	children: PropTypes.element.isRequired,
	title: PropTypes.string.isRequired
};
