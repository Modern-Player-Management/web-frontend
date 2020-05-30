import React, {Component} from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {withStyles} from '@material-ui/core/styles';
import Alert from "@material-ui/lab/Alert";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

const useStyles = (theme) => ({
    root: {
        width: 343,
        borderRadius: 12,
        padding: 12,
        marginTop: 25,
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: 'rgba(34, 35, 58, 0.2) 0px 14px 80px',
        transition: 'all 0.3s ease 0s',
    },
    alert: {
        boxSizing: 'border-box',
    },
    actions: {
        justifyContent: 'center'
    },
    textfield: {
        margin: 10,
    },
    button: {
        width: '45%',
    }
});

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

/* const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
}; */

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.username,
                this.state.email,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
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
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <Card className={classes.root}>
                <CardHeader
                    title="Account Sign up"
                />
                <Form
                    noValidate
                    autoComplete="off"
                    onSubmit={this.handleRegister}
                    ref={c => {
                        this.form = c;
                    }}
                >
                    {!this.state.successful && (
                        <>
                            <CardContent>
                                <TextField
                                    id="standard-basic"
                                    type="text"
                                    label="Username"
                                    name="username"
                                    className={classes.textfield}
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    validations={[vusername]}
                                    required={true}
                                />
                                <TextField
                                    id="standard-basic"
                                    label="Email"
                                    type="text"
                                    className={classes.textfield}
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    required={true}
                                />
                                <TextField
                                    id="standard-basic"
                                    type="password"
                                    label="Password"
                                    name="password"
                                    className={classes.textfield}
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    validations={[required, vpassword]}
                                    required={true}
                                />

                                {this.state.message && (
                                    <Alert
                                        className={classes.alert}
                                        severity={
                                            this.state.successful
                                                ? "success"
                                                : "error"
                                        }
                                    >{this.state.message}</Alert>
                                )}
                            </CardContent>

                            <CardActions className={classes.actions}>
                                <Button
                                    className={classes.button}
                                    type="submit"
                                    variant="contained"
                                    color="primary">Sign Up</Button>
                            </CardActions>
                        </>
                    )}

                    <CheckButton
                        style={{display: "none"}}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                    />
                </Form>
            </Card>
        );
    }
}


export default withStyles(useStyles)(Register)