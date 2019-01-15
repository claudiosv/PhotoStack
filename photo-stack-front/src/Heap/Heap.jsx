import React from 'react';
import {Box, Image, Title} from 'bloomer';
import PropTypes from 'prop-types';

import '../stylesheets/heap.scss';

export default class Heap extends React.PureComponent {
	render() {
		const {name, thumbnail} = this.props;
		return (
			<Box>
				<Image isRatio="square" src={thumbnail}/>
				<Title isSize="5">{name}</Title>
			</Box>
		);
	}
}

Heap.propTypes = {
	thumbnail: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};
