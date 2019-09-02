import React, { Children } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { Link } from './styles'

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const MenuItem = ({ children, title, url, subMenu = false, expand = false, open = '', handle = null }) => {
  const classes = useStyles();

  if(expand) {
    return (
      <ListItem button onClick={() => handle(title)}>
          <ListItemIcon>
            {children}
          </ListItemIcon>
          <ListItemText primary={title} />
          {open === title ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
    )
  } else {
    return (
      <ListItem button className={subMenu ? classes.nested : ''}>
          <Link to={url}>
            <ListItemIcon>
              {children}
            </ListItemIcon>
            <ListItemText primary={title} />
          </Link>
        </ListItem>
    )
  }
}