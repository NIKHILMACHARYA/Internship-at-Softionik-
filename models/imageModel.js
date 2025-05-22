const mongoose = require('mongoose');
const crypto = require('crypto');

const imageSchema = new mongoose.Schema(
  {
    image_name: {
      type: String,
      default:""
    },
    image_url: {
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

module.exports = mongoose.model('image', imageSchema);
