import { useState } from 'react'
import './App.css'
import LoginPage from './pages/auth/login'
import usermanager from './pages/usermanager/usermanager'
import DownloadsPage from './pages/downloads/downloads'
import { Route, Routes } from 'react-router-dom'
import UserNamerPage from './pages/usermanager/usermanager'

function App() {
return (
<Routes>
  <Route path='/' element={<LoginPage/>}/>
  <Route path='/usermanager' element={<UserNamerPage/>}/>
  <Route path='/downloads' element={<DownloadsPage/>}/>
</Routes>
);
}

export default App

// import| { useState } from 'react'