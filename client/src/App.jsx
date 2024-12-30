import React from 'react'
import AppContext from './Context/AppContext'
import Home from "./components/Home"
import RegisterUser from "./components/RegisterUser"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllUser from './components/AllUser'

const App = () => {
  return (
    <AppContext>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AllUser />} />
          <Route path='/register' element={<RegisterUser/>} />
        </Routes>
      </BrowserRouter>
    </AppContext>
  )
}

export default App