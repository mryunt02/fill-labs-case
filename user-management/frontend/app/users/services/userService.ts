import axios from 'axios';
import { User } from '../types/user';

const BASE_URL = 'http://localhost:8000/api';

export const userService = {
  async getUsers() {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  },

  async createUser(user: Omit<User, 'id'>) {
    return axios.post(`${BASE_URL}/users`, user);
  },

  async updateUser(id: number, user: Omit<User, 'id'>) {
    return axios.put(`${BASE_URL}/users/${id}`, user);
  },

  async deleteUser(id: number) {
    return axios.delete(`${BASE_URL}/users/${id}`);
  },
};
