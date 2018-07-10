import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentQuestion, getSelectedChoice } from '../../selectors/examSelector';
import { Card, Icon, Button, Grid, Form, Radio } from 'semantic-ui-react';

class QuestionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.selectedChoice };
    }
    clearChoice(id) {
        this.setState({
            value: ''
        })
        this.props.clearChoice(id);
    }
    handleChange = (e, { value }) => {
        this.props.selectChoice(this.props.question.id, value);
        this.setState({ value });
    }

    render() {
        const { value } = this.state;
        const { questionIndex, question, reviewArray, iconSize } = this.props;
        let choiceLabels = ['a', 'b', 'c', 'd'];
        if (typeof question !== 'undefined' && question !== null) {
            return (
                <div className="question">
                    <div className="ui sticky question-header">
                        <span className="question-section">Section: {question.Section.toUpperCase()}</span>
                        <span className="question-header-right">
                            <span>{question.marks} marks</span>&nbsp;
                            <Button.Group compact inverted size={iconSize ? "tiny": "small"} color="blue" >
                                <Button className="tooltip" style={{ color: `${reviewArray.includes(question.id) ? '#DAA520' : ''}` }} onClick={() => this.props.reviewQuestion(question.id)}><Icon name={`edit ${reviewArray.includes(question.id) ? '' : 'outline'}`} /><span className="tooltiptext">Review Later</span> </Button>
                                <Button className="tooltip" onClick={() => this.clearChoice(question.id)}><Icon name="trash alternate" /><span className="tooltiptext">Clear Response</span> </Button>
                                <Button className="tooltip" onClick={() => this.props.showEndConfirm(false)}><Icon name="close" /><span className="tooltiptext">End Test</span> </Button>
                            </Button.Group>
                        </span>
                    </div>
                    <div className="question-container">
                    <Card raised centered className="question-content">
                        <Card.Content textAlign='left' className="question-question" header={`Q${questionIndex + 1}. ${question.Question}`} />
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
                </div>
            );
        }
        return <div className="question" />;
    }
}


function mapStateToProps(state, ownProps) {
    return {
        question: getCurrentQuestion(state, ownProps.questionIndex),
        selectedChoice: getSelectedChoice(state, ownProps.questionIndex)
    };
}

export default connect(
    mapStateToProps,
)(QuestionComponent);