const Joi = require('joi');
const mongoose = require('mongoose');
const { serviceProviderSchema } = require('./serviceProvider');

const serviceSchema = new mongoose.Schema({
    service: {
        type: String,
        require: true,
    },
    provider: {
        type: serviceProviderSchema,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        default: "Active"
    },
    user: {
        type: Object,
        require: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    }
});

const Service = mongoose.model('Service', serviceSchema);

function validateService(services) {
    const schema = Joi.object({
        service: Joi.string().min(5).required(),
        provider: Joi.required(),
        description: Joi.string().min(50).required(),
        location: Joi.string().min(4).required(),
        phone: Joi.required(),
        status: Joi.string(),
        user: Joi.required(),
    });

    return schema.validate(services);
}

exports.Service = Service;
exports.serviceSchema = serviceSchema;
exports.validate = validateService;