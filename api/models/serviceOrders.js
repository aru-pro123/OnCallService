const Joi = require('joi');
const _ = require('lodash');
const mongoose = require('mongoose');
const { serviceSchema } = require('./services');

const ServiceOrder = mongoose.model('ServiceOrder', new mongoose.Schema({
    service: {
        type: Object,
        require: true,
    },
    provider: {
        type: Object,
        required: true,
    },
    customer: {
        type: Object,
        require: true
    },
    location: {
        type: String,
        require: true,
    },
    detail: {
        type: String,
    },
    cycle: {
        type: Number,
        require: true,
    },
    duration: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
    },
    payment: {
        type: String,
        require: true,
    },
    startedDate: {
        type: Date,
        default: Date.now,
    },
    endedDate: {
        type: Date
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
}));

function validateOrder(services) {
    const schema = Joi.object({
        service: Joi.required(),
        provider: Joi.required(),
        customer: Joi.required(),
        detail: Joi.string().min(50),
        cycle: Joi.required(),
        duration: Joi.required(),
        location: Joi.string().min(4).max(255).required(),
        payment: Joi.required(),
        status: Joi.string().required(),
        endedDate: Joi.date(),
    });

    return schema.validate(services);
}

exports.ServiceOrder = ServiceOrder;
exports.validate = validateOrder;