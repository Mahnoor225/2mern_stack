import express from "express";
import { Loginuser, Registeruser } from "../Controller/Authcontroller.js";

const Authroutes = express.Router();

Authroutes.route('/register').post(Registeruser);
Authroutes.route('/login').post(Loginuser);

export default Authroutes