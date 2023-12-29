import { Route, Routes } from 'react-router-dom'

import SignupPage from '../Auth/SignupPage'
import HomePage from './../Home/HomePage';
import ProductsPage from './../Products/ProductsPage';
import SingleProductPage from './../SingleProduct/SingleProductPage';
import CartPage from './../Cart/CartPage';
import MyOrderPage from './../MyOrder/MyOrderPage';
import LoginPage from './../Auth/LoginPage';
import Logout from '../Auth/Logout';
import ProtectedRoute from './ProtectedRoute';
import LoginRoutes from './LoginRoutes';

const Routing = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/product/:id' element={<SingleProductPage />} />
        
        <Route element={<LoginRoutes />} >
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} /> 
        </Route>
        
        <Route element={<ProtectedRoute />} >
          <Route path='/cart' element={<CartPage />} />
          <Route path='/myorders' element={<MyOrderPage />} />
          <Route path='/logout' element={<Logout />} />
        </Route>
      </Routes>
  )
}

export default Routing;