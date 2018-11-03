import React from 'react';
import { Grid, Card, withStyles, Typography, CardHeader, CardContent, List, ListItem, ListItemText, Divider, ListItemSecondaryAction, Button, CardActions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'

const styles = theme => ({
    root: {
        flex: 1
    },
    pathPreviewRoot: {
        display: "flex",
        flexDirection: "row",
        position: "relative"
    },
    pathPreviewCircleRoot: {
        color: "black",
        display: "inline-block",
        background: "#3f51b5",
        position: "relative",
        zIndex: 10,

        '&:after': {
            content: "''",
            position: "absolute",
            height: '2px',
            background: "black",
            width: "91px",
            zIndex: -1,
            top: "50%",
            left: "66%",
        

        },
        '&:last-child:after': {
            display: 'none'
        }

    },
    pathPreviewCircle: {
        borderRadius: "50%",
        background: "#3f51b5",
        color: "white",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90px",
        margin: "20px",
        padding: "20px",
        width: "90px"


    },



})





class PathCreation extends React.Component {


    constructor(props) {
        super(props)
    }


    PathPreview = () => {
        const { classes } = this.props;

        return (




            <div className={classes.pathPreviewRoot} >

            {["css","html"].map((name,index) =>      <this.PathCircle>{name}</this.PathCircle>)}


  


                <this.PathCircle><   AddIcon /></this.PathCircle>






            </div>

        )
    }

    PathCircle = (props) => {
        const { classes } = this.props;

        return (
            <div className={classes.pathPreviewCircleRoot}>

                <span className={classes.pathPreviewCircle}>{props.children}</span>

            </div>
        )
    }
    generatePredefiendList = () => (
        <List>
            <ListItem>
                <ListItemText primary="Frontend" secondary="" />
                <ListItemSecondaryAction>
                    <Button>Use</Button>

                </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
                <ListItemText primary="Backend" secondary="" />
                <ListItemSecondaryAction>
                    <Button>Use</Button>

                </ListItemSecondaryAction>
            </ListItem>

        </List>
    )

    render() {
        return (
            <Grid container direction="column" spacing={24}>

                <Grid item>

                    <Card>
                        <Typography variant="h3">Create Path to Amit Mizrahi</Typography>
                    </Card>
                </Grid>


                <Grid item>

                    <Grid container direction="row" spacing={24}>

                        <Grid item xs={4}>
                            <Card>
                                <CardHeader title="Predefiend paths" titleTypographyProps={{ variant: "h6" }} />
                                <Divider />
                                <CardContent>
                                    {this.generatePredefiendList()}

                                </CardContent>
                            </Card>

                        </Grid>

                        <Grid item xs={8}>



                            <Card>

                                <CardHeader title="Course Path Preview" titleTypographyProps={{ variant: "h6" }} />
                                <Divider />
                                <CardContent>
                                    <this.PathPreview />



                                </CardContent>
                                <CardActions>
                                    <Button>Create</Button>

                                </CardActions>



                            </Card>
                        </Grid>
                    </Grid>



                </Grid>


            </Grid>
        )

    }

}


const styled = withStyles(styles, { withTheme: true })(PathCreation)

export { styled as PathCreation }