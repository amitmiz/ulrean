import { Card, Grid, List, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import PageTitle from '../PageTitle';
import { StageListItem } from './StageListItem';


const styles = {
    root: {
        flex: 1
    },
    cardRoot : {
        padding: "10px"
    }
}


class Course extends React.Component {



    render() {
        const { classes, course } = this.props;
        return (
            <div className={classes.root} >
                <PageTitle>{`Courses >  ${course.header}`}</PageTitle>

                <Card className={classes.cardRoot}>
                    <Grid container direction="column" spacing="16">

                        <Grid item>
                            <Typography variant={"subtitle2"}>description</Typography>
                            <p>{course.subheader}</p>

                        </Grid>

                        <Grid item>

                            <Typography variant={"subtitle2"}>stages</Typography>
                            <List>
                                {course.stages.map((stage, index) => <StageListItem stage={stage} index={index} />)}

                            </List>


                        </Grid>
                    </Grid>
                </Card>

            </div>)

    }

}

export default withStyles(styles)(Course)