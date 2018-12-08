import { Grid, Typography, withStyles, Card, CardHeader, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { unhandledSubmissionsSelector } from '../../state/projects-submissions/reducer';
import { pathlessUsersSelector } from '../../state/users/user.reducer';
import DashboardCard from './DashboardCard';




const styles = theme => ({
    root: {
        flexGrow: 1,

    }
});


const mapStateToProps = (state) => ({
    pathless: pathlessUsersSelector(state),
    submissions: unhandledSubmissionsSelector
})

@connect(mapStateToProps)
class TeacherDashbaord extends React.Component {

    render() {
        const { classes, pathless, submissions } = this.props;
        return (
            <div className={classes.root} >
                <Grid container direction="column" spacing={8} justify={"space-between"}>

                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="info" />
                            <CardContent></CardContent>

                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader title="stats" />
                            <CardContent></CardContent>

                        </Card>

                    </Grid>


                    <Grid item xs={12} >
                        <Grid container direction="row" spacing={8}>
                            <Grid item lg={6} xs={12}>


                                <DashboardCard title="students waiting for path" >
                                    <Typography variant="h3">{pathless.length}</Typography>
                                </DashboardCard>

                            </Grid>

                            <Grid item lg={6} xs={12}>

                                <DashboardCard title="submissions waiting for input" >
                                    <Typography variant="h3">{submissions.length}</Typography>
                                </DashboardCard>


                            </Grid>
                        </Grid>


                    </Grid>

                    <Grid item xs={12} >
                        <Grid container direction="row" spacing={8}>
                            <Grid item lg={6} xs={12}>


                                <DashboardCard title="students passed project due date" >
                                    <Typography variant="h3">{pathless.length}</Typography>
                                </DashboardCard>

                            </Grid>


                        </Grid>


                    </Grid>







                </Grid>
            </div>

        );
    }

}

TeacherDashbaord.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TeacherDashbaord);
