import express from "express";
import { allUsers, Loginuser, Registeruser, updateUser, userlogout } from "../Controller/Authcontroller.js";
import { userDetail } from "../Controller/userDetail.js";
import { Authtoken } from "../Middleware/Authtoken.js";




const Authroutes = express.Router();

Authroutes.route('/register').post(Registeruser);
Authroutes.route('/login').post(Loginuser);
Authroutes.route('/userdetail').get(Authtoken,userDetail); 
Authroutes.route('/userlogout').get(userlogout); 



// admin-panel 
Authroutes.route('/allusers').get(allUsers); 
Authroutes.route('/updateuser/:id').post(updateUser); 

export default Authroutes;
