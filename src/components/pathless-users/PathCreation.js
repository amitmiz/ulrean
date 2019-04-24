import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import CourseSelectionDialog from '../content-creation/StageSelectionDialog';
import PathCreationDialog from './PathCreationDialog';
import PageTitle from '../PageTitle'




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

    headerCard: {
        padding: "20px",
        textAlign: 'center'
    }



})



class PathCreation extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            courseSelectionModalOpen: false,
            savePathModalOpen: false,
            selectedValue: null,
            currentPath: [], // TODO : CHANGE TO CREATE PATH 
            currentPathId: null
        }

        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleCoursesSelected = this.handleCoursesSelected.bind(this)
        this.saveUserPath = this.saveUserPath.bind(this)
        this.savePredefiendPath = this.savePredefiendPath.bind(this);
    }

    render() {
        const { classes, currentUser, paths } = this.props;

        return (
            <div className={classes.root}>
                <PageTitle>Pathless Students > Path Creation</PageTitle>


                <PathCreationDialog
                    open={this.state.savePathModalOpen}
                    onSave={this.savePredefiendPath}
                    onCancel={() => this.handleCloseModal('savePathModalOpen')} />


                <Grid container direction="column" spacing={24}>

                    <Grid item>
                        <div className={classes.headerCard}>
                            <Typography variant="h4">Create Path to {`${currentUser.name} ${currentUser.lastname}`}</Typography>
                        </div>
                    </Grid>

                    <Grid item>
                        <Grid container direction="row" spacing={24}>
                            <Grid item xs={12} lg={4}>
                                <Card>
                                    <CardHeader title="Predefiend paths" titleTypographyProps={{ variant: "h6" }} />
                                    <Divider variant="middle"/>
                                    <CardContent>
                                        <this.PredefiendList />
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item xs={12} lg={8}>
                                <Card>
                                    <CardHeader title="Course Path Preview" titleTypographyProps={{ variant: "h6" }} />
                                    <Divider variant="middle" />
                                    <CardContent>
                                        <this.PathPrev iew />
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={this.saveUserPath}
                                            disabled={!this.state.currentPathId}
                                        >
                                            <SaveIcon className={classes.leftIcon} />
                                            Save
                                    </Button>
                                        <Button variant="outlined" color="primary" onClick={() => this.handleOpenModal('savePathModalOpen')}>
                                            <SaveIcon className={classes.leftIcon} />
                                            Save as Predifiend Path
                                    </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )

    }


    handleOpenModal(modalName) {
        this.setState({ [modalName]: true })
    }

    handleCloseModal(modalName) {
        this.setState({ [modalName]: false })
    }
    handleCoursesSelected(selectedValue) {


        if (selectedValue && selectedValue !== this.state.selectedValue) {
            this.setState({ currentPath: [...this.state.currentPath, selectedValue] })
        }


        this.handleCloseModal('courseSelectionModalOpen')
        this.setState({ selectedValue })
    }







    fillPath(predefiend) {
        this.setState({
            currentPathId: predefiend._id,
            currentPath: [...predefiend.courses],
            selectedValue: null
        })
    }


    saveUserPath() {
        this.props.addPath({ userId: this.props.currentUser._id, path: this.state.currentPathId })
    }

    savePredefiendPath(name) {

        this.props.addNewPath({
            name,
            courses: this.state.currentPath.map(course => course._id)
        })

        this.setState({
            currentPathId: null,
            currentPath: [],
            selectedValue: null
        })

        this.handleCloseModal('savePathModalOpen')
    }



    PathPreview = () => {
        const { classes } = this.props;

        return (
            <div className={classes.pathPreviewRoot} >
                {this.state.currentPath.map((course) => {
                    return (
                        <this.PathCircle >
                            <Typography variant="button" style={{ color: "white" }}>
                                {course.header}
                            </Typography>
                        </this.PathCircle>
                    )
                })}

                <this.PathCircle>
                    <IconButton onClick={() => this.handleOpenModal('courseSelectionModalOpen')}><AddIcon /></IconButton>
                </this.PathCircle>

                <CourseSelectionDialog
                    courses={this.props.courses}
                    currentPath={this.state.currentPath}
                    selectedValue={this.state.selectedValue}
                    open={this.state.courseSelectionModalOpen}
                    onClose={this.handleCoursesSelected}
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




    PredefiendList = () => {

        return (
            <List>
                {this.props.paths.map((predefiend) => (
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

}


const styled = withStyles(styles, { withTheme: true })(PathCreation)


export default styled;

