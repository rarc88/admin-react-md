import React from 'react'
import { navigate } from '@reach/router'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Loading } from '../Loading'
import { MyIconButton } from '../MyIconButton'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const MyTitleBar = ({ back, title, loading  }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <a onClick={() => {
          navigate(back, { replace: true })
        }} className={classes.anchor}>
          <MyIconButton>
            <ArrowBackIcon />
          </MyIconButton>
        </a>
        <Typography variant="h5" className={classes.root}>
          {title}
        </Typography>
        {loading && <Loading />}
      </Paper>
    </Grid>
  )
}