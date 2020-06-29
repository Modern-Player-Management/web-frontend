import React, {Component} from "react";

import {withStyles} from "@material-ui/core/styles";
import AddPlayers from "../AddPlayers.component";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import RemovePlayer from "../RemovePlayer.component";

const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: "100%",
        },
    },
    alert: {
        boxSizing: 'border-box',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 0,
        maxWidth: '75%',
    },
});


class PlayerListModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        }
    }

    render() {
        const {classes, team} = this.props;

        return (
            <div className={classes.paper}>
                <h2 id="simple-modal-title">Players list</h2>
                <Typography variant="body2" color="textSecondary">
                    <List>
                        {
                            team.players.length !== 0 ? team.players.map((player, index) => {
                                return (
                                    <RemovePlayer playerid={player.id} playername={player.username}
                                                  team={team}/>
                                )
                            }) : "There is no member..."
                        }
                    </List>
                </Typography>
                {
                    team.isCurrentUserManager &&
                        <AddPlayers teamid={team.id}/>
                }
            </div>
        );
    }
}

export default withStyles(useStyles)(PlayerListModal);