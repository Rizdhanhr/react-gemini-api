import { useState } from 'react'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ChatIndex from './pages/chat/Index'

function App() {
  return (
    <>  
      <Router>
        <Routes>
          <Route path='/chat' element={<ChatIndex/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
