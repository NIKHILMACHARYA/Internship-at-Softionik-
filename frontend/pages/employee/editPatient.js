import Link from 'next/link';
import React, { Fragment } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
import { AddCaretaker, CaretakerList, EditCaretaker, DeleteCaretaker } from '../../actions/caretakerAction';
import { UserList } from '../../actions/userAction';
import { AddPatient, EditPatient, PatientListById } from '../../actions/patientDetailsAction';
import { areaListById, stateList,stateListById,countryList } from '../../actions/locationAction';
import { data } from 'jquery';
import { API } from '../../config';

const cookies = new Cookies();


const PatientEdit = () => {
    const [patientImg, setpatientImg] = useState();
    const token = cookies.get('admin_token');
    const router = useRouter();
    const patient_id=router.query._id;

    const [values, setValues] = useState({
        user_id: '',
        patient_name: '',
        patient_unique_number: '',
        patient_dob: '',
        user:[],
        patient_gender:'',
        patient_email:'',
        states:[],
        patient_latitude:'',
        patient_longitude:'',
        area_id:'',
        patient_address:'',
        main_address:false,
        patient_phone_number:'',
        state_id:'',
        loading:false,
        patient_last_name: '',
        country_code: '',
        countries: [],
        ic_number: '',
        profile_image:'',
        pincode:'',
    });

    const [msg, setmsg] = useState('');
    const {patient_address,patient,patient_last_name,country_code,patient_phone_number,user_id,patient_latitude,main_address,address,patient_longitude, patient_name,user, patient_unique_number, loading, patient_dob, patient_gender,patient_email,states,area_id,countries,ic_number,profile_image,pincode} = values;

    const [countryId, setcountryId] = useState({
        country_id: ''
    })

    const [stateByCountry, setstateByCountry] = useState({
        statesList: []
    })
    
    const [stateId, setstateId] = useState({
        state_id: ''
    })

    const [areaByState, setareaByState] = useState({
        areas: []
    })

    const {areas}=areaByState

    const {state_id} = stateId

    const { statesList } = stateByCountry
    const { country_id } = countryId

    useEffect(() => {
        loadDetails();
    }, [router.query._id]);

    useEffect(() => {
        areasByState(state_id)
    }, [state_id]);

    useEffect(() => {
        statesByCountry(country_id)
    }, [country_id]);

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

    const statesByCountry = (country_id) => {

        console.log(country_id);
        if (country_id) {
            stateListById(country_id).then(statedata => {
                // console.log(areadata);
                if (statedata.error) {
                    console.log(statedata.error)
                } else {
                    setstateByCountry({ ...stateByCountry, statesList: statedata.stateListById })
                }
            })
        }
    }

    const loadDetails = () => {
        UserList().then(data => {
            if (data.error) {
                console.log(data.error);
                setValues({ error: data.error })
            }
            else {
                countryList().then(countrydata => {
                    if (countrydata.error) {
                        console.log(countrydata.error);
                    } else {

                stateList().then(statedata => {

                    if(statedata.error){
                        setValues({error:data.error})
                    }
                    else{
                        PatientListById(router.query._id).then(patientData =>{
                            // alert(JSON.stringify(patientData))
                           let id=router.query._id;
                           if(id)

                            if(patientData.error){
                                setValues({error:data.error})
                            }else{

                                var main_address=patientData.patientDetailListsById[0].main_address;
                                if(main_address != "true")
                                {
                                    main_address=false;
                                }
                                setValues({
                                    ...values,
                                    states:statedata.states,
                                    user: data.userLists,
                                    user_id: patientData.patientDetailListsById[0].user_id,
                                    patient_name: patientData.patientDetailListsById[0].patient_name ,
                                    patient_last_name:patientData.patientDetailListsById[0].patient_last_name,
                                    country_code:patientData.patientDetailListsById[0].country_code,
                                    patient_unique_number: patientData.patientDetailListsById[0].patient_unique_number,
                                    patient_dob: patientData.patientDetailListsById[0].patient_dob,
                                    patient_gender:patientData.patientDetailListsById[0].patient_gender,
                                    patient_email:patientData.patientDetailListsById[0].patient_email,
                                    patient_latitude:patientData.patientDetailListsById[0].patient_latitude,
                                    patient_longitude:patientData.patientDetailListsById[0].patient_longitude,
                                    area_id:patientData.patientDetailListsById[0].area_id,
                                    patient_address:patientData.patientDetailListsById[0].patient_address,
                                    main_address:main_address,
                                    patient_phone_number:patientData.patientDetailListsById[0].patient_phone_number,
                                    countries: countrydata.country_list,
                                    ic_number:patientData.patientDetailListsById[0].ic_number,
                                    profile_image:patientData.patientDetailListsById[0].profile_image,
                                    pincode:patientData.patientDetailListsById[0].pincode,
                                    
                                });
                                //
                                setcountryId({...countryId,country_id:patientData.patientDetailListsById[0].country_id})
                                setstateId({...stateId,state_id:patientData.patientDetailListsById[0].state_id})
                            }
                        }) 
                    }
                })
            }
            })
            }
        });
    }

    // const handleSubmit = e => {
    //     e.preventDefault();
    //     let created_by_id = localStorage.getItem('id');
    //     const query = {patient_id,user_id,patient_latitude,patient_longitude,address,main_address,patient_phone_number, state_id,area_id, patient_name, patient_unique_number, patient_dob, patient_gender,patient_email,created_by_id };

    //     EditPatient(query)
    //     .then(data => {
    //         if (data.error) {
    //             setValues({ ...values, error: data.error, loading: false });
    //         } else {
    //             setTimeout(() => {
    //                 setValues({ ...values, loading: true })
    //             });
    //             setTimeout(() => {
    //                 setValues({ ...values, loading: false })
    //                 Router.push(`/patient/viewPatient`);  
    //             }, 1000);
    //         }
    //     });
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        let created_by_id = localStorage.getItem('id');

        const formData = new FormData();
        formData.append('patient_name', patient_name);
        formData.append('patient_last_name', patient_last_name);
        formData.append('ic_number', ic_number);
        formData.append('patient_dob', patient_dob);
        formData.append('patient_gender', patient_gender);
        formData.append('patient_email', patient_email);
        formData.append('created_by_id', created_by_id);
        formData.append('patient_latitude', patient_latitude);
        formData.append('patient_longitude', patient_longitude);
        formData.append('address', address);
        formData.append('patient_phone_number', patient_phone_number);
        formData.append('state_id', state_id);
        formData.append('area_id', area_id);
        formData.append('country_id', country_id);
        formData.append('country_code', country_code);
        formData.append('patientImg', patientImg);
        formData.append('pincode', pincode);
        formData.append('patient_id', patient_id);
        

        axios.post(`${API}/patientdetail_edit`, formData, {
        }).then(res => {
            loadDetails();

            if (res.error) {
                setValues({ ...values });
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

        if (name == "country_id") {
            setcountryId({ ...countryId, [name]: e.target.value });
        }

        if (name == "state_id") {

            setstateId({ ...stateId, [name]: e.target.value });

        }
        if(name == "main_address"){
            setValues({...values,[name]:e.target.checked});
        }
        else{
            setValues({ ...values, [name]: e.target.value });
        }  
    };

    const onFileChange = (e) => {
        setpatientImg(e.target.files[0]);
    }
   
    return (
        <div id="wrapper">
            <Head>
                <title>Patient Edit</title>
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
                                    <h4 className="page-title float-left">Patient Edit</h4>
                                    <ol className="breadcrumb float-right" style={{ marginRight: "300px" }}>
                                        <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                                        <li className="breadcrumb-item active">Patient Edit</li>
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
                                        <label>Edit Patient</label>
                                    </div>
                                    <form role="form" onSubmit={handleSubmit} >
                                        {/* <div className="form-group">
                                            <select id='single' className="form-control" value={user_id} name="user_id" required onChange={handleChange('user_id')} >
                                                    <option value="all">Select Guardian Number</option>
                                                    {user.map((person, i) =>
                                                        <option key={i} value={person._id} > {person.guardian_phone_number}</option>
                                                    )}

                                                </select>
                                        </div> */}

                                       

                                        <div className="form-group">
                                        <label htmlFor="text">First Name</label>

                                            <input type="text" className="form-control" value={patient_name} placeholder="Patient Name" id="patient_name" name="patient_name" onChange={handleChange('patient_name')} required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="text">Last Name</label>
                                            <input type="text" className="form-control" value={patient_last_name} placeholder="Last Name" id="patient_last_name" name="patient_last_name" onChange={handleChange('patient_last_name')} required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="text">Country Code</label>

                                            <input type="text" className="form-control" value={country_code} placeholder="Country Code" id="country_code" name="country_code" onChange={handleChange('country_code')} required />
                                        </div>
                                        
                                        <div className="form-group">
                                        <label htmlFor="text">Phone Number</label>

                                            <input type="text" className="form-control" value={patient_phone_number} placeholder="Patient Phone Number" id="patient_phone_number" name="patient_phone_number" onChange={handleChange('patient_phone_number')} required />
                                        </div>

                                        {/* <div className="form-group">
                                        <label htmlFor="text">Unique Number</label>

                                            <input type="text" className="form-control" placeholder="Unique Number" value={patient_unique_number} id="patient_unique_number" name="patient_unique_number" onChange={handleChange('patient_unique_number')} required />
                                        </div> */}
                                        <div className="form-group">
                                        <label htmlFor="text">Date of Birth</label>

                                            <input type="date" className="form-control" placeholder="Date of Birth" value={patient_dob} id="patient_dob" name="patient_dob" onChange={handleChange('patient_dob')} required />
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="text">Email</label>

                                            <input type="text" className="form-control" placeholder="Email" value={patient_email} id="patient_email" name="patient_email" onChange={handleChange('patient_email')} required />
                                        </div>
                                        
                                        <div className="form-group">
                                        <label htmlFor="text">Address</label>

                                                <input type="text" className="form-control" placeholder="Address" value={patient_address} id="patient_address" name="patient_address" onChange={handleChange('patient_address')} required />
                                        </div>

                                        <div className="form-group ">
                                        <label htmlFor="text">Country</label>
                                            <select id='single' className="form-control" value={country_id} name="country_id" required onChange={handleChange('country_id')} >
                                                <option value="all">Select Country</option>
                                                {countries.map((cnt, i) =>
                                                    <option key={i} value={cnt._id} > {cnt.country_name}</option>
                                                )}

                                            </select>
                                        </div>

                                        <div className="form-group ">
                                        <label htmlFor="text">State</label>
                                                <select id='single' className="form-control" value={state_id} name="state_id" required onChange={handleChange('state_id')} >
                                                    <option value="all">Select State</option>
                                                    {statesList.map((person, i) =>
                                                        <option key={i} value={person._id} > {person.state_name}</option>
                                                    )}

                                                </select>
                                        </div>

                                        <div className="form-group ">
                                        <label htmlFor="text">Area</label>
                                                <select id='single' className="form-control" value={area_id} name="area_id" required onChange={handleChange('area_id')} >
                                                    <option value="all">Select Area</option>
                                                    {areas.map((person, i) =>
                                                        <option key={i} value={person._id} > {person.area_name}</option>
                                                    )}
                                                </select>

                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="text">Pincode</label>
                                            <input type="text" className="form-control" value={pincode} placeholder="Pincode" id="pincode" name="pincode" onChange={handleChange('pincode')} required />
                                        </div>

                                        {/* <div className="form-group">
                                                <input class="form-check-input ml-1" checked={main_address} value={main_address} type="checkbox" id="main_address" name='main_address' onChange={handleChange('main_address')} /><label className='ml-3'>Main Address</label>
                                        </div> */}
                                        
                                        <div className="form-group">
                                        <label htmlFor="text">Latitude</label>

                                                <input type="text" className="form-control" placeholder="Latitude" value={patient_latitude} id="patient_latitude" name="patient_latitude" onChange={handleChange('patient_latitude')} required />
                                            </div>

                                            <div className="form-group">
                                        <label htmlFor="text">Longitude</label>

                                                <input type="text" className="form-control" placeholder="Longitude  " id="patient_longitude" value={patient_longitude} name="patient_longitude" onChange={handleChange('patient_longitude')} required />
                                            </div>
                                            <label htmlFor="text">Gender</label>

                                        <select id='single' className="form-control" name="patient_gender" value={patient_gender} required onChange={handleChange('patient_gender')} >
                                                    <option value="all">Select Gender</option>
                                                        <option  value="male" > Male</option>
                                                        <option  value="female" > Female</option>
                                                </select>
                                        <br/>
                                        <div className="form-group">
                                            <label htmlFor="text">IC Number</label>

                                            <input type="text" className="form-control" value={ic_number} placeholder="IC Number" id="ic_number" name="ic_number" onChange={handleChange('ic_number')} required />
                                        </div>

                                        <br></br>
                                        <label htmlFor="text">Profile Image</label><br/>
                                                <img src={profile_image} alt="Image not found" height="150px" width="200px"></img>
                                                <br/><br/>
                                        <label htmlFor="text">Update Profile Image</label><br/>
                                        <input type="file" onChange={onFileChange} class="form-control" />
                                                <br></br><br></br>
                                        <button type="submit" className="btn btn-primary" >Submit</button>
                                        {loading ? (<div class="alert alert-success margin-top-10">Updated Successfully</div>) : null}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PatientEdit;