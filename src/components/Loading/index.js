import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  align: {
    textAlign: 'center',
  },
}));

export const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.align}>
      <CircularProgress />
    </div>
  )
}