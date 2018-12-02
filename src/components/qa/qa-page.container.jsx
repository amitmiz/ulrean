import { Button, List, ListItem, Paper, Tab, Tabs, withStyles } from '@material-ui/core';
import { Component, default as React } from 'react';
import { ApiClient } from '../../api-client';
import { SearchInput } from '../search.component';
import { Container, Item } from '../utils';
import { Question } from './qa-question-card';
import { connect } from 'react-redux';
import { questionsSelector } from '../../state/questions/reducer';
import { QAPage } from './qa-page.component';
import { userSelector } from '../../state/users/user.reducer';




const mapStateToProps = state => ({
    questions: questionsWithAutor(state)
})

const questionsWithAutor = (state) => {
    const questions = questionsSelector(state)
    return questions.map(question => ({ ...question, author: userSelector(state,question.author) }))

}

class QAPageContainer extends Component {


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
        const { questions } = this.props;

        return (<QAPage questions={questions} />);
    }
}


const connected = connect(mapStateToProps)(QAPageContainer)

connected.propTypes = {

};


export { connected as QAPageContainer };
