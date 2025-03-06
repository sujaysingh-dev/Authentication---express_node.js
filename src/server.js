const express = require('express');
const dotenv = require('dotenv').config();
const dbConnect = require('./config/dbConnect')
const authRoutes = require('./routes/authRoutes')
const userRotes = require('./routes/userRoutes')

dbConnect();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRotes)

// Start the server
const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
