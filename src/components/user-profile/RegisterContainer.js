import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ApiClient } from '../../ApiClient';
import history from '../../history';
import { register } from '../../state/users/actions';
import Register from './Register';



const mapStateToProps = state => ({})
const mapDispatchToProps = disaptch => bindActionCreators({ register }, disaptch)

@connect(mapStateToProps, mapDispatchToProps)
class RegisterContainer extends Component {


    render() {

        const { register } = this.props;
        let user = {}

        return (
            <Register onSave={(user) => this.register(user)} user={user} />
        );
    }


    register(user) {
        
        ApiClient.register(user).then(() => {
            alert("Registerd!")
            history.push(`/login`)
        }).catch(e => {
            alert("Error while trying to register, try again")
        })
    }
}





export default RegisterContainer;
