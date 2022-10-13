import axios from 'axios';
import React, { Component } from 'react';
import auth from "../services/authService";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import Form from './common/form';
import { location } from "../data/location";

class ServiceForm extends Form {

  state = {
    user: {},
    errors: {},
    data: { service: "", location: "", description: "", phone: "", status: "" },
    provider: [],
    status: [{ _id: '1', value: "Active", name: "Active" }, { _id: '2', value: "Inactive", name: "Inactive" }],
    location: location()
  };

  schema = {
    // _id: Joi.string(),
    service: Joi.string()
      .required()
      .label("Service"),
    phone: Joi.number()
      .required()
      .label("Service Phone"),
    location: Joi.string()
      .required()
      .label("Location"),
    description: Joi.string()
      .required()
      .label("Location"),
    status: Joi.required()
      .label("Status")
  };

  populateProvider(user) {
    axios.get(`http://localhost:5000/api/provider/${user._id}/${user.email}`)
      .then(res => {
        const provider = res.data;
        this.setState({ provider })
      }).catch(err => {
        this.setState({ errors: err.response.data.message });
      })
  }

  populateService() {
    try {
      console.log(this.props);
      const serviceId = this.props.match.params.id;
      if (serviceId === "new") return;

      axios.get(`http://localhost:5000/api/services/${serviceId}`)
        .then(res => {
          this.setState({ data: this.mapToViewModel(res.data) });
        })
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  componentDidMount = () => {
    const user = auth.getCurrentUser();
    this.setState({ user });

    this.populateProvider(user);
    this.populateService();
  }

  mapToViewModel(service) {
    return {
      // _id: service._id,
      service: service.service,
      location: service.location,
      phone: service.phone,
      description: service.description,
      status: service.status,
    };
  }

  doSubmit = () => {

    const { service, phone, location, description, status } = this.state.data;

    if (this.props.match.params.id == "new") {
      axios.post(`http://localhost:5000/api/services`, {
        service, phone, location, description, status,
        provider: {
          _id: this.state.provider[0]._id,
          email: this.state.provider[0].email,
          name: this.state.provider[0].name,
          phonenumber: this.state.provider[0].phone,
        },
        user: {
          _id: this.state.user._id,
          email: this.state.user.email,
        }
      }).then(res => {
        this.props.history.push("/my-service");
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
      });
    }
    else {
      axios.put(`http://localhost:5000/api/services/${this.props.match.params.id}`, {
        service, phone, location, description, status,
        provider: {
          _id: this.state.provider[0]._id,
          email: this.state.provider[0].email,
          name: this.state.provider[0].name,
          phone: this.state.provider[0].phone,
        },
        user: {
          _id: this.state.user._id,
          email: this.state.user.email,
        }
      }).then(res => { this.props.history.push("/my-service"); })
    }

  };


  render() {
    return (
      <div className="d-flex justify-content-center mb-4">
        <div className="card mt-5 col-md-6">
          <div className="card-header">
            <h1>Create New Service</h1>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("service", "Service Name")}
              {this.renderSelect("location", "Location", this.state.location)}
              {this.renderInput("phone", "Service Phone")}
              {this.renderInput("description", "Service Description")}
              {this.renderSelect("status", "Service Status", this.state.status)}

              {this.renderButton("Save Changes")}
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default ServiceForm;