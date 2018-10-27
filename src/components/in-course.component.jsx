import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Typography, withStyles, Card, CardHeader, CardContent, CardActions, Button, Divider, Paper } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor';

const requireConfig = {
    url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
    paths: {
        'vs': 'https://www.mycdn.com/monaco-editor/0.6.1/min/vs'
    }
}


const styles = {
    root: {
        flex: 1
    }
}

class InCourse extends Component {
    constructor(props) {
        super(props);

    }







    render() {

        const { classes } = this.props

        return (
            <div className={classes.root} >



                <Grid container direction={"row"} spacing={24}>

                    <Grid item xs={4}>
                        <ExpansionPanel defaultExpanded>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>Expansion Panel 1</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel defaultExpanded>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>Expansion Panel 2</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                 </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel defaultExpanded>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
                            </ExpansionPanelSummary>
                        </ExpansionPanel>

                    </Grid>


                    <Grid item xs={4}>
                        <Card>
                            <CardHeader title="editor"></CardHeader>
                            <CardContent>
                                <MonacoEditor
                                    // width="800"
                                    height="600"
                                    language="javascript"
                                    value="// type your code..."
                                    requireConfig={requireConfig}
                                />


                            </CardContent>
                            <Divider></Divider>
                            <CardActions>

                                <Button color={"primary"} variant={"outlined"}>Run</Button>
                                <Button color={"warn"} variant={"outlined"}>Reset</Button>


                            </CardActions>
                        </Card>
                    </Grid>



                    <Grid item xs={4}>
                        <Paper>
                            RESULT
                        </Paper>
                    </Grid>


                </Grid>





            </div>



        );
    }
}

InCourse.propTypes = {

};

const WithStyles = withStyles(styles)(InCourse)

export { WithStyles as InCourse };
