const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
    {
        serviceId: {
            type: String,
            require:true,
            trim: true,
        },
        name: {
            type: String,
            trim: true,
        },
        serviceType: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);


const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
