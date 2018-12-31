import { Grid, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import StageInstructions from '../in-course/components/StageInstructions';
import SubmissionCard from '../in-course/components/SubmissionCard';




const styles = {
    root: {
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        marginTop: '10px'
    },
    submissionCard: {
        marginBottom: '10px'
    },
    currentSubmission: {
        border: '1px dashed #00000070',
    }
}


const propTypes = {
    stage: PropTypes.object,
    submissions: PropTypes.arrayOf(PropTypes.object)
};

class CheckSubmission extends Component {

    render() {
        const { classes, submissions, currentSubmission } = this.props
        const currentSubmissionIndex = submissions.findIndex(x => currentSubmission._id == x._id)

        return (
            <div className={classes.root} >
                <Grid style={{ height: 'calc(100vh - 128px)', justifyContent: 'center' }} container direction={"row"} spacing={8}>


                    {/* Left */}
                    <Grid item lg={8} xs={12} style={{ overflow: 'auto' }}>

                        <Grid container direction={'column'} spacing={8} >
                            <Grid item>
                                <StageInstructions stage={currentSubmission.stage} />
                            </Grid>
                        </Grid>

                    </Grid>

                    {/*Right */}
                    <Grid item lg={4} xs={12}>
                        {submissions ? submissions.map((sub, index) => <div className={classnames(classes.submissionCard, { [classes.currentSubmission]: index === currentSubmissionIndex })} ><SubmissionCard index={index} submission={sub} key={sub._id} /> </div>) : "No submissions yet"}
                    </Grid>
                </Grid >


            </div >
        )
    }
}




CheckSubmission.displayName = 'CheckSubmission';
CheckSubmission.propTypes = propTypes;



export default withStyles(styles)(CheckSubmission);

