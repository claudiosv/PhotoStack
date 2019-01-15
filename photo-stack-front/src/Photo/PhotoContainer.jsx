import React from 'react';
import Photo from './Photo.jsx';

import '../stylesheets/photo.scss';

export default class PhotoContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			photoList:  [
				{
					original: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
					thumbnail: 'https://source.unsplash.com/2ShvY8Lf6l0/80x59'
				},
				{
					original: 'https://source.unsplash.com/Dm-qxdynoEc/800x799'
				},
				{
					original: 'https://source.unsplash.com/qDkso9nvCg0/600x799'
				},
				{
					original: 'https://source.unsplash.com/iecJiKe_RNg/600x799'
				}
			]
		};
	}

	// componentDidMount() {
	// 	const {photoId} = this.props;
	// 	// Retrive all detivatives 
	// }

	render(){
		const {isOpen, onClose} = this.props;
		const {photoList} = this.state;

		return <Photo isOpen={isOpen} photoList={photoList} onClose={onClose}/>;
	}
}
