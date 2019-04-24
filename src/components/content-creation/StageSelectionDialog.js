import { Dialog, DialogTitle, Divider, IconButton, Slide, withStyles, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { differenceBy } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import CourseInfo from '../CourseInfo';
import { Container, Item } from '../utils';
import { getStageType } from './CourseCreation';


const dialogStyles = {
    avatar: {

    },
};


class SimpleDialog extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            filteredList: [...props.stages]

        }
    }


    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    getUnselectedStages = () => {
        return differenceBy(this.state.filteredList, this.props.selected, '_id')

    }

    filterList(event) {
        const updatedList = this.props.stages.filter(({ title }) => title.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
        this.setState({ filteredList: updatedList });
    }


    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;

        const stages = this.getUnselectedStages()

        const isLeft = stages.length > 0

        const stagesList = stages
            .map(stage => (
                <div key={stage._id}>
                    <Container alignItems="center" direction="row">
                        <Item >
                            {getStageType(stage)}
                        </Item>
                        <Item xs>{stage.title}</Item>
                        <Item><IconButton onClick={() => this.handleListItemClick(stage)}> <AddIcon /></IconButton>
                        </Item>
                    </Container>
                    <Divider />
                </div>))

        return (
            <Dialog fullScreen TransitionComponent={Slide} onClose={this.handleClose} {...other}>
                <DialogTitle id="simple-dialog-title">Pick Stage</DialogTitle>
                <div style={{ padding: '10px' }}>
                    <TextField
                        label="Name"
                        onChange={e => this.filterList(e)}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                    />
                    {isLeft ? stagesList : "No stage left for selection"}
                </div>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.object,
    stages: PropTypes.isRequired
};

const SimpleDialogWrapped = withStyles(dialogStyles)(SimpleDialog);

export default SimpleDialogWrapped;

