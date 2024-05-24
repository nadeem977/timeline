import './App.css'
import Home from './pages/Home'
import { BrowserRouter , Routes, Route } from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login' 
import Dashboard from './pages/Dashboard'


const App = () => {


  return (
    <>
      <main>
        <BrowserRouter >
          <Routes>
            <Route path="/Dashboard" element={<Home/>}/>
            <Route path="/sign-in" element={<Login/>}/>
            <Route path="/sign-up" element={<Register/>}/>
            <Route path="/" element={<Dashboard/>}/>
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
