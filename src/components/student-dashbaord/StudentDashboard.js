import { Grid, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { loggedInUserSelector } from '../../state/users/reducer';
import DashboardCard from '../DashboardCard';
import PageTitle from '../PageTitle';
import PathStat from '../PathStat';





const styles = theme => ({
    root: {
        flexGrow: 1,

    }
});


const mapStateToProps = (state) => ({
    currentUser: loggedInUserSelector(state)
})

@connect(mapStateToProps)
class StudentDashbaord extends React.Component {

    render() {
        const { classes, currentUser } = this.props;
        debugger
        return (
            <div className={classes.root} >

                <PageTitle>Dashboard </PageTitle>
                
                <Grid container direction="column" spacing={8} justify={"space-between"}>

                    <Grid item xs={12}>



                        {currentUser.path ?
                            <DashboardCard title="current stats" >
                                <PathStat />
                            </DashboardCard> : "No Path Yet"
                        }



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
