import { Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogTitle, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import { ApiClient } from '../api-client';
import SaveIcon from '@material-ui/icons/Save';


const styles = theme => ({
    root: {
        flex: 1
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    pathPreviewRoot: {
        display: "flex",
        flexDirection: "row",
        position: "relative"
    },
    pathPreviewCircleRoot: {
        color: "white",
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
        textAlign: "center",
        justifyContent: "center",
        height: "150px",
        margin: "20px",
        padding: "20px",
        width: "150px",
        boxShadow: '2px 2px 20px 4px #00000091'



    },



})




@inject('userStore')
@observer
class PathCreation extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            modalOpened: false,
            selectedValue: null,
            currentPath: [],
        }


        this.state.currentUserId = this.props.match.params.id;


        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.savePath = this.savePath.bind(this)

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

                {this.state.currentPath.map((course) => <this.PathCircle>
                    <Typography variant="button" style={{ color: "white" }}>
                        {course.header}
                    </Typography>
                </this.PathCircle>)}

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

                {ApiClient.getPredefiendPaths().map((predefiend) => (
                    <ListItem key={predefiend._id}>
                        <ListItemText primary={predefiend.name} secondary="" />
                        <ListItemSecondaryAction>
                            <Button onClick={() => this.fillPath(predefiend)} variant="outlined" color="primary">Use</Button>

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

    savePath() {
        ApiClient.updateUsersPath(this.state.currentUserId, this.state.currentPath)

    }

    render() {
        const { classes } = this.props;

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
                                    <Button variant="outlined" color="primary" onClick={this.savePath} >
                                        <SaveIcon className={classes.leftIcon} />
                                        Save
                                    </Button>
                                    <Button variant="outlined" color="primary" >Save as Predifiend Path</Button>
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

        const availableCourses = ApiClient.getAllCourses().filter((course) => {



            const isFound = this.props.currentPath.find((usedCourse) => usedCourse._id === course._id)
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

export { styled as PathCreation };
