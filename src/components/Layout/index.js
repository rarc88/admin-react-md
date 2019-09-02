import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import MyAppBar from '../AppBar';
import Drawer from '../Drawer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const Layout = ({ children }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const drawerWidth = 240;

  return (
    <div className={classes.root}>
      <CssBaseline />

      <MyAppBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} drawerWidth={drawerWidth} />

      <Drawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} drawerWidth={drawerWidth} />
      
      <main className={classes.content}>

        <div className={classes.toolbar} />

        { children }

      </main>
    </div>
  )
}