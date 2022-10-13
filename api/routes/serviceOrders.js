const { Service } = require('../models/services');
const { ServiceOrder, validate } = require('../models/serviceOrders');
const { ServiceProvider } = require('../models/serviceProvider');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const orders = await ServiceOrder.find(); // get all orders from db
  res.send(orders); // send response to request
});

router.post('/', async (req, res) => { // insert new orders record
  const { error } = validate(req.body); // validate the request body data
  if (error) return res.status(400).send(error.details[0].message); // if validation error return error msg

  const service = await Service.findById(req.body.service._id); // if no validation issue find service with requested service id
  if (!service) return res.status(400).send('given service not found');

  const serviceProvider = await ServiceProvider.findById(req.body.provider._id); // find corresponding service provider for service order
  if (!serviceProvider) return res.status(400).send('given service not found');

  let order = new ServiceOrder({ // create new record schema
    detail: req.body.detail,
    cycle: req.body.cycle,
    duration: req.body.duration,
    location: req.body.location,
    service: {
      _id: req.body.service._id,
      name: req.body.service.name,
    },
    provider: {
      _id: req.body.provider._id,
      email: req.body.provider.email,
    },
    customer: {
      _id: req.body.customer._id,
      email: req.body.customer.email
    },
    payment: req.body.payment,
    status: req.body.status,
    // endedDate: req.body.enddate,
  });
  await order.save(); // insert the data to db
  res.send(order); // send back to request inserted record

});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const order = await ServiceOrder.findByIdAndUpdate(req.params.id, {
    detail: req.body.detail,
    cycle: req.body.cycle,
    duration: req.body.duration,
    location: req.body.location,
    service: {
      _id: req.body.service._id,
      name: req.body.service.name,
    },
    provider: {
      _id: req.body.provider._id,
      email: req.body.provider.email,
    },
    customer: {
      _id: req.body.customer._id,
      email: req.body.customer.email
    },
    payment: req.body.payment,
    status: req.body.status,
  }, { new: true });

  if (!order) return res.status(404).send('The Service with the given ID was not found.');
  res.send(order);
});

router.delete('/:id', async (req, res) => {
  const order = await ServiceOrder.findByIdAndRemove(req.params.id);
  if (!order) return res.status(404).send('The Service with the given ID was not found.');
  res.send(order);
});

router.get('/:id', async (req, res) => {
  const order = await ServiceOrder.findById(req.params.id);
  if (!order) return res.status(404).send('The Service with the given ID was not found.');
  res.send(order);
});


router.get('/:id/:email', async (req, res) => {

  const order = await ServiceOrder.find({ provider: { _id: req.params.id, email: req.params.email } });
  console.log(!order);
  if (!order) return res.status(404).send('The Service Provider with the given ID was not found.');
  res.send(order);
});


module.exports = router;