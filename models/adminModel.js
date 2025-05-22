const mongoose = require('mongoose');
const crypto = require('crypto');

const adminSchema = new mongoose.Schema(
    {
        admin_name: {
            type: String,
            default:''
        },
        user_name: {
            type: String,
            default:''
        },
        password: {
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

module.exports = mongoose.model('admin', adminSchema);