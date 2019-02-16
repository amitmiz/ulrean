import { Grid, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { RadialChart } from 'react-vis';
import { bindActionCreators } from 'redux';
import { unhandledSubmissionsSelector } from '../../state/projects-submissions/reducer';
import { fetchQuestions } from '../../state/questions/actions';
import { questionsWithAutorSelector } from '../../state/selectors';
import { fetchUsers } from "../../state/users/actions";
import { pathlessUsersSelector } from '../../state/users/reducer';
import DashboardCard from '../DashboardCard';
import PageTitle from '../PageTitle';
import QuestionCard from '../qa/QuestionCard';
import { fetchSubmissions } from '../../state/projects-submissions/actions'




const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});


const mapStateToProps = (state) => ({
    pathless: pathlessUsersSelector(state),
    submissions: unhandledSubmissionsSelector(state),
    questions: questionsWithAutorSelector(state)
})

const mapDispatchToProps = dispath => bindActionCreators({ fetchUsers, fetchQuestions, fetchSubmissions }, dispath)

@connect(mapStateToProps, mapDispatchToProps)
class TeacherDashbaord extends React.Component {


    componentDidMount() {
        this.props.fetchUsers()
        this.props.fetchQuestions()
        this.props.fetchSubmissions()

    }

    render() {
        const { classes, pathless, submissions, questions } = this.props;
        return (
            <div className={classes.root} >

                <PageTitle>Dashboard</PageTitle>

                <Grid container direction="column" spacing={8} justify={"space-between"}>


                    <DashboardRow >

                        <Grid item lg={3} xs={12}>
                            <DashboardCard title="students waiting for path" >
                                <Typography variant="h3">{pathless.length}</Typography>
                            </DashboardCard>

                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <DashboardCard title="submissions waiting for input" >
                                <Typography variant="h3">{submissions.length}</Typography>
                            </DashboardCard>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <DashboardCard title="passed project due date" >
                                <Typography variant="h3">{pathless.length}</Typography>
                            </DashboardCard>
                        </Grid>
                        <Grid item lg={3} xs={12}>
                            <DashboardCard title="unanwserd questions" >
                                <Typography variant="h3">{questions.length}</Typography>
                            </DashboardCard>
                        </Grid>
                    </DashboardRow>

                    <DashboardRow >



                    </DashboardRow>

                    <DashboardRow >

                        <Grid item lg={6} xs={12}>

                            <DashboardCard title="student/teachers ratio" >
                                <RadialChart
                                    showLabels
                                    innerRadius='100'
                                    animation
                                    data={[
                                        { angle: 2, label: 'Teachers' },
                                        { angle: 5, label: 'Students' }]}
                                    width={200}
                                    height={200} />

                            </DashboardCard>

                        </Grid>

                        <Grid item lg={6} xs={12}>
                            <DashboardCard title="recent question" >
                                {questions.length > 0 ? <QuestionCard question={questions[0]} /> : "None"}
                            </DashboardCard>

                        </Grid>


                    </DashboardRow>










                </Grid>

            </div>

        );
    }

}

function DashboardRow({ children }) {
    return (
        <Grid item xs={12} >
            <Grid container direction="row" spacing={8}>
                {children}

            </Grid>
        </Grid>

    )
}

TeacherDashbaord.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TeacherDashbaord);
