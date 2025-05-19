'use strict';
const mongoose = require('mongoose');
const state = mongoose.model('state');
const country = mongoose.model('country');
var moment = require('moment');

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
