import React from "react";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
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

  const [close, setClose] = React.useState(true);

  const handleClose = () => {
    setClose(true);
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
    content = data.games.map((item) => (
      <Link key={item.id} style={{ textDecoration: "none" }} to={item.id}>
        <MediaCard
          key={item.id}
          title={item.title}
          image={item.details.image}
          description={item.details.description}
        />
      </Link>
    ));

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <MediaCards>{content || <p>Not found</p>}</MediaCards>
        </Route>
        <Route
          path="/:id"
          children={
            <GameModal openModal={close} closeModal={() => handleClose()} />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
