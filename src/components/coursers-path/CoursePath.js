
import { Card, CardActions, CardContent, Collapse, Divider, Grid, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpIcon from '@material-ui/icons/Help';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import CourseInfo from '../CourseInfo.js';
import { Container, Item } from '../utils';
import CourseTasks from './CourseTasks.js';
import PathStat from './PathStat.js';
import PathStepper from './PathStepper.js';



const styles = (theme) => ({


    courseCard: {
        margin: '10px'
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
})


const propTypes = {
    currentUser: PropTypes.object.isRequired,
    userPath: PropTypes.object.isRequired
}

class CoursePath extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentStep: 0, expanded: true }

    }

    componentDidMount() {

    }


    render() {
        const { classes, userPath } = this.props;

        return (
            userPath ? this.rednerCoursePath() : this.renderNoCoursePath()
        )
    }

    handleExpandClick = () => this.setState(prevState => ({ expanded: !prevState.expanded }));

    handleStepChanged = (newStep) => this.setState(prevState => prevState.currentStep = newStep)



    rednerCoursePath = () => {

        const { currentUser, classes, userPath, maxCompletedCourseIndex, lastCourse } = this.props;
        const { courses } = userPath;
        const currentCourse = courses[this.state.currentStep];

        const expandButton = <IconButton onClick={this.handleExpandClick} className={classnames(classes.expand, {
            [classes.expandOpen]: this.state.expanded,
        })} >
            <ExpandMoreIcon />
        </IconButton>

        return (
            <div  >

                <Container direction={"column"} wrap="nowrap" spacing={16}>
                    {/* Right Side */}
                    <Item>
                        <Paper>
                            <PathStat currentUser={currentUser} lastCourse={lastCourse} />
                        </Paper>
                    </Item>
                    {/* Left Side */}
                    <Item>

                        <Container spacing={24} direction={"row"}>

                            <Item xs={12} lg={3}>
                                <Paper>
                                    <PathStepper courses={courses} max={maxCompletedCourseIndex} onStepChanged={this.handleStepChanged} />
                                </Paper>
                            </Item>


                            <Item xs={12} lg={9}>
                                <Container direction="column" spacing={24}>

                                    <Item><Card>
                                        <CourseInfo course={currentCourse} />


                                        <CardActions className={classes.actions} disableActionSpacing>
                                            {expandButton}
                                        </CardActions>

                                        <Divider />

                                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                <CourseTasks course={currentCourse} />
                                            </CardContent>
                                        </Collapse>

                                    </Card></Item>


                                </Container>
                            </Item>

                        </Container>
                    </Item>
                </Container>
            </div>
        )
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

}

const styled = withStyles(styles, { withTheme: true })(CoursePath);
styled.displayName = "CoursePath"
export default styled;

