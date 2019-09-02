import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';

import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SettingsIcon from '@material-ui/icons/Settings';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import StorageIcon from '@material-ui/icons/Storage';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AppsIcon from '@material-ui/icons/Apps';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CategoryIcon from '@material-ui/icons/Category';
import EventIcon from '@material-ui/icons/Event';
import SpaIcon from '@material-ui/icons/Spa';
import StraightenIcon from '@material-ui/icons/Straighten';

import { MenuItem } from '../MenuItem'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const Menu = ({ drawerOpen, handleDrawerOpen }) => {
  const classes = useStyles()
  const [open, setOpen] = useState('')

  useEffect(() => {
    !drawerOpen && setOpen('')
  }, [drawerOpen])

  function handleClick(value) {
    value === open ? setOpen('') : setOpen(value)
    value != '' && handleDrawerOpen(true)
  }

  return (
    <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
      <MenuItem title="Administracion" url="/administration" subMenu={true} expand={true} open={open} handle={handleClick}>
      <SettingsIcon />
      </MenuItem>
      <Collapse in={open === 'Administracion'} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItem title="Administradores" url="/administrators" subMenu={true}>
            <SupervisorAccountIcon />
          </MenuItem>

          <MenuItem title="Roles" url="/roles" subMenu={true}>
            <PermIdentityIcon />
          </MenuItem>

          <MenuItem title="Permisos" url="/permissions" subMenu={true}>
            <LockOpenIcon />
          </MenuItem>
        </List>
      </Collapse>

      <MenuItem title="Inventario" url="/inventory" subMenu={true} expand={true} open={open} handle={handleClick}>
        <StorageIcon />
      </MenuItem>
      <Collapse in={open === 'Inventario'} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <MenuItem title="Productos" url="/items" subMenu={true}>
            <CategoryIcon />
          </MenuItem>

          <MenuItem title="Lotes" url="/lots" subMenu={true}>
            <EventIcon />
          </MenuItem>

          <MenuItem title="Proveedores" url="/providers" subMenu={true}>
            <LocalShippingIcon />
          </MenuItem>

          <MenuItem title="Categorias" url="/categories" subMenu={true}>
            <AppsIcon />
          </MenuItem>

          <MenuItem title="Medidas" url="/measures" subMenu={true}>
            <StraightenIcon />
          </MenuItem>

          <MenuItem title="Marcas" url="/brands" subMenu={true}>
            <SpaIcon />
          </MenuItem>
        </List>
      </Collapse>

      <MenuItem title="Usuarios" url="/users">
        <AccountBoxIcon />
      </MenuItem>

      <MenuItem title="Ventas" url="/sales">
        <MonetizationOnIcon />
      </MenuItem>

      <MenuItem title="Cuentas" url="/accounts">
        <AccountBalanceIcon />
      </MenuItem>
    </List>
  )
}
