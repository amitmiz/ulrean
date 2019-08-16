import { Card, Table, TableBody, TableCell, TableHead, TableRow, withStyles } from "@material-ui/core";
import PropTypes from 'prop-types';
import React from "react";
import PageTitle from '../PageTitle';




const styles = {
    root: {
        flex: 1
    },
    header: {
        marginBottom: '20px',
        textAlign: 'center'
    }
};


class StudentsList extends React.Component {

    render() {

        const { classes, users, usersData, courses } = this.props;


        return (
            <div className={classes.root} >
                <PageTitle >Students</PageTitle>
                <Card>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Current Position</TableCell>
                                <TableCell>Finished Path</TableCell>
                                <TableCell>Passed Path Due date</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map(user => {
                                let dueDate = usersData.passedDueDate.find(currUser => currUser._id == user._id);
                                let path = usersData.finishedPath.find(currUser => currUser._id == user._id);
                                let unfinishedPath = usersData.unfinishedPath.find(x => x.user._id === user._id);
                                let currentCourse = unfinishedPath ? courses.find(course => course._id === unfinishedPath.unfinshedCourses[0].course) : null;



                                return (
                                    <TableRow key={user._id}>
                                        <TableCell > {user.name}  <strong>{user.lastname}</strong></TableCell>
                                        <TableCell >{user.email}</TableCell>
                                        <TableCell >{currentCourse ? currentCourse.header : ""}</TableCell>
                                        <TableCell >{path ? <strong>Yes()</strong> : "No"}</TableCell>
                                        <TableCell >{
                                            dueDate ? <strong>Yes ({dueDate.passedDueDate.course.header} | {new Date(dueDate.passedDueDate.dueDate).toLocaleDateString()})</strong> : "No"}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Card>
            </div>)
    }

}

const styled = withStyles(styles)(StudentsList)
styled.displayName = "StudentsList"
styled.propTypes = {
    users: PropTypes.arrayOf(PropTypes.obj).isRequired
}

export default styled;

