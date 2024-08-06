import express from "express";
import { Loginuser, Registeruser, userlogout } from "../Controller/Authcontroller.js";
import { userDetail } from "../Controller/userDetail.js";
import { Authtoken } from "../Middleware/Authtoken.js";




const Authroutes = express.Router();

Authroutes.route('/register').post(Registeruser);
Authroutes.route('/login').post(Loginuser);
Authroutes.route('/userdetail').get(Authtoken,userDetail); 
Authroutes.route('/userlogout').get(userlogout); 

export default Authroutes;
