import React, { Component } from 'react';
import axios from 'axios';

export default class Landing extends Component {
    
    /** Constructor */
    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            type: 'INT',
            value: '',
            result: null,
            errors: {},
            isValid: true
        }

        // bind onChange functions
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    // Sets type on field change
    onChangeType = (event) => {
        this.setState({
            type: event.target.value
        });
    }

    // Sets value on field change
    onChangeValue= (event) => {
        this.setState({
            value: event.target.value
        });
    }

    // Submits form data to backend api
    onSubmit = (event) => {
        event.preventDefault();
        
        // data object
        const data = {
            type: this.state.type,
            value: this.state.value,
            errors: {}
        }

        // submit to backend. Returns result or errors.
        axios.post('http://localhost:5000/api/sort', data)
            .then(res => {
                console.log(res.data);
                // update state
                this.setState({
                    result: res.data.data,
                    errors: {},
                    isValid: true
                })
            })
            .catch(err => {
                console.error(err.response.data);
                // update state
                this.setState({
                    result: null, 
                    errors: err.response.data,
                    isValid: false
                });
            });
    }
    
    // render component
    render() {

        // set errors if necessary. Sets from error arrays.
        let errors = this.state.errors;

        let typeErrors;
        if (errors.type) {
            typeErrors = errors.type.map((i, index) => <p key={index}>{i}</p>);
        }

        let valueErrors;
        if (errors.value) {
            valueErrors = errors.value.map((i, index) => <p key={index}>{i}</p>);
        }


        // Set result when available.
        let result = this.state.result;
        let list;

        if (result) {
            list = result.map((i, index) => <li key={index}>{i}</li>); // map to list for rendering
        }

        // return html
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Type: </label>
                        <select required className={`form-control ${typeErrors ? "is-invalid": ""}`} 
                                value={this.state.type} onChange={this.onChangeType}>
                            <option value="INT">Integer</option>
                            <option value="STR">String</option>
                        </select>
                    </div>

                    <div className="form-group"> 
                        <label>Values: </label>
                        <input type="text" required className={`form-control ${valueErrors ? "is-invalid": ""}`}
                                value={this.state.value} onChange={this.onChangeValue} />
                        <small className="form-text text-muted">Your values should be separated by a comma.</small>
                        <div className="invalid-feedback">{valueErrors}</div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
                    <div className="container">
                        <ul>{list}</ul>
                    </div>
            </div>   
        );
    }
}
