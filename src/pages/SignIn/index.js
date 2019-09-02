import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useInputValue } from '../../hooks/useInputValue'
import { useFetch } from '../../hooks/useFetch'
import { Loading } from '../../components/Loading'
import { MySnackbar } from '../../components/MySnackbar'

import { Context } from '../../Context'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your WebApp
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Built by '}
      <Link color="inherit" href="https://material-ui.com/">
        R.ARC
      </Link>
    </Typography>
  );
}

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

const useSignIn = () => {
  const { auth } = useContext(Context)
  const { loading, data, fetchData } = useFetch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(e.target)
    fetchData({ resource: '/auth/signin', body: data })
    .then(json => {
      if(json.status) auth.setItem(json.data.token)
    })
  }

  return { loading, data, handleSubmit }
}

export default function SignIn() {
  const classes = useStyles();
  const email = useInputValue('')
  const password = useInputValue('')
  const { loading, data, handleSubmit } = useSignIn()

  return (
    <Container component="main" maxWidth="xs">

      {
        (data && (data.status === false)) && <MySnackbar variant="error" message={data.message} show={true} />
      }

      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Correo Electrónico"
            autoComplete="email"
            autoFocus
            required
            name="email"
            { ...email.controls }
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            required
            name="password"
            { ...password.controls }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Acceder
          </Button>

          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}

        </form>
      </div>

      {loading && <Loading />}

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}