import React from "react";
import { navigate, Link } from '@reach/router'
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {
  },
};

const CustomToolbar = ({ classes, url }) => {
  
  const handleClick = () => {
    navigate(url)
  }

  return (
    <Tooltip title={"Registrar"}>
      <IconButton className={classes.iconButton} onClick={handleClick}>
        <AddIcon className={classes.deleteIcon} />
      </IconButton>
    </Tooltip>
  );

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);