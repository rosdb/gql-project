import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

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
