
import { Card, CardActions, CardContent, Collapse, Divider, Grid, IconButton, Paper, Tooltip, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpIcon from '@material-ui/icons/Help';
import classnames from 'classnames';
import React from 'react';
import { ApiClient } from '../../api-client.js';
import { currentUser } from '../../static-data.js';
import { CourseInfo } from '../course-info.jsx';
import { Container, Item, Loading } from '../utils.jsx';
import { CourseTasks } from './course-tasks.jsx';
import { PathStat } from './path-stat.jsx';
import { PathStepper } from './path-stepper.jsx';

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

const mapStateToProps = state => {
    return { currentUser: state.currentUser };
};



class CoursersCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = { loading: false, currentStep: 0, expanded: true }
        this.currentUser = currentUser

    }

    componentDidMount() {
        this.currentCoursePath = ApiClient.getUserPath(this.currentUser._id);
        this.setState({ loading: false })
    }


    render() {
        const { classes } = this.props;

        return (
            this.state.loading ? <Loading /> : this.currentCoursePath ? this.rednerCoursePath(this.currentCoursePath, classes) : this.renderNoCoursePath()
        )
    }

    handleExpandClick = () => this.setState(prevState => ({ expanded: !prevState.expanded }));

    handleStepChanged = (newStep) => this.setState(prevState => prevState.currentStep = newStep)



    rednerCoursePath(currentCoursePath, classes) {

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
                            <PathStat currentUser={this.currentUser} />
                        </Paper>
                    </Item>
                    {/* Left Side */}
                    <Item>

                        <Container spacing={24} direction={"row"}>

                            <Item xs={12} lg={3}>
                                <Paper>
                                    <PathStepper courses={currentCoursePath} onStepChanged={this.handleStepChanged} />
                                </Paper>
                            </Item>


                            <Item xs={12} lg={9}>
                                <Container direction="column" spacing={24}>

                                    <Item><Card>
                                        <CourseInfo course={currentCoursePath[this.state.currentStep]} />


                                        <CardActions className={classes.actions} disableActionSpacing>
                                            {expandButton}
                                        </CardActions>

                                        <Divider />

                                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                            <CardContent>
                                                <CourseTasks course={currentCoursePath[this.state.currentStep]} />
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

const styled = withStyles(styles, { withTheme: true })(CoursersCatalog);
styled.displayName = "CourseCatalog"
export { styled as CoursersCatalog };

