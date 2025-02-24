; import { useState } from 'react';
import viteLogo from '/vite.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatIndex from './pages/chat/Index';
import ImagesIndex from './pages/images/Index';
import GeneratorIndex from './pages/generator/Index';

function App() {
  return (
    <>  
      <Router>
        <Routes>
              <Route path='/chat' element={<ChatIndex />} />
              <Route path='/images' element={<ImagesIndex />} />
              <Route path='/generator' element={<GeneratorIndex/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
