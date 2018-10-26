
import { Grid, Paper, Typography, IconButton, Tooltip } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help'
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { currentUser } from '../../static-data.js';
import { CourseCard } from '../course-card/course-card.jsx';
import { CourseTasks } from './course-tasks.jsx';
import { CoursePath } from './courses-path.jsx';
import { PathStat } from './path-stat.jsx';






const styles = {


    courseCard: {
        margin: '10px'
    }
}

class CoursersCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentStep: 0 }
        this.handleStepChanged = this.handleStepChanged.bind(this)
    }

    handleStepChanged(newStep) {
        this.setState(state => state.currentStep = newStep)
    }

    renderNoCoursePath() {
        return (
            <Grid container direction={"row"} justify="center" alignItems="center" alignContent="center" wrap="nowrap" spacing={16}>

                <Typography variant="h5"  >A coure path wasn’t created for you, please wait</Typography>

                <Tooltip title="please contact a teacher">
                    <IconButton>
                        <HelpIcon></HelpIcon>
                    </IconButton>
                </Tooltip>
            </Grid>
        )
    }

    rednerCoursePath(currentCoursePath, classes) {
        return (
            <div  >

                <Grid container direction={"column"} wrap="nowrap" spacing={16}>
                    {/* Right Side */}
                    <Grid item>
                        <Paper>
                            <PathStat />
                        </Paper>
                    </Grid>
                    {/* Left Side */}
                    <Grid item>
                        <Grid container spacing={24} direction={"row"}>
                            <Grid item xs={3}>
                                <Paper>
                                    <CoursePath courses={currentCoursePath} onStepChanged={this.handleStepChanged} />
                                </Paper>
                            </Grid>


                            <Grid item xs={9}>
                                <Grid container direction="column" spacing={24}>

                                    <Grid item>
                                        <Paper>
                                            <CourseCard {...currentCoursePath[this.state.currentStep]} />
                                        </Paper>
                                    </Grid>

                                    <Grid item>
                                        <Paper>
                                            <CourseTasks course={currentCoursePath[this.state.currentStep]} />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    render() {
        const { classes } = this.props;
        const currentCoursePath = currentUser.corusePath.path;


        return (
            currentCoursePath ? this.rednerCoursePath(currentCoursePath, classes) : this.renderNoCoursePath()
        )
    }
}

const styled = withStyles(styles)(CoursersCatalog);
export { styled as CoursersCatalog };
