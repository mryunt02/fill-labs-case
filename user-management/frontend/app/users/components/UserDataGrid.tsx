import { Box, Typography, Chip, alpha } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { User } from '../types/user';

interface UserDataGridProps {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

export function UserDataGrid({
  users,
  selectedUser,
  setSelectedUser,
}: UserDataGridProps) {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 130,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon
            sx={{
              color:
                params.row.id === selectedUser?.id
                  ? 'primary.main'
                  : 'text.secondary',
            }}
          />
          <Typography
            sx={{
              fontWeight:
                params.row.id === selectedUser?.id ? 'bold' : 'regular',
              color:
                params.row.id === selectedUser?.id ? 'primary.main' : 'inherit',
            }}
          >
            {params.value}
          </Typography>
          {params.row.id === selectedUser?.id && (
            <Chip
              size='small'
              label='Selected'
              color='primary'
              icon={<CheckCircleIcon />}
              sx={{ ml: 1 }}
            />
          )}
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 2,
      minWidth: 200,
    },
  ];

  return (
    <DataGrid
      rows={users}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[5, 10, 25]}
      checkboxSelection={false}
      disableRowSelectionOnClick={false}
      onRowClick={(params) => {
        setSelectedUser(selectedUser?.id === params.row.id ? null : params.row);
      }}
      rowSelectionModel={selectedUser ? [selectedUser.id] : []}
      sx={{
        border: 'none',
        '& .MuiDataGrid-cell:focus': {
          outline: 'none',
        },
        '& .MuiDataGrid-row:hover': {
          bgcolor: 'action.hover',
          cursor: 'pointer',
        },
        '& .MuiDataGrid-row.Mui-selected': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
          },
        },
        '& .MuiDataGrid-columnHeaders': {
          bgcolor: 'primary.light',
          color: 'primary.dark',
        },
      }}
      autoHeight
    />
  );
}
