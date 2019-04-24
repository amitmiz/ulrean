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
import { ApiClient } from '../../ApiClient';
import { Link } from 'react-router-dom';
import StudentDialog from './StudentDialog';




const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    clickable: {
        cursor: 'pointer',
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


    constructor(props) {
        super(props);
        this.state = {
            passedUsers: [],
            unfinishedUsers: [],
            finishedUsers: [],
            studentDialog: false,
            students: []
        }
    }

    componentDidMount() {
        this.props.fetchUsers()
        this.props.fetchQuestions()
        this.props.fetchSubmissions()


        Promise.all(
            [
                ApiClient.usersPastDueDate(),
                ApiClient.unfinishedPathUsers(),
                ApiClient.finishedPathUsers(),
                ApiClient.teacherStundentsCount()

            ])
            .then(([passedUsers, unfinishedUsers, finishedUsers, teacherStundentsCount]) => {
                this.setState({ passedUsers, unfinishedUsers, finishedUsers, teacherStundentsCount })

            })


    }

    setDialogData(students) {
        if (students.length > 0) {
            this.setState({ students, studentDialog: true })
        }
    }

    render() {
        const { classes, pathless, submissions, questions } = this.props;
        return (
            <div className={classes.root} >

                <PageTitle>Dashboard</PageTitle>

                <Grid container direction="column" spacing={8} justify={"space-between"}>


                    <DashboardRow >

                        <Grid item lg={4} xs={12}>
                            <DashboardCard title="students waiting for path" >

                                <Typography variant="h3">
                                    {pathless &&
                                        <div className={classes.clickable} onClick={() => this.setDialogData(pathless)}>{pathless.length}</div>}

                                </Typography>
                            </DashboardCard>

                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <DashboardCard title="submissions waiting for input" >
                                <Typography variant="h3">{submissions.length}</Typography>
                            </DashboardCard>
                        </Grid>
                        <Grid item lg={4} xs={12}>
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
                                {this.state.teacherStundentsCount && <RadialChart
                                    showLabels
                                    innerRadius='100'
                                    animation
                                    data={[
                                        { angle: this.state.teacherStundentsCount[0].count, label: 'Teachers' },
                                        { angle: this.state.teacherStundentsCount[1].count, label: 'Students' }]}
                                    width={200}
                                    height={200} />

                                }

                            </DashboardCard>


                        </Grid>

                        <Grid item lg={6} xs={12}>
                            <DashboardCard title="recent question" >
                                {questions.length > 0 ? <Link to={`/question/${questions[0]._id}`}>   <QuestionCard question={questions[0]} /> </Link> : "None"}
                            </DashboardCard>

                        </Grid>


                    </DashboardRow>

                    <DashboardRow >

                        <Grid item lg={4} xs={12}>
                            <DashboardCard title="passed course due date" >
                                <Typography variant="h3">

                                    {this.state.passedUsers &&
                                        <div className={classes.clickable} onClick={() => this.setDialogData(this.state.passedUsers)}>{this.state.passedUsers.length}</div>}


                                </Typography>
                            </DashboardCard>

                        </Grid>

                        <Grid item lg={4} xs={12}>
                            <DashboardCard title="finished their path" >
                                <Typography variant="h3">
                                    {this.state.finishedUsers &&
                                        <div className={classes.clickable} onClick={() => this.setDialogData(this.state.finishedUsers.map(x => x.user))}>{this.state.finishedUsers.length}</div>}

                                </Typography>
                            </DashboardCard>
                        </Grid>

                        <Grid item lg={4} xs={12}>
                            <DashboardCard title="didn't finished their path" >
                                <Typography variant="h3">
                                    {this.state.unfinishedUsers &&
                                        <div className={classes.clickable} onClick={() => this.setDialogData(this.state.unfinishedUsers.map(x => x.user))}>{this.state.unfinishedUsers.length}</div>}
                                </Typography>
                            </DashboardCard>
                        </Grid>

                    </DashboardRow>










                </Grid>


                <StudentDialog
                    students={this.state.students}
                    open={this.state.studentDialog}
                    onClose={() => this.setState({ studentDialog: false })}></StudentDialog>
            </div >



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
