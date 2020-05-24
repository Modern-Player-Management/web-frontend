import React, {Component} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';

import "./App.css";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AuthService from "./services/auth.service";
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {AccountCircle} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Home from "./components/home.component";
import Register from "./components/register.component";
import Login from "./components/login.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardTeams from "./components/teams/Board.component";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {Drawer} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PrivateRoute from "./utils/private.route";
import SemiPrivateRoute from "./utils/SemiPrivate.route";

const drawerWidth = 240;

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    }
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
            openDrawer: false,
        };

        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
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

    handleDrawerOpen() {
        this.setState({openDrawer: true});
    }

    handleDrawerClose() {
        this.setState({openDrawer: false});
    }


    render() {
        const {classes} = this.props;
        const {currentUser} = this.state;


        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static">
                        <Toolbar>
                            {currentUser && (
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={this.handleDrawerOpen}
                                    edge="start"
                                    className={clsx(classes.menuButton, this.state.openDrawer && classes.hide)}
                                >
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

                                        <List>
                                            <Link onClick={this.handleClick} to='/profile'
                                                  style={{textDecoration: 'inherit', color: 'rgba(0, 0, 0, 0.87)'}}>
                                                <ListItem button key=" My account">
                                                    <ListItemIcon><PersonIcon/></ListItemIcon>
                                                    <ListItemText primary="My account"/>
                                                </ListItem>
                                            </Link>

                                            <Link onClick={this.logOut} to='/'
                                                  style={{textDecoration: 'inherit', color: 'rgba(0, 0, 0, 0.87)'}}>
                                                <ListItem button key="Logout">
                                                    <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                                                    <ListItemText primary="Logout"/>
                                                </ListItem>
                                            </Link>
                                        </List>
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
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={this.state.openDrawer}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>
                            <Link onClick={this.handleDrawerClose} to='/teams'
                                  style={{textDecoration: 'inherit', color: 'rgba(0, 0, 0, 0.87)'}}>
                                <ListItem button key="Manage teams">
                                    <ListItemIcon><GroupIcon/></ListItemIcon>
                                    <ListItemText primary="Manage teams"/>
                                </ListItem>
                            </Link>
                        </List>
                    </Drawer>


                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/home"]} component={Home}/>
                            <SemiPrivateRoute exact path="/login" component={Login}/>
                            <SemiPrivateRoute exact path="/register" component={Register}/>
                            <PrivateRoute exact path="/profile" component={Profile}/>
                            <PrivateRoute path="/user" component={BoardUser}/>
                            <PrivateRoute path="/teams" component={BoardTeams}/>
                        </Switch>
                    </div>
                </MuiThemeProvider>
            </Router>
        );
    }
}

export default withStyles(useStyles)(App);
