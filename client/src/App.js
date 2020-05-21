import React from 'react';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CircularProgress } from '@material-ui/core';
import  MediaCard  from './card';
import './App.css';

const GET_GAMES = gql`
  query {
        games {
          id
          title
          details {
            title
            description
            rating
            website
            image
          }
        }
      }
`;

function App() {
  const { data, loading, error } = useQuery(GET_GAMES);

  let content;

  if (loading) content = <span><CircularProgress/></span>;
  if (error) content = <p>ERROR</p>;
  if (data) content = data.games.map((item) => <MediaCard key={item.id} title={item.title} image={item.details.image} description={item.details.description}/>) 

  console.log(data);

  return (
    <div className="App">
      {content || <p>Not found</p>}
    </div>
  );
}

export default App;
