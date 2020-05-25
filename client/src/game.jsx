import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";
import gql from "graphql-tag";

export const GET_GAME_DETAILS = gql`
  query($gameId: ID!) {
    gameDetails(id: $gameId) {
      title
      description
      rating
      website
      image
    }
  }
`;

function Game({ gameId }) {
  const { data, loading, error } = useQuery(GET_GAME_DETAILS, {
    variables: { gameId },
	});
	
	const noHtmlTag = new RegExp(/(<([^>]+)>)/ig);

  let content;

  console.log("loading", loading);
  console.log("error", error);
  console.log("dettagli gioco cliccato", data);

  if (loading) content = <CircularProgress />;
  if (error) content = <p>ERROR: {error.message}</p>;
  if (data)
    content = (
      <div>
				<img alt={data.gameDetails.title} src={data.gameDetails.image} width="100%" />
        <h1>{data.gameDetails.title}</h1>
        <p>{data.gameDetails.description.replace(noHtmlTag, '')}</p>
        <span>{data.gameDetails.rating}</span>
        <p>{data.gameDetails.website}</p>
				<span>back</span>
      </div>
    );

  return <Fragment>{content || <p>Not found</p>}</Fragment>;
}

export default Game;
