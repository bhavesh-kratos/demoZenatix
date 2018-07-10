import React, { Component } from 'react'
import { Button, Header, Icon, Image, List, Segment, Divider, Sidebar } from 'semantic-ui-react'
import LinesEllipsis from 'react-lines-ellipsis'
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC'

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
const mql = window.matchMedia(`(min-width: 800px)`);

const AppSidebar = (props) => {
    const { visible, handleSidebarClick, handleSidebarHide, examData, reviewQuestions, attemptedQuestions, switchQuestion } = props;
    const isAttempted = (id) => attemptedQuestions !== null && attemptedQuestions.hasOwnProperty(id) && (attemptedQuestions[id] || attemptedQuestions[id] !== "");
    const onClickHandler = (id) => {
        switchQuestion(id);
        handleSidebarHide();
    }
    return (
        <div>
            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    as={'div'}
                    animation={mql.matches? 'push': 'overlay'}
                    icon='labeled'
                    inverted
                    onHide={handleSidebarHide}
                    vertical
                    visible={visible}
                    width={mql.matches? 'tiny': 'wide'}
                    className="sidebar sidebar-width"
                >
                    <List relaxed='very' divided selection animated >
                        {examData.map(
                            (question, index) => (<List.Item style={{ cursor: 'pointer' }} key={`${question.id}+${question.name}`} onClick={() => onClickHandler(index)}>
                                <List.Content >
                                    <List.Header><LinesEllipsis
                                        text={`Q${index + 1}. ${question.Question}`}
                                        maxLine='2'
                                        ellipsis='...'
                                        trimRight
                                        basedOn='letters'
                                    /></List.Header>
                                </List.Content>
                                <br />
                                <List.Content>
                                    {isAttempted(question.id) ? <Icon name="check" size='small' className="check-icon" /> : ''}
                                    {reviewQuestions.includes(question.id) ? <Icon name="edit outline " size='small' className="review-icon" /> : ''}
                                </List.Content>
                            </List.Item>))}
                        <Divider />
                    </List>
                </Sidebar>

                <Sidebar.Pusher className={mql.matches?"self-pusher":""}>
                    {props.children}
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </div>
    );
}
export default AppSidebar;