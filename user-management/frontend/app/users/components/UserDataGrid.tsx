import {
  Box,
  Typography,
  Chip,
  alpha,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Mail as MailIcon,
} from '@mui/icons-material';
import { User } from '../types/user';
import { NoData } from './NoData';

interface UserDataGridProps {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  loading?: boolean;
  handleOperation: (op: 'new' | 'edit' | 'delete') => void;
}

export function UserDataGrid({
  users,
  selectedUser,
  setSelectedUser,
  loading,
  handleOperation,
}: UserDataGridProps) {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography
          sx={{
            fontWeight: 600,
            color: 'text.secondary',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            py: 0.5,
            px: 1.5,
            borderRadius: 1,
          }}
        >
          #{params.value}
        </Typography>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: (theme) =>
                params.row.id === selectedUser?.id
                  ? theme.palette.primary.main
                  : theme.palette.grey[300],
              width: 36,
              height: 36,
            }}
          >
            <PersonIcon />
          </Avatar>
          <Box>
            <Typography
              sx={{
                fontWeight: params.row.id === selectedUser?.id ? 700 : 500,
                color:
                  params.row.id === selectedUser?.id
                    ? 'primary.main'
                    : 'text.primary',
              }}
            >
              {params.value}
            </Typography>
            {params.row.id === selectedUser?.id && (
              <Chip
                size='small'
                label='Selected'
                color='primary'
                icon={<CheckCircleIcon sx={{ fontSize: '16px' }} />}
                sx={{
                  mt: 0.5,
                  height: 24,
                  '& .MuiChip-label': { px: 1, fontSize: '0.75rem' },
                }}
              />
            )}
          </Box>
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 2,
      minWidth: 250,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Typography>{params.value}</Typography>
        </Box>
      ),
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!users || users.length === 0) {
    return <NoData onAdd={() => handleOperation('new')} />;
  }

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
      slots={{
        noRowsOverlay: () => <NoData onAdd={() => handleOperation('new')} />,
      }}
      sx={{
        border: 'none',
        '& .MuiBox-root': {
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiDataGrid-root': {
          borderRadius: 2,
          overflow: 'hidden',
        },
        '& .MuiDataGrid-cell': {
          borderColor: 'divider',
          '&:focus': {
            outline: 'none',
          },
        },
        '& .MuiDataGrid-row': {
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
            cursor: 'pointer',
          },
          '&.Mui-selected': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
            },
          },
        },
        '& .MuiDataGrid-columnHeaders': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          borderBottom: '2px solid',
          borderColor: 'divider',
          '& .MuiDataGrid-columnHeader': {
            '&:focus': {
              outline: 'none',
            },
          },
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: '2px solid',
          borderColor: 'divider',
        },
      }}
      autoHeight
    />
  );
}
