import { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  CircularProgress,
  IconButton,
  Fade,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Person } from '@mui/icons-material';
import { User, Operation } from '../types/user';

interface UserFormProps {
  user: User | null;
  operation: Operation;
  onSave: (user: Omit<User, 'id'>) => Promise<void>;
  onBack: () => void;
}

export function UserForm({ user, operation, onSave, onBack }: UserFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (operation === 'delete') {
      setLoading(true);
      await onSave(formData);
      setLoading(false);
      return;
    }
    if (!validateForm()) return;
    setLoading(true);
    await onSave(formData);
    setLoading(false);
  };

  const getFormColor = () => {
    switch (operation) {
      case 'delete':
        return 'error.main';
      case 'edit':
        return 'warning.main';
      default:
        return 'primary.main';
    }
  };

  return (
    <Fade in>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 600,
          mx: 'auto',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            bgcolor: getFormColor(),
          },
        }}
      >
        <Box sx={{ mb: 4 }}>
          <IconButton
            onClick={onBack}
            disabled={loading}
            sx={{ mb: 2, bgcolor: 'action.hover' }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Person sx={{ fontSize: 32, color: getFormColor() }} />
            <Typography
              variant='h5'
              component='h1'
              sx={{
                fontWeight: 700,
                color: getFormColor(),
              }}
            >
              {operation === 'new' && 'Add New User'}
              {operation === 'edit' && 'Edit User'}
              {operation === 'delete' && 'Delete User'}
            </Typography>
          </Box>

          {operation === 'delete' && (
            <Typography sx={{ color: 'text.secondary', mt: 2 }}>
              This action cannot be undone
            </Typography>
          )}
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {operation !== 'delete' ? (
              <>
                <TextField
                  label='Name'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  error={!!errors.name}
                  helperText={errors.name}
                  disabled={loading}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: getFormColor(),
                      },
                    },
                  }}
                />
                <TextField
                  label='Email'
                  type='email'
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={!!errors.email}
                  helperText={errors.email}
                  disabled={loading}
                  fullWidth
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: getFormColor(),
                      },
                    },
                  }}
                />
              </>
            ) : (
              <Typography variant='h6' sx={{ textAlign: 'center', py: 4 }}>
                Are you sure you want to delete user:{' '}
                <Box
                  component='span'
                  sx={{ color: 'error.main', fontWeight: 600 }}
                >
                  {user?.name}
                </Box>
                ?
              </Typography>
            )}

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'flex-end',
                mt: 4,
              }}
            >
              <Button
                variant='outlined'
                onClick={onBack}
                disabled={loading}
                sx={{
                  px: 3,
                  '&:hover': {
                    borderColor: getFormColor(),
                    color: getFormColor(),
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                color={operation === 'delete' ? 'error' : 'primary'}
                disabled={loading}
                sx={{
                  px: 4,
                  bgcolor: getFormColor(),
                  '&:hover': {
                    bgcolor: getFormColor(),
                    filter: 'brightness(0.9)',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color='inherit' />
                ) : (
                  <>
                    {operation === 'new' && 'Create'}
                    {operation === 'edit' && 'Update'}
                    {operation === 'delete' && 'Delete'}
                  </>
                )}
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Fade>
  );
}
