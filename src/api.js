// src/api.js
export const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:4000').replace(/\/$/, '');

export const BRANCHES = ['All', 'Lekki', 'Ikoyi'];

const COLLECTIONS = 'https://thelittlebigkidcompany.com/collections';

// Ages shown in "Shop by Age". seeMore is the matching collection on the website (none for Adult).
export const AGE_GROUPS = [
  { key: '0', label: 'Age 0', seeMore: `${COLLECTIONS}/0-3-years` },
  { key: '1', label: 'Age 1', seeMore: `${COLLECTIONS}/0-3-years` },
  { key: '2', label: 'Age 2', seeMore: `${COLLECTIONS}/0-3-years` },
  { key: '3', label: 'Age 3', seeMore: `${COLLECTIONS}/0-3-years` },
  { key: '4', label: 'Age 4', seeMore: `${COLLECTIONS}/3-6-years` },
  { key: '5', label: 'Age 5', seeMore: `${COLLECTIONS}/3-6-years` },
  { key: '6', label: 'Age 6', seeMore: `${COLLECTIONS}/3-6-years` },
  { key: '7', label: 'Age 7', seeMore: `${COLLECTIONS}/6-9-years` },
  { key: '8', label: 'Age 8', seeMore: `${COLLECTIONS}/6-9-years` },
  { key: '9-16', label: 'Age 9 - 16', seeMore: `${COLLECTIONS}/9-12-years` },
  { key: 'adult', label: 'Adult', seeMore: null },
];

export const findAgeGroup = (key) => AGE_GROUPS.find((a) => a.key === key);

export const GENDERS = ['boys', 'girls'];

const TOKEN_KEY = 'adminToken';

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setToken = (token) => sessionStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => sessionStorage.removeItem(TOKEN_KEY);

export class UnauthorizedError extends Error {}

// Uploaded photos are stored as "/images/<id>" on the API; catalog images are full URLs
export const imgSrc = (img) => (img && img.startsWith('/') ? `${API_URL}${img}` : img);

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {};
  if (auth) headers.Authorization = `Bearer ${getToken()}`;
  if (body && !(body instanceof FormData)) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body instanceof FormData ? body : body && JSON.stringify(body),
  });

  if (res.status === 401 && auth) {
    clearToken();
    throw new UnauthorizedError('Your session has expired. Please sign in again.');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = Array.isArray(data.message) ? data.message.join(', ') : data.message;
    throw new Error(message || 'Something went wrong');
  }
  return data;
}

export const login = (email, password) =>
  request('/auth/login', { method: 'POST', body: { email, password } });

export const checkSession = () => request('/auth/me', { auth: true });

export const fetchProducts = (branch) =>
  request(branch ? `/products?branch=${encodeURIComponent(branch)}` : '/products');

export const createProduct = (product) =>
  request('/products', { method: 'POST', body: product, auth: true });

export const updateProduct = (id, changes) =>
  request(`/products/${id}`, { method: 'PATCH', body: changes, auth: true });

export const deleteProduct = (id) =>
  request(`/products/${id}`, { method: 'DELETE', auth: true });

export const uploadImage = (blob) => {
  const form = new FormData();
  form.append('image', blob, 'product.jpg');
  return request('/images', { method: 'POST', body: form, auth: true });
};

// Groups a flat product list into the shape the catalog pages expect
export const groupProducts = (products) => {
  const ageGroups = Object.fromEntries(AGE_GROUPS.map((age) => [age.key, []]));
  const genderGroups = Object.fromEntries(GENDERS.map((g) => [g, []]));
  for (const product of products) {
    for (const age of product.ageGroups || []) ageGroups[age]?.push(product);
    if (product.gender) genderGroups[product.gender]?.push(product);
  }
  return { ageGroups, genderGroups };
};
