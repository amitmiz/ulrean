import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Field, Form, Formik, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import ChipInput from 'material-ui-chip-input'
import React from 'react';
import { withStyles, Divider, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import TextEditor from '../TextEditor';
import Editor from '../in-course/components/Editor';
import CloseIcon from '@material-ui/icons/Close';

const style = {
    root: {

    },
    dialogContentRoot: {
        display: 'flex',
        flexDirection: 'column',
        padding: '50px',
    },
    input: {
        marginLeft: '10px'
    },
    inputOverride: {
        paddingTop: '0'
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    topInputs: {
        marginBottom: '40px',
        display: 'flex',
        flexDirection: 'row',
    },

}

const WriteQuestionDialog = ({ classes, open, onPost, onClose }) => (




    <Formik
        initialValues={{ question: '', tags: [] }}
        onSubmit={(values, { setSubmitting }) => {
            onPost(values)
            setTimeout(() => setSubmitting(false), 400);
        }}
    >
        {({ isSubmitting, values, setFieldValue, handleBlur, submitForm }) => (


            <Form>

                <Dialog
                    className={classes.root}
                    open={open}
                    onClose={onClose}
                    maxWidth="lg"
                    fullWidth

                >

                    <DialogTitle  >Write New Message</DialogTitle>
                    <Divider />

                    <DialogContent className={classes.dialogContentRoot}>

                        <div className={classes.topInputs} >

                            <Field
                                name="header"
                                component={TextField}
                                className={classes.input}
                                variant="outlined"
                                fullWidth
                                fullWidthInput
                                placeholder="Type title here.."
                            />

                            <FieldArray name="tags" >
                                {({ push, pop }) => (
                                    <ChipInput
                                        className={classes.input}
                                        placeholder="Add tags here.."
                                        variant="outlined"
                                        fullWidth
                                        fullWidthInput

                                        value={values.tags}
                                        onAdd={(chip) => push(chip)}
                                        onDelete={(chip, index) => pop(chip, index)}
                                    />
                                )}

                            </FieldArray>

                        </div>



                        <TextEditor
                            editorState={values.editorState}
                            onChange={(value) => setFieldValue('content', value)}
                            onBlur={handleBlur}

                        />



                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button onClick={onClose} color="secondary">  Cancel </Button>
                        <Button onClick={submitForm} disabled={isSubmitting}>  Post  </Button>
                    </DialogActions>




                </Dialog>
            </Form>

        )}

    </Formik >


);


export default withStyles(style)(WriteQuestionDialog);