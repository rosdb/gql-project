import React, { useEffect } from "react";
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

const handleScroll = (targetId) => {
  if (!targetId) return;

  const targetElement = document.getElementById(targetId);
  const scrollDistance = targetElement.getBoundingClientRect().top;
  processScroll(scrollDistance);
};

const processScroll = (dimenY) => {
  __processScroll(dimenY, 0, 1);
};

const __processScroll = (distanceLeft, distanceCovered, stepSize) => {
  setTimeout(() => {
    if (distanceLeft > distanceCovered) {
      stepSize = 1.1 * stepSize;
    } else {
      stepSize = Math.ceil(0.91 * stepSize);
    }
    window.scrollTo(0, distanceCovered);
    if (distanceLeft > 0) {
      __processScroll(
        distanceLeft - stepSize,
        distanceCovered + stepSize,
        stepSize
      );
    }
  }, 50);
};

function App() {
  const { data, loading, error } = useQuery(GET_GAMES);

  const [close, setClose] = React.useState(true);
  const [id, setId] = React.useState();

  let content;

  const handleClose = async () => {
    await setClose(true);
    if (data) {
      handleScroll(id);
    }
    
  };

  if (loading)
    content = (
      <span className="spinner">
        <CircularProgress />
      </span>
    );
  if (error) content = <p>ERROR</p>;
  if (data) {
    content = data.games.map((item) => {
      return (
        <div id={item.id}>
          <Link
            key={item.id}
            style={{ textDecoration: "none" }}
            to={`game/${item.id}`}
          >
            <MediaCard
              idPath={item.id}
              key={item.id}
              title={item.title}
              image={item.details.image}
              description={item.details.description}
              onClick={() => setId(item.id)}
            />
          </Link>
        </div>
      );
    });
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <MediaCards>{content || <p>Not found</p>}</MediaCards>
        </Route>
        <Route
          path="/game/:id"
          children={
            <GameModal openModal={close} closeModal={() => handleClose()} />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
