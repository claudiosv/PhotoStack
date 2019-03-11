import React from 'react';
import {Title, Image} from 'bloomer';
import Gallery from 'react-photo-gallery';
import PropTypes from 'prop-types';
import {navigate} from '@reach/router';

export default class Mosaic extends React.PureComponent {
	render() {
		const {title, photoSet} = this.props;
		console.log(photoSet);
		return (
			<div className="mosaic">
				<Title isSize={4}>{title}</Title>
				<Gallery
					photos={photoSet}
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
