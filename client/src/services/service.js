import axios from "axios";
import http from "./httpService";

const baseUrl = "http://localhost:5000/api/services";

export function getServices() {
    let services = {};
    axios.get(baseUrl)
        .then(res => {
            services = { res: res };
        })
    console.log(services);
    return services;
}

export function saveService(service) {
    axios.post(`${baseUrl}/services`, {
        //TODO:: pass the data => eg: service.service, service.location ...
    }).then(res => {
        console.log(res.data);
        return res.data;
    }).catch(err => {
        console.log(err);
    })
}

export function deleteService(service) {
    axios.post(`${baseUrl}/services`, {
        _id: service._id
    }).then(res => {
        console.log(res.data);
        return res.data;
    }).catch(err => {
        console.log(err);
    })
}

export function getOneService(service) {
    axios.get(`${baseUrl}/services`, {
        _id: service._id
    }).then(res => {
        console.log(res.data);
        return res.data;
    }).catch(err => {
        console.log(err);
    })
}
export function updateService(service) {
    axios.post(`${baseUrl}/services`, {
        //TODO:: define the data in params
    }).then(res => {
        console.log(res.data);
        return res.data;
    }).catch(err => {
        console.log(err);
    })
}