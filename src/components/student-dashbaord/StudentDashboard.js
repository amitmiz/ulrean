import { Grid, Typography, withStyles, Card, CardHeader, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { unhandledSubmissionsSelector } from '../../state/projects-submissions/reducer';
import { pathlessUsersSelector } from '../../state/users/reducer';
import DashboardCard from '../DashboardCard';
import PathStat from '../PathStat';
import PageTitle from '../PageTitle';





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
class StudentDashbaord extends React.Component {

    render() {
        const { classes, pathless, submissions } = this.props;
        return (
            <div className={classes.root} >

                <PageTitle>Dashboard</PageTitle>
                <Grid container direction="column" spacing={8} justify={"space-between"}>

                    <Grid item xs={12}>


                        <DashboardCard title="current stats" >
                            <PathStat />
                        </DashboardCard>


                    </Grid>








                </Grid>
            </div>

        );
    }

}

StudentDashbaord.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(StudentDashbaord);
