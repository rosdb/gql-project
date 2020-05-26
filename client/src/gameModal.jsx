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
  backdrop: {
    backgroundSize: "100%",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    backdropFilter: "blur(10px)"
  },
  paper: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    border: "none",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 15px 20px -15px #2C3E50",
    width: "70%",
  },
  hero: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    textIndent: "-9999px",
    flex: "0 0 30%",
  },
  content: {
    padding: "24px 32px",
  },
  bottom: {
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
        <Backdrop
          style={{ backgroundImage: `url(${data.gameDetails.image})` }}
          className={classes.backdrop}
          open={openModal}
          onClick={closeModal}
        >
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            closeAfterTransition
          >
            <Fade in={openModal}>
              <div className={classes.paper}>
                <div
                  className={classes.hero}
                  style={{ backgroundImage: `url(${data.gameDetails.image})` }}
                >
                  Image
                </div>
                <div className={classes.content}>
                  <h2 id="transition-modal-title">{data.gameDetails.title}</h2>
                  <p id="transition-modal-description">
                    {data.gameDetails.description.replace(noHtmlTag, "")}
                  </p>
                  <div className={classes.bottom}>
                    <p>
                      RATING: <b>{data.gameDetails.rating}</b>
                    </p>
                    <Button color="primary" href={data.gameDetails.website}>
                      Go to Website
                    </Button>
                  </div>
                </div>
              </div>
            </Fade>
          </Modal>
        </Backdrop>
      </Fragment>
    );

  return <Fragment>{content || <p>Not found</p>}</Fragment>;
}

export default GameModal;
