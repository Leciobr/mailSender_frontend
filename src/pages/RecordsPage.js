/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import apiClient from '../utils/api';
import { Button, Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { debounce } from 'lodash';
import FilterInputComponent from '../components/Grid/FilterInputComponent';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

function RecordsPage() {
  const navigate = useNavigate()
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [sortModel, setSortModel] = useState([]);
  const [rowCountState, setRowCountState] = useState(0);

  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
  });

  const customOperators = {
    id: [
      {
        label: 'equals', value: 'equals',
        InputComponent: FilterInputComponent('text')
      },
    ],
    operation: [
      { label: 'equals', value: 'equals', InputComponent: FilterInputComponent('text') },
      { label: 'contains', value: 'contains', InputComponent: FilterInputComponent('text') },
    ],
    formula: [
      { label: 'equals', value: 'equals', InputComponent: FilterInputComponent('text') },
      { label: 'contains', value: 'contains', InputComponent: FilterInputComponent('text') },
    ]
  };

  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize);
  }, []);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      rowCountState !== undefined
        ? rowCountState
        : prevRowCountState,
    );
  }, [rowCountState, setRowCountState]);

  const deleteRecord = async (id) => {
    try {
      await apiClient.delete(`/schedule-emails/${id}`);
      toast.success('Record deleted');
      fetchData(paginationModel.page, paginationModel.pageSize);
    } catch (error) {
      toast.error('Error deleting record');
    }
  }

  const getFromApi = async (url) => {
    try {
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      toast.error('Error getting records');
      return {
        data: [],
      }
    }
  }

  const fetchData = async (page, limit, sort, filter) => {
    let url = `/schedule-emails`
    // if (sort) {
    //   url += `&sort=${sort}`
    // }
    // if (filter) {
    //   url += `&search=${filter}`
    // }
    const { data } = await getFromApi(url);
    if (data.length === 0) {
      // const { total } = response;
      // setRowCountState(total)
      setRows([]);
      return;
    }

    const parsedData = (data || []).map((v) => ({
      id: v.id,
      idMassa: v.id_massa,
      status: v.status,
      priority: v.priority,
      emailSubject: v.email_subject,
      emails: (v.ms_email || []).map((obj) => {
        return obj.email;
      }).join(', '),
    }));

    // const notSortableColumns = ['cost', 'formulaResult', 'operationResult', 'amount', 'operationRequest'];
    const extractedColumns = Object.keys(parsedData[0]).map((key) => {
      return {
        field: key,
        headerName: key.toUpperCase(),
        width: 120,
        // sortable: notSortableColumns.indexOf(key) === -1,
        // filterable: notSortableColumns.indexOf(key) === -1,
      }
    });

    // const { total } = response;
    // setRowCountState(total)
    setRows(parsedData);
    setColumns(extractedColumns);

  }

  const handlePagination = (params) => {
    setPaginationModel(params);
    const { page, pageSize } = params;
    fetchData(page, pageSize);
  }


  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);

    const sortString = newSortModel
      .map((sortObj) => `${sortObj.field}=${sortObj.sort}`)
      .join('|');

    fetchData(paginationModel.page, paginationModel.pageSize, sortString);
  };

  const handleFilterModelChange = debounce((newFilterModel) => {
    const comparisonSymbols = {
      'equals': '=',
      'contains': '%',
    }

    let queryParams = newFilterModel.items
      .map((filter) => `${filter.field}${comparisonSymbols[filter.operator]}${filter.value}`)
      .join('|');

    if ((queryParams.includes('undefined'))) {
      queryParams = null
    }

    fetchData(paginationModel.page, paginationModel.pageSize, null, queryParams);
  }, 400);


  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteRecord(id)
      }
    });
  }

  const handleDetails = async (id) => {
    navigate(`/schedule-details/${id}`);
  }

  const handleCreate = async () => {
    //redirect to create schedule page
    navigate('/create-schedule');

  }

  return (
    <div style={{ height: '700px' }}>
      <Typography variant='h4' style={{ marginBottom: '20px' }}>Agendamentos</Typography>
      <Grid item xs={12} container justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Create
        </Button>
      </Grid>
      <DataGrid
        rows={rows}
        columns={[
          ...columns.map((col) => {
            return {
              ...col,
              filterOperators: customOperators[col.field] || [],
            };
          }),
          {
            field: 'actions',
            headerName: 'Actions',
            filterable: false,
            sortable: false,
            width: 200, //
            renderCell: (params) => (
              <div style={{ display: 'flex' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleDetails(params.row.id)}
                >
                  Details
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(params.row.id)}
                  style={{ marginRight: '8px' }}
                >
                  Delete
                </Button>
              </div>
            ),
          },
        ]}
        rowCount={rows.length > 0 ? rowCountState : 0}
        loading={false}
      // pageSizeOptions={[10, 30, 50]}
      // paginationModel={paginationModel}
      // paginationMode="server"
      // sortingMode="server"
      // filterMode="server"
      // sortModel={sortModel}
      // filterModel={filterModel}
      // onPaginationModelChange={handlePagination}
      // onSortModelChange={handleSortModelChange}
      // onFilterModelChange={handleFilterModelChange}
      // disableColumnFilter={true} 
      // components={{
      //   Toolbar: GridToolbar,
      // }}
      />
    </div>
  );
}


export default RecordsPage;