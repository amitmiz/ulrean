import React from 'react'
import { withStyles, Grid, Card, CardHeader, Divider, CardContent, Typography, Paper } from '@material-ui/core';
import PageTitle from '../PageTitle';
import CourseInfo from '../CourseInfo';

const styles = {

    root: {
        flex: "1"
    },
}


class Stage extends React.Component {

    render() {
        const { classes, stage } = this.props;
        return (
            <div className={classes.root} >
                <PageTitle>Stages > {stage.title}</PageTitle>

                <Grid container direction="column" spacing="16">

                    <Grid item>
                        <Typography variant={"subtitle2"}>type</Typography>
                        <p>{stage.stageType}</p>

                    </Grid>

                    <Grid item>
                        <Typography variant={"subtitle2"}>description</Typography>
                        {stage.learn.map(l => <p dangerouslySetInnerHTML={{ __html: l }}></p>)}

                    </Grid>

                    <Grid item>
                        <Typography variant={"subtitle2"}>template</Typography>
                        <p >{stage.template || "none"}</p>

                    </Grid>



                    <Grid item>
                        <Typography variant={"subtitle2"}>tests</Typography>
                        <ul>{stage.tests.map(t => <li><p dangerouslySetInnerHTML={{ __html: t.text }}></p> <p>{t.testString}</p></li>)}</ul>

                    </Grid>





                </Grid>




            </div>)

    }

}

export default withStyles(styles)(Stage)