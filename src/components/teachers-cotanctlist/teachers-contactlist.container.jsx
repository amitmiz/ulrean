import React from 'react';
import { connect } from 'react-redux';
import { teachersSelector } from '../../state/users/user.reducer';
import { TeacherContactList } from './teachers-contactlist.component';


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

export { connected as TeacherContactListContainer };
