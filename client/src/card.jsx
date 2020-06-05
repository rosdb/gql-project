import React from "react";
import { Card, CardMedia, CardActionArea, CardActions, CardContent, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 30,
  },
  media: {
    height: 140,
  },
  title: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  text: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
});

export const noHtmlTag = new RegExp(/(<([^>]+)>)/ig);

export default function MediaCard({ title, image, description, onClick }) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={title} onClick={onClick}/>
        <CardContent onClick={onClick}>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {title}
          </Typography>
          <Typography
            className={classes.text}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {description.replace(noHtmlTag, '')}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onClick}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
