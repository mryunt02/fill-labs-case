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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import UserForm from './UserForm';

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
          <PersonIcon sx={{ color: 'primary.main' }} />
          <Typography>{params.value}</Typography>
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
    const response = await fetch('http://localhost:8080/api/users');
    const data = await response.json();
    setUsers(data);
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
        response = await fetch('http://localhost:8080/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        });
      } else if (operation === 'edit' && selectedUser) {
        response = await fetch(
          `http://localhost:8080/api/users/${selectedUser.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...user, id: selectedUser.id }),
          }
        );
      } else if (operation === 'delete' && selectedUser) {
        response = await fetch(
          `http://localhost:8080/api/users/${selectedUser.id}`,
          {
            method: 'DELETE',
          }
        );
      }

      if (response?.ok) {
        fetchUsers();
        setOperation(null);
        setSelectedUser(null);
      }
    } catch (error) {
      console.error('Error:', error);
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
                  bgcolor: 'info.light',
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
                  bgcolor: 'error.light',
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
              setSelectedUser(
                users.find((user) => user.id === selectedId) || null
              );
            }}
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              '& .MuiDataGrid-row:hover': {
                bgcolor: 'action.hover',
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
