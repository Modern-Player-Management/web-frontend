import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import ResponsiveContainerGrid from "../utils/ResponsiveContainer.component";
import EventsView from "./events/EventsView.component";
import GamesView from "./games/GamesView.component";
import TeamService from "../services/team.service";
import Button from "@material-ui/core/Button";

const useStyles = (theme) => ({
    card: {
        borderRadius: 12,
        boxShadow: 'rgba(34, 35, 58, 0.2) 0px 14px 80px',
        transition: 'all 0.3s ease 0s',
        width: '45%',
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
    dashboard: {
        display: 'block',
        margin: 'auto',
    }
});


export class Teams extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teamID: this.props.match.params.teamID,
            data: "",
        };
    }

    componentDidMount() {
        TeamService.getTeam(this.state.teamID).then(
            response => {
                this.setState({
                    data: response.data,
                });
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );
    }

    render() {
        const {classes} = this.props;
        const {data,teamID} = this.state;


        console.log(data)

        return (
            <>
                {
                    this.state.data !== "" &&

                    <>
                        <ListItemText
                            className={classes.text}
                            primary={data.name + " Managed by " + data.manager.username}
                            secondary={data.description}
                        />

                        <ResponsiveContainerGrid>
                            <EventsView isManager={data.isCurrentUserManager} teamID={data.id} events={data.events}/>
                            <GamesView isManager={data.isCurrentUserManager} teamID={data.id} games={data.games}/>
                        </ResponsiveContainerGrid>

                        <Button
                            className={classes.dashboard}
                            href={`/stats/${teamID}`}
                            width="auto"
                            variant="contained"
                            color="primary"
                        > Show team's stats </Button>
                    </>

                }
            </>
        )

    }
}


export default withStyles(useStyles)(Teams);