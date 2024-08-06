import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import DBconnection from './Config/DBconnection.js';
import Authroutes from './Routes/Authroutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 2000;

// Middleware for CORS
app.use(cors({
  origin: "http://localhost:5173", // Adjust this to your React app's URL
  credentials: true
}));

// Middleware for parsing JSON and cookies
app.use(cookieParser());
app.use(express.json());

// Register routes
app.use('/registeruser', Authroutes);

// Connect to the database
DBconnection();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
