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
import { Delete_country, country_list } from '../../actions/countryAction';

const cookies = new Cookies();

const CountryView = () => {
    const token = cookies.get('admin_token');
    const [values, setValues] = useState({
        countrydetail: []
    });

    const [msg, setmsg] = useState('')
    const { countrydetail} = values;
    useEffect(() => {
        loadCountryDetails();
    }, []);

    const loadCountryDetails = () => {
        country_list().then(data => {
            //    alert(JSON.stringify(data));
            if (data.error) {
                console.log(data.error);
            } else {
                //alert(data.caretakerLists);
                // console.log(data.caretakerDetailLists);
                setValues({ ...values, countrydetail: data.country_list });
            }
        })
    }

    function edit(cell, row) {
        //alert(JSON.stringify(row));
        const handleClick = e => {
            Router.push({
                pathname: '/country/editCountry',
                query: {
                    _id: row._id,

                }
            })
        };
        return (
            <span>
                <button type="submit" class="btn btn-icon waves-effect waves-light btn-info" onClick={handleClick}> <i class="fe-edit"></i> </button>
            </span>
        )
    }

    
    function Deletecountry(cell, row) {
        // let created_by_id = localStorage.getItem('id');
        const handleClick = e => {
            Swal.fire({
                title: 'Are you sure?',
                text: '',
                icon: 'question',
                allowOutsideClick: false,
                confirmButtonText: 'Ok',
                showCancelButton: true,

            }).then((result) => {
                if (result.isConfirmed) {
                    let query = { "cntry_id": row._id}
                    Delete_country(query).then(data => {
                        loadCountryDetails();
                    });
                }
            })
        };

        return (
            <span>
                <button type="submit" class="btn btn-icon waves-effect waves-light btn-danger" onClick={handleClick}> <i class="fa fa-times"></i> </button>
            </span>
        )
    }

    const cellEditProp = {
        mode: 'click',
        afterSaveCell: updateCell

    };
    function updateCell(row, cellName, cellValue, props) {
        console.log("value" + cellValue)
    }

    return (
        <div id="wrapper">
            <Head>
                <title>Country List</title>
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
                                    <h4 className="page-title float-left">Coutry List</h4>
                                    <ol className="breadcrumb float-right" style={{ marginRight: "300px" }}>
                                        <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                                        <li className="breadcrumb-item active">Country List</li>
                                    </ol>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                        <br></br><br></br><br></br>

                        {msg ? (<div class="alert alert-success margin-top-10"> {msg}</div>) : null}
                        <div className=''>
                            <div className='col-md-12'>
                                <div className='card-box'>
                                    <Link href='\country\addCountry'><a><span className="btn waves-effect waves-light " style={{ backgroundColor: "#38AF00" }}><i className="fe-plus"></i> Add Country</span></a></Link>
                                </div>
                            </div>
                            <div className='col-md-9'>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card-box">
                                <div style={{ width: '98%' }}>
                                    <BootstrapTable data={countrydetail} cellEdit={cellEditProp} pagination search dataSort striped hover>
                                        <TableHeaderColumn width='100px' dataField='sno' dataAlign="center" dataSort isKey>S.No</TableHeaderColumn>
                                        <TableHeaderColumn width='150px' dataField='country_name' dataAlign="center" editable={false} dataSort> Country Name</TableHeaderColumn>
                                        
                                        <TableHeaderColumn width='80px' dataField='_id' dataAlign="center" editable={false} dataFormat={edit}>Edit</TableHeaderColumn>
                                        <TableHeaderColumn width='80px' dataField='_id' dataAlign="center" editable={false} dataFormat={Deletecountry}>Delete</TableHeaderColumn> 
                                    </BootstrapTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};
export default CountryView;