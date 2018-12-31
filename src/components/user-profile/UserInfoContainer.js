import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loggedInUserSelector } from '../../state/users/reducer';
import UserInfo from './UserInfo';


const mapStateToProps = state => ({ currentUser: loggedInUserSelector(state) })


@connect(mapStateToProps)
class UserInfoContainer extends Component {


    render() {

        const { classes, currentUser } = this.props;
        return (
            <UserInfo user={currentUser} />
        );
    }
}





export default UserInfoContainer;
