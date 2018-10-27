import { Grid, InputBase, Paper, withStyles, Button, FormHelperText, Tabs, Tab } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Component, default as React } from 'react';
import { SearchInput } from '../search.component';



const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },

    searchContainer: {
        display: 'flex',
        height: '100px',
        padding: '20px'
    }
});

class QAPage extends Component {


    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            tab: 0
        }
    }

    handleChange = (event, tab) => {
        this.setState({ tab });
    };



    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24} direction="column">

                    <Grid item>


                        <Paper className={classes.searchContainer}>
                            <Grid container spacing={24} direction="row" alignItems="center" justify="center">
                                <Grid item>
                                    <SearchInput />
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary" >Search</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>


                    <Grid item>

                        <Paper>
                            <Tabs
                                value={this.state.tab}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Recent" />
                                <Tab label="Popular" />
                                <Tab label="Not Answered" />
                            </Tabs>


                        </Paper>
                    </Grid>

                </Grid>





            </div>
        );
    }
}

QAPage.propTypes = {

};

const QAPageStyled = withStyles(styles, { withTheme: true })(QAPage)

export { QAPageStyled as QAPage };


