import React from "react";
import Header from "../Header";
import Gallery from "react-photo-gallery";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Page from "../Page";
import Mosaic from "../Mosaic/Mosaic.jsx";

const GET_HEAP_PHOTOS = gql`
  query GetHeapPhotos($query: [String!]!) {
    searchPhotos(query: $query, conjunctive: false) {
      id
      objectId
      height
      width
    }
  }
`;

const GET_HEAP = gql`
  query GetHeap($id: ID!) {
    getHeap(id: $id) {
      name
      tags
    }
  }
`;

const gcd = (a, b) => {
  return b === 0 ? a : gcd(b, a % b);
};

export default class HeapView extends React.Component {
  render() {
    return (
      <Query query={GET_HEAP} variables={{ id: this.props.heapId }}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading..";
          }
          if (data) {
            const heap = data.getHeap;
            console.log(heap);
            return (
              <>
                <Header type="title" titleText={heap.name} />
                <Query query={GET_HEAP_PHOTOS} variables={{ query: heap.tags }}>
                  {({ loading, error, data }) => {
                    if (loading) {
                      return "Loading..";
                    }
                    if (data) {
                      const { searchPhotos } = data;
                      return (
                        <Mosaic
                          title=""
                          photoSet={searchPhotos.map(
                            ({ id, objectId, height, width }) => {
                              console.log(width, height);
                              const r = gcd(width, height);
                              return {
                                key: id,
                                src:
                                  document.location.origin +
                                  "/image/" +
                                  objectId,
                                width: width / r,
                                height: height / r
                              };
                            }
                          )}
                        />
                      );
                    }
                  }}
                </Query>
              </>
            );
          }
        }}
      </Query>
    );
  }
}
