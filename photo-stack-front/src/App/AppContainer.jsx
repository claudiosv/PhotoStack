import React from 'react';
import FileDrop from 'react-file-drop';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Header from '../Header';
import {Redirect} from '@reach/router';

const GET_USER = gql`
  query getUser {
    getUser {
      firstName
    }
  }
`;

export default class AppContainer extends React.Component {
  uploadAction = (fileList, test) => {
    console.log("up action", fileList, test);
    var data = new FormData();
    for (let i = 0; i < fileList.length; i++)
      data.append("photos", fileList[i]);

    fetch("http://localhost:4000/upload", {
      mode: "no-cors",
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      //   Accept: "application/json",
      //   type: "formData"
      // },
      body: data
    }).then(
      function(res) {
        if (res.ok) {
          alert("Perfect! ");
        } else if (res.status == 401) {
          alert("Oops! ");
        }
      },
      function(e) {
        alert("Error submitting form!");
      }
    );
  };

 
	render() {
		return (
					<FileDrop
						onDrop={this.uploadAction}
					>
						<Query query={GET_USER}>
							{({loading, error, data}) => {
								if (loading) {
									return 'Loading...';
								}
								if (data) {
									return (
                    <Header
                      type="search"
                      userName={data.getUserById.firstName}
                      onSearch={this.handleSearch}
                      onPreferences={this.togglePreferences}
                    />
                  );
                }
                console.log(JSON.stringify(error));
                return null //<Redirect to="/signin"/>
								
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
				);}
}