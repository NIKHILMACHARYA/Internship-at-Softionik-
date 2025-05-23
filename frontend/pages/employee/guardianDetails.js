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
import { DeletePatientDetail, PatientDetailList,guardian_list_by_patient } from '../../actions/patientDetailsAction';

const cookies = new Cookies();

const GuardianDetailsView = () => {
    const token = cookies.get('admin_token');
    const router = useRouter();
    const [values,setValues] = useState({
        guardian_detail : []
    });

    const {guardian_detail} = values;

    useEffect(() =>{
        loadguardianlist();
    },[]);

    const loadguardianlist = () => {
        // alert(router.query._id)
        guardian_list_by_patient(router.query._id).then(guardiandata =>{
            // alert(JSON.stringify(guardiandata))
            if(guardiandata.error)
            {
                console.log(guardiandata.error);
            }
            else{
                setValues({...values,guardian_detail:guardiandata.guardian_list});
            }
        })

        
    }

    const view_guardian = (cell,row) =>{
        const handleclick = e =>{
            Router.push({
                pathname:'/patient/guardianProfile',
                query: {
                    _id: row._id,

                }
            })
        }
        return(
            <span>
                <button type='submit' class="btn btn-icon waves-effect waves-light btn-success" onClick={handleclick}><i class="fe-eye"></i></button>
            </span>
        )
    }


    return(
        <div id='wrapper'>
            <Head>
                <title>Guardian List</title>
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
                                    <h4 className="page-title float-left">Guardian List</h4>
                                    <ol className="breadcrumb float-right" style={{ marginRight: "300px" }}>
                                        <li className="breadcrumb-item"> <Link href='/dashboard'><a>Dashboard</a></Link></li>
                                        <li className="breadcrumb-item active">Guardian List</li>
                                    </ol>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                        <br></br><br></br><br></br><br></br>
                        <div className="col-md-12">
                            <div className="card-box">
                                <div style={{ width: '98%' }}>
                                    <BootstrapTable data={guardian_detail} pagination search dataSort striped hover>
                                        <TableHeaderColumn width='100px' dataField='sno' dataAlign="center" dataSort isKey>S.No</TableHeaderColumn>
                                        <TableHeaderColumn width='150px' dataField='guardian_first_name' dataAlign="center" editable={false} dataSort>First Name</TableHeaderColumn>
                                        <TableHeaderColumn width='150px' dataField='guardian_last_name' dataAlign="center" editable={false} dataSort>Last Name</TableHeaderColumn>
                                        <TableHeaderColumn width='150px' dataField='guardian_phone_number' dataAlign="center" editable={false} dataSort>Phone</TableHeaderColumn>
                                        <TableHeaderColumn width='150px' dataField='guardian_email' dataAlign="center" editable={false} dataSort>Email</TableHeaderColumn>
                                        <TableHeaderColumn width='150px' dataField='_id' dataFormat={view_guardian} dataAlign="center" editable={false} dataSort>View</TableHeaderColumn>
                                    </BootstrapTable>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )

}

export default GuardianDetailsView;
