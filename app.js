const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();
//
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://thome3100:MspXD2YvRaOflqfR@test-prod.30wxq.mongodb.net/?retryWrites=true&w=majority&appName=test-prod')
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB', err));

const authRoutes = require('./routes/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);

app.use('/invoices', express.static(path.join(__dirname, 'invoices')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
