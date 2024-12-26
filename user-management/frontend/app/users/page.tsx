'use client';
import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Container, Stack } from '@mui/material';
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
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
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
    <Container>
      {!operation ? (
        <>
          <Stack direction='row' spacing={2} sx={{ my: 2 }}>
            <Button variant='contained' onClick={() => handleOperation('new')}>
              New
            </Button>
            <Button variant='contained' onClick={() => handleOperation('edit')}>
              Edit
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={() => handleOperation('delete')}
            >
              Delete
            </Button>
          </Stack>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            onRowSelectionModelChange={(ids) => {
              const selectedId = ids[0];
              setSelectedUser(
                users.find((user) => user.id === selectedId) || null
              );
            }}
          />
        </>
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
