import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Game({ gameId, openModal, closeModal }) {
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
      <img
        alt={data.gameDetails.title}
        src={data.gameDetails.image}
        width="100%"
      />
    );

  return (
    <Fragment>
      {content || <p>Not found</p>}
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
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal>
    </Fragment>
  );
}

export default Game;
