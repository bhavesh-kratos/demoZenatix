import React, { Component } from 'react'
import { Button, Header, Icon, Image, List, Segment, Divider, Sidebar } from 'semantic-ui-react'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'
import { groupedBySection, findIndexInArray } from '../../lib/helpers';

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
const mql = window.matchMedia(`(min-width: 800px)`);

const AppSidebar = (props) => {
    const { visible, handleSidebarClick, handleSidebarHide, examData, reviewQuestions, attemptedQuestions, switchQuestion } = props;
    const isAttempted = (id) => attemptedQuestions !== null && attemptedQuestions.hasOwnProperty(id) && (attemptedQuestions[id] || attemptedQuestions[id] !== "");
    const onClickHandler = (id) => {
        switchQuestion(id);
        handleSidebarHide();
    }
    let dataBySection = groupedBySection(examData);
    const Question = ({ question, index }) => {
        let actualIndex = findIndexInArray(examData, question.id);
        return (<List.Item style={{ cursor: 'pointer' }} onClick={() => onClickHandler(actualIndex)}>
            <List.Content >
                <List.Header><LinesEllipsis
                    text={`Q${actualIndex+1}. ${question.Question}`}
                    maxLine='2'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                    className="list-custom-item"
                /></List.Header>
            </List.Content>
            <br />
            <List.Content>
                {isAttempted(question.id) ? <Icon name="check" size='large' className="check-icon" /> : ''}
                {reviewQuestions.includes(question.id) ? <Icon name="edit outline " size='large' className="review-icon" /> : ''}
            </List.Content>
        </List.Item>)
    };

    console.log('valuesss', dataBySection)
    return (<div>
        <Sidebar.Pushable as={Segment} className="push-container">
            <Sidebar
                as={'div'}
                animation={mql.matches ? 'push' : 'overlay'}
                icon='labeled'
                inverted
                onHide={handleSidebarHide}
                vertical
                visible={visible}
                width={mql.matches ? 'tiny' : 'wide'}
                className="sidebar sidebar-width my-pusher"
            >
                <List divided>
                    {
                        dataBySection.map((data, index) => {
                            return (
                                <List.Item key={data.section} bulleted className="section-custom">
                                    <List.Content>
                                        <List.Header className="list-section">{data.section}</List.Header>
                                        <List relaxed='very' divided selection animated>
                                            {data.questions.map(
                                                (question, index) => <Question key={`${question.id}+${question.name}`} question={question} index={index} />
                                            )}
                                        </List>
                                    </List.Content>
                                </List.Item>)
                        })
                    }
                    <Divider />
                </List>
            </Sidebar>

            <Sidebar.Pusher className={`${mql.matches ? "self-pusher" : ""}`}>
                {props.children}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    </div>
    );
}
export default AppSidebar;