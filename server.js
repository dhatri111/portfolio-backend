//This is the entry point for the Portfolio backend.
//It sets up Express, connects to MongoDB, and registers all routes.
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const createError = require('http-errors');
require('dotenv').config(); // Load environment variables

// Import Routers
const contactRouter = require('./routes/contactRoutes');
const projectRouter = require('./routes/projectRoutes');
const serviceRouter = require('./routes/serviceRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES 
app.use(cors());            // Enable Cross-Origin Resource Sharing
app.use(morgan('dev'));     // Log HTTP requests in console
app.use(express.json());    // Parse JSON request bodies

//  ROOT ENDPOINT
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Portfolio Application. Server is running on port 5000.' });
});

// API ROUTES 
app.use('/api/contacts', contactRouter);
app.use('/api/projects', projectRouter);
app.use('/api/services', serviceRouter);
app.use('/api/users', userRouter);

// 404 HANDLER
app.use((req, res, next) => next(createError(404, 'Not Found')));

// ERROR HANDLER 
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

//  DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));