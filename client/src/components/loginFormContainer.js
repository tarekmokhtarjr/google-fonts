import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);

  const handleOnSubmit = () => {
    axios('/login', {
      method: 'POST',
      params: {'username': username, 'password': password},
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
        if(res.data === 'Success'){
            localStorage.setItem('user', username);
            handleClose();
        }else {
          alert('Authentication failed ! please type correct username or password');
        }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  };
  const handleLogout = () => {
      localStorage.removeItem('user');
      window.location.reload();
  };

  return (
    <div>
      { !localStorage.user &&
        <Button color={"inherit"} onClick={handleClickOpen}>
            Login
        </Button>
      }
      { localStorage.user && 
        <Button color={"inherit"}>
          Hi {localStorage.user} <PersonIcon />
        </Button> 
      }
      { localStorage.user &&
        <Button color={"inherit"} onClick={handleLogout}>
           Logout 
        </Button>
      }
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} validate onSubmit={e => e.preventDefault()}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(event) => {
                                setUsername(event.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleOnSubmit}
                            disabled={username.length === 0 || password.length === 0}
                        >
                            Sign In
                        </Button>
                    </form>
                </div>
                <Box mt={8}>
                </Box>
            </Container>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}