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
        textDecoration: 'none',
        color: 'black'
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

        const unansweredQuestions = questions.filter(q => q.commentsNum === 0);

        return (
            <div className={classes.root} >

                <PageTitle>Information Panel</PageTitle>

                <Grid container direction="column" spacing={8} justify={"space-between"}>


                    <DashboardRow >

                        <Grid item lg={4} xs={12}>
                            <DashboardCard title="number of students without learning path" >

                                <Typography variant="h3">
                                    {pathless &&


                                        <Link className={classes.clickable} to={`/pathless/`}>    <Typography variant="h3">{pathless.length}</Typography></Link>



                                    }




                                </Typography>
                            </DashboardCard>

                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <DashboardCard title="number of new project submissions" >
                                <Link className={classes.clickable} to={`/new-submissions/`}>    <Typography variant="h3">{submissions.length}</Typography></Link>
                            </DashboardCard>
                        </Grid>
                        <Grid item lg={4} xs={12}>
                            <DashboardCard title="number of unanswered questions" >
                                <Link className={classes.clickable} to={`/qa?new=true`}>  <Typography variant="h3">{unansweredQuestions.length}</Typography> </Link>
                            </DashboardCard>
                        </Grid>
                    </DashboardRow>

                    <DashboardRow >



                    </DashboardRow>

                    <DashboardRow >

                        <Grid item lg={6} xs={12}>

                            <DashboardCard title="registered students/teachers ratio" >
                                {this.state.teacherStundentsCount && <RadialChart
                                    showLabels
                                    innerRadius='100'
                                    animation
                                    data={[
                                        { angle: this.state.teacherStundentsCount[0].count, label: `Teachers (${this.state.teacherStundentsCount[0].count})` },
                                        { angle: this.state.teacherStundentsCount[1].count, label: `Students (${this.state.teacherStundentsCount[1].count})` }]}
                                    width={200}
                                    height={200} />

                                }

                            </DashboardCard>


                        </Grid>

                        <Grid item lg={6} xs={12}>
                            <DashboardCard title="recent question"  >
                                {questions.length > 0 ? <Link className={classes.clickable} to={`/question/${questions[0]._id}`}>   <QuestionCard question={questions[0]} /> </Link> : "None"}
                            </DashboardCard>

                        </Grid>


                    </DashboardRow>

                    <DashboardRow >

                        <Grid item lg={4} xs={12}>
                            <DashboardCard title="number of studetns who passed a course due date" >
                                <Typography variant="h3">

                                    {this.state.passedUsers &&
                                       
                                       <Link className={classes.clickable} to={`/students/`}>    <Typography variant="h3">{this.state.passedUsers.length}</Typography></Link>}
                                       
                                        {/* <div className={classes.clickable} onClick={() => this.setDialogData(this.state.passedUsers)}>{this.state.passedUsers.length}</div>} */}



                                    

                                </Typography>
                            </DashboardCard>

                        </Grid>

                        <Grid item lg={4} xs={12}>
                            <DashboardCard title="number of studetns who finished their learning path" >
                                <Typography variant="h3">
                                    {this.state.finishedUsers &&
                                        
                                    <Link className={classes.clickable} to={`/students/`}>    <Typography variant="h3">{this.state.finishedUsers.length}</Typography></Link> }
                                        
                                        
                                        {/* <div className={classes.clickable} onClick={() => this.setDialogData(this.state.finishedUsers.map(x => x.user))}>{this.state.finishedUsers.length}</div>} */}

                                </Typography>
                            </DashboardCard>
                        </Grid>

                        <Grid item lg={4} xs={12}>
                            <DashboardCard title="number of studetns who didn't finish their learning path" >
                                <Typography variant="h3">
                                    {this.state.unfinishedUsers &&
                                        
                                        <Link className={classes.clickable} to={`/students/`}>    <Typography variant="h3">{this.state.unfinishedUsers.length}</Typography></Link> }

                                        
                                         {/* <div className={classes.clickable} onClick={() => this.setDialogData(this.state.unfinishedUsers.map(x => x.user))}>{this.state.unfinishedUsers.length}</div>} */}
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
