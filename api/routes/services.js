const { Service, validate } = require('../models/services');
const { ServiceProvider } = require('../models/serviceProvider');
const { User } = require('../models/user');
const auth = require('../middleware/auth');
const provider = require('../middleware/provider');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const services = await Service.find();
  res.send(services);
});

router.post('/', [auth, provider], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findById(req.body.user._id);
  if (!user) return res.status(400).send({ message: 'given user not found' });

  const serviceProvider = await ServiceProvider.findById(req.body.provider._id);
  if (!serviceProvider) return res.status(400).send({ message: 'given service provider not found' });

  let service = new Service({
    service: req.body.service,
    provider: {
      _id: req.body.provider._id,
      name: req.body.provider.name,
      email: req.body.provider.email,
      phone: req.body.provider.phone,
    },
    description: req.body.description,
    location: req.body.location,
    phone: req.body.phone,
    status: req.body.status,
    user: {
      _id: req.body.user._id,
      email: req.body.user.email,
    }
  });
  await service.save();
  res.send(service);

});

router.put('/:id', [auth, provider], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const service = await Service.findByIdAndUpdate(req.params.id, {
    service: req.body.service,
    provider: {
      _id: req.body.provider._id,
      name: req.body.provider.name,
      email: req.body.provider.email,
      phone: req.body.provider.phone,
    },
    description: req.body.description,
    location: req.body.location,
    phone: req.body.phone,
    status: req.body.status,
    user: {
      _id: req.body.user._id,
      email: req.body.user.email,
    }
  }, { new: true });

  if (!service) return res.status(404).send({ message: 'The Service with the given ID was not found.' });
  res.send(service);
});

router.delete('/:id', [auth, provider], async (req, res) => {
  const service = await Service.findByIdAndRemove(req.params.id);
  if (!service) return res.status(404).send({ message: 'The Service with the given ID was not found.' });
  res.send(service);
});

router.get('/:id', async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).send({ message: 'The Service with the given ID was not found.' });
  res.send(service);
});

router.get('/:id/:email', async (req, res) => {
  const service = await Service.find({ user: { _id: req.params.id, email: req.params.email } });

  if (!service) return res.status(404).send({ message: 'The Service with the given ID was not found.' });
  res.send(service);
});

module.exports = router;