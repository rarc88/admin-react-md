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

import { MySnackbar } from '../../../components/MySnackbar'
import { MyTitleBar } from '../../../components/MyTitleBar'

import { useFetch } from '../../../hooks/useFetch'
import { useInputValue } from '../../../hooks/useInputValue'
import { useDialog } from '../../../hooks/useDialog'

const RESOURCE = '/measures'

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
}));

const useMeasureRegister = (id) => {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const { success } = useDialog()

  const { loading, data, fetchData } = useFetch()
  const name = useInputValue('')
  const symbol = useInputValue('')
  const status = useInputValue('')

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    
    if(id) {
      fetchData({ resource: `${RESOURCE}/${id}/detail`, method: 'GET' })
        .then(json => {
          const measure = json.data[0]
          name.setValue(measure.name)
          symbol.setValue(measure.symbol)
          status.setValue(measure.status)
        })
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)

    if(id) {
      fetchData({ resource: `${RESOURCE}/${id}/update`, body: data, method: 'PUT' })
      .then(json => {
        if(json.status)
          success('Medida actualizada con exito!')
            .then(() => navigate(RESOURCE))
      })
    } else {
      fetchData({ resource: `${RESOURCE}/register`, body: data  })
      .then(json => {
        if(json.status)
          success('Medida registrada con exito!')
            .then(() => navigate(RESOURCE))
      })
    }
  }

  return {inputLabel, labelWidth, loading, data, name, symbol, status, handleSubmit}
}

export const MeasureRegister = ({ id = undefined, title  }) => {
  const classes = useStyles();
  const {inputLabel, labelWidth, loading, data, name, symbol, status, handleSubmit} = useMeasureRegister(id)

  return (
    <div className={classes.root}>

      {
        (data && (data.status === false)) && <MySnackbar variant="error" message={data.message} show={true} />
      }

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>

          <MyTitleBar back={RESOURCE} title={`${title} Medida`} loading={loading} />

          <Grid item xs={12}>
            <Paper className={classes.paper}>

              <Grid container spacing={2}>
                <Grid item lg={4} md={6} xs={12}>
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

                <Grid item lg={4} md={6} xs={12}>
                  <TextField
                    label="Simbolo"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    name="symbol"
                    {...symbol.controls}
                  />
                </Grid>

                <Grid item lg={4} md={6} xs={12}>
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