import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loggedInUserSelector } from '../../state/users/reducer';
import UserInfo from './UserInfo';
import { bindActionCreators } from 'redux';
import { updateUserInfo } from '../../state/users/actions'


const mapStateToProps = state => ({ currentUser: loggedInUserSelector(state) })
const mapDispatchToProps = disaptch => bindActionCreators({ updateUserInfo }, disaptch)

@connect(mapStateToProps, mapDispatchToProps)
class UserInfoContainer extends Component {


    render() {

        const { classes, currentUser, updateUserInfo } = this.props;
        return (
            <UserInfo onSave={updateUserInfo} user={currentUser} />
        );
    }
}





export default UserInfoContainer;
