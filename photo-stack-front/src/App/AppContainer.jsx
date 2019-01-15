import React from "react";
import FileDrop from "react-file-drop";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Header from "../Header";
import App from "./App.jsx";
import PhotoContainer from "../Photo";

const UPLOAD_FILE = gql`
  mutation uploadPhoto($file: Upload!) {
    uploadPhoto(file: $file) {
      filename
    }
  }
`;

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: "0",
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
    return (
      <Mutation mutation={UPLOAD_FILE}>
        {uploadFile => (
          <FileDrop onDrop={([file]) => uploadFile({ variables: { file } })}>
            <Header
              type="search"
              userName={user.firstName}
              onSearch={this.handleSearch}
              onPreferences={this.togglePreferences}
            />
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
        )}
      </Mutation>
    );
  }
}
