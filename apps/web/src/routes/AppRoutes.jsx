import { Route, Routes } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import MainLayout from '../layouts/MainLayout'

import Home from '../pages/Home'
import Products from '../pages/Products'
import ProductDetails from '../pages/ProductDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import OrderSuccess from '../pages/OrderSuccess'

import Dashboard from '../pages/Dashboard'
import Orders from '../pages/Orders'

function AppRoutes() {
  return (
    <Routes>
      <Route element={ <MainLayout/> }>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/product/:productId' element={<ProductDetails/>}/>
        <Route path='/login' element={ <Login/>}/>
        <Route path='/register' element={ <Register/>}/>
        <Route path='/order-success' element={ <OrderSuccess/>}/>
      </Route>

      <Route element={<DashboardLayout/>} >
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Route>
    </Routes>
  )
}

export default AppRoutes