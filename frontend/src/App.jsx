// import { useEffect } from "react";
// import { useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import components and pages
import Layout from "./Componets/Layout";
import Home from "../src/pages/Home";
import Register from "./Auth/Register";
import Login from "./Auth/Login";
import Forgetpassword from "./Auth/Forgetpassword";
import Resetpassword from "./Auth/Resetpassword";
// import Context from "./Context";
const App = () => {
  // const dispatch = useDispatch();

//   const fetchUserDetails = async () => {
//     try {
//         const response = await fetch('http://localhost:5000/registeruser/user_Detail', {
//             method: 'GET',
//             credentials: 'include',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${'token'}`, // Include token if needed
//             },
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const result = await response.json();

//         if (result.success) {
//             // Dispatch action to update user details in Redux store
//             // dispatch(setUser(result.data)); // Uncomment if you have a setUser action
//         } else {
//             console.error(result.message);
//         }
//     } catch (error) {
//         console.error('Fetch user details error:', error);
//     }
// };



//   useEffect(() => {
//     fetchUserDetails();
//   }, []);

  return (
 
      <div>
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
      </div>

  );
};

export default App;
