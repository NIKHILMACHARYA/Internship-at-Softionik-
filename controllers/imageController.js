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
            image_name:body.image_name,
            image_url: image_url      
        }
        await image.findOneAndUpdate({ _id: req.body.img_id }, query);
        res.json({
            message: "Updated successfully"
        });
    }
}