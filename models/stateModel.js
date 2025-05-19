const mongoose = require('mongoose');
const crypto = require('crypto');

const stateSchema = new mongoose.Schema(
  {
    state_name: {
      type: String,
      default:""
    },
    country_id: {
       type: String,
       default:""
     },
    deleted_status:{
        type:String,
        default:false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('state', stateSchema);
