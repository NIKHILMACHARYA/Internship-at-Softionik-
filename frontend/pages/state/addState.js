import Link from 'next/link';
import React, { Fragment } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Sidebar from '../sidebar';
import Topbar from '../topbar';
// import { AddCaretaker, CaretakerList, EditCaretaker, DeleteCaretaker } from '../../actions/caretakerAction';
// import { UserList } from '../../actions/userAction';
import { add_state } from '../../actions/stateAction';
import { state_list } from '../../actions/stateAction';

// import { areaListById, stateList, countryList, stateListById } from '../../actions/locationAction';
import axios from 'axios';
import { API } from '../../config';
import { country_list } from '../../actions/countryAction';


const cookies = new Cookies();

const StateAdd = () => {
    const [values, setValues] = useState({
        state_name:'',
        country_id:'',
        loading:false
       
    });
    
    const [countries,setCountries]=useState([]);
    const [msg, setmsg] = useState('');
    const {state_name,country_id,loading} = values;

    useEffect (() =>{
        country_list().then (data =>{
            if(data.error){
                console.log(data.error);
            }else{
                setCountries(data.country_list);
            }
        });
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        var state_data={state_name,country_id}
        add_state(state_data).then(res => {

            if (res.error) {
                setValues({ ...values });
            } else {
                setTimeout(() => {
                    setValues({ ...values, loading: true })
                });
                setTimeout(() => {
                    setValues({ ...values, loading: false })
                    Router.push(`/state/viewState`);
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
                <title>State Add</title>
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
                                    <h4 className="page-title float-left">State Add</h4>
                                    <ol className="breadcrumb float-right" style={{ marginRight: "300px" }}>
                                        <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                                        <li className="breadcrumb-item active">State Add</li>
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
                                        <label>Add State</label>
                                    </div>
                                    <form role="form" onSubmit={handleSubmit} >
                                        
                                        <div className="form-group">
                                            <label htmlFor="text">State Name</label>
                                            <input type="text" className="form-control" placeholder="State Name" id="" name="state_name" onChange={handleChange('state_name')} required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="text">Country Name</label>
                                            
                                            <select className="form-control" id="country_id" name="country_id" onChange={handleChange('country_id')} required >
                                                <option value="">Select Country</option>
                                                {countries.map((country) =>(
                                                    <option key={country._id} value={country._id}>{country.country_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <br></br><br></br>
                                        <button type="submit" className="btn btn-primary" >Submit</button>
                                        {loading ? (<div class="alert alert-success margin-top-10">Added Successfully</div>) : null}
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
export default StateAdd;