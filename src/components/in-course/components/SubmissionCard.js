import React from 'react';
import { Card, CardHeader, CardContent, withStyles, Typography, Divider } from '@material-ui/core';

const styles = {
    cardRoot: {
        marginBottom: '10px'
    },

    contentRoot: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        width: '60%',


    },
    rowLabel: {
        flex: '1'
    },
    passed :{
        color :'green'
    },
    failed : {
        color : 'red'
    }

}

const SubmissionCard = ({ index = 0, classes, submission }) => (
    <Card className={classes.cardRoot}>
        <CardHeader title={`submission #${index + 1}`} />
        <Divider />

        <CardContent>
            <div className={classes.contentRoot}>
                <Typography>
                    <div className={classes.row}>
                        <span className={classes.rowLabel}><strong>Date:</strong> </span>
                        <span>{submission.dateSubmited}</span>
                    </div>

                    <div className={classes.row}>
                        <span className={classes.rowLabel}><strong>Pass:</strong> </span>
                        <div>{(submission.testResult && submission.testResult.pass) ?
                            <span className={classes.passed}>Yes</span> :
                            <span className={classes.failed}>No</span>
                        }
                        </div>
                    </div>
                    <div className={classes.row}>
                        <span className={classes.rowLabel}><strong>Teacher:</strong> </span>
                        <span>{(submission.testResult && submission.testResult.teacher) ? submission.testResult.teacher : "Not yet"}</span>
                    </div>
                    <div className={classes.row}>
                        <span className={classes.rowLabel}><strong>Comments:</strong> </span>
                        <span>{(submission.testResult && submission.testResult.comment) ? submission.testResult.comment : "Not yet"}</span>
                    </div>

                </Typography>

            </div>
        </CardContent>

    </Card >
)




export default withStyles(styles)(SubmissionCard)