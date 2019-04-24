
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';


const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});




class VerticalLinearStepper extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            activeStep: 0,
        };


        this.generateStep = this.generateStep.bind(this)
    }

    componentDidMount() {
        const { max } = this.props;
        this.setState({ activeStep: max + 1 })
        this.props.onStepChanged(max + 1);
    }

    render() {
        const { classes, courses } = this.props;
        const steps = courses
        const { activeStep } = this.state;


        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map(this.generateStep.bind(this))}
                </Stepper>
                {/* {activeStep === steps.length - 1 && this.generateFinishSection(classes)} */}
            </div>
        );
    }


    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }), () => this.props.onStepChanged(this.state.activeStep));


    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }), () => this.props.onStepChanged(this.state.activeStep));


    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    generateStep(course) {
        const { classes, courses, max } = this.props;
        const steps = courses;
        const { activeStep } = this.state;


        const canGoToNextCourse = activeStep <= max


        return (
            <Step key={course._id}>
                <StepLabel>{course.header}</StepLabel>
                <StepContent>
                    <Typography>{course.subheader}</Typography>



                    <div className={classes.actionsContainer}>
                        <div>
                            <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button} >
                                Back
                            </Button>
                            {activeStep !== steps.length - 1 ?
                                <Button disabled={!canGoToNextCourse} variant="contained" color="primary" onClick={this.handleNext} className={classes.button} >
                                    Next
                                </Button>
                                :
                                <Button disabled variant="contained" color="primary" onClick={() => alert("Yay")} className={classes.button} >
                                    Finished!
                                </Button>
                            }
                        </div>
                    </div>
                </StepContent>
            </Step>
        )
    }


    generateFinishSection(classes) {
        return (

            <Paper square elevation={24} className={classes.resetContainer}>
                <Typography>All steps completed - you&quot;re finished</Typography>
                <Button onClick={this.handleReset} className={classes.button}>
                    Reset
            </Button>
            </Paper>);
    }



}

VerticalLinearStepper.propTypes = {
    classes: PropTypes.object,
    max: PropTypes.number,
    onStepChanged: PropTypes.func,
    courses: PropTypes.array
};

const PathStepper = withStyles(styles)(VerticalLinearStepper)

export default PathStepper;
