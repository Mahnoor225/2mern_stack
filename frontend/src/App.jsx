import Layout from "./Componets/Layout"
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Forgetpassword from "./Auth/Forgetpassword";
import Resetpassword from "./Auth/Resetpassword";
const App = () => {
  return (
    <div>
    <Layout>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgetpassword" element={<Forgetpassword/>}/>
        <Route path="/reset-password/:id/:token" element={<Resetpassword/>} />  
       </Routes>
    </Layout>
    </div>
  )
}

export default App
