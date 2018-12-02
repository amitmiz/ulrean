import { Button, Card, CardActions, CardContent, CardHeader, Divider, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Typography, withStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { first } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import decodeHTMLEntities from '../../utils/decodeHTMLEntities';
import Editor from './editor';
import Output from './output';
import Preview from './preview';

const styles = {
    root: {
        flex: 1,
        overflow: 'hidden',
        display: 'flex'
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        zIndex: 2000
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    stageNumber: {
        margin: '20px'
    }, expandedRoot: {
        flexDirection: "column"
    }
}


const propTypes = {
    stage: PropTypes.object,
    output: PropTypes.string,
    tests: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            testString: PropTypes.string
        })
    )
};

class RegualrStage extends Component {

    render() {
        const { classes, output } = this.props
        return (
            <div className={classes.root} >
                <Grid style={{ height: 'calc(100vh - 128px)' }} container direction={"row"} spacing={8}>


                    {/* Left */}
                    <Grid item xs={4} style={{ overflow: 'auto' }}>
                        <CourseInstructions {...this.props} stage={this.props.stage} />

                    </Grid>

                    {/* Middle */}
                    <Grid item xs={4}>
                        <CodeEditor {...this.props} />
                        <br />
                        <Card>
                            <Output height={200}
                                defaultOutput={`/** \n* Your test output will go here.\n*/`} output={decodeHTMLEntities(output)} />
                        </Card>
                    </Grid>

                    {/*Right */}
                    <Grid item xs={4}>
                        <Card>
                            <CardHeader title="preview"></CardHeader>
                            <CardContent style={{ height: '60vh' }}>
                                <Preview className='full-height' />
                            </CardContent>
                        </Card>


                    </Grid>
                </Grid>


            </div>
        )
    }
}



function CourseInstructions(props) {

    const { stage, classes, tests, course } = props;

    return (<div>

        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}><Typography className={classes.heading}>Learn</Typography></ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expandedRoot}>
                <Typography variant="subtitle1">  {course.header}</Typography>
                <Typography variant="h4">  {stage.title}</Typography>
                <Typography component="div"> {stage.learn.map((learn, index) => <p key={index} dangerouslySetInnerHTML={{ __html: learn }} />)} </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}> <Typography className={classes.heading}>Instructions</Typography></ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography component="div">{tests.map(({ text, pass, error }, index) => {
                    return (<div key={index}> {pass && <CheckCircleIcon />}<span dangerouslySetInnerHTML={{ __html: text }} /></div>)
                })}
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>

    </div>
    )
}

function CodeEditor(props) {
    const { executeChallenge, updateFile, files } = props;
    const challengeFile = first(Object.keys(files).map(key => files[key]));

    return (<Card >
        <CardHeader title={`editor ${challengeFile.path}`}></CardHeader>
        <CardContent >
            <Editor {...challengeFile} fileKey={challengeFile.key} onChange={updateFile} onEnterPressed={executeChallenge} />
        </CardContent>
        <Divider></Divider>
        <CardActions>
            <Button onClick={executeChallenge} color={"primary"} variant={"outlined"}>Run</Button>
            <Button color={"secondary"} variant={"outlined"}>Reset</Button>
        </CardActions>
    </Card>)
}

const WithStyles = withStyles(styles)(RegualrStage)



WithStyles.displayName = 'RegualrStage';
WithStyles.propTypes = propTypes;



export { WithStyles as RegualrStage };

