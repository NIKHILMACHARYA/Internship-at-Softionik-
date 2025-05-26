import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const employee_list = () => {
    return fetch(`${API}/employee_list`,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const add_employee = emp => {
    return fetch(`${API}/add_employee`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emp)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const employeeListById = (employee_id) => {
    // alert(guardian_id)
    let data = {
        'empid' :employee_id
    };
    return fetch(`${API}/employee_list_byid`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const edit_employee = emp => {
    return fetch(`${API}/employee_update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emp)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const DeleteEmp = (query) => {
    return fetch(`${API}/employee_delete`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const patientListByGuardianId = (guardian_id) => {
    // alert(guardian_id)
    let data = {
        'guardian_id' : guardian_id
    };
    return fetch(`${API}/patient_listByGuardianId`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const PatientListById = patient => {
    var data = {"id":patient};
    return fetch(`${API}/patientdetail_list_by_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const EditPatient = (query) => {
    return fetch(`${API}/patientdetail_edit`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const guardian_list_by_patient = patient => {
    var data = {"patient_id":patient};
    return fetch(`${API}/guardian_list_by_patient`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const guardian_list_by_id = guardian => {
    var data = {"guardian_id":guardian};
    return fetch(`${API}/guardian_list_by_id`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
