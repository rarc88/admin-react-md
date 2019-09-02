import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import { Menu } from '../Menu'
import { MyAvatar } from '../MyAvatar'

export default function MiniDrawer({ drawerOpen, setDrawerOpen, drawerWidth }) {
  const useStyles = makeStyles(theme => ({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    hide: {
      visibility: 'hidden',
      height: '55px',
    }
  }));
  
  const classes = useStyles();

  function handleDrawerOpen(value) {
    setDrawerOpen(value);
  }

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerOpen,
        [classes.drawerClose]: !drawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        }),
      }}
      open={drawerOpen}
    >
      <div className={!drawerOpen ? classes.hide : ''}>
        <MyAvatar url="http://1.bp.blogspot.com/-ZHf5964XgP0/VEF6GhH40DI/AAAAAAAAFuA/R-F17UMSHn0/s1600/Logo%2BMarquez_Ant.png" />
      </div>

      <Divider />

      <Menu drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />
    </Drawer>
  );
}
