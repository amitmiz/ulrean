import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Grid, Card, CardHeader, Typography, CardContent, Divider } from '@material-ui/core';
import { ApiClient } from '../api-client';




const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    dashboardCard: {
        textAlign: 'center'
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

                    <Grid item lg={2} xs={12}>

                        <this.DashboardCard title="students waiting for path" >
                            <Typography variant="h3">{ApiClient.getPathlessStudents().length}</Typography>
                        </this.DashboardCard>


                    </Grid>
                    <Grid item xs={6}></Grid>


                </Grid>
            </div>

        );
    }

    DashboardCard = (props) => {
        const { classes, theme } = this.props;
        return (
            <div className={classes.dashboardCard}>
                <Card >
                    <CardHeader title={props.title}  titleTypographyProps={{variant : "button"}}/>
                    <Divider />

                    <CardContent>
                        {props.children}
                    </CardContent>

                </Card>
            </div>

        )
    }
}

TeacherDashbaord.propTypes = {
    classes: PropTypes.object.isRequired,
};

const wrapped = withStyles(styles, { withTheme: true })(TeacherDashbaord);
export { wrapped as TeacherDashbaord }