import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import MediaCard from "./card";
import MediaCards from "./cards";
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
      <Switch>
        <Route path="/:title">
          <GameModal
            gameId={id}
            openModal={open}
            closeModal={() => handleClose()}
          />
        </Route>
      </Switch>
    ) : (
      data.games.map((item) => (
        <Link style={{ textDecoration: 'none' }} to={item.title.toLowerCase().split(" ").join("-")}>
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
        </Link>
      ))
    );

  console.log("lista", data);
  console.log("gioco cliccato", id);

  return (
    <div className="App">
      <Router>
        <Route path="/">
          <MediaCards>{content || <p>Not found</p>}</MediaCards>
        </Route>
      </Router>
    </div>
  );
}

export default App;
