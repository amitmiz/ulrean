import { Fab, List, ListItem, Paper, Tab, Tabs, withStyles, Divider } from '@material-ui/core';

import { Component, default as React } from 'react';
import SearchInput from '../SearchInput';
import { Container, Item } from '../utils';
import QuestionCard from './QuestionCard';
import WriteQuestionDialog from './WirteQuestionDialog';
import { Link } from 'react-router-dom'
import PageTitle from '../PageTitle'
import AddIcon from '@material-ui/icons/Add';


const styles = theme => ({
    root: {
        flex: 1,
    },

    searchContainer: {
        display: 'flex',
        height: 'auto',
        padding: '20px'
    },
    question: {

    },
    searchButton: {
        textAlign: 'center'
    },
    fab: {
        position: 'absolute',
        bottom: '10px',
        right: '10px'
    }
});



class QAPage extends Component {


    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.openModel = this.openModel.bind(this);
        this.closeModel = this.closeModel.bind(this);
        this.postNewQuestion = this.postNewQuestion.bind(this)

        this.state = {
            tab: 0,
            postQuestionModalOpen: false
        }
    }

    componentDidMount() {
        //eslint-disable-next-line
        let params = new URLSearchParams(location.search);

        if (params.has("new")) {
            this.setState({ tab: 1 })
        }
    }

    handleChange = (event, tab) => {
        this.setState({ tab });
    };

    openModel() {
        this.setState({ postQuestionModalOpen: true })
    }


    closeModel() {
        this.setState({ postQuestionModalOpen: false })
    }

    postNewQuestion(question) {
        this.props.postQuestion(question)
        this.closeModel()
    }

    render() {
        const { classes, questions } = this.props;



        return (
            <div className={classes.root}>
                <PageTitle>Q & A</PageTitle>

                <Container spacing={24} direction="column">



                    <Item>
                        <Paper>
                            <Tabs value={this.state.tab} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
                                <Tab label="Recent" />
                                <Tab label="Not Answered" />
                            </Tabs>
                            <Divider />
                            {this.state.tab === 0 && <List dense>
                                {questions.map((question) =>
                                    <ListItem
                                        dense
                                        button

                                        component={Link}
                                        to={`/question/${question._id}`}
                                    >
                                        <QuestionCard question={question} />
                                    </ListItem>
                                )}
                            </List>
                            }

                            {this.state.tab === 1 && <List dense>
                                {questions.filter(question => question.commentsNum === 0).map((question) =>
                                    <ListItem
                                        dense
                                        button

                                        component={Link}
                                        to={`/question/${question._id}`}
                                    >
                                        <QuestionCard question={question} />
                                    </ListItem>
                                )}
                            </List>
                            }
                        </Paper>
                    </Item>
                </Container>

                <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.openModel}>
                    <AddIcon />
                </Fab>
                <WriteQuestionDialog open={this.state.postQuestionModalOpen} onClose={this.closeModel} onPost={this.postNewQuestion} />
            </div>
        );
    }
}

QAPage.propTypes = {

};

const QAPageStyled = withStyles(styles, { withTheme: true })(QAPage)

export default QAPageStyled;
