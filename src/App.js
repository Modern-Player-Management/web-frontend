import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';

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
import BoardTeams from "./components/teams/Board.component";
import {AccountCircle} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
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
            currentUser: undefined,
            anchorEl: null,
            open: false,
        };

        this.handleClick = this.handleClick.bind(this);
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
        window.location.reload();
    }

    flipOpen = () => this.setState({...this.state, open: !this.state.open});
    handleClick = event => {
        this.state.ancherEl
            ? this.setState({anchorEl: null})
            : this.setState({anchorEl: event.currentTarget});
        this.flipOpen();
    };

    render() {
        const {classes} = this.props;
        const {currentUser} = this.state;
        const open = this.state.anchorEl === null ? false : true;
        const id = this.state.open ? "simple-popper" : null;

        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static">
                        <Toolbar>
                            {currentUser && (
                                <IconButton edge="start" className={classes.menuButton} color="inherit"
                                            aria-label="menu">
                                    <MenuIcon/>
                                </IconButton>
                            )}


                            <Typography variant="h6" className={classes.title}>
                                MPM
                            </Typography>

                            {currentUser ? (
                                <>
                                    <IconButton
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={event => this.handleClick(event)}
                                        color="inherit"
                                    >
                                        <AccountCircle/>
                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={this.state.anchorEl}
                                        open={this.state.open}
                                        onClose={this.handleClick}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right"
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right"
                                        }}
                                    >
                                        <Link to='/teams' style={{textDecoration: 'none'}}>
                                            <MenuItem onClick={this.handleClick}>Profile</MenuItem>
                                        </Link>
                                        <Link to='/profile' style={{textDecoration: 'none'}}>
                                            <MenuItem onClick={this.handleClick}>My account</MenuItem>
                                        </Link>
                                        <Link onClick={this.logOut} style={{textDecoration: 'none'}}>
                                            <MenuItem onClick={this.handleClick}>Logout</MenuItem>
                                        </Link>
                                    </Menu>
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
                            <Route exact path={["/", "/home"]} component={Home}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/profile" component={Profile}/>
                            <Route path="/user" component={BoardUser}/>
                            <Route path="/teams" component={BoardTeams}/>
                        </Switch>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default withStyles(useStyles)(App);
