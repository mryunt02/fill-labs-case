'use client';
import {
  Container,
  Paper,
  Typography,
  Stack,
  Box,
  IconButton,
  Chip,
  alpha,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import UserForm from './UserForm';
import { useUsers } from './useUsers';

export default function Users() {
  const {
    users,
    selectedUser,
    operation,
    setSelectedUser,
    handleOperation,
    handleSave,
    setOperation,
  } = useUsers();

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
    <Container maxWidth='lg' sx={{ py: 4 }}>
      {!operation ? (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography
              variant='h5'
              component='h1'
              sx={{ fontWeight: 'bold', color: 'primary.main' }}
            >
              User Management
            </Typography>
            <Stack direction='row' spacing={2}>
              <IconButton
                color='primary'
                onClick={() => handleOperation('new')}
                sx={{
                  bgcolor: 'primary.light',
                  '&:hover': { bgcolor: 'primary.main', color: 'white' },
                }}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                color='info'
                onClick={() => handleOperation('edit')}
                disabled={!selectedUser}
                sx={{
                  bgcolor: selectedUser
                    ? 'info.light'
                    : 'action.disabledBackground',
                  '&:hover': { bgcolor: 'info.main', color: 'white' },
                  '&.Mui-disabled': { bgcolor: 'action.disabledBackground' },
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color='error'
                onClick={() => handleOperation('delete')}
                disabled={!selectedUser}
                sx={{
                  bgcolor: selectedUser
                    ? 'error.light'
                    : 'action.disabledBackground',
                  '&:hover': { bgcolor: 'error.main', color: 'white' },
                  '&.Mui-disabled': { bgcolor: 'action.disabledBackground' },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            onRowSelectionModelChange={(ids) => {
              const selectedId = ids[0];
              setSelectedUser((prev) =>
                prev?.id === selectedId
                  ? null
                  : users.find((user) => user.id === selectedId) || null
              );
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
        </Paper>
      ) : (
        <UserForm
          user={selectedUser}
          operation={operation}
          onSave={handleSave}
          onBack={() => {
            setOperation(null);
            setSelectedUser(null);
          }}
        />
      )}
    </Container>
  );
}
