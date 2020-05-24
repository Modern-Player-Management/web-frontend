import React, {Component} from "react";

import UserService from "../../services/user.service";
import Grid from "@material-ui/core/Grid";
import ResponsiveContainerGrid from "../../utils/ResponsiveContainer.component";
import {withStyles} from "@material-ui/core/styles";
import CardTeams from "./CardTeams.component";
import {Typography} from "@material-ui/core";
import AddTeams from "./AddTeams.component";

const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: "100%",
        },
    },
    alert: {
        boxSizing: 'border-box',
    },

    text: {
        textAlign: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 0,
        margin: 30,
        right: 0,
    }
});


class BoardTeams extends Component {
    constructor(props) {
        super(props);
        this.handleTeams = this.handleTeams.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.state = {
            content: "",
            name: ""
        };
    }

    componentDidMount() {
        UserService.getTeamsBoard().then(
            response => {
                this.setState({
                    content: response.data
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

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleTeams(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            UserService.createTeams(this.state.name).then(
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
            <>

                <Typography variant='h6' className={classes.text}>
                    Your teams list:
                </Typography>
                <ResponsiveContainerGrid>
                    {
                        this.state.content && this.state.content.map((team, index) => {
                            return (
                                <CardTeams key={index} team={team}/>
                            )
                        })
                    }
                </ResponsiveContainerGrid>
                <AddTeams/>
            </>
        );
    }
}


export default withStyles(useStyles)(BoardTeams);