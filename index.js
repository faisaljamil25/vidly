import express, { json } from 'express';
import mongoose from 'mongoose';
import home from './routes/home.js';
import genres from './routes/genres.js';
import customers from './routes/customers.js';

const app = express();

mongoose
  .connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...'));

// Middleware
app.use(json());

// Routes
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/', home);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
