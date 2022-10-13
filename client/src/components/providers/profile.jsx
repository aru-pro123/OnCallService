import axios from 'axios';
import React, { Component } from 'react';
import auth from "../../services/authService";
import Container from '@material-ui/core/Container';
import { Link } from '@material-ui/core';

class Profile extends Component {
    state = {
        basicDetails: {},
        provider: {},
    }

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ user });
        axios.get(`http://localhost:5000/api/users/${user._id}`)
            .then(res => {
                const basicDetails = res.data;
                this.setState({ basicDetails });
            }).catch(err => { });

        axios.get(`http://localhost:5000/api/provider/${user._id}/${user.email}`)
            .then(res => {
                const provider = res.data;
                this.setState({ provider });
                console.log(res.data);
            }).catch(err => { });
    }

    render() {
        const { firstname, lastname, username, phonenumber, email } = this.state.basicDetails;
        const { length: count } = this.state.provider;
        return (

            <div className="col-md-12 mb-4">
                <div className=" d-flex justify-content-between">
                    <div className="card mt-5 mr-4 col-md-6">
                        <div className="card-header">
                            <h4>Persional Information</h4>
                        </div>
                        <div className="card-body">
                            <form className="form">
                                <div className="form-group">
                                    <label htmlFor="" className="h6">First Name</label>
                                    <input className="form-control" type="text" name={firstname} value={firstname} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="h6">Last Name</label>
                                    <input className="form-control" type="text" name={lastname} value={lastname} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="h6">Username</label>
                                    <input className="form-control" type="text" name={username} value={username} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="h6">Email</label>
                                    <input className="form-control" type="text" name={email} value={email} disabled />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="" className="h6">Phone Number</label>
                                    <input className="form-control" type="text" name={phonenumber} value={phonenumber} />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-primary">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {count === 0 && (
                        <React.Fragment>
                            <div className="mt-4">
                                <h6 className="text-warning">You haven't create service provider profile.</h6>
                                <a href="profile/new" className="btn btn-primary">Add Provider</a>
                            </div>
                        </React.Fragment>
                    )}
                    {count === 1 && (
                        <div className="card mt-5 col-md-6">
                            <div className="card-header">
                                <h4>Service Provider Information</h4>
                            </div>
                            {this.state.provider.map(provid =>
                                <div key={provid._id} className="card-body row">
                                    <div className="col-md-6">
                                        <p>Provider Name : {provid.name}</p>
                                        <p>Company : {provid.company}</p>
                                        <p>Email : {provid.email}</p>
                                        <p>Phone : {provid.phone}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p>Website : {provid.website}</p>
                                        <p>Address : {provid.address1}</p>
                                        <p>City : {provid.city}</p>
                                        <p>Zip : {provid.zip}</p>
                                        <div className="d-flex justify-content-end">
                                            <a href={`/profile/${provid._id}`} className="btn btn-primary">Edit Info</a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

        );
    }
}

export default Profile;