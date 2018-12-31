import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, withStyles } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import PropTypes from "prop-types";


const styles = {
    expandedRoot: {
        flexDirection: "column"
    }
}

StageInstructions.propTypes = {
    stage: PropTypes.object,
    tests: PropTypes.arrayOf(PropTypes.object),
    course: PropTypes.object
}


function StageInstructions(props) {

    const { stage, classes, tests, course } = props;
    return (<div>

        <ExpansionPanel defaultExpanded>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}> Learn </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.expandedRoot}>
                {course && <Typography variant="subtitle1">  {course.header}</Typography>}
                <Typography variant="h4">  {stage.title}</Typography>
                <Typography component="div"> {stage.learn.map((learn, index) => <p key={index} dangerouslySetInnerHTML={{ __html: learn }} />)} </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>

        {tests &&

            <ExpansionPanel defaultExpanded>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Instructions</Typography>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails>
                    <Typography component="div">{tests.map(({ text, pass, err }, index) => {

                        const isInitial = !pass && !err;
                        const statusIcon = pass && !err ? <CheckCircleIcon /> : <CancelIcon />;

                        return (<div key={index}> {isInitial ? <InfoIcon /> : statusIcon} <span dangerouslySetInnerHTML={{ __html: text }} /></div>)
                    })}
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        }

    </div>
    )
}

export default withStyles(styles)(StageInstructions)
