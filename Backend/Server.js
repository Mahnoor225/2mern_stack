import express from 'express';
import DBconnection from './Config/DBconnection.js';
import dotenv from 'dotenv';
import Authroutes from "./Routes/Authroutes.js"
dotenv.config();
const app = express();
const port = process.env.PORT || 2000;
DBconnection();

app.use(express.json());
app.use('/registeruser', Authroutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
