import Link from 'next/link';
import { useState } from 'react';
import React,{Fragment} from 'react';
import axios from 'axios';
 import { login ,authenticate } from '../actions/adminAction';
import Topbar from './topbar';

import Head from 'next/head';
import Cookies from 'universal-cookie';
import Image from 'next/image';
import Router from 'next/router';
const cookies = new Cookies();




const AdminSignin = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { user_name, password, error, loading, message, showForm } = values;

    const handleSubmit = e => {
        e.preventDefault();
        
        setValues({ ...values, loading: false, error: false });
        const admin = { user_name, password };

        login(admin).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                // alert(JSON.stringify(data.message))
                if(data.message=="Login successful")
                {
                    // alert(data.data._id)
                    localStorage.setItem('admin_id', data.data._id);
                    Router.push(`/dashboard`);
                }else
                {
                    alert("Invalid user name or password !");
                }
                // localStorage.setItem('id', data.admin_id);
                // console.log("admin image", data.admin_image);
                // localStorage.setItem('admin_image', data.admin_image);

                // if(process.browser)
                // {
                //     cookies.set("admin_image",data.admin_image);
                // }
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
                // authenticate(data,() => {
                //     Router.push(`/dashboard`);
                // });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signupForm = () => {
        return (
            <div id="wrapper" style={{   width:"150vw",height:"150vh", backgroundSize:"cover",backgroundRepeat:"no-repeat" }}>

            <Head>
            <title>Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content='Login' />
        <meta property="og:image" content="/icons/sm_m2b.png" />
        <meta itemProp="image" content="/icons/sm_m2b.png"></meta>
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
            </Head>
            {/* <Topbar /> */}

            <div className='mr-5'>
            <div className="pt-4 mt-10">
            <div className="container">
            <div className="row justify-content-start mr-5">
            <div className="col-xl-6">

            <div className="card mr-5">

            <div className="card-body">
            <div className="text-center m-auto ">
                            {/* <Link href="/">
                            <span><Image src="/icons/app_logo.jpeg" width="150" height="150" alt=""/></span>
                                </Link> */}
                                {/* <h5 class="text-uppercase text-center font-bold mt-2"><b> User Login</b></h5> */}

                            </div>
                                <div className="login-wrapper">
                                  <div className="login-card">
                                   <h2 className="login-title">Admin Login</h2>
                        
                                    <form onSubmit={handleSubmit} >

                                        <div className="form-group mb-3 mt-3">
                                                <label htmlFor="text">User name</label>
                                                <input className="form-control" type="text" id="user_name" placeholder="Enter your username" onChange={handleChange('user_name')} />
                                        </div>


                                        <div className="form-group mb-3">
                                        {/* <a href="/#/App/forgotpassword" class="text-muted float-right"><small>Forgot your password?</small></a> */}
                                                <label htmlFor="password">Password</label>
                                                <input className="form-control" type="password" required="" id="password" placeholder="Enter your password" onChange={handleChange('password')} />
                                        </div>

                                       

                                        <div className="form-group row text-center mt-10">
                                            <div className="col-6 text-center m-auto mt-10">
                                                <button className="btn btn-block btn-primary waves-effect waves-light"  type="submit">Sign In</button>
                                            </div>

                                        </div>
                                        {loading ? (<div class="alert alert-success margin-top-10">Login Successfully</div>) : null}

                                    </form>

                                   {error && <div className="login-alert alert alert-danger">{error}</div>}
                                   {message && <div className="login-alert alert alert-info">{message}</div>}
                                   {loading && <div className="login-alert alert alert-warning">Loading...</div>}
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

    return <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {signupForm()}
        </React.Fragment>
    };

export default AdminSignin;
