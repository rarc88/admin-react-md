import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';

import { MyAvatar } from '../../../components/MyAvatar'
import { MySnackbar } from '../../../components/MySnackbar'
import { MyTitleBar } from '../../../components/MyTitleBar'

import { useFetch } from '../../../hooks/useFetch'
import { useInputValue } from '../../../hooks/useInputValue'
import { useDialog } from '../../../hooks/useDialog'

const RESOURCE = '/administrators'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  hide: {
    display: 'none',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const useAdministratorRegister = (id) => {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const { success } = useDialog()

  const { loading, data, fetchData } = useFetch()
  const [roles, setRoles] = useState([]);
  const [preview, setPreview] = useState(undefined)
  const name = useInputValue('')
  const email = useInputValue('')
  const password = useInputValue('')
  const role = useInputValue('')
  const status = useInputValue('')

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);

    fetchData({ resource: '/roles', method: 'GET', backgroud: true })
      .then(json => setRoles(json.data))
    
    if(id) {
      fetchData({ resource: `${RESOURCE}/${id}/detail`, method: 'GET' })
        .then(json => {
          const admin = json.data[0]
          name.setValue(admin.name)
          email.setValue(admin.email)
          role.setValue(admin.id_role)
          status.setValue(admin.status)
          setPreview(`http://localhost:3000/profiles/${admin.photo}`)
        })
    }
  }, []);

  const handleFileChange = (e) => {
    if(e.target.files[0]) {
      const tmp = URL.createObjectURL(e.target.files[0])
      setPreview(tmp)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)

    if(id) {
      fetchData({ resource: `${RESOURCE}/${id}/update`, body: data, method: 'PUT' })
      .then(json => {
        if(json.status)
          success('¡Administrador actualizado con exito!')
            .then(() => navigate(RESOURCE))
      })
    } else {
      fetchData({ resource: '/auth/signup', body: data  })
      .then(json => {
        if(json.status)
          success('¡Administrador registrado con exito!')
            .then(() => navigate(RESOURCE))
      })
    }
  }

  return {inputLabel, labelWidth, loading, data, roles, status, preview, name, email, password, role, handleFileChange, handleSubmit}
}

export const AdministratorRegister = ({ id = undefined, title  }) => {
  const classes = useStyles();
  const inputFile = document.querySelector('#photo')
  const {inputLabel, labelWidth, loading, data, roles, status, preview, name, email, password, role, handleFileChange, handleSubmit} = useAdministratorRegister(id)

  return (
    <div className={classes.root}>

      {
        (data && (data.status === false)) && <MySnackbar variant="error" message={data.message} show={true} />
      }

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>

          <MyTitleBar back={RESOURCE} title={`${title} Administrador`} loading={loading} />

          <Grid item lg={3} xs={12}>
            <Paper className={classes.paper}>
              <input
                type="file"
                id="photo"
                onChange={handleFileChange}
                className={classes.hide}
                name="photo"
              />
              <a onClick={() => { inputFile.click() }}>
                <MyAvatar url={preview} />
              </a>
            </Paper>
          </Grid>

          <Grid item lg={9} xs={12}>
            <Paper className={classes.paper}>

              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <TextField
                    label="Nombre"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    name="name"
                    {...name.controls}
                  />
                </Grid>

                <Grid item lg={6} xs={12}>
                  <TextField
                    label="Correo"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    name="email"
                    {...email.controls}
                  />
                </Grid>

                <Grid item lg={6} xs={12}>
                  <TextField
                    label="Contraseña"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required={!id && true}
                    type="password"
                    name="password"
                    {...password.controls}
                  />
                </Grid>

                <Grid item lg={6} xs={12}>
                  <FormControl variant="outlined" className={classes.formControl} required>
                    <InputLabel ref={inputLabel}>
                      Rol
                    </InputLabel>
                    <Select
                      input={<OutlinedInput labelWidth={labelWidth} />}
                      name="role"
                      {...role.controls}
                    >
                      {
                        roles.map(rol => {
                          return <MenuItem key={rol.id} value={rol.id}>{rol.name}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <FormControl variant="outlined" className={classes.formControl} required>
                    <InputLabel ref={inputLabel}>
                      Estado
                    </InputLabel>
                    <Select
                      input={<OutlinedInput labelWidth={labelWidth} />}
                      name="status"
                      {...status.controls}
                    >
                      <MenuItem value="1">Activo</MenuItem>
                      <MenuItem value="0">Inactivo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" disabled={loading} >
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}