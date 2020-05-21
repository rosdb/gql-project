import React from 'react';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import './App.css';

const GET_GAMES = gql`
  query getGames {
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

  if (loading) return  <div className="App"><p>...loading</p></div>;
  if (error) return <div className="App"><p>ERROR</p></div>;
  if (!data) return <div className="App"><p>Not found</p></div>;

  console.log(data);

  return (
    <div className="App">
      {data.games.map((item) => <p key={item.id}>{item.title}</p>)}
    </div>
  );
}

export default App;
