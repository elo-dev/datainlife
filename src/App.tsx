import React from 'react'
import './App.scss'
import { Menu } from './components/Menu/Menu'
import { Products } from './components/Products/Products'

function App() {
  return (
    <div className="App">
      <Menu />
      <Products />
    </div>
  )
}

export default App
