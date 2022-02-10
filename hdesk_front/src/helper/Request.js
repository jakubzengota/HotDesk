import React from 'react';
import axios from 'axios';

const request = axios.create({
    // baseUrl: 'http://127.0.0.1:8080/abreg/app/hd',
    validateStatus: false,
});

// export const BASE_URL = 'http://127.0.0.1:8080/abreg/app/hd';
export const BASE_URL = '/abreg/app/hd';


export default request;