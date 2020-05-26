import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";
import MediaCard from "./card";
import Game from "./game";
import "./App.scss";

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
  const [id, setId] = useState();

  let content;

  if (loading)
    content = (
      <span className="spinner">
        <CircularProgress />
      </span>
    );
  if (error) content = <p>ERROR</p>;
  if (data)
    content = id ? <Game gameId={id}/> : data.games.map((item) => (
      <MediaCard
        key={item.id}
        title={item.title}
        image={item.details.image}
        description={item.details.description}
        onClick={() => setId(item.id)}
      />
    ));

  console.log('lista', data);
  console.log('gioco cliccato', id);

  return <div className="App">{content || <p>Not found</p>}</div>;
}

export default App;
