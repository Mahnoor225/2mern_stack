import express from 'express';
import DBconnection from './Config/DBconnection.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.PORT || 2000;
DBconnection();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
