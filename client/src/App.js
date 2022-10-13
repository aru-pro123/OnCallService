import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Service from "./components/services";
import MyServices from "./components/providers/myServices";
import providers from "./components/providers";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import Dashboard from "./components/dashboard/navMenu";
import NotFound from "./components/common/notFound";
import ServiceForm from "./components/serviceForm";
import Profile from "./components/providers/profile";
import auth from "./services/authService";
import providerForm from "./components/providers/providerForm";
import OngoingOrder from "./components/providers/ongoingOrders";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};


  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    console.log(user);
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        {/* <ToastContainer /> */}
        <Dashboard user={user} />
        <main className="container">
          <Switch>
            <Route path="/profile/:id" component={providerForm} />
            <Route path="/my-service" component={MyServices} />
            <Route path="/orders" component={OngoingOrder} />
            <Route path="/profile" render={props => <Profile {...props} user={this.state.user} />} />
            <Route path="/providers" component={providers} />
            <Route path="/services/:id" component={ServiceForm} />
            <Route path="/services" component={Service} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/" component={Service} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
