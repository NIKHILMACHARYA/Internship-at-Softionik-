import Link from 'next/link';
import React, { Fragment } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
// import { AddCaretaker, CaretakerList, EditCaretaker, DeleteCaretaker } from '../../actions/caretakerAction';
// import { UserList } from '../../actions/userAction';
import { edit_student,student_list_byid } from '../../actions/studentAction';
// import { areaListById, stateList, countryList, stateListById } from '../../actions/locationAction';
import axios from 'axios';
import { API } from '../../config';


const cookies = new Cookies();

const StudentEdit = () => {
    const router = useRouter();
    const student_id=router.query._id;
    const [values, setValues] = useState({
        student_name:'',
        student_email:'',
        student_usn:'',
        student_branch:'',
    });


    const [msg, setmsg] = useState('');
    const {student_name, student_email,student_usn, student_branch,loading} = values;

    useEffect(() => {
        loadStudentDetails();
    }, []);

    const loadStudentDetails = () => {
        student_list_byid(student_id).then(data => {
               alert(JSON.stringify(data));
            if (data.error) {
                console.log(data.error);
            } else {
                //alert(data.caretakerLists);
                // console.log(data.caretakerDetailLists);
                setValues({ ...values, student_name: data.student_list[0].student_name,student_email: data.student_list[0].student_email,student_usn: data.student_list[0].student_usn,student_branch: data.student_list[0].student_branch });
            }
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        var std_id=employee_id
        var student_data={student_name, student_email,student_usn, student_branch,std_id}

        edit_student(student_data).then(res => {

            if (res.error) {
                setValues({ ...values });
            } else {
                setTimeout(() => {
                    setValues({ ...values, loading: true })
                });
                setTimeout(() => {
                    setValues({ ...values, loading: false })
                    Router.push(`/student/viewStudent`);
                }, 1000);

            }
        });
    };
    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
        
    };

    return (
        <div id="wrapper">
            <Head>
                <title>Student Edit</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content='Country' />
                <meta property="og:image" content="/icons/app_logo.jpeg" />
                <meta itemprop="image" content="/icons/app_logo.jpeg"></meta>
                <meta property="og:image:width" content="200" />
                <meta property="og:image:height" content="200" />
            </Head>
            <Topbar />
            <Sidebar />
            <div className="content-page">
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12" style={{ position: "fixed", zIndex: "1" }}>
                                <div className="page-title-box">
                                    <h4 className="page-title float-left">Student Edit</h4>
                                    <ol className="breadcrumb float-right" style={{ marginRight: "300px" }}>
                                        <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                                        <li className="breadcrumb-item active">Edit Student Data</li>
                                    </ol>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                        <br></br><br></br><br></br>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="card-box" style={{ paddingBottom: "50px" }}>
                                    <h4 className="m-t-0 m-b-30 header-title"></h4>
                                    <div className="form-group form-inline">
                                        <label>Edit Student</label>
                                    </div>
                                    <form role="form" onSubmit={handleSubmit} >
                                        
                                        <div className="form-group">
                                            <label htmlFor="text">Student Name</label>
                                            <input type="text" className="form-control" placeholder="Student Name" id="student_name" name="student_name" onChange={handleChange('student_name')} required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="text">Student Email</label>
                                            <input type="email" className="form-control" placeholder="Email" id="student_email" name="student_email" onChange={handleChange('student_email')} required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="text">Student USN</label>
                                            <input type="text" className="form-control" placeholder="USN" id="student_usn" name="student_usn" onChange={handleChange('student_usn')} required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="text">Branch</label>
                                            <input type="text" className="form-control" placeholder="Branch" id="student_branch" name="student_branch" onChange={handleChange('student_branch')} required />
                                        </div>

                                        <br></br><br></br>
                                        <button type="submit" className="btn btn-primary" >Submit</button>
                                        {loading ? (<div class="alert alert-success margin-top-10">Edited Successfully</div>) : null}
                                    </form>
                                </div>
                            </div>

                        </div>
                        {msg ? (<div class="alert alert-success margin-top-10"> {msg}</div>) : null}
                    </div>
                </div>
            </div>

        </div>
    );

};
export default StudentEdit;