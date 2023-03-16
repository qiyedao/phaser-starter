import { Toast } from 'antd-mobile';
import Axios from 'axios';
import QueryString from 'qs';
import { BaseUrl } from './constants';

const AxiosRequest = Axios.create({
    baseURL: BaseUrl,
    timeout: 1000,

    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: true, // default
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
    // `paramsSerializer` is an optional function in charge of serializing `params`
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    // paramsSerializer: function (params) {
    //     console.log('params', params);
    //     return QueryString.stringify(params, { arrayFormat: 'repeat' });
    // }
});

AxiosRequest.interceptors.request.use(
    config => {
        console.log('AxiosRequest.interceptors.request', config);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
AxiosRequest.interceptors.response.use(
    response => {
        console.log('AxiosRequest.interceptors.response', response);
        if (response.data.code !== 200) {
            Toast.show(response.data.message);
        }
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);
const AxiosPost = (url: string, data: any, options = {}) => {
    return AxiosRequest.post(url, data, { ...options });
};
const AxiosPostJson = (
    url: string,
    data: any,
    options = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
) => {
    console.log('data', data);
    return AxiosRequest.post(url, data, { ...options });
};
const AxiosPut = (url: string, data: any, options = {}) => {
    return AxiosRequest.post(url, data, { ...options });
};
const AxiosPutJson = (
    url: string,
    data: any,
    options = { headers: { 'Content-Type': 'application/json;charset=UTF-8' } }
) => {
    return AxiosRequest.put(url, data, { ...options });
};
const AxiosGet = (url: string, params: any, options = {}) => {
    console.log(options, 'options');
    return AxiosRequest.get(url, { params, ...options });
};
const AxiosDelete = (url: string, params: any, options = {}) => {
    return AxiosRequest.delete(url, { params, ...options });
};
export { AxiosPost, AxiosPostJson, AxiosPut, AxiosPutJson, AxiosGet, AxiosDelete };
