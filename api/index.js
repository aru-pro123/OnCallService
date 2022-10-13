require('express-async-errors');
const cors = require('cors');
const error = require('./middleware/error');
const serviceProvider = require('./routes/serviceProvider');
const service = require('./routes/services');
const users = require('./routes/users');
const serviceOrder = require('./routes/serviceOrders');
const auth = require('./routes/auth');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const mongoose = require('mongoose');
const http = express();

// if (!config.get('jwtPrivateKey')) {
//   console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//   process.exit(1);
// }

//TODO:: define in env and get from config file
const jwtPrivateKey = 'jwtTokenPrivateKey';

if (!jwtPrivateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost/oncall', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB..'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

http.use(express.json());
http.use(cors());
http.use('/api/orders', serviceOrder);
http.use('/api/provider', serviceProvider);
http.use('/api/services', service);
http.use('/api/users', users);
http.use('/api/auth', auth);

http.use(error);

//TODO:: PORT should define in env and get from it  
const PORT = 5000;
// const port = process.env.PORT;
http.listen(PORT, () => console.log(`Listening on port ${PORT}...`));