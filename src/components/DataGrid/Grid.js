import React, { useState } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton } from '@mui/x-data-grid';
import { TextField } from '@mui/material';



const Grid = React.memo(() => {
    const [searchText, setSearchText] = useState('');
    const rows = [
        { id: 1, name: 'John Doe', age: 25 },
        { id: 2, name: 'Jane Smith', age: 30 },
        // More data...
    ];

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'age', headerName: 'Age', width: 120 },
        // More columns...
    ];

    const handleSearchInputChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div style={{ width: '100%' }}>
            <TextField
                label="Search"
                variant="outlined"
                value={searchText}
                onChange={handleSearchInputChange}
                style={{ textAlign: 'left' }}
            />
            <DataGrid
                rows={rows}
                columns={columns}
                pagination
                pageSize={10}
                rowsPerPageOptions={[10, 25, 50]}
                filterModel={{
                    items: [
                        {
                            columnField: 'name',
                            operatorValue: 'contains',
                            value: searchText,
                        },
                    ],
                }}
            />
        </div>
    )
});

export default RecordGrid;