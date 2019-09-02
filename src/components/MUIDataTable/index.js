import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar";

export const DataTable = ({ title, columns, dataSource, url }) => {

  const [data, setData] = useState(dataSource);

  const handleTableChange = (action, tableState) => {
    setData(dataSource);
  }

  const options = {
    filter: true,
    print: false,
    selectableRows: 'none',
    // download: false,
    rowsPerPage: 25,
    filterType: 'dropdown',
    responsive: 'scroll',
    onTableChange: handleTableChange,
    // onRowsDelete: (rowsDeleted) => {
    //   const dataId = new FormData()
    //   rowsDeleted.data.map(row => {
    //     dataId.append('id[]', data[row.index].id)
    //     console.log(data[row.index].id)
    //   })
    //   return false;
    //   console.log(rowsDeleted, "were deleted!");
    // },
    customToolbar: () => {
      return (
        <CustomToolbar url={url} />
      );
    },
    downloadOptions: {
      filename: 'excel-format.csv',
      separator: ';',
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true,
      }
    },
  };

  return (
    <MUIDataTable title={title} data={data} columns={columns} options={options} />
  );

}