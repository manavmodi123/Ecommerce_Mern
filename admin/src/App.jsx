import React from 'react'
import Navbar from './Components/Navbar'
import SideBar from './Components/SideBar'
import { BrowserRouter ,Route ,Routes } from 'react-router-dom'
import ProductList from './Pages/ProductList'
import AddProduct from './Pages/AddProduct'
import Redirect from './Components/Redirect'

const App = () => {
  return (
    <div className='fixed'>
      <Navbar />
      <SideBar />
      <div className='ml-[17%] w-screen h-screen bg-gray-100'>
      <Routes>  
        <Route path="/redirect" element={<Redirect />}/>
         <Route path="/" element={<ProductList />}/>
         <Route path="/add" element={<AddProduct />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App