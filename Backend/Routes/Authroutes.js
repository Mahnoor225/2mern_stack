import express from "express";
import { Loginuser, Registeruser } from "../Controller/Authcontroller.js";


const Authroutes = express.Router();

Authroutes.route('/register').post(Registeruser);
Authroutes.route('/login').post(Loginuser);
// Authroutes.route('/user_Detail', Authtoken).get(userDetailsController);
// // Authroutes.route('/user_Auth').get(Authtoken);

export default Authroutes