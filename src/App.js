import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/styles';
import BoardTeams from "./components/teams/Board.component";

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
});


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#4a8fd4'
        },
        secondary: {
            main: '#2f5daa'
        }
    }
});

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: AuthService.getCurrentUser(),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { classes } = this.props;
        const { currentUser } = this.state;
        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                MPM
                            </Typography>

                            {currentUser ? (
                                <>
                                    <Button href={"/teams"} color="inherit">Teams</Button>
                                    <Button href={"/profile"} color="inherit">{currentUser.username}</Button>
                                    <Button href={"/login"} onClick={this.logOut} color="inherit">LogOut</Button>
                                </>
                            ) : (
                                    <>
                                        <Button href={"/login"} color="inherit">Login</Button>
                                        <Button href={"/register"} color="inherit">Sign Up</Button>
                                    </>
                                )}


                        </Toolbar>
                    </AppBar>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/home"]} component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/profile" component={Profile} />
                            <Route path="/user" component={BoardUser} />
                            <Route path="/teams" component={BoardTeams} />
                        </Switch>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default withStyles(useStyles)(App);
