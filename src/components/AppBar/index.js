import React, { useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { Context } from '../../Context'
import { useDialog } from '../../hooks/useDialog'
import { Link } from './styles'

export default function MyAppBar({ drawerOpen, setDrawerOpen, drawerWidth }) {
  const useStyles = makeStyles(theme => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    title: {
      flexGrow: 1,
    },
  }));
  
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { auth } = useContext(Context)
  const { confirm, success } = useDialog()

  function handleDrawerOpen(value) {
    setDrawerOpen(value)
  }

  function handleSignOut() {
    handleClose()
    confirm({ title: 'Mensaje', message: '¿Esta seguro de querer cerrar su sesión?'})
    .then(result => {
      if(result)
        success('¡Su sesión se ha cerrado con exito!')
          .then(() => auth.removeItem())
    })
  }

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: drawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => handleDrawerOpen(!drawerOpen)}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap className={classes.title}>
          <Link to={'/'}>
            LA HORMIGA MARKET
          </Link>
        </Typography>
        
        <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Mi Cuenta</MenuItem>
              <MenuItem onClick={handleSignOut}>Cerrar Sesión</MenuItem>
            </Menu>
        </div>
      </Toolbar>
    </AppBar>

  );
}
