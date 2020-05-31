import React, {Component} from "react";
import UserService from "../../services/user.service";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Form from "react-validation/build/form";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import Grid from "@material-ui/core/Grid";
import ProfilePassword from "./profilePassword.component";
import ProfileUsername from "./profileUsername.component";

const useStyles = (theme) => ({
    root: {
        width: '60%',
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
        width: '90%',
    },
    button: {
        width: '45%',
        margin: 10,
    }
});



class Profile extends Component {
    constructor(props) {
        super(props);

        this.handleProfile = this.handleProfile.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            username: "",
            email: "",
            successful: false,
            password: "",
            passwordConfirm: "",
        }
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

    onChangePasswordConfirm(e) {
        this.setState({
            passwordConfirm: e.target.value
        });
    }

    componentDidMount() {

        UserService.getProfile().then(
            response => {
                this.setState({
                    username: response.data.username,
                    email: response.data.email,
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    handleProfile(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            UserService.updateTeam(this.state.id, this.state.name, this.state.description).then(
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
        console.log(this.state.username)
        return (
            <Card className={classes.root}>
                <CardHeader
                    title="Profile"
                />
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <ProfilePassword/>
                    </Grid>
                    <Grid item xs={6}>
                        <ProfileUsername username={this.state.username}/>
                    </Grid>
                    <Grid item xs={6}>

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
                                        <TextField
                                            label="Email"
                                            type="text"
                                            className={classes.textfield}
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
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
                                        <Button
                                            className={classes.button}
                                            type="submit"
                                            variant="contained"
                                            color="primary">Update</Button>
                                </>
                            )}

                            <CheckButton
                                style={{display: "none"}}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                    </Grid>
                </Grid>
            </Card>
        )
    }
}

export default withStyles(useStyles)(Profile);