import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types'

export default class PathCreationDialog extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            name: ''
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { open, onCancel, onSave } = this.props;

        return (
            <Dialog open={open} onClose={onCancel} >
                <DialogTitle id="form-dialog-title">Save Path</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To save this path please enter a name
                         </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="name"
                        type="text"
                        fullWidth
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} color="primary"> Cancel</Button>
                    <Button onClick={() => onSave(this.state.name)} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

        );
    }
}


PathCreationDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onSave: PropTypes.func,
    onCancel: PropTypes.func

};

