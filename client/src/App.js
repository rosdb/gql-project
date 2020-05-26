import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import MediaCard from "./card";
import GameModal from "./gameModal";
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

  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setId(undefined);
    setOpen(false);
  };

  let content;

  if (loading)
    content = (
      <span className="spinner">
        <CircularProgress />
      </span>
    );
  if (error) content = <p>ERROR</p>;
  if (data)
    content = id ? (
      <GameModal gameId={id} openModal={open} closeModal={() => handleClose()} />
    ) : (
      data.games.map((item) => (
        <MediaCard
          key={item.id}
          title={item.title}
          image={item.details.image}
          description={item.details.description}
          onClick={() => {
            handleOpen();
            setId(item.id);
          }}
        />
      ))
    );

  console.log("lista", data);
  console.log("gioco cliccato", id);

  return <div className="App">{content || <p>Not found</p>}</div>;
}

export default App;
