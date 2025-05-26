import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const student_list = () => {
    return fetch(`${API}/list-students`,{
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

export const add_student = patient => {
    return fetch(`${API}/add-student`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const student_list_byid = (student_id) => {
    // alert(guardian_id)
    let data = {
        'std_id' :student_id
    };
    return fetch(`${API}/student_list_byid`, {
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


export const edit_student = std_id => {
    return fetch(`${API}/student_update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(std_id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const DeleteStd = (query) => {
    return fetch(`${API}/student_delete`, {
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
