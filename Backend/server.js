import dotenv from 'dotenv';
dotenv.config();
import routes from './controller/routes.js';
import express from 'express';
const app = express();
import connectToDb from './config/connectToDb.js';




// Middleware to parse JSON
app.use(express.json());

console.log("*******insdie server.js********")
connectToDb();

app.use('/', routes);


app.listen(process.env.PORT);
