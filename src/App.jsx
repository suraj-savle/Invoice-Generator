import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Help from './pages/Help'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/help' element={<Help />} />
    </Routes>
  )
}

export default App