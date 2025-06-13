import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const state_list = () => {
    return fetch(`${API}/state_list`,{
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

export const add_state = patient => {
    return fetch(`${API}/add_state`, {
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


export const state_list_byid = (state_id) => {
    // alert(guardian_id)
    let data = {
        'st_id' :state_id
    };
    return fetch(`${API}/state_list_byid`, {
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


export const state_list_by_country_id = (country_id) => {
    const data = {
        country_id: country_id
    };

    return fetch(`${API}/state_list_by_country_id`, {
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

export const edit_state = std_id => {
    return fetch(`${API}/state_update`, {
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

export const Delete_State = (query) => {
    return fetch(`${API}/state_delete`, {
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

