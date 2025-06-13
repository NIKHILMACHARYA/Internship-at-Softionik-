import fetch from 'isomorphic-fetch';
import { API } from '../config';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const admin_list = () => {
    return fetch(`${API}/admin_list`,{
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


export const add_user = emp => {
    return fetch(`${API}/add_user`, {
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

export const login = emp => {
    return fetch(`${API}/login`, {
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

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        // Set token in cookies
        cookies.set('token', data.token, { path: '/' });

        // Store user info (optional)
        localStorage.setItem('admin', JSON.stringify(data));
        next();
    }
};
// export const employeeListById = (employee_id) => {
//     // alert(guardian_id)
//     let data = {
//         'empid' :employee_id
//     };
//     return fetch(`${API}/employee_list_byid`, {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//         .then(response => {
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };
