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
import { guardian_list_by_id } from '../../actions/patientDetailsAction';
import { areaListById, stateList } from '../../actions/locationAction';
import { data } from 'jquery';

const cookies = new Cookies();


const GuardianProfile = () => {
    const token = cookies.get('admin_token');
    const router = useRouter();
    const guardian_id = router.query._id;

    const [values, setValues] = useState({
        user_id: '',
        guardian_first_name: '',
        guardian_last_name:'',
        guardian_unique_number: '',
        guardian_dob: '',
        guardian_gender: '',
        guardian_email: '',
        guardian_phone_number: '',
        created_date: '',
        updated_date: '',
        guardian_latitude:'',
        guardian_longitude:''

    });

    const {  guardian_phone_number,guardian_first_name, user, guardian_unique_number,guardian_dob, guardian_gender, guardian_email,guardian_latitude,guardian_longitude,created_date, updated_date } = values;

    useEffect(() => {
        loadDetails();
    }, [router.query._id]);

    const loadDetails = () => {

        guardian_list_by_id(router.query._id).then(guardiandata => {
        //    alert(JSON.stringify(guardiandata))
            let id = router.query._id;
                if (guardiandata.error) {
                    setValues({ error: data.error })
                } else {
                    setValues({
                        ...values,
                        guardian_first_name: guardiandata.guardian_list[0].guardian_first_name,
                        guardian_last_name: guardiandata.guardian_list[0].guardian_first_name,
                        guardian_unique_number: guardiandata.guardian_list[0].guardian_unique_number,
                        guardian_dob: guardiandata.guardian_list[0].guardian_dob,
                        guardian_gender: guardiandata.guardian_list[0].guardian_gender,
                        guardian_email: guardiandata.guardian_list[0].guardian_email,
                        created_date: guardiandata.guardian_list[0].created_date,
                        updated_date: guardiandata.guardian_list[0].updated_date,
                        guardian_phone_number: guardiandata.guardian_list[0].guardian_phone_number,
                        guardian_latitude: guardiandata.guardian_list[0].guardian_latitude,
                        guardian_longitude: guardiandata.guardian_list[0].guardian_longitude,

                    });
                    
                }
        })
    

}



return (
    <div id="wrapper">
        <Head>
            <title>Guardian Profile</title>
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
                                <h4 className="page-title float-left">Guardian Profile</h4>
                                <ol className="breadcrumb float-right" style={{ marginRight: "300px" }}>
                                    <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                                    <li className="breadcrumb-item active">Guardian Profile</li>
                                </ol>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                    <br></br><br></br><br></br>

                    <div class="row container">
                        <div className="col-md-12">
                            <div className="card-box">
                                <div style={{ width: '98%' }}>
                                    <div class="row">
                                        <div className="col-md-2">
                                            {/* <img src={"http://103.214.132.32:3243/public/images/caretaker/"} alt="Image not found" height="100px" width="100px" style={{borderRadius:"50%"}}></img> */}
                                        </div>
                                        <div className="col-md-5">
                                            <div className='row'>
                                                <div className='col-md-6'><b>First Name</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{guardian_first_name}</b></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'><b>First Name</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{guardian_first_name}</b></div>
                                            </div>
                                            {/* <div className='row'>
                                                <div className='col-md-6'><b>Unique Number</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{guardian_unique_number}</b></div>
                                            </div> */}
                                            <div className='row'>
                                                <div className='col-md-6'><b>Gender</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{guardian_gender}</b></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'><b>DOB</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{guardian_dob}</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className='row'>
                                                <div className='col-md-6'><b>Mobile Number</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{guardian_phone_number}</b></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'><b>Email Address</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{guardian_email}</b></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'><b></b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}></b></div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card-box">
                                <div style={{ width: '98%' }}>
                                    <div class="row">
                                        <div className="col-md-12">
                                            <div className='row'>
                                                <div className='col-md-6'><b>Created Date</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{created_date}</b></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'><b>Updated Date</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{updated_date}</b></div>
                                            </div>
                            
                                            <div className='row'>
                                                <div className='col-md-6'><b>LAT</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{guardian_latitude}</b></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'><b>LNG</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{guardian_longitude}</b></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};
export default GuardianProfile;