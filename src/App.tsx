import { useState } from 'react'
import './App.css'
import LoginPage from './pages/auth/login'
import CreateUser from './pages/user/createuser'
import DownloadsPage from './pages/downloads/downloads'

// function App() {
//   const [count, setCount] = useState(0)
//   return (
//   <LoginPage></LoginPage>
//   )
// }

// export default App

// function App() {
//   const [count, setCount] = useState(0)
// return (
// <CreateUser></CreateUser>
// )
// }

// export default App

function App() {
    const [count, setCount] = useState(0)
  return (
    <DownloadsPage></DownloadsPage>
  )
}

export default App
