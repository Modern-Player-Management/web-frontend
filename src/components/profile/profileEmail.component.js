import React, {Component} from "react";
import {withStyles} from "@material-ui/core/styles";
import Form from "react-validation/build/form";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import UserService from "../../services/user.service";
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


class ProfileEmail extends Component {
    constructor(props) {
        super(props);
        this.handleEmail = this.handleEmail.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            email: this.props.email,
            successful: false,
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }


    componentDidUpdate(prevProps, prevState) {
        if(prevProps.email !== this.props.email){
            this.setState({
                email: this.props.email
            });
        }
    }

    handleEmail(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            var data = { email: this.state.email}
            UserService.updateUser(data).then(
                () => {
                    authService.setNewEmail(this.state.email)
                    this.setState({
                        email: this.state.email,
                        message: "Success",
                        successful: "success",
                    })
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
                onSubmit={this.handleEmail}
                ref={c => {
                    this.form = c;
                }}
            >

                        <TextField
                            type="text"
                            label="Email"
                            name="email"
                            className={classes.textfield}
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


export default withStyles(useStyles)(ProfileEmail);