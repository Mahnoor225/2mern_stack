import Layout from "./Componets/Layout"
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
const App = () => {
  return (
    <div>
    <Layout>
    <Routes>
        <Route path="" element={<Home/>}/>
       </Routes>
    </Layout>
    </div>
  )
}

export default App
