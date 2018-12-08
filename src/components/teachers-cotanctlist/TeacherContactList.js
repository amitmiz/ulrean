import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, withStyles } from '@material-ui/core';
import React from 'react';


const styles = {
    root: {
        flex: 1
    }
}

class TeacherContactList extends React.Component {

    constructor(props) {
        super(props)
    }



    render() {

        const { classes ,teachers} = this.props
        return (
            <div className={classes.root}>



                <div>
                    <Typography variant="h4">
                        Teachers Contact List
                    </Typography>
                </div>

                <Paper >
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell >Actions</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teachers.map(teacher => {
                                return (
                                    <TableRow key={teacher._id}>
                                        <TableCell >{teacher.name}</TableCell>
                                        <TableCell >{teacher.phone}</TableCell>
                                        <TableCell >call</TableCell>
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