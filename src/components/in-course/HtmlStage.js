import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, withStyles } from '@material-ui/core';
import { first } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import decodeHTMLEntities from '../../utils/decodeHTMLEntities';

import StageInstructions from './components/StageInstructions';
import Output from './components/Output';
import Preview from './components/Preview';
import Editor from './components/Editor';
import OutputCard from './components/OutputCard';
import PreviewCard from './components/PreviewCard';
import CodeEditorCard from './components/CodeEditorCard';



const styles = {
    root: {
        flex: 1,
        overflowY: 'auto',
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

class HtmlStage extends Component {

    render() {
        const { classes, output, course, tests } = this.props
        return (
            <div className={classes.root} >
                <Grid style={{ height: 'calc(100vh - 128px)' }} container direction={"row"} spacing={8}>


                    {/* Left */}
                    <Grid item xs={12} lg={4} style={{ overflow: 'auto' }}>
                        <StageInstructions course={course} tests={tests} stage={this.props.stage} />
                    </Grid>

                    {/* Middle */}
                    <Grid item xs={12} lg={4}>
                        <CodeEditorCard {...this.props} />
                        <br />
                        <OutputCard output={output} />

                    </Grid>

                    {/*Right */}
                    <Grid item xs={12} lg={4}>
                        <PreviewCard />
                    </Grid>
                </Grid>


            </div>
        )
    }
}



HtmlStage.displayName = 'RegualrStage';
HtmlStage.propTypes = propTypes;

export default withStyles(styles)(HtmlStage);

