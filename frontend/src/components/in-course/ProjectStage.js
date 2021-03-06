import { Card, CardContent, CardHeader, Grid, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import StageInstructions from './components/StageInstructions';
import SubmissionCard from '../SubmissionCard';
import SubmissionForm from './components/SubmissionForm';




const styles = {
    root: {
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        marginTop: '10px'
    },
    submissionCard: {
        marginBottom: '10px'
    }
}


const propTypes = {
    stage: PropTypes.object,
    onSubmit: PropTypes.func,
    submissions: PropTypes.arrayOf(PropTypes.object)
};

class ProjectStage extends Component {

    componentDidMount() {
        this.props.fetchStageSubmissions();
    }

    render() {
        const { classes, submissions, course, submitProject } = this.props
        const canSubmit = submissions.length === 0 || (submissions[submissions.length - 1].testResult && !submissions[submissions.length - 1].testResult.pass)


        return (
            <div className={classes.root} >
                <Grid style={{ height: 'calc(100vh - 128px)', justifyContent: 'center', position: "relative" }} container direction={"row"} spacing={8}>


                    {/* Left */}
                    <Grid item lg={8} xs={12} style={{ overflow: 'auto' }}>

                        <Grid container direction={'column'} spacing={8} >
                            <Grid item>
                                <StageInstructions course={course} stage={this.props.stage} />
                            </Grid>

                            <Grid >
                                <Card>
                                    <CardHeader title="submission"></CardHeader>
                                    <CardContent >
                                        <SubmissionForm onSubmit={submitProject} canSubmit={canSubmit} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                    </Grid>

                    {/*Right */}
                    <Grid item lg={2} xs={12} item style={{ maxHeight: "100%", overflow: 'auto' }}>
                        {(submissions && submissions.length > 0) ? submissions.map((sub, index) => <div className={classes.submissionCard} ><SubmissionCard index={index} submission={sub} key={sub._id} /></div>) : "No submissions yet"}
                    </Grid>
                </Grid >


            </div >
        )
    }
}




ProjectStage.displayName = 'ProjectStage';
ProjectStage.propTypes = propTypes;



export default withStyles(styles)(ProjectStage);

