import React, {Component} from "react";

import UserService from "../../services/user.service";
import Grid from "@material-ui/core/Grid";
import Form from "react-validation/build/form";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import ResponsiveContainerGrid from "../../utils/ResponsiveContainer.component";
import {withStyles} from "@material-ui/core/styles";
import CardTeams from "./CardTeams.component";
import {Typography} from "@material-ui/core";
import AddTeams from "./AddTeams.component";

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
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});


class AddTeamsModal extends Component {
    constructor(props) {
        super(props);
        this.handleTeams = this.handleTeams.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.state = {
            content: "",
            name: "",
            description: "",
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleTeams(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            UserService.createTeams(this.state.name, this.state.description).then(
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
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.paper}>
                <h2 id="simple-modal-title">Add team</h2>
                <Form
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    onSubmit={this.handleTeams}
                    ref={c => {
                        this.form = c;
                    }}
                >

                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChangeName}
                    />
                    <TextField
                        id="standard-basic"
                        type="text"
                        label="Description"
                        name="description"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />

                    {this.state.message && (
                        <Alert className={classes.alert} severity="error">{this.state.message}</Alert>
                    )}

                    <Button
                        width="auto"
                        type="submit"
                        variant="contained"
                        color="primary"
                    > Create </Button>

                    <CheckButton
                        style={{display: "none"}}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                    />
                </Form>
            </div>
        );
    }
}


export default withStyles(useStyles)(AddTeamsModal);