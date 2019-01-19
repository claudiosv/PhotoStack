import React from 'react';

import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Mosaic from './Mosaic.jsx';

const GET_PHOTOSET = gql`
{
	getPhotos {
		id
		objectId
		height
		width
	}
}
`;

const gcd = (a, b) => {
	return (b === 0) ? a : gcd(b, a % b);
};

export default class MosaicContainer extends React.Component {
	render() {
		const {query} = this.props;
		const title = (query === '') ? 'All' : 'Looking for "' + query + '"';
		return (
			<Query query={GET_PHOTOSET}>
				{({loading, error, data}) => {
					if (loading) {
						return 'Loading...';
					}
					if (error) {
						console.log(error);
						return null;
					}
					const {getPhotosByUser} = data;
					console.log(getPhotosByUser);
					return (
						<Mosaic
							title={title}
							photoSet={
								getPhotosByUser.map(({id, objectId, height, width}) => {
									const r = gcd(width, height);
									return {
										key: id,
										src: 'http://localhost:4000/image/' + objectId,
										width: width / r,
										height: height / r
									};
								})
							}
						/>
					);
				}}
			</Query>
		);
	}
}
