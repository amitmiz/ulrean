import { AppBar, Button, Card, CardActions, CardContent, CardHeader, Divider, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Toolbar, Typography, withStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { first } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { stageIsLoadingSelector, stageSelector } from '../../redux';
import { fetchStage } from '../../redux/actions';
import { ChallengeNode } from '../../redux/propTypes';
import { stages } from '../../static-data';
import decodeHTMLEntities from '../../utils/decodeHTMLEntities';
import { challengeFilesSelector, challengeTestsSelector, consoleOutputSelector, executeChallenge } from '../../stage-proccessor/redux';
import Editor from './Editor';
import Output from './Output';
import Preview from './Preview';






const styles = {
    root: {
        flex: 1,
        overflow: 'hidden',
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



const mapStateToProps = createSelector(
    challengeFilesSelector,
    challengeTestsSelector,
    consoleOutputSelector,
    stageSelector,
    stageIsLoadingSelector,
    (files, tests, output, stage, fetchStatus) => ({
        files,
        tests,
        output,
        stage,
        fetchStatus
    })
);

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchStage,
            executeChallenge
        },
        dispatch
    );

const propTypes = {
    challengeMounted: PropTypes.func,
    createFiles: PropTypes.func,
    data: PropTypes.shape({
        challengeNode: ChallengeNode
    }),
    files: PropTypes.shape({
        key: PropTypes.string
    }),
    initTests: PropTypes.func,
    output: PropTypes.string,
    pageContext: PropTypes.shape({
        challengeMeta: PropTypes.shape({
            nextchallengePath: PropTypes.string
        })
    }),
    tests: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            testString: PropTypes.string
        })
    ),
    updateChallengeMeta: PropTypes.func,
    updateSuccessMessage: PropTypes.func
};

class InCourse extends Component {
    constructor(props) {
        super(props);

        this.currStage = stages[0]

    }


    componentDidMount() {

        this.props.fetchStage(12312312333123);
    }






    render() {

        const { classes, output, stage, fetchStatus } = this.props

        return (
            <div className={classes.root} >

                {fetchStatus.isLoading ? "loading" :

                    this.afterLoad(output, classes)
                }
            </div>
        );
    }

    afterLoad(output, classes) {
        return (
            <React.Fragment>
                <Grid container direction={"row"} spacing={8}>
                    <Grid item xs={4}>
                        <CourseInstructions {...this.props} stage={this.props.stage} />
                    </Grid>

                    <Grid item xs={4}>
                        <CodeEditor {...this.props} />
                    </Grid>

                    <Grid item xs={4}>
                        <Card>
                            <CardHeader title="preview"></CardHeader>
                            <CardContent>
                                <Preview className='full-height' />
                                <Output height={'20vh'} defaultOutput={`
                                                /**
                                                * Your test output will go here.
                                                */
                                                `} output={decodeHTMLEntities(output)} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                        <Button variant="outlined">prev</Button>
                        <div className={classes.stageNumber}>7/16</div>
                        <Button variant="outlined">next</Button>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        )
    }
}

InCourse.propTypes = {

};

function CourseInstructions(props) {

    const { stage, classes } = props;

    return (<React.Fragment>
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Learn</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expandedRoot}>
                <Typography variant="subheading">  {stage.learnSubheader}</Typography>
                <Typography variant="h4">  {stage.learnHeader}</Typography>
                <Typography>
                    {stage.learn}
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Instructions</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    {stage.instructions.map((inst) => <div>{inst}</div>)}
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
            </ExpansionPanelSummary>
        </ExpansionPanel>
    </React.Fragment>
    )
}

function CodeEditor(props) {
    const { stage, executeChallenge } = props;
    const { files } = stage;
    const challengeFile = first(Object.keys(files).map(key => files[key]));

    return (<Card>
        <CardHeader title="editor"></CardHeader>
        <CardContent>
            <Editor {...challengeFile} fileKey={challengeFile.key} />


            {/* <MonacoEditor
                // width="800"
                height="65vh"
                language="javascript"
                value={stage.codePlaceholder}
                requireConfig={requireConfig}
            /> */}


        </CardContent>
        <Divider></Divider>
        <CardActions>

            <Button onClick={executeChallenge} color={"primary"} variant={"outlined"}>Run</Button>
            <Button color={"warn"} variant={"outlined"}>Reset</Button>


        </CardActions>
    </Card>)
}

const WithStyles = withStyles(styles)(InCourse)

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(WithStyles);


connected.displayName = 'InCourse';
connected.propTypes = propTypes;



export { connected as InCourse };

