import React, {Component} from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import TextField from "@material-ui/core/TextField";
import {withStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import ResponsiveContainerGrid from "./ResponsiveContainer.component";


const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: "100%",
            textAlign: 'center',
        },
    },
    alert: {
        boxSizing: 'border-box',
    }
});

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                () => {
                    this.props.history.push("/profile");
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

            <ResponsiveContainerGrid>
                <Grid item xs={12} sm={6}>

                    <Form
                        className={classes.root}
                        noValidate
                        autoComplete="off"
                        onSubmit={this.handleLogin}
                        ref={c => {
                            this.form = c;
                        }}
                    >

                        <TextField
                            id="standard-basic"
                            type="text"
                            label="Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            required={true}
                        />

                        <TextField
                            id="standard-basic"
                            label="Password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            required={true}
                        />


                        {this.state.message && (
                            <Alert className={classes.alert} severity="error">{this.state.message}</Alert>
                        )}

                        <Button
                            width="auto"
                            type="submit"
                            variant="contained"
                            color="primary"
                        > Login </Button>

                        <CheckButton
                            style={{display: "none"}}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </Grid>
            </ResponsiveContainerGrid>
        );
    }
}

export default withStyles(useStyles)(Login);
