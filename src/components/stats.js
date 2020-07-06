import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import StatsService from "../services/stats.service";
import TeamService from "../services/team.service"
import {Bar, Doughnut} from "react-chartjs-2";
import ResponsiveContainerGrid from "../utils/ResponsiveContainer.component";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

const useStyles = (theme) => ({
    card: {
        borderRadius: 12,
        boxShadow: 'rgba(34, 35, 58, 0.2) 0px 14px 80px',
        transition: 'all 0.3s ease 0s',
        margin: '20px',
    },
    media: {
        borderRadius: 6,
        maxWidth: 200
    },
    input: {
        display: 'none',
    },
    text: {
        margin: '25px',
    },
});


class Stats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamID: this.props.match.params.teamID,
            data: "",
            stats: "",
        };

        this.chartReference = React.createRef();
    }

    componentDidMount() {
        TeamService.getTeam(this.state.teamID).then(
            response => {
                this.setState({
                    data: response.data,
                });
            });
        StatsService.getStats(this.state.teamID).then(
            response => {
                this.setState({
                    stats: response.data,
                });
            });

        console.log(this.chartReference);
    }

    getPlayers(stats) {
        var p = []

        for (var i = 0; i < stats.length; i++) {
            p.push(stats[i].player)
        }

        return p
    }

    getGoals(stats) {
        var p = []

        for (var i = 0; i < stats.length; i++) {
            p.push(stats[i].goals)
        }

        return p
    }

    getShots(stats) {
        var p = []

        for (var i = 0; i < stats.length; i++) {
            p.push(stats[i].shots)
        }

        return p
    }

    getAssists(stats) {
        var p = []

        for (var i = 0; i < stats.length; i++) {
            p.push(stats[i].assists)
        }

        return p
    }

    getSaves(stats) {
        var p = []

        for (var i = 0; i < stats.length; i++) {
            p.push(stats[i].saves)
        }

        return p
    }

    getScores(stats) {
        var p = []

        for (var i = 0; i < stats.length; i++) {
            p.push(stats[i].score)
        }

        return p
    }

    getShooting(stats) {
        var p = []

        for (var i = 0; i < stats.length; i++) {
            p.push(stats[i].goalShots)
        }

        return p
    }

    Bar1Stat(stats) {


        const data = {
            labels: this.getPlayers(stats),
            datasets: [{
                label: 'Goals',
                data: this.getGoals(stats),
                backgroundColor: [
                    '#FF6384',
                    '#FF6384',
                    '#FF6384',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#FF6384',
                    '#FF6384',
                ]
            },
                {
                    label: 'Shots',
                    data: this.getShots(stats),
                    backgroundColor: [
                        '#36A2EB',
                        '#36A2EB',
                        '#36A2EB',
                    ],
                    hoverBackgroundColor: [
                        '#36A2EB',
                        '#36A2EB',
                        '#36A2EB',
                    ]
                }, {
                    label: 'Assists',
                    data: this.getAssists(stats),
                    backgroundColor: [
                        '#FFCE56',
                        '#FFCE56',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FFCE56',
                        '#FFCE56',
                        '#FFCE56'
                    ]
                }, {
                    label: 'Saves',
                    data: this.getSaves(stats),
                    backgroundColor: [
                        '#00cd22',
                        '#00cd22',
                        '#00cd22'
                    ],
                    hoverBackgroundColor: [
                        '#00cd22',
                        '#00cd22',
                        '#00cd22'
                    ]
                }]
        };

        return data
    }

    Bar2Stat(stats) {
        const data = {
            labels: this.getPlayers(stats),
            datasets: [{
                label: 'Score',
                data: this.getScores(stats),
                backgroundColor: [
                    '#ff4169',
                    '#ff4169',
                    '#ff4169',
                ],
                hoverBackgroundColor: [
                    '#ff4169',
                    '#ff4169',
                    '#ff4169',
                ]
            }]
        };
        return data
    }

    Bar3Stat(stats) {
        const data = {
            labels: this.getPlayers(stats),
            datasets: [{
                label: 'Shooting',
                data: this.getShooting(stats),
                backgroundColor: [
                    '#296497',
                    '#296497',
                    '#296497',
                ],
                hoverBackgroundColor: [
                    '#296497',
                    '#296497',
                    '#296497',
                ]
            }]
        };
        return data
    }

    DoughnutStat(stat) {
        const data = {
            labels: [
                'Goals',
                'Assist',
                'Savers',
            ],
            datasets: [{
                data: [stat.goals, stat.assists, stat.saves],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };

        return data
    }

    render() {
        const {classes} = this.props;
        const {data, stats} = this.state;

        return (
            <>
                {
                    data !== "" & stats !== "" &&

                    <>
                        <ListItemText
                            className={classes.text}
                            primary={data.name + " Managed by " + data.manager.username}
                            secondary={data.description}
                        />


                        <Card className={classes.card}>
                            <ListItemText
                                className={classes.text}
                                primary="Players overview"
                            />
                            <CardContent className={classes.content}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Bar ref={this.chartReference} data={this.Bar1Stat(stats)}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Bar ref={this.chartReference} data={this.Bar2Stat(stats)}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Bar ref={this.chartReference} data={this.Bar3Stat(stats)}/>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {
                            stats && stats.map((player, index) => {
                                return (
                                    <Card className={classes.card}>
                                        <CardContent className={classes.content}>
                                            <ListItemText
                                                className={classes.text}
                                                primary={player.player+" details"}
                                            />
                                            <Grid container spacing={3}>
                                                <Grid item xs={4}>
                                                    <Doughnut ref={this.chartReference} data={this.DoughnutStat(stats[index])}/>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Doughnut ref={this.chartReference} data={this.DoughnutStat(stats[index])}/>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Doughnut ref={this.chartReference} data={this.DoughnutStat(stats[index])}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }

                    </>

                }
            </>
        )

    }
}


export default withStyles(useStyles)(Stats);