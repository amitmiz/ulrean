import { Button, Card, Grid, List, Typography, withStyles } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from '../PageTitle';
import { CourseListItem } from './CourseListItem';
import { StageListItem } from './StageListItem';



const styles = {
    root: {
        "flex": '1',
    },
}


class Courses extends React.Component {



    render() {
        const { classes, courses, stages, currentUser } = this.props;
        return (
            <div className={classes.root} >
                <PageTitle> Cotent </PageTitle>
                <Grid container>
                    <Grid item xs>
                        <Typography variant="h4" > Courses</Typography>
                    </Grid>

                    <Grid item>
                        {currentUser.type === "teacher" && <Button component={Link} to={"/course-creation"} variant=" flat" color="default" >
                            New
                            <Add></Add>
                        </Button>}
                    </Grid>
                </Grid>
                <Card>
                    <List>
                        {courses.map((course, index) =>
                            <CourseListItem key={course._id} course={course} index={index} />
                        )}
                    </List>
                </Card>

                <Grid container>
                    <Grid item xs>
                        <Typography variant="h4" > Stages</Typography>
                    </Grid>
                    <Grid item>
                        {currentUser.type === "teacher" && <Button variant="flat" color="default" component={Link} to={"/stage-creation"} >
                            New
                          <Add></Add>
                        </Button>}
                    </Grid>
                </Grid>

                <Card>
                    <List>
                        {stages.map((stage, index) =>
                            <StageListItem key={stages._id} stage={stage} index={index} />
                        )}

                    </List>
                </Card>

            </div >
        )

    }

}

export default withStyles(styles)(Courses)