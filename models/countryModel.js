const mongoose = require('mongoose');
const crypto = require('crypto');

const countrySchema = new mongoose.Schema(
    {
        country_name: {
            type: String,
            default:''
        },
        created_date: {
            type: Date,
            default: Date.now
        },
        deleted_status:{
            type:String,
            default:false
        }
    },
    { timestamp: true }
);

module.exports = mongoose.model('country', countrySchema);