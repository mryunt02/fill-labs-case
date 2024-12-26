import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

type Operation = 'new' | 'edit' | 'delete' | null;

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [operation, setOperation] = useState<Operation>(null);

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

  return {
    users,
    selectedUser,
    operation,
    setSelectedUser,
    handleOperation,
    handleSave,
    setOperation,
  };
};
