import React from 'react';
import { Card, CardHeader, CardContent, withStyles, Typography, Divider, Button } from '@material-ui/core';

const styles = {
    cardRoot: {
    },
    contentRoot: {
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        width: '60%',
    },
    rowLabel: {
        flex: '1'
    },
    passed: {
        color: 'green'
    },
    failed: {
        color: 'red'
    }
}

const SubmissionCard = ({ index = 0, classes, submission, extraSection }) => (
    <Card className={classes.cardRoot}>
        <CardHeader title={`submission #${index + 1}`} />
        <Divider />

        <CardContent className={classes.contentRoot}>

            <Typography component="div">
                <section className={classes.row}>
                    <span className={classes.rowLabel}><strong>Date:</strong> </span>
                    <span>{submission.dateSubmited}</span>
                </section>

                <section className={classes.row}>
                    <span className={classes.rowLabel}><strong>Pass:</strong> </span>
                    <div>
                        {(submission.testResult && submission.testResult.pass) ?
                            <span className={classes.passed}>Yes</span> :
                            <span className={classes.failed}>No</span>
                        }
                    </div>
                </section>
                <section className={classes.row}>
                    <span className={classes.rowLabel}><strong>Teacher:</strong> </span>
                    <span>
                        {(submission.testResult && submission.testResult.teacher) ?
                            `${submission.testResult.teacher.name} ${submission.testResult.teacher.lastname}`
                            : "Not yet"}
                    </span>
                </section>
                <section className={classes.row}>
                    <span className={classes.rowLabel}><strong>Comments:</strong> </span>
                    <div dangerouslySetInnerHTML={{ __html: submission.testResult && submission.testResult.comments ? submission.testResult.comments : "Not yet" }}

                    >

                    </div>
                </section>
                {extraSection && extraSection(submission)}
            </Typography>
        </CardContent>
    </Card >
)


export default withStyles(styles)(SubmissionCard)