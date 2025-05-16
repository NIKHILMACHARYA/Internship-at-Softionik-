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


 exports.student_update=async function(req,res){
    if (!req.body.std_id) {
        return res.status(400).json({
            error: 'Missing admin user id'
        });
    } else {
        var query = {
            student_name: req.body.student_name,
            student_email:req.body.student_email,
            student_usn:req.body.student_usn,
        }
        await Student.findOneAndUpdate({ _id: req.body.std_id }, query);
        res.json({
            message: "Updated successfully"
        });
    }
}

 