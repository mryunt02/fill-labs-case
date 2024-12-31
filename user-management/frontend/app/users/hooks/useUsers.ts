import { useState, useEffect } from 'react';
import { User, Operation } from '../types/user';
import { userService } from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [operation, setOperation] = useState<Operation>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
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
        response = await userService.createUser(user);
      } else if (operation === 'edit' && selectedUser) {
        response = await userService.updateUser(selectedUser.id, user);
      } else if (operation === 'delete' && selectedUser) {
        response = await userService.deleteUser(selectedUser.id);
      }

      if (response && response.status >= 200 && response.status < 300) {
        await fetchUsers();
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
