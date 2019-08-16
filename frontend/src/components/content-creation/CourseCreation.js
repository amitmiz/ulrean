import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Typography, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import CourseSelectionDialog from './StageSelectionDialog';
import PageTitle from '../PageTitle'
import { TextField } from 'formik-material-ui';
import { FieldArray, Field, Formik, Form } from 'formik';
import ChipInput from 'material-ui-chip-input'




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
    previewRoot: {
        display: "flex",
        flexDirection: "row",
        position: "relative",
        flexWrap: "wrap"
    },
    previewCircleRoot: {
        color: "white",
        display: "inline-block",
        position: "relative",
        zIndex: 10,

        '&:after': {
            content: "''",
            position: "absolute",
            height: '2px',
            background: "black",
            width: "140px",
            zIndex: -1,
            top: "50%",
            left: "66%",


        },
        '&:last-child:after': {
            display: 'none'
        }

    },
    previewCircle: {
        borderRadius: "50%",
        background: "#3f51b5",
        color: "white",
        display: "inline-flex",
        flexDirection: 'column',
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        height: "200px",
        margin: "20px",
        padding: "10px",
        width: "200px",
        boxShadow: '2px 2px 20px 4px #00000091'
    },
    input: {
        margin: '10px'
    },

    headerCard: {
        padding: "20px",
        textAlign: 'center'
    }
})



class CourseCreation extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            stageSelectionModalOpen: false,
            selectedValue: null,
            selectedStages: [],
        }

        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleStageSelected = this.handleStageSelected.bind(this)
        this.save = this.save.bind(this)
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <PageTitle>Course Creation</PageTitle>

                <CourseSelectionDialog
                    stages={this.props.stages}
                    selected={this.state.selectedStages}
                    selectedValue={this.state.selectedValue}
                    open={this.state.stageSelectionModalOpen}
                    onClose={this.handleStageSelected}
                />

                <Grid container direction="column" spacing={24}>

                    <Grid item>


                        <Formik
                            onSubmit={(values, { setSubmitting }) => {
                                this.save(values);
                                setTimeout(() => setSubmitting(false), 400);
                                this.values = {};
                            }}
                        >
                            {({ isSubmitting, values, submitForm }) => (
                                <Form>
                                    <Card>
                                        <CardContent>
                                            <this.DataForm></this.DataForm>
                                            <this.Preview />
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="outlined"
                                                onClick={submitForm}
                                                disabled={isSubmitting || this.state.selectedStages.length === 0}
                                                color="primary" >
                                                Save
                                             </Button>
                                        </CardActions>
                                    </Card>
                                </Form>
                            )}

                        </Formik >
                    </Grid>
                </Grid>
            </div >
        )

    }


    handleOpenModal(modalName) {
        this.setState({ [modalName]: true })
    }

    handleCloseModal(modalName) {
        this.setState({ [modalName]: false })
    }
    handleStageSelected(selectedValue) {


        if (selectedValue && selectedValue !== this.state.selectedValue) {
            this.setState({ selectedStages: [...this.state.selectedStages, selectedValue] })
        }


        this.handleCloseModal('stageSelectionModalOpen')
        this.setState({ selectedValue })
    }


    removeStage(index) {
        this.setState({
            selectedStages: [...this.state.selectedStages.slice(0, index),
            ...this.state.selectedStages.slice(index + 1)
            ]
        })
    }

    save(data) {

        this.props.addNewCourse({
            ...data,
            stages: this.state.selectedStages.map(stage => stage._id)
        })

        this.setState({
            selectedStages: [],
            selectedValue: null
        })
    }


    DataForm = () => {
        const { classes } = this.props;
        return (

            <React.Fragment>

                <Field
                    name="header"
                    component={TextField}
                    className={classes.input}
                    variant="outlined"
                    fullWidth
                    fullWidthInput
                    placeholder="Title"
                />
                <Field
                    name="subheader"
                    component={TextField}
                    className={classes.input}
                    variant="outlined"
                    fullWidth
                    fullWidthInput
                    placeholder="Subtitle"
                />

                <Field
                    name="recomendedTimeToFinish"
                    component={TextField}
                    className={classes.input}
                    variant="outlined"
                    fullWidth
                    fullWidthInput
                    placeholder="Days to finish"
                />



                <FieldArray name="tags" >
                    {({ push, pop }) => (
                        <ChipInput
                            className={classes.input}
                            placeholder="Tags"
                            variant="outlined"
                            fullWidth
                            fullWidthInput
                            onAdd={(chip) => push(chip)}
                            onDelete={(chip, index) => pop(chip, index)}
                        />
                    )}

                </FieldArray>
            </React.Fragment>)
    }


    Preview = () => {
        const { classes } = this.props;
        const { selectedStages } = this.state;

        return (
            <div className={classes.previewRoot} >
                {selectedStages.map((stage, index) => {
                    return (
                        <this.PreviewCircle >
                            <IconButton onClick={() => this.removeStage(index)}>X</IconButton>
                            {getStageType(stage)}

                            <Typography variant="button" style={{ color: "white" }}>
                                {stage.title}
                            </Typography>
                        </this.PreviewCircle>
                    )
                })}

                <this.PreviewCircle>
                    <IconButton onClick={() => this.handleOpenModal('stageSelectionModalOpen')}><AddIcon /></IconButton>
                </this.PreviewCircle>


            </div>
        )
    }

    PreviewCircle = (props) => {
        const { classes } = this.props;

        return (
            <div className={classes.previewCircleRoot}>

                <span className={classes.previewCircle}>{props.children}</span>

            </div>
        )
    }

}

export function getStageType({ stageType }) {
    let type = "";

    if (stageType === 0) {
        type = "html.png";

    } else if (stageType === 6) {
        type = "react.png"
    } else if (stageType === 1) {
        type = "js.png";
    } else if (stageType === 10) {
        type = "project.png";
    } else type = ""

    return (<img alt="type" style={{ maxHeight: "35px" }} src={type}></img>)
}



const styled = withStyles(styles, { withTheme: true })(CourseCreation)


export default styled;

