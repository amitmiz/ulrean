import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
            <Register onSave={register} user={user} />
        );
    }
}





export default RegisterContainer;
