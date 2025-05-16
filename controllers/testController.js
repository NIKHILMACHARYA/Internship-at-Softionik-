'use strict';
const e = require('express');
 var randtoken = require('rand-token');
var mongoose = require('mongoose'),
    test = mongoose.model('test'),
    employee = mongoose.model('employee');
var moment = require('moment');


exports.add_data = function (req, res) {

    test.find({ email: req.body.email }, function (err, num) {
        if (num.length >= 1) {
            for (var i = 0; i <= num.length; i++) {
                if (num[i].email === req.body.email) {
                    return err;
                }
            }
        } else {

            var body = req.body;
            console.log(body)
            var new_task = new test({

                name: body.name,
                username: body.username,
                password: body.password,
                created_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a"),
                updated_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a"),
                email: body.email
            });

            new_task.save(function (err, task) {
                if (err)
                    res.send(err);
                res.json(task);
            });
        }
    });
}

exports.add_employee = function (req, res) {
    var body = req.body;
    console.log(body)
    var employeedata = new employee({

        employee_name: body.employee_name,
        employee_email: body.employee_email,
        employee_password: body.employee_password,
        created_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a"),
        updated_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a")
    });
    employeedata.save(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
}


exports.employee_list = function (req, res) {
    var list = []
    employee.find({ deleted_status: false }, function (err, resp) {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        for (var i = 0; i < resp.length; i++) {
          list.push({
            sno: i + 1,
            _id: resp[i]._id,
            employee_name: resp[i].employee_name,
            employee_email: resp[i].employee_email,
            employee_password: resp[i].employee_password,
          })
        }
        res.json({ employee_list: list, error: false });
      }
    });
  };


exports.employee_list_byid = function (req, res) {
    var list = []
    employee.find({ deleted_status: false,_id:req.body.empid }, function (err, resp) {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        for (var i = 0; i < resp.length; i++) {
          list.push({
            sno: i + 1,
            _id: resp[i]._id,
            employee_name: resp[i].employee_name,
            employee_email: resp[i].employee_email,
            employee_password: resp[i].employee_password,
          })
        }
        res.json({ employee_list: list, error: false });
      }
    });
  };

  exports.employee_update=async function(req,res){
    if (!req.body.empid) {
        return res.status(400).json({
            error: 'Missing admin user id'
        });
    } else {
        var query = {
            employee_name: req.body.employee_name,
            employee_email:req.body.employee_email,
            employee_password:req.body.employee_password,
           
        }
        await employee.findOneAndUpdate({ _id: req.body.empid }, query);
        res.json({
            message: "Updated successfully"
        });
    }
}



exports.employee_delete= async function(req,res){
    if (!req.body.empid) {
        return res.status(400).json({
            error: 'Missing emp id'
        });
    } 
    try{
        const result= await employee.findOneAndUpdate(
            {_id:req.body.empid },
            {deleted_status:true},
            {new:true}
        );
        if(!result){
            return res.status(404).json({
                error:'Employee not found'
            });
        }
        res.json({
            message:'Deleted Successfully',
        });       
    }
    catch(err){
        res.status(500).json({
            error:'Error deleting employee',
            details: err.message
        })

    }
};   

