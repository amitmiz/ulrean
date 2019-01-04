import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormLabel, Radio, Slide, withStyles, InputLabel } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import TextEditor from '../TextEditor';
import { reviewSubmission } from '../../state/projects-submissions/actions';


const dialogStyles = {
    avatar: {

    },
};


class ReviewDialog extends React.PureComponent {
    handleClose = () => {
        this.props.onClose();
    };


    render() {
        const { classes, submission, onClose, onPost, ...other } = this.props;


        return (
            <Formik
                initialValues={{ content: '', pass: false }}
                onSubmit={(values, { setSubmitting }) => {

                    setTimeout(() => {
                        onPost({ ...values, _id: submission._id })
                        setSubmitting(false)
                        onClose();
                    }, 400);
                }}
            >
                {({ isSubmitting, values, setFieldValue, handleBlur, submitForm }) => (

                    <Form>
                        <Dialog fullWidth maxWidth="lg" TransitionComponent={Slide} onClose={this.handleClose} {...other}>
                            <DialogTitle id="simple-dialog-title">Review</DialogTitle>


                            <Divider />

                            <DialogContent className={classes.dialogContentRoot}>
                                <FormLabel>Add Comment: </FormLabel>
                                <TextEditor
                                    editorState={values.editorState}
                                    onChange={(value) => setFieldValue('comments', value)}
                                    onBlur={handleBlur}

                                />

                                <Divider />

                                <div>
                                    <InputLabel>Pass</InputLabel>
                                    <Radio
                                        checked={values.pass === true}
                                        onChange={event => setFieldValue("pass", true)}
                                        name="radio-button-demo"
                                    />
                                    <InputLabel>Fail</InputLabel>
                                    <Radio
                                        checked={values.pass === false}
                                        onChange={event => setFieldValue("pass", false)}
                                        name="radio-button-demo"
                                    />
                                </div>
                            </DialogContent>
                            <Divider />
                            <DialogActions>
                                <Button color="primary" onClick={submitForm} disabled={isSubmitting}>  Save  </Button>
                                <Button onClick={onClose} color="secondary">  Cancel </Button>
                                <Button variant="outlined" as={"a"} href={submission.gitLink} target="_blank">View Code</Button>

                            </DialogActions>

                        </Dialog>

                    </Form>

                )}

            </Formik >
        );
    }
}


export default withStyles(dialogStyles)(ReviewDialog);

