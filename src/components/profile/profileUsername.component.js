import React, {Component} from "react";
import UserService from "../../services/user.service";
import {withStyles} from "@material-ui/core/styles";
import Form from "react-validation/build/form";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import authService from "../../services/auth.service";

const useStyles = (theme) => ({
    root: {
        width: '50%',
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
        width: '68%',
    },
    button: {
        width: '45%',
        margin: 10,
    }
});


class ProfileUsername extends Component {
    constructor(props) {
        super(props);
        this.handleProfile = this.handleProfile.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.state = {
            username: this.props.username,
            successful: false,
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }


    componentDidUpdate(prevProps, prevState) {
        if(prevProps.username !== this.props.username){
            this.setState({
                username: this.props.username
            });
        }
    }

    handleProfile(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            var data = { username: this.state.username}
            console.log(this.state.username)
            UserService.updateUser(data).then(
                () => {
                    authService.logout()
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
                noValidate
                autoComplete="off"
                onSubmit={this.handleProfile}
                ref={c => {
                    this.form = c;
                }}
            >
                {!this.state.successful && (
                    <>
                        <TextField
                            type="text"
                            label="Username"
                            name="username"
                            className={classes.textfield}
                            value={this.state.username}
                            onChange={this.onChangeUsername}
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
        )
    }
}


export default withStyles(useStyles)(ProfileUsername);