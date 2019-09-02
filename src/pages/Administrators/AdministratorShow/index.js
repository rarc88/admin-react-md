import React, { Fragment, useEffect, useState } from 'react'
import { navigate } from '@reach/router'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';

import { DataTable } from '../../../components/MUIDataTable'
import { MyIconButton } from '../../../components/MyIconButton'
import { Loading } from '../../../components/Loading'
import { MyPaper } from '../../../components/MyPaper'

import { useFetch } from '../../../hooks/useFetch'
import { useDialog } from '../../../hooks/useDialog'

const RESOURCE = '/administrators'

export const AdministratorShow = () => {
  const {loading, fetchData} = useFetch()
  const [dataTable, setDataTable] = useState([])

  const {confirm} = useDialog()

  const columns = [
    {
      name: "Acciones",
      label: 'Acciones',
      options: {
        filter: false,
        sort: false,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Fragment>
              <a onClick={() => {
                const index = tableMeta.rowIndex
                const id = dataTable[index].id
                navigate(`${RESOURCE}/${id}/edit`)
              }}>
                <MyIconButton>
                  <EditIcon color={'primary'} />
                </MyIconButton>
              </a>
              <a onClick={() => {
                const index = tableMeta.rowIndex
                const id = dataTable[index].id
                confirm({ title: 'Mensaje', message: '¿Estas seguro de querer eliminar este administrador?' })
                .then(result => {
                  if(result) {
                    fetchData({ resource: `${RESOURCE}/${id}/delete`, method: 'delete', backgroud: 'true' })
                    .then(json => {
                      const tmp = [...dataTable];
                      tmp.shift();
                      setDataTable(tmp);
                    })
                  }
                })
              }}>
                <MyIconButton>
                  <DeleteIcon color={'secondary'} />
                </MyIconButton>
              </a>
            </Fragment>
          )
        }
      }
    },
    {
      name: 'name',
      label: 'Nombre',
      options: {
        filter: true,
      }
    },
    {
      name: 'email',
      label: 'Correo',
      options: {
        filter: true,
      }
    },
    {
      name: 'role',
      label: 'Rol',
      options: {
        filter: true,
      }
    },
    {
      name: "status",
      label: 'Estado',
      options: {
        filter: false,
        sort: true,
        download: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Chip color={value ? 'primary' : 'secondary'} label={value ? 'Activo' : 'Inactivo'} size="small" />
          )
        }
      }
    },
  ];

  useEffect(() => {
    fetchData({ resource: RESOURCE, method: 'GET' })
    .then(json => setDataTable(json.data))
  },[])

  if(loading) return <MyPaper><Loading /></MyPaper>

  return (
    <DataTable title={'ADMINISTRADORES'} columns={columns} dataSource={dataTable} url={`${RESOURCE}/register`} />
  )
}