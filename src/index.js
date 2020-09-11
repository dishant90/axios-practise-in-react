import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json'

let myRequestInterceptor = axios.interceptors.request.use(
    request => {
        console.log(request);
        //Edit Request config
        return request;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

axios.interceptors.request.eject(myRequestInterceptor);

axios.interceptors.response.use(
    response => {
        console.log(response);
        //Edit Response Config
        return response;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)
    

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
