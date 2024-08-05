import express from 'express';
import DBconnection from './Config/DBconnection.js';
import dotenv from 'dotenv';
import Authroutes from "./Routes/Authroutes.js";
import cookieParser from 'cookie-parser';
dotenv.config();
import cors from 'cors';
const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
const port = process.env.PORT || 2000;
DBconnection();
app.use(cookieParser())
app.use(express.json());
app.use('/registeruser', Authroutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
