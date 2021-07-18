// Import statements
import express, { Application } from 'express';
import router from './routes/auth.route';

const api: Application = express();

// connect to routes
api.use('/auth', router);

export default api;