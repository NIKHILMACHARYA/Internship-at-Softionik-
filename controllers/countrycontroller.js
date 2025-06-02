'use strict';
const mongoose = require('mongoose');
const moment = require('moment');
const country = mongoose.model('country');

exports.add_country = function (req, res) {
    const body = req.body;

    const countryData = new country({
        country_name: body.country_name,
        created_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a"),
        updated_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a")
    });

    countryData.save(function (err, result) {
        if (err) return res.status(500).send(err);
        res.status(201).json(result);
    });
};

exports.country_list = function (req, res) {
    country.find({ deleted_status: false }, function (err, country) {
        if (err) return res.status(400).json({ error: err });

        const list = country.map((country, index) => ({
            sno: index + 1,
            _id: country._id,
            country_name: country.country_name
        }));

        res.json({ country_list: list, error: false });
    });
};


exports.country_list_byid = function (req, res) {
    var list = []
    country.find({ deleted_status: false,_id:req.body.cntry_id }, function (err, resp) {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        for (var i = 0; i < resp.length; i++) {
          list.push({
            sno: i + 1,
            _id: resp[i]._id,
            country_name: resp[i].country_name
          })
        }
        res.json({ country_list: list, error: false });
      }
    });
  };



 exports.country_update=async function(req,res){
    if (!req.body.cntry_id) {
        return res.status(400).json({
            error: 'Missing country id'
        });
    } else {
        var query = {
            country_name:req.body.country_name

        }
        await country.findOneAndUpdate({ _id: req.body.cntry_id }, query);
        res.json({
            message: "Updated successfully"
        });
    }
}



exports.country_delete= async function(req,res){
    if (!req.body.cntry_id) {
        return res.status(400).json({
            error: 'Missing country id'
        });
    } 
    try{
        const result= await country.findOneAndUpdate(
            {_id:req.body.cntry_id },
            {deleted_status:true},
            {new:true}
        );
        if(!result){
            return res.status(404).json({
                error:'Country not found'
            });
        }
        res.json({
            message:'Deleted Successfully',
        });       
    }
    catch(err){
        res.status(500).json({
            error:'Error deleting country',
            details: err.message
        })

    }
    
};  
