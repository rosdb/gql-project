import React, { Fragment } from "react";
import {
  CircularProgress,
  Button,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import { noHtmlTag } from "./card";

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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "40%",
  },
  buttom: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

function GameModal({ gameId, openModal, closeModal }) {
  const { data, loading, error } = useQuery(GET_GAME_DETAILS, {
    variables: { gameId },
  });

  const classes = useStyles();

  let content;

  console.log("loading", loading);
  console.log("error", error);
  console.log("dettagli gioco cliccato", data);

  if (loading) content = <CircularProgress />;
  if (error) content = <p>ERROR: {error.message}</p>;
  if (data)
    content = (
      <Fragment>
        <img
          alt={data.gameDetails.title}
          src={data.gameDetails.image}
          width="100%"
        />
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={closeModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">{data.gameDetails.title}</h2>
              <p id="transition-modal-description">
                {data.gameDetails.description.replace(noHtmlTag, "")}
              </p>
              <div className={classes.buttom}>
                <p>
                  RATING: <b>{data.gameDetails.rating}</b>
                </p>
                <Button color="primary" href={data.gameDetails.website}>Go to Website</Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </Fragment>
    );

  return <Fragment>{content || <p>Not found</p>}</Fragment>;
}

export default GameModal;
