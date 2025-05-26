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
import {edit_employee,employeeListById } from '../../actions/employeeAction';
// import { areaListById, stateList, countryList, stateListById } from '../../actions/locationAction';
import axios from 'axios';
import { API } from '../../config'; 


const cookies = new Cookies();

const EmployeeEdit = () => {
    const router = useRouter();
    const employee_id=router.query._id;
    const [values, setValues] = useState({
        employee_name:'',
        employee_email:'',
        employee_password:''

    });


    const [msg, setmsg] = useState('');
    const { employee_name, employee_email, employee_password,loading} = values;
    useEffect(() => {
           loadEmployeeDetails();
       }, []);
   
       const loadEmployeeDetails = () => {
           employeeListById(employee_id).then(data => {
                  alert(JSON.stringify(data));
               if (data.error) {
                   console.log(data.error);
               } else {
                   //alert(data.caretakerLists);
                   // console.log(data.caretakerDetailLists);
                   setValues({ ...values, employee_name: data.employee_list[0].employee_name,employee_email: data.employee_list[0].employee_email,employee_password: data.employee_list[0].employee_password });
               }
           })
       }
   
       
    const handleSubmit = (e) => {
        e.preventDefault();
        var empid=employee_id
        var employee_data={employee_name,employee_email,employee_password,empid}

        edit_employee(employee_data).then(res => {

            if (res.error) {
                setValues({ ...values });
            } else {
                setTimeout(() => {
                    setValues({ ...values, loading: true })
                });
                setTimeout(() => {
                    setValues({ ...values, loading: false })
                    Router.push(`/employee/viewEmployee`);
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
                <title>Employee Edit</title>
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
                                    <h4 className="page-title float-left">Employee Edit</h4>
                                    <ol className="breadcrumb float-right" style={{ marginRight: "300px" }}>
                                        <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                                        <li className="breadcrumb-item active">Employee Edit</li>
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
                                        <label>Edit Employee</label>
                                    </div>
                                    <form role="form" onSubmit={handleSubmit} >
                                        <div className="form-group">
                                            <label htmlFor="text">Employee Name</label>

                                            <input type="text" value={employee_name} className="form-control" placeholder="Employee Name" id="employee_name" name="employee_name" onChange={handleChange('employee_name')} required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="text">Employee Email</label>
                                            <input type="email" value={employee_email} className="form-control" placeholder="Email" id="employee_email" name="employee_email" onChange={handleChange('employee_email')} required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="text">Password</label>

                                            <input type="password" value={employee_password} className="form-control" placeholder="Password" id="employee_password" name="employee_password" onChange={handleChange('employee_password')} required />
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
export default EmployeeEdit;