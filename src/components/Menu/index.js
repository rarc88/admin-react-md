import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import { Link } from './styles'

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

export default function NestedList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState('');

  React.useEffect(() => {
    !props.drawerOpen && setOpen('')
  }, [props.drawerOpen])

  function handleClick(value) {
    value === open ? setOpen('') : setOpen(value);
    value != '' && props.handleDrawerOpen(true)
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button>
        <Link to={'/administrators'}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Menu 1" />
        </Link>
      </ListItem>

      <ListItem button onClick={() => handleClick('Menu 2')}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Menu 2" />
        {open === 'Menu 2' ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open === 'Menu 2'} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="SubMenu 2.1" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={() => handleClick('Menu 3')}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Menu 3" />
        {open === 'Menu 3' ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open === 'Menu 3'} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="SubMenu 3.1" />
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
