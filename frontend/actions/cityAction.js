import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const city_list = () => {
    return fetch(`${API}/city_list`,{
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

export const add_city = patient => {
    return fetch(`${API}/add_city`, {
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


export const city_list_byid = (country_id) => {
    // alert(guardian_id)
    let data = {
        'ct_id' :country_id
    };
    return fetch(`${API}/city_list_byid`, {
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


export const edit_city= city_id => {
    return fetch(`${API}/city_update`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(city_id)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const Delete_City = (query) => {
    return fetch(`${API}/city_delete`, {
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



