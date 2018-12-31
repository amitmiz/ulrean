import React from 'react';
import { connect } from 'react-redux';
import { teachersSelector } from '../../state/users/reducer';
import TeacherContactList from './TeacherContactList';


const mapStateToProps = state => ({
    teachers: teachersSelector(state)
})



class TeacherContactListContainer extends React.Component {

    render() {
        const { teachers } = this.props;

        return (<TeacherContactList teachers={teachers} />)
    }
}

const connected = connect(mapStateToProps)(TeacherContactListContainer)

export default connected;
