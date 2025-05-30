'use strict';
const mongoose = require('mongoose');
const moment = require('moment');
const Student = mongoose.model('student');

exports.add_student = function (req, res) {
    const body = req.body;

    const studentData = new Student({
        student_name: body.student_name,
        student_email: body.student_email,
        student_usn: body.student_usn,
        student_branch: body.student_branch,
        created_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a"),
        updated_date: moment().utcOffset("+05:30").format("DD MMM, YYYY hh:mm a")
    });

    studentData.save(function (err, result) {
        if (err) return res.status(500).send(err);
        res.status(201).json(result);
    });
};

exports.student_list = function (req, res) {
    Student.find({ deleted_status: false }, function (err, students) {
        if (err) return res.status(400).json({ error: err });

        const list = students.map((student, index) => ({
            sno: index + 1,
            _id: student._id,
            student_name: student.student_name,
            student_email: student.student_email,
            student_usn: student.student_usn,
            student_branch: student.student_branch
        }));

        res.json({ student_list: list, error: false });
    });
};

exports.student_list_byid = function (req, res) {
    var list = []
    Student.find({ deleted_status: false,_id:req.body.std_id }, function (err, resp) {
      if (err) {
        return res.status(400).json({
          error: err
        });
      } else {
        for (var i = 0; i < resp.length; i++) {
          list.push({
            sno: i + 1,
            _id: resp[i]._id,
            student_name: resp[i].student_name,
            student_email: resp[i].student_email,
            student_usn: resp[i].student_usn,
            student_branch:resp[i].student_branch,
          })
        }
        res.json({ student_list: list, error: false });
      }
    });
  };

 exports.student_update=async function(req,res){
    if (!req.body.std_id) {
        return res.status(400).json({
            error: 'Missing student user id'
        });
    } else {
        var query = {
            student_name: req.body.student_name,
            student_email:req.body.student_email,
            student_usn:req.body.student_usn,
            student_branch:req.body.student_branch,

        }
        await Student.findOneAndUpdate({ _id: req.body.std_id }, query);
        res.json({
            message: "Updated successfully"
        });
    }
}



exports.student_delete= async function(req,res){
    if (!req.body.std_id) {
        return res.status(400).json({
            error: 'Missing student id'
        });
    } 
    try{
        const result= await student.findOneAndUpdate(
            {_id:req.body.std_id },
            {deleted_status:true},
            {new:true}
        );
        if(!result){
            return res.status(404).json({
                error:'Student not found'
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


