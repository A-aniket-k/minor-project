const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const collegeInfoRoutes = require('./routes/collegeInfoRoutes');
const queryRoutes = require('./routes/queryRoutes');

require('dotenv').config();
const app = express();
app.use(cors());
// Middleware
app.use(bodyParser.json());

// MongoDB connection
if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not set');
    process.exit(1);
}
  
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/college-info', collegeInfoRoutes);
app.use('/api/query', queryRoutes);

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
