const Joi = require('joi');
const mongoose = require('mongoose');
const { userSchema } = require('./user');

const serviceProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    company: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    website: {
        type: String,
        require: false
    },
    address1: {
        type: String,
        require: true
    },
    address2: {
        type: String,
        require: false
    },
    city: {
        type: String,
        require: true
    },
    zip: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    userId: {
        type: Object,
        require: true
    },
    createdDate: {
        type: Date
    }
});

const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);

function validateProvider(serviceProvider) {
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        company: Joi.string().min(4).required(),
        email: Joi.string().min(5).email().required(),
        website: Joi.string().min(5),
        address1: Joi.string().required(),
        address2: Joi.string(),
        city: Joi.string().min(5).max(50).required(),
        zip: Joi.required(),
        phone: Joi.required(),
        userId: Joi.required(),
    });

    return schema.validate(serviceProvider);
}

exports.ServiceProvider = ServiceProvider;
exports.serviceProviderSchema = serviceProviderSchema;
exports.validate = validateProvider;