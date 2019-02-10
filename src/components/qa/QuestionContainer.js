import React from 'react';
import { connect } from 'react-redux';
import { makeQuestionSelector } from '../../state/questions/reducer';
import { userSelector } from '../../state/users/reducer';
import Question from './Question';
import { postComment } from '../../state/comments/actions';
import { questionCommentsSelector } from '../../state/comments/reducer';
import { fetchQuestion } from '../../state/questions/actions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state, ownProps) => ({ question: mapQuestion(state, ownProps) })

const mapDispatchToProps = disaptch => bindActionCreators({ fetchQuestion, postComment }, disaptch)

function mapQuestion(state, props) {
    const currentQuestion = makeQuestionSelector(props.match.params.questionId)(state)

    if (currentQuestion) {
        questionCommentsSelector(currentQuestion._id)(state)
        const mappedComments = questionCommentsSelector(currentQuestion._id)(state) ? questionCommentsSelector(currentQuestion._id)(state).map(comment => ({ ...comment, author: userSelector(state, comment.author) })) : []

        return { ...currentQuestion, author: userSelector(state, currentQuestion.author), comments: mappedComments }
    }
}



@connect(mapStateToProps, mapDispatchToProps)
class QuestionContainer extends React.Component {

    componentDidMount() {
        this.props.fetchQuestion({ slug: this.props.match.params.questionId })
    }

    render() {
        if (this.props.question) {
            return (<Question {...this.props} />)

        } else {
            return "loading"
        }



    }

}







export default QuestionContainer