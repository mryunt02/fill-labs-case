import { Box, Typography, Button } from '@mui/material';
import { Person as PersonIcon, Add as AddIcon } from '@mui/icons-material';

interface NoDataProps {
  onAdd: () => void;
}

export function NoData({ onAdd }: NoDataProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        gap: 2,
      }}
    >
      <PersonIcon
        sx={{
          fontSize: 64,
          color: 'primary.light',
          mb: 2,
        }}
      />
      <Typography
        variant='h6'
        sx={{
          color: 'text.secondary',
          textAlign: 'center',
          maxWidth: 400,
          mb: 1,
        }}
      >
        No users found in the system
      </Typography>
      <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
        Get started by adding your first user
      </Typography>
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={onAdd}
        sx={{
          borderRadius: 2,
          px: 3,
          py: 1,
        }}
      >
        Add New User
      </Button>
    </Box>
  );
}
