
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
import { currentUser } from '../../static-data';


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


    getSteps() {
        return this.props.courses
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
        const { classes, courses } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;


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
                            <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button} >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
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

    render() {
        const { classes } = this.props;
        const steps = this.getSteps();
        const { activeStep } = this.state;

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map(this.generateStep.bind(this))}
                </Stepper>
                {activeStep === steps.length && this.generateFinishSection(classes)}
            </div>
        );
    }

}

VerticalLinearStepper.propTypes = {
    classes: PropTypes.object,
    onStepChanged: PropTypes.func,
    courses: PropTypes.array
};

const CoursePath = withStyles(styles)(VerticalLinearStepper)

export { CoursePath };
