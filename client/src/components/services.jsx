import axios from "axios";
import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import auth from "../services/authService";
import Container from '@material-ui/core/Container';

class Service extends Component {
    state = {
        services: [],
        errors: {}
    };

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ user });

        axios.get('http://localhost:5000/api/services')
            .then(res => {
                console.log(res);
                const services = res.data;
                this.setState({ services });
            }).catch(err => {

            })
    }


    render() {
        const { user } = this.state;

        return (
            <Container maxWidth="md">
                <div className='row'>
                    <div className="col-md-12 mt-1">
                        <div className="d-flex justify-content-center">
                            <p className="text-right h3 mt-5">Available Services</p>
                        </div>
                        {this.state.services.map(service =>
                            <div className="card m-5">
                                <div className="card-header h5 text-success">
                                    {service.service}
                                </div>
                                <div className="card-body">
                                    <p> <strong>Provider :</strong> {service.provider.name}</p>
                                    <p> <strong>Location :</strong> {service.location}</p>
                                    <p> <strong>Phone :</strong> {service.phone}</p>
                                    <p> <strong>Description :</strong> {service.description}</p>
                                    <p> <strong>Status :</strong> {service.status}</p>

                                    <div className="d-flex justify-content-end">
                                        {!user && (
                                            <a href="/login" className="btn btn-primary">Request</a>
                                        )}
                                        {user && (
                                            <a href="/order" className="btn btn-primary">Request</a>
                                        )}

                                        {/* <button className="btn text-danger">DELETE</button> */}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        );
    }
}

export default Service;