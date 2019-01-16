import React from 'react';
import PropTypes from 'prop-types';
import {Box, Image, Tile} from 'bloomer';

export default class HighlightContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		// Load highlight photos
	}

	render() {
		return (
			<Tile isAncestor>
				<Tile isParent isSize={6}>
					<Tile isChild render={
						props => (
							<Box>
								<Image src="https://images.unsplash.com/photo-1524293568345-75d62c3664f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&h=1000"/>
							</Box>
						)
					}/>
				</Tile>
				<Tile isParent isVertical>
					<Tile isChild render={
						props => (
							<Box>
								<Image isRatio="square" src="https://images.unsplash.com/photo-1515688403147-44e0433f180f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=480&h=480"/>
							</Box>
						)
					}/>
					<Tile isChild render={
						props => (
							<Box>
								<Image isRatio="square" src="https://source.unsplash.com/Dm-qxdynoEc/800x799"/>
							</Box>
						)
					}/>
				</Tile>
				<Tile isParent isVertical>
					<Tile isChild render={
						props => (
							<Box>
								<Image isRatio="square" src="https://images.unsplash.com/photo-1495001258031-d1b407bc1776?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=480&h=480"/>
							</Box>
						)
					}/>
					<Tile isChild render={
						props => (
							<Box>
								<Image isRatio="square" src="https://images.unsplash.com/photo-1452697620382-f6543ead73b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=480&h=480"/>
							</Box>
						)
					}/>
				</Tile>
			</Tile>
		);
	}
}

HighlightContainer.propTypes = {
	userId: PropTypes.string.isRequired
};
