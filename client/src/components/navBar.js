import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import DraggableDialog from './loginFormContainer';

const defaultProps = {
  bgcolor: "background.paper",
  m: 1,
  style: { width: "99%" },
};
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flex: 1,
  },
}));

export default function NavBar(appBarColors) {
  const classes = useStyles();

  return (
        <AppBar style={{
          color: appBarColors.color.color,
          background : appBarColors.color.backgroundColor, 
          }} elevation={0}>
          <Box 
            borderBottom={2} 
            {...defaultProps} 
            borderBottomColor={appBarColors.color.backgroundColor}
          >
          <Toolbar 
            style={{
              backgroundColor: appBarColors.color.backgroundColor
            }}
          >
            <Typography variant="h6" className={classes.title} >
              Google Fonts
            </Typography>
            <Button color="inherit">Catalog</Button>
            <Button color="inherit">Featured</Button>
            <Button color="inherit">Articles</Button>
            <DraggableDialog />
          </Toolbar>
          </Box>
        </AppBar>   
  );
}