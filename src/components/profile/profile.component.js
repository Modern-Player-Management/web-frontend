import React, {Component} from "react";
import UserService from "../../services/user.service";
import {withStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import ProfilePassword from "./profilePassword.component";
import ProfileUsername from "./profileUsername.component";
import ProfileEmail from "./profileEmail.component";
import ResponsiveContainerGrid from "../../utils/ResponsiveContainer.component";

const useStyles = (theme) => ({
    root: {
        maxWidth: '80%',
        width: 'fit-content',
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

        this.state = {
            username: "",
            email: "",
            successful: false,
        }
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


    render() {
        const {classes} = this.props;


        return (
            <Card className={classes.root}>
                <CardHeader
                    title="Profile"
                />
                <ResponsiveContainerGrid>
                        <ProfilePassword/>
                        <ProfileUsername username={this.state.username}/>
                        <ProfileEmail email={this.state.email}/>
                </ResponsiveContainerGrid>
            </Card>
        )
    }
}
//<ProfileEmail email={this.state.email}/>
export default withStyles(useStyles)(Profile);