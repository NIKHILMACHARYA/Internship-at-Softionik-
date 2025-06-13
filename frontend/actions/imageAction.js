import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const image_list = () => {
    return fetch(`${API}/list_image`,{
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

export const add_image = patient => {
    return fetch(`${API}/add_image`, {
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


export const image_list_byid = (image_id) => {
    // alert(guardian_id)
    let data = {
        'img_id' :image_id
    };
    return fetch(`${API}/image_list_byid`, {
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


export const edit_image= city_id => {
    return fetch(`${API}/edit_image`, {
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


export const DeleteImg = (query) => {
    return fetch(`${API}/image_delete`, {
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



