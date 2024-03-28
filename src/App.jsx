import './App.css'
import Home from './pages/Home'
import { BrowserRouter , Routes, Route } from "react-router-dom"
import Register from './pages/Register'
import Login from './pages/Login'


const App = () => {


  return (
    <>
      <main>
        <BrowserRouter >
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/sign-in" element={<Login/>}/>
            <Route path="/sign-up" element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
