'use strict';
const mongoose = require('mongoose');
const state = mongoose.model('state');
const country = mongoose.model('country');
const city = mongoose.model('city');
var moment = require('moment');

exports.add_city = function (req, res) {
    var body = req.body;
    console.log(body)
    var citydata = new city({
        city_name: body.city_name,
        state_id:body.state_id,
        // country_id:body.country_id,
        created_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a"),
        updated_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a")
    });
    citydata.save(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
}

exports.city_list = function (req, res) {
    var list = [];

    city.find({ deleted_status: false }, async function (err, resp) {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            for (var i = 0; i < resp.length; i++) {
                let state_name = "";
                let country_name = "";
                let state_id = resp[i].state_id;
                let country_id = resp[i].country_id;

                if (mongoose.Types.ObjectId.isValid(state_id)) {
                    const stateArr = await state.find({ _id: state_id }).exec();
                    if (stateArr[0]) {
                        state_name = stateArr[0].state_name;
                        country_id = stateArr[0].country_id;

                        if (mongoose.Types.ObjectId.isValid(country_id)) {
                            const countryArr = await country.find({ _id: country_id }).exec();
                            if (countryArr[0]) {
                                country_name = countryArr[0].country_name;
                            }
                        }
                    }
                }

                list.push({
                    sno: i + 1,
                    _id: resp[i]._id,
                    city_name: resp[i].city_name,
                    state_id: state_id,
                    state_name: state_name,
                    country_id: country_id,
                    country_name: country_name
                });
            }

            res.json({ city_list: list, error: false });
        }
    });
};

exports.city_list_byid = async function (req, res) {
    var list = []
    city.find({ deleted_status: false,_id:req.body.ct_id }, async function (err, resp) {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        for (var i = 0; i < resp.length; i++) {

                // if (mongoose.Types.ObjectId.isValid(state_id)) {
                    const stateArr = await state.find({ _id:resp[i].state_id }).exec();
                    let state_name = "";
                    let country_name = "";
                    let country_id = "";
                    if (stateArr[0]!= undefined && stateArr[0]!="") {
                        state_name = stateArr[0].state_name;
                        country_id = stateArr[0].country_id;

                        // if (mongoose.Types.ObjectId.isValid(country_id)) {
                            const countryArr = await country.find({ _id: country_id }).exec();
                            if (countryArr[0]!= undefined && countryArr[0]!="") {
                                country_name = countryArr[0].country_name;
                            }
                        // }
                    }
                // }
            list.push({
                    sno: i + 1,
                    _id: resp[i]._id,
                    city_name: resp[i].city_name,
                    state_id: resp[i].state_id,
                    state_name: state_name,
                    country_id: country_id,
                    country_name: country_name
                });
        }
        res.json({ city_list: list, error: false });
      }
    });
  };

 exports.city_update = async function(req,res){
    if (!req.body.ct_id) {
        return res.status(400).json({
            error: 'Missing city id'
        });
    } else {
        var query = {
            city_name: req.body.city_name,
            state_id:req.body.state_id
        }

        await city.findOneAndUpdate({ _id: req.body.ct_id }, query);
        res.json({
            message: "Updated successfully"
        });
    }
}



exports.city_delete= async function(req,res){
    if (!req.body.ct_id) {
        return res.status(400).json({
            error: 'Missing city id'
        });
    } 
    try{
        const result= await city.findOneAndUpdate(
            {_id:req.body.ct_id },
            {deleted_status:true},
            {new:true}
        );
        if(!result){
            return res.status(404).json({
                error:'city not found'
            });
        }
        res.json({
            message:'Deleted Successfully',
        });       
    }
    catch(err){
        res.status(500).json({
            error:'Error deleting student',
            details: err.message
        })

    }
    
};  
 
