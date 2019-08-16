import { Grid, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CodeEditorCard from './components/CodeEditorCard';
import OutputCard from './components/OutputCard';
import StageInstructions from './components/StageInstructions';




const styles = {
    root: {
        flex: 1,
        overflow: 'hidden',
        display: 'flex'
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        zIndex: 2000
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    stageNumber: {
        margin: '20px'
    }
}


const propTypes = {
    stage: PropTypes.object,
    output: PropTypes.string,
    tests: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            testString: PropTypes.string
        })
    )
};

class JavaScriptStage extends Component {

    render() {
        const { classes, output, course, tests } = this.props
        return (
            <div className={classes.root} >
                <Grid style={{ height: 'calc(100vh - 128px)', position: "relative" }} container direction={"row"} spacing={8}>


                    {/* Left */}
                    <Grid item xs={12} lg={6} style={{ overflow: 'auto', maxHeight: "100%" }}>
                        <StageInstructions course={course} tests={tests} stage={this.props.stage} />
                    </Grid>

                    {/* Right */}
                    <Grid item xs={12} lg={6}>
                        <CodeEditorCard {...this.props} />
                        <br />
                        <OutputCard output={output} />

                    </Grid>

                </Grid>


            </div>
        )
    }
}







JavaScriptStage.displayName = 'JavaScriptProject';
JavaScriptStage.propTypes = propTypes;

export default withStyles(styles)(JavaScriptStage);

