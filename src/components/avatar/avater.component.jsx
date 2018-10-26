import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  avatar: {
    margin: 10,
  },
  imageAvatar: {
    width: "inherit"
  }

};




function UserAvatar(props) {
  const { user, classes } = props;

  const avatarContent = user.photo ? <img className={classes.imageAvatar} src={user.photo} alt="user" /> : user.name[0]

  return (

    <Avatar onClick={props.onClick} className={classes.avatar}>{avatarContent}</Avatar>


  );
}

UserAvatar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onClick : PropTypes.func

};


const UserAvaterComponent = withStyles(styles)(UserAvatar);

export { UserAvaterComponent as UserAvatar };