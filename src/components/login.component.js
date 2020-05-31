import React, {Component} from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import CardContent from "@material-ui/core/CardContent";
import AuthService from "../services/auth.service";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import TextField from "@material-ui/core/TextField";
import {withStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
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
    actions:{
        justifyContent: 'center'
    },
    textfield:{
        margin: 10,
    },
    button:{
        width: '45%',
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
                    this.props.history.push("/teams");
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
            <Card className={classes.root}>
                <CardHeader
                    title="Account Sign in"
                />

                <Form
                    noValidate
                    autoComplete="off"
                    onSubmit={this.handleLogin}
                    ref={c => {
                        this.form = c;
                    }}
                >
                    <CardContent>
                        <TextField
                            id="standard-basic"
                            type="text"
                            label="Username"
                            name="username"
                            className={classes.textfield}
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            required={true}
                        />

                        <TextField
                            id="standard-basic"
                            label="Password"
                            type="password"
                            name="password"
                            className={classes.textfield}
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            required={true}
                        />


                        {this.state.message && (
                            <Alert className={classes.alert} severity="error">{this.state.message}</Alert>
                        )}
                    </CardContent>
                    <CardActions className={classes.actions}>
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                    > Sign in </Button>

                    <CheckButton
                        style={{display: "none"}}
                        ref={c => {
                            this.checkBtn = c;
                        }}
                    />
                    </CardActions>
                </Form>

            </Card>
        );
    }
}

export default withStyles(useStyles)(Login);
