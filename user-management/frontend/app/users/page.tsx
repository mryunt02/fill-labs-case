'use client';

import { Container, Paper, Typography, Box } from '@mui/material';
import { UserActions } from './components/UserActions';
import { UserDataGrid } from './components/UserDataGrid';
import { UserForm } from './components/UserForm';
import { useUsers } from './hooks/useUsers';

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

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
      <Container maxWidth='lg' sx={{ py: 6 }}>
        {!operation ? (
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 4,
                pb: 3,
                borderBottom: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box>
                <Typography
                  variant='h4'
                  component='h1'
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    mb: 1,
                  }}
                >
                  User Management
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{ mt: 1 }}
                >
                  Manage your system users and their e-mails
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <UserActions
                  selectedUser={selectedUser}
                  handleOperation={handleOperation}
                />
              </Box>
            </Box>

            <Box
              sx={{
                borderRadius: 1,
                overflow: 'hidden',
                '& .MuiDataGrid-root': {
                  border: 'none',
                  '& .MuiDataGrid-cell': {
                    borderColor: 'divider',
                  },
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'action.hover',
                    borderBottom: '2px solid',
                    borderColor: 'divider',
                  },
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'action.hover',
                  },
                },
              }}
            >
              <UserDataGrid
                users={users}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
            </Box>
          </Paper>
        ) : (
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <UserForm
              user={selectedUser}
              operation={operation}
              onSave={handleSave}
              onBack={() => {
                setOperation(null);
                setSelectedUser(null);
              }}
            />
          </Paper>
        )}
      </Container>
    </div>
  );
}
