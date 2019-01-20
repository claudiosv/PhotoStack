import React from 'react';
import {Title} from 'bloomer';
import Gallery from 'react-photo-gallery';
import PropTypes from 'prop-types';
import {navigate} from '@reach/router';

export default class Mosaic extends React.PureComponent {
	render() {
		const {title, photoSet} = this.props;
		return (
			<div className="mosaic">
				<Title isSize={4}>{title}</Title>
				<Gallery
					photos={photoSet}
					columns={4}
					onClick={(e, {photo}) => {
						navigate('photo/' + photo.key);
					}}/>
			</div>
		);
	}
}

Mosaic.propTypes = {
	title: PropTypes.string.isRequired,
	photoSet: PropTypes.array.isRequired
};
