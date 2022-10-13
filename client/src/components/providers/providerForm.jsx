import axios from 'axios';
import React, { Component } from 'react';
import auth from "../../services/authService";
import Swal from "sweetalert2";
import Joi from "joi-browser";
import Form from '../common/form';
import { location } from "../../data/location";

class ProviderForm extends Form {
    state = {
        user: {},
        errors: {},
        data: { name: "", company: "", website: "", address1: "", city: "", zip: "", phone: "", email: "" },
        city: location(),
    }

    schema = {
        name: Joi.string()
            .required()
            .label("provider name"),
        company: Joi.string()
            .required()
            .label("company"),
        website: Joi.string()
            .label("website"),
        address1: Joi.string()
            .required()
            .label("address1"),
        city: Joi.string()
            .required()
            .label("city"),
        zip: Joi.string()
            .required()
            .label("Zip"),
        phone: Joi.required()
            .label("Phone"),
        email: Joi.required()
            .label("Email")
    };

    getProvider(user) {
        try {
            const providerId = this.props.match.params.id;
            if (providerId === "new") return;

            axios.get(`http://localhost:5000/api/provider/${user._id}/${user.email}`)
                .then(res => {
                    console.log(res.data);
                    this.setState({ data: this.mapToViewModel(res.data[0]) });
                })
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    componentDidMount = () => {
        const user = auth.getCurrentUser();
        this.setState({ user });

        this.getProvider(user);
    }

    mapToViewModel(provider) {
        return {
            name: provider.name,
            company: provider.company,
            website: provider.website,
            address1: provider.address1,
            city: provider.city,
            zip: provider.zip,
            phone: provider.phone,
            email: provider.email,
        };
    }

    doSubmit = async () => {
        const { name, company, website, address1, city, zip, phone, email } = this.state.data;

        if (this.props.match.params.id == "new") { // create new provider
            axios.post(`http://localhost:5000/api/provider`, {
                name, company, website, address1, city, zip, phone, email,
                userId: {
                    _id: this.state.user._id,
                    email: this.state.user.email,
                }
            }).then(res => {
                this.props.history.push("/profile"); // after submit redirect to profile
            }).catch(err => {
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
            })
        }
        else {
            axios.put(`http://localhost:5000/api/provider/${this.props.match.params.id}`, { // update provider
                name, company, website, address1, city, zip, phone, email,
                userId: {
                    _id: this.state.user._id,
                    email: this.state.user.email,
                }
            }).then(res => { this.props.history.push("/profile"); })
        }

    };
    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="card mt-5 col-md-6">
                    <div className="card-header">
                        <h4>Provider Detail</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            {this.renderInput("name", "Provider Name")}
                            {this.renderInput("company", "Company Name")}
                            {this.renderInput("website", "Provider Website")}
                            {this.renderInput("email", "Provider Email")}
                            {this.renderInput("phone", "Provider Phone")}
                            {this.renderInput("address1", "Address 1")}
                            {this.renderSelect("city", "City", this.state.city)}
                            {this.renderInput("zip", "Postal Code")}

                            {this.renderButton("Save Changes")}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProviderForm;