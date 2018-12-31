import { Component, default as React } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { questionsSelector } from '../../state/questions/reducer';
import { userSelector } from '../../state/users/reducer';
import QAPage from './QAPage';
import { postQuestion } from '../../state/questions/actions';
import { questionsWithAutorSelector } from '../../state/selectors';




const mapStateToProps = state => ({
    questions: questionsWithAutorSelector(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({ postQuestion }, dispatch)

@connect(mapStateToProps, mapDispatchToProps)
class QAPageContainer extends Component {

    render() {
        const { questions, postQuestion } = this.props;

        return (<QAPage postQuestion={postQuestion} questions={questions} />);
    }
}



export default QAPageContainer;
