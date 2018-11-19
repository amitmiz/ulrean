import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { ApiClient } from '../api-client';
import { CourseSelectionDialog } from './path-creation-dialog.component';


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
            modalOpened: false,
            selectedValue: null,
            currentPath: [],
        }


        this.state.currentUserId = this.props.match.params.id;


        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.savePath = this.savePath.bind(this)

    }




    render() {
        const { classes } = this.props;

        return (
            <Grid container direction="column" spacing={24}>

                <Grid item>
                    <div className={classes.headerCard}>
                        <Typography variant="h4">Create Path to Amit Mizrahi</Typography>
                    </div>
                </Grid>

                <Grid item>
                    <Grid container direction="row" spacing={24}>

                        <Grid item xs={12} lg={4}>
                            <Card>
                                <CardHeader title="Predefiend paths" titleTypographyProps={{ variant: "h6" }} />
                                <Divider />
                                <CardContent>
                                    {this.generatePredefiendList()}

                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} lg={8}>
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


    handleOpenModal() {
        this.setState({ modalOpened: true })
    }

    handleClose(selectedValue) {

        if (selectedValue && selectedValue !== this.state.selectedValue) {
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

                <CourseSelectionDialog
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

}


const styled = withStyles(styles, { withTheme: true })(PathCreation)

export { styled as PathCreation };

