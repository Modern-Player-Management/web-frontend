import React, { Component } from "react";
import AuthService from "../services/auth.service";
import CardHeader from "@material-ui/core/CardHeader";
import Form from "react-validation/build/form";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import CheckButton from "react-validation/build/button";
import Card from "@material-ui/core/Card";
import {withStyles} from "@material-ui/core/styles";

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


class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { classes } = this.props;

    return (
        <Card className={classes.root}>
            <CardHeader
                title="Profile"
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

export default withStyles(useStyles)(Profile);