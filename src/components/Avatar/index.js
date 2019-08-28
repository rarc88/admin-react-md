import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 150,
    height: 150,
  },
});

export default function ImageAvatars() {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Avatar alt="Hormiga Market" src="http://1.bp.blogspot.com/-ZHf5964XgP0/VEF6GhH40DI/AAAAAAAAFuA/R-F17UMSHn0/s1600/Logo%2BMarquez_Ant.png" className={classes.bigAvatar} />
    </Grid>
  );
}