'use client';
import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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
import UserForm from './UserForm';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

type Operation = 'new' | 'edit' | 'delete' | null;

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [operation, setOperation] = useState<Operation>(null);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleOperation = (op: Operation) => {
    if ((op === 'edit' || op === 'delete') && !selectedUser) {
      alert('Please select a user first');
      return;
    }
    setOperation(op);
  };

  const handleSave = async (user: Omit<User, 'id'>) => {
    try {
      let response;
      if (operation === 'new') {
        response = await axios.post('http://localhost:8000/api/users', user);
      } else if (operation === 'edit' && selectedUser) {
        response = await axios.put(
          `http://localhost:8000/api/users/${selectedUser.id}`,
          user
        );
      } else if (operation === 'delete' && selectedUser) {
        response = await axios.delete(
          `http://localhost:8000/api/users/${selectedUser.id}`
        );
      }

      if (response?.status === 200 || response?.status === 201) {
        fetchUsers();
        setOperation(null);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

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
