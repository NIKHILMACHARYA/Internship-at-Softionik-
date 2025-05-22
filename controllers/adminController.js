
const e = require('express');
var randtoken = require('rand-token');
var mongoose = require('mongoose'),
admin = mongoose.model('admin');
var moment = require('moment');


exports.add_user = function (req, res) {
    admin.find({ user_name:req.body. user_name}, function (err, existingUser) {
        if (existingUser.length >= 1) {
            res.json({msg:"Username already exist!!!"});

        } else {

            var body = req.body;
            console.log(body)
            var new_admin = new admin({

                user_name: body.user_name,
                password: body.password,
                created_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a"),
                updated_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a"),
            });

            new_admin.save(function (err, admin) {
                if (err)
                    res.send(err);
                res.json(admin);
            });
        }
    });
}

// Login Admin
exports.login = function (req, res) {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    admin.findOne({ user_name: user_name }, function (err, existingAdmin) {
        if (err) {
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (!existingAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (existingAdmin.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({
            message: 'Login successful',
            data: {
                _id: existingAdmin._id,
                user_name: existingAdmin.user_name,
                created_date: existingAdmin.created_date
            }
        });
    });
}  
