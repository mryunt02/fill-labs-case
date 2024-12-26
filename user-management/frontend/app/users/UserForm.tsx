import { useState, useEffect } from 'react';
import {
  Button,
  Stack,
  TextField,
  Paper,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import {
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  user: User | null;
  operation: 'new' | 'edit' | 'delete';
  onSave: (user: Omit<User, 'id'>) => void;
  onBack: () => void;
}

const operationConfig = {
  new: {
    title: 'Create New User',
    buttonText: 'Create',
    icon: AddIcon,
    color: 'primary',
  },
  edit: {
    title: 'Edit User',
    buttonText: 'Save',
    icon: SaveIcon,
    color: 'info',
  },
  delete: {
    title: 'Delete User',
    buttonText: 'Delete',
    icon: DeleteIcon,
    color: 'error',
  },
} as const;

export default function UserForm({ user, operation, onSave, onBack }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const config = operationConfig[operation];
  const Icon = config.icon;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email });
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <IconButton onClick={onBack} sx={{ bgcolor: 'action.selected' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant='h5'
          component='h1'
          sx={{ fontWeight: 'bold', color: `${config.color}.main` }}
        >
          {config.title}
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={operation === 'delete'}
            required
            fullWidth
            variant='outlined'
            InputProps={{
              sx: { borderRadius: 2 },
            }}
          />
          <TextField
            label='Email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={operation === 'delete'}
            required
            fullWidth
            variant='outlined'
            InputProps={{
              sx: { borderRadius: 2 },
            }}
          />
          <Button
            type='submit'
            variant='contained'
            color={config.color}
            size='large'
            startIcon={<Icon />}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            {config.buttonText}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
