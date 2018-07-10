import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchExamData, nextQuestion, previousQuestion, switchExamStatus, clearChoice, selectChoice } from '../../actions/routines';
import { Icon, Button, Confirm } from 'semantic-ui-react';
import QuestionComponent from './QuestionComponent';
import Timer from './Timer';
import Sidebar from './Sidebar';

const findIndexInArray = (arr, questionId) => {
    let index = arr.findIndex(x => x.id === questionId);
    if (index === -1) {
        console.log('Not possible. Programmatical Bug exists.')
    }
    return arr[index];
}
const mql = window.matchMedia(`(min-width: 800px)`);

class ExamScreen extends Component {
    constructor(props) {
        super(props);
        //present_question is the question at which user is in given array of questions
        this.state = { visible: mql.matches, endConfirm: false, presentQuestionIndex: 0, reviewQuestions: [], totalQuestions: props.totalQuestions, error: props.error }; // TODO: move presenquestioN TO REdux and create action
        this.previousQuestion = this.previousQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.switchQuestion = this.switchQuestion.bind(this);
        this.reviewQuestion = this.reviewQuestion.bind(this);
        this.endExam = this.endExam.bind(this);
    }

    componentDidMount() {
        this.props.fetchExamData();
    }


    // used for review 
    switchQuestion(index) {
        this.setState({
            presentQuestionIndex: index
        });
    }

    reviewQuestion(id) {
        if (this.state.reviewQuestions.includes(id)) {
            this.setState(prevState => ({
                reviewQuestions: prevState.reviewQuestions.filter(val => val !== id)
            }), function () {
                console.log(this.state.reviewQuestions)
            });
        }
        else {
            this.setState(prevState => ({
                reviewQuestions: [...prevState.reviewQuestions, id]
            }), function () {
                console.log(this.state.reviewQuestions)
            });
        }
    }

    endExam() {
        console.log('his', this.props);
        this.props.switchExamStatus(false);
        this.props.history.push('/score');
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
    showEndConfirm = () => this.setState({ endConfirm: true })

    handleEndConfirm = () => { this.setState({ endConfirm: false }); this.endExam(); }

    handleEndCancel = () => this.setState({ endConfirm: false })

    handleButtonClick = () => this.setState({ visible: !this.state.visible })

    handleSidebarHide = () => {
        if (!mql.matches) {
            this.setState({ visible: false })
        }
    }

    render() {
        let { error, visible, reviewQuestions } = this.state;
        const { selectChoice, clearChoice, switchExamStatus, examData, attemptedQuestions } = this.props;
        if (error || this.props.error) {
            <div>
                Some Error occured probably network error. Try reloading the page.
                <br />
                {error}
            </div>
        }
        return (
            <Fragment>
                {/* {JSON.stringify(this.props.examData)} */}
                <div className="exam-header-theme exam-header"><span className="hamburger" onClick={this.handleButtonClick}><Icon name={visible ? 'close' : 'content'} size="large" /><span className="title-name">DEMO APP</span></span> {examData && <Timer switchExamStatus={this.props.switchExamStatus} />}</div>
                <div className="exam-content">
                    {examData && (<Sidebar visible={visible} examData={examData} handleSidebarClick={this.handleButtonClick} handleSidebarHide={this.handleSidebarHide} switchQuestion={this.switchQuestion} {...{ reviewQuestions, attemptedQuestions }}>
                        <QuestionComponent questionIndex={this.state.presentQuestionIndex} key={this.state.presentQuestionIndex} showEndConfirm={this.showEndConfirm} clearChoice={clearChoice} selectChoice={selectChoice} reviewQuestion={this.reviewQuestion} reviewArray={this.state.reviewQuestions} />
                    </Sidebar>)}
                </div>
                <div className="exam-footer-theme exam-footer">
                    <Button.Group primary size="large" >
                        <Button className="traverse-button" labelPosition='left' icon='left chevron' content='Previous' onClick={this.previousQuestion} />
                        <Button className="traverse-button" labelPosition='right' icon='right chevron' content='Next' onClick={this.nextQuestion} />
                    </Button.Group>
                </div>
                <Confirm
                    open={this.state.endConfirm}
                    content='Are you sure about ending the exam?'
                    onCancel={this.handleEndCancel}
                    onConfirm={this.handleEndConfirm}
                />
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        examData: state.examData.data,
        totalQuestions: state.examData.total_questions,
        loading: state.examData.loading,
        error: state.examData.error,
        canAttempt: state.examState.can_attempt,
        attemptedQuestions: state.examState.attempted_questions,
        score: state.examState.user_score
    };
}

export default connect(
    mapStateToProps, { fetchExamData, switchExamStatus, selectChoice, clearChoice }
)(ExamScreen);