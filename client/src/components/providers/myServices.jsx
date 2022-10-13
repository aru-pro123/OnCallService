import axios from "axios";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import auth from "../../services/authService";
import Swal from "sweetalert2";

class MyServices extends Component {
    state = {
        services: [],
    }

    handleDelete = service => {
        console.log(service);
        const originalService = this.state.services;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const services = originalService.filter(m => m._id !== service._id);
                this.setState({ services });
                axios.delete(`http://localhost:5000/api/services/${service._id}`)
                    .then(res => {
                        Swal.mixin({
                            toast: true,
                            icon: "success",
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 6000
                        }).fire({
                            title: "Service deleted successfully!",
                            type: 'success'
                        })
                    }).catch(err => {
                        this.setState({ services: originalService });
                        console.log(err.response);
                        Swal.mixin({
                            toast: true,
                            icon: 'error',
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 6000
                        }).fire({
                            title: err.response.data.message,
                            type: 'error'
                        })
                    });
            }
        })

    }

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ user });

        axios.get(`http://localhost:5000/api/services/${user._id}/${user.email}`)
            .then(res => {
                const services = res.data;
                this.setState({ services });
            }).catch(err => { });
    }

    render() {
        const { length: count } = this.state.services;
        const style = {
            card: {
                border: '0px',
                borderRadius: ' 0.3rem',
                width: '100%',
            }
        }
        return (
            <div className='container row mb-4 d-flex justify-content-center'>
                <div className="col-md-8 mt-5">
                    <div className="d-flex justify-content-center">
                        <h3 className="mt-4">Providing Services</h3>
                    </div>
                    <a href="services/new" className="btn btn-primary mt-5" style={{ marginBottom: 20 }}>
                        New Service
                        </a>
                    {count === 0 && (<h4>There is no services. Please add new service</h4>)}
                    {this.state.services.map(service =>
                        <div key={service._id} className="card mt-4">
                            <div className="card-header">
                                <h5>{service.service}</h5>
                            </div>
                            <div className="card-body">
                                <p> <strong>Provider :</strong> {service.provider.name}</p>
                                <p> <strong>Location :</strong> {service.location}</p>
                                <p> <strong>Phone :</strong> {service.phone}</p>
                                <p> <strong>Description :</strong> {service.description}</p>
                                <p> <strong>Status :</strong> <strong className={service.status == "Active" ? 'badge badge-success' : 'badge badge-warning'}>{service.status}</strong> </p>

                                <div className="d-flex justify-content-end">
                                    <Link to={`/services/${service._id}`} className="btn btn-primary">Edit</Link>
                                    <button className="ml-3 btn btn-danger" onClick={() => this.handleDelete(service)}>Delete</button>
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>
        );
    }
}

export default MyServices;