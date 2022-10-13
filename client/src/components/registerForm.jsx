import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { firstname: "", lastname: "", username: "", email: "", phonenumber: "", password: "", isProvider: "" },
    option: [{ _id: '1', value: 'true', name: 'Service Provider' }, { _id: '2', value: 'false', name: 'Customer' }],
    errors: {}
  };

  schema = {
    firstname: Joi.string()
      .required()
      .label("First Name"),
    lastname: Joi.string()
      .required()
      .label("Last Name"),
    username: Joi.string()
      .required()
      .label("Username"),
    phonenumber: Joi.string()
      .required()
      .label("Phone number"),
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    isProvider: Joi.required()
      .label('User Type')
  };

  doSubmit = async () => {
    console.log(this.state.data);
    try {
      const response = await userService.register(this.state.data);

      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/login";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <div className="card mt-5 col-md-6">
          <div className="card-header">
            <h1>Register</h1>
          </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <input type="text" value="" name="" placeholder="" />
              {this.renderInput("firstname", "First Name", "checkbox")}
              {this.renderInput("lastname", "Last Name")}
              {this.renderInput("username", "Username")}
              {this.renderInput("phonenumber", "Phone Number")}
              {this.renderInput("email", "Email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderSelect("isProvider", "User Type", this.state.option)}
              {this.renderButton("Register")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
