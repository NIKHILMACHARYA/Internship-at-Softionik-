import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const country_list = () => {
    return fetch(`${API}/country_list`,{
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

export const add_country = patient => {
    return fetch(`${API}/add_country`, {
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


export const country_list_byid = (country_id) => {
    // alert(guardian_id)
    let data = {
        'cntry_id' :country_id
    };
    return fetch(`${API}/country_list_byid`, {
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


export const edit_country= cntry_id => {
    return fetch(`${API}/country_update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cntry_id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const Delete_country = (query) => {
    return fetch(`${API}/country_delete`, {
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



