import { Button, Card, CardActions, CardContent, Grid, InputLabel, withStyles, IconButton } from '@material-ui/core';
import { Field, Form, Formik, FieldArray } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import React from 'react';
import PageTitle from '../PageTitle';
import TextEditor from '../TextEditor';




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
    input: {
        margin: '10px'
    },
    headerCard: {
        padding: "20px",
        textAlign: 'center'
    }
})



class StageCreation extends React.Component {


    constructor(props) {
        super(props)

        this.state = {
            stageSelectionModalOpen: false,
        }

        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <PageTitle>Stage Creation</PageTitle>

                <Grid container direction="column" spacing={24}>

                    <Grid item>


                        <Formik
                            initialValues={{ tests: [{}] }}
                            onSubmit={(values, { setSubmitting }) => {
                                this.props.addNewStage({
                                    ...values,
                                })
                                setTimeout(() => setSubmitting(false), 400);
                                this.values = { tests: [{}] };
                            }}
                        >
                            {(formik) => (
                                <Form>
                                    <Card>
                                        <CardContent>
                                            <this.DataForm {...formik}></this.DataForm>

                                        </CardContent>
                                        <CardActions>
                                            <Button variant="outlined"
                                                onClick={formik.submitForm}
                                                disabled={formik.isSubmitting}
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

    DataForm = ({ setFieldValue, values, handleBlur }) => {
        const { classes } = this.props;
        return (

            <React.Fragment>
                <InputLabel >Title</InputLabel>
                <Field
                    name="title"
                    component={TextField}
                    required
                    className={classes.input}
                    variant="outlined"
                    fullWidth
                    fullWidthInput
                />
                <InputLabel >Type</InputLabel>
                <Field
                    component={Select}
                    required
                    className={classes.input}
                    variant="outlined"
                    fullWidth
                    fullWidthInput
                    name="stageType">
                    <option value="0">HTML</option>
                    <option value="1">JavaScript</option>
                    <option value="6">React</option>
                    <option value="10">Project</option>
                </Field>


                <div className={classes.input}>
                    <InputLabel >Instructions</InputLabel>
                    <TextEditor
                        editorState={values.learn}
                        onChange={(value) => setFieldValue('learn', value)}
                        onBlur={handleBlur}

                    />

                </div>


{/* 
                {values.stageType !== "10" && <div className={classes.input}>
                    <InputLabel >Required Dependecies</InputLabel>
                    <TextEditor
                        editorState={values.required}
                        onChange={(value) => setFieldValue('required', value)}
                        onBlur={handleBlur}

                    />

                </div>} */}

                {values.stageType !== "10" &&
                    < div className={classes.input}>
                        <InputLabel >Initial Code</InputLabel>
                        <TextEditor
                            editorState={values.initialCode}
                            onChange={(value) => setFieldValue('initialCode', value)}
                            onBlur={handleBlur}

                        />

                    </div>
                }

                {values.stageType !== "10" &&
                    <div className={classes.input}>
                        <FieldArray
                            name="tests"
                            render={arrayHelpers => (
                                <div>
                                    {values.tests.map((test, index) => (
                                        <div style={{display:'flex'}} key={index}>
                                            <InputLabel >Text</InputLabel>
                                            <Field name={`tests.${index}.text`}
                                                component={TextField}
                                                required
                                                className={classes.input}
                                                variant="outlined"
                                                fullWidth
                                                fullWidthInput
                                            />
                                            <InputLabel >Test Code</InputLabel>
                                            <Field name={`tests.${index}.testString`}
                                                component={TextField}
                                                required
                                                className={classes.input}
                                                variant="outlined"
                                                fullWidth
                                                fullWidthInput
                                            />

                                            <IconButton
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                            >
                                                -
                                        </IconButton>
                                            <IconButton
                                                type="button"
                                                onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                                            >
                                                +
                                        </IconButton>
                                        </div>
                                    ))
                                    }

                                </div>
                            )}
                        />
                    </div>
                }

            </React.Fragment >)
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



const styled = withStyles(styles, { withTheme: true })(StageCreation)


export default styled;

