import React, {Component} from "react";

import UserService from "../../services/user.service";
import {withStyles} from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";


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

    text: {
        textAlign: 'center',
    }
});


class RemovePlayer extends Component {
    constructor(props) {
        super(props);
        this.handlePlayer = this.handlePlayer.bind(this);

        this.state = {
            content: "",
            name: "",
        };
    }


    handlePlayer(e) {
        console.log(this);
        e.preventDefault();

        this.setState({
            message: "",
        });

        UserService.removePlayerToTeam(this.props.teamid, this.state.name).then(
            () => {
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    message: resMessage
                });
            }
        );
    }

    render() {
        return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <Avatar/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.name}
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={this.handlePlayer}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}


export default withStyles(useStyles)(RemovePlayer);