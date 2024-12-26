import { useState, useEffect } from 'react';
import { Button, Stack, TextField } from '@mui/material';

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

const buttonTexts = {
  new: 'Create',
  edit: 'Save',
  delete: 'Delete',
};

export default function UserForm({ user, operation, onSave, onBack }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 400, mt: 2 }}>
        <TextField
          label='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={operation === 'delete'}
          required
        />
        <TextField
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={operation === 'delete'}
          required
        />
        <Stack direction='row' spacing={2}>
          <Button type='submit' variant='contained'>
            {buttonTexts[operation]}
          </Button>
          <Button variant='outlined' onClick={onBack}>
            Back
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
