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
import Loading from '../../components/Loading'
import CustomizedSnackbars from '../../components/Snackbar'

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

export default function SignIn() {
  const classes = useStyles();

  const { auth } = useContext(Context)
  const { loading, data, fetchData } = useFetch()
  const email = useInputValue('')
  const password = useInputValue('')
  const [validate, setValidate] = useState(true)

  const handleSubmit = (e) => {
      e.preventDefault()
      const tmp = email.value !== '' && password.value !== ''
      setValidate(tmp)
      if(!tmp)
        return

      fetchData('/auth/signin', { email: email.value, password: password.value })
      .then(json => {
        if(json.auth) auth.setItem(json.token)
      })
  }

  return (
    <Container component="main" maxWidth="xs">

      {
        (data && (data.auth === false)) && <CustomizedSnackbars variant="error" message={data.message} show={true} />
      }

      {
        !validate && <CustomizedSnackbars variant="warning" message="Debe llenar los campos" show={true} callback={setValidate} />
      }

      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            error={ !validate && !email.value }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            { ...email }
          />
          <TextField
            error={ !validate && !password.value }
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            { ...password }
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

          { loading && <Loading /> }
        </form>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}