const mongoose = require('mongoose');
const crypto = require('crypto');

const studentSchema = new mongoose.Schema(
    {
        student_name: {
            type: String,
            default:''
        },
        student_email: {
            type: String,
            default:''
        },
        student_usn: {
            type: String,
            default: ""
        },
        student_branch: {
            type: String,
            default: ""
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

module.exports = mongoose.model('student', studentSchema);