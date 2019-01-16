import React from 'react';
import PropTypes from 'prop-types';
import Mosaic from './Mosaic.jsx';

export default class MosaicContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			photoSet: userPhotos
		};
	}

	// componentDidMount() {
	// 	// Fetch photos with search terms
	// 	const {searchTerms} = this.props;

	// }

	render() {
		const {photoSet} = this.state;
		const {searchTerms, onSelectPhoto} = this.props;
		const title = (searchTerms === '') ? 'All' : 'Looking for "' + searchTerms + '"';
		return <Mosaic title={title} photoSet={photoSet} onSelectPhoto={onSelectPhoto}/>;
	}
}

MosaicContainer.propTypes = {
	searchTerms: PropTypes.string.isRequired
};

const userPhotos = [
	{
		src: 'https://images.unsplash.com/photo-1452697620382-f6543ead73b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=599',
		width: 4,
		height: 3,
		key: 'minioID'
	},
	{
		src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
		width: 1,
		height: 1
	},
	{
		src: 'https://images.unsplash.com/photo-1524293568345-75d62c3664f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&h=800',
		width: 3,
		height: 4
	},
	{
		src: 'https://images.unsplash.com/photo-1515688403147-44e0433f180f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&h=799',
		width: 3,
		height: 4
	},
	{
		src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
		width: 3,
		height: 4
	},
	{
		src: 'https://images.unsplash.com/photo-1513862448120-a41616062133?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=600',
		width: 4,
		height: 3
	},
	{
		src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
		width: 3,
		height: 4
	},
	{
		src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
		width: 4,
		height: 3
	},
	{
		src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
		width: 4,
		height: 3
	},
	{
		src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
		width: 4,
		height: 3,
		key: 'minioID'
	},
	{
		src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
		width: 1,
		height: 1
	},
	{
		src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
		width: 3,
		height: 4
	},
	{
		src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
		width: 3,
		height: 4
	},
	{
		src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
		width: 3,
		height: 4
	},
	{
		src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
		width: 4,
		height: 3
	},
	{
		src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
		width: 3,
		height: 4
	},
	{
		src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
		width: 4,
		height: 3
	},
	{
		src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
		width: 4,
		height: 3
	}
];

