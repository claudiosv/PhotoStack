import React from 'react';
import {Box, Image, Title} from 'bloomer';
import {Link} from '@reach/router';
import PropTypes from 'prop-types';

import '../stylesheets/heap.scss';

export default class Heap extends React.PureComponent {
	render() {
		const {name, thumbnail, id, noLink} = this.props;
		console.log(id);
		return (
			<>
				{noLink ? (
					<Box>
						<Image isRatio="square" src={thumbnail}/>
						<Title isSize="5">{name}</Title>
					</Box>
				) : (
					<Link to={'heap/' + id}>
						<Box>
							<Image isRatio="square" src={thumbnail}/>
							<Title isSize="5">{name}</Title>
						</Box>
					</Link>
				)}
			</>
		);
	}
}

Heap.propTypes = {
	thumbnail: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired
};
