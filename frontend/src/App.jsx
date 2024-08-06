import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../src/Componets/Layout";
import Home from "./pages/Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Forgetpassword from "./Auth/Forgetpassword";
import Resetpassword from "./Auth/Resetpassword";
import { useEffect } from "react";
import Context from "./Context";
import { useDispatch } from 'react-redux';
import { setUserDetails } from "./redux/userslice";
const App = () => {
  // const fetchUserDetails = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/registeruser/userdetail', {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${'token'}`, // Include token
  //       },
  //       credentials: 'include' // If using cookies
  //     });
  
  //     if (!response.ok) {
  //       // Inspect response body for more details
  //       const errorDetails = await response.json();
  //       throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorDetails.message}`);
  //     }
  
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching user details:', error);
  //   }
  // };
  const dispatch = useDispatch()
  const fetchUserDetails = async () => {
    try {
      const response = await fetch('http://localhost:5000/registeruser/userdetail', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${'token'}`, // Include token
        },
        credentials: 'include' // If using cookies
      });
  
      if (!response.ok) {
        // Inspect response body for more details
        const errorDetails = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorDetails.message}`);
      }
  
      const data = await response.json();
      console.log("data",response);

      if(data.success){
        dispatch(setUserDetails(data.data));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div>
    <Context.Provider value={{
     fetchUserDetails    // user detail fetch
    }}>
      <ToastContainer />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<Forgetpassword />} />
          <Route path="/reset-password/:id/:token" element={<Resetpassword />} />
        </Routes>
      </Layout>
      </Context.Provider>
    </div>
  );
};

export default App;
