import axios from 'axios'

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'http://localhost:8080') + '/api',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api

export const authAPI = {
  login:    (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
}

export const productAPI = {
  getAll:       (params) => api.get('/products', { params }),
  getPaginated: (params) => api.get('/products/page', { params }),
  getById:      (id)     => api.get(`/products/${id}`),
  search:       (params) => api.get('/products/search/page', { params }),
  filter:       (params) => api.get('/products/filter', { params }),
  getBrands:    ()       => api.get('/products/brands'),
  getByCategory:(params) => api.get('/products/category/page', { params }),
  create:       (data)   => api.post('/products', data),
  update:       (id,data)=> api.put(`/products/${id}`, data),
  delete:       (id)     => api.delete(`/products/${id}`),
}

export const categoryAPI = {
  getAll: ()    => api.get('/categories'),
  getById:(id)  => api.get(`/categories/${id}`),
}

export const cartAPI = {
  get:    ()       => api.get('/cart'),
  add:    (data)   => api.post('/cart/add', data),
  update: (id,qty) => api.put(`/cart/update/${id}`, { quantity: qty }),
  remove: (id)     => api.delete(`/cart/remove/${id}`),
  clear:  ()       => api.delete('/cart/clear'),
}

export const orderAPI = {
  place:       (data) => api.post('/orders/place', data),
  getMyOrders: ()     => api.get('/orders/my'),
  getById:     (id)   => api.get(`/orders/${id}`),
  getAll:      ()     => api.get('/orders/admin'),
}

export const quoteAPI = {
  submit:  (data) => api.post('/quotes/submit', data),
  getMine: ()     => api.get('/quotes/my'),
  getAll:  ()     => api.get('/quotes/admin'),
}
