import {DH_UNABLE_TO_CHECK_GENERATOR} from 'constants';
import React from 'react';
import FileDrop from 'react-file-drop';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';
import Header from '../Header';
import PhotoContainer from '../Photo';
import App from './App.jsx';

const UPLOAD_FILE = gql`
mutation($file: Upload!) {
    uploadPhoto(file: $file) {
		filename
		mimetype
		encoding
    }
  }
`;

const GET_USER = gql`
  query getUserById($id: ID!){
	getUserById(id: $id){
		firstName
	}
  }
`;

export default class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				id: '5c195cb83548db0006e1ebaf',
				firstName: 'Username'
			}
		};
	}

	render() {
		const {
			user
		} = this.state;
		return (
			<Mutation mutation={UPLOAD_FILE}>
				{ mutate => (
					<FileDrop
						onDrop={fileList => {
							mutate({
								variables: {
									file: fileList[0]
								}
							});
						}}
					>
						<Query query={GET_USER} variables={{id: user.id}}>
							{({loading, error, data}) => {
								if (loading) {
									return 'Loading...';
								}
								if (error) {
									console.log(error);
									return null;
								}
								return (
									<Header
										type="search"
										userName={data.getUserById.firstName}
										onSearch={this.handleSearch}
										onPreferences={this.togglePreferences}
									/>
								);
							}}
						</Query>
						{this.props.children}
						{/*
						<PhotoContainer
							isOpen={selectedPhotoIsOpen}
							photoId={selectedPhotoId}
							onClose={this.handlePhotoClose}
						/> */}
					</FileDrop>
				)}
			</Mutation>
		);
	}
}
