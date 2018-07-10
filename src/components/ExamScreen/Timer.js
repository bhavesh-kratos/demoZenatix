import React, { Component } from 'react';
import { EXAM_TIME } from '../../config/config';

class Timer extends Component {
    constructor() {
        super();
        this.state = { time: {}, remainingTime: EXAM_TIME };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.remainingTime);
        this.setState({ time: timeLeftVar });
        this.startTimer()
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    startTimer() {
        if (this.timer === 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let remainingTime = this.state.remainingTime - 1;
        this.setState({
            time: this.secondsToTime(remainingTime),
            remainingTime: remainingTime,
        });

        // Check if its at zero.
        if (remainingTime === 0) {
            clearInterval(this.timer);
            this.props.switchExamStatus(false);
        }
    }

    formatDigits(number) {
        return ("0" + number).slice(-2);
    }

    render() {
        let { m, s, h } = this.state.time;
        let duration = this.secondsToTime(EXAM_TIME);
        return (
            <div className="timer timer-background">
                <div className="timer-counter">{this.formatDigits(h)}:{this.formatDigits(m)}:{this.formatDigits(s)}</div>
                <div className="timer-duration">Duration: {this.formatDigits(duration.h)}:{this.formatDigits(duration.m)}:{this.formatDigits(duration.s)}</div>
            </div>
        );
    }
}

export default Timer;
