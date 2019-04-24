import { Divider, ListItem, ListItemSecondaryAction, ListItemText, withStyles, List } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import UserAvatar from '../UserAvatar';

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

const StudentDialog = ({ classes, students, open, onClose }) => (


    <Dialog
        className={classes.root}
        open={open}
        onClose={onClose}
        maxWidth="lg"
        

    >

        <DialogTitle  >More Info</DialogTitle>
        <Divider />

        <DialogContent className={classes.dialogContentRoot}>
            <List>
                {students.map(user => (
                    <ListItem key={user._id}>
                        <UserAvatar user={user} />
                        <ListItemText>
                            {user.name}  <strong>{user.lastname}</strong>
                        </ListItemText>
                        <ListItemSecondaryAction>

                        </ListItemSecondaryAction>
                    </ListItem>

                ))
                }
            </List>

        </DialogContent>
        <Divider />
        <Button onClick={onClose} color="secondary">  Close </Button>
        <DialogActions>
        </DialogActions>
    </Dialog>




);


export default withStyles(style)(StudentDialog);