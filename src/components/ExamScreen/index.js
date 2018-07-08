import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExamData, nextQuestion, previousQuestion, switchExamStatus } from '../../actions/routines';
import { Icon, Button } from 'semantic-ui-react';
import QuestionComponent from './QuestionComponent';
import Timer from './Timer';

const findIndexInArray = (arr, questionId) => {
    let index = arr.findIndex(x => x.id === questionId);
    if (index === -1) {
        console.log('Not possible. Programmatical Bug exists.')
    }
    return arr[index];
}

class ExamScreen extends Component {
    constructor(props) {
        super(props);
        //present_question is the question at which user is in given array of questions
        this.state = { presentQuestionIndex: 0, reviewQuestions: [], totalQuestions: props.totalQuestions, error: props.error }; // TODO: move presenquestioN TO REdux and create action
        this.previousQuestion = this.previousQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.switchQuestion = this.switchQuestion.bind(this);
    }

    componentDidMount() {
        this.props.fetchExamData();
    }


    switchQuestion(id) {
        this.setState({
            presentQuestionIndex: id
        });
    }
    //TODO: change the logic for traversing
    previousQuestion() {
        let index = this.state.presentQuestionIndex;
        // let index = this.props.examData.findIndex(x => x.id === id);
        // if (index === -1) {
        //     this.setState({
        //         error: 'Programmatical bug at line 50'
        //     })
        // }
        console.log('indexx', index);
        if (index >= 1) {
            let newIndex = parseInt(index, 10) - 1;
            this.setState({
                presentQuestionIndex: newIndex
            });
        }
    }

    nextQuestion() {
        let index = this.state.presentQuestionIndex;
        // let index = this.props.examData.findIndex(x => x.id === id);
        // if (index === -1) {
        //     this.setState({
        //         error: 'Programmatical bug at line 50'
        //     })
        // }
        console.log('indexx', index);
        if (index < this.props.totalQuestions - 1) {
            let newIndex = parseInt(index, 10) + 1;
            this.setState({
                presentQuestionIndex: newIndex
            });
        }
    }

    render() {
        console.log(this.state.presentQuestionIndex);
        let { error } = this.state;
        if (error) {
            <div>
                Some Error occured probablynetwork error. Try reloading the page.
                <br />
                {error}
            </div>
        }
        else if(!this.props.canAttempt){
            return <div>Can't attempt again</div>
        }
        return (
            <div>
                {/* {JSON.stringify(this.props.examData)} */}
                <div className="exam-header-theme exam-header"><b>EXAM NAME</b> <Timer switchExamStatus={this.props.switchExamStatus} /></div>
                <div>
                    <QuestionComponent questionIndex={this.state.presentQuestionIndex} key={this.state.presentQuestionIndex} switchExamStatus={this.props.switchExamStatus} />
                </div>
                <div className="exam-footer-theme exam-footer">
                    <Button.Group primary size="large">
                        <Button labelPosition='left' icon='left chevron' content='Previous' onClick={this.previousQuestion} />
                        <Button labelPosition='right' icon='right chevron' content='Next' onClick={this.nextQuestion} />
                    </Button.Group>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        examData: state.examData.data,
        totalQuestions: state.examData.total_questions,
        loading: state.examData.loading,
        error: state.examData.error,
        canAttempt: state.examState.can_attempt
    };
}

export default connect(
    mapStateToProps, { fetchExamData, nextQuestion, previousQuestion, switchExamStatus }
)(ExamScreen);