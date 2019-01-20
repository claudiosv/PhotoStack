import React from "react";
import { Container } from "bloomer";
import MosaicContainer from "../Mosaic";

import { Router } from "@reach/router";
import PhotoContainer from "../Photo";

export default class SearchLayout extends React.Component {
  render() {
    return (
      <Container>
        <Router>
          <MosaicContainer path=":query" isSearch />
          <PhotoContainer
            isOpen
            path="photo/:photoId"
            onClose={() => {
              console.log("search!");
              window.history.back();
            }}
          />
        </Router>
      </Container>
    );
  }
}
