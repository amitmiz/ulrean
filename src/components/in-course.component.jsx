import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Typography, withStyles, Card, CardHeader, CardContent, CardActions, Button, Divider, Paper, AppBar, Toolbar } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { observer, inject } from 'mobx-react';

const requireConfig = {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
    paths: {
        'vs': 'https://www.mycdn.com/monaco-editor/0.6.1/min/vs'
    }
}


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


@inject('inCourseStore')
@observer class InCourse extends Component {
    constructor(props) {
        super(props);

    }







    render() {

        const { classes } = this.props

        return (
            <div className={classes.root} >


                <Grid container direction={"row"} spacing={8}>

                    <Grid item xs={4}>

                        <CourseInstructions {...this.props} stage={this.props.inCourseStore.currStage} />
                    </Grid>


                    <Grid item xs={4}>
                        <Editor stage={this.props.inCourseStore.currStage} />
                    </Grid>



                    <Grid item xs={4}>
                        <Card>
                            <CardHeader title="preview"></CardHeader>
                            <CardContent>preview</CardContent>
                        </Card>
                    </Grid>


                </Grid>


                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>


                        <Button onClick={() => this.props.inCourseStore.prevStage()} variant="outlined">prev</Button>
                        <div className={classes.stageNumber} >7/16</div>
                        <Button onClick={() => this.props.inCourseStore.nextStage()} variant="outlined">next</Button>


                    </Toolbar>
                </AppBar>


            </div>



        );
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

function Editor(props) {
    const { stage } = props;

    return (<Card>
        <CardHeader title="editor"></CardHeader>
        <CardContent>
            <MonacoEditor
                // width="800"
                height="65vh"
                language="javascript"
                value={stage.codePlaceholder}
                requireConfig={requireConfig}
            />


        </CardContent>
        <Divider></Divider>
        <CardActions>

            <Button color={"primary"} variant={"outlined"}>Run</Button>
            <Button color={"warn"} variant={"outlined"}>Reset</Button>


        </CardActions>
    </Card>)
}

const WithStyles = withStyles(styles)(InCourse)

export { WithStyles as InCourse };
