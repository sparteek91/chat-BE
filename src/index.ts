// Import statements
import express, { Application } from 'express';
import cors from 'cors';
const dotenv = require('dotenv');
import mongoose from 'mongoose';
import { corsOptions } from './utils/constants';
import api from './api/api';
import { loadEnv, readEnvEssentials } from './config/env';

// Initiate express application
const app: Application = express();

// Load environment and read all env essential variables before starting the server
dotenv.config({ path: loadEnv() });
readEnvEssentials();

/**
 * Title Mongooese
 * Description: Connect to mongoDB atlas cluster
 * 
 * @param: mongooseOptions
 * @defination: Mongoose option object
 * 
 * @param  clusterUrl
 * @defination: Cluster URL
 */

const mongooseOptions: Object = { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true }
const clusterUrl: string = `mongodb+srv://${process.env.CLUSTERUSER}:${process.env.CLUSTERPASS}@chatapp-cluster.6pcv6.mongodb.net/chatapp-cluster?retryWrites=true&w=majority`;
mongoose.connect(clusterUrl, mongooseOptions).then((): void => {
    console.log('Connected to MongoDB Cluster!');
}).catch((err: any): void => console.log(err));

/**
 * Middlewares
 */
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

/**
 * Title Connection to port
 * 
 * @param port
 * @defination: Port to listen, loaded from env
 * 
 * @param Callback
 * @defination Void type call back
 */
const port = process.env.PORT || 3000;
app.listen(port, (): void => console.log("listening to port: " + port));