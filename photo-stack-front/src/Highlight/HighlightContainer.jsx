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
								<Image src="https://via.placeholder.com/1280x1280"/>
							</Box>
						)
					}/>
				</Tile>
				<Tile isParent isVertical>
					<Tile isChild render={
						props => (
							<Box>
								<Image src="https://via.placeholder.com/480x480"/>
							</Box>
						)
					}/>
					<Tile isChild render={
						props => (
							<Box>
								<Image src="https://via.placeholder.com/480x480"/>
							</Box>
						)
					}/>
				</Tile>
				<Tile isParent isVertical>
					<Tile isChild render={
						props => (
							<Box>
								<Image src="https://via.placeholder.com/480x480"/>
							</Box>
						)
					}/>
					<Tile isChild render={
						props => (
							<Box>
								<Image src="https://via.placeholder.com/480x480"/>
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
