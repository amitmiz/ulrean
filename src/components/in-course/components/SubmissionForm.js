import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import { Form, Field, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import Proptypes from 'prop-types';

const style = {
    submissionForm: {
        display: 'flex',
        height: 'inherit',
        justifyContent: 'center',
        flexDirection: 'column'
    }
}



const SubmissionForm = ({ onSubmit,canSubmit }) => (
    <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
            let errors = {};
            if (!values.gitLink) {
                errors.gitLink = 'Required';
            }
            return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            onSubmit(values)

            setTimeout(() => {
                setSubmitting(false);

            }, 400);
        }}
    >
        {({ isSubmitting }) => (
            <Form style={{
                display: 'flex', height: 'inherit', justifyContent: 'center', flexDirection: 'column',
            }}>
                <Field variant={'outlined'} placeholder="git link" name="gitLink" component={TextField} />

                <Button
                    color={'primary'}
                    style={{ marginTop: '10px' }}
                    variant={'outlined'}
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                >
                    Submit
                </Button>
            </Form>
        )}
    </Formik>
);

SubmissionForm.propTypes = {
    onSubmit: Proptypes.func,
    canSubmit: Proptypes.bool
}


export default withStyles(style)(SubmissionForm)