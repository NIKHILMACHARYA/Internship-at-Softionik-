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
import { AddCaretaker, CaretakerList, EditCaretaker, DeleteCaretaker } from '../../actions/caretakerAction';
import { UserList } from '../../actions/userAction';
import { AddPatient, EditPatient, PatientListById } from '../../actions/patientDetailsAction';
import { areaListById, stateList } from '../../actions/locationAction';
import { data } from 'jquery';

const cookies = new Cookies();


const PatientProfile = () => {
    const token = cookies.get('admin_token');
    const router = useRouter();
    const patient_id = router.query._id;

    const [values, setValues] = useState({
        user_id: '',
        patient_name: '',
        patient_unique_number: '',
        patient_dob: '',
        user: [],
        patient_gender: '',
        patient_email: '',
        states: [],
        patient_latitude: '',
        patient_longitude: '',
        area_id: '',
        patient_address: '',
        main_address: false,
        patient_phone_number: '',
        state_id: '',
        loading: false,
        created_date: '',
        updated_date: ''

    });

    const [msg, setmsg] = useState('');
    const { patient_address, patient, patient_phone_number, user_id, patient_latitude, main_address, address, patient_longitude, patient_name, user, patient_unique_number, loading, patient_dob, patient_gender, patient_email, states, area_id, created_date, updated_date } = values;

    const [stateId, setstateId] = useState({
        state_id: ''
    })

    const [areaByState, setareaByState] = useState({
        areas: []
    })

    const { areas } = areaByState

    const { state_id } = stateId

    useEffect(() => {
        loadDetails();
    }, [router.query._id]);

    useEffect(() => {
        areasByState(state_id)
    }, [state_id]);

    const areasByState = (state_id) => {

        console.log(state_id);
        if (state_id) {
            areaListById(state_id).then(areadata => {

                if (areadata.error) {
                    console.log(areadata.error)
                } else {
                    setareaByState({ ...areaByState, areas: areadata.areaListById })
                }
            })
        }
    }

    const loadDetails = () => {

        PatientListById(router.query._id).then(patientData => {
           // alert(JSON.stringify(patientData))
            let id = router.query._id;
                if (patientData.error) {
                    setValues({ error: data.error })
                } else {

                    // var main_address=patientData.patientDetailListsById[0].main_address;
                    // if(main_address != "true")
                    // {
                    //     main_address=false;
                    // }
                    setValues({
                        ...values,
                        // user_id: patientData.patientDetailListsById[0].user_id,
                        patient_name: patientData.patientDetailListsById[0].patient_name,
                        patient_unique_number: patientData.patientDetailListsById[0].patient_unique_number,
                        patient_dob: patientData.patientDetailListsById[0].patient_dob,
                        patient_gender: patientData.patientDetailListsById[0].patient_gender,
                        patient_email: patientData.patientDetailListsById[0].patient_email,
                        patient_latitude: patientData.patientDetailListsById[0].patient_latitude,
                        patient_longitude: patientData.patientDetailListsById[0].patient_longitude,
                        area_id: patientData.patientDetailListsById[0].area_id,
                        patient_address: patientData.patientDetailListsById[0].patient_address,
                        created_date: patientData.patientDetailListsById[0].created_date,
                        updated_date: patientData.patientDetailListsById[0].updated_date,
                        // main_address:main_address,
                        patient_phone_number: patientData.patientDetailListsById[0].patient_phone_number,

                    });
                    
                }
        })
    

}

const handleSubmit = e => {
    e.preventDefault();
    let created_by_id = localStorage.getItem('id');
    const query = { patient_id, user_id, patient_latitude, patient_longitude, address, main_address, patient_phone_number, state_id, area_id, patient_name, patient_unique_number, patient_dob, patient_gender, patient_email, created_by_id };

    EditPatient(query)
        .then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setTimeout(() => {
                    setValues({ ...values, loading: true })
                });
                setTimeout(() => {
                    setValues({ ...values, loading: false })
                    Router.push(`/patient/viewPatient`);
                }, 1000);
            }
        });
};
const handleChange = name => e => {

    if (name == "state_id") {

        setstateId({ ...stateId, [name]: e.target.value });

    }
    if (name == "main_address") {
        setValues({ ...values, [name]: e.target.checked });
    }
    else {
        setValues({ ...values, [name]: e.target.value });
    }
};

return (
    <div id="wrapper">
        <Head>
            <title>Patient Profile</title>
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
                                <h4 className="page-title float-left">Patient Profile</h4>
                                <ol className="breadcrumb float-right" style={{ marginRight: "300px" }}>
                                    <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                                    <li className="breadcrumb-item active">Patient Profile</li>
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
                                                <div className='col-md-6'><b>Name</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{patient_name}</b></div>
                                            </div>
                                            {/* <div className='row'>
                                                <div className='col-md-6'><b>Unique Number</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{patient_unique_number}</b></div>
                                            </div> */}
                                            <div className='row'>
                                                <div className='col-md-6'><b>Gender</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{patient_gender}</b></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'><b>DOB</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{patient_dob}</b></div>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className='row'>
                                                <div className='col-md-6'><b>Mobile Number</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{patient_phone_number}</b></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'><b>Email Address</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{patient_email}</b></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'><b>Address</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{patient_address}</b></div>
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
                                                <div className='col-md-6'><b>Nursing Home</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}></b></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'><b>LAT</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{patient_latitude}</b></div>
                                            </div>
                                            <div className='row'>
                                                <div className='col-md-6'><b>LNG</b></div>
                                                <div className='col-md-6'><b style={{ color: "black" }}>{patient_longitude}</b></div>
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
export default PatientProfile;