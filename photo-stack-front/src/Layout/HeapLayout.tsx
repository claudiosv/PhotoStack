import React from "react";
import { Container } from "bloomer";

import { Router } from "@reach/router";
import HeapView from "../Heap/HeapView.jsx";
import PhotoContainer from "../Photo";

export default class HeapLayout extends React.Component {
  render() {
    return (
      <Container>
        <Router>
          <HeapView path=":heapId" />
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
