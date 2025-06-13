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
import { add_image } from '../../actions/imageAction';
// import { areaListById, stateList, countryList, stateListById } from '../../actions/locationAction';
import axios from 'axios';
import { API } from '../../config';

const cookies = new Cookies();

const ImageAdd = () => {
    const [values, setValues] = useState({
        image_name:'',
        image_url:'',
        loading:false
    });


    const [msg, setmsg] = useState('');
    const { image_name, image_url,loading} = values;
    const [demoImg, setdemoImg] = useState();

    const onFileChange = (e) => {
        setdemoImg(e.target.files[0]);
    }
    
    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value });
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
       
        formData.append('image_name', image_name);
        formData.append('img', demoImg);

        // alert(FormData);
        axios.post(`${API}/add_image`, formData, {
        }).then(res => {
            //loadDetails();

            if (res.error) {
                setValues({ ...values });
            } else {
                setTimeout(() => {
                    setValues({ ...values, loading: true })
                });
                setTimeout(() => {
                    setValues({ ...values, loading: false })
                    Router.push(`/image/viewImage`);
                }, 1000);

            }
        });
        
        // var image_data={image_name,image_url }

        // add_image(image_data).then(res => {

        //     if (res.error) {
        //         setValues({ ...values });
        //     } else {
        //         setTimeout(() => {
        //             setValues({ ...values, loading: true })
        //         });
        //         setTimeout(() => {
        //             setValues({ ...values, loading: false })
        //             Router.push(`/image/viewImage`);
        //         }, 1000);

        //     }
        // });
    };

     
        

    
    return (
        <div id="wrapper">
            <Head>
                <title>Image Add</title>
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
                                    <h4 className="page-title float-left">Image Add</h4>
                                    <ol className="breadcrumb float-right" style={{ marginRight: "300px" }}>
                                        <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                                        <li className="breadcrumb-item active">Image Add</li>
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
                                        <label>Add Image</label>
                                    </div>
                                    <form role="form" onSubmit={handleSubmit} >
                                        <div className="form-group">
                                            <label htmlFor="text">Image Name</label>

                                            <input type="text" className="form-control" placeholder="Image Name" id="image_name" name="image_name" onChange={handleChange('image_name')} required />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="text">Choose File</label>
                                            <input type="file" onChange={onFileChange} accept="image/jpeg, image/png" class="form-control" required />
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
export default ImageAdd;