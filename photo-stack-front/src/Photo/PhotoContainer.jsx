import React from 'react';
import Photo from './Photo.jsx';

import '../stylesheets/photo.scss';

export default class PhotoContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			photoList:  [
				{
					original: 'https://images.unsplash.com/photo-1452697620382-f6543ead73b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&h=599',
					thumbnail: 'https://images.unsplash.com/photo-1452697620382-f6543ead73b5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=80&h=59'
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
