'use strict';
const e = require('express');
// var sha1 = require('sha1');
var randtoken = require('rand-token');
var mongoose = require('mongoose'),
image = mongoose.model('image');
var moment = require('moment');

exports.add_image = function (req, res) {
    var body = req.body;
    console.log(body)
    var image_url="";
    if (req.file) {
        image_url = process.env.IMAGE_URL + "demo_image/" + req.file.filename
    }
    
    var imagedata = new image({
        image_name: body.image_name,
        image_url: image_url,
    });
    imagedata.save(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
}

exports.edit_image=async function(req,res){
    if (!req.body.img_id) {
        return res.status(400).json({
            error: 'Missing image id'
        });
    } else {
        var image_url="";
            if (req.file) {
               image_url = process.env.IMAGE_URL + "demo_image/" + req.file.filename
            }

        var query = {
            image_name:req.body.image_name,
            image_url: image_url      
        }
        await image.findOneAndUpdate({ _id: req.body.img_id }, query);
        res.json({
            message: "Updated successfully"
        });
    }
}


exports.image_list = function (req, res) {
    var list = []
    image.find({ deleted_status: false }, function (err, resp) {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        for (var i = 0; i < resp.length; i++) {
          list.push({
            sno: i + 1,
            _id: resp[i]._id,
            image_name: resp[i].image_name,
            image_url:resp[i].image_url      
          })
        }
        res.json({ image_list: list, error: false });
      }
    });
  };

  
exports.image_list_byid = function (req, res) {
    var list = []
    image.find({ deleted_status: false,_id:req.body.img_id }, function (err, resp) {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        for (var i = 0; i < resp.length; i++) {
          list.push({
            sno: i + 1,
            _id: resp[i]._id,
            image_name: resp[i].image_name,
            image_url:resp[i].image_url  
          })
        }
        res.json({ image_list: list, error: false });
      }
    });
  };

  
exports.image_delete= async function(req,res){
    if (!req.body.img_id) {
        return res.status(400).json({
            error: 'Missing Image id'
        });
    } 
    try{
        const result= await image.findOneAndUpdate(
            {_id:req.body.img_id },
            {deleted_status:true},
            {new:true}
        );
        if(!result){
            return res.status(404).json({
                error:'Image not found'
            });
        }
        res.json({
            message:'Deleted Successfully',
        });       
    }
    catch(err){
        res.status(500).json({
            error:'Error deleting image',
            details: err.message
        })

    } 
}; 
