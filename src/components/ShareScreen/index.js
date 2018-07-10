import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import Header from '../common/Header';
import { logout, shareImage } from '../../actions/routines';

var chart;
class ShareScreen extends React.PureComponent {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        const { scores } = this.props;
        if (scores !== null) {
            var ctx = this.chartRef.current.getContext('2d');
            chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',
                // The data for our dataset
                data: {
                    labels: Object.keys(scores),
                    datasets: [{
                        label: "Score",
                        backgroundColor: ['#85144b', '#0074D9', '#01FF70'],
                        borderColor: ['#85144b', '#0074D9', '#01FF70'],
                        data: Object.values(scores),
                    }]
                },
                // Configuration options go here
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
            console.log(chart)
        }
    }

    shareImageT = () => {
        console.log(chart.toBase64Image())
        this.props.shareImage(chart);
    }
    render() {
        let { userData, logout, totalScore, shareImage } = this.props;
        let { picture, name } = userData;
        return (
            <div className="score-screen">
                <Header {...{ picture, name, logout }} />
                <div className="result">RESULT</div>
                <div className="graph">
                    <canvas ref={this.chartRef} height="300.6px" />
                </div>
                <div className="score-total">{`Your total score is ${totalScore}`}</div>
                <button onClick={() => this.shareImageT()}>share</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        scores: state.examState.section_score,
        totalScore: state.examState.total_score,
        userData: state.userData.user_data
    };
}

export default connect(
    mapStateToProps, { logout, shareImage }
)(ShareScreen);


