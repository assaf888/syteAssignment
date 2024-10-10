import axios from 'axios';

import { API_URL } from './consts';

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/login`, { email, password });
  return response.data;
};

export const signupUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/register`, { email, password });
  return response.data;
};

export const fetchCatalogs = async (token: string, page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}/catalogs/list`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, limit },
  });
  return response.data;
};

export const addCatalog = async (name: string, vertical: string, locales: string[], isPrimary: boolean, token: string) => {
  await axios.post(`${API_URL}/catalogs/add`, { name, vertical, locales, isPrimary }, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateCatalog = async (id: string, vertical: string, isPrimary: boolean, locales: string[], token: string) => {
  await axios.put(`${API_URL}/catalogs/update/${id}`, { vertical, isPrimary, locales }, { headers: { Authorization: `Bearer ${token}` } });
};

export const deleteCatalog = async (id: string, token: string) => {
  await axios.delete(`${API_URL}/catalogs/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteCatalogs = async (ids: string[], token: string) => {
  await axios.delete(`${API_URL}/catalogs/delete-multiple`, { data: { ids }, headers: { Authorization: `Bearer ${token}` } });
};
