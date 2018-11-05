import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';




const styles = theme => ({
    root: {
        flexGrow: 1,
    }
});


class TeacherDashbaord extends React.Component {

    constructor(props) {
        super(props)



    }





    render() {
        const { classes, theme } = this.props;
        return (
            <div className={classes.root} >
                teacher dashboard
            </div>

        );
    }
}

TeacherDashbaord.propTypes = {
    classes: PropTypes.object.isRequired,
};

const wrapped =  withStyles(styles, { withTheme: true })(TeacherDashbaord);
export {wrapped as TeacherDashbaord }