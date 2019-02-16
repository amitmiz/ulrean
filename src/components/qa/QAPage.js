import { Button, List, ListItem, Paper, Tab, Tabs, withStyles, Divider } from '@material-ui/core';
import { Component, default as React } from 'react';
import SearchInput from '../SearchInput';
import { Container, Item } from '../utils';
import QuestionCard from './QuestionCard';
import WriteQuestionDialog from './WirteQuestionDialog';
import { Link } from 'react-router-dom'
import PageTitle from '../PageTitle'


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
        this.openModel = this.openModel.bind(this);
        this.closeModel = this.closeModel.bind(this);
        this.postNewQuestion = this.postNewQuestion.bind(this)

        this.state = {
            tab: 0,
            postQuestionModalOpen: false
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
                        <Paper className={classes.searchContainer}>

                            <Container spacing={24} direction="row" alignItems="center" justify="center">
                                <Item> <SearchInput /></Item>
                                <Item><Button variant="outlined" color="primary" >Search</Button>  </Item>
                                <Item><Button onClick={this.openModel} variant="outlined" color="primary" >Ask</Button> </Item>
                            </Container>

                        </Paper>
                    </Item>


                    <Item>
                        <Paper>
                            <Tabs value={this.state.tab} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
                                <Tab label="Recent" />
                                <Tab label="Not Answered" />
                            </Tabs>
                            <Divider />
                            <List dense>
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
                        </Paper>
                    </Item>
                </Container>


                <WriteQuestionDialog open={this.state.postQuestionModalOpen} onClose={this.closeModel} onPost={this.postNewQuestion} />
            </div>
        );
    }
}

QAPage.propTypes = {

};

const QAPageStyled = withStyles(styles, { withTheme: true })(QAPage)

export default QAPageStyled;
