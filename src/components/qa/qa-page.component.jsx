import { Button, Paper, Tab, Tabs, withStyles, Divider, List, ListItem } from '@material-ui/core';
import { Component, default as React } from 'react';
import { users } from '../../static-data';
import { SearchInput } from '../search.component';
import { Container, Item } from '../utils';
import { Question } from './qa-question-card';
import { PropTypes } from 'mobx-react';
import { ApiClient } from '../../api-client';



const styles = theme => ({
    root: {
        flex: 1,
    },

    searchContainer: {
        display: 'flex',
        height: '100px',
        padding: '20px'
    },
    question: {

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
                <Container spacing={24} direction="column">

                    <Item>
                        <Paper className={classes.searchContainer}>
                            <Container spacing={24} direction="row" alignItems="center" justify="center">
                                <Item> <SearchInput /></Item>
                                <Item><Button variant="outlined" color="primary" >Search</Button>  </Item>
                            </Container>
                        </Paper>
                    </Item>


                    <Item>
                        <Paper>
                            <Tabs value={this.state.tab} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
                                <Tab label="Recent" />
                                <Tab label="Popular" />
                                <Tab label="Not Answered" />
                            </Tabs>

                            <List dense>
                                {ApiClient.getRecentQuestions().map((question) => <ListItem dense button divider><Question question={question} /> </ListItem>)}

                            </List>





                        </Paper>
                    </Item>
                </Container>





            </div>
        );
    }
}

QAPage.propTypes = {

};

const QAPageStyled = withStyles(styles, { withTheme: true })(QAPage)

export { QAPageStyled as QAPage };


