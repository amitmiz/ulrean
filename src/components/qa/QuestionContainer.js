import React from 'react';
import { connect } from 'react-redux';
import { makeQuestionSelector } from '../../state/questions/reducer';
import { userSelector } from '../../state/users/reducer';
import Question from './Question';
import { postReply } from '../../state/questions/actions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state, ownProps) => ({ question: mapQuestion(state, ownProps) })

const mapDispatchToProps = disaptch => bindActionCreators({ postReply }, disaptch)

function mapQuestion(state, props) {
    const currentQuestion = makeQuestionSelector(props.match.params.questionId)(state)

    const mappedReplies = currentQuestion.replies ? currentQuestion.replies.map(reply => ({ ...reply, author: userSelector(state, reply.author) })) : []

    return { ...currentQuestion, author: userSelector(state, currentQuestion.author), replies: mappedReplies }
}


const QuestionContainer = (props) => (
    <Question {...props} />
)





export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);