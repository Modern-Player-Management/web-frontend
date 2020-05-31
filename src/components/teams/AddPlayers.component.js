import React, {Component} from "react";

import UserService from "../../services/user.service";
import Form from "react-validation/build/form";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import {withStyles} from "@material-ui/core/styles";


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


class AddPlayers extends Component {
    constructor(props) {
        super(props);
        this.handleplayer = this.handleplayer.bind(this);
        this.onChangeName = this.onChangeName.bind(this);

        this.state = {
            content: "",
            name: "",
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleplayer(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {

            UserService.getPlayer(this.state.name).then(
                response => {
                    UserService.addPlayerToTeam(this.teamid, response.data.id).then(
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
                                loading: false,
                                message: resMessage
                            });
                        }
                    );
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
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Form
                className={classes.root}
                noValidate
                autoComplete="off"
                onSubmit={this.handleplayer}
                ref={c => {
                    this.form = c;
                }}
            >

                <TextField
                    id="standard-basic"
                    type="text"
                    label="Player's name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                />

                {this.state.message && (
                    <Alert className={classes.alert} severity="error">{this.state.message}</Alert>
                )}

                <Button
                    width="auto"
                    type="submit"
                    variant="contained"
                    color="primary"
                > Add </Button>

                <TextField
                    style={{display: "none"}}
                    type="hidden"
                    name="teamid"
                    ref={() => {
                        this.teamid = this.props.teamid;
                    }}
                />

                <CheckButton
                    style={{display: "none"}}
                    ref={c => {
                        this.checkBtn = c;
                    }}
                />

            </Form>
        );
    }
}


export default withStyles(useStyles)(AddPlayers);