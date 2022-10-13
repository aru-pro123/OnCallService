import axios from "axios";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import auth from "../../services/authService";
import Swal from "sweetalert2";

class OngoingOrder extends Component {
    state = {
        user: {},
        status: [
            { _id: 1, value: "pending", name: "Pending" },
            { _id: 2, value: "ongoing", name: "Ongoing" },
            { _id: 3, value: "hold", name: "Hold" },
            { _id: 4, value: "completed", name: "Completed" }],
        orders: [],
        provider: [],
        errors: {},
    }

    getProvider(user) {
        axios.get(`http://localhost:5000/api/provider/${user._id}/${user.email}`)
            .then(res => {
                const provider = res.data;
                this.setState({ provider })
                this.getOrders(res.data[0]);
            }).catch(err => {
                this.setState({ errors: err.response.data.message });
            })
    }

    getOrders(provider) {
        axios.get(`http://localhost:5000/api/orders/${provider._id}/${provider.email}`)
            .then(res => {
                const orders = res.data;
                this.setState({ orders, data: res.data });
                console.log(res.data);
            }).catch(err => { });
    }

    handleChange = (orderId, event) => {
        for (let key in this.state.orders) {
            if (this.state.orders[key]._id == orderId) {
                const { detail, cycle, duration, location, payment, service, provider, customer } = this.state.orders[key];
                axios.put(`http://localhost:5000/api/orders/${orderId}`, {
                    detail, cycle, duration, payment, location, provider, service, customer,
                    status: event.target.value
                }).then(res => {
                    let orders = [...this.state.orders];
                    let order = { ...orders[key] };
                    order.status = event.target.value;
                    orders[key] = order;
                    this.setState({ orders });

                    Swal.mixin({
                        toast: true,
                        icon: 'success',
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 6000
                    }).fire({
                        title: "Status Succefully Updated",
                        type: 'success'
                    })
                }).catch(err => { });
            }
        }
    }

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({ user });
        this.getProvider(user);
    }

    render() {
        const { length: count } = this.state.orders;
        return (
            <Container maxWidth="md">
                <div className='row'>
                    <div className="col-md-10 mt-5">
                        <div className="d-flex justify-content-center">
                            <h3 className="mt-4">Ongoing Services</h3>
                        </div>
                        {this.state.orders.map(order =>
                            <div key={order._id} className="card mt-4">
                                <div className="card-header">
                                    <h5>{order.service.name}</h5>
                                </div>
                                <div className="card-body">
                                    <p> <strong>Provider :</strong> {order.provider.email}</p>
                                    <p> <strong>Location :</strong> {order.location}</p>
                                    <p> <strong>Customer :</strong> {order.customer.email}</p>
                                    <p> <strong>Description :</strong> {order.detail}</p>
                                    <p> <strong>Service Started :</strong> {order.startedDate}</p>
                                    <p> <strong>Payment :</strong> {order.payment}</p>
                                    <p> <strong>Status :</strong> {order.status}</p>
                                    <form>
                                        <label htmlFor="status"><strong>Change Current Status</strong></label>
                                        <select name="status" id="status" className="form-control" onChange={(e) => { this.handleChange(order._id, e) }}>
                                            {this.state.status.map(state =>
                                                <option key={state._id} value={state.value}>{state.name}</option>)}
                                        </select>
                                    </form>
                                </div>
                            </div>)}
                    </div>
                </div>
            </Container>
        );
    }
}

export default OngoingOrder;