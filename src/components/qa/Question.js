import React from 'react';
import { withStyles, Card, CardHeader, CardContent, Divider, Typography, CardActions, Button } from '@material-ui/core';
import UserAvater from '../UserAvatar';
import ReplyDialog from './ReplyDialog';
import QuestionTags from './QuestionTags';
import PageTitle from '../PageTitle';



const styles = {
    root: {
        flex: 1
    },
    card: {
        margin: '20px'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
    }
}


class Question extends React.Component {

    constructor(props) {
        super(props);

        this.openModel = this.openModel.bind(this);
        this.closeModel = this.closeModel.bind(this);
        this.reply = this.reply.bind(this)

        this.state = {
            replyModalOpen: false
        }
    }

    openModel() {
        this.setState({ replyModalOpen: true })
    }


    closeModel() {
        this.setState({ replyModalOpen: false })
    }

    reply(reply) {
        this.props.postReply({ questionId: this.props.question._id, content: reply.content })
        this.closeModel()
    }

    render() {
        const { question, classes } = this.props;


        return (
            <div className={classes.root}>

                <PageTitle>Q & A > Question</PageTitle>

                <Card className={classes.card}>

                    <CardHeader
                        title={question.header}
                        action={<QuestionTags tags={question.tags} />}
                        subheader={question.date}
                    />
                    <Divider />

                    <CardContent>
                        <div className={classes.cardContent} >
                            <UserAvater user={question.author} />

                            <div className={classes.questionContent} >
                                <Typography>{`${question.author.name} ${question.author.lastname}`}</Typography>
                                <div dangerouslySetInnerHTML={{ __html: question.content }} ></div>
                            </div>

                        </div>


                    </CardContent>
                    <Divider />

                    <CardActions>
                        <Button onClick={this.openModel}>Reply</Button>
                    </CardActions>


                </Card>

                <Typography variant="h4"> Replies</Typography>

                <Replies classes={classes} replies={question.replies} />

                <ReplyDialog open={this.state.replyModalOpen} onClose={this.closeModel} onPost={this.reply} />

            </div>



        )
    }

}





function Replies({ replies, classes }) {
    return (
        replies.map((reply) => <Reply classes={classes} reply={reply} />)
    )
}



function Reply({ reply, classes }) {
    return (
        <Card className={classes.card}>
            <CardContent>
                <div className={classes.cardContent} >
                    <UserAvater user={reply.author} />

                    <div className={classes.questionContent} >
                        <Typography>{`${reply.author.name} ${reply.author.lastname}`}</Typography>
                        <div dangerouslySetInnerHTML={{ __html: reply.content }} ></div>
                    </div>

                </div>


            </CardContent>
        </Card>


    )
}

export default withStyles(styles)(Question)