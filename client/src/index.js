import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/",
});

const client = new ApolloClient({
  cache,
  link,
});

// ... above is the instantiation of the client object.
client
  .query({
    query: gql`
      query getGames {
        games {
          title
          details {
            description
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
