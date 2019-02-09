import React from 'react';
import { connect } from 'react-redux';
import { teachersSelector } from '../../state/users/reducer';
import TeacherContactList from './TeacherContactList';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../../state/users/actions';


const mapStateToProps = state => ({
    teachers: teachersSelector(state)
});

const mapDispatchToProps = dispath => bindActionCreators({ fetchUsers }, dispath);

@connect(mapStateToProps, mapDispatchToProps)
class TeacherContactListContainer extends React.Component {


    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const { teachers } = this.props;


        return (<TeacherContactList teachers={teachers} />)
    }
}


export default TeacherContactListContainer

