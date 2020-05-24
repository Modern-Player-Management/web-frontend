import React, {Component} from "react";

import {withStyles} from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import UserService from "../../services/user.service";


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


class DeleteTeam extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            content: "",
            name: "",
        };
    }


    handleDelete(e) {
        e.preventDefault();

        this.setState({
            message: "",
        });


        console.log(this.props.id)

        UserService.removeTeam(this.props.teamid, this.props.playerid).then(
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
            <Button size="small" color="primary" edge="end" aria-label="delete" onClick={this.handleDelete}>
                <DeleteIcon/>
            </Button>
        );
    }
}


export default withStyles(useStyles)(DeleteTeam);