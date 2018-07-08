import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentQuestion } from '../../selectors/examSelector';
import { Card, Icon, Button, Grid, Form, Radio } from 'semantic-ui-react';

class QuestionComponent extends Component {
    state = {};
    handleChange = (e, { value }) => this.setState({ value })

    render() {
        const { value } = this.state;
        const { questionIndex, question } = this.props;
        let choiceLabels = ['a', 'b', 'c', 'd'];
        if (typeof question !== 'undefined' && question !== null) {
            return (
                <div className="question">
                    <div className="question-header">
                        <span>Section: {question.Section.toUpperCase()}</span>
                        <span className="question-header-right">
                            <span>{question.marks} marks</span>&nbsp;
                            <Button.Group className="question-actions-desktop">
                                <Button className="tooltip" ><Icon name="edit outline" /><span class="tooltiptext">Review Later</span> </Button>
                                <Button className="tooltip" ><Icon name="trash alternate" /><span class="tooltiptext">Clear Response</span> </Button>
                                <Button className="tooltip" onClick={() => this.props.switchExamStatus(false)}><Icon name="close" /><span class="tooltiptext">End Test</span> </Button>
                            </Button.Group>
                        </span>
                    </div>
                    <Card raised centered className="question-content">
                        <Card.Content textAlign='left' header={`Q${questionIndex + 1}. ${question.Question}`} />
                        <Card.Content textAlign='left' className="question-choices">
                            <Form.Group>
                                {
                                    choiceLabels.map(choice => <Form.Field
                                        key={choice}
                                        control={Radio}
                                        label={question[choice]}
                                        value={choice}
                                        checked={value === choice}
                                        onChange={this.handleChange}
                                        className="question-choice"
                                    />)}
                            </Form.Group>
                        </Card.Content>
                    </Card>
                </div>
            );
        }
        return <div className="question" />;
    }
}


function mapStateToProps(state, ownProps) {
    return {
        question: getCurrentQuestion(state, ownProps.questionIndex),
    };
}

export default connect(
    mapStateToProps,
)(QuestionComponent);