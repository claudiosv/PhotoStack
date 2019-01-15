import React from 'react';
import {Modal, ModalBackground, ModalContent, ModalClose, Box} from 'bloomer';
import ImageGallery from 'react-image-gallery';

export default class Photo extends React.PureComponent {
	render() {
		const {isOpen, onClose, photoList} = this.props;
		return (
			<Modal isActive={isOpen}>
				<ModalBackground onClick={onClose}/>
				<ModalContent>
					<Box>
						<ImageGallery items={photoList} showPlayButton={false} showFullscreenButton={false} infinite={false}/>
					</Box>
				</ModalContent>
				<ModalClose isSize="large" onClick={onClose}/>
			</Modal>
		);
	}
}
