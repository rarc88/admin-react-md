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

const RESOURCE = '/items'

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

const useItemRegister = (id) => {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  const { success } = useDialog()

  const { loading, data, fetchData } = useFetch()
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [preview, setPreview] = useState(undefined)

  const category = useInputValue('')
  const brand = useInputValue('')
  const code = useInputValue('')
  const name = useInputValue('')
  const description = useInputValue('')
  const measure = useInputValue('')
  const size = useInputValue('')
  const status = useInputValue('')

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);

    fetchData({ resource: '/categories', method: 'GET', backgroud: true })
      .then(json => setCategories(json.data))
    fetchData({ resource: '/brands', method: 'GET', backgroud: true })
      .then(json => setBrands(json.data))
    fetchData({ resource: '/measures', method: 'GET', backgroud: true })
      .then(json => setMeasures(json.data))
    
    if(id) {
      fetchData({ resource: `${RESOURCE}/${id}/detail`, method: 'GET' })
        .then(json => {
          const item = json.data[0]
          category.setValue(item.id_category)
          brand.setValue(item.id_brand)
          code.setValue(item.code)
          name.setValue(item.name)
          description.setValue(item.description ? item.description : '')
          measure.setValue(item.id_measure)
          size.setValue(item.size)
          status.setValue(item.status)
          setPreview(`http://localhost:3000/items/${item.photo}`)
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
          success('Producto actualizado con exito!')
            .then(() => navigate(RESOURCE))
      })
    } else {
      fetchData({ resource: `${RESOURCE}/register`, body: data  })
      .then(json => {
        if(json.status)
          success('Producto registrado con exito!')
            .then(() => navigate(RESOURCE))
      })
    }
  }

  return {
    inputLabel, labelWidth,
    loading, data,
    preview, handleFileChange,
    categories, category, brands, brand, code, name, description, measures, measure, size, status,
    handleSubmit
  }
}

export const ItemRegister = ({ id = undefined, title  }) => {
  const classes = useStyles();
  const inputFile = document.querySelector('#photo')
  const {
    inputLabel, labelWidth,
    loading, data,
    preview, handleFileChange,
    categories, category, brands, brand, code, name, description, measures, measure, size, status,
    handleSubmit
  } = useItemRegister(id)

  return (
    <div className={classes.root}>

      {
        (data && (data.status === false)) && <MySnackbar variant="error" message={data.message} show={true} />
      }

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>

          <MyTitleBar back={RESOURCE} title={`${title} Productos`} loading={loading} />

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
                  <FormControl variant="outlined" className={classes.formControl} required>
                    <InputLabel ref={inputLabel}>
                      Categoria
                    </InputLabel>
                    <Select
                      input={<OutlinedInput labelWidth={labelWidth} />}
                      name="category"
                      {...category.controls}
                    >
                      {
                        categories.map(category => {
                          return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <FormControl variant="outlined" className={classes.formControl} required>
                    <InputLabel ref={inputLabel}>
                      Marca
                    </InputLabel>
                    <Select
                      input={<OutlinedInput labelWidth={labelWidth} />}
                      name="brand"
                      {...brand.controls}
                    >
                      {
                        brands.map(brand => {
                          return <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <TextField
                    label="Codigo"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    name="code"
                    {...code.controls}
                  />
                </Grid>

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

                <Grid item xs={12}>
                  <TextField
                    label="Descripcion"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    name="description"
                    {...description.controls}
                  />
                </Grid>

                <Grid item lg={6} xs={12}>
                  <FormControl variant="outlined" className={classes.formControl} required>
                    <InputLabel ref={inputLabel}>
                      Medida
                    </InputLabel>
                    <Select
                      input={<OutlinedInput labelWidth={labelWidth} />}
                      name="measure"
                      {...measure.controls}
                    >
                      {
                        measures.map(measure => {
                          return <MenuItem key={measure.id} value={measure.id}>{measure.name}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item lg={6} xs={12}>
                  <TextField
                    label="Tamaño"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    name="size"
                    {...size.controls}
                  />
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