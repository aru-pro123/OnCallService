const auth = require('../middleware/auth');
const { ServiceProvider, validate } = require('../models/serviceProvider');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const serviceProviders = await ServiceProvider.find();
  res.send(serviceProviders);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  let serviceProvider = new ServiceProvider({
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    website: req.body.website,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    zip: req.body.zip,
    phone: req.body.phone,
    userId: req.body.userId,
  });
  serviceProvider = await serviceProvider.save();
  res.send(serviceProvider);

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findById(req.body.userId._id);
  if (!user) return res.status(400).send({ message: 'User not found' });

  const serviceProvider = await ServiceProvider.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    website: req.body.website,
    address1: req.body.address1,
    address2: req.body.address2,
    city: req.body.city,
    zip: req.body.zip,
    phone: req.body.phone,
    userId: req.body.userId,
  }, { new: true });

  if (!serviceProvider) return res.status(404).send({ message: 'The Service Provider with the given ID was not found.' });
  res.send(serviceProvider);
});

router.delete('/:id', async (req, res) => {
  const result = await ServiceProvider.findByIdAndRemove(req.params.id);

  if (!result) return res.status(404).send({ message: 'The Service Provider with the given ID was not found.' });

  res.send(result);
});

router.get('/:id', async (req, res) => {
  const serviceProvider = await ServiceProvider.findById(req.params.id);

  if (!serviceProvider) return res.status(404).send({ message: 'The Service Provider with the given ID was not found.' });

  res.send(serviceProvider);
});

router.get('/:id/:email', async (req, res) => {
  const serviceProvider = await ServiceProvider.find({ userId: { _id: req.params.id, email: req.params.email } });
  if (!serviceProvider) return res.status(404).send({ message: 'The Service Provider with the given ID was not found.' });

  res.send(serviceProvider);
});


module.exports = router;