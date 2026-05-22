import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/layout/Layout'
import HomePage          from './pages/HomePage'
import LoginPage         from './pages/LoginPage'
import RegisterPage      from './pages/RegisterPage'
import ProductsPage      from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage          from './pages/CartPage'
import OrdersPage        from './pages/OrdersPage'
import QuotePage         from './pages/QuotePage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/"             element={<HomePage />} />
            <Route path="/login"        element={<LoginPage />} />
            <Route path="/register"     element={<RegisterPage />} />
            <Route path="/products"     element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart"         element={<CartPage />} />
            <Route path="/orders"       element={<OrdersPage />} />
            <Route path="/quote"        element={<QuotePage />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
