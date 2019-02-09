import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import PageTitle from '../PageTitle';


const styles = {
    root: {
        flex: 1
    }
}

class TeacherContactList extends React.Component {




    render() {

        const { classes, teachers } = this.props
        return (
            <div className={classes.root}>
                <PageTitle>Teachers </PageTitle>

                <Paper >
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teachers.map(teacher => {
                                return (
                                    <TableRow key={teacher._id}>
                                        <TableCell >{teacher.name}</TableCell>
                                        <TableCell >{teacher.email}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

const Wrapped = withStyles(styles)(TeacherContactList)
Wrapped.displayName = "TeacherContactList"
export default Wrapped;