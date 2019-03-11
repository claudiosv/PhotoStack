import React from "react";
import FileDrop from "react-file-drop";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Header from "../Header";
import { Redirect, Match } from "@reach/router";
import fetchProgress from "fetch-progress";
import { upload } from "xhr-file";

const GET_USER = gql`
  query getUser {
    getUser {
      firstName
    }
  }
`;

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      uploading: false
    };
  }

  uploadAction = fileList => {
    var data = new FormData();
    for (let i = 0; i < fileList.length; i++)
      data.append("photos", fileList[i]);
    this.setState({ uploading: true });
    const self = this;
    const hostUrl = document.location.origin + "/upload";
    const onProgress = ev => {
      if (ev.lengthComputable) {
        const progress = Math.floor((100 * ev.loaded) / ev.total);
        self.setState({ progress: progress });
      }
    };
    upload(hostUrl, { data, onProgress })
      .then(res => {
        console.log("res", res);
      })
      .catch(err => console.log("Upload failed: ", err));
  };

  render() {
    const { progress, uploading } = this.state;
    return (
      <FileDrop onDrop={this.uploadAction}>
        <div class={uploading ? "modal is-active" : "modal"}>
          <div class="modal-background" />
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Upload</p>
              <button
                class="delete"
                onClick={() => this.setState({ uploading: false })}
                aria-label="close"
              />
            </header>
            <section class="modal-card-body">
              <progress class="progress" value={progress} max="100">
                {progress}%
              </progress>
              {progress < 100 && `Uploaded ${progress}%`}
              {progress == 100 &&
                "Upload successful. Please allow time for the images to be processed before it can be searched. Dismiss alert to refresh page."}
            </section>
            <footer
              class="modal-card-foot"
              style={{ justifyContent: "flex-end" }}
            >
              <button
                onClick={() => this.setState({ uploading: false })}
                class="button"
              >
                Done
              </button>
            </footer>
          </div>
        </div>
        <Query query={GET_USER}>
          {({ loading, error, data }) => {
            if (loading) {
              return "Loading...";
            }
            if (data) {
              return (
                <Header
                  type="search"
                  userName={data.getUser.firstName}
                  onSearch={this.handleSearch}
                  onPreferences={this.togglePreferences}
                />
              );
            }
            console.log(JSON.stringify(error));
            return <Redirect to="/signin" />;
          }}
        </Query>
        {this.props.children}
      </FileDrop>
    );
  }
}
