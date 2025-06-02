'use strict';
const mongoose = require('mongoose');
const moment = require('moment');
const state = mongoose.model('state');
const country = mongoose.model('country');

exports.add_state = function (req, res) {
    const body = req.body;

    const stateData = new state({
        state_name: body.state_name,
        country_id:body.country_id,
        created_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a"),
        updated_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a")
    });

    stateData.save(function (err, result) {
        if (err) return res.status(500).send(err);
        res.status(201).json(result);
    });
};

exports.state_list = async function (req, res) {
    var list = [];
    state.find({ deleted_status: false }, async function (err, resp) {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            for (var i = 0; i < resp.length; i++) {
                var country_name = "";

                if (mongoose.Types.ObjectId.isValid(resp[i].country_id)) {
                    var countryArr = await country.find({ _id: resp[i].country_id }).exec();
                    if (countryArr[0] != undefined && countryArr[0] != "") {
                        country_name = countryArr[0].country_name;
                    }
                }

                list.push({
                    sno: i + 1,
                    _id: resp[i]._id,
                    state_name: resp[i].state_name,
                    country_id: resp[i].country_id,
                    country_name: country_name
                });
            }

            res.json({ state_list: list, error: false });
        }
    });
};


exports.state_list_byid = async function (req, res) {
    var list = []
    state.find({ deleted_status: false,_id:req.body.st_id }, async function (err, resp) {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        for (var i = 0; i < resp.length; i++) {
            // if (mongoose.Types.ObjectId.isValid(resp[i].country_id)) 
               var countryArr = await country.find({ _id: resp[i].country_id }).exec();
               var country_name = "";
               if (countryArr[0] != undefined && countryArr[0] != "") {
                   country_name = countryArr[0].country_name;
                }
           

          list.push({
            sno: i + 1,
            _id: resp[i]._id,
            state_name: resp[i].state_name,
            country_id: resp[i].country_id,
            country_name: country_name
          })
        }
        res.json({ state_list: list, error: false });
      }
    });
  };


 exports.state_update=async function(req,res){
    if (!req.body.st_id) {
        return res.status(400).json({
            error: 'Missing state id'
        });
    } else {
        var query = {
            state_name: req.body.state_name,
            country_id:req.body.country_id,
            
        }
        await state.findOneAndUpdate({ _id: req.body.st_id }, query);
        res.json({
            message: "Updated successfully"
        });
    }
}



exports.state_delete= async function(req,res){
    if (!req.body.st_id) {
        return res.status(400).json({
            error: 'Missing state id'
        });
    } 
    try{
        const result= await state.findOneAndUpdate(
            {_id:req.body.st_id },
            {deleted_status:true},
            {new:true}
        );
        if(!result){
            return res.status(404).json({
                error:'State not found'
            });
        }
        res.json({
            message:'Deleted Successfully',
        });       
    }
    catch(err){
        res.status(500).json({
            error:'Error deleting state',
            details: err.message
        })
    }
};  
