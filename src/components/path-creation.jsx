import React from 'react';
import { Grid, Card, withStyles, Typography, CardHeader, CardContent, List, ListItem, ListItemText, Divider, ListItemSecondaryAction, Button, CardActions, IconButton, Modal, Paper, ListItemAvatar, Dialog, DialogTitle, Avatar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import PropTypes from 'prop-types';
import InfoIcon from '@material-ui/icons/Info'
import { staticCoureses, predefinedPaths } from '../static-data';



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

        this.state = {
            modalOpened: false,
            selectedValue: null,
            currentPath: []
        }

        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleOpenModal() {
        this.setState({ modalOpened: true })
    }

    handleClose(selectedValue) {

        if (selectedValue && selectedValue != this.state.selectedValue) {
            this.setState({ currentPath: [...this.state.currentPath, selectedValue] })
        }

        this.setState({ modalOpened: false, selectedValue })
    }


    PathPreview = () => {
        const { classes } = this.props;

        return (




            <div className={classes.pathPreviewRoot} >

                {this.state.currentPath.map((course) => <this.PathCircle>{course.header}</this.PathCircle>)}

                <this.PathCircle>
                    <IconButton onClick={this.handleOpenModal}><AddIcon /></IconButton>
                </this.PathCircle>

                <SimpleDialogWrapped
                    currentPath={this.state.currentPath}
                    selectedValue={this.state.selectedValue}
                    open={this.state.modalOpened}
                    onClose={this.handleClose}
                />
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
    generatePredefiendList = () => {

        return (
            <List>

                {predefinedPaths.map((predefiend) => (
                    <ListItem>
                        <ListItemText primary={predefiend.name} secondary="" />
                        <ListItemSecondaryAction>
                            <Button onClick={() => this.fillPath(predefiend)} variant="raised">Use</Button>

                        </ListItemSecondaryAction>
                    </ListItem>
                )

                )}

            </List>
        )
    }

    fillPath(predefiend) {
        this.setState({ currentPath: [...predefiend.path] })
    }

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
                                    <Button variant="contained" >Create</Button>
                                    <Button variant="contained" >Save as Predifiend Path</Button>
                                </CardActions>



                            </Card>
                        </Grid>
                    </Grid>



                </Grid>


            </Grid>
        )

    }

}

const dialogStyles = {
    avatar: {

    },
};


class SimpleDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;

        const availableCourses = staticCoureses.filter((staticCourse) => {



            const isFound = this.props.currentPath.find((course) => course._id === staticCourse._id)
            return isFound == undefined;
        })
        const isCoursesLeft = availableCourses.length > 0

        const mappedCourse = availableCourses.map(course => (
            <ListItem button onClick={() => this.handleListItemClick(course)} key={course._id}>

                <ListItemText primary={course.header} />
                <ListItemSecondaryAction><IconButton><InfoIcon /></IconButton></ListItemSecondaryAction>
            </ListItem>))

        return (
            <Dialog onClose={this.handleClose} {...other}>
                <DialogTitle id="simple-dialog-title">Pick Course</DialogTitle>
                <div>
                    <List>
                        {isCoursesLeft ? mappedCourse : "No coures left for selection"}

                    </List>
                </div>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.object,
};

const SimpleDialogWrapped = withStyles(dialogStyles)(SimpleDialog);


const styled = withStyles(styles, { withTheme: true })(PathCreation)

export { styled as PathCreation }