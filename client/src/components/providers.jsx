import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import axios from "axios";


class Provider extends Component {

    state = {
        providers: [],
        errors: {}
    };

    componentDidMount() {
        // get all available providers
        axios.get('http://localhost:5000/api/provider')
            .then(res => {
                const providers = res.data;
                this.setState({ providers }); // update the state
            })
    }

    render() {
        return (
            <Container maxWidth="md">
                <div className='row'>
                    <p className="h3 mt-4">Providers</p>
                    <div className="col-md-12 mt-2">
                        {this.state.providers.map(provider =>
                            <div className="card m-5">
                                <div className="card-header h5 text-success">
                                    {provider.name}
                                </div>
                                <div className="card-body">
                                    <p> <strong>Name :</strong> {provider.company}</p>
                                    <p> <strong>Location :</strong> {provider.city}</p>
                                    <p> <strong>Phone :</strong> {provider.phone}</p>
                                    <p> <strong>Email :</strong> {provider.email}</p>
                                    <p> <strong>Website :</strong> {provider.website}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        );
    }
}

export default Provider;