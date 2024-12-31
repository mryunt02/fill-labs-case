import { Stack, IconButton } from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { User, Operation } from '../types/user';

interface UserActionsProps {
  selectedUser: User | null;
  handleOperation: (op: Operation) => void;
}

export function UserActions({
  selectedUser,
  handleOperation,
}: UserActionsProps) {
  return (
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
      {selectedUser && (
        <>
          <IconButton
            color='info'
            onClick={() => handleOperation('edit')}
            sx={{
              bgcolor: 'info.light',
              '&:hover': { bgcolor: 'info.main', color: 'white' },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color='error'
            onClick={() => handleOperation('delete')}
            sx={{
              bgcolor: 'error.light',
              '&:hover': { bgcolor: 'error.main', color: 'white' },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );
}
