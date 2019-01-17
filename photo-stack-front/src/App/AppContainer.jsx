import React from "react";
import FileDrop from "react-file-drop";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Header from "../Header";
import PhotoContainer from "../Photo";
import App from "./App.jsx";

const UPLOAD_FILE = gql`
  mutation uploadPhoto($file: Upload!) {
    uploadPhoto(file: $file) {
      mimetype
      encoding
      filename
    }
  }
`;

const GET_USER = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      firstName
    }
  }
`;

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: "5c3b59f72a066d02233b4263",
        firstName: "Username"
      },
      showSearchResults: false,
      searchTerms: "",
      selectedPhotoIsOpen: false,
      selectedPhotoId: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handlePhotoSelection = this.handlePhotoSelection.bind(this);
    this.handlePhotoClose = this.handlePhotoClose.bind(this);
  }

  componentDidMount() {
    // Fetch user {id: '', firstName: ''}
  }

  handleSearch(input) {
    if (input.length === 0) {
      this.setState({
        showSearchResults: false,
        searchTerms: ""
      });
    } else {
      this.setState({
        showSearchResults: true,
        searchTerms: input.map(e => e.label).join(" ")
      });
    }
  }

  handleDrop(files) {
    console.log(files);
  }

  handlePhotoSelection(key) {
    this.setState({
      selectedPhotoIsOpen: true,
      selectedPhotoId: key
    });
  }

  handlePhotoClose() {
    this.setState({
      selectedPhotoIsOpen: false,
      selectedPhotoId: ""
    });
  }
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
    const {
      user,
      showSearchResults,
      searchTerms,
      selectedPhotoId,
      selectedPhotoIsOpen,
      preferencesOpen
    } = this.state;
    const { match } = this.props;

    const id = user.id;
    return (
      <FileDrop onDrop={this.uploadAction}>
        <Query query={GET_USER} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) {
              return "Loading...";
            }
            return (
              <Header
                type="search"
                userName={data.getUserById.firstName}
                onSearch={this.handleSearch}
                onModal={() => console.log("error")}
                onPreferences={this.togglePreferences}
              />
            );
          }}
        </Query>

        <App
          showSearchResults={showSearchResults}
          searchTerms={searchTerms}
          onSelectPhoto={this.handlePhotoSelection}
        />
        <PhotoContainer
          isOpen={selectedPhotoIsOpen}
          photoId={selectedPhotoId}
          onClose={this.handlePhotoClose}
        />
      </FileDrop>
    );
  }
}
