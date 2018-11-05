import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Grid, Card, CardHeader, Typography, CardContent, Divider } from '@material-ui/core';
import { ApiClient } from '../api-client';




const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});


class TeacherDashbaord extends React.Component {

    constructor(props) {
        super(props)






    }





    render() {
        const { classes, theme } = this.props;
        return (
            <div className={classes.root} >
                <Grid container>

                    <Grid item xs={1}>
                        <Card>
                            <CardHeader title="students waiting for path" />
                            <Divider />

                            <CardContent>
                                <Typography variant="h3">{ApiClient.getPathlessStudents().length}</Typography>
                            </CardContent>

                        </Card>


                    </Grid>
                    <Grid item xs={6}></Grid>


                </Grid>
            </div>

        );
    }
}

TeacherDashbaord.propTypes = {
    classes: PropTypes.object.isRequired,
};

const wrapped = withStyles(styles, { withTheme: true })(TeacherDashbaord);
export { wrapped as TeacherDashbaord }