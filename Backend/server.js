import dotenv from 'dotenv';
dotenv.config();
import routes from './controller/routes.js';
import express from 'express';
const app = express();
import connectToDb from './config/connectToDb.js';




connectToDb();

app.get('/', routes);


app.listen(process.env.PORT);
