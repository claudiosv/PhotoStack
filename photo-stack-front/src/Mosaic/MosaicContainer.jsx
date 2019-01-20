import React from "react";

import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";
import Mosaic from "./Mosaic.jsx";

import { Router, navigate } from "@reach/router";
import PhotoContainer from "../Photo";

import "../stylesheets/mosaic.scss";

const GET_ALL_PHOTOS = gql`
  {
    getPhotos {
      id
      objectId
      height
      width
    }
  }
`;

const SEARCH_PHOTOS = gql`
  query search($query: [String!]!) {
    searchPhotos(query: $query, conjunctive: true) {
      id
      objectId
      height
      width
    }
  }
`;

const gcd = (a, b) => {
  return b === 0 ? a : gcd(b, a % b);
};

export default class MosaicContainer extends React.Component {
  render() {
    const { query, isSearch } = this.props;
    const query_string = query.replace(new RegExp("&", "g"), " ");
    const query_array = query.split("&");
    const title =
      query_string === "" ? "All" : 'Looking for "' + query_string + '"';
    const gql_query = isSearch ? SEARCH_PHOTOS : GET_ALL_PHOTOS;
    return (
      <>
        <Query query={gql_query} variables={{ query: query_array }}>
          {({ loading, error, data }) => {
            if (loading) {
              return "Loading...";
            }
            if (error) {
              console.log(error);
              return null;
            }
            const { getPhotos, searchPhotos } = data;
            const photoSet = getPhotos ? getPhotos : searchPhotos;
            return (
              <Mosaic
                title={title}
                photoSet={photoSet.map(({ id, objectId, height, width }) => {
                  const r = gcd(width, height);
                  return {
                    key: id,
                    src: document.location.origin + "/image/" + objectId,
                    width: width / r,
                    height: height / r
                  };
                })}
              />
            );
          }}
        </Query>
      </>
    );
  }
}
